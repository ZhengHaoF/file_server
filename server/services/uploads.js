import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import {
    HttpError,
    resolveSafePathAsync,
    fixUploadFilename,
    publishFile,
} from '../utils/fileSafety.js';

/** Isolate upload limits, temporary-file lifecycle and publication from application wiring. */
export function createUploadService(config, logger, withDestination, onPublished) {
    let active = 0;
    const parser = () =>
        multer({
            storage: multer.diskStorage({
                async destination(req, file, callback) {
                    try {
                        if (typeof req.body.destPath !== 'string')
                            throw new HttpError(400, 'destPath 必须排在 file 字段之前');
                        req.uploadDir = await resolveSafePathAsync(
                            config.rootPath,
                            req.body.destPath,
                        );
                        if (!(await fs.promises.stat(req.uploadDir)).isDirectory())
                            throw new HttpError(400, '目标不是文件夹');
                        callback(null, req.uploadDir);
                    } catch (error) {
                        callback(error);
                    }
                },
                filename(req, file, callback) {
                    req.uploadTemp = `.fsupload-${crypto.randomUUID()}`;
                    if (req.aborted) return callback(new HttpError(400, '上传已中断'));
                    callback(null, req.uploadTemp);
                },
            }),
            limits: {
                fileSize: Math.max(1, Math.floor(config.uploadMaxSizeMB * 1024 * 1024)),
                files: 1,
                fields: 1,
                parts: 3,
                fieldSize: 4096,
            },
            fileFilter(req, file, callback) {
                try {
                    file.safeName = fixUploadFilename(file.originalname);
                    callback(null, true);
                } catch (error) {
                    callback(error);
                }
            },
        }).single('file');

    async function removeTemporary(req) {
        if (!req.uploadDir || !req.uploadTemp) return;
        await fs.promises.unlink(path.join(req.uploadDir, req.uploadTemp)).catch((error) => {
            if (error.code !== 'ENOENT')
                logger.warn(`上传临时文件清理失败: ${error.code || 'UNKNOWN'}`);
        });
    }

    function receive(req, res, next) {
        if (!config.uploadEnabled) return res.status(403).json({ msg: '上传功能未启用' });
        if (active >= 4) return res.status(429).json({ msg: '上传任务过多，请稍后重试' });
        active++;
        let released = false;
        const release = () => {
            if (!released) {
                active--;
                released = true;
            }
        };
        req.releaseUpload = release;
        res.once('finish', release);
        // Multer completes abort cleanup before its callback; do not release a slot
        // merely because the socket closed while storage is still shutting down.
        parser()(req, res, (error) => {
            if (error || req.aborted) {
                void removeTemporary(req).finally(() => {
                    release();
                    if (!req.aborted) next(error);
                });
                return;
            }
            next();
        });
    }

    async function publish(req, res) {
        try {
            if (!req.file) throw new HttpError(400, '缺少文件');
            if (req.aborted || res.destroyed) throw new HttpError(400, '上传连接已断开');
            const finalPath = path.join(req.uploadDir, fixUploadFilename(req.file.originalname));
            await withDestination(finalPath, async () => {
                if (req.aborted || res.destroyed) throw new HttpError(400, '上传连接已断开');
                await resolveSafePathAsync(config.rootPath, req.body.destPath);
                await publishFile(req.file.path, finalPath);
            });
            onPublished(req, finalPath, req.file.size);
            res.json({ msg: '上传成功', name: path.basename(finalPath), size: req.file.size });
        } finally {
            await removeTemporary(req);
            req.releaseUpload?.();
        }
    }

    return { receive, publish, active: () => active };
}
