const sqlite3 = require('sqlite3').verbose();
let db;

class Sql {
    constructor(config) {
        db = new sqlite3.Database('imgCache.db');
    }

    init(){
        db.run('DROP TABLE IF EXISTS "image";');
        db.run('CREATE TABLE IF NOT EXISTS "image" ("psha256" text NOT NULL,"ctime" text,PRIMARY KEY ("psha256"));');
    }
    insertInfo(psha256) {
        db.run(
            'INSERT INTO "image" ("psha256", "ctime") VALUES (?,?);',
            [psha256, String(new Date().getTime())],
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

    cleanOldData(day = 10){
        let t = day * 24 * 26 * 60 * 1000;
    }
    colse(){
        db.close()
    }
}
exports.Sql = Sql;
// let sql = new Sql();
// sql.insertInfo("1","1","1");
// sql.selectInfo("1");