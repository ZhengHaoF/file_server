import { exec, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dist = path.join(__dirname, 'dist');

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
    
    console.log('复制源代码文件...');
    copyFileSync('index.js', 'dist/index.js');
    copyFileSync('clean.js', 'dist/clean.js');
    copyFileSync('init.js', 'dist/init.js');
    copyFileSync('start.js', 'dist/start.js');
    copyFileSync('sqllite.js', 'dist/sqllite.js');
    copyFileSync('utils/utils.js', 'dist/utils/utils.js');
    copyFileSync('utils/systemInfo.js', 'dist/utils/systemInfo.js');
    copyFileSync('middleware/adminAuth.js', 'dist/middleware/adminAuth.js');
    copyFileSync('routes/admin.js', 'dist/routes/admin.js');
    
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
      type: "module",
      dependencies: {
        "better-sqlite3": "^11.6.0",
        "body-parser": "^1.20.2",
        "cors": "^2.8.5",
        "express": "^4.18.2",
        "express-basic-auth": "^1.2.1",
        "ffmpeg-static": "^5.3.0",
        "fluent-ffmpeg": "^2.1.3",
        "images": "^3.2.4",
        "log4js": "^6.9.1",
        "netmask": "^2.0.2",
        "sharp": "^0.33.3",
        "strip-bom": "^5.0.0",
        "ws": "^8.16.0"
      }
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'dist', 'package.json'),
      JSON.stringify(distPackageJson, null, 2)
    );
    
    console.log('安装依赖...');

    await execCommand('cd dist && cd && npm install');
    
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
    
    console.log('复制源代码文件...');
    copyFileSync('index.js', 'dist/index.js');
    copyFileSync('clean.js', 'dist/clean.js');
    copyFileSync('init.js', 'dist/init.js');
    copyFileSync('start.js', 'dist/start.js');
    copyFileSync('sqllite.js', 'dist/sqllite.js');
    copyFileSync('utils/utils.js', 'dist/utils/utils.js');
    
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
