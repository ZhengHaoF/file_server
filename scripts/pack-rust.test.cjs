const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { buildDistribution } = require('./pack-rust.cjs');

function fixture(t) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rust-pack-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    const executable = process.platform === 'win32' ? 'file-server.exe' : 'file-server';
    for (const name of ['static/web', 'static/admin', 'target/release', 'data', 'files']) {
        fs.mkdirSync(path.join(root, 'server-rust', name), { recursive: true });
    }
    for (const name of ['static/web/index.html', 'static/admin/index.html', `target/release/${executable}`,
        'README.md', 'data/auth.local.json', 'data/service.sqlite', 'files/private-photo.jpg']) {
        fs.writeFileSync(path.join(root, 'server-rust', name), 'fixture');
    }
    return root;
}

test('fails before replacing output if binary or frontend is missing', t => {
    const root = fixture(t);
    fs.rmSync(path.join(root, 'server-rust/static/admin/index.html'));
    assert.throws(() => buildDistribution(root, { archive: false }), /缺少/);
    assert.equal(fs.existsSync(path.join(root, 'dist')), false);
});

test('allow-list excludes runtime secrets, database and user files', t => {
    const root = fixture(t);
    const executable = process.platform === 'win32' ? 'file-server.exe' : 'file-server';
    const starter = process.platform === 'win32' ? '启动.bat' : 'start.sh';
    const dist = buildDistribution(root, { archive: false });
    assert.deepEqual(fs.readdirSync(dist).sort(), ['README.md', executable, 'files', starter, 'static'].sort());
    assert.equal(fs.readdirSync(path.join(dist, 'files')).length, 0);
    assert.equal(fs.readFileSync(path.join(dist, 'static/admin/index.html'), 'utf8'), 'fixture');
    assert.equal(fs.existsSync(path.join(dist, 'data')), false);
});

test('refuses symlinks and accidentally included private static files', t => {
    const root = fixture(t);
    fs.symlinkSync(path.join(root, 'server-rust/data/auth.local.json'),
        path.join(root, 'server-rust/static/admin/credential.json'));
    assert.throws(() => buildDistribution(root, { archive: false }), /软链接/);
    fs.rmSync(path.join(root, 'server-rust/static/admin/credential.json'));
    fs.writeFileSync(path.join(root, 'server-rust/static/admin/auth.local.json'), 'secret');
    assert.throws(() => buildDistribution(root, { archive: false }), /私有文件/);
});

test('regenerates safe configuration rather than copying developer secrets', t => {
    const root = fixture(t);
    fs.writeFileSync(path.join(root, 'server-rust/config.json'), JSON.stringify({
        rootPath: '/private/photos', accessToken: 'real-secret', writeEnabled: true,
    }));
    const dist = buildDistribution(root, { archive: false });
    const configuration = JSON.parse(fs.readFileSync(path.join(dist, 'config.json'), 'utf8'));
    assert.equal(configuration.rootPath, './files');
    assert.equal(configuration.writeEnabled, false);
    assert.equal('accessToken' in configuration, false);
});

test('rejects database sidecars, SQLite aliases and runtime logs in static assets', t => {
    const root = fixture(t);
    for (const name of ['cache.db-wal', 'cache.db-shm', 'cache.db-journal', 'cache.sqlite3',
        'cache.sqlite3-wal', 'cache.sqlite-shm', 'app.log']) {
        const location = path.join(root, 'server-rust/static/admin', name);
        fs.writeFileSync(location, 'private-state');
        assert.throws(() => buildDistribution(root, { archive: false }), /私有文件/, name);
        fs.rmSync(location);
    }
    fs.writeFileSync(path.join(root, 'server-rust/static/admin/unexpected.bin'), 'SQLite format 3\0private-data');
    assert.throws(() => buildDistribution(root, { archive: false }), /SQLite 数据库/);
});

const toolSuffix = process.platform === 'win32' ? '.exe' : '';

function stageTools(t, root, platform = process.platform) {
    const suffix = platform === 'win32' ? '.exe' : '';
    const tools = path.join(root, 'server-rust', 'tools', `${platform}-${process.arch}`);
    fs.mkdirSync(path.join(tools, 'lib'), { recursive: true });
    for (const name of ['vips', 'vipsheader', 'ffmpeg']) {
        fs.writeFileSync(path.join(tools, `${name}${suffix}`), `tool:${name}`);
    }
    fs.writeFileSync(path.join(tools, 'lib', 'glib.dll'), 'dll');
    return tools;
}

test('bundles staged media tools as a flat tools directory', t => {
    const root = fixture(t);
    const executable = process.platform === 'win32' ? 'file-server.exe' : 'file-server';
    const starter = process.platform === 'win32' ? '启动.bat' : 'start.sh';
    stageTools(t, root);
    const dist = buildDistribution(root, { archive: false });
    assert.deepEqual(fs.readdirSync(dist).sort(),
        ['README.md', executable, 'files', starter, 'static', 'tools'].sort());
    for (const name of ['vips', 'vipsheader', 'ffmpeg']) {
        assert.equal(fs.readFileSync(path.join(dist, 'tools', `${name}${toolSuffix}`), 'utf8'), `tool:${name}`);
    }
    assert.equal(fs.readFileSync(path.join(dist, 'tools', 'lib', 'glib.dll'), 'utf8'), 'dll');
    assert.equal(fs.existsSync(path.join(dist, 'tools', 'auth.local.json')), false);
});

test('tools directory is optional and incomplete staging fails', t => {
    const root = fixture(t);
    // No staging directory: package without tools keeps the old layout.
    const dist = buildDistribution(root, { archive: false });
    assert.equal(fs.existsSync(path.join(dist, 'tools')), false);
    // Incomplete staging fails before replacing the previous output.
    stageTools(t, root);
    fs.rmSync(path.join(root, 'server-rust', 'tools', `${process.platform}-${process.arch}`, `ffmpeg${toolSuffix}`));
    assert.throws(() => buildDistribution(root, { archive: false }), /媒体工具目录缺少 ffmpeg/);
    assert.equal(fs.existsSync(path.join(dist, 'tools')), false);
    assert.equal(fs.existsSync(path.join(dist, 'static/web/index.html')), true);
});

test('refuses symlinked media tools', t => {
    const root = fixture(t);
    const tools = stageTools(t, root);
    const target = path.join(root, 'server-rust/data/auth.local.json');
    const linked = path.join(tools, `vipsheader${toolSuffix}`);
    fs.rmSync(linked);
    fs.symlinkSync(target, linked);
    assert.throws(() => buildDistribution(root, { archive: false }), /软链接/);
});
