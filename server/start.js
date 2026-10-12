import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nextRestartCount } from './utils/restartPolicy.js';

const directory = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.join(directory, 'logs', 'restart.log');
let failures = 0,
    child = null,
    timer = null,
    stopping = false;
function log(message) {
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${message}\n`);
    console.log(message);
}
function start() {
    if (stopping) return;
    log(`启动服务器，连续异常重启次数 ${failures}/10`);
    const launchedAt = Date.now();
    let planned = false,
        settled = false;
    child = spawn(process.execPath, [path.join(directory, 'index.js')], {
        cwd: directory,
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
        env: { ...process.env, FILE_SERVER_MANAGED: '1' },
    });
    child.on('message', (message) => {
        if (message?.type === 'planned-restart') planned = true;
    });
    const restart = (code) => {
        if (settled) return;
        settled = true;
        child = null;
        if (stopping) return;
        failures = nextRestartCount(failures, { planned, uptimeMs: Date.now() - launchedAt });
        log(`子进程退出 ${code}；${planned ? '计划重启' : '异常恢复'}`);
        if (failures > 10) {
            log('连续启动失败过多，停止重启');
            process.exitCode = 1;
            return;
        }
        timer = setTimeout(start, 1000);
    };
    child.once('close', restart);
    child.once('error', (error) => {
        log(`启动失败: ${error.message}`);
        restart(1);
    });
}
function stop() {
    stopping = true;
    clearTimeout(timer);
    if (child) {
        child.kill('SIGTERM');
        const timeout = setTimeout(() => {
            child?.kill('SIGKILL');
        }, 12000);
        child.once('close', () => clearTimeout(timeout));
    }
}
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
start();
