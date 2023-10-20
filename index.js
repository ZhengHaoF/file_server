const express = require('express')
const http = require('http');
const https = require('https');
const cors = require('cors')
const fs = require('fs');
const path = require('path')
const app = express()
const rootPath = require("./config.json")['rootPath'];
const images = require('images');
let privateKey  = fs.readFileSync('./cert/private.pem', 'utf8');
let certificate = fs.readFileSync('./cert/file.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};
let PORT = 3000;
let SSLPORT = 3001;
// const mime = require("./mime.json");
app.use(cors())
app.use(express.static('web'))
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

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);
httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

