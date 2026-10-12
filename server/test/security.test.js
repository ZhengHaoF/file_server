import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpegStatic from 'ffmpeg-static';
import { WebSocket } from 'ws';
import { Sql } from '../sqllite.js';
import { createApp } from '../app.js';
import { normalizeConfig, loadConfig } from '../configuration.js';
import { validatePath, resolveSafePath, fixUploadFilename, publishFile } from '../utils/fileSafety.js';
import { parseImageSize, previewKey, WorkQueue } from '../utils/previews.js';
import { attachLogStream } from '../utils/logStream.js';

const FILE_TOKEN = 'test-file-token-at-least-32-chars';
const ADMIN_TOKEN = 'test-admin-token-at-least-32-chars';
const logger = { info() {}, warn() {}, error() {} };

async function fixture(overrides = {}) {
    const base = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'file-serve-test-'));
    const shared = path.join(base, 'files');
    const runtime = path.join(base, 'runtime');
    await fs.promises.mkdir(shared);
    await fs.promises.mkdir(runtime);
    const config = normalizeConfig({ rootPath: shared, imgCache: path.join(runtime, 'cache'),
        accessToken: FILE_TOKEN, restartPwd: ADMIN_TOKEN, writeEnabled: true, uploadEnabled: true,
        ...overrides }, runtime, {});
    const sql = new Sql(config.imgCache, path.join(runtime, 'cache.db'));
    const { app, auth, close: closeApp } = createApp(config, sql, logger, { staticDir: path.join(runtime, 'web'), adminDir: path.join(runtime, 'admin') });
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${server.address().port}`;
    const request = (route, { token = FILE_TOKEN, json, ...options } = {}) => fetch(url + route, {
        ...options,
        method: json ? 'POST' : options.method || 'GET',
        headers: { ...(token ? { 'X-File-Token': token } : {}), ...(json ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
        ...(json ? { body: JSON.stringify(json) } : {}),
    });
    return { base, shared, runtime, config, sql, server, auth, url, request,
        async close() {
            await closeApp();
            server.closeAllConnections();
            await new Promise(resolve => server.close(resolve));
            sql.close();
            await fs.promises.rm(base, { recursive: true, force: true });
        } };
}

test('safe path boundary handles POSIX, Windows and symlinks', async t => {
    const f = await fixture();
    t.after(() => f.close());
    assert.equal(validatePath('/share-backup/a', '/share'), false);
    assert.equal(validatePath('C:\\share-backup\\a', 'C:\\share', path.win32), false);
    assert.equal(validatePath('D:\\share\\a', 'C:\\share', path.win32), false);
    assert.equal(validatePath('/share/sub/a', '/share'), true);
    await fs.promises.symlink(f.runtime, path.join(f.shared, 'escape'), 'dir');
    assert.throws(() => resolveSafePath(f.shared, 'escape'), error => error.status === 403);
    for (const input of ['../files-backup/a', 'a/../../b', 'x\0y', 'C:\\Windows', '.fsupload-tmp']) {
        assert.throws(() => resolveSafePath(f.shared, input));
    }
    assert.throws(() => resolveSafePath(f.shared, '', { allowRoot: false }));
});

test('final upload filenames are validated after sanitizing', () => {
    for (const name of ['page.html ', 'page.HTML.', 'x.svg ', 'x.js', 'CON.txt', '.fsupload-evil', 'NUL', '']) {
        assert.throws(() => fixUploadFilename(name), name);
    }
    assert.equal(fixUploadFilename('图片.jpg'), '图片.jpg');
    assert.equal(fixUploadFilename('file?.txt'), 'file_.txt');
});

test('file publication never overwrites an existing destination', async t => {
    const f = await fixture();
    t.after(() => f.close());
    const temp = path.join(f.shared, 'temp');
    const final = path.join(f.shared, 'final');
    await fs.promises.writeFile(temp, 'new');
    await fs.promises.writeFile(final, 'old');
    await assert.rejects(publishFile(temp, final), error => error.status === 409);
    assert.equal(await fs.promises.readFile(final, 'utf8'), 'old');
});

test('all file endpoints reject anonymous callers', async t => {
    const f = await fixture();
    t.after(() => f.close());
    for (const route of ['/list/$', '/getFile/file.txt', '/getVideoPreview/video.mp4']) {
        assert.equal((await f.request(route, { token: null })).status, 401, route);
    }
    for (const route of ['/delFile', '/renameFile', '/upload']) {
        assert.equal((await f.request(route, { token: null, json: {} })).status, 401, route);
    }
    assert.equal((await f.request('/api/admin/config')).status, 401);
    assert.equal((await f.request('/cleanOldData/0')).status, 401);
});

test('write and upload switches are off by default; publicRead never grants write', async t => {
    const f = await fixture({ writeEnabled: false, uploadEnabled: false, publicRead: true });
    t.after(() => f.close());
    assert.equal((await f.request('/list/$', { token: null })).status, 200);
    assert.equal((await f.request('/delFile', { json: { filePath: 'x' } })).status, 403);
    assert.equal((await f.request('/upload', { json: {} })).status, 403);
});

test('sessions, cookies, read-only tickets, logout and login throttling', async t => {
    const f = await fixture();
    t.after(() => f.close());
    const login = await f.request('/api/auth/login', { token: null, json: { token: FILE_TOKEN } });
    assert.equal(login.status, 200);
    assert.match(login.headers.get('set-cookie'), /HttpOnly/i);
    assert.match(login.headers.get('set-cookie'), /SameSite=Strict/i);
    const session = await login.json();
    const headers = { Authorization: `Bearer ${session.sessionToken}` };
    assert.equal((await f.request('/api/auth/logout', { token: null, json: {} })).status, 401);
    assert.equal((await f.request('/list/$', { token: null, headers })).status, 200);
    assert.equal((await f.request(`/list/$?ticket=${session.readTicket}`, { token: null })).status, 200);
    assert.equal((await f.request(`/delFile?ticket=${session.readTicket}`, { token: null, json: { filePath: 'x' } })).status, 401);
    assert.equal((await f.request('/api/admin/config', { token: null, headers })).status, 401);
    const renewal = await f.request('/api/auth/ticket', { token: null, headers, json: {} });
    const ticket = (await renewal.json()).readTicket;
    await f.request('/api/auth/logout', { token: null, headers, json: {} });
    assert.equal((await f.request(`/list/$?ticket=${ticket}`, { token: null })).status, 401);
    assert.equal((await f.request('/list/$', { token: null, headers })).status, 401);
    for (let attempt = 0; attempt < 10; attempt++) {
        assert.equal((await f.request('/api/auth/login', { token: null, json: { token: 'wrong' } })).status, 401);
    }
    assert.equal((await f.request('/api/auth/login', { token: null, json: { token: FILE_TOKEN } })).status, 429);
});

test('cross-site writes and logins are rejected; configuration is redacted', async t => {
    const f = await fixture();
    t.after(() => f.close());
    assert.equal((await f.request('/delFile', { json: { filePath: 'x' }, headers: { Origin: 'https://evil.example' } })).status, 403);
    assert.equal((await f.request('/api/auth/login', { json: { token: FILE_TOKEN }, headers: { Origin: 'https://evil.example' } })).status, 403);
    const response = await f.request('/api/admin/config', { headers: { 'X-Admin-Token': ADMIN_TOKEN } });
    const body = await response.json();
    assert.equal(body.accessToken, '******');
    assert.equal(body.restartPwd, '******');
});

test('list paginates before metadata reads, preserves literal names, tolerates broken links', async t => {
    const f = await fixture();
    t.after(() => f.close());
    for (const name of ['a__b', 'cost$2026', '图片 #100%.txt']) await fs.promises.writeFile(path.join(f.shared, name), 'x');
    await fs.promises.symlink('/missing-test-target', path.join(f.shared, 'broken'));
    const response = await f.request('/list/$?sta=0&end=2');
    const first = await response.json();
    assert.equal(response.status, 200);
    assert.equal(first.listNum, 3);
    assert.equal(first.list.length, 2);
    assert.equal(first.nextStart, 2);
    assert.equal(first.list[0].name, 'a__b');
    assert.equal((await f.request('/list/$?sta=-1&end=2')).status, 400);
    assert.equal((await f.request('/list/a__b')).status, 400);
    assert.equal((await f.request('/list/no-such-directory')).status, 404);
    assert.equal((await f.request('/getFile/' + encodeURIComponent('图片 #100%.txt'))).status, 200);
});

test('delete and rename block root, siblings, symlinks and executable targets', async t => {
    const f = await fixture();
    t.after(() => f.close());
    const sibling = path.join(f.base, 'files-backup');
    await fs.promises.mkdir(sibling);
    await fs.promises.writeFile(path.join(sibling, 'victim'), 'keep');
    await fs.promises.writeFile(path.join(f.shared, 'old.txt'), 'keep too');
    for (const filePath of ['/', '../files-backup/victim']) {
        assert.equal((await f.request('/delFile', { json: { filePath } })).status, 403);
    }
    assert.equal(await fs.promises.readFile(path.join(sibling, 'victim'), 'utf8'), 'keep');
    assert.equal((await f.request('/renameFile', { json: { oldPath: 'old.txt', newPath: 'page.html' } })).status, 400);
    const responses = await Promise.all(['a', 'b'].map(async name => {
        await fs.promises.writeFile(path.join(f.shared, `${name}.txt`), name);
        return f.request('/renameFile', { json: { oldPath: `${name}.txt`, newPath: 'final.txt' } });
    }));
    assert.deepEqual(responses.map(response => response.status).sort(), [200, 409]);
});

function uploadForm(name, content = 'data', destination = '') {
    const body = new FormData();
    body.append('destPath', destination);
    body.append('file', new Blob([content]), name);
    return body;
}

test('multipart upload validates final names, field order, size and concurrent conflicts', async t => {
    const f = await fixture({ uploadMaxSizeMB: 0.001 });
    t.after(() => f.close());
    assert.equal((await f.request('/upload', { method: 'POST', body: uploadForm('page.html ') })).status, 400);
    const wrongOrder = new FormData();
    wrongOrder.append('file', new Blob(['x']), 'x.txt');
    wrongOrder.append('destPath', '');
    assert.equal((await f.request('/upload', { method: 'POST', body: wrongOrder })).status, 400);
    assert.equal((await f.request('/upload', { method: 'POST', body: uploadForm('large.txt', 'x'.repeat(4096)) })).status, 413);
    assert.equal((await f.request('/upload', { method: 'POST', body: uploadForm('图片.txt') })).status, 200);
    const uploads = await Promise.all(['one', 'two'].map(content => f.request('/upload', { method: 'POST', body: uploadForm('same.txt', content) })));
    assert.deepEqual(uploads.map(response => response.status).sort(), [200, 409]);
    const listed = (await (await f.request('/list/$')).json()).list;
    assert.equal(listed.some(item => item.name.startsWith('.fsupload-')), false);
});

test('download implements suffix ranges and disables active inline content', async t => {
    const f = await fixture();
    t.after(() => f.close());
    await fs.promises.writeFile(path.join(f.shared, 'sample.txt'), '0123456789');
    await fs.promises.writeFile(path.join(f.shared, 'page.html'), '<script>alert(1)</script>');
    const response = await f.request('/getFile/sample.txt', { headers: { Range: 'bytes=-3' } });
    assert.equal(response.status, 206);
    assert.equal(await response.text(), '789');
    assert.equal(response.headers.get('content-range'), 'bytes 7-9/10');
    assert.equal((await f.request('/getFile/sample.txt', { headers: { Range: 'bytes=100-200' } })).status, 416);
    const active = await f.request('/getFile/page.html');
    assert.match(active.headers.get('content-disposition'), /^attachment/);
    assert.equal(active.headers.get('x-content-type-options'), 'nosniff');
    assert.match(active.headers.get('content-security-policy'), /sandbox/);
});

test('thumbnail dimensions and source metadata affect cache key', () => {
    assert.throws(() => parseImageSize('abc'));
    assert.throws(() => parseImageSize('5000x5000'));
    assert.throws(() => parseImageSize('-1x100'));
    assert.deepEqual(parseImageSize('320x240'), { width: 320, height: 240 });
    assert.notEqual(previewKey('photo', { size: 1, mtimeMs: 1 }, 'image:100x100'),
        previewKey('photo', { size: 1, mtimeMs: 2 }, 'image:100x100'));
});

test('fresh database initializes, thumbnail writes JPEG atomically and invalidates modified sources', async t => {
    const f = await fixture();
    t.after(() => f.close());
    const file = path.join(f.shared, 'photo.png');
    const writeImage = color => sharp({ create: { width: 100, height: 100, channels: 3, background: color } }).png().toFile(file);
    await writeImage('red');
    const results = await Promise.all(Array.from({ length: 8 }, () => f.request('/getFile/photo.png!40x40')));
    assert.equal(results.every(response => response.status === 200), true);
    assert.equal(results[0].headers.get('content-type'), 'image/jpeg');
    assert.equal(f.sql.getCount(), 1);
    const first = Buffer.from(await results[0].arrayBuffer());
    assert.equal((await sharp(first).metadata()).format, 'jpeg');
    await writeImage('blue');
    const second = Buffer.from(await (await f.request('/getFile/photo.png!40x40')).arrayBuffer());
    assert.notDeepEqual(first, second);
    assert.equal(f.sql.getCount(), 2);
    assert.equal((await f.request('/getFile/photo.png!abc')).status, 400);
    const entries = await fs.promises.readdir(f.config.imgCache);
    assert.equal(entries.some(entry => entry.startsWith('.preview-')), false);
    assert.equal(entries.every(entry => entry.endsWith('.jpg')), true);
});

test('work queue limits concurrency and rejects excess pending tasks', async () => {
    const queue = new WorkQueue(1, 1);
    let release;
    const active = queue.run(() => new Promise(resolve => { release = resolve; }));
    await Promise.resolve();
    const pending = queue.run(() => 'second');
    await assert.rejects(queue.run(() => 'third'), error => error.status === 429);
    release('first');
    assert.equal(await active, 'first');
    assert.equal(await pending, 'second');
});

test('video thumbnail has a single unique output filename and cleans its temporary file', async t => {
    const f = await fixture();
    t.after(() => f.close());
    const video = path.join(f.shared, 'video.mp4');
    const generated = spawnSync(ffmpegStatic, ['-y', '-f', 'lavfi', '-i', 'color=c=red:s=320x240:d=2',
        '-c:v', 'mpeg4', video], { encoding: 'utf8' });
    assert.equal(generated.status, 0, generated.stderr);
    const response = await f.request('/getVideoPreview/video.mp4');
    assert.equal(response.status, 200);
    assert.equal((await sharp(Buffer.from(await response.arrayBuffer())).metadata()).format, 'jpeg');
    assert.equal((await fs.promises.readdir(f.config.imgCache)).some(name => name.startsWith('.preview-')), false);
});

test('admin cleanup uses last access instead of file mtime and rejects invalid days', async t => {
    const f = await fixture();
    t.after(() => f.close());
    const key = 'a'.repeat(64);
    const cache = path.join(f.config.imgCache, `${key}.jpg`);
    await fs.promises.writeFile(cache, 'cached');
    await fs.promises.utimes(cache, new Date(0), new Date(0));
    f.sql.insertInfo(key, '.jpg');
    const options = { token: null, headers: { 'X-Admin-Token': ADMIN_TOKEN } };
    assert.equal((await f.request('/api/admin/cache/clean', { ...options, json: { days: -1 } })).status, 400);
    assert.equal((await f.request('/api/admin/cache/clean', { ...options, json: { days: 7 } })).status, 200);
    assert.equal(fs.existsSync(cache), true);
    assert.equal((await f.request('/cleanOldData/0', options)).status, 405);
    assert.equal((await f.request('/api/admin/cache/clean', { ...options, json: { all: true } })).status, 200);
    assert.equal(fs.existsSync(cache), false);
    assert.equal(f.sql.getCount(), 0);
});

test('configuration guards filesystem roots, source exposure and insecure credentials', async t => {
    const f = await fixture();
    t.after(() => f.close());
    assert.throws(() => normalizeConfig({ rootPath: '/', imgCache: f.config.imgCache }, f.runtime, {}));
    assert.throws(() => normalizeConfig({ rootPath: f.base, imgCache: f.config.imgCache }, f.runtime, {}));
    await fs.promises.writeFile(path.join(f.runtime, 'config.json'), JSON.stringify({
        rootPath: f.shared, restartPwd: '123456', imgCache: f.config.imgCache,
    }));
    const config = loadConfig(f.runtime);
    assert.equal(config.restartPwd.length, 64);
    assert.notEqual(config.accessToken, config.restartPwd);
    assert.equal(loadConfig(f.runtime).restartPwd, config.restartPwd);
    await fs.promises.writeFile(path.join(f.runtime, 'auth.local.json'), JSON.stringify({ restartPwd: config.restartPwd }));
    const repaired = loadConfig(f.runtime);
    assert.equal(loadConfig(f.runtime).accessToken, repaired.accessToken);
    assert.equal(repaired.restartPwd, config.restartPwd);
    assert.equal(config.writeEnabled, false);
    assert.equal(config.uploadEnabled, false);
    if (process.platform !== 'win32') assert.equal(fs.statSync(path.join(f.runtime, 'auth.local.json')).mode & 0o777, 0o600);
});

test('WebSocket accepts admin sessions without URL passwords and rejects file sessions', async t => {
    const f = await fixture();
    t.after(() => f.close());
    attachLogStream(f.server, f.auth, f.config, logger);
    const connect = headers => new Promise((resolve, reject) => {
        const ws = new WebSocket(f.url.replace('http:', 'ws:') + '/api/admin/logs/stream', { headers });
        ws.on('open', () => { ws.close(); resolve(true); });
        ws.on('unexpected-response', (request, response) => { response.resume(); ws.terminate(); resolve(response.statusCode); });
        ws.on('error', () => {});
    });
    assert.equal(await connect({ 'X-File-Token': FILE_TOKEN }), 401);
    assert.equal(await connect({ 'X-Admin-Token': ADMIN_TOKEN }), true);
    const login = await f.request('/api/auth/login', { token: null, json: { token: ADMIN_TOKEN } });
    const cookie = login.headers.get('set-cookie').split(';')[0];
    assert.equal(await connect({ Cookie: cookie }), true);
});

test('HTTPS log streaming uses the same authenticated upgrade handler', async t => {
    const f = await fixture();
    t.after(() => f.close());
    const key = path.join(f.runtime, 'test-key.pem');
    const cert = path.join(f.runtime, 'test-cert.pem');
    const generated = spawnSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes',
        '-keyout', key, '-out', cert, '-days', '1', '-subj', '/CN=localhost'], { encoding: 'utf8' });
    assert.equal(generated.status, 0, generated.stderr);
    const server = https.createServer({ key: fs.readFileSync(key), cert: fs.readFileSync(cert) });
    attachLogStream(server, f.auth, f.config, logger);
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const connected = await new Promise((resolve, reject) => {
        const ws = new WebSocket(`wss://127.0.0.1:${server.address().port}/api/admin/logs/stream`, {
            rejectUnauthorized: false, headers: { 'X-Admin-Token': ADMIN_TOKEN },
        });
        ws.on('open', () => { ws.close(); resolve(true); });
        ws.on('error', reject);
    });
    assert.equal(connected, true);
    await new Promise(resolve => server.close(resolve));
});
