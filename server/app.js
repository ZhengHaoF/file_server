import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import { createRequire } from 'node:module';
import { createAuth } from './middleware/auth.js';
import { HttpError, resolveSafePathAsync as resolveSafePath, fixUploadFilename, publishFile, mapLimit, BLOCKED_EXTENSIONS } from './utils/fileSafety.js';
import { createPreviewService } from './utils/previews.js';
import { adminRouter } from './routes/admin.js';

const mimeTypes = createRequire(import.meta.url)('./mime.json');
const asyncRoute = handler => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

export function createApp(config, sql, logger, { staticDir = path.resolve('web'), adminDir = path.resolve('admin/dist') } = {}) {
    const app = express();
    const auth = createAuth(config);
    const previews = createPreviewService(config, sql, logger);
    app.disable('x-powered-by');
    app.use((req, res, next) => {
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('Referrer-Policy', 'no-referrer');
        res.set('X-Frame-Options', 'DENY');
        next();
    });
    app.use(cors({
        origin(origin, callback) { callback(null, !origin || config.allowedOrigins.includes(origin)); },
        credentials: true,
        exposedHeaders: ['Content-Range', 'Accept-Ranges'],
    }));
    app.use(express.json({ limit: '16kb' }));
    app.use(express.urlencoded({ extended: false, limit: '16kb' }));
    // Reject cross-site state changes even when a browser has an authenticated cookie.
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && origin
            && origin !== `${req.protocol}://${req.headers.host}` && !config.allowedOrigins.includes(origin)) {
            return res.status(403).json({ msg: '不允许该来源修改服务' });
        }
        next();
    });
    app.post('/api/auth/login', auth.login);
    app.post('/api/auth/logout', auth.logout);
    app.post('/api/auth/ticket', auth.renew);

    app.get('/list/:filePath(*)', auth.readRequired, asyncRoute(async (req, res) => {
        // Only "$"/"$$" denote the legacy root. Literal "$" and "__" in names are preserved.
        const input = ['$', '$$'].includes(req.params.filePath) ? '' : req.params.filePath;
        const directory = await resolveSafePath(config.rootPath, input);
        const info = await fs.promises.stat(directory);
        if (!info.isDirectory()) throw new HttpError(400, '目标不是目录');
        const start = Number(req.query.sta ?? 0);
        const end = Number(req.query.end ?? start + 200);
        if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end <= start || end - start > 2000) {
            throw new HttpError(400, '分页参数必须为非负整数，且每页最多 2000 项');
        }
        const entries = (await fs.promises.readdir(directory, { withFileTypes: true }))
            .filter(entry => !entry.name.startsWith('.') && !entry.isSymbolicLink())
            .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
        const list = await mapLimit(entries.slice(start, end), 16, async entry => {
            try {
                const fullPath = await resolveSafePath(config.rootPath, path.relative(config.rootPath, path.join(directory, entry.name)));
                const stat = await fs.promises.stat(fullPath);
                if (!stat.isFile() && !stat.isDirectory()) return null;
                return { name: entry.name, size: stat.size, isDirectory: stat.isDirectory(),
                    isFile: stat.isFile(), suffix: path.extname(entry.name), mtime: stat.mtime };
            } catch (error) {
                logger.warn(`忽略无法读取的目录项: ${entry.name}`);
                return null;
            }
        });
        res.set('Cache-Control', 'no-store').json({
            listNum: entries.length, list: list.filter(Boolean),
            nextStart: end < entries.length ? end : null,
        });
    }));

    app.get('/getFile/*', auth.readRequired, asyncRoute(async (req, res) => {
        let input = req.params[0];
        const match = /^(.*\.(?:jpe?g|png|gif|svg|webp))!([^/]*)$/i.exec(input);
        if (match) {
            const file = await resolveSafePath(config.rootPath, match[1], { allowRoot: false });
            const cached = await previews.image(file, match[2]);
            res.type('jpeg').set('Cache-Control', 'private, max-age=0, must-revalidate');
            return res.sendFile(cached);
        }
        const file = await resolveSafePath(config.rootPath, input, { allowRoot: false });
        if (!(await fs.promises.stat(file)).isFile()) throw new HttpError(400, '目标不是文件');
        const ext = path.extname(file).toLowerCase();
        res.set('Cache-Control', 'private, max-age=0, must-revalidate');
        // Serve active content only as sandboxed downloads, never in the application origin.
        res.set('Content-Security-Policy', "sandbox; default-src 'none'; frame-ancestors 'none'");
        if (BLOCKED_EXTENSIONS.has(ext) || !/^(image\/(?!svg)|audio\/|video\/|text\/plain)/.test(mimeTypes[ext] || '')) {
            res.attachment(path.basename(file));
        }
        // Express/send implements suffix ranges, If-Range and stream error handling.
        res.sendFile(file, { dotfiles: 'deny', acceptRanges: true });
    }));
    app.get('/getVideoPreview/:path(*)', auth.readRequired, asyncRoute(async (req, res) => {
        const file = await resolveSafePath(config.rootPath, req.params.path, { allowRoot: false });
        const cached = await previews.video(file);
        res.type('jpeg').set('Cache-Control', 'private, max-age=0, must-revalidate').sendFile(cached);
    }));

    app.post('/delFile', auth.writeRequired, asyncRoute(async (req, res) => {
        const file = await resolveSafePath(config.rootPath, req.body.filePath, { allowRoot: false });
        const stat = await fs.promises.lstat(file);
        if (stat.isDirectory()) await fs.promises.rm(file, { recursive: true, force: false });
        else await fs.promises.unlink(file);
        logger.info('文件删除成功');
        res.json({ msg: '删除成功' });
    }));

    // Serialize mutations targeting the same destination within this process.
    const destinationLocks = new Map();
    async function withDestination(destination, action) {
        const previous = destinationLocks.get(destination) || Promise.resolve();
        const work = previous.catch(() => {}).then(action);
        destinationLocks.set(destination, work);
        try { return await work; }
        finally { if (destinationLocks.get(destination) === work) destinationLocks.delete(destination); }
    }
    app.post('/renameFile', auth.writeRequired, asyncRoute(async (req, res) => {
        const oldFile = await resolveSafePath(config.rootPath, req.body.oldPath, { allowRoot: false });
        const newFile = await resolveSafePath(config.rootPath, req.body.newPath, { allowRoot: false, mustExist: false });
        if (fixUploadFilename(path.basename(newFile)) !== path.basename(newFile)) throw new HttpError(400, '目标文件名无效');
        await withDestination(newFile, async () => {
            await resolveSafePath(config.rootPath, req.body.oldPath, { allowRoot: false });
            await resolveSafePath(config.rootPath, req.body.newPath, { allowRoot: false, mustExist: false });
            try {
                await fs.promises.lstat(newFile);
                throw new HttpError(409, '目标名称已存在');
            } catch (error) { if (error.code !== 'ENOENT') throw error; }
            if ((await fs.promises.lstat(oldFile)).isDirectory()) await fs.promises.rename(oldFile, newFile);
            else await publishFile(oldFile, newFile);
        });
        logger.info('文件重命名成功');
        res.json({ msg: '重命名成功' });
    }));

    const upload = multer({
        storage: multer.diskStorage({
            async destination(req, file, callback) {
                try {
                    if (typeof req.body.destPath !== 'string') throw new HttpError(400, 'destPath 必须排在 file 字段之前');
                    req.uploadDir = await resolveSafePath(config.rootPath, req.body.destPath);
                    if (!(await fs.promises.stat(req.uploadDir)).isDirectory()) throw new HttpError(400, '目标不是文件夹');
                    callback(null, req.uploadDir);
                } catch (error) { callback(error); }
            },
            filename(req, file, callback) {
                req.uploadTemp = `.fsupload-${crypto.randomUUID()}`;
                callback(null, req.uploadTemp);
            },
        }),
        limits: { fileSize: Math.max(1, Math.floor(config.uploadMaxSizeMB * 1024 * 1024)), files: 1, fields: 1, parts: 3, fieldSize: 4096 },
        fileFilter(req, file, callback) {
            try { file.safeName = fixUploadFilename(file.originalname); callback(null, true); }
            catch (error) { callback(error); }
        },
    }).single('file');
    let activeUploads = 0;
    app.post('/upload', auth.writeRequired, (req, res, next) => {
        if (!config.uploadEnabled) return res.status(403).json({ msg: '上传功能未启用' });
        if (activeUploads >= 4) return res.status(429).json({ msg: '上传任务过多，请稍后重试' });
        activeUploads++;
        let released = false;
        const release = () => { if (!released) { activeUploads--; released = true; } };
        res.once('finish', release);
        res.once('close', release);
        upload(req, res, error => {
            if (error) return next(error);
            next();
        });
    }, asyncRoute(async (req, res) => {
        if (!req.file) throw new HttpError(400, '缺少文件');
        try {
            const finalPath = path.join(req.uploadDir, fixUploadFilename(req.file.originalname));
            await withDestination(finalPath, async () => {
                await resolveSafePath(config.rootPath, req.body.destPath);
                await publishFile(req.file.path, finalPath);
            });
            res.json({ msg: '上传成功', name: path.basename(finalPath), size: req.file.size });
        } finally {
            await fs.promises.unlink(req.file.path).catch(() => {});
        }
    }));
    app.post('/restartServer', (req, res, next) => {
        // Legacy request body password remains usable, but only the strong admin credential.
        if (typeof req.body?.pwd === 'string') req.headers['x-admin-token'] = req.body.pwd;
        auth.adminRequired(req, res, next);
    }, (req, res) => {
        res.json({ msg: '开始重启' });
        setTimeout(() => process.exit(0), 100);
    });
    app.get('/cleanOldData/:day', auth.adminRequired, (req, res) => res.status(405).json({ msg: '缓存清理请改用 POST /api/admin/cache/clean' }));
    app.use('/api/admin', auth.adminRequired, (req, res, next) => { req.adminSql = sql; next(); }, adminRouter);

    app.use(express.static(staticDir));
    if (fs.existsSync(adminDir)) {
        app.use('/admin', express.static(adminDir));
        app.get('/admin/*', (req, res, next) => {
            if (path.extname(req.path)) return next();
            res.sendFile(path.join(adminDir, 'index.html'));
        });
    }
    app.use((error, req, res, next) => {
        if (res.headersSent) return next(error);
        const status = error.status || (error.code === 'LIMIT_FILE_SIZE' ? 413
            : error instanceof multer.MulterError ? 400 : error.code === 'ENOENT' ? 404 : 500);
        if (status >= 500) logger.error(`请求处理失败: ${error.message}`);
        res.status(status).json({ msg: status >= 500 ? '服务器处理失败' : error.message });
    });
    return { app, auth };
}
