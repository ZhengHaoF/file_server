import fs from 'node:fs';
import { WebSocketServer } from 'ws';
import path from 'node:path';
import { logEntry } from '../services/adminLogs.js';
import { logFileIdentity } from './logFiles.js';

export function attachLogStream(
    server,
    auth,
    config,
    logger,
    { logsDir = path.join(config.configDir || process.cwd(), 'logs') } = {},
) {
    const wss = new WebSocketServer({ noServer: true, maxPayload: 4096 });
    server.on('upgrade', (req, socket, head) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname !== '/api/admin/logs/stream') return socket.destroy();
        const origin = req.headers.origin;
        if (
            origin &&
            !config.allowedOrigins.includes(origin) &&
            origin !== `${socket.encrypted ? 'https' : 'http'}://${req.headers.host}`
        )
            return socket.destroy();
        // Browser WebSockets use the HttpOnly session cookie, not a password in a URL.
        if (auth.credentials(req)?.role !== 'admin') {
            socket.write('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n');
            return socket.destroy();
        }
        wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
    });
    const logFile = path.join(logsDir, 'app.log');
    let lastSize = 0;
    let lastIdentity = null;
    let partial = '';
    let reading = false;
    async function poll() {
        if (reading || !wss.clients.size) return;
        reading = true;
        try {
            for (const client of wss.clients) {
                if (auth.credentials(client.request)?.role !== 'admin')
                    client.close(1008, '管理会话已失效');
            }
            const stat = await fs.promises.stat(logFile);
            const identity = logFileIdentity(stat);
            if (stat.size < lastSize || identity !== lastIdentity) {
                lastSize = 0;
                partial = '';
            }
            lastIdentity = identity;
            if (stat.size === lastSize) return;
            const end = stat.size;
            const start = Math.max(lastSize, end - 256 * 1024);
            const chunks = [];
            for await (const chunk of fs.createReadStream(logFile, { start, end: end - 1 }))
                chunks.push(chunk);
            let buffer = Buffer.concat(chunks);
            let offset = start - Buffer.byteLength(partial);
            if (start > lastSize) {
                const newline = buffer.indexOf(10);
                const skipped = newline < 0 ? buffer.length : newline + 1;
                buffer = buffer.subarray(skipped);
                offset = start + skipped;
                partial = '';
            }
            lastSize = end;
            // Keep incomplete UTF-8 bytes untouched until the line is complete.
            const data = Buffer.concat([
                Buffer.isBuffer(partial) ? partial : Buffer.from(partial),
                buffer,
            ]);
            let consumed = 0;
            let newline;
            while ((newline = data.indexOf(10, consumed)) !== -1) {
                const line = data.subarray(consumed, newline).toString('utf8').replace(/\r$/, '');
                const log = logEntry(line, 'application', `${identity}:${offset + consumed}`);
                consumed = newline + 1;
                if (!log) continue;
                for (const client of wss.clients) {
                    if (client.bufferedAmount > 1024 * 1024) {
                        client.close(1013, '客户端处理过慢');
                        continue;
                    }
                    if (
                        client.readyState === 1 &&
                        (!client.level || client.level === log.level.toLowerCase())
                    )
                        client.send(JSON.stringify(log));
                }
            }
            partial = data.subarray(consumed).subarray(-65536);
        } catch (error) {
            if (error.code !== 'ENOENT') logger.warn(`日志读取失败: ${error.message}`);
        } finally {
            reading = false;
        }
    }
    const timer = setInterval(poll, 1000);
    timer.unref();
    wss.on('connection', (ws, req) => {
        ws.request = req;
        ws.on('error', () => {});
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                if (data.action === 'filter')
                    ws.level = typeof data.level === 'string' ? data.level.toLowerCase() : null;
            } catch {
                /* Ignore invalid filters. */
            }
        });
    });
    server.on('close', () => {
        clearInterval(timer);
        for (const client of wss.clients) client.terminate();
        wss.close();
    });
    return wss;
}
