const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path')
const app = express()
const port = 3000
const rootPath = require("./config.json")['rootPath'];
const images = require('images');
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


app.listen(port, () => {
    console.log("启动服务")
    console.log(`监听端口 ${port}`)
})
