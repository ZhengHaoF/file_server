// pack.js - 打包服务端分发包
// 用法：npm run pack
//
// 产出：
//   server/dist/                        待分发的目录（可直接 `node index.js` 或双击 启动.bat 运行）
//   file-serve-v<version>.zip           压缩包，上传到 GitHub Releases 即可分发
//
// 说明：不再捆绑 node.exe —— 目标机器需要自备 Node ≥ 18.17（首次运行 启动.bat 会自动装依赖）。
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const root = __dirname;
const serverDir = path.join(root, 'server');
const distDir = path.join(serverDir, 'dist');

// 需要复制到 dist 的顶层文件
const COPY_FILES = [
    'index.js',
    'clean.js',
    'init.js',
    'start.js',
    'sqllite.js',
    'config.json',
    'mime.json',
    '启动.bat',
    'package-lock.json',
];

// 需要复制的目录（源在 server/ 下）
const COPY_DIRS = ['utils', 'middleware', 'routes', 'cert', 'web'];

// 明确不打包的内容，列出来是为了让后来者知道这是有意排除的
const EXCLUDED = [
    'node_modules（目标机自己装）',
    'node.exe / node.zip（已放弃自包含分发）',
    'imgCache / logs / imgCache.db（运行时数据）',
    'Dockerfile / docker-compose.yml（容器化另走一套）',
];

function log(msg) {
    console.log(`[pack] ${msg}`);
}

function copyFile(name) {
    const src = path.join(serverDir, name);
    if (!fs.existsSync(src)) {
        log(`跳过（不存在）: ${name}`);
        return false;
    }
    fs.copyFileSync(src, path.join(distDir, name));
    return true;
}

function copyDir(name) {
    const src = path.join(serverDir, name);
    if (!fs.existsSync(src)) {
        log(`跳过（不存在）: ${name}/`);
        return false;
    }
    fs.cpSync(src, path.join(distDir, name), { recursive: true });
    return true;
}

function main() {
    const serverPkg = JSON.parse(fs.readFileSync(path.join(serverDir, 'package.json'), 'utf8'));
    const version = serverPkg.version || '0.0.0';
    const zipName = `file-serve-v${version}.zip`;
    const zipPath = path.join(root, zipName);
    const zipTmp = path.join(root, `_pack_tmp_${Date.now()}.zip`);

    // 1. 清理旧产物
    if (fs.existsSync(distDir)) {
        log('清理旧的 dist...');
        fs.rmSync(distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(distDir, { recursive: true });

    // 2. 复制文件
    log('复制源码与配置...');
    for (const f of COPY_FILES) copyFile(f);

    log('复制目录...');
    for (const d of COPY_DIRS) copyDir(d);

    // 3. 前端产物检查
    if (!fs.existsSync(path.join(distDir, 'web', 'index.html'))) {
        log('警告：server/web 里没有前端产物，请先跑 npm run assemble');
    }
    const adminDist = path.join(serverDir, 'admin', 'dist');
    if (fs.existsSync(adminDist)) {
        fs.cpSync(adminDist, path.join(distDir, 'admin', 'dist'), { recursive: true });
        log('已复制 admin/dist');
    } else {
        log('警告：admin/dist 不存在（管理面板不会出现在分发包里）');
    }

    // 4. 生成精简 package.json：只保留运行时需要的依赖
    const distPkg = {
        name: 'file-serve',
        version,
        description: serverPkg.description,
        main: 'index.js',
        type: 'module',
        scripts: { init: 'node init.js', start: 'node start.js' },
        dependencies: serverPkg.dependencies,
        engines: serverPkg.engines,
    };
    fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(distPkg, null, 2), 'utf8');

    // 5. 预留运行时目录
    fs.mkdirSync(path.join(distDir, 'imgCache'), { recursive: true });

    // 6. 压缩（先压到临时名，成功了再改名，避免中途失败把旧包毁掉）
    log('压缩中...');
    if (fs.existsSync(zipPath)) fs.rmSync(zipPath, { force: true });
    execSync(
        `powershell -NoProfile -Command "$ProgressPreference='SilentlyContinue'; Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipTmp}' -Force"`,
        { stdio: 'inherit' }
    );
    fs.renameSync(zipTmp, zipPath);

    // 7. 汇总
    const sizeMB = (fs.statSync(zipPath).size / 1024 / 1024).toFixed(1);
    const fileCount = fs.readdirSync(distDir, { recursive: true }).length;

    log('');
    log('打包完成');
    log(`  内容目录: server/dist/`);
    log(`  压缩包  : ${zipName}  (${sizeMB} MB)`);
    log(`  条目数  : ${fileCount}`);
    log('');
    log('有意排除的内容：');
    for (const e of EXCLUDED) log(`  - ${e}`);
    log('');
    log('分发后目标机器的用法：装 Node ≥18.17 → 改 config.json 的 rootPath → 双击 启动.bat');
}

try {
    main();
} catch (err) {
    console.error(`[pack] 失败: ${err.message}`);
    process.exit(1);
}
