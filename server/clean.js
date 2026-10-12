/**
 * 删除数据库中不存在的缓存图片；超出存放期限未访问的图片
 */

import { loadConfig } from './configuration.js';
const config = loadConfig();

import { Sql } from "./sqllite.js"

let sql = new Sql(config.imgCache, config.dbPath);
console.log("开始清空过期数据")
sql.cleanOldData().then((res)=>{
    console.log(`清理了${res}条数据`);
    sql.close();
}).catch((err)=>{
    console.error(err);
    sql.close();
});
