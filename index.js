const express = require('express')
const http = require('http');
const https = require('https');
const cors = require('cors')
const fs = require('fs');
const path = require('path')
const app = express()
const rootPath = require("./config.json")['rootPath'];
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
                console.log(`图片处理路径: ${path}`);
                // 你可以选择直接发送响应，或者继续处理请求（调用 next()）
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', 'attachment; filename=0.jpg');
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
                    });

            } else {
                // 或者继续处理请求（如果你只是想记录日志）
                next();
            }
        } else {
            // 不是图片请求，继续下一个中间件或路由
            next();
        }
    }catch (e) {
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
app.get('/list/:filePath', (req, res) => {
    let nowPath = getNowPath(req.params.filePath)
    fs.readdir(nowPath, (err, files) => {
        if (err) {
            throw err;
        }
        let data = [];
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
        return res.json(data);
    });

})


app.post('/delFile', (req, res) => {
    fs.unlinkSync(`${rootPath}${req.body.filePath}`)
    return res.json({msg:'删除成功'});
})

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);
httpServer.listen(PORT, function () {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

