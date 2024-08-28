/**
 * 初始化整个项目,清空数据库，删除缓存目录
 */

import stripBom from "strip-bom";
import fs from 'fs';
import path from 'path';
const config = JSON.parse(stripBom(fs.readFileSync("config.json", 'utf8')));
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

import { Sql } from "./sqllite.js"

let sql = new Sql(config['imgCache']);
sql.init();
console.error(`清空数据库成功`);