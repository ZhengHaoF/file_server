// Distribute a clean template, never the developer's live configuration or keys.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

function buildDistribution(root = __dirname, { archive = true } = {}) {
    const server = path.join(root, 'server');
    const dist = path.join(server, 'dist');
    for (const required of ['web/index.html', 'admin/dist/index.html']) {
        if (!fs.existsSync(path.join(server, required))) throw new Error(`缺少 ${required}，请先运行 npm run assemble`);
    }
    fs.rmSync(dist, { recursive: true, force: true });
    fs.mkdirSync(dist, { recursive: true });
    for (const name of ['index.js', 'app.js', 'configuration.js', 'clean.js', 'init.js', 'start.js',
        'sqllite.js', 'mime.json', '启动.bat', 'package-lock.json']) {
        fs.copyFileSync(path.join(server, name), path.join(dist, name));
    }
    for (const name of ['utils', 'middleware', 'routes', 'web', 'admin/dist']) {
        fs.cpSync(path.join(server, name), path.join(dist, name), { recursive: true });
    }
    const pkg = JSON.parse(fs.readFileSync(path.join(server, 'package.json'), 'utf8'));
    pkg.scripts = { start: 'node start.js', init: 'node init.js' };
    fs.writeFileSync(path.join(dist, 'package.json'), JSON.stringify(pkg, null, 2));
    const template = {
        rootPath: './files', imgCache: './imgCache', restartPwd: '', accessToken: '',
        publicRead: false, writeEnabled: false, uploadEnabled: false, uploadMaxSizeMB: 4096,
        host: '127.0.0.1', httpsEnabled: false, allowedOrigins: [],
    };
    fs.writeFileSync(path.join(dist, 'config.json'), JSON.stringify(template, null, 2));
    fs.mkdirSync(path.join(dist, 'files'));
    fs.mkdirSync(path.join(dist, 'imgCache'));
    if (!archive) return dist;
    const extension = process.platform === 'win32' ? 'zip' : 'tar.gz';
    const output = path.join(root, `file-serve-v${pkg.version}.${extension}`);
    const temp = path.join(root, `_pack-${Date.now()}.${extension}`);
    try {
        if (process.platform === 'win32') {
            const quote = value => `'${value.replace(/'/g, "''")}'`;
            execFileSync('powershell', ['-NoProfile', '-Command',
                `Compress-Archive -Path ${quote(path.join(dist, '*'))} -DestinationPath ${quote(temp)} -Force`], { stdio: 'inherit' });
        } else {
            execFileSync('tar', ['-czf', temp, '-C', dist, '.'], { stdio: 'inherit' });
        }
        // Do not discard the previous archive until the replacement is complete.
        if (process.platform === 'win32' && fs.existsSync(output)) fs.rmSync(output);
        fs.renameSync(temp, output);
    } finally { if (fs.existsSync(temp)) fs.rmSync(temp); }
    console.log(`[pack] 已生成 ${path.basename(output)}，不包含私有配置、令牌或证书密钥。`);
    return output;
}

if (require.main === module) {
    try { buildDistribution(); }
    catch (error) { console.error(`[pack] 失败: ${error.message}`); process.exitCode = 1; }
}
module.exports = { buildDistribution };
