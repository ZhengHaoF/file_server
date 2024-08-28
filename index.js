
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
import bodyParser from 'body-parser'; // 注意：body-parser 已被 express 内置的中间件替代，建议使用 express.json() 和 express.urlencoded()
import sharp from 'sharp';
import log4js from 'log4js';
import basicAuth from 'express-basic-auth';

// 由于 express 4.16+ 版本中内置了对 JSON 和 URL-encoded 解析的支持，
// 因此你可能不再需要单独引入 bodyParser，而是可以这样做：
// app.use(express.json()); // 用于解析 JSON 格式的请求体
// app.use(express.urlencoded({ extended: true })); // 用于解析 URL-encoded 格式的请求体

// 注意：由于你的项目中可能仍然需要处理旧版本的 express 或特定的用例，
// 我保留了 bodyParser 的 import 语句，但建议查看你的 express 版本并考虑是否可以使用内置的中间件。

log4js.configure({
        "appenders": {
            "console": {"type": "console"},
            "file": {
                "type": "file",
                "filename": "logs/app.log",
                "maxLogSize": 10485760,
                "backups": 3,
                "compress": true
            }
        },
        "categories": {
            "default": {"appenders": ["console", "file"], "level": "info"}
        }
    }
);
const logger = log4js.getLogger();
const app = express();
const config = JSON.parse(stripBom(fs.readFileSync("config.json", 'utf8')));
const rootPath = config['rootPath'];
const startFtp = config['ftp'];
const startWebDav = config['webdav'];
const username = config['username'];
const password = config['password'];
const imgCache = config['imgCache'];
// const images = require('images');
let privateKey = fs.readFileSync('./cert/private.pem', 'utf8');
let certificate = fs.readFileSync('./cert/file.crt', 'utf8');
app.use(bodyParser());
let credentials = {key: privateKey, cert: certificate};
let PORT = 3000;
let SSLPORT = 3001;
// const mime = require("./mime.json");
app.use(cors())
app.use(express.static('web'))

import { Sql } from "./sqllite.js"
const sql = new Sql(imgCache);
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
                filePath = decodeURIComponent(filePath)
                filePath = rootPath + filePath

                let ext = path.extname(filePath);
                const hash = crypto.createHash('sha256');// sha256加密
                hash.update(filePath);
                const hashDigest = hash.digest('hex');
                logger.info(`图片路径哈希: ${hashDigest}`);
                sql.selectInfo(hashDigest).then((sqlRes) => {
                    if (!sqlRes) {
                        //如果数据库里没有
                        res.setHeader('Content-Type', 'application/octet-stream');
                        res.setHeader('Content-Disposition', 'attachment; filename=0.jpg');
                        getCompressImg(filePath, w, h).then((getImgRes) => {
                            res.send(getImgRes);
                            fs.writeFile(`${imgCache}/${hashDigest}${ext}`, getImgRes, (err) => {
                                if (err) {
                                    console.error('写入文件时发生错误', err);
                                    return;
                                }
                                logger.info(`${hashDigest}${ext}已成功保存`)
                            })
                        }).catch((err)=>{
                            logger.error(filePath + ` -> 处理失败:${err}`)
                        })
                        sql.insertInfo(hashDigest,ext);
                    } else {
                        logger.info(`${hashDigest}${ext} -> 已存在数据库中`)
                        sql.updateInfo(hashDigest);
                        fs.readFile(`${imgCache}/${hashDigest}${ext}`, (err, data) => {
                            res.setHeader('Content-Type', 'application/octet-stream');
                            res.setHeader('Content-Disposition', 'attachment; filename=0.jpg');
                            if (err) {
                                //文件不存在就重新生成
                                logger.info(`${hashDigest}${ext} -> 缓存文件不存在`)
                                getCompressImg(filePath, w, h).then((getImgRes) => {
                                    res.send(getImgRes);
                                    fs.writeFile(`./imgCache/${hashDigest}${ext}`, getImgRes, (err) => {
                                        if (err) {
                                            logger.error(`写入文件时发生错误: ${err}`)
                                            return;
                                        }
                                        logger.info(`${hashDigest}${ext} -> 已成功保存`)
                                        res.status(404).send();
                                    })
                                });
                                return;
                            }
                            res.send(data);
                        })
                    }
                }).catch((err) => {

                })

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
    logger.info(`${filePath} -> 图片开始处理，最大宽度${w}最大高度${h}`)
    // 你可以选择直接发送响应，或者继续处理请求（调用 next()）
    return new Promise((resolve, reject) => {
        let stime = new Date().getTime();
        sharp(filePath)
            .resize({
                    width: Number(w),
                    height: Number(h),
                    fit: sharp.fit.inside
                },
            )
            .toBuffer()
            .then(data => {
                // 100 pixels wide, auto-scaled height
                resolve(data);
                let etime = new Date().getTime();
                logger.info(filePath + " -> 处理耗时:" + (etime - stime))
            }).catch((err) => {
            reject(err);
        });
    })

}

// 使用中间件拦截图片请求
app.use(imageInterceptor);
//托管静态文件
app.use('/getFile', express.static(rootPath))
//获取当前文件夹
function getNowPath(filePath) {
    let nowPath = "";
    if (filePath === "$") {
        filePath = ""
    } else {
        filePath = filePath.replace(/\$/g, "")
    }
    filePath = filePath.replace(/__/g, "/")
    nowPath = rootPath + filePath;
    logger.info(nowPath)
    return nowPath;
}


// , basicAuth({
//     users: {
//         [username]:password
//     },
//     challenge: true,
// })

//获取文件列表
app.get('/list/:filePath', (req, res) => {
    let nowPath = getNowPath(req.params.filePath);
    let {sta, end} = req.query;
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
            res.status(404).send("文件夹读取错误");
        }
    } else {
        //文件文件夹路径不存在
        return res.status(404).send("文件夹不存在");
    }

})

app.post('/delFile', (req, res) => {
    fs.unlinkSync(`${rootPath}${req.body.filePath}`)
    return res.json({msg: '删除成功'});
})

app.get('/cleanOldData/:day', (req, res) => {
    let day = req.params.day;
    sql.cleanOldData(day);
    res.send("清理旧文件成功");
})

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);
httpServer.listen(PORT, function () {
    console.log('HTTP 服务运行在: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS 服务运行在: https://localhost:%s', SSLPORT);
});

if (startWebDav) {
    //webdav server
    const WebdavCli = require("./webdav-server");
    const config = {
        // 设置WebDAV服务器的根文件夹路径
        path: rootPath,
        // 设置WebDAV服务器要监听的主机地址，留空则使用系统默认或配置文件中指定的
        host: "",
        // 设置WebDAV服务器要监听的端口
        port: 1900,
        // 是否启用摘要认证，false表示不启用
        digest: false,
        // 设置基本/摘要认证的用户名
        username: "root",
        // 设置基本/摘要认证的密码
        password: "root",
        // 目录
        directory: "",
        //显示自动索引
        autoIndex: false,
        // 是否启用HTTPS
        ssl: true,
        // SSL密钥文件路径，留空则表示不使用自定义密钥
        sslKey: "",
        // SSL证书文件路径，留空则表示不使用自定义证书
        sslCert: "",
        // 禁用认证，true表示禁用所有形式的认证
        disableAuthentication: true,
        // 设置访问权限，这里指定为['all']，表示允许所有权限（具体实现可能依赖于服务器配置）
        /* 具体配置
            | 'all' | 所有权限 |
            | 'canCreate' | 可以创建文件或目录 |
            | 'canDelete' | 可以删除文件或目录 |
            | 'canMove' | 可以移动文件或目录 |
            | 'canRename' | 可以重命名文件或目录 |
            | 'canAppend' | 可以向文件追加内容 |
            | 'canWrite' | 可以写入文件 |
            | 'canRead' | 可以读取文件或目录内容 |
            | 'canSource' | 可以作为源（例如，用于复制或下载） |
            | 'canGetMimeType' | 可以获取文件的MIME类型 |
            | 'canGetSize' | 可以获取文件或目录的大小 |
            | 'canListLocks' | 可以列出文件或目录上的锁 |
            | 'canSetLock' | 可以设置文件或目录上的锁 |
            | 'canRemoveLock' | 可以移除文件或目录上的锁 |
            | 'canGetAvailableLocks' | 可以获取可用的锁类型或状态 |
            | 'canGetLock' | 可以获取文件或目录上的当前锁信息 |
            | 'canAddChild' | 可以向目录添加子项（文件或子目录） |
            | 'canRemoveChild' | 可以从目录中移除子项 |
            | 'canGetChildren' | 可以获取目录的子项列表 |
            | 'canSetProperty' | 可以设置文件或目录的属性 |
            | 'canGetProperty' | 可以获取文件或目录的特定属性 |
            | 'canGetProperties' | 可以获取文件或目录的所有属性 |
            | 'canRemoveProperty' | 可以移除文件或目录的特定属性 |
            | 'canGetCreationDate' | 可以获取文件或目录的创建日期 |
            | 'canGetLastModifiedDate' | 可以获取文件或目录的最后修改日期 |
            | 'canGetWebName' | 可以获取文件或目录的网络名称（例如，URL路径） |
            | 'canGetType' | 可以获取文件或目录的类型（例如，文件、目录） |
        */
        rights: ['all']
    };
    const run = async () => {
        const webdavCli = new WebdavCli.WebdavCli(config);
        const webdavCliServer = await webdavCli.start();
        webdavCliServer.on('log', (ctx, fs, path, log) => console.log(log));
    };
    run().then((res) => {
    });
}

if (startFtp) {
    const FtpServer = require("./ftp-server2");
    const ftpServer = new FtpServer.FtpServer({
        anonymous: true, //为true时候可匿名登录
        port: 21,
        root: rootPath,
        username: "root",
        password: "root",
    })
    ftpServer.ftpRun();
}

console.log("使用Ctrl+C停止运行");