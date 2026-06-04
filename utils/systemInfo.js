import os from 'os';
import fs from 'fs';
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
        // Windows 系统使用 wmic 获取磁盘信息
        if (process.platform === 'win32') {
            const drive = path.parse(targetPath).root.replace('\\', '');
            const output = execSync(
                `wmic logicaldisk where "DeviceID='${drive}'" get FreeSpace,Size /format:csv`,
                { encoding: 'utf8', timeout: 5000 }
            );

            const lines = output.trim().split('\n').filter(line => line.trim());
            if (lines.length >= 2) {
                const values = lines[lines.length - 1].split(',');
                // CSV 格式: Node,FreeSpace,Size
                if (values.length >= 3) {
                    const free = parseInt(values[1]) || 0;
                    const total = parseInt(values[2]) || 0;
                    const used = total - free;

                    return {
                        total: Math.round(total / 1024 / 1024 / 1024),
                        used: Math.round(used / 1024 / 1024 / 1024),
                        free: Math.round(free / 1024 / 1024 / 1024),
                        usage: total === 0 ? 0 : parseFloat((used / total * 100).toFixed(1))
                    };
                }
            }

            // 备用方案：使用 fs.statSync
            const stats = fs.statSync(targetPath);
            return {
                total: 0,
                used: 0,
                free: 0,
                usage: 0
            };
        } else {
            // Linux/Mac 使用 statvfs 或 df
            const output = execSync(`df -B1 "${targetPath}" | tail -1`, { encoding: 'utf8' });
            const parts = output.trim().split(/\s+/);

            if (parts.length >= 4) {
                const total = parseInt(parts[1]) || 0;
                const used = parseInt(parts[2]) || 0;
                const free = parseInt(parts[3]) || 0;

                return {
                    total: Math.round(total / 1024 / 1024 / 1024),
                    used: Math.round(used / 1024 / 1024 / 1024),
                    free: Math.round(free / 1024 / 1024 / 1024),
                    usage: total === 0 ? 0 : parseFloat((used / total * 100).toFixed(1))
                };
            }

            return { total: 0, used: 0, free: 0, usage: 0 };
        }
    } catch (err) {
        console.error('获取磁盘信息失败:', err.message);
        return { total: 0, used: 0, free: 0, usage: 0 };
    }
}

/**
 * 获取缓存目录统计信息
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

        const files = fs.readdirSync(cachePath);
        const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const videoExts = ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv'];

        files.forEach(file => {
            const filePath = path.join(cachePath, file);
            try {
                const stats = fs.statSync(filePath);

                if (stats.isFile()) {
                    result.totalFiles++;
                    result.totalSize += stats.size;

                    const ext = path.extname(file).toLowerCase();

                    if (imageExts.includes(ext)) {
                        result.imageCache.count++;
                        result.imageCache.size += stats.size;
                    } else if (videoExts.includes(ext)) {
                        result.videoCache.count++;
                        result.videoCache.size += stats.size;
                    } else {
                        // 其他文件归入图片缓存
                        result.imageCache.count++;
                        result.imageCache.size += stats.size;
                    }

                    // 更新时间范围
                    const mtime = stats.mtime.toISOString();
                    if (!result.oldestCache || mtime < result.oldestCache) {
                        result.oldestCache = mtime;
                    }
                    if (!result.newestCache || mtime > result.newestCache) {
                        result.newestCache = mtime;
                    }
                }
            } catch (err) {
                // 忽略无法访问的文件
            }
        });
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
