import fs from 'node:fs';
import Database from 'better-sqlite3';
import { databaseOperation } from './utils/errors.js';

export class Sql {
    constructor(config, dbPath = 'imgCache.db') {
        this.imgCache = config;
        this.dbPath = dbPath;
        this.cacheVersion = 0;
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');
        this.db.pragma('busy_timeout = 5000');
        this.ensureSchema();
    }

    ensureSchema() {
        this.db.exec(
            'CREATE TABLE IF NOT EXISTS image (psha256 TEXT PRIMARY KEY, ext TEXT, ctime TEXT);',
        );
        const columns = this.db
            .prepare('PRAGMA table_info(image)')
            .all()
            .map((column) => column.name);
        if (!columns.includes('kind'))
            this.db.exec("ALTER TABLE image ADD COLUMN kind TEXT NOT NULL DEFAULT 'legacy'");
        this.db.exec(
            'CREATE INDEX IF NOT EXISTS image_access_time ON image(CAST(ctime AS INTEGER));',
        );
        this.statements = {
            insert: this.db.prepare(
                'INSERT OR REPLACE INTO image (psha256, ext, ctime, kind) VALUES (?, ?, ?, ?)',
            ),
            update: this.db.prepare(
                'UPDATE image SET ctime = ? WHERE psha256 = ? AND CAST(ctime AS INTEGER) < ?',
            ),
            select: this.db.prepare('SELECT * FROM image WHERE psha256 = ?'),
            kind: this.db.prepare('UPDATE image SET kind=? WHERE psha256=? AND kind<>?'),
            count: this.db.prepare('SELECT COUNT(*) as count FROM image'),
            expired: this.db.prepare(
                'SELECT * FROM image WHERE CAST(ctime AS INTEGER) < ? LIMIT 500',
            ),
            deleteVersion: this.db.prepare('DELETE FROM image WHERE psha256 = ? AND ctime = ?'),
        };
    }

    /**
     * 初始化：清空并重建表（会关闭连接，仅用于独立脚本如 init.js）
     */
    init() {
        this.db.exec('DROP TABLE IF EXISTS "image";');
        this.db.exec('VACUUM');
        this.ensureSchema();
        this.close();
    }

    /**
     * 重置表：清空记录，但保留表、索引和连接（用于缓存清理）
     */
    reset() {
        this.db.exec('DELETE FROM image;');
        this.cacheVersion++;
    }
    insertInfo(psha256, ext, kind = 'legacy') {
        return databaseOperation('cache.insert', () => {
            const stmt = this.statements.insert;
            stmt.run(
                psha256,
                ext,
                String(new Date().getTime()),
                ['image', 'video'].includes(kind) ? kind : 'legacy',
            );
            this.cacheVersion++;
        });
    }

    updateInfo(psha256, kind) {
        return databaseOperation('cache.update', () => {
            const now = Date.now();
            this.statements.update.run(String(now), psha256, now - 60000);
            if (['image', 'video'].includes(kind)) {
                const changed = this.statements.kind.run(kind, psha256, kind);
                this.cacheVersion += changed.changes;
            }
        });
    }

    selectInfo(psha256) {
        return databaseOperation('cache.select', () => this.statements.select.get(psha256));
    }

    /**
     * 获取数据库记录总数
     * @returns {number} 记录数
     */
    getCount() {
        return databaseOperation('cache.count', () => this.statements.count.get().count);
    }

    /**
     * 删除过期的数据
     * @param day 过期时间，默认为30天
     */
    async cleanOldData(day = 30) {
        if (!Number.isInteger(Number(day)) || Number(day) < 0 || Number(day) > 3650) {
            throw new Error('清理天数必须为 0 到 3650 的整数');
        }
        const t = day * 86400000;
        const nowTime = new Date().getTime();
        let num = 0;

        const stmt = this.statements.expired;
        let rows;
        do {
            const failures = new Set();
            rows = databaseOperation('cache.expired', () => stmt.all(nowTime - t));

            for (const item of rows) {
                if (nowTime - item.ctime > t) {
                    // Old cache records are treated as untrusted filenames too.
                    if (
                        !/^[a-f0-9]{64}$/.test(item.psha256) ||
                        !/^\.[a-zA-Z0-9]+$/.test(item.ext)
                    ) {
                        failures.add(item.psha256);
                        continue;
                    }
                    try {
                        await fs.promises
                            .unlink(`${this.imgCache}/${item.psha256}${item.ext}`)
                            .catch((error) => {
                                if (error.code !== 'ENOENT') throw error;
                            });
                        // A concurrent request may have refreshed this record.
                        const deleted = databaseOperation('cache.delete', () =>
                            this.statements.deleteVersion.run(item.psha256, item.ctime),
                        );
                        num += deleted.changes;
                        this.cacheVersion += deleted.changes;
                    } catch (error) {
                        if (error.code === 'DATABASE_UNAVAILABLE') throw error;
                        failures.add(item.psha256);
                    }
                }
            }
            // Retry failed removals on the next maintenance request, not in an infinite loop.
            if (failures.size) throw new Error(`${failures.size} 个缓存条目清理失败`);
        } while (rows.length === 500);

        return num;
    }
    close() {
        this.db.close();
    }
}

// 单例：主进程共享同一个数据库连接
let _instance = null;

/**
 * 获取 Sql 单例（首次调用时需传入 imgCache 路径）
 * @param {string} imgCachePath 图片缓存目录路径
 * @returns {Sql}
 */
export function getSqlInstance(imgCachePath, dbPath) {
    if (!_instance) {
        _instance = new Sql(imgCachePath, dbPath);
    }
    return _instance;
}

export default Sql;
