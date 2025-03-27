import {spawn} from 'child_process'

// 添加最大重试次数
const MAX_RETRIES = 5;
let retryCount = 0;

function startSubprocess() {
    const subprocess = spawn('node', ['index.js'], {
        stdio: 'inherit',
        detached: false
    });

    subprocess.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`);
        
        // 添加重试次数检查
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`正在重试... (${retryCount}/${MAX_RETRIES})`);
            startSubprocess();
        } else {
            console.error('达到最大重试次数，停止重试');
            process.exit(1);
        }
    });

    subprocess.on('error', (err) => {
        console.error('启动子进程失败:', err);
        process.exit(1);
    });

    // 添加进程退出时的清理处理
    process.on('SIGINT', () => {
        console.log('收到终止信号，关闭子进程...');
        subprocess.kill();
        process.exit();
    });
}

startSubprocess();
