import { exec, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isUpbuild = process.argv.includes('--upbuild');

function execCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`执行: ${command}`);
    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error(`错误: ${error.message}`);
        reject(error);
        return;
      }
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      resolve();
    });
  });
}

function copyFileSync(source, target) {
  let targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(source, target);
}

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(source)) {
    console.log(`源目录不存在: ${source}`);
    return;
  }
  
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(target, entry.name);
    
    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

async function build() {
  try {
    console.log('开始打包...');
    
    if (fs.existsSync('dist')) {
      console.log('删除旧的 dist 目录...');
      fs.rmSync('dist', { recursive: true, force: true });
    } else {
      console.log('dist 目录不存在，将创建新目录');
    }
    
    await execCommand('node init.js');
    await execCommand('npx rollup -c');
    
    console.log('复制配置文件...');
    copyFileSync('config.json', 'dist/config.json');
    copyFileSync('启动.bat', 'dist/启动.bat');
    copyFileSync('node.exe', 'dist/node.exe');
    
    if (fs.existsSync('imgCache.db')) {
      copyFileSync('imgCache.db', 'dist/imgCache.db');
    }
    
    console.log('复制 cert 目录...');
    if (fs.existsSync('cert')) {
      copyFolderRecursive('cert', 'dist/cert');
    }
    
    console.log('复制 web 目录...');
    if (fs.existsSync('web')) {
      copyFolderRecursive('web', 'dist/web');
    }
    
    console.log('创建 imgCache 目录...');
    if (!fs.existsSync('dist/imgCache')) {
      fs.mkdirSync('dist/imgCache', { recursive: true });
    }
    
    console.log('初始化 npm...');
    const distPackageJson = {
      name: "file-serve-dist",
      version: "1.0.0",
      description: "file serve dist package",
      main: "index.js",
      dependencies: {
        "sharp": "^0.33.3",
        "better-sqlite3": "^11.6.0"
      }
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'dist', 'package.json'),
      JSON.stringify(distPackageJson, null, 2)
    );
    
    console.log('安装依赖...');
    await execCommand('npm install', { cwd: path.join(__dirname, 'dist') });
    
    console.log('打包完成！');
  } catch (error) {
    console.error('打包失败:', error);
    process.exit(1);
  }
}

async function upbuild() {
  try {
    console.log('开始打更新包...');
    
    if (fs.existsSync('dist')) {
      console.log('删除旧的 dist 目录...');
      fs.rmSync('dist', { recursive: true, force: true });
    } else {
      console.log('dist 目录不存在，将创建新目录');
    }
    
    await execCommand('npx rollup -c');
    
    console.log('复制 web 目录...');
    if (fs.existsSync('web')) {
      copyFolderRecursive('web', 'dist/web');
    }
    
    console.log('更新包打包完成！');
  } catch (error) {
    console.error('打包失败:', error);
    process.exit(1);
  }
}

if (isUpbuild) {
  upbuild();
} else {
  build();
}
