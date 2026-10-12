import express from 'express';
import { HttpError } from '../utils/fileSafety.js';
import { logsCsv } from '../services/adminLogs.js';

let serverStatus = { http: 'stopped', https: 'disabled' };
export function setServerStatus(status) {
    serverStatus = { ...serverStatus, ...status };
}
const route = (handler) => (req, res, next) => Promise.resolve(handler(req, res)).catch(next);

export function createAdminRouter(runtime, auth) {
    const router = express.Router();
    router.use((req, res, next) => {
        res.set('Cache-Control', 'no-store');
        next();
    });
    router.get('/status', (req, res) => res.json(runtime.status(serverStatus)));
    router.get(
        '/cache/stats',
        route(async (req, res) => res.json(await runtime.stats(req.query.refresh === 'true'))),
    );
    router.post('/cache/jobs', (req, res, next) => {
        try {
            res.status(202).json({ job: runtime.startCleanup(req.body, runtime.actorOf(req)).job });
        } catch (error) {
            next(error);
        }
    });
    // Keep the old client endpoint synchronous-compatible, while new UI uses durable jobs.
    router.post(
        '/cache/clean',
        route(async (req, res) => {
            const { all, days } = req.body;
            const { completion } = runtime.startCleanup(
                { mode: all === true ? 'all' : 'expired', days },
                runtime.actorOf(req),
            );
            const job = await completion;
            if (job.status !== 'succeeded')
                throw new HttpError(500, '缓存维护未全部成功，请查看操作记录');
            res.json({ msg: '缓存清理成功', ...job.result });
        }),
    );
    router.get('/jobs', (req, res, next) => {
        try {
            res.json(runtime.jobs(req.query.before, req.query.limit));
        } catch (error) {
            next(error);
        }
    });
    router.get('/jobs/:id', (req, res, next) => {
        const job = runtime.job(req.params.id);
        if (!job) return next(new HttpError(404, '未找到任务'));
        res.json({ job });
    });
    router.get('/audit', (req, res, next) => {
        try {
            res.json(runtime.auditPage(req.query.before, req.query.limit));
        } catch (error) {
            next(error);
        }
    });
    router.get(
        '/logs/export',
        route(async (req, res) => {
            const format = req.query.format || 'csv';
            if (!['csv', 'json'].includes(format))
                throw new HttpError(400, '仅支持 CSV 或 JSON 导出');
            const result = await runtime.logs.query({ ...req.query, limit: 10000 }, 10000);
            res.set('X-Export-Truncated', result.nextCursor ? 'true' : 'false');
            res.attachment(`file-server-logs.${format}`);
            if (format === 'csv') res.type('text/csv').send(logsCsv(result.logs));
            else res.json({ logs: result.logs, truncated: Boolean(result.nextCursor) });
        }),
    );
    router.get(
        '/logs',
        route(async (req, res) => res.json(await runtime.logs.query(req.query))),
    );
    router.get(
        '/config/export',
        route(async (req, res) =>
            res.attachment('file-server-settings.json').json(await runtime.configuration.export()),
        ),
    );
    router.get(
        '/config',
        route(async (req, res) => res.json(await runtime.configuration.snapshot())),
    );
    router.post(
        '/config/validate',
        route(async (req, res) => {
            const { valid, changes, warnings } = await runtime.configuration.validate(req.body);
            res.json({ valid, changes, warnings });
        }),
    );
    router.put(
        '/config',
        route(async (req, res) =>
            res.json(await runtime.configuration.save(req.body, runtime.actorOf(req))),
        ),
    );
    router.post(
        '/config/rollback',
        route(async (req, res) =>
            res.json(await runtime.configuration.save(req.body, runtime.actorOf(req), true)),
        ),
    );
    router.post('/restart', (req, res, next) => {
        try {
            res.status(202).json(runtime.restart(runtime.actorOf(req)));
        } catch (error) {
            next(error);
        }
    });
    router.get('/sessions', (req, res) => res.json({ sessions: auth.listSessions(req) }));
    router.delete('/sessions/:id', (req, res, next) => {
        const result = auth.revokeSession(req, req.params.id);
        if (!result) return next(new HttpError(404, '会话不存在或已失效'));
        if (result.current) res.clearCookie('fs_session', { path: '/' });
        res.json(result);
    });
    router.get(
        '/database/status',
        route(async (req, res) => {
            const data = await runtime.stats(true);
            res.json({
                ...data.database,
                dbSize: data.database.total,
                tables: ['image', 'admin_jobs', 'admin_audit'],
            });
        }),
    );
    return router;
}
