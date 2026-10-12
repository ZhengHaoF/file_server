import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { HttpError } from '../utils/fileSafety.js';
import { parseLogLine } from '../utils/systemInfo.js';
import { forwardLogRecords, reverseLogRecords, logFileIdentity } from '../utils/logFiles.js';

export function redactLogMessage(value) {
    return String(value)
        .replace(
            /(["'](?:authorization|cookie|accessToken|restartPwd|sessionToken|readTicket|password|pwd|x-admin-token|x-file-token)["']\s*:\s*)(?:"[^"]*"|'[^']*')/gi,
            '$1"******"',
        )
        .replace(/\b(cookie\s*[:=]\s*)[^\r\n]*/gi, '$1******')
        .replace(/([?&](?:ticket|token)=)[^\s&#]+/gi, '$1******')
        .replace(/\b(authorization\s*[:=]\s*)(?:Bearer\s+)?[^\s,;]+/gi, '$1******')
        .replace(
            /\b(cookie|accessToken|restartPwd|sessionToken|readTicket|password|pwd|x-admin-token|x-file-token)\s*[:=]\s*("[^"]*"|'[^']*'|[^\s,;]+)/gi,
            '$1=******',
        );
}
export function logEntry(line, source = 'application', location = '') {
    const event =
        /^(\[[^\]]+\]\s*\[[^\]]+\]\s*\[[^\]]+\]\s*)\[eventId=([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\]\s*/i.exec(
            line,
        );
    const clean = event ? event[1] + line.slice(event[0].length) : line;
    const parsed = parseLogLine(clean);
    if (!parsed) return null;
    const simple = /^\[([^\]]+)\]\s*(.*)$/.exec(clean);
    const validTime = simple && Number.isFinite(Date.parse(simple[1]));
    const timestamp = validTime ? new Date(simple[1]).toISOString() : null;
    return {
        id: crypto
            .createHash('sha256')
            .update(event ? `${source}:${event[2]}` : `${source}:${location}:${line}`)
            .digest('hex')
            .slice(0, 24),
        timestamp,
        level: String(parsed.level || 'INFO').toUpperCase(),
        category: parsed.category,
        message: redactLogMessage(source === 'supervisor' && simple ? simple[2] : parsed.message),
        source,
    };
}
const order = (a, b) =>
    (Date.parse(b.timestamp) || 0) - (Date.parse(a.timestamp) || 0) || b.id.localeCompare(a.id);
const cursorOf = (entry, position) =>
    Buffer.from(JSON.stringify({ time: entry.timestamp, id: entry.id, position })).toString(
        'base64url',
    );
function decodeCursor(cursor) {
    if (!cursor) return null;
    try {
        if (typeof cursor !== 'string' || cursor.length > 512) throw new Error();
        const value = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
        if (
            !/^[a-f0-9]{24}$/.test(value.id) ||
            (value.time !== null && !Number.isFinite(Date.parse(value.time)))
        )
            throw new Error();
        if (
            value.position &&
            (!/^[0-9:.]{1,100}$/.test(value.position.identity) ||
                !Number.isSafeInteger(value.position.offset) ||
                value.position.offset < 0)
        )
            throw new Error();
        return { timestamp: value.time, id: value.id, position: value.position };
    } catch {
        throw new HttpError(400, '无效日志分页游标');
    }
}

export function createAdminLogs(logsDir) {
    async function query(options = {}, maxLimit = 1000) {
        const limit = Number(options.limit ?? 100);
        if (!Number.isInteger(limit) || limit < 1 || limit > maxLimit)
            throw new HttpError(400, `日志条数须为 1 到 ${maxLimit}`);
        const source = options.source || 'application';
        if (!['application', 'supervisor'].includes(source))
            throw new HttpError(400, '无效日志来源');
        const level = String(options.level || '').toUpperCase();
        if (level && !['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].includes(level))
            throw new HttpError(400, '无效日志级别');
        const keyword = String(options.keyword || '');
        if (keyword.length > 200) throw new HttpError(400, '关键词过长');
        const boundary = decodeCursor(options.before);
        const appendOrder = options.order === 'append';
        if (options.order && !['append', 'time'].includes(options.order))
            throw new HttpError(400, '无效日志排序');
        if (boundary && Boolean(boundary.position) !== appendOrder)
            throw new HttpError(400, '日志游标与排序不匹配');
        const time = (value) => {
            if (!value) return null;
            const parsed = Date.parse(value);
            if (!Number.isFinite(parsed)) throw new HttpError(400, '时间参数无效');
            return parsed;
        };
        const start = time(options.start);
        const end = time(options.end);
        if (start !== null && end !== null && start > end)
            throw new HttpError(400, '开始时间不能晚于结束时间');
        let entries;
        try {
            entries = await fs.promises.readdir(logsDir, { withFileTypes: true });
        } catch (error) {
            if (error.code === 'ENOENT') return { logs: [], total: 0, nextCursor: null };
            throw error;
        }
        const names = entries
            .filter(
                (entry) =>
                    entry.isFile() &&
                    !entry.isSymbolicLink() &&
                    (source === 'application'
                        ? /^app\.log(?:\.[1-3](?:\.gz)?)?$/.test(entry.name)
                        : entry.name === 'restart.log'),
            )
            .map((entry) => entry.name)
            .sort((a, b) => {
                const rank = (name) => Number(/\.(\d)(?:\.gz)?$/.exec(name)?.[1] || 0);
                return rank(a) - rank(b);
            });
        const results = [];
        const seen = new Set();
        let boundaryFound = !boundary?.position;
        let lastPosition;
        for (const name of names) {
            const file = path.join(logsDir, name);
            let stat;
            try {
                stat = await fs.promises.stat(file);
            } catch (error) {
                if (error.code === 'ENOENT') continue;
                throw error;
            }
            const identity = logFileIdentity(stat);
            if (!boundaryFound) {
                if (identity !== boundary.position.identity) continue;
                boundaryFound = true;
            }
            const before =
                appendOrder && identity === boundary?.position?.identity
                    ? boundary.position.offset
                    : Infinity;
            const records = appendOrder ? reverseLogRecords(file, before) : forwardLogRecords(file);
            for await (const { line, offset } of records) {
                if (!line.trim()) continue;
                const log = logEntry(line, source, `${identity}:${offset}`);
                if (
                    !log ||
                    (level && log.level !== level) ||
                    (keyword && !log.message.includes(keyword))
                )
                    continue;
                const timestamp = Date.parse(log.timestamp) || 0;
                if ((start !== null && timestamp < start) || (end !== null && timestamp > end))
                    continue;
                if (!appendOrder && boundary && order(log, boundary) <= 0) continue;
                if (seen.has(log.id)) continue;
                seen.add(log.id);
                results.push(log);
                if (appendOrder) {
                    if (results.length <= limit) lastPosition = { identity, offset };
                    if (results.length > limit) break;
                    continue;
                }
                if (results.length > (limit + 1) * 2) {
                    results.sort(order);
                    results.length = limit + 1;
                    // Keep the dedup set bounded by rows actually retained.
                    seen.clear();
                    for (const row of results) seen.add(row.id);
                }
            }
            if (appendOrder && results.length > limit) break;
        }
        if (!boundaryFound) throw new HttpError(409, '日志游标对应的文件已轮转或归档，请刷新');
        if (!appendOrder) results.sort(order);
        const more = results.length > limit;
        const logs = results.slice(0, limit);
        return {
            logs,
            total: logs.length,
            order: appendOrder ? 'append' : 'time',
            nextCursor: more ? cursorOf(logs.at(-1), appendOrder ? lastPosition : undefined) : null,
        };
    }
    return { query };
}

export function logsCsv(logs) {
    const cell = (value) => {
        let text = String(value ?? '');
        if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
        return `"${text.replace(/"/g, '""')}"`;
    };
    return (
        '\uFEFFtimestamp,level,category,message,source\n' +
        logs
            .map((log) =>
                [log.timestamp, log.level, log.category, log.message, log.source]
                    .map(cell)
                    .join(','),
            )
            .join('\n')
    );
}
