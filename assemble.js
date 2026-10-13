// assemble.js - build production web/admin for the Rust backend.
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
  if (process.env.VITE_ADMIN_PREVIEW === '1') throw new Error('assemble 只能生成生产后台，请取消 VITE_ADMIN_PREVIEW；隔离演示使用 admin 的 build:preview');
  // 1. 构建 web 前端（vite 输出 web/dist）
  run('npm run build', path.join(root, 'web'));
  // 2. 构建 admin 管理面板（vite 输出 admin/dist）
  run('npm run build', path.join(root, 'admin'));

  // Rust is the only backend; both production clients ship under static/.
  syncDir(path.join(root, 'web', 'dist'), path.join(root, 'server-rust', 'static', 'web'));
  syncDir(path.join(root, 'admin', 'dist'), path.join(root, 'server-rust', 'static', 'admin'));

  console.log('[assemble] 完成：server-rust/static/web 与 static/admin 已更新');
} catch (err) {
  console.error(`[assemble] 失败: ${err.message}`);
  process.exit(1);
}
