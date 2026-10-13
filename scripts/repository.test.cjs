const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
test('only Rust backend entry points remain in the current source', () => {
    for (const retired of ['server/package.json', 'server/index.js', 'pack.js', 'docs/LEGACY_NODE.md']) {
        assert.equal(fs.existsSync(path.join(root, retired)), false, `retired entry remains: ${retired}`);
    }
    assert.ok(fs.existsSync(path.join(root, 'server-rust/Cargo.toml')));
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    assert.equal(pkg.scripts['dev:legacy'], undefined);
    assert.match(pkg.scripts['dev:server'], /server-rust\/Cargo\.toml/);
    assert.equal(pkg.scripts.pack, 'node scripts/pack-rust.cjs');
});
test('workspace and CI do not install or test the retired Node backend', () => {
    const workspace = fs.readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8');
    assert.doesNotMatch(workspace, /^\s*-\s*['"]?server['"]?\s*$/m);
    assert.doesNotMatch(workspace, /better-sqlite3|ffmpeg-static|images:|sharp:/);
    const ci = fs.readFileSync(path.join(root, '.github/workflows/test.yml'), 'utf8');
    assert.doesNotMatch(ci, /npm\s+--prefix\s+server(?:\s|$)/);
    assert.match(ci, /npm run check:rust/);
    assert.match(ci, /npm run test:repository/);
});
