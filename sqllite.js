import fs from 'fs';
import sqlite3 from 'sqlite3';

let db,imgCache;

export class Sql {
    constructor(config) {
        imgCache = config;
        db = new sqlite3.Database('imgCache.db');
    }

    init(){
        db.run('DROP TABLE IF EXISTS "image";');
        db.run('CREATE TABLE IF NOT EXISTS "image" ("psha256" text NOT NULL,"ext" text,"ctime" text,PRIMARY KEY ("psha256"));');
        this.close();
    }
    insertInfo(psha256,ext) {
        db.run(
            'INSERT INTO "image" ("psha256","ext", "ctime") VALUES (?,?,?);',
            [psha256,ext,String(new Date().getTime())],
            function (err) {
                if (err) {
                    return console.log(err);
                }
                // console.log('插入成功')
            })
    }

    updateInfo(psha256) {
        db.run(
            'UPDATE "image" SET "ctime" = ? WHERE "psha256" = ?',
            [String(new Date().getTime()),psha256],
            function (err) {
                if (err) {
                    return console.log(err);
                }
            })
    }

        selectInfo(psha256) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM "image" WHERE "psha256" = ?',
                [psha256],
                function (err, rows) {
                    if (err) {
                        console.log(err);
                        reject(false);
                    }
                    resolve(rows)
                })
        })
    }

    /**
     * 删除过期的数据
     * @param day 过期时间，默认为30天
     */
    cleanOldData(day = 30) {
        //超时时间，默认5天
        let t = day * 86400000;
        let nowTime = new Date().getTime();
        let num = 0;
        db.all('SELECT * FROM "image"', [], (err, rows) => {
            rows.forEach((item) => {
                if (nowTime - item.ctime > t) {
                    db.run('DELETE FROM "image" WHERE "psha256" = ?', [item.psha256], (err) => {
                        num++;
                        if (err) {
                            console.log(err)
                        }
                        // 使用fs.unlink方法删除文件
                        fs.unlink(`${imgCache}/${item.psha256}${item.ext}`, (err) => {
                            if (err) {
                                console.error(err);
                            }
                            console.log(`${imgCache}/${item.psha256}${item.ext}文件已被删除`);
                        });
                    })
                }
            })
        })
    }
    close(){
        db.close()
    }
}
export default Sql;
