import os from 'os';
import fs from 'fs';
import { statfsSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

// CPU 使用率采样
let lastCpuInfo = null;

/**
 * 获取 CPU 使用率（异步，需要两次采样）
 * @returns {Promise<Object>} CPU 信息
 */
export function getCpuUsage() {
    return new Promise((resolve) => {
        const cpus = os.cpus();
        const cores = cpus.length;

        let totalIdle = 0;
        let totalTick = 0;

        cpus.forEach(cpu => {
            for (let type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });

        const currentInfo = { idle: totalIdle, total: totalTick };

        if (lastCpuInfo) {
            const idleDiff = currentInfo.idle - lastCpuInfo.idle;
            const totalDiff = currentInfo.total - lastCpuInfo.total;
            const usage = totalDiff === 0 ? 0 : ((1 - idleDiff / totalDiff) * 100).toFixed(1);

            lastCpuInfo = currentInfo;
            resolve({
                usage: parseFloat(usage),
                cores
            });
        } else {
            // 首次调用，返回 0，等待下次计算
            lastCpuInfo = currentInfo;
            resolve({
                usage: 0,
                cores
            });
        }
    });
}

/**
 * 获取内存信息
 * @returns {Object} 内存信息
 */
export function getMemoryInfo() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    return {
        total: Math.round(total / 1024 / 1024),
        free: Math.round(free / 1024 / 1024),
        used: Math.round(used / 1024 / 1024),
        usage: parseFloat((used / total * 100).toFixed(1))
    };
}

/**
 * 获取磁盘信息
 * @param {string} targetPath 目标路径
 * @returns {Object} 磁盘信息
 */
export function getDiskInfo(targetPath) {
    try {
        const stats = statfsSync(targetPath);
        const total = stats.blocks * stats.bsize;
        const free = stats.bavail * stats.bsize;
        const used = (stats.blocks - stats.bfree) * stats.bsize;

        return {
            total: Math.round(total / 1024 / 1024 / 1024),
            used: Math.round(used / 1024 / 1024 / 1024),
            free: Math.round(free / 1024 / 1024 / 1024),
            usage: total === 0 ? 0 : parseFloat((used / total * 100).toFixed(1))
        };
    } catch (err) {
        console.error('获取磁盘信息失败:', err.message);
        return { total: 0, used: 0, free: 0, usage: 0 };
    }
}

/**
 * 使用系统命令获取目录大小（性能最优）
 * @param {string} dirPath 目录路径
 * @returns {number} 目录大小（字节）
 */
function getDirectorySizeSync(dirPath) {
    try {
        if (process.platform === 'win32') {
            // Windows: 使用 PowerShell 获取目录大小
            const output = execSync(
                `(Get-ChildItem -Path '${dirPath}' -Recurse -File | Measure-Object -Property Length -Sum).Sum`,
                { encoding: 'utf8', timeout: 10000, shell: 'powershell.exe' }
            );
            return parseInt(output.trim()) || 0;
        } else {
            // Linux/Mac: 使用 du 命令
            const output = execSync(`du -sb "${dirPath}"`, { encoding: 'utf8', timeout: 10000 });
            return parseInt(output.split('\t')[0]) || 0;
        }
    } catch (err) {
        console.error('获取目录大小失败:', err.message);
        return 0;
    }
}

/**
 * 获取缓存目录统计信息（优化版：使用 withFileTypes 和系统命令）
 * @param {string} cachePath 缓存目录路径
 * @returns {Object} 缓存统计
 */
export function getCacheStats(cachePath) {
    const result = {
        totalFiles: 0,
        totalSize: 0,
        imageCache: { count: 0, size: 0 },
        videoCache: { count: 0, size: 0 },
        oldestCache: null,
        newestCache: null
    };

    try {
        if (!fs.existsSync(cachePath)) {
            return result;
        }

        // 使用 withFileTypes 直接判断是否是文件，无需额外 stat
        const entries = fs.readdirSync(cachePath, { withFileTypes: true });

        entries.forEach(entry => {
            if (entry.isFile()) {
                result.totalFiles++;
                result.imageCache.count++;
            }
        });

        // 使用系统命令获取目录大小（比逐文件 stat 快很多）
        result.totalSize = getDirectorySizeSync(cachePath);
        result.imageCache.size = result.totalSize;
        result.videoCache.size = 0;

    } catch (err) {
        console.error('获取缓存统计失败:', err.message);
    }

    return result;
}

/**
 * 获取数据库信息
 * @param {string} dbPath 数据库文件路径
 * @returns {Object} 数据库信息
 */
export function getDatabaseInfo(dbPath) {
    const result = {
        dbPath: dbPath,
        dbSize: 0,
        recordCount: 0,
        tables: []
    };

    try {
        if (fs.existsSync(dbPath)) {
            const stats = fs.statSync(dbPath);
            result.dbSize = stats.size;
        }
    } catch (err) {
        console.error('获取数据库信息失败:', err.message);
    }

    return result;
}

/**
 * 读取日志文件
 * @param {Object} options 选项
 * @returns {Promise<Array>} 日志数组
 */
export function readLogs(options = {}) {
    const { level, limit = 100, keyword } = options;
    const logFile = 'logs/app.log';

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(logFile)) {
            resolve([]);
            return;
        }

        const logs = [];
        const stream = fs.createReadStream(logFile, { encoding: 'utf8' });
        const rl = readline.createInterface({ input: stream });

        rl.on('line', (line) => {
            if (!line.trim()) return;

            // 解析日志行 [2024-01-15T12:00:00.000Z] [INFO] [category] message
            const log = parseLogLine(line);
            if (!log) return;

            // 筛选
            if (level && log.level.toLowerCase() !== level.toLowerCase()) return;
            if (keyword && !log.message.includes(keyword)) return;

            logs.push(log);

            // 限制数量（保留最新的）
            if (logs.length > limit) {
                logs.shift();
            }
        });

        rl.on('close', () => resolve(logs));
        rl.on('error', reject);
    });
}

/**
 * 解析日志行
 * @param {string} line 日志行
 * @returns {Object|null} 解析后的日志对象
 */
export function parseLogLine(line) {
    try {
        // 格式: [2024-01-15T12:00:00.000Z] [LEVEL] [category] message
        // 或: [2024-01-15T12:00:00.000Z] [LEVEL] message
        const regex = /^\[([^\]]+)\]\s*\[([^\]]+)\]\s*(?:\[([^\]]+)\]\s*)?(.+)$/;
        const match = line.match(regex);

        if (match) {
            return {
                timestamp: match[1],
                level: match[2],
                category: match[3] || 'default',
                message: match[4]
            };
        }

        // 简单格式：直接返回原始行
        return {
            timestamp: new Date().toISOString(),
            level: 'INFO',
            category: 'default',
            message: line
        };
    } catch (err) {
        return null;
    }
}

/**
 * 清理缓存
 * @param {string} cachePath 缓存目录路径
 * @param {number|null} days 清理 N 天前的缓存，null 表示全部清理
 * @returns {Promise<Object>} 清理结果
 */
export function cleanCache(cachePath, days = null) {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(cachePath)) {
                resolve({ msg: '缓存目录不存在', cleaned: 0 });
                return;
            }

            const files = fs.readdirSync(cachePath);
            let cleaned = 0;
            const now = Date.now();
            const threshold = days ? days * 24 * 60 * 60 * 1000 : 0;

            files.forEach(file => {
                const filePath = path.join(cachePath, file);
                try {
                    const stats = fs.statSync(filePath);

                    if (stats.isFile()) {
                        // 跳过 .gitkeep 等特殊文件
                        if (file.startsWith('.')) return;

                        if (!days || (now - stats.mtime.getTime() > threshold)) {
                            fs.unlinkSync(filePath);
                            cleaned++;
                        }
                    }
                } catch (err) {
                    // 忽略无法删除的文件
                }
            });

            resolve({
                msg: days ? `清理 ${days} 天前的缓存成功` : '清空全部缓存成功',
                cleaned
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * 获取脱敏配置
 * @param {Object} config 原始配置
 * @returns {Object} 脱敏后的配置
 */
export function getMaskedConfig(config) {
    const masked = { ...config };

    // 脱敏 rootPath - 只显示最后两级目录
    if (masked.rootPath) {
        const parts = masked.rootPath.replace(/\\/g, '/').split('/');
        if (parts.length > 2) {
            masked.rootPath = '***' + '/' + parts.slice(-2).join('/');
        }
    }

    // 脱敏 restartPwd
    if (masked.restartPwd) {
        masked.restartPwd = '******';
    }

    return masked;
}
