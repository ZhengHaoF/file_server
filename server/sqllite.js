import fs from 'fs';
import Database from 'better-sqlite3';

export class Sql {
    constructor(config) {
        this.imgCache = config;
        this.db = new Database('imgCache.db');
    }

    /**
     * 初始化：清空并重建表（会关闭连接，仅用于独立脚本如 init.js）
     */
    init(){
        this.db.exec('DROP TABLE IF EXISTS "image";');
        this.db.exec('VACUUM');
        this.db.exec('CREATE TABLE IF NOT EXISTS "image" ("psha256" text NOT NULL,"ext" text,"ctime" text,PRIMARY KEY ("psha256"));');
        this.close();
    }

    /**
     * 重置表：清空并重建，但不关闭连接（用于主进程中的缓存清理）
     */
    reset(){
        this.db.exec('DROP TABLE IF EXISTS "image";');
        this.db.exec('VACUUM');
        this.db.exec('CREATE TABLE IF NOT EXISTS "image" ("psha256" text NOT NULL,"ext" text,"ctime" text,PRIMARY KEY ("psha256"));');
    }
    insertInfo(psha256,ext) {
        try {
            const stmt = this.db.prepare('INSERT OR REPLACE INTO "image" ("psha256","ext", "ctime") VALUES (?,?,?);');
            stmt.run(psha256, ext, String(new Date().getTime()));
        } catch (err) {
            return console.log(err);
        }
    }

    updateInfo(psha256) {
        try {
            const stmt = this.db.prepare('UPDATE "image" SET "ctime" = ? WHERE "psha256" = ?');
            stmt.run(String(new Date().getTime()), psha256);
        } catch (err) {
            return console.log(err);
        }
    }

    selectInfo(psha256) {
        try {
            const stmt = this.db.prepare('SELECT * FROM "image" WHERE "psha256" = ?');
            const row = stmt.get(psha256);
            return row;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    /**
     * 获取数据库记录总数
     * @returns {number} 记录数
     */
    getCount() {
        try {
            const result = this.db.prepare('SELECT COUNT(*) as count FROM image').get();
            return result ? result.count : 0;
        } catch (err) {
            console.error('查询记录数量失败:', err.message);
            return 0;
        }
    }

    /**
     * 删除过期的数据
     * @param day 过期时间，默认为30天
     */
    async cleanOldData(day = 30) {
        let t = day * 86400000;
        let nowTime = new Date().getTime();
        let num = 0;
        let unlinkList = [];

        try {
            const stmt = this.db.prepare('SELECT * FROM "image"');
            const rows = stmt.all();

            rows.forEach((item) => {
                if (nowTime - item.ctime > t) {
                    unlinkList.push(
                        new Promise((resolve2, reject2) => {
                            try {
                                const deleteStmt = this.db.prepare('DELETE FROM "image" WHERE "psha256" = ?');
                                deleteStmt.run(item.psha256);
                                num++;
                            } catch (err2) {
                                console.log(err2)
                            }
                            fs.unlink(`${this.imgCache}/${item.psha256}${item.ext}`, (err3) => {
                                if (err3) {
                                    console.error(err3);
                                    resolve2();
                                }
                                console.log(`${this.imgCache}/${item.psha256}${item.ext}文件已被删除`);
                                resolve2();
                            });
                        })
                    )
                }
            });

            await Promise.all(unlinkList);

            return num;
        } catch(err) {
            console.error(err);
            return 0;
        }
    }
    close(){
        this.db.close()
    }
}

// 单例：主进程共享同一个数据库连接
let _instance = null;

/**
 * 获取 Sql 单例（首次调用时需传入 imgCache 路径）
 * @param {string} imgCachePath 图片缓存目录路径
 * @returns {Sql}
 */
export function getSqlInstance(imgCachePath) {
    if (!_instance) {
        _instance = new Sql(imgCachePath);
    }
    return _instance;
}

export default Sql;
