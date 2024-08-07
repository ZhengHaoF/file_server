/**
 * 初始化整个项目,清空数据库，删除缓存目录
 */

const fs = require('fs');
const path = require('path');

try {
    fs.rm("./imgCache", {recursive: true}, (e) => {
        if (e) {
            console.log("文件夹不存在")
        } else {
            console.log(`清空缓存成功`);
        }
        fs.mkdirSync('imgCache');
    });

    fs.rm("./logs", {recursive: true}, (e) => {
        if (e) {
            console.log("日志文件夹不存在")
        } else {
            console.log(`清空日志缓存成功`);
        }
        fs.mkdirSync('logs');
    });
} catch (err) {
    console.error(`清空文件夹失败： ${err}`);
}

const Sql = require('./sqllite.js')
let sql = new Sql.Sql();
sql.init();
console.error(`清空数据库成功`);