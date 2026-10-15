// Independent black-box acceptance against a real Rust process and isolated data.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import http from 'node:http';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = await fs.mkdtemp(path.join(os.tmpdir(), 'file-server-rust-acceptance-'));
const files = path.join(sandbox, 'files');
const data = path.join(sandbox, 'data');
const cache = path.join(sandbox, 'cache');
const staticDir = path.join(sandbox, 'static');
for (const directory of [files, data, cache, path.join(staticDir, 'admin')]) {
    await fs.mkdir(directory, { recursive: true });
}
await fs.writeFile(path.join(files, 'sample.txt'), '0123456789');
await fs.writeFile(path.join(files, '中文__$.txt'), 'literal-path');
await fs.writeFile(path.join(files, '.secret.txt'), 'must-never-be-served');
for (const directory of ['$', '$$']) {
    await fs.mkdir(path.join(files, directory));
    await fs.writeFile(path.join(files, directory, 'literal.txt'), directory);
}
await fs.writeFile(path.join(files, 'literal.jpg!32x24'), 'not-a-thumbnail-request');
await fs.writeFile(path.join(sandbox, 'outside.txt'), 'outside');
await fs.symlink(path.join(sandbox, 'outside.txt'), path.join(files, 'escape.txt'));
await fs.writeFile(path.join(staticDir, 'admin/index.html'), '<h1>acceptance administration</h1>');
const temporaryListener = net.createServer();
await new Promise(resolve => temporaryListener.listen(0, '127.0.0.1', resolve));
const port = temporaryListener.address().port;
await new Promise(resolve => temporaryListener.close(resolve));
const adminToken = 'acceptance-admin-token-32-characters';
const accessToken = 'acceptance-read-token-32-characters';
const config = path.join(sandbox, 'config.local.json');
await fs.writeFile(config, JSON.stringify({
    rootPath: files, dataPath: data, imgCache: cache, staticDir,
    host: '127.0.0.1', port, writeEnabled: true, uploadEnabled: true,
    accessToken, restartPwd: adminToken, uploadMaxSizeMB: 1,
}));
const executable = process.env.RUST_SERVER_BINARY
    || path.join(root, 'server-rust/target/debug', process.platform === 'win32' ? 'file-server.exe' : 'file-server');
let output = '';
let child;
let session;
const completed = [];
const base = `http://127.0.0.1:${port}`;
const contentUrl = input => `/api/v2/content?${new URLSearchParams({ path: input })}`;
const previewUrl = (input, kind = 'image', width = 32, height = 24) =>
    `/api/v2/preview?${new URLSearchParams({ path: input, kind, width: String(width), height: String(height) })}`;
async function launch(args = []) {
    child = spawn(executable, args, {
        cwd: sandbox,
        detached: process.platform !== 'win32',
        env: {
            ...process.env, FILE_SERVER_CONFIG: config, FILE_SERVER_ROOT: files,
            FILE_SERVER_DATA_DIR: data, FILE_SERVER_CACHE_DIR: cache,
            FILE_SERVER_STATIC_DIR: staticDir, FILE_SERVER_HOST: '127.0.0.1',
            FILE_SERVER_PORT: String(port), FILE_SERVER_ACCESS_TOKEN: accessToken,
            FILE_SERVER_ADMIN_TOKEN: adminToken,
        },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    child.stdout.on('data', chunk => { output += chunk.toString(); });
    child.stderr.on('data', chunk => { output += chunk.toString(); });
    let launchError;
    child.on('error', error => { launchError = error; });
    for (let attempt = 0; attempt < 120; attempt++) {
        if (launchError) throw launchError;
        if (child.exitCode !== null || child.signalCode !== null) throw new Error(`Rust exited ${child.exitCode ?? child.signalCode}: ${output}`);
        try {
            if ((await fetch(`${base}/health/ready`)).ok) return;
        } catch {}
        await sleep(100);
    }
    throw new Error(`Readiness timeout: ${output}`);
}
async function stop() {
    if (!child || child.exitCode !== null || child.signalCode !== null) return;
    const exited = new Promise(resolve => child.once('exit', resolve));
    const kill = signal => {
        try {
            if (process.platform !== 'win32') process.kill(-child.pid, signal);
            else child.kill(signal);
        } catch (error) { if (error.code !== 'ESRCH') throw error; }
    };
    kill('SIGTERM');
    const timeout = setTimeout(() => kill('SIGKILL'), 5000);
    await exited;
    clearTimeout(timeout);
}
async function request(url, { method = 'GET', json, body, headers = {}, auth = true } = {}) {
    return fetch(`${base}${url}`, {
        method, headers: {
            ...(auth && session ? { Authorization: `Bearer ${session}` } : {}),
            ...(json === undefined ? {} : { 'Content-Type': 'application/json' }),
            ...headers,
        },
        body: json === undefined ? body : JSON.stringify(json),
    });
}
async function check(name, run) {
    await run();
    completed.push(name);
    console.log(`PASS ${name}`);
}
async function login(token = adminToken) {
    const response = await request('/api/auth/login', { method: 'POST', json: { token }, auth: false });
    assert.equal(response.status, 200, await response.clone().text());
    const result = await response.json();
    assert.ok(result.sessionToken);
    return { ...result, cookie: response.headers.get('set-cookie')?.split(';')[0] };
}

try {
    await launch();
    await check('admin console hosting and history fallback', async () => {
        const root = await request('/', { auth: false });
        assert.ok(root.url.endsWith('/admin/'), 'the file client is native; root must point at the admin console');
        assert.match(await root.text(), /acceptance administration/);
        assert.match(await (await request('/admin/config', { auth: false })).text(), /acceptance administration/);
        assert.equal((await request('/api/admin/not-a-route')).status, 404);
    });
    await check('static application roots and index files refuse private symlinks', async () => {
        const admin = path.join(staticDir, 'admin');
        const originalAdmin = path.join(staticDir, 'admin-original');
        await fs.rename(admin, originalAdmin);
        await fs.symlink(data, admin);
        try {
            const response = await request('/admin/config', { auth: false });
            assert.ok([403, 404].includes(response.status),
                'static application root links must not expose private credentials');
            assert.ok(!(await response.text()).includes('accessToken'), 'private credentials must never leak');
            assert.ok([403, 404].includes((await request('/auth.local.json', { auth: false })).status));
        } finally {
            await fs.unlink(admin);
            await fs.rename(originalAdmin, admin);
        }
        const index = path.join(staticDir, 'admin/index.html');
        const originalIndex = await fs.readFile(index);
        await fs.unlink(index);
        await fs.symlink(path.join(sandbox, 'outside.txt'), index);
        try {
            assert.ok([403, 404].includes((await request('/admin/config', { auth: false })).status),
                'SPA fallback must resolve index through the same symlink boundary');
        } finally {
            await fs.unlink(index);
            await fs.writeFile(index, originalIndex);
        }
    });
    await check('authentication and origin boundary', async () => {
        assert.equal((await request('/api/v2/files?path=', { auth: false })).status, 401);
        assert.equal((await request('/api/admin/status', { auth: false })).status, 401);
        const result = await login();
        session = result.sessionToken;
        assert.equal(result.role, 'admin');
        assert.equal((await request('/api/auth/session')).status, 200);
        assert.equal((await request('/list/$')).status, 200, 'legacy read route remains transition-only');
        assert.equal((await request('/getFile/sample.txt')).status, 200);
        assert.equal((await request('/delFile', {
            method: 'POST', json: { filePath: 'sample.txt' }, headers: { Origin: 'https://attacker.example' },
        })).status, 403);
        const readSession = await login(accessToken);
        const headers = { Authorization: `Bearer ${readSession.sessionToken}` };
        assert.ok([401, 403].includes((await request('/api/admin/status', { headers })).status));
        assert.ok([401, 403].includes((await request(`/delFile?ticket=${readSession.readTicket}`, {
            method: 'POST', json: { filePath: 'sample.txt' }, auth: false,
        })).status));
    });
    await check('file and administrator browser cookies do not overwrite each other', async () => {
        const administrator = await login();
        const fileIdentity = await login(accessToken);
        assert.match(administrator.cookie, /^fs_admin_session=/);
        assert.match(fileIdentity.cookie, /^fs_session=/);
        const cookies = `${administrator.cookie}; ${fileIdentity.cookie}`;
        assert.equal((await request('/api/admin/status', { auth: false, headers: { Cookie: cookies } })).status, 200);
        const logout = await request('/api/auth/logout', {
            method: 'POST', json: {}, auth: false, headers: { Cookie: cookies },
        });
        assert.equal(logout.status, 200);
        const preserved = await request('/api/auth/session', {
            auth: false, headers: { Authorization: `Bearer ${fileIdentity.sessionToken}` },
        });
        assert.equal(preserved.status, 200);
        assert.equal((await preserved.json()).role, 'file');
        assert.equal((await request('/api/auth/session', {
            auth: false, headers: { Authorization: `Bearer ${administrator.sessionToken}` },
        })).status, 401);
        session = (await login()).sessionToken;
    });
    await check('path safety, literal Unicode names and pagination', async () => {
        const response = await request('/api/v2/files?path=&sta=0&end=2');
        assert.equal(response.status, 200);
        const result = await response.json();
        assert.ok(result.list.length <= 2);
        assert.ok(result.list.every(item => !item.name.startsWith('.') && item.name !== 'escape.txt'));
        for (const input of ['../outside.txt', '.secret.txt', 'escape.txt', 'C:\\Windows\\win.ini']) {
            const status = (await request(contentUrl(input))).status;
            assert.ok(status === 400 || status === 403 || status === 404, `${input}: ${status}`);
        }
        assert.equal(await (await request(contentUrl('中文__$.txt'))).text(), 'literal-path');
        assert.equal((await request('/api/v2/files?path=&sta=-1&end=2')).status, 400);
        for (const directory of ['$', '$$']) {
            const listed = await (await request(`/api/v2/files?${new URLSearchParams({ path: directory })}`)).json();
            assert.deepEqual(listed.list.map(item => item.name), ['literal.txt']);
        }
        assert.equal(await (await request(contentUrl('literal.jpg!32x24'))).text(), 'not-a-thumbnail-request');
    });
    await check('streaming and suffix Range', async () => {
        const response = await request(contentUrl('sample.txt'), { headers: { Range: 'bytes=-3' } });
        assert.equal(response.status, 206);
        assert.equal(response.headers.get('content-range'), 'bytes 7-9/10');
        assert.equal(await response.text(), '789');
        assert.equal((await request(contentUrl('sample.txt'), { headers: { Range: 'bytes=100-200' } })).status, 416);
    });
    await check('atomic uploads, conflict, rename and deletion', async () => {
        const form = text => {
            const data = new FormData();
            data.append('destPath', '');
            data.append('file', new Blob([text]), 'upload.txt');
            return data;
        };
        const responses = await Promise.all(['first', 'second'].map(text =>
            request('/upload', { method: 'POST', body: form(text) })));
        assert.deepEqual(responses.map(response => response.status).sort(), [200, 409]);
        assert.ok(['first', 'second'].includes(await fs.readFile(path.join(files, 'upload.txt'), 'utf8')));
        assert.equal((await request('/renameFile', {
            method: 'POST', json: { oldPath: 'upload.txt', newPath: 'renamed.txt' },
        })).status, 200);
        assert.equal((await request('/renameFile', {
            method: 'POST', json: { oldPath: 'renamed.txt', newPath: 'sample.txt' },
        })).status, 409);
        assert.ok([400, 403].includes((await request('/delFile', { method: 'POST', json: { filePath: '' } })).status));
        assert.equal((await request('/delFile', { method: 'POST', json: { filePath: 'renamed.txt' } })).status, 200);
        assert.ok(!(await fs.readdir(files)).some(name => name.startsWith('.fsupload-')));
    });
    await check('real image/video previews and cache reuse', async () => {
        execFileSync('vips', ['black', path.join(files, 'image.png'), '64', '48', '--bands', '3']);
        execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi',
            '-i', 'color=c=blue:s=64x48:d=2', '-c:v', 'mpeg4', '-y', path.join(files, 'video.mp4')]);
        for (const url of [previewUrl('image.png'), previewUrl('video.mp4', 'video')]) {
            const response = await request(url);
            assert.equal(response.status, 200, await response.clone().text());
            assert.match(response.headers.get('content-type'), /image\/jpeg/);
            const bytes = new Uint8Array(await response.arrayBuffer());
            assert.deepEqual([...bytes.slice(0, 2)], [255, 216]);
        }
        const responses = await Promise.all(Array.from({ length: 8 }, () => request(previewUrl('image.png'))));
        assert.ok(responses.every(response => response.status === 200));
        const status = await (await request('/api/admin/cache/stats?refresh=true')).json();
        assert.ok(status.totalFiles >= 2);
        const previousCount = status.totalFiles;
        execFileSync('vips', ['black', path.join(files, 'image.png'), '80', '60', '--bands', '3']);
        const updatedAt = new Date(Date.now() + 2000);
        await fs.utimes(path.join(files, 'image.png'), updatedAt, updatedAt);
        assert.equal((await request(previewUrl('image.png'))).status, 200);
        const updated = await (await request('/api/admin/cache/stats?refresh=true')).json();
        assert.ok(updated.totalFiles > previousCount, 'source replacement must use a new cache key');
        assert.equal((await request(previewUrl('image.png', 'image', 999999, 24))).status, 400);
    });
    await check('media resource and nested-playlist boundaries', async () => {
        await fs.writeFile(path.join(files, 'oversized.svg'),
            '<svg xmlns="http://www.w3.org/2000/svg" width="64000" height="64000"><rect width="100%" height="100%"/></svg>');
        assert.equal((await request(previewUrl('oversized.svg'))).status, 413, 'input pixel limit must reject before generation');
        let nestedRequests = 0;
        const trap = http.createServer((req, res) => {
            nestedRequests++;
            res.writeHead(500);
            res.end('nested resource access must not happen');
        });
        await new Promise(resolve => trap.listen(0, '127.0.0.1', resolve));
        try {
            await fs.writeFile(path.join(files, 'playlist.mp4'),
                `#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:2\n#EXT-X-MEDIA-SEQUENCE:0\n#EXTINF:2,\nhttp://127.0.0.1:${trap.address().port}/segment.ts\n#EXT-X-ENDLIST\n`);
            assert.equal((await request(previewUrl('playlist.mp4', 'video'))).status, 422);
            assert.equal(nestedRequests, 0, 'FFmpeg must not fetch playlist resources');
        } finally {
            await new Promise(resolve => trap.close(resolve));
        }
    });
    await check('planted preview-cache symlinks never reveal private credentials to file users', async () => {
        const image = path.join(files, 'cache-attack.png');
        const before = new Set(await fs.readdir(cache));
        execFileSync('vips', ['black', image, '32', '32', '--bands', '3']);
        assert.equal((await request(previewUrl('cache-attack.png'))).status, 200);
        const added = (await fs.readdir(cache)).filter(name => !before.has(name) && name.endsWith('.jpg'));
        assert.equal(added.length, 1, 'the fixture must identify exactly one generated cache entry');
        const output = path.join(cache, added[0]);
        const secretPath = path.join(data, 'auth.local.json');
        const secrets = await fs.readFile(secretPath);
        await stop();
        await fs.unlink(output);
        await fs.symlink(secretPath, output);
        // The link exists before startup, not merely during an open/read race.
        await launch();
        const response = await request(previewUrl('cache-attack.png'), {
            auth: false, headers: { 'X-File-Token': accessToken },
        });
        const bytes = Buffer.from(await response.arrayBuffer());
        assert.equal(response.status, 200, bytes.toString());
        assert.deepEqual([...bytes.subarray(0, 2)], [255, 216]);
        assert.ok(!bytes.includes(secrets), 'private credential JSON must never be served as a preview');
        assert.ok(!bytes.includes(Buffer.from(adminToken)) && !bytes.includes(Buffer.from(accessToken)));
        assert.equal((await fs.lstat(output)).isSymbolicLink(), false);
        assert.deepEqual(await fs.readFile(secretPath), secrets, 'regeneration must not modify the symlink target');
        session = (await login()).sessionToken;
    });
    await check('admin candidate roots obey the same isolation rules as startup', async () => {
        const certDir = path.join(sandbox, 'cert');
        const nestedCache = path.join(cache, 'candidate-root');
        await fs.mkdir(certDir, { recursive: true });
        await fs.mkdir(nestedCache, { recursive: true });
        await fs.writeFile(path.join(certDir, 'private.pem'), 'isolated-private-key-fixture');
        const current = await (await request('/api/admin/config')).json();
        for (const candidate of [certDir, nestedCache, data]) {
            const payload = { revision: current.revision, values: { rootPath: candidate } };
            for (const [url, method] of [
                ['/api/admin/config/validate', 'POST'], ['/api/admin/config', 'PUT'],
            ]) {
                const response = await request(url, { method, json: payload });
                assert.equal(response.status, 400, `${candidate}: ${await response.text()}`);
            }
        }
        const after = await (await request('/api/admin/config')).json();
        assert.equal(after.revision, current.revision, 'rejected candidates must never modify persisted config');
        await fs.rm(nestedCache, { recursive: true });
    });
    await check('real admin state, configuration revision and unsupported restart', async () => {
        const status = await (await request('/api/admin/status')).json();
        assert.equal(status.server.runtime, 'rust');
        assert.ok(status.bootId);
        assert.ok(status.queues);
        const configResponse = await request('/api/admin/config');
        assert.equal(configResponse.status, 200);
        const configuration = await configResponse.json();
        assert.ok(configuration.revision);
        assert.ok(Array.isArray(configuration.fields));
        const values = Object.fromEntries(configuration.fields.filter(field => !field.readonly)
            .map(field => [field.key, configuration.values[field.key]]));
        values.publicRead = !configuration.values.publicRead;
        const saved = await request('/api/admin/config', {
            method: 'PUT', json: { revision: configuration.revision, values },
        });
        assert.equal(saved.status, 200, await saved.clone().text());
        assert.equal((await request('/api/admin/config', {
            method: 'PUT', json: { revision: configuration.revision, values },
        })).status, 409);
        assert.equal((await request('/api/admin/restart', { method: 'POST', json: {} })).status, 409);
        const exported = await (await request('/api/admin/config/export')).text();
        assert.ok(!exported.includes(accessToken) && !exported.includes(adminToken));
    });
    await check('cache maintenance job and persisted audit', async () => {
        const response = await request('/api/admin/cache/jobs', { method: 'POST', json: { mode: 'all' } });
        assert.equal(response.status, 202, await response.clone().text());
        const { job } = await response.json();
        let finished;
        for (let attempt = 0; attempt < 100; attempt++) {
            finished = (await (await request(`/api/admin/jobs/${job.id}`)).json()).job;
            if (['succeeded', 'failed', 'interrupted'].includes(finished.status)) break;
            await sleep(100);
        }
        assert.equal(finished.status, 'succeeded', JSON.stringify(finished));
        assert.equal(await fs.readFile(path.join(files, 'sample.txt'), 'utf8'), '0123456789');
        const entries = await (await request('/api/admin/audit')).json();
        assert.ok(entries.entries.length > 0);
        const logs = await (await request('/api/admin/logs')).json();
        assert.ok(Array.isArray(logs.logs));
    });
    await check('restart persistence and old session invalidation', async () => {
        const before = (await (await request('/api/admin/status')).json()).bootId;
        await stop();
        await launch();
        assert.equal((await request('/api/auth/session')).status, 401);
        session = (await login()).sessionToken;
        const after = (await (await request('/api/admin/status')).json()).bootId;
        assert.notEqual(before, after);
        assert.ok((await (await request('/api/admin/audit')).json()).entries.length > 0);
        assert.ok((await (await request('/api/admin/jobs')).json()).jobs.length > 0);
        assert.ok((await (await request('/api/admin/cache/stats')).json()).lastCleanupAt,
            'the UI must not claim never cleaned after restarting a service with persisted cleanup history');
        assert.equal(await fs.readFile(path.join(files, 'sample.txt'), 'utf8'), '0123456789');
    });
    await check('supervised restart actually restores a new process', async () => {
        await stop();
        await launch(['supervise']);
        session = (await login()).sessionToken;
        const before = (await (await request('/api/admin/status')).json()).bootId;
        const accepted = await request('/api/admin/restart', { method: 'POST', json: {} });
        assert.equal(accepted.status, 202, await accepted.clone().text());
        let restored = false;
        for (let attempt = 0; attempt < 150; attempt++) {
            await sleep(100);
            try {
                const authResponse = await request('/api/auth/session');
                if (authResponse.status !== 401) continue;
                session = (await login()).sessionToken;
                const after = await (await request('/api/admin/status')).json();
                if (after.bootId !== before) { restored = true; break; }
            } catch {}
        }
        assert.ok(restored, 'restart acceptance alone is not proof of recovery');
    });
    console.log(`Rust acceptance: ${completed.length} groups passed.`);
} catch (error) {
    console.error(`Acceptance failed after ${completed.length} groups:\n${error.stack}\nServer output:\n${output}`);
    process.exitCode = 1;
} finally {
    await stop();
    await fs.rm(sandbox, { recursive: true, force: true });
}
