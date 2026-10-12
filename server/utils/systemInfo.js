import os from 'node:os';
import fs from 'node:fs';
import { statfsSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

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

        cpus.forEach((cpu) => {
            for (const type in cpu.times) {
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
                cores,
            });
        } else {
            // 首次调用，返回 0，等待下次计算
            lastCpuInfo = currentInfo;
            resolve({
                usage: 0,
                cores,
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
        usage: parseFloat(((used / total) * 100).toFixed(1)),
    };
}

/**
 * 获取磁盘信息
 * @param {string} targetPath 目标路径
 * @returns {Object} 磁盘信息
 */
export async function getDiskInfoAsync(targetPath) {
    try {
        const stats = await fs.promises.statfs(targetPath);
        const total = stats.blocks * stats.bsize;
        const used = (stats.blocks - stats.bfree) * stats.bsize;
        return {
            total: Math.round(total / 1024 / 1024 / 1024),
            used: Math.round(used / 1024 / 1024 / 1024),
            free: Math.round((stats.bavail * stats.bsize) / 1024 / 1024 / 1024),
            usage: total ? Number(((used / total) * 100).toFixed(1)) : null,
            available: total > 0,
            sampledAt: Date.now(),
        };
    } catch {
        return {
            total: null,
            used: null,
            free: null,
            usage: null,
            available: false,
            sampledAt: Date.now(),
        };
    }
}

// Legacy synchronous helper; the running admin sampler uses getDiskInfoAsync.
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
            usage: total === 0 ? 0 : parseFloat(((used / total) * 100).toFixed(1)),
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
const cacheStats = new Map();

/**
 * 获取缓存目录统计信息（优化版：使用 withFileTypes 和系统命令）
 * @param {string} cachePath 缓存目录路径
 * @returns {Object} 缓存统计
 */
export async function getCacheStats(cachePath) {
    const saved = cacheStats.get(cachePath);
    if (saved && saved.expires > Date.now()) return saved.value;
    const result = {
        totalFiles: 0,
        totalSize: 0,
        imageCache: { count: 0, size: 0 },
        videoCache: { count: 0, size: 0 },
        oldestCache: null,
        newestCache: null,
    };

    try {
        if (!fs.existsSync(cachePath)) {
            return result;
        }

        // 使用 withFileTypes 直接判断是否是文件，无需额外 stat
        const entries = await fs.promises.readdir(cachePath, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isFile() && !entry.name.startsWith('.')) {
                const stat = await fs.promises
                    .stat(path.join(cachePath, entry.name))
                    .catch(() => null);
                if (!stat) continue;
                result.totalFiles++;
                result.imageCache.count++;
                result.totalSize += stat.size;
            }
        }

        // 使用系统命令获取目录大小（比逐文件 stat 快很多）
        result.imageCache.size = result.totalSize;
        result.videoCache.size = 0;
    } catch (err) {
        console.error('获取缓存统计失败:', err.message);
    }

    cacheStats.set(cachePath, { value: result, expires: Date.now() + 30000 });
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
        tables: [],
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
                message: match[4],
            };
        }

        // 简单格式：直接返回原始行
        return {
            timestamp: new Date().toISOString(),
            level: 'INFO',
            category: 'default',
            message: line,
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
export async function cleanCache(cachePath, days = null) {
    if (days !== null) throw new Error('按天清理应使用数据库最近访问时间');
    const entries = await fs.promises.readdir(cachePath, { withFileTypes: true });
    let cleaned = 0;
    for (const entry of entries) {
        if (!entry.isFile() || entry.name.startsWith('.')) continue;
        await fs.promises.unlink(path.join(cachePath, entry.name));
        cleaned++;
    }
    cacheStats.delete(cachePath);
    return { msg: '清空缓存成功', cleaned };
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
    if (masked.accessToken) masked.accessToken = '******';

    return masked;
}
