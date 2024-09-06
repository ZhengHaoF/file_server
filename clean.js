/**
 * 删除数据库中不存在的缓存图片；超出存放期限未访问的图片
 */

import stripBom from "strip-bom";
import fs from 'fs';
const config = JSON.parse(stripBom(fs.readFileSync("config.json", 'utf8')));

import { Sql } from "./sqllite.js"

let sql = new Sql(config['imgCache']);
console.log("开始清空过期数据")
sql.cleanOldData().then((res)=>{
    console.log(`清理了${res}条数据`)
}).then((err)=>{
    console.log(err)
});

