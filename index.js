
// 引入 Node.js 核心模块
import express from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// 引入第三方 npm 包
import cors from 'cors';
import stripBom from 'strip-bom';
import sharp from 'sharp';
import log4js from 'log4js';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

// 引入管理后台模块
import { adminRouter, setServerStatus } from './routes/admin.js';
import { adminAuth } from './middleware/adminAuth.js';
import { WebSocketServer } from 'ws';
import { parseLogLine } from './utils/systemInfo.js';



// 注意：由于你的项目中可能仍然需要处理旧版本的 express 或特定的用例，
// 我保留了 bodyParser 的 import 语句，但建议查看你的 express 版本并考虑是否可以使用内置的中间件。

log4js.configure({
    "appenders": {
        "console": { "type": "console" },
        "file": {
            "type": "file",
            "filename": "logs/app.log",
            "maxLogSize": 10485760,
            "backups": 3,
            "compress": true
        }
    },
    "categories": {
        "default": { "appenders": ["console", "file"], "level": "info" }
    }
}
);
const logger = log4js.getLogger();
const app = express();
const config = JSON.parse(stripBom(fs.readFileSync("config.json", 'utf8')));
const rootPath = config['rootPath'];
if (!fs.existsSync(rootPath)) {
    logger.error(`文件夹不存在，停止运行：${rootPath}`);
    process.exit()
}

const imgCache = config['imgCache'];
// 新增目录创建逻辑
if (!fs.existsSync(imgCache)) {
    try {
        fs.mkdirSync(imgCache, { recursive: true });
        logger.info(`自动创建图片缓存目录：${imgCache}`);
    } catch (err) {
        logger.error(`创建缓存目录失败：${err.message}`);
        process.exit();
    }
}

const restartPwd = config['restartPwd'];
// const images = require('images');
let privateKey = fs.readFileSync('./cert/private.pem', 'utf8');
let certificate = fs.readFileSync('./cert/file.crt', 'utf8');
// app.use(bodyParser());
let credentials = { key: privateKey, cert: certificate };
let PORT = 3000;
let SSLPORT = 3001;
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mimeTypes = require("./mime.json");
app.use(cors({
    exposedHeaders: ['Content-Range', 'Accept-Ranges']
}))
app.use(express.static('web'))
app.use(express.json()); // 用于解析 JSON 格式的请求体
app.use(express.urlencoded({ extended: true })); // 用于解析 URL-encoded 格式的请求体
import { Sql } from "./sqllite.js"
const sql = new Sql(imgCache);
// 路径安全验证函数
const validatePath = (targetPath, basePath) => {
    const normalizedPath = path.normalize(targetPath);
    const normalizedBase = path.normalize(basePath);
    return normalizedPath.startsWith(normalizedBase);
};

// 拦截图片请求的中间件
const imageInterceptor = (req, res, next) => {
    logger.info(`收到请求：${req.url}`);
    try {
        let filePath = req.path.split("!")[0];
        // 定义你想要拦截的图片扩展名
        const imageExtensions = /.(jpg|jpeg|png|gif|svg)$/i;
        // 检查请求的 URL 是否以图片扩展名结尾
        if (imageExtensions.test(filePath)) {

            let size = req.path.split("!")[1] || "";
            // 这里可以添加你想要的逻辑
            if (size) {
                let w = size.split("x")[0];
                let h = size.split("x")[1];
                filePath = filePath.replace("/getFile", "");
                filePath = decodeURIComponent(filePath);
                const fullPath = path.join(rootPath, filePath);

                if (!validatePath(fullPath, rootPath)) {
                    logger.warn(`路径遍历攻击尝试被拦截：${filePath}`);
                    return res.status(403).json({ msg: '非法路径访问' });
                }
                filePath = fullPath;
                let ext = path.extname(filePath);
                const hash = crypto.createHash('sha256');// sha256加密
                hash.update(filePath + `!${size}`);
                const hashDigest = hash.digest('hex');
                logger.info(`图片路径哈希: ${hashDigest}`);
                const sqlRes = sql.selectInfo(hashDigest);
                if (!sqlRes) {
                    //如果数据库里没有
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.setHeader('Content-Disposition', 'attachment; filename=0.jpg');
                    getCompressImg(filePath, w, h).then((getImgRes) => {
                        res.send(getImgRes);
                        fs.writeFile(`${imgCache}/${hashDigest}${ext}`, getImgRes, (err) => {
                            if (err) {
                                logger.error(`写入缓存文件失败: ${err.message}`);
                                return;
                            }
                            logger.info(`${hashDigest}${ext}已成功保存`)
                        })
                    }).catch((err) => {
                        logger.error(`${filePath} -> 图片处理失败: ${err.message}`);
                        res.status(500).json({ msg: '图片处理失败' });
                    })
                    sql.insertInfo(hashDigest, ext);
                } else {
                    logger.info(`${hashDigest}${ext} -> 已存在数据库中`)
                    sql.updateInfo(hashDigest);
                    fs.readFile(`${imgCache}/${hashDigest}${ext}`, (err, data) => {
                        res.setHeader('Content-Type', 'application/octet-stream');
                        res.setHeader('Content-Disposition', 'attachment; filename=0.jpg');
                        if (err) {
                            logger.info(`${hashDigest}${ext} -> 缓存文件不存在`)
                            getCompressImg(filePath, w, h).then((getImgRes) => {
                                res.send(getImgRes);
                                fs.writeFile(`${imgCache}/${hashDigest}${ext}`, getImgRes, (err) => {
                                    if (err) {
                                        logger.error(`写入缓存文件失败: ${err.message}`);
                                        return;
                                    }
                                    logger.info(`${hashDigest}${ext} -> 已成功保存`)
                                })
                            }).catch((err) => {
                                logger.error(`${filePath} -> 图片处理失败: ${err.message}`);
                                res.status(500).json({ msg: '图片处理失败' });
                            });
                            return;
                        }
                        res.send(data);
                    })
                }

            } else {
                // 或者继续处理请求（如果你只是想记录日志）
                next();
            }
        } else {
            // 不是图片请求，继续下一个中间件或路由
            next();
        }
    } catch (e) {
        logger.error(`图片处理错误:${e}`)
        next();
    }

};

function getCompressImg(filePath, w, h) {
    return new Promise((resolve, reject) => {
        let stime = new Date().getTime();
        sharp(filePath)
            .resize({
                width: Number(w),
                height: Number(h),
                fit: sharp.fit.inside,
                withoutEnlargement: true
            },
            )
            .jpeg({
                progressive: true,
            })
            .toBuffer()
            .then(data => {
                resolve(data);
                let etime = new Date().getTime();
                logger.info(filePath + " -> 处理耗时:" + (etime - stime))
            }).catch((err) => {
                reject(err);
            });
    })

}

function getVideoThumbnail(filePath, timestamp = '00:00:01') {
    return new Promise((resolve, reject) => {
        let stime = new Date().getTime();
        const tempOutputPath = `${imgCache}/temp_thumb_${Date.now()}.jpg`;

        ffmpeg(filePath)
            .on('start', (commandLine) => {
                logger.info('FFmpeg 命令: ' + commandLine);
            })
            .on('progress', (progress) => {
                if (progress.percent) {
                    logger.info('视频截图处理进度: ' + progress.percent.toFixed(2) + '%');
                }
            })
            .on('stderr', (stderrLine) => {
                logger.info('FFmpeg stderr: ' + stderrLine);
            })
            .on('end', () => {
                fs.readFile(tempOutputPath, (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    fs.unlink(tempOutputPath, (unlinkErr) => {
                        if (unlinkErr) {
                            logger.error('删除临时文件失败: ' + unlinkErr.message);
                        }
                    });
                    let etime = new Date().getTime();
                    logger.info(filePath + ' -> 视频截图生成耗时: ' + (etime - stime) + 'ms');
                    resolve(data);
                });
            })
            .on('error', (err, stdout, stderr) => {
                logger.error('视频截图生成失败: ' + err.message);
                logger.error('FFmpeg stdout: ' + stdout);
                logger.error('FFmpeg stderr: ' + stderr);
                reject(err);
            })
            .screenshots({
                count: 1,
                folder: imgCache,
                filename: `temp_thumb_${Date.now()}.jpg`,
                size: '320x240',
                timemarks: [timestamp]
            });
    });
}

// 使用中间件拦截图片请求
app.use(imageInterceptor);

// Range 请求支持中间件
const rangeInterceptor = (req, res, next) => {
    const range = req.headers.range;
    if (!range) return next();

    try {
        let filePath = req.path.replace(/^\/getFile/, '');
        filePath = decodeURIComponent(filePath);
        const fullPath = path.join(rootPath, filePath);

        if (!validatePath(fullPath, rootPath)) {
            logger.warn(`Range请求路径遍历攻击拦截：${filePath}`);
            return res.status(403).json({ msg: '非法路径访问' });
        }

        fs.stat(fullPath, (err, stat) => {
            if (err || !stat.isFile()) return next();

            const fileSize = stat.size;
            const ext = path.extname(fullPath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            // 校验 Range 范围
            if (isNaN(start) || isNaN(end) || start > end || start >= fileSize) {
                logger.warn(`无效Range请求: ${range}, 文件大小: ${fileSize}`);
                res.status(416).set('Content-Range', `bytes */${fileSize}`);
                return res.json({ msg: '无效的Range请求范围' });
            }

            // end 不能超过文件大小
            const actualEnd = Math.min(end, fileSize - 1);
            const chunkSize = actualEnd - start + 1;

            logger.info(`Range请求: ${filePath} [${start}-${actualEnd}/${fileSize}]`);

            res.status(206);
            res.set({
                'Content-Range': `bytes ${start}-${actualEnd}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': contentType
            });

            const stream = fs.createReadStream(fullPath, { start, end: actualEnd });
            stream.pipe(res);
            stream.on('error', (streamErr) => {
                logger.error(`Range流读取错误: ${streamErr.message}`);
                if (!res.headersSent) {
                    res.status(500).end();
                }
            });
        });
    } catch (e) {
        logger.error(`Range处理异常: ${e.message}`);
        next();
    }
};

//托管静态文件
app.use('/getFile', rangeInterceptor, express.static(rootPath))
//获取当前文件夹
function getNowPath(filePath) {
    let nowPath = "";
    if (filePath === "$") {
        filePath = ""
    } else {
        filePath = filePath.replace(/\$/g, "")
    }
    filePath = filePath.replace(/__/g, "/")
    const fullPath = path.join(rootPath, filePath);

    if (!validatePath(fullPath, rootPath)) {
        logger.warn(`路径遍历攻击尝试被拦截：${filePath}`);
        return null;
    }

    nowPath = fullPath;
    logger.info(nowPath)
    return nowPath;
}

//获取文件列表
app.get('/list/:filePath(*)', (req, res) => {
    let nowPath = getNowPath(req.params.filePath);

    if (nowPath === null) {
        return res.status(403).json({ msg: '非法路径访问' });
    }

    let { sta, end } = req.query;
    if (fs.existsSync(nowPath)) {
        //文件文件夹路径存在
        try {
            fs.readdir(nowPath, (err, files) => {
                if (err) {
                    logger.error(`${nowPath}文件夹读取错误：${err}`);
                }
                let data = [];
                if (files) {
                    files.forEach(fileName => {
                        let fileInfo = fs.statSync(nowPath + '/' + fileName);
                        data.push({
                            "name": fileName,
                            "size": fileInfo.size,
                            "isDirectory": fileInfo.isDirectory(),
                            "isFile": fileInfo.isFile(),
                            "suffix": path.extname(fileName),
                            "mtime": fileInfo.mtime,
                        })
                    });
                    let retList = {
                        listNum: data.length,
                        list: sta && end ? data.slice(sta, end) : data
                    }
                    return res.json(retList);
                }
            });
        } catch (e) {
            logger.error(`${nowPath}文件夹返回异常：${e}`);
            return res.status(500).json({ msg: '文件夹读取错误' });
        }
    } else {
        //文件文件夹路径不存在
        return res.status(404).json({ msg: '文件夹不存在' });
    }

})

app.post('/delFile', (req, res) => {
    try {
        const filePath = req.body.filePath;
        if (!filePath) {
            return res.status(400).json({ msg: '缺少文件路径' });
        }

        const fullPath = path.join(rootPath, filePath);

        if (!validatePath(fullPath, rootPath)) {
            logger.warn(`路径遍历攻击尝试被拦截：${filePath}`);
            return res.status(403).json({ msg: '非法路径访问' });
        }

        if (path.resolve(fullPath) === path.resolve(rootPath)) {
            logger.warn(`尝试删除根目录被拦截：${filePath}`);
            return res.status(403).json({ msg: '不能删除根目录' });
        }

        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ msg: '文件或文件夹不存在' });
        }

        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
            logger.info(`文件夹删除成功：${fullPath}`);
            return res.json({ msg: '删除成功' });
        } else {
            fs.unlinkSync(fullPath);
            logger.info(`文件删除成功：${fullPath}`);
            return res.json({ msg: '删除成功' });
        }
    } catch (err) {
        logger.error(`删除失败：${err.message}`);
        return res.status(500).json({ msg: '删除失败' });
    }
});

app.post('/renameFile', (req, res) => {
    try {
        const { oldPath, newPath } = req.body;
        if (!oldPath || !newPath) {
            return res.status(400).json({ msg: '缺少旧路径或新路径' });
        }

        const fullOldPath = path.join(rootPath, oldPath);
        const fullNewPath = path.join(rootPath, newPath);

        if (!validatePath(fullOldPath, rootPath) || !validatePath(fullNewPath, rootPath)) {
            logger.warn(`路径遍历攻击尝试被拦截：${oldPath} -> ${newPath}`);
            return res.status(403).json({ msg: '非法路径访问' });
        }

        if (path.resolve(fullOldPath) === path.resolve(rootPath)) {
            logger.warn(`尝试重命名根目录被拦截`);
            return res.status(403).json({ msg: '不能重命名根目录' });
        }

        if (!fs.existsSync(fullOldPath)) {
            return res.status(404).json({ msg: '原文件或文件夹不存在' });
        }

        if (fs.existsSync(fullNewPath)) {
            return res.status(409).json({ msg: '目标名称已存在' });
        }

        fs.renameSync(fullOldPath, fullNewPath);
        logger.info(`重命名成功：${fullOldPath} -> ${fullNewPath}`);
        return res.json({ msg: '重命名成功' });
    } catch (err) {
        logger.error(`重命名失败：${err.message}`);
        return res.status(500).json({ msg: '重命名失败' });
    }
});

app.post('/restartServer', (req, res) => {
    if (String(req.body.pwd) === String(restartPwd)) {
        logger.info('收到重启服务器请求');
        res.json({ msg: '开始重启' }).end();
        setTimeout(() => {
            logger.info('服务器正在退出...');
            process.exit(0);
        }, 100);
    } else {
        logger.warn('重启服务器请求 - 密码错误');
        return res.status(401).json({ msg: '密码错误' });
    }
})

app.get('/cleanOldData/:day', (req, res) => {
    let day = req.params.day;
    sql.cleanOldData(day);
    res.send("清理旧文件成功");
})

app.get('/getVideoPreview/:path(*)', (req, res) => {
    logger.info(`收到视频预览请求：${req.params.path}`);

    try {
        let videoPath = req.params.path;
        videoPath = decodeURIComponent(videoPath);
        const fullPath = path.join(rootPath, videoPath);

        if (!validatePath(fullPath, rootPath)) {
            logger.warn(`路径遍历攻击尝试被拦截：${videoPath}`);
            return res.status(403).json({ msg: '非法路径访问' });
        }

        if (!fs.existsSync(fullPath)) {
            logger.error(`视频文件不存在：${fullPath}`);
            return res.status(404).json({ msg: '视频文件不存在' });
        }

        const hash = crypto.createHash('sha256');
        hash.update(fullPath + '!video_preview');
        const hashDigest = hash.digest('hex');
        logger.info(`视频路径哈希: ${hashDigest}`);

        const cacheFileName = `${hashDigest}.jpg`;
        const cacheFilePath = `${imgCache}/${cacheFileName}`;

        const sqlRes = sql.selectInfo(hashDigest);

        if (sqlRes) {
            logger.info(`${cacheFileName} -> 已存在数据库中`);
            sql.updateInfo(hashDigest);

            fs.readFile(cacheFilePath, (err, data) => {
                if (err) {
                    logger.info(`${cacheFileName} -> 缓存文件不存在，需要重新生成`);
                    getVideoThumbnail(fullPath).then((thumbData) => {
                        res.setHeader('Content-Type', 'image/jpeg');
                        res.setHeader('Content-Disposition', `attachment; filename=${cacheFileName}`);
                        res.send(thumbData);

                        fs.writeFile(cacheFilePath, thumbData, (writeErr) => {
                            if (writeErr) {
                                logger.error(`写入缓存文件失败: ${writeErr.message}`);
                            } else {
                                logger.info(`${cacheFileName} -> 已成功保存`);
                            }
                        });
                    }).catch((err) => {
                        logger.error(`${fullPath} -> 视频截图生成失败: ${err.message}`);
                        res.status(500).json({ msg: '视频截图生成失败' });
                    });
                    return;
                }
                res.setHeader('Content-Type', 'image/jpeg');
                res.setHeader('Content-Disposition', `attachment; filename=${cacheFileName}`);
                res.send(data);
            });
        } else {
            logger.info(`${cacheFileName} -> 数据库中不存在，开始生成视频截图`);
            getVideoThumbnail(fullPath).then((thumbData) => {
                res.setHeader('Content-Type', 'image/jpeg');
                res.setHeader('Content-Disposition', `attachment; filename=${cacheFileName}`);
                res.send(thumbData);

                fs.writeFile(cacheFilePath, thumbData, (err) => {
                    if (err) {
                        logger.error(`写入缓存文件失败: ${err.message}`);
                    } else {
                        logger.info(`${cacheFileName} -> 已成功保存`);
                    }
                });

                sql.insertInfo(hashDigest, '.jpg');
            }).catch((err) => {
                logger.error(`${fullPath} -> 视频截图生成失败: ${err.message}`);
                res.status(500).json({ msg: '视频截图生成失败' });
            });
        }
    } catch (e) {
        logger.error(`视频预览处理错误: ${e}`);
        res.status(500).json({ msg: '视频预览处理错误' });
    }
});

// 管理后台静态文件
app.use('/admin', express.static('admin'));

// 管理后台 API
app.use('/api/admin', adminAuth);
app.use('/api/admin', adminRouter);

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

// WebSocket 日志流
const wss = new WebSocketServer({ server: httpServer, path: '/api/admin/logs/stream' });

wss.on('connection', (ws, req) => {
    // 验证 token
    const url = new URL(req.url, 'http://localhost');
    const token = url.searchParams.get('token');

    if (String(token) !== String(config.restartPwd)) {
        ws.close(1008, '未授权');
        return;
    }

    logger.info('WebSocket 日志流客户端已连接');

    // 客户端筛选条件
    let filter = { level: null };

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            if (data.action === 'filter') {
                filter.level = data.level || null;
                logger.info(`日志流筛选条件已更新: ${JSON.stringify(filter)}`);
            }
        } catch (err) {
            // 忽略无效消息
        }
    });

    // 监听日志文件变化
    let lastSize = 0;
    try {
        const stats = fs.statSync('logs/app.log');
        lastSize = stats.size;
    } catch (err) {
        // 文件不存在
    }

    const watcher = fs.watch('logs/app.log', (eventType) => {
        if (eventType === 'change') {
            try {
                const stats = fs.statSync('logs/app.log');
                if (stats.size > lastSize) {
                    // 读取新增内容
                    const stream = fs.createReadStream('logs/app.log', {
                        start: lastSize,
                        encoding: 'utf8'
                    });

                    let buffer = '';
                    stream.on('data', (chunk) => {
                        buffer += chunk;
                    });

                    stream.on('end', () => {
                        const lines = buffer.split('\n').filter(line => line.trim());
                        lines.forEach(line => {
                            const log = parseLogLine(line);
                            if (!log) return;

                            // 应用筛选
                            if (filter.level && log.level.toLowerCase() !== filter.level.toLowerCase()) {
                                return;
                            }

                            // 推送给客户端
                            if (ws.readyState === ws.OPEN) {
                                ws.send(JSON.stringify(log));
                            }
                        });
                        lastSize = stats.size;
                    });
                }
            } catch (err) {
                // 忽略错误
            }
        }
    });

    ws.on('close', () => {
        watcher.close();
        logger.info('WebSocket 日志流客户端已断开');
    });

    ws.on('error', () => {
        watcher.close();
    });
});

httpServer.listen(PORT, function () {
    console.log('HTTP 服务运行在: http://localhost:%s', PORT);
    setServerStatus({ http: 'running' });
});
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS 服务运行在: https://localhost:%s', SSLPORT);
    setServerStatus({ https: 'running' });
});

httpServer.on('close', () => {
    console.log('HTTP 服务已停止');
    setServerStatus({ http: 'stopped' });
});
httpServer.on('error', (err) => {
    console.error('HTTP 服务错误:', err.message);
    setServerStatus({ http: 'stopped' });
});
httpsServer.on('close', () => {
    console.log('HTTPS 服务已停止');
    setServerStatus({ https: 'stopped' });
});
httpsServer.on('error', (err) => {
    console.error('HTTPS 服务错误:', err.message);
    setServerStatus({ https: 'stopped' });
});

console.log("使用Ctrl+C停止运行");