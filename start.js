import {spawn} from 'child_process'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LOG_FILE = 'logs/restart.log';
const MAX_RESTARTS = 10;
let restartCount = 0;
let currentSubprocess = null;

function log(msg) {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] ${msg}\n`;
    console.log(msg);
    
    const logDir = path.dirname(LOG_FILE);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFileSync(LOG_FILE, logMsg);
}

let adminSubprocess = null;

function startAdmin() {
    const adminDistPath = path.join(__dirname, 'admin', 'index.html');
    const isProd = fs.existsSync(adminDistPath);

    if (isProd) {
        // 生产模式：用 admin-server.js 托管 admin/dist 静态文件
        log(`Admin 后台运行在: http://localhost:3008`);
        const subprocess = spawn('node', ['admin-server.js'], {
            stdio: 'inherit',
            detached: false,
            env: { ...process.env }
        });
        adminSubprocess = subprocess;
        subprocess.on('close', (code) => {
            log(`Admin 进程退出，退出码: ${code}`);
            adminSubprocess = null;
        });
        subprocess.on('error', (err) => {
            log(`Admin 进程错误: ${err.message}`);
            adminSubprocess = null;
        });
    } else {
        // 开发模式：启动 Vite dev server
        log(`Admin 开发服务器启动 (端口: 3008)`);
        const adminPath = path.join(__dirname, 'admin');
        const subprocess = spawn('npm', ['run', 'dev'], {
            cwd: adminPath,
            stdio: 'inherit',
            detached: false,
            shell: true,
            env: { ...process.env }
        });
        adminSubprocess = subprocess;
        subprocess.on('close', (code) => {
            log(`Admin 开发服务器退出，退出码: ${code}`);
            adminSubprocess = null;
        });
        subprocess.on('error', (err) => {
            log(`Admin 开发服务器错误: ${err.message}`);
            adminSubprocess = null;
        });
    }
}

function startServer() {
    log(`启动服务器 (重启次数: ${restartCount}/${MAX_RESTARTS})`);
    
    const subprocess = spawn('node', ['index.js'], {
        stdio: 'inherit',
        detached: false,
        env: { ...process.env }
    });

    currentSubprocess = subprocess;

    subprocess.on('close', (code) => {
        log(`服务器进程退出，退出码: ${code}`);
        currentSubprocess = null;
        
        if (code === 0) {
            log('服务器正常退出，等待重新启动...');
        } else {
            log('服务器异常退出，准备重启...');
        }
        
        if (restartCount < MAX_RESTARTS) {
            restartCount++;
            setTimeout(() => {
                startServer();
            }, 1000);
        } else {
            log('达到最大重启次数限制，停止自动重启');
            process.exit(1);
        }
    });

    subprocess.on('error', (err) => {
        log(`服务器进程错误: ${err.message}`);
        currentSubprocess = null;
        
        if (restartCount < MAX_RESTARTS) {
            restartCount++;
            log('准备重新启动服务器...');
            setTimeout(() => {
                startServer();
            }, 2000);
        } else {
            log('达到最大重启次数限制，停止自动重启');
            process.exit(1);
        }
    });

    process.on('SIGINT', () => {
        log('收到终止信号，关闭服务器...');
        if (currentSubprocess) {
            currentSubprocess.kill('SIGTERM');
        }
        if (adminSubprocess) {
            adminSubprocess.kill('SIGTERM');
        }
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        log('收到终止信号，关闭服务器...');
        if (currentSubprocess) {
            currentSubprocess.kill('SIGTERM');
        }
        if (adminSubprocess) {
            adminSubprocess.kill('SIGTERM');
        }
        process.exit(0);
    });

    process.on('exit', (code) => {
        log(`主进程退出，退出码: ${code}`);
    });
}

log('='.repeat(50));
log('服务器管理程序启动');
log('='.repeat(50));
startServer();
startAdmin();
