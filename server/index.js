import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import log4js from 'log4js';
import { loadConfig } from './configuration.js';
import { createApp } from './app.js';
import { getSqlInstance } from './sqllite.js';
import { setServerStatus } from './routes/admin.js';
import { attachLogStream } from './utils/logStream.js';
import { configureHttpTimeouts } from './utils/httpPolicy.js';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: {
            type: 'file',
            filename: 'logs/app.log',
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{ISO8601}] [%p] [%c] [eventId=%x{eventId}] %m',
                tokens: { eventId: () => crypto.randomUUID() },
            },
        },
    },
    categories: { default: { appenders: ['console', 'file'], level: 'info' } },
});
const logger = log4js.getLogger();
try {
    const config = loadConfig();
    const sql = getSqlInstance(config.imgCache, config.dbPath);
    const { app, auth, close: closeApp } = createApp(config, sql, logger);
    const servers = [];
    const logStreams = [];
    let exitCode = 0;
    setServerStatus({ http: 'stopped', https: config.httpsEnabled ? 'stopped' : 'disabled' });
    const tls =
        config.httpsEnabled === true
            ? {
                  cert: fs.readFileSync(config.certPath || './cert/file.crt'),
                  key: fs.readFileSync(config.keyPath || './cert/private.pem'),
              }
            : null;
    const start = (server, port, name) => {
        configureHttpTimeouts(server, config);
        server.on('error', (error) => {
            logger.error(`${name} 服务失败: ${error.message}`);
            setServerStatus({ [name.toLowerCase()]: 'error' });
            exitCode = 1;
            shutdown();
        });
        server.listen(port, config.host, () => {
            logger.info(`${name} 服务监听 ${config.host}:${port}`);
            setServerStatus({ [name.toLowerCase()]: 'running' });
        });
        logStreams.push(attachLogStream(server, auth, config, logger));
        servers.push(server);
    };
    start(http.createServer(app), config.port, 'HTTP');
    if (tls) start(https.createServer(tls, app), config.httpsPort, 'HTTPS');
    logger.info(
        `本地凭据文件: ${path.join(config.dataPath, 'auth.local.json')}（环境变量优先，令牌不会输出到日志）。`,
    );
    let stopping = false;
    const shutdown = () => {
        if (stopping) return;
        stopping = true;
        // Upgraded sockets are not closed by HTTP server.close().
        for (const stream of logStreams) for (const client of stream.clients) client.terminate();
        const timeout = setTimeout(() => process.exit(1), 10000);
        Promise.allSettled([
            closeApp(),
            ...servers.map((server) => new Promise((resolve) => server.close(resolve))),
        ]).then((results) => {
            if (results.some((result) => result.status === 'rejected')) {
                exitCode = 1;
                logger.error('部分服务关闭失败，请检查日志');
            }
            clearTimeout(timeout);
            sql.close();
            log4js.shutdown(() => process.exit(exitCode));
        });
    };
    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
} catch (error) {
    logger.error(`启动失败: ${error.message}`);
    process.exitCode = 1;
    log4js.shutdown();
}
