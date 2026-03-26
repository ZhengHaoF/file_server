import fs from 'fs';
import Database from 'better-sqlite3';
import e from "express";

let db,imgCache;

export class Sql {
    constructor(config) {
        imgCache = config;
        db = new Database('imgCache.db');
    }

    init(){
        db.exec('DROP TABLE IF EXISTS "image";');
        db.exec('VACUUM');
        db.exec('CREATE TABLE IF NOT EXISTS "image" ("psha256" text NOT NULL,"ext" text,"ctime" text,PRIMARY KEY ("psha256"));');
        this.close();
    }
    insertInfo(psha256,ext) {
        try {
            const stmt = db.prepare('INSERT OR REPLACE INTO "image" ("psha256","ext", "ctime") VALUES (?,?,?);');
            stmt.run(psha256, ext, String(new Date().getTime()));
        } catch (err) {
            return console.log(err);
        }
    }

    updateInfo(psha256) {
        try {
            const stmt = db.prepare('UPDATE "image" SET "ctime" = ? WHERE "psha256" = ?');
            stmt.run(String(new Date().getTime()), psha256);
        } catch (err) {
            return console.log(err);
        }
    }

    selectInfo(psha256) {
        try {
            const stmt = db.prepare('SELECT * FROM "image" WHERE "psha256" = ?');
            const row = stmt.get(psha256);
            return row;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    /**
     * 删除过期的数据
     * @param day 过期时间，默认为30天
     */
    cleanOldData(day = 30) {
        let t = day * 86400000;
        let nowTime = new Date().getTime();
        let num = 0;
        let unlinkList = [];
        
        try {
            const stmt = db.prepare('SELECT * FROM "image"');
            const rows = stmt.all();

            rows.forEach((item) => {
                if (nowTime - item.ctime > t) {
                    unlinkList.push(
                        new Promise((resolve2, reject2) => {
                            try {
                                const deleteStmt = db.prepare('DELETE FROM "image" WHERE "psha256" = ?');
                                deleteStmt.run(item.psha256);
                                num++;
                            } catch (err2) {
                                console.log(err2)
                            }
                            fs.unlink(`${imgCache}/${item.psha256}${item.ext}`, (err3) => {
                                if (err3) {
                                    console.error(err3);
                                    resolve2();
                                }
                                console.log(`${imgCache}/${item.psha256}${item.ext}文件已被删除`);
                                resolve2();
                            });
                        })
                    )
                }
            });

            Promise.all(unlinkList).then((res)=>{
                return unlinkList.length;
            }).catch((err) => {
                return 0;
            });
            
            return unlinkList.length;
        } catch(err) {
            return 0;
        }
    }
    close(){
        db.close()
    }
}
export default Sql;
