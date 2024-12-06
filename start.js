import {spawn} from 'child_process'

function startSubprocess() {
    // 创建一个新的子进程来运行index.js
    const subprocess = spawn('node', ['index.js'], {
        stdio: 'inherit', // 子进程使用父进程的输入输出
        detached: false   // 默认值，子进程在父进程退出时也会退出
    });

// 监听子进程退出事件
    subprocess.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`);
        startSubprocess();
    });

// 监听子进程错误事件
    subprocess.on('error', (err) => {
        console.error('启动子进程失败:', err);
    });
}

startSubprocess();
