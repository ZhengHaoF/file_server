import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dist = path.join(__dirname, 'dist');

const isUpbuild = process.argv.includes('--upbuild');

function execCommand(command, cwd = __dirname) {
  return new Promise((resolve, reject) => {
    console.log(`执行: ${command} (cwd: ${cwd})`);
    exec(command, { cwd }, (error, stdout, stderr) => {
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

    console.log('创建 dist 目录...');
    fs.mkdirSync(__dist, { recursive: true });

    console.log('复制源代码文件...');
    const sourceFiles = [
      'index.js', 'clean.js', 'init.js', 'start.js', 'sqllite.js', 'admin-server.js',
    ];
    for (const file of sourceFiles) {
      fs.copyFileSync(path.join(__dirname, file), path.join(__dist, file));
    }

    console.log('复制子目录...');
    const sourceDirs = ['utils', 'middleware', 'routes'];
    for (const dir of sourceDirs) {
      const src = path.join(__dirname, dir);
      if (fs.existsSync(src)) {
        fs.cpSync(src, path.join(__dist, dir), { recursive: true });
      }
    }

    console.log('复制配置文件...');
    fs.copyFileSync('config.json', path.join(__dist, 'config.json'));
    fs.copyFileSync('启动.bat', path.join(__dist, '启动.bat'));
    fs.copyFileSync('node.exe', path.join(__dist, 'node.exe'));

    if (fs.existsSync('imgCache.db')) {
      fs.copyFileSync('imgCache.db', path.join(__dist, 'imgCache.db'));
    }

    console.log('复制 cert 目录...');
    if (fs.existsSync('cert')) {
      fs.cpSync('cert', path.join(__dist, 'cert'), { recursive: true });
    }

    console.log('复制 web 目录...');
    if (fs.existsSync('web')) {
      fs.cpSync('web', path.join(__dist, 'web'), { recursive: true });
    }

    console.log('构建 admin 管理面板...');
    const adminPath = path.join(__dirname, 'admin');
    await execCommand('npm run build', adminPath);
    const adminDistSrc = path.join(adminPath, 'dist');
    const adminDistDest = path.join(__dist, 'admin');
    if (fs.existsSync(adminDistSrc)) {
      fs.cpSync(adminDistSrc, adminDistDest, { recursive: true });
      console.log('admin 构建产物已复制到 dist/admin');
    } else {
      console.error('警告: admin/dist 不存在，跳过');
    }

    console.log('创建 imgCache 目录...');
    fs.mkdirSync(path.join(__dist, 'imgCache'), { recursive: true });

    console.log('初始化 npm...');
    // 从根目录 package.json 动态读取 dependencies，避免双源维护
    const rootPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
    const distPackageJson = {
      name: "file-serve-dist",
      version: "1.0.0",
      description: "file serve dist package",
      main: "index.js",
      type: "module",
      dependencies: rootPkg.dependencies,
    };

    fs.writeFileSync(
      path.join(__dist, 'package.json'),
      JSON.stringify(distPackageJson, null, 2)
    );

    console.log('安装依赖...');
    await execCommand('npm install', __dist);

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

    fs.mkdirSync(__dist, { recursive: true });

    console.log('复制源代码文件...');
    const sourceFiles = [
      'index.js', 'clean.js', 'init.js', 'start.js', 'sqllite.js', 'admin-server.js',
    ];
    for (const file of sourceFiles) {
      fs.copyFileSync(path.join(__dirname, file), path.join(__dist, file));
    }

    console.log('复制子目录...');
    const sourceDirs = ['utils', 'middleware', 'routes'];
    for (const dir of sourceDirs) {
      const src = path.join(__dirname, dir);
      if (fs.existsSync(src)) {
        fs.cpSync(src, path.join(__dist, dir), { recursive: true });
      }
    }

    console.log('复制 web 目录...');
    if (fs.existsSync('web')) {
      fs.cpSync('web', path.join(__dist, 'web'), { recursive: true });
    }

    console.log('构建 admin 管理面板...');
    const adminPath = path.join(__dirname, 'admin');
    await execCommand('npm run build', adminPath);
    const adminDistSrc = path.join(adminPath, 'dist');
    const adminDistDest = path.join(__dist, 'admin');
    if (fs.existsSync(adminDistSrc)) {
      fs.cpSync(adminDistSrc, adminDistDest, { recursive: true });
      console.log('admin 构建产物已复制到 dist/admin');
    } else {
      console.error('警告: admin/dist 不存在，跳过');
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
