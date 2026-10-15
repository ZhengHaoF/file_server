// Explicit allow-list distribution. Runtime state is never copied.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

function copyStatic(source, destination) {
    const stat = fs.lstatSync(source);
    if (stat.isSymbolicLink()) throw new Error(`静态资源不能包含软链接: ${source}`);
    if (stat.isDirectory()) {
        fs.mkdirSync(destination, { recursive: true });
        for (const name of fs.readdirSync(source)) {
            if (name.startsWith('.') || /\.(?:local\.json|pem|key|log|db(?:-(?:wal|shm|journal))?|sqlite\d*(?:-(?:wal|shm|journal))?)$/i.test(name)) {
                throw new Error(`静态资源含有私有文件: ${name}`);
            }
            copyStatic(path.join(source, name), path.join(destination, name));
        }
    } else if (stat.isFile()) {
        const descriptor = fs.openSync(source, 'r');
        try {
            const signature = Buffer.alloc(16);
            const read = fs.readSync(descriptor, signature, 0, signature.length, 0);
            if (read === 16 && signature.equals(Buffer.from('SQLite format 3\0'))) {
                throw new Error(`静态资源含有 SQLite 数据库: ${source}`);
            }
        } finally {
            fs.closeSync(descriptor);
        }
        fs.copyFileSync(source, destination);
    } else {
        throw new Error(`静态资源不是普通文件: ${source}`);
    }
}

// Media CLI tools staged under server-rust/tools/<platform>-<arch> ship as a
// flat tools/ directory next to the executable; the server resolves them from
// there before PATH. Symlinks and non-regular files are refused, matching the
// static-asset rules. Missing staging directory = package without tools.
function copyTools(source, destination) {
    const stat = fs.lstatSync(source);
    if (stat.isSymbolicLink()) throw new Error(`媒体工具不能包含软链接: ${source}`);
    if (stat.isDirectory()) {
        fs.mkdirSync(destination, { recursive: true });
        for (const name of fs.readdirSync(source)) {
            copyTools(path.join(source, name), path.join(destination, name));
        }
    } else if (stat.isFile()) {
        fs.copyFileSync(source, destination);
    } else {
        throw new Error(`媒体工具不是普通文件: ${source}`);
    }
}

function buildDistribution(root = path.resolve(__dirname, '..'), {
    archive = true,
    platform = process.platform,
    architecture = process.arch,
    binaryPath,
    toolsDir,
} = {}) {
    const server = path.join(root, 'server-rust');
    const executable = platform === 'win32' ? 'file-server.exe' : 'file-server';
    const binary = binaryPath || path.join(server, 'target', 'release', executable);
    for (const required of [binary, path.join(server, 'static/admin/index.html'), path.join(server, 'README.md')]) {
        if (!fs.existsSync(required)) throw new Error(`缺少 ${required}，请先构建前端和 Rust release`);
    }
    if (!fs.lstatSync(binary).isFile() || fs.lstatSync(binary).isSymbolicLink()) {
        throw new Error('Rust 可执行文件必须是普通文件');
    }
    // Optional bundled media tools: flat layout expected (vips/ffmpeg + DLLs).
    const toolsSource = toolsDir || path.join(server, 'tools', `${platform}-${architecture}`);
    const toolsBundled = fs.existsSync(toolsSource);
    if (toolsBundled) {
        const suffix = platform === 'win32' ? '.exe' : '';
        for (const name of ['vips', 'vipsheader', 'ffmpeg']) {
            const tool = path.join(toolsSource, `${name}${suffix}`);
            if (!fs.existsSync(tool)) {
                throw new Error(`媒体工具目录缺少 ${path.basename(tool)}，请平铺暂存到 server-rust/tools/${platform}-${architecture}/`);
            }
        }
    }
    const dist = path.join(root, 'dist', `file-serve-rust-${platform}-${architecture}`);
    const temporary = `${dist}.tmp-${process.pid}`;
    fs.rmSync(temporary, { recursive: true, force: true });
    try {
        fs.mkdirSync(temporary, { recursive: true });
        fs.copyFileSync(binary, path.join(temporary, executable));
        if (platform !== 'win32') fs.chmodSync(path.join(temporary, executable), 0o755);
        if (toolsBundled) copyTools(toolsSource, path.join(temporary, 'tools'));
        copyStatic(path.join(server, 'static'), path.join(temporary, 'static'));
        const readme = fs.readFileSync(path.join(server, 'README.md'), 'utf8');
        fs.writeFileSync(path.join(temporary, 'README.md'),
            readme.replaceAll('../shared/RUST_API.md', './docs/RUST_API.md'));
        const apiContract = path.join(root, 'shared', 'RUST_API.md');
        if (fs.existsSync(apiContract)) {
            fs.mkdirSync(path.join(temporary, 'docs'));
            fs.copyFileSync(apiContract, path.join(temporary, 'docs', 'RUST_API.md'));
        }
        const template = path.join(server, 'config.json');
        if (fs.existsSync(template)) {
            // Never distribute a developer-edited configuration: only safe defaults.
            fs.writeFileSync(path.join(temporary, 'config.json'), JSON.stringify({
                rootPath: './files', dataPath: './data', imgCache: './data/cache',
                staticDir: './static', host: '127.0.0.1', port: 3000,
                publicRead: false, writeEnabled: false, uploadEnabled: false,
                httpsEnabled: false, allowedOrigins: [], secureCookies: false,
            }, null, 2));
        }
        const migration = path.join(root, 'docs', 'RUST_MIGRATION.md');
        if (fs.existsSync(migration)) fs.copyFileSync(migration, path.join(temporary, 'MIGRATION.md'));
        fs.mkdirSync(path.join(temporary, 'files'));
        if (platform === 'win32') {
            fs.writeFileSync(path.join(temporary, '启动.bat'),
                '@echo off\r\ncd /d "%~dp0"\r\nfile-server.exe\r\npause\r\n');
        } else {
            fs.writeFileSync(path.join(temporary, 'start.sh'),
                '#!/bin/sh\nset -eu\ncd "$(dirname "$0")"\nexec ./file-server\n', { mode: 0o755 });
        }
        fs.rmSync(dist, { recursive: true, force: true });
        fs.renameSync(temporary, dist);
    } finally {
        fs.rmSync(temporary, { recursive: true, force: true });
    }
    if (!archive) return dist;
    const extension = platform === 'win32' ? 'zip' : 'tar.gz';
    const output = `${dist}.${extension}`;
    const archiveTemporary = `${dist}.tmp-${process.pid}.${extension}`;
    try {
        if (platform === 'win32') {
            const quote = value => `'${value.replace(/'/g, "''")}'`;
            execFileSync('powershell', ['-NoProfile', '-Command',
                `Compress-Archive -Path ${quote(path.join(dist, '*'))} -DestinationPath ${quote(archiveTemporary)} -Force`],
            { stdio: 'inherit' });
        } else {
            execFileSync('tar', ['-czf', archiveTemporary, '-C', dist, '.'], { stdio: 'inherit' });
        }
        if (platform === 'win32' && fs.existsSync(output)) fs.rmSync(output);
        fs.renameSync(archiveTemporary, output);
    } finally {
        if (fs.existsSync(archiveTemporary)) fs.rmSync(archiveTemporary);
    }
    console.log(`[pack:rust] ${output}; ${toolsBundled
        ? '已附带媒体工具 (tools/)，目标机器无需安装 libvips CLI 与 FFmpeg。'
        : '媒体预览需要目标机安装 libvips CLI 与 FFmpeg。'}`);
    return output;
}

if (require.main === module) {
    try { buildDistribution(); }
    catch (error) { console.error(`[pack:rust] ${error.message}`); process.exitCode = 1; }
}
module.exports = { buildDistribution };
