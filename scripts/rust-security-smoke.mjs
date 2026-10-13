// Startup boundary regressions from the independent review, using no user data.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const executable = process.env.RUST_SERVER_BINARY
    || path.join(root, 'server-rust/target/debug', process.platform === 'win32' ? 'file-server.exe' : 'file-server');
let completed = 0;
async function fixture(run) {
    const base = await fs.mkdtemp(path.join(os.tmpdir(), 'rust-startup-security-'));
    try {
        for (const directory of ['files', 'data', 'cache', 'static/web', 'static/admin', 'cert']) {
            await fs.mkdir(path.join(base, directory), { recursive: true, mode: 0o755 });
        }
        const values = {
            rootPath: './files', dataPath: './data', imgCache: './cache', staticDir: './static',
            host: '127.0.0.1', port: 0, httpsEnabled: false, publicRead: false,
        };
        await run(base, values);
    } finally {
        await fs.rm(base, { recursive: true, force: true });
    }
}
async function rejected(base, values, args = [], expectedCode) {
    const config = path.join(base, 'config.json');
    await fs.writeFile(config, JSON.stringify(values));
    const child = spawn(executable, [...args, '--config', config], {
        detached: process.platform !== 'win32',
        cwd: base, env: {
            PATH: process.env.PATH, HOME: process.env.HOME, SYSTEMROOT: process.env.SYSTEMROOT,
        },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    child.stdout.on('data', chunk => { output += chunk.toString(); });
    child.stderr.on('data', chunk => { output += chunk.toString(); });
    let timedOut = false;
    const timer = setTimeout(() => {
        timedOut = true;
        try {
            if (process.platform !== 'win32') process.kill(-child.pid, 'SIGKILL');
            else child.kill('SIGKILL');
        } catch (error) { if (error.code !== 'ESRCH') throw error; }
    }, 20000);
    const status = await new Promise((resolve, reject) => {
        child.once('error', reject);
        child.once('exit', (code, signal) => resolve({ code, signal }));
    }).finally(() => clearTimeout(timer));
    assert.equal(timedOut, false, `startup did not reject and finish within 20 seconds: ${output}`);
    assert.notEqual(status.code, 0, `unsafe configuration passed: ${output}`);
    if (expectedCode !== undefined) assert.equal(status.code, expectedCode, output);
}
async function check(name, run) {
    await fixture(run);
    completed++;
    console.log(`PASS ${name}`);
}
try {
    await check('private log symlink never publishes into static assets', async (base, values) => {
        await fs.symlink(path.join(base, 'static/web'), path.join(base, 'data/logs'));
        await rejected(base, values);
        assert.equal((await fs.readdir(path.join(base, 'static/web'))).length, 0);
    });
    await check('private database symlink never opens a public target', async (base, values) => {
        const target = path.join(base, 'static/web/leaked.db');
        // Empty files are valid SQLite creation targets; a text marker would
        // incorrectly pass because SQLite rejects it before exercising the leak.
        await fs.writeFile(target, Buffer.alloc(0));
        await fs.symlink(target, path.join(base, 'data/imgCache.db'));
        await rejected(base, values);
        assert.equal((await fs.readFile(target)).length, 0);
        assert.deepEqual(await fs.readdir(path.join(base, 'static/web')), ['leaked.db']);
    });
    await check('TLS private keys inside shared files are refused during configuration checks', async (base, values) => {
        values.httpsEnabled = true;
        values.keyPath = './files/server-key.txt';
        await fs.writeFile(path.join(base, 'files/server-key.txt'), 'private-key-fixture');
        await rejected(base, values, ['check-config']);
        assert.equal(await fs.readFile(path.join(base, 'files/server-key.txt'), 'utf8'), 'private-key-fixture');
    });
    await check('rejected cache aliases do not chmod the shared directory', async (base, values) => {
        if (process.platform !== 'win32') await fs.chmod(path.join(base, 'files'), 0o755);
        await fs.symlink(path.join(base, 'files'), path.join(base, 'cache-alias'));
        values.imgCache = './cache-alias';
        await rejected(base, values, ['check-config']);
        if (process.platform !== 'win32') assert.equal((await fs.stat(path.join(base, 'files'))).mode & 0o777, 0o755);
    });
    await check('missing static directories cannot conceal an existing symlink ancestor', async (base, values) => {
        await fs.symlink(path.join(base, 'files'), path.join(base, 'static-alias'));
        values.staticDir = './static-alias/not-created-yet';
        await rejected(base, values, ['check-config']);
        assert.deepEqual(await fs.readdir(path.join(base, 'files')), []);
    });
    await check('private data cannot chmod an ancestor of shared or static directories', async (base, values) => {
        if (process.platform !== 'win32') await fs.chmod(base, 0o755);
        values.dataPath = '.';
        await rejected(base, values, ['check-config']);
        if (process.platform !== 'win32') assert.equal((await fs.stat(base)).mode & 0o777, 0o755);
    });
    await check('invalid enabled TLS fails closed and supervise does not restart forever', async (base, values) => {
        values.httpsEnabled = true;
        values.httpsPort = 0;
        await fs.writeFile(path.join(base, 'cert/file.crt'), 'not-a-certificate');
        await fs.writeFile(path.join(base, 'cert/private.pem'), 'not-a-private-key');
        await rejected(base, values, [], 78);
        await rejected(base, values, ['supervise'], 78);
    });
    console.log(`Rust startup security: ${completed} groups passed.`);
} catch (error) {
    console.error(`Startup security failed after ${completed} groups:\n${error.stack}`);
    process.exitCode = 1;
}
