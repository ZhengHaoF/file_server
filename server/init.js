// Explicitly destructive maintenance only; ordinary startup initializes schemas safely.
import fs from 'node:fs';
import { loadConfig } from './configuration.js';
import { Sql } from './sqllite.js';

if (!process.argv.includes('--force')) {
    console.error(
        '此命令会清空缓存、日志与缓存数据库。正常启动无需初始化；确认后运行 node init.js --force。',
    );
    process.exitCode = 1;
} else {
    const config = loadConfig();
    fs.rmSync(config.imgCache, { recursive: true, force: true });
    fs.mkdirSync(config.imgCache, { recursive: true });
    fs.rmSync('logs', { recursive: true, force: true });
    fs.mkdirSync('logs', { recursive: true });
    new Sql(config.imgCache, config.dbPath).init();
    console.log('缓存、日志与缓存数据库已清空，原始共享文件未修改。');
}
