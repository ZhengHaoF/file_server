
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
import basicAuth from 'express-basic-auth';



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
if(!fs.existsSync(rootPath)){
    logger.error(`文件夹不存在，停止运行：${rootPath}`);
    process.exit()
}
const imgCache = config['imgCache'];
const restartPwd = config['restartPwd'];
// const images = require('images');
let privateKey = fs.readFileSync('./cert/private.pem', 'utf8');
let certificate = fs.readFileSync('./cert/file.crt', 'utf8');
// app.use(bodyParser());
let credentials = {key: privateKey, cert: certificate};
let PORT = 3000;
let SSLPORT = 3001;
// const mime = require("./mime.json");
app.use(cors())
app.use(express.static('web'))
app.use(express.json()); // 用于解析 JSON 格式的请求体
app.use(express.urlencoded({ extended: true })); // 用于解析 URL-encoded 格式的请求体
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
                filePath = decodeURIComponent(filePath);
                filePath = rootPath + filePath;
                let ext = path.extname(filePath);
                const hash = crypto.createHash('sha256');// sha256加密
                hash.update(filePath + `!${size}`);
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
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                },
            )
            .jpeg({
                progressive:true,
            })
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
app.get('/list/:filePath(*)', (req, res) => {
    let nowPath = getNowPath(req.params.filePath);
    let {sta, end} = req.query;
    console.log(req.params.filePath,123456)
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


app.post('/restartServer', (req, res) => {
    if (String(req.body.pwd) === String(restartPwd)) {
        res.json({msg: '开始重启'});
        process.exit();
    } else {
        return res.json({msg: '密码错误'});
    }
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

console.log("使用Ctrl+C停止运行");