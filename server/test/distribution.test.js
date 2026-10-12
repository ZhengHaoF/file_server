import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
const { buildDistribution } = createRequire(import.meta.url)('../../pack.js');

test('distribution fails on missing UI and excludes live configuration and private keys', async t => {
    const root = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'file-serve-pack-'));
    t.after(() => fs.promises.rm(root, { recursive: true, force: true }));
    const server = path.join(root, 'server');
    await fs.promises.mkdir(server);
    assert.throws(() => buildDistribution(root, { archive: false }), /缺少/);
    for (const dir of ['utils', 'middleware', 'routes', 'services', 'web', 'admin/dist', 'cert']) {
        await fs.promises.mkdir(path.join(server, dir), { recursive: true });
    }
    for (const file of ['index.js', 'app.js', 'configuration.js', 'clean.js', 'init.js', 'start.js',
        'sqllite.js', 'mime.json', '启动.bat', 'package-lock.json', 'web/index.html', 'admin/dist/index.html']) {
        await fs.promises.writeFile(path.join(server, file), 'fixture');
    }
    await fs.promises.writeFile(path.join(server, 'package.json'), JSON.stringify({ version: '1.0.0', dependencies: {} }));
    await fs.promises.writeFile(path.join(server, 'config.json'), JSON.stringify({ rootPath: '/private/data', restartPwd: 'real-secret', uploadEnabled: true }));
    await fs.promises.writeFile(path.join(server, 'auth.local.json'), 'real-secret');
    await fs.promises.writeFile(path.join(server, 'cert/private.pem'), 'private-key');
    const dist = buildDistribution(root, { archive: false });
    const config = JSON.parse(await fs.promises.readFile(path.join(dist, 'config.json'), 'utf8'));
    assert.equal(config.rootPath, './files');
    assert.equal(config.restartPwd, '');
    assert.equal(config.uploadEnabled, false);
    assert.equal(fs.existsSync(path.join(dist, 'auth.local.json')), false);
    assert.equal(fs.existsSync(path.join(dist, 'cert')), false);
    assert.equal(fs.existsSync(path.join(dist, 'admin/dist/index.html')), true);
});
