// assemble.js - 构建 web 与 admin，并把构建产物同步到 server/ 下后端托管的位置
// 用法：npm run assemble（等价 node assemble.js）
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;

function run(cmd, cwd) {
  console.log(`[assemble] $ ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

// 删除目标目录后整体复制，保证产物与源同步（无残留旧文件）
function syncDir(src, dest) {
  console.log(`[assemble] 同步 ${path.relative(root, src)} -> ${path.relative(root, dest)}`);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

try {
  // 1. 构建 web 前端（vite 输出 web/dist）
  run('npm run build', path.join(root, 'web'));
  // 2. 构建 admin 管理面板（vite 输出 admin/dist）
  run('npm run build', path.join(root, 'admin'));

  // 3. 同步产物到后端托管位置：
  //    - server/web/          用户前端（express.static('web')）
  //    - server/admin/dist/   管理面板（仅在进程启动时挂载一次）
  syncDir(path.join(root, 'web', 'dist'), path.join(root, 'server', 'web'));
  syncDir(path.join(root, 'admin', 'dist'), path.join(root, 'server', 'admin', 'dist'));

  console.log('[assemble] 完成：server/web 与 server/admin/dist 已更新');
  console.log('[assemble] 提示：若后端正在运行，请重启 server（admin 面板只在启动时挂载一次）');
} catch (err) {
  console.error(`[assemble] 失败: ${err.message}`);
  process.exit(1);
}