import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { gzipSync } from 'node:zlib';
import Database from 'better-sqlite3';
import sharp from 'sharp';
import { Sql } from '../sqllite.js';
import { createApp } from '../app.js';
import { normalizeConfig, loadConfig } from '../configuration.js';
import { setServerStatus } from '../routes/admin.js';
import { nextRestartCount } from '../utils/restartPolicy.js';
import { WebSocket } from 'ws';
import { attachLogStream } from '../utils/logStream.js';
import { createAdminRuntime } from '../services/adminRuntime.js';
import { configureHttpTimeouts } from '../utils/httpPolicy.js';
import { DatabaseError } from '../utils/errors.js';
import { getDiskInfoAsync } from '../utils/systemInfo.js';
import { numericConfigErrors, NUMERIC_RULES } from '../utils/configSchema.js';

const ADMIN = 'isolated-admin-test-secret-32-characters';
const FILE = 'isolated-file-test-secret-32-characters';
const logger = { info() {}, warn() {}, error() {} };

test('shared numeric schema enforces bounds, integer rules and upload cross-field errors', () => {
    assert.deepEqual(numericConfigErrors({ port: 0 }, { allowEphemeralPorts: true }), {});
    assert.ok(numericConfigErrors({ port: 0 }).port);
    assert.ok(numericConfigErrors({ cacheRetentionDays: 1.5 }).cacheRetentionDays);
    assert.ok(numericConfigErrors({ cacheMaxSizeMB: '100' }).cacheMaxSizeMB);
    assert.ok(
        numericConfigErrors({ uploadTimeoutSeconds: 60, uploadIdleTimeoutSeconds: 61 })
            .uploadIdleTimeoutSeconds,
    );
    assert.deepEqual(
        numericConfigErrors({ uploadMaxSizeMB: NUMERIC_RULES.uploadMaxSizeMB.min }),
        {},
    );
});
async function fixture(t, options = {}) {
    const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'file-admin-test-'));
    const shared = path.join(directory, 'files');
    const runtime = path.join(directory, 'runtime');
    const logs = path.join(runtime, 'logs');
    await fs.promises.mkdir(shared);
    await fs.promises.mkdir(logs, { recursive: true });
    const raw = {
        rootPath: shared,
        dataPath: runtime,
        imgCache: path.join(runtime, 'cache'),
        restartPwd: ADMIN,
        accessToken: FILE,
        ...options.config,
    };
    await fs.promises.writeFile(path.join(runtime, 'config.json'), JSON.stringify(raw));
    const config = normalizeConfig(raw, runtime, {});
    const sql = new Sql(config.imgCache, config.dbPath);
    const restarts = [];
    const instance = createApp(config, sql, logger, {
        cwd: runtime,
        logsDir: logs,
        env: options.env || {},
        restartSupported: options.restartSupported || false,
        requestRestart: () => restarts.push('accepted'),
        staticDir: path.join(runtime, 'web'),
        adminDir: path.join(runtime, 'admin'),
    });
    setServerStatus({ http: 'running', https: config.httpsEnabled ? 'running' : 'disabled' });
    const server = http.createServer(instance.app);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    t.after(async () => {
        await instance.close();
        server.closeAllConnections();
        await new Promise((resolve) => server.close(resolve));
        sql.close();
        await fs.promises.rm(directory, { recursive: true, force: true });
    });
    const request = (url, { json, token = ADMIN, headers = {}, method, ...rest } = {}) =>
        fetch(base + url, {
            ...rest,
            method: method || (json ? 'POST' : 'GET'),
            headers: {
                ...(token ? { 'X-Admin-Token': token } : {}),
                ...(json ? { 'Content-Type': 'application/json' } : {}),
                ...headers,
            },
            ...(json ? { body: JSON.stringify(json) } : {}),
        });
    const cache = async (key, kind, age = 0) => {
        const hash = key.repeat(64);
        await fs.promises.writeFile(path.join(config.imgCache, hash + '.jpg'), `${kind} fixture`);
        sql.insertInfo(hash, '.jpg', kind);
        if (age)
            sql.db
                .prepare('UPDATE image SET ctime=? WHERE psha256=?')
                .run(String(Date.now() - age * 86400000), hash);
        return hash;
    };
    return {
        ...instance,
        server,
        base,
        sql,
        config,
        shared,
        directory: runtime,
        logs,
        request,
        cache,
        restarts,
    };
}

test('maintenance releases all locks after queued, running and terminal persistence failures', async (t) => {
    for (const stage of ['queued', 'running', 'succeeded']) {
        await t.test(stage, async (t) => {
            const f = await fixture(t);
            const prepare = f.sql.db.prepare.bind(f.sql.db);
            f.sql.db.prepare = (query) => {
                const statement = prepare(query);
                if (!query.startsWith('INSERT INTO admin_jobs')) return statement;
                return {
                    run(id, data) {
                        if (JSON.parse(data).status === stage) {
                            const error = new Error('fault injection');
                            error.code = 'SQLITE_FULL';
                            throw error;
                        }
                        return statement.run(id, data);
                    },
                };
            };
            try {
                if (stage === 'queued') {
                    assert.throws(() => f.runtime.startCleanup({ mode: 'all' }), { status: 503 });
                } else {
                    const { job, completion } = f.runtime.startCleanup({ mode: 'all' });
                    assert.equal(job.status, 'queued');
                    const completed = await completion;
                    assert.equal(completed.status, 'failed');
                    assert.equal(f.runtime.job(job.id).status, 'failed');
                    assert.equal(f.runtime.jobs().jobs[0].status, 'failed');
                }
                assert.equal(f.previews.stats().maintenance, false);
            } finally {
                f.sql.db.prepare = prepare;
            }
            assert.equal(
                (await f.runtime.startCleanup({ mode: 'all' }).completion).status,
                'succeeded',
            );
            assert.equal((await f.runtime.stats()).maintenance, false);
        });
    }
});

test('concurrent forced cache statistics share one scan and ordinary reads use the TTL', async (t) => {
    const f = await fixture(t);
    await f.cache('a', 'image');
    await f.cache('b', 'video');
    const lstat = fs.promises.lstat;
    let calls = 0;
    fs.promises.lstat = async (...args) => {
        if (String(args[0]).startsWith(f.config.imgCache + path.sep)) calls++;
        return lstat(...args);
    };
    try {
        const results = await Promise.all(Array.from({ length: 4 }, () => f.runtime.stats(true)));
        assert.equal(calls, 2);
        assert.ok(results.every((result) => result.totalFiles === 2));
        await f.runtime.stats();
        assert.equal(calls, 2);
        await f.runtime.stats(true);
        assert.equal(calls, 4);
    } finally {
        fs.promises.lstat = lstat;
    }
});

test('a failed statistics scan can be retried instead of retaining a rejected promise', async (t) => {
    const f = await fixture(t);
    const readdir = fs.promises.readdir;
    fs.promises.readdir = async (...args) => {
        if (args[0] === f.config.imgCache) throw new Error('injected scan failure');
        return readdir(...args);
    };
    try {
        await assert.rejects(f.runtime.stats(true), /injected scan failure/);
    } finally {
        fs.promises.readdir = readdir;
    }
    assert.equal((await f.runtime.stats(true)).totalFiles, 0);
});

test('SQLite failures are typed errors rather than successful zero counts or cache misses', async (t) => {
    const f = await fixture(t);
    const count = f.sql.statements.count;
    const select = f.sql.statements.select;
    const insert = f.sql.statements.insert;
    const fail = () => {
        throw new Error('sensitive underlying database error');
    };
    f.sql.statements.count = { get: fail };
    f.sql.statements.select = { get: fail };
    f.sql.statements.insert = { run: fail };
    try {
        for (const action of [
            () => f.sql.getCount(),
            () => f.sql.selectInfo('a'),
            () => f.sql.insertInfo('a', '.jpg'),
        ]) {
            assert.throws(
                action,
                (error) =>
                    error instanceof DatabaseError &&
                    error.code === 'DATABASE_UNAVAILABLE' &&
                    error.status === 503 &&
                    error.cause.message.includes('underlying'),
            );
        }
        const response = await f.request('/api/admin/cache/stats?refresh=true');
        assert.equal(response.status, 503);
        const body = await response.json();
        assert.equal(body.code, 'DATABASE_UNAVAILABLE');
        assert.equal(body.requestId, response.headers.get('X-Request-Id'));
        assert.equal(JSON.stringify(body).includes('sensitive'), false);
    } finally {
        Object.assign(f.sql.statements, { count, select, insert });
    }
});

test('identical physical log records retain distinct IDs and append paging is stable', async (t) => {
    const f = await fixture(t);
    const line = '[2026-10-11T12:00:00.000Z] [INFO] [default] 相同消息\n';
    await fs.promises.writeFile(path.join(f.logs, 'app.log'), line + line);
    const byTime = await f.runtime.logs.query();
    assert.equal(byTime.logs.length, 2);
    assert.notEqual(byTime.logs[0].id, byTime.logs[1].id);
    const first = await f.runtime.logs.query({ order: 'append', limit: 1 });
    const second = await f.runtime.logs.query({
        order: 'append',
        limit: 1,
        before: first.nextCursor,
    });
    assert.equal(second.logs.length, 1);
    assert.notEqual(first.logs[0].id, second.logs[0].id);
    assert.equal(second.nextCursor, null);
    await assert.rejects(f.runtime.logs.query({ before: first.nextCursor }), { status: 400 });
});

test('append pagination follows uncompressed rotation and reports expired archive cursors', async (t) => {
    const f = await fixture(t);
    const file = path.join(f.logs, 'app.log');
    const line = (index) => `[2026-10-11T12:0${index}:00.000Z] [INFO] [default] line ${index}\n`;
    await fs.promises.writeFile(file, line(1) + line(2));
    const first = await f.runtime.logs.query({ order: 'append', limit: 1 });
    await fs.promises.rename(file, file + '.1');
    await fs.promises.writeFile(file, line(3));
    const next = await f.runtime.logs.query({
        order: 'append',
        limit: 1,
        before: first.nextCursor,
    });
    assert.equal(next.logs[0].message, 'line 1');
    await fs.promises.unlink(file + '.1');
    await assert.rejects(f.runtime.logs.query({ order: 'append', before: first.nextCursor }), {
        status: 409,
    });
});

test('append paging refuses a cursor after its file was truncated', async (t) => {
    const f = await fixture(t);
    const file = path.join(f.logs, 'app.log');
    await fs.promises.writeFile(
        file,
        '[2026-10-11T12:00:00.000Z] [INFO] [default] first\n' +
            '[2026-10-11T12:01:00.000Z] [INFO] [default] second\n',
    );
    const first = await f.runtime.logs.query({ order: 'append', limit: 1 });
    assert.ok(first.nextCursor);
    await fs.promises.truncate(file, 0);
    await assert.rejects(f.runtime.logs.query({ order: 'append', before: first.nextCursor }), {
        status: 409,
    });
});

test('append tail reads a bounded portion of the active log and handles UTF-8 across blocks', async (t) => {
    const f = await fixture(t);
    const file = path.join(f.logs, 'app.log');
    const line = '[2026-10-11T12:00:00.000Z] [INFO] [default] 中文消息\n';
    await fs.promises.writeFile(file, line.repeat(100000));
    const open = fs.promises.open;
    let bytes = 0;
    fs.promises.open = async (...args) => {
        const handle = await open(...args);
        if (args[0] === file) {
            const read = handle.read.bind(handle);
            handle.read = async (...args) => {
                const result = await read(...args);
                bytes += result.bytesRead;
                return result;
            };
        }
        return handle;
    };
    try {
        const result = await f.runtime.logs.query({ order: 'append', limit: 100 });
        assert.equal(result.logs.length, 100);
        assert.ok(result.logs.every((log) => log.message === '中文消息'));
        assert.ok(bytes <= 65536, `${bytes} bytes read`);
        assert.equal(new Set(result.logs.map((log) => log.id)).size, 100);
    } finally {
        fs.promises.open = open;
    }
});

test('event IDs survive compression, deduplicate the same event and hide transport markers', async (t) => {
    const f = await fixture(t);
    const line =
        '[2026-10-11T12:00:00.000Z] [INFO] [default] [eventId=12345678-1234-1234-1234-123456789abc] message\n';
    await fs.promises.writeFile(path.join(f.logs, 'app.log'), line);
    await fs.promises.writeFile(path.join(f.logs, 'app.log.1.gz'), gzipSync(line));
    const result = await f.runtime.logs.query();
    assert.equal(result.logs.length, 1);
    assert.equal(result.logs[0].message, 'message');
});

test('health probes are lightweight and contain no private paths or credentials', async (t) => {
    const f = await fixture(t);
    for (const endpoint of ['/health/live', '/health/ready']) {
        const response = await f.request(endpoint, { token: null });
        assert.equal(response.status, 200);
        assert.equal(response.headers.get('Cache-Control'), 'no-store');
        const text = await response.text();
        assert.equal(text.includes(f.shared), false);
        assert.equal(text.includes(ADMIN), false);
    }
});

test('upload deadlines remain bounded, independently from header and ordinary request protection', async (t) => {
    const f = await fixture(t, {
        config: { uploadTimeoutSeconds: 900, uploadIdleTimeoutSeconds: 30 },
    });
    configureHttpTimeouts(f.server, f.config);
    assert.equal(f.server.requestTimeout, 900000);
    assert.equal(f.server.headersTimeout, 15000);
    assert.throws(() => normalizeConfig({ ...f.config, uploadTimeoutSeconds: 0 }, f.directory, {}));
    assert.throws(() =>
        normalizeConfig(
            { ...f.config, uploadTimeoutSeconds: 1, uploadIdleTimeoutSeconds: 2 },
            f.directory,
            {},
        ),
    );
    const snapshot = await f.runtime.configuration.snapshot();
    await assert.rejects(
        f.runtime.configuration.validate({
            revision: snapshot.revision,
            values: { uploadIdleTimeoutSeconds: 901 },
        }),
        { status: 400 },
    );
});

test('aborted multipart uploads leave neither temporary nor published files and release slots', async (t) => {
    const f = await fixture(t, { config: { writeEnabled: true, uploadEnabled: true } });
    const boundary = 'isolated-abort-boundary';
    const request = http.request(f.base + '/upload', {
        method: 'POST',
        headers: {
            'X-File-Token': FILE,
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
    });
    request.on('error', () => {});
    request.write(
        `--${boundary}\r\nContent-Disposition: form-data; name="destPath"\r\n\r\n\r\n--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="aborted.txt"\r\nContent-Type: text/plain\r\n\r\npartial upload`,
    );
    for (let attempt = 0; attempt < 100; attempt++) {
        if ((await fs.promises.readdir(f.shared)).some((name) => name.startsWith('.fsupload-')))
            break;
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.equal(
        (await fs.promises.readdir(f.shared)).some((name) => name.startsWith('.fsupload-')),
        true,
    );
    request.destroy();
    for (let attempt = 0; attempt < 100; attempt++) {
        if (
            !(await fs.promises.readdir(f.shared)).length &&
            f.runtime.status({}).queues.upload.active === 0
        )
            break;
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.deepEqual(await fs.promises.readdir(f.shared), []);
    assert.equal(f.runtime.status({}).queues.upload.active, 0);
});

test('successful file mutations and rejected logins produce noncredential audit records', async (t) => {
    const f = await fixture(t, { config: { writeEnabled: true } });
    await fs.promises.writeFile(path.join(f.shared, 'old.txt'), 'test');
    const renamed = await f.request('/renameFile', {
        json: { oldPath: 'old.txt', newPath: 'new.txt' },
    });
    assert.equal(renamed.status, 200);
    assert.equal((await f.request('/delFile', { json: { filePath: 'new.txt' } })).status, 200);
    assert.equal(
        (
            await f.request('/api/auth/login', {
                token: null,
                json: { token: 'never-log-this-secret' },
            })
        ).status,
        401,
    );
    const audit = f.runtime.auditPage().entries;
    assert.ok(
        audit.some(
            (entry) =>
                entry.action === 'file.rename' &&
                entry.target === 'old.txt' &&
                entry.details.destination === 'new.txt',
        ),
    );
    assert.ok(audit.some((entry) => entry.action === 'file.delete'));
    assert.ok(audit.some((entry) => entry.action === 'auth.login' && entry.result === 'failed'));
    assert.equal(JSON.stringify(audit).includes('never-log-this-secret'), false);
});

test('async disk sampling distinguishes an unavailable mount from an empty disk', async (t) => {
    const f = await fixture(t);
    const valid = await getDiskInfoAsync(f.shared);
    assert.equal(valid.available, true);
    const unavailable = await getDiskInfoAsync(path.join(f.shared, 'missing-mount'));
    assert.equal(unavailable.available, false);
    assert.equal(unavailable.usage, null);
    assert.equal(unavailable.free, null);
});

test('audit storage failures preserve successful mutations and raise a visible warning', async (t) => {
    const f = await fixture(t, { config: { writeEnabled: true } });
    f.sql.db.exec(
        `CREATE TRIGGER fail_audit BEFORE INSERT ON admin_audit BEGIN SELECT RAISE(FAIL, 'injected audit failure'); END;`,
    );
    await fs.promises.writeFile(path.join(f.shared, 'delete.txt'), 'test');
    const result = await f.request('/delFile', { json: { filePath: 'delete.txt' } });
    assert.equal(result.status, 200);
    assert.deepEqual(await fs.promises.readdir(f.shared), []);
    assert.ok(f.runtime.status({}).alerts.some((alert) => alert.message.includes('审计写入失败')));
});

test('maintenance cleanup errors still release the runtime lock and expose a failed job', async (t) => {
    const f = await fixture(t);
    const endMaintenance = f.previews.endMaintenance;
    f.previews.endMaintenance = () => {
        endMaintenance();
        throw new Error('injected finalization failure');
    };
    const { job, completion } = f.runtime.startCleanup({ mode: 'all' });
    const result = await completion;
    assert.equal(result.status, 'failed');
    assert.ok(result.finishedAt);
    assert.equal(f.runtime.job(job.id).status, 'failed');
    f.previews.endMaintenance = endMaintenance;
    assert.equal((await f.runtime.startCleanup({ mode: 'all' }).completion).status, 'succeeded');
});

test('upload idle expiry returns 408, removes partial data and releases its slot', async (t) => {
    const f = await fixture(t, {
        config: {
            writeEnabled: true,
            uploadEnabled: true,
            uploadTimeoutSeconds: 10,
            uploadIdleTimeoutSeconds: 1,
        },
    });
    const boundary = 'isolated-timeout-boundary';
    const response = new Promise((resolve, reject) => {
        const request = http.request(
            f.base + '/upload',
            {
                method: 'POST',
                headers: {
                    'X-File-Token': FILE,
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                },
            },
            (result) => {
                result.resume();
                result.once('end', () => resolve(result.statusCode));
            },
        );
        request.on('error', reject);
        request.write(
            `--${boundary}\r\nContent-Disposition: form-data; name="destPath"\r\n\r\n\r\n--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="timeout.txt"\r\nContent-Type: text/plain\r\n\r\npartial upload`,
        );
    });
    assert.equal(await response, 408);
    for (let attempt = 0; attempt < 100; attempt++) {
        if (
            !(await fs.promises.readdir(f.shared)).length &&
            f.runtime.status({}).queues.upload.active === 0
        )
            break;
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.deepEqual(await fs.promises.readdir(f.shared), []);
    assert.equal(f.runtime.status({}).queues.upload.active, 0);
});

test('admin pages and mutations remain inaccessible to anonymous and file identities', async (t) => {
    const f = await fixture(t);
    for (const route of [
        '/status',
        '/cache/stats',
        '/jobs',
        '/audit',
        '/logs',
        '/logs/export',
        '/config',
        '/config/export',
        '/sessions',
    ]) {
        assert.equal((await f.request('/api/admin' + route, { token: null })).status, 401);
        assert.equal(
            (
                await f.request('/api/admin' + route, {
                    token: null,
                    headers: { 'X-File-Token': FILE },
                })
            ).status,
            401,
        );
    }
    assert.equal(
        (await f.request('/api/admin/config', { method: 'PUT', json: {}, token: null })).status,
        401,
    );
    assert.equal(
        (await f.request('/api/admin/sessions/no-such-id', { method: 'DELETE', token: null }))
            .status,
        401,
    );
    assert.equal((await f.request('/api/auth/session', { token: null })).status, 401);
});

test('session management exposes only noncredential IDs and revokes associated media tickets', async (t) => {
    const f = await fixture(t);
    const admin = await (
        await f.request('/api/auth/login', { token: null, json: { token: ADMIN } })
    ).json();
    const file = await (
        await f.request('/api/auth/login', { token: null, json: { token: FILE } })
    ).json();
    const headers = { Authorization: `Bearer ${admin.sessionToken}` };
    const info = await (await f.request('/api/auth/session', { token: null, headers })).json();
    assert.equal(info.role, 'admin');
    const body = await (await f.request('/api/admin/sessions', { token: null, headers })).json();
    assert.equal(body.sessions.length, 2);
    assert.equal(body.sessions.find((session) => session.role === 'admin').current, true);
    assert.equal(JSON.stringify(body).includes(admin.sessionToken), false);
    assert.equal(JSON.stringify(body).includes(file.readTicket), false);
    const target = body.sessions.find((session) => session.role === 'file');
    assert.equal(
        (
            await f.request(`/api/admin/sessions/${target.id}`, {
                method: 'DELETE',
                token: null,
                headers,
            })
        ).status,
        200,
    );
    assert.equal(
        (await f.request(`/list/$?ticket=${file.readTicket}`, { token: null })).status,
        401,
    );
    assert.equal(
        (
            await f.request('/api/auth/session', {
                token: null,
                headers: { Authorization: `Bearer ${file.sessionToken}` },
            })
        ).status,
        401,
    );
    const current = await f.request(`/api/admin/sessions/${info.sessionId}`, {
        method: 'DELETE',
        token: null,
        headers,
    });
    assert.equal((await current.json()).current, true);
    assert.equal((await f.request('/api/admin/status', { token: null, headers })).status, 401);
});

test('overview returns sampled real process data and marks unconfigured HTTPS disabled', async (t) => {
    const f = await fixture(t);
    const response = await (await f.request('/api/admin/status')).json();
    assert.ok(response.sampledAt);
    assert.ok(response.bootId);
    assert.equal(response.server.httpsStatus, 'disabled');
    assert.equal(response.server.restartSupported, false);
    assert.equal(response.memory.scope, 'host');
    assert.ok(response.process.rss > 0);
    assert.equal(response.queues.image.limit, 4);
    assert.equal(response.queues.video.limit, 2);
    assert.ok(response.history.length > 0);
});

test('cache schema migration preserves legacy records and adds type without dropping data', async (t) => {
    const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'file-admin-migrate-'));
    t.after(() => fs.promises.rm(directory, { recursive: true, force: true }));
    const file = path.join(directory, 'old.db');
    const old = new Database(file);
    old.exec('CREATE TABLE image(psha256 TEXT PRIMARY KEY,ext TEXT,ctime TEXT)');
    old.prepare('INSERT INTO image VALUES(?,?,?)').run('a'.repeat(64), '.png', '1000');
    old.close();
    const sql = new Sql(directory, file);
    assert.equal(sql.getCount(), 1);
    assert.equal(sql.selectInfo('a'.repeat(64)).kind, 'legacy');
    sql.close();
});

test('cache stats classify real image/video/legacy records and account for WAL/SHM', async (t) => {
    const f = await fixture(t);
    await f.cache('a', 'image');
    await f.cache('b', 'video');
    await f.cache('c', 'legacy');
    const body = await (await f.request('/api/admin/cache/stats')).json();
    assert.equal(body.totalFiles, 3);
    assert.equal(body.imageCache.count, 1);
    assert.equal(body.videoCache.count, 1);
    assert.equal(body.legacyCache.count, 1);
    assert.ok(body.database.wal > 0);
    assert.equal(body.dbSize, body.database.main + body.database.wal + body.database.shm);
});

test('new previews register their type and maintenance rejects fresh preview requests', async (t) => {
    const f = await fixture(t);
    await sharp({ create: { width: 16, height: 16, channels: 3, background: '#229988' } })
        .png()
        .toFile(path.join(f.shared, 'image.png'));
    const headers = { 'X-File-Token': FILE };
    assert.equal(
        (await f.request('/getFile/image.png!16x16', { token: null, headers })).status,
        200,
    );
    assert.equal((await f.runtime.stats(true)).imageCache.count, 1);
    await f.previews.beginMaintenance();
    assert.equal((await f.request('/getFile/image.png!8x8', { token: null, headers })).status, 503);
    f.previews.endMaintenance();
    assert.equal((await f.request('/getFile/image.png!8x8', { token: null, headers })).status, 200);
});

test('cleanup invalidates stats immediately, preserves recent cache and records result', async (t) => {
    const f = await fixture(t);
    await f.cache('a', 'video', 40);
    await f.cache('b', 'image');
    assert.equal((await f.runtime.stats()).totalFiles, 2);
    const response = await f.request('/api/admin/cache/clean', { json: { days: 30 } });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).cleaned, 1);
    const after = await (await f.request('/api/admin/cache/stats')).json();
    assert.equal(after.totalFiles, 1);
    assert.equal(after.videoCache.count, 0);
    const jobs = await (await f.request('/api/admin/jobs')).json();
    assert.equal(jobs.jobs[0].status, 'succeeded');
    assert.ok(jobs.jobs[0].result.freedBytes > 0);
    const audit = await (await f.request('/api/admin/audit')).json();
    assert.equal(audit.entries[0].action, 'cache.cleanup');
});

test('only one cleanup runs, with durable job lookup and safe cache-only publication', async (t) => {
    const f = await fixture(t);
    await f.cache('a', 'image', 40);
    await fs.promises.writeFile(path.join(f.config.imgCache, 'leave-me.txt'), 'not-a-cache');
    await fs.promises.writeFile(path.join(f.shared, 'original.jpg'), 'original');
    await fs.promises.symlink(
        path.join(f.shared, 'original.jpg'),
        path.join(f.config.imgCache, 'b'.repeat(64) + '.jpg'),
    );
    const first = f.runtime.startCleanup({ mode: 'all' });
    assert.throws(
        () => f.runtime.startCleanup({ mode: 'all' }),
        (error) => error.status === 409,
    );
    await first.completion;
    const job = await (await f.request('/api/admin/jobs/' + first.job.id)).json();
    assert.equal(job.job.status, 'succeeded');
    assert.equal(
        await fs.promises.readFile(path.join(f.shared, 'original.jpg'), 'utf8'),
        'original',
    );
    assert.equal(
        await fs.promises.readFile(path.join(f.config.imgCache, 'leave-me.txt'), 'utf8'),
        'not-a-cache',
    );
    assert.equal((await f.request('/api/admin/jobs/missing')).status, 404);
    assert.equal((await f.request('/api/admin/jobs?limit=-1')).status, 400);
});

test('policy cleanup obeys retention and capacity with LRU eviction', async (t) => {
    const f = await fixture(t, { config: { cacheMaxSizeMB: 1, cacheRetentionDays: 30 } });
    const a = await f.cache('a', 'image', 40);
    const b = await f.cache('b', 'image', 1);
    const c = await f.cache('c', 'image');
    for (const key of [a, b, c])
        await fs.promises.writeFile(
            path.join(f.config.imgCache, key + '.jpg'),
            Buffer.alloc(700000),
        );
    const job = await f.runtime.startCleanup({ mode: 'policy' }).completion;
    assert.equal(job.result.cleaned, 2);
    assert.equal(fs.existsSync(path.join(f.config.imgCache, c + '.jpg')), true);
    assert.ok((await f.runtime.stats()).totalSize <= 1024 * 1024);
});

test('configuration rejects unknown credentials, unsafe roots, malformed origins and field types', async (t) => {
    const f = await fixture(t);
    const current = await (await f.request('/api/admin/config')).json();
    const response = await f.request('/api/admin/config/validate', {
        json: {
            revision: current.revision,
            values: {
                rootPath: '/',
                host: 'bad;command',
                accessToken: 'unsafe',
                writeEnabled: 'yes',
                allowedOrigins: ['*'],
            },
        },
    });
    assert.equal(response.status, 400);
    const body = await response.json();
    for (const key of ['rootPath', 'host', 'accessToken', 'writeEnabled', 'allowedOrigins'])
        assert.ok(body.errors[key]);
    assert.equal(fs.existsSync(path.join(f.directory, 'admin-config.local.json')), false);
});

test('config validation warns, save is secret-free and live switches apply without restart', async (t) => {
    const f = await fixture(t);
    const current = await (await f.request('/api/admin/config')).json();
    const values = { ...current.values, writeEnabled: true, uploadEnabled: true, publicRead: true };
    const validation = await (
        await f.request('/api/admin/config/validate', {
            json: { revision: current.revision, values },
        })
    ).json();
    assert.equal(validation.valid, true);
    assert.ok(validation.warnings.length);
    const saved = await f.request('/api/admin/config', {
        method: 'PUT',
        json: { revision: current.revision, values },
    });
    assert.equal(saved.status, 200);
    const body = await saved.json();
    assert.equal(f.config.writeEnabled, true);
    assert.equal(body.config.values.publicRead, true);
    const disk = await fs.promises.readFile(
        path.join(f.directory, 'admin-config.local.json'),
        'utf8',
    );
    assert.equal(disk.includes(ADMIN), false);
    assert.equal(disk.includes(FILE), false);
    assert.equal(loadConfig(f.directory).writeEnabled, true);
    assert.equal((await f.request('/list/$', { token: null })).status, 200);
    assert.equal(
        (
            await f.request('/api/admin/config', {
                method: 'PUT',
                json: { revision: current.revision, values },
            })
        ).status,
        409,
    );
    if (process.platform !== 'win32')
        assert.equal(
            fs.statSync(path.join(f.directory, 'admin-config.local.json')).mode & 0o777,
            0o600,
        );
});

test('listen and root edits remain pending restart; rollback restores prior settings', async (t) => {
    const f = await fixture(t);
    const root = path.join(path.dirname(f.shared), 'new-files');
    await fs.promises.mkdir(root);
    const current = await f.runtime.configuration.snapshot();
    const saved = await f.runtime.configuration.save(
        { revision: current.revision, values: { rootPath: root, port: 3210, writeEnabled: true } },
        'test',
    );
    assert.equal(f.config.rootPath, f.shared);
    assert.equal(f.config.port, 3000);
    assert.equal(f.config.writeEnabled, true);
    assert.deepEqual(saved.config.pendingRestart.sort(), ['port', 'rootPath']);
    const rolled = await f.runtime.configuration.save(
        { revision: saved.config.revision },
        'test',
        true,
    );
    assert.equal(rolled.config.values.rootPath, f.shared);
    assert.equal(f.config.writeEnabled, false);
    assert.equal(rolled.config.pendingRestart.length, 0);
});

test('environment controlled roots cannot be edited and safe exports contain no secrets', async (t) => {
    const f = await fixture(t, { env: { FILE_SERVER_ROOT: 'environment-is-active' } });
    const current = await (await f.request('/api/admin/config')).json();
    assert.equal(current.fields.find((field) => field.key === 'rootPath').readonly, true);
    const invalid = await f.request('/api/admin/config/validate', {
        json: { revision: current.revision, values: { rootPath: '/new-root' } },
    });
    assert.equal(invalid.status, 400);
    const output = await (await f.request('/api/admin/config/export')).text();
    assert.equal(output.includes(ADMIN), false);
    assert.equal(output.includes(FILE), false);
    assert.equal(output.includes('restartPwd'), false);
});

test('a failed atomic config publication leaves previous settings and revision intact', async (t) => {
    const f = await fixture(t);
    const initial = await f.runtime.configuration.snapshot();
    const first = await f.runtime.configuration.save(
        { revision: initial.revision, values: { writeEnabled: true } },
        'test',
    );
    const file = path.join(f.directory, 'admin-config.local.json');
    const old = await fs.promises.readFile(file, 'utf8');
    const rename = fs.promises.rename;
    fs.promises.rename = async () => {
        const error = new Error('simulated disk failure');
        error.code = 'EACCES';
        throw error;
    };
    try {
        await assert.rejects(
            f.runtime.configuration.save(
                { revision: first.config.revision, values: { writeEnabled: false } },
                'test',
            ),
        );
    } finally {
        fs.promises.rename = rename;
    }
    assert.equal(await fs.promises.readFile(file, 'utf8'), old);
    assert.equal((await f.runtime.configuration.snapshot()).revision, first.config.revision);
    assert.equal(f.config.writeEnabled, true);
    assert.equal(
        (await fs.promises.readdir(f.directory)).some((name) => name.startsWith('.admin-write-')),
        false,
    );
});

test('upload request limits use updated live config instead of stale multer limits', async (t) => {
    const f = await fixture(t, { config: { writeEnabled: true, uploadEnabled: true } });
    const current = await f.runtime.configuration.snapshot();
    await f.runtime.configuration.save(
        { revision: current.revision, values: { uploadMaxSizeMB: 0.001 } },
        'test',
    );
    const body = new FormData();
    body.append('destPath', '');
    body.append('file', new Blob(['x'.repeat(2048)]), 'large.txt');
    assert.equal(
        (
            await f.request('/upload', {
                method: 'POST',
                token: null,
                headers: { 'X-File-Token': FILE },
                body,
            })
        ).status,
        413,
    );
});

test('logs query rotated compressed history, with stable cursors and selected source', async (t) => {
    const f = await fixture(t);
    const line = (time, level, message) =>
        `[2026-10-11T${time}:00.000Z] [${level}] [default] ${message}\n`;
    await fs.promises.writeFile(
        path.join(f.logs, 'app.log'),
        line('12:02', 'INFO', 'third') + line('12:01', 'WARN', 'second'),
    );
    await fs.promises.writeFile(
        path.join(f.logs, 'app.log.1.gz'),
        gzipSync(line('12:00', 'INFO', 'first')),
    );
    await fs.promises.writeFile(
        path.join(f.logs, 'restart.log'),
        '[2026-10-11T12:03:00.000Z] planned restart\n',
    );
    const first = await (await f.request('/api/admin/logs?limit=2')).json();
    assert.deepEqual(
        first.logs.map((log) => log.message),
        ['third', 'second'],
    );
    assert.ok(first.nextCursor);
    const second = await (
        await f.request('/api/admin/logs?limit=2&before=' + first.nextCursor)
    ).json();
    assert.deepEqual(
        second.logs.map((log) => log.message),
        ['first'],
    );
    const supervisor = await (await f.request('/api/admin/logs?source=supervisor')).json();
    assert.equal(supervisor.logs[0].message, 'planned restart');
    assert.equal(supervisor.logs[0].timestamp, '2026-10-11T12:03:00.000Z');
    assert.equal((await f.request('/api/admin/logs?source=../../auth.local.json')).status, 400);
    assert.equal((await f.request('/api/admin/logs?before=broken')).status, 400);
    assert.equal((await f.request('/api/admin/logs?start=bad')).status, 400);
});

test('logs preserve Chinese across chunks, redact tokens and escape spreadsheet formulas', async (t) => {
    const f = await fixture(t);
    const lines = Array.from(
        { length: 100 },
        (_, index) =>
            `[${new Date(Date.UTC(2026, 9, 11, 12, 0, index)).toISOString()}] [INFO] [default] ${'中'.repeat(300)}\n`,
    ).join('');
    await fs.promises.writeFile(
        path.join(f.logs, 'app.log'),
        lines +
            '[2026-10-11T13:00:00.000Z] [WARN] [default] Authorization: Bearer secret-credential /getFile/x?ticket=secret-ticket\n' +
            '[2026-10-11T13:00:01.000Z] [WARN] [default] {"Authorization":"Bearer json-secret","sessionToken":"session-secret"}\n' +
            '[2026-10-11T13:01:00.000Z] [INFO] [default] =EXEC("bad")\n',
    );
    const output = await (await f.request('/api/admin/logs?limit=200')).text();
    assert.equal(output.includes('\ufffd'), false);
    assert.equal(output.includes('secret-credential'), false);
    assert.equal(output.includes('secret-ticket'), false);
    assert.equal(output.includes('json-secret'), false);
    assert.equal(output.includes('session-secret'), false);
    const csv = await (await f.request('/api/admin/logs/export?format=csv')).text();
    assert.ok(csv.includes("'=EXEC"));
    assert.equal((await f.request('/api/admin/logs/export?format=xml')).status, 400);
});

test('real-time logs carry stable IDs, redact credentials and close revoked sessions', async (t) => {
    const f = await fixture(t);
    attachLogStream(f.server, f.auth, f.config, logger, { logsDir: f.logs });
    await fs.promises.writeFile(path.join(f.logs, 'app.log'), '');
    const login = await f.request('/api/auth/login', { token: null, json: { token: ADMIN } });
    const cookie = login.headers.get('set-cookie').split(';')[0];
    const session = await (
        await f.request('/api/auth/session', { token: null, headers: { Cookie: cookie } })
    ).json();
    const ws = new WebSocket(f.base.replace('http:', 'ws:') + '/api/admin/logs/stream', {
        headers: { Cookie: cookie },
    });
    t.after(() => ws.terminate());
    await new Promise((resolve, reject) => {
        ws.once('open', resolve);
        ws.once('error', reject);
    });
    const message = new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('log stream timeout')), 4000);
        ws.once('message', (data) => {
            clearTimeout(timer);
            resolve(JSON.parse(data));
        });
    });
    await fs.promises.appendFile(
        path.join(f.logs, 'app.log'),
        '[2026-10-11T13:20:00.000Z] [INFO] [default] 实时测试 /getFile/x?ticket=stream-secret\n',
    );
    const entry = await message;
    assert.match(entry.id, /^[a-f0-9]{24}$/);
    assert.ok(entry.message.includes('实时测试'));
    assert.equal(entry.message.includes('stream-secret'), false);
    const history = await (await f.request('/api/admin/logs')).json();
    assert.equal(history.logs[0].id, entry.id);
    const closed = new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('revocation timeout')), 4000);
        ws.once('close', (code) => {
            clearTimeout(timer);
            resolve(code);
        });
    });
    await f.request(`/api/admin/sessions/${session.sessionId}`, { method: 'DELETE' });
    assert.equal(await closed, 1008);
});

test('unmanaged restart is refused; managed restart is accepted and audited', async (t) => {
    const un = await fixture(t);
    assert.equal((await un.request('/api/admin/restart', { json: {} })).status, 409);
    const managed = await fixture(t, { restartSupported: true });
    const response = await managed.request('/api/admin/restart', { json: {} });
    assert.equal(response.status, 202);
    assert.ok((await response.json()).bootId);
    assert.deepEqual(managed.restarts, ['accepted']);
    assert.equal(nextRestartCount(8, { planned: true }), 8);
    assert.equal(nextRestartCount(8, { uptimeMs: 70000 }), 1);
    assert.equal(nextRestartCount(8, {}), 9);
    const audit = await (await managed.request('/api/admin/audit')).json();
    assert.ok(audit.entries.some((entry) => entry.action === 'server.restart'));
});

test('async cleanup endpoint returns a durable job and invalid policies fail explicitly', async (t) => {
    const f = await fixture(t);
    assert.equal(
        (await f.request('/api/admin/cache/jobs', { json: { mode: 'expired', days: 0 } })).status,
        400,
    );
    assert.equal(
        (await f.request('/api/admin/cache/jobs', { json: { mode: 'broken' } })).status,
        400,
    );
    const result = await f.request('/api/admin/cache/jobs', {
        json: { mode: 'expired', days: 30 },
    });
    assert.equal(result.status, 202);
    const { job } = await result.json();
    assert.ok(job.id);
    if (f.runtime.job(job.id).status === 'running') {
        while (f.runtime.job(job.id).status === 'running')
            await new Promise((resolve) => setImmediate(resolve));
    }
    assert.equal(f.runtime.job(job.id).status, 'succeeded');
});

test('admin history survives reopening and abandoned jobs are marked interrupted', async (t) => {
    const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'file-admin-reopen-'));
    t.after(() => fs.promises.rm(directory, { recursive: true, force: true }));
    const root = path.join(directory, 'files');
    const data = path.join(directory, 'data');
    await fs.promises.mkdir(root);
    const config = normalizeConfig(
        { rootPath: root, dataPath: data, imgCache: path.join(data, 'cache') },
        directory,
        {},
    );
    const first = new Sql(config.imgCache, config.dbPath);
    first.db.exec(
        'CREATE TABLE admin_jobs(seq INTEGER PRIMARY KEY AUTOINCREMENT,id TEXT UNIQUE NOT NULL,data TEXT NOT NULL)',
    );
    first.db.prepare('INSERT INTO admin_jobs(id,data) VALUES(?,?)').run(
        'abandoned',
        JSON.stringify({
            id: 'abandoned',
            type: 'cache.all',
            status: 'running',
            createdAt: Date.now(),
            progress: { processed: 1, total: 3 },
            result: { cleaned: 1, freedBytes: 5, failed: 0 },
        }),
    );
    first.close();
    const reopened = new Sql(config.imgCache, config.dbPath);
    const runtime = createAdminRuntime(
        config,
        reopened,
        logger,
        { stats: () => ({}) },
        { cwd: directory, env: {} },
    );
    assert.equal(runtime.job('abandoned').status, 'interrupted');
    assert.ok(runtime.job('abandoned').error.includes('中断'));
    runtime.audit(
        'config.save',
        { role: 'admin', sessionId: 'public-id' },
        'admin-config',
        'succeeded',
        { keys: ['publicRead'] },
    );
    await runtime.close();
    reopened.close();
    const persisted = new Sql(config.imgCache, config.dbPath);
    assert.equal(persisted.db.prepare('SELECT COUNT(*) AS count FROM admin_audit').get().count, 1);
    assert.equal(
        JSON.parse(
            persisted.db.prepare('SELECT data FROM admin_jobs WHERE id=?').get('abandoned').data,
        ).status,
        'interrupted',
    );
    persisted.close();
});
