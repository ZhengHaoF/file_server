const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const basicAuth = require('express-basic-auth');
const rootPath = require("./config.json")['rootPath'];
const startFtp = require("./config.json")['ftp'];
const startWebDav = require("./config.json")['webdav'];
const username = require("./config.json")['username'];
const password = require("./config.json")['password'];
const images = require('images');
let privateKey = fs.readFileSync('./cert/private.pem', 'utf8');
let certificate = fs.readFileSync('./cert/file.crt', 'utf8');
let bodyParser = require('body-parser');
const sharp = require("sharp");
app.use(bodyParser());
let credentials = {key: privateKey, cert: certificate};
let PORT = 3000;
let SSLPORT = 3001;
// const mime = require("./mime.json");
app.use(cors())
app.use(express.static('web'))


// 拦截图片请求的中间件
const imageInterceptor = (req, res, next) => {

    try {

        let path = req.path.split("!")[0];
        // 定义你想要拦截的图片扩展名
        const imageExtensions = /.(jpg|jpeg|png|gif|svg)$/i;
        // 检查请求的 URL 是否以图片扩展名结尾
        if (imageExtensions.test(path)) {

            let size = req.path.split("!")[1] || "";
            // 这里可以添加你想要的逻辑
            if (size) {
                let w = size.split("x")[0];
                let h = size.split("x")[1];
                path = path.replace("/getFile", "");
                path = decodeURIComponent(path)
                path = rootPath + path
                // console.log(`图片处理路径: ${path}`);
                // 你可以选择直接发送响应，或者继续处理请求（调用 next()）
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', 'attachment; filename=0.jpg');
                let stime = new Date().getTime();
                sharp(path)
                    .resize({
                            width: Number(w),
                            height: Number(h),
                            fit: sharp.fit.inside
                        },
                    )
                    .toBuffer()
                    .then(data => {
                        // 100 pixels wide, auto-scaled height
                        res.send(data)
                        let etime = new Date().getTime();
                        console.log(path + " -> 处理耗时:" + (etime - stime))
                    });

            } else {
                // 或者继续处理请求（如果你只是想记录日志）
                next();
            }
        } else {
            // 不是图片请求，继续下一个中间件或路由
            next();
        }
    } catch (e) {
        console.log(e);
        next();
    }

};


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
    console.log(nowPath)
    return nowPath;
}


//获取文件列表
app.get('/list/:filePath', basicAuth({
    users: {
        [username]:password
    },
    challenge: true,
}), (req, res) => {
    let nowPath = getNowPath(req.params.filePath);
    let {sta, end, aaa} = req.query;
    if (fs.existsSync(nowPath)) {
        //文件文件夹路径存在
        console.log('Directory exists!');
        try {
            fs.readdir(nowPath, (err, files) => {
                if (err) {
                    console.log(err)
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
            console.log(e)
        }
    } else {
        //文件文件夹路径不存在
        return res.status(404).send("文件夹不存在")
    }

})

app.post('/delFile', (req, res) => {
    fs.unlinkSync(`${rootPath}${req.body.filePath}`)
    return res.json({msg: '删除成功'});
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