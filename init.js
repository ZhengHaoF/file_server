/**
 * 初始化整个项目,清空数据库，删除缓存目录
 */

import stripBom from "strip-bom";
import fs from 'fs';
const config = JSON.parse(stripBom(fs.readFileSync("config.json", 'utf8')));

for (const dir of ['imgCache', 'logs']) {
    try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`清空 ${dir} 成功`);
    } catch (err) {
        console.log(`${dir} 文件夹不存在`);
    }
    fs.mkdirSync(dir, { recursive: true });
}

import { Sql } from "./sqllite.js"

let sql = new Sql(config['imgCache']);
sql.init();
console.error(`清空数据库成功`);