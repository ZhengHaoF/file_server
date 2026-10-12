import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { HttpError, mapLimit } from '../utils/fileSafety.js';
import { getMemoryInfo, getDiskInfoAsync } from '../utils/systemInfo.js';
import { createAdminConfig } from './adminConfig.js';
import { createAdminLogs } from './adminLogs.js';

export function createAdminRuntime(config, sql, logger, previews, options = {}) {
    const cwd = options.cwd || config.configDir || process.cwd();
    const logsDir = options.logsDir || path.join(cwd, 'logs');
    const bootId = crypto.randomUUID();
    let stopped = false;
    let savedStats = null;
    let statsPromise = null;
    let policyChecking = false;
    let auditFailures = 0;
    const recentJobs = new Map();
    let activeJob = null;
    let activePromise = null;
    let lastCleanupAt = null;
    const requestRestart =
        options.requestRestart ||
        (() => {
            if (process.send) process.send({ type: 'planned-restart' });
            setTimeout(() => process.kill(process.pid, 'SIGTERM'), 100);
        });
    const restartSupported = options.restartSupported ?? process.env.FILE_SERVER_MANAGED === '1';
    const deployment =
        options.deployment ||
        (process.env.FILE_SERVER_CONTAINER === '1'
            ? 'docker'
            : restartSupported
              ? 'supervisor'
              : 'standalone');
    sql.db.exec(`
        CREATE TABLE IF NOT EXISTS admin_audit (
            id INTEGER PRIMARY KEY AUTOINCREMENT, created_at INTEGER NOT NULL,
            action TEXT NOT NULL, actor TEXT NOT NULL, target TEXT NOT NULL, result TEXT NOT NULL, details TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS admin_jobs (
            seq INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT NOT NULL UNIQUE, data TEXT NOT NULL);
        CREATE INDEX IF NOT EXISTS admin_audit_time ON admin_audit(created_at);
    `);
    const auditInsert = sql.db.prepare(
        'INSERT INTO admin_audit(created_at,action,actor,target,result,details) VALUES(?,?,?,?,?,?)',
    );
    function audit(action, actor = {}, target = '', result = 'succeeded', details = {}) {
        if (stopped) return false;
        const identity =
            typeof actor === 'string'
                ? actor
                : `${actor?.role || 'admin'}:${actor?.sessionId || 'token'}`;
        try {
            auditInsert.run(
                Date.now(),
                action,
                identity,
                String(target).slice(0, 200),
                result,
                JSON.stringify(details),
            );
            sql.db
                .prepare(
                    'DELETE FROM admin_audit WHERE id <= (SELECT MAX(id)-5000 FROM admin_audit)',
                )
                .run();
            return true;
        } catch (error) {
            auditFailures++;
            logger.error(`审计写入失败: ${error.code || 'UNKNOWN'}`);
            return false;
        }
    }
    for (const row of sql.db.prepare('SELECT seq,data FROM admin_jobs').all()) {
        const job = JSON.parse(row.data);
        if (['queued', 'running'].includes(job.status)) {
            job.status = 'interrupted';
            job.finishedAt = Date.now();
            job.error = '服务器重启，任务中断；请检查缓存后重新维护';
            sql.db
                .prepare('UPDATE admin_jobs SET data=? WHERE seq=?')
                .run(JSON.stringify(job), row.seq);
        }
    }
    function persist(job) {
        sql.db
            .prepare(
                'INSERT INTO admin_jobs(id,data) VALUES(?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',
            )
            .run(job.id, JSON.stringify(job));
        // UPSERT can consume AUTOINCREMENT values without creating a row; retain rows, not sequence ranges.
        sql.db
            .prepare(
                'DELETE FROM admin_jobs WHERE seq NOT IN (SELECT seq FROM admin_jobs ORDER BY seq DESC LIMIT 100)',
            )
            .run();
    }
    const actorOf = (req) => ({ ...req.adminIdentity, ip: req.ip });
    const configuration = createAdminConfig(config, {
        cwd,
        env: options.env || process.env,
        audit,
    });
    const logs = createAdminLogs(logsDir);
    function cpuSnapshot() {
        const processors = os.cpus();
        let total = 0,
            idle = 0;
        for (const cpu of processors) {
            idle += cpu.times.idle;
            total += Object.values(cpu.times).reduce((a, b) => a + b, 0);
        }
        return { total, idle, cores: processors.length };
    }
    let previousCpu = cpuSnapshot();
    let sample = null;
    let diskSample = {
        total: null,
        used: null,
        free: null,
        usage: null,
        available: false,
        sampledAt: null,
    };
    let diskPromise = null;
    function refreshDisk() {
        if (diskPromise || stopped) return;
        diskPromise = getDiskInfoAsync(config.rootPath)
            .then((disk) => {
                if (!stopped) {
                    diskSample = disk;
                    sample.disk = { ...disk, scope: 'shared-filesystem' };
                }
            })
            .finally(() => {
                diskPromise = null;
            });
    }
    const history = [];
    function takeSample() {
        const current = cpuSnapshot();
        const delta = current.total - previousCpu.total;
        const usage =
            delta > 0
                ? Math.max(
                      0,
                      Math.min(
                          100,
                          Number(
                              ((1 - (current.idle - previousCpu.idle) / delta) * 100).toFixed(1),
                          ),
                      ),
                  )
                : null;
        previousCpu = current;
        const memory = { ...getMemoryInfo(), scope: 'host' };
        const processMemory = process.memoryUsage();
        sample = {
            sampledAt: Date.now(),
            bootId,
            cpu: { usage, cores: current.cores, warmingUp: usage === null },
            memory,
            disk: { ...diskSample, scope: 'shared-filesystem' },
            process: {
                rss: processMemory.rss,
                heapUsed: processMemory.heapUsed,
                heapTotal: processMemory.heapTotal,
            },
        };
        history.push({
            time: sample.sampledAt,
            cpu: usage,
            memory: memory.usage,
            processRss: processMemory.rss,
        });
        if (history.length > 120) history.shift();
        refreshDisk();
    }
    takeSample();
    const sampleTimer = setInterval(takeSample, 5000);
    sampleTimer.unref();
    function status(serverStatus) {
        const alerts = [];
        if (!sample.disk.available)
            alerts.push({ level: 'warning', message: '磁盘指标不可用，请检查共享目录挂载。' });
        if (sample.disk.usage >= 90)
            alerts.push({
                level: 'warning',
                message: '共享文件系统使用率达到 90%，请检查剩余空间。',
            });
        if (sample.memory.usage >= 90)
            alerts.push({ level: 'warning', message: '主机内存使用率达到 90%。' });
        if (config.publicRead)
            alerts.push({ level: 'warning', message: '当前允许匿名读取，请确认这是你的预期。' });
        if (auditFailures)
            alerts.push({
                level: 'warning',
                message: `本次启动有 ${auditFailures} 次审计写入失败，请检查数据库与日志。`,
            });
        return {
            ...sample,
            history: [...history],
            alerts,
            queues: {
                ...previews.stats(),
                upload: { active: options.uploadStats?.() || 0, pending: 0, limit: 4 },
            },
            server: {
                uptime: Math.floor(process.uptime()),
                nodeVersion: process.version,
                httpPort: config.port,
                httpsPort: config.httpsPort,
                httpStatus: serverStatus.http,
                httpsStatus: config.httpsEnabled ? serverStatus.https : 'disabled',
                restartSupported,
                deployment,
            },
        };
    }
    async function inventory() {
        const entries = await fs.promises.readdir(config.imgCache, { withFileTypes: true });
        const rows = new Map(
            sql.db
                .prepare('SELECT psha256,ext,ctime,kind FROM image')
                .all()
                .map((row) => [row.psha256 + row.ext, row]),
        );
        return (
            await mapLimit(entries, 16, async (entry) => {
                if (!entry.isFile() || entry.isSymbolicLink() || entry.name.startsWith('.'))
                    return null;
                const stat = await fs.promises
                    .lstat(path.join(config.imgCache, entry.name))
                    .catch(() => null);
                if (!stat?.isFile() || stat.isSymbolicLink()) return null;
                const row = rows.get(entry.name);
                return {
                    name: entry.name,
                    size: stat.size,
                    kind: row?.kind || 'legacy',
                    key: row?.psha256,
                    access: Number(row?.ctime || stat.mtimeMs),
                    managed:
                        /^[a-f0-9]{64}\.(?:jpg|jpeg|png|webp|gif|svg|bmp|tiff?|avif|heic|heif)$/i.test(
                            entry.name,
                        ),
                };
            })
        ).filter(Boolean);
    }
    async function stats(force = false) {
        if (stopped) throw new HttpError(503, '服务正在关闭');
        const version = sql.cacheVersion;
        if (!force && savedStats?.version === version && savedStats.expires > Date.now())
            return { ...savedStats.value, maintenance: Boolean(activeJob), policy: policy() };
        // A force refresh bypasses the TTL, not an already running identical scan.
        if (statsPromise) return statsPromise;
        statsPromise = collectStats(version).finally(() => {
            statsPromise = null;
        });
        return statsPromise;
    }
    async function collectStats(version) {
        const items = await inventory();
        const result = {
            sampledAt: Date.now(),
            totalFiles: items.length,
            totalSize: 0,
            imageCache: { count: 0, size: 0 },
            videoCache: { count: 0, size: 0 },
            legacyCache: { count: 0, size: 0 },
        };
        for (const item of items) {
            const target =
                item.kind === 'video'
                    ? result.videoCache
                    : item.kind === 'image'
                      ? result.imageCache
                      : result.legacyCache;
            target.count++;
            target.size += item.size;
            result.totalSize += item.size;
        }
        const main = (await fs.promises.stat(sql.dbPath)).size;
        const size = async (suffix) =>
            (await fs.promises.stat(sql.dbPath + suffix).catch(() => ({ size: 0 }))).size;
        const [wal, shm] = await Promise.all([size('-wal'), size('-shm')]);
        result.database = { main, wal, shm, total: main + wal + shm, recordCount: sql.getCount() };
        result.dbSize = result.database.total;
        result.policy = policy();
        result.maintenance = Boolean(activeJob);
        result.lastCleanupAt = lastCleanupAt;
        if (sql.cacheVersion === version && !activeJob)
            savedStats = { value: result, version, expires: Date.now() + 15000 };
        return result;
    }
    function policy() {
        return {
            cacheMaxSizeMB: config.cacheMaxSizeMB,
            cacheRetentionDays: config.cacheRetentionDays,
            autoCleanupEnabled: config.autoCleanupEnabled,
        };
    }
    function validateCleanup(input) {
        if (!input || !['expired', 'all', 'policy'].includes(input.mode))
            throw new HttpError(400, '无效清理模式');
        if (
            input.mode === 'expired' &&
            (!Number.isInteger(input.days) || input.days < 1 || input.days > 3650)
        ) {
            throw new HttpError(400, '清理天数必须为 1 到 3650 的整数');
        }
    }
    function startCleanup(input, actor = 'system') {
        validateCleanup(input);
        if (stopped) throw new HttpError(503, '服务正在关闭');
        if (activeJob) throw new HttpError(409, '已有缓存维护任务正在执行');
        const job = {
            id: crypto.randomUUID(),
            type: `cache.${input.mode}`,
            status: 'queued',
            createdAt: Date.now(),
            startedAt: null,
            finishedAt: null,
            progress: { processed: 0, total: 0 },
            result: { cleaned: 0, freedBytes: 0, failed: 0 },
            error: null,
        };
        activeJob = job;
        try {
            persist(job);
        } catch (error) {
            activeJob = null;
            logger.error(`维护任务入队失败: ${error.code || 'UNKNOWN'}`);
            throw new HttpError(503, '任务无法写入数据库，请检查磁盘与数据库后重试');
        }
        // Defer execution until activePromise has been assigned, including synchronous failures.
        activePromise = Promise.resolve().then(async () => {
            try {
                job.status = 'running';
                job.startedAt = Date.now();
                persist(job);
                await previews.beginMaintenance();
                const items = (await inventory()).sort((a, b) => a.access - b.access);
                const age =
                    Date.now() -
                    (input.mode === 'policy' ? config.cacheRetentionDays : input.days) * 86400000;
                const max = config.cacheMaxSizeMB * 1024 * 1024;
                let remaining = items
                    .filter((item) => item.managed)
                    .reduce((sum, item) => sum + item.size, 0);
                const candidates = items.filter((item) => {
                    if (!item.managed) return false;
                    const selected =
                        input.mode === 'all' ||
                        item.access < age ||
                        (input.mode === 'policy' && max > 0 && remaining > max);
                    if (selected) remaining -= item.size;
                    return selected;
                });
                job.progress.total = candidates.length;
                persist(job);
                for (const item of candidates) {
                    try {
                        const target = path.join(config.imgCache, item.name);
                        const current = await fs.promises.lstat(target);
                        if (!current.isFile() || current.isSymbolicLink())
                            throw new Error('缓存条目已变化');
                        await fs.promises.unlink(target);
                        if (item.key)
                            sql.db.prepare('DELETE FROM image WHERE psha256 = ?').run(item.key);
                        job.result.cleaned++;
                        job.result.freedBytes += current.size;
                        sql.cacheVersion++;
                    } catch (error) {
                        if (error.code !== 'ENOENT') job.result.failed++;
                    }
                    job.progress.processed++;
                    if (job.progress.processed % 25 === 0) persist(job);
                }
                if (input.mode === 'all') {
                    // Drop stale managed records too; preserve non-cache data and other admin tables.
                    sql.reset();
                }
                job.status = job.result.failed ? 'failed' : 'succeeded';
                if (job.result.failed)
                    job.error = `${job.result.failed} 个缓存删除失败，可在检查权限后重新维护`;
                lastCleanupAt = Date.now();
                audit('cache.cleanup', actor, input.mode, job.status, {
                    ...job.result,
                    jobId: job.id,
                });
            } catch (error) {
                job.status = 'failed';
                job.error = '缓存维护失败，请检查缓存目录权限和日志';
                logger.warn(`缓存维护失败: ${error.message}`);
                audit('cache.cleanup', actor, input.mode, 'failed', { jobId: job.id });
            } finally {
                job.finishedAt = Date.now();
                try {
                    previews.endMaintenance();
                    persist(job);
                } catch (error) {
                    job.status = 'failed';
                    job.error = '任务状态写入或收尾失败，请检查数据库和缓存后重试';
                    logger.error(`维护任务收尾失败: ${error.code || 'UNKNOWN'}`);
                } finally {
                    // Database and maintenance failures must never retain the in-memory lock.
                    savedStats = null;
                    recentJobs.set(job.id, structuredClone(job));
                    if (recentJobs.size > 100) recentJobs.delete(recentJobs.keys().next().value);
                    activeJob = null;
                    activePromise = null;
                }
            }
            return job;
        });
        // Observe every background promise even when the HTTP caller only takes the job ID.
        activePromise.catch((error) => logger.error(`后台维护异常: ${error.code || 'UNKNOWN'}`));
        return { job: structuredClone(job), completion: activePromise };
    }
    function page(table, before, limit, rows) {
        const count = Number(limit ?? (table === 'admin_jobs' ? 25 : 50));
        const boundary = before ? Number(before) : Number.MAX_SAFE_INTEGER;
        if (
            !Number.isInteger(count) ||
            count < 1 ||
            count > 100 ||
            !Number.isSafeInteger(boundary) ||
            boundary < 1
        )
            throw new HttpError(400, '分页参数无效');
        const id = table === 'admin_jobs' ? 'seq' : 'id';
        const records = sql.db
            .prepare(`SELECT * FROM ${table} WHERE ${id} < ? ORDER BY ${id} DESC LIMIT ?`)
            .all(boundary, count + 1);
        const more = records.length > count;
        return {
            [rows]: records.slice(0, count).map((row) =>
                table === 'admin_jobs'
                    ? recentJobs.get(row.id) || JSON.parse(row.data)
                    : {
                          id: row.id,
                          createdAt: row.created_at,
                          action: row.action,
                          actor: row.actor,
                          target: row.target,
                          result: row.result,
                          details: JSON.parse(row.details),
                      },
            ),
            nextBefore: more ? records[count - 1][id] : null,
        };
    }
    const policyTimer = setInterval(async () => {
        if (stopped || !config.autoCleanupEnabled || activeJob || policyChecking) return;
        policyChecking = true;
        try {
            const items = await inventory();
            if (stopped || activeJob) return;
            if (
                items.some(
                    (item) =>
                        item.managed &&
                        item.access < Date.now() - config.cacheRetentionDays * 86400000,
                ) ||
                (config.cacheMaxSizeMB > 0 &&
                    items.filter((item) => item.managed).reduce((sum, item) => sum + item.size, 0) >
                        config.cacheMaxSizeMB * 1024 * 1024)
            ) {
                startCleanup({ mode: 'policy' });
            }
        } catch (error) {
            logger.warn(`自动缓存维护检查失败: ${error.message}`);
        } finally {
            policyChecking = false;
        }
    }, 60000);
    policyTimer.unref();
    return {
        bootId,
        configuration,
        logs,
        audit,
        actorOf,
        status,
        stats,
        policy,
        startCleanup,
        jobs: (before, limit) => page('admin_jobs', before, limit, 'jobs'),
        auditPage: (before, limit) => page('admin_audit', before, limit, 'entries'),
        job(id) {
            if (activeJob?.id === id) return structuredClone(activeJob);
            if (recentJobs.has(id)) return structuredClone(recentJobs.get(id));
            const row = sql.db.prepare('SELECT data FROM admin_jobs WHERE id=?').get(id);
            return row ? JSON.parse(row.data) : null;
        },
        restart(actor) {
            if (!restartSupported)
                throw new HttpError(409, '当前没有重启守护，请使用 node start.js 或受管容器启动');
            if (activeJob) throw new HttpError(409, '缓存维护尚未完成，请稍后重启');
            audit('server.restart', actor, deployment, 'accepted');
            requestRestart();
            return { msg: '重启请求已接受，请等待恢复后重新登录', bootId };
        },
        async close() {
            stopped = true;
            clearInterval(sampleTimer);
            clearInterval(policyTimer);
            await Promise.allSettled([activePromise, statsPromise].filter(Boolean));
        },
    };
}
