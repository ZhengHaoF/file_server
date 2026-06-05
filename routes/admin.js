import express from 'express';
import fs from 'fs';
import {
    getCpuUsage,
    getMemoryInfo,
    getDiskInfo,
    getCacheStats,
    getDatabaseInfo,
    readLogs,
    cleanCache,
    getMaskedConfig
} from '../utils/systemInfo.js';
import { Sql } from '../sqllite.js';

export const adminRouter = express.Router();

// 存储 HTTP/HTTPS 服务器状态
let serverStatus = {
    http: 'stopped',
    https: 'stopped'
};

/**
 * 设置服务器状态
 */
export function setServerStatus(status) {
    serverStatus = { ...serverStatus, ...status };
}

/**
 * GET /api/admin/status
 * 获取服务器状态信息
 */
adminRouter.get('/status', async (req, res) => {
    try {
        const config = req.adminConfig;

        // 获取 CPU 使用率
        const cpu = await getCpuUsage();

        // 获取内存信息
        const memory = getMemoryInfo();

        // 获取磁盘信息
        const disk = getDiskInfo(config.rootPath);

        // 服务器信息
        const server = {
            uptime: Math.floor(process.uptime()),
            nodeVersion: process.version,
            httpPort: 3000,
            httpsPort: 3001,
            httpStatus: serverStatus.http,
            httpsStatus: serverStatus.https
        };

        res.json({
            cpu,
            memory,
            disk,
            server
        });
    } catch (err) {
        console.error('获取服务器状态失败:', err.message);
        res.status(500).json({ msg: '获取服务器状态失败' });
    }
});

/**
 * GET /api/admin/cache/stats
 * 获取缓存统计信息
 */
adminRouter.get('/cache/stats', (req, res) => {
    try {
        const config = req.adminConfig;
        const cachePath = config.imgCache || './imgCache';

        const stats = getCacheStats(cachePath);

        // 获取数据库大小
        const dbInfo = getDatabaseInfo('./imgCache.db');
        stats.dbSize = dbInfo.dbSize;

        res.json(stats);
    } catch (err) {
        console.error('获取缓存统计失败:', err.message);
        res.status(500).json({ msg: '获取缓存统计失败' });
    }
});

/**
 * POST /api/admin/cache/clean
 * 清理缓存
 */
adminRouter.post('/cache/clean', async (req, res) => {
    try {
        const config = req.adminConfig;
        const cachePath = config.imgCache || './imgCache';
        const { days, all } = req.body;

        if (!days && !all) {
            return res.status(400).json({ msg: '请指定清理天数或设置 all: true' });
        }

        // 清理文件系统缓存
        const result = await cleanCache(cachePath, all ? null : days);

        // 清理数据库记录
        if (all) {
            const sql = new Sql(cachePath);
            sql.init();
        } else if (days) {
            const sql = new Sql(cachePath);
            await sql.cleanOldData(days);
        }

        res.json(result);
    } catch (err) {
        console.error('清理缓存失败:', err.message);
        res.status(500).json({ msg: '清理缓存失败' });
    }
});

/**
 * GET /api/admin/logs
 * 查询日志
 */
adminRouter.get('/logs', async (req, res) => {
    try {
        const { level, limit = 100, keyword } = req.query;

        const logs = await readLogs({
            level,
            limit: parseInt(limit) || 100,
            keyword
        });

        res.json({
            total: logs.length,
            logs
        });
    } catch (err) {
        console.error('查询日志失败:', err.message);
        res.status(500).json({ msg: '查询日志失败' });
    }
});

/**
 * GET /api/admin/config
 * 获取脱敏配置
 */
adminRouter.get('/config', (req, res) => {
    try {
        const config = req.adminConfig;
        const maskedConfig = getMaskedConfig(config);

        res.json(maskedConfig);
    } catch (err) {
        console.error('获取配置失败:', err.message);
        res.status(500).json({ msg: '获取配置失败' });
    }
});

/**
 * POST /api/admin/restart
 * 重启服务器
 */
adminRouter.post('/restart', (req, res) => {
    try {
        // 返回响应后再重启
        res.json({ msg: '服务正在重启...' });

        // 延迟 100ms 确保响应发送完成
        setTimeout(() => {
            process.exit(0);
        }, 100);
    } catch (err) {
        console.error('重启服务器失败:', err.message);
        res.status(500).json({ msg: '重启服务器失败' });
    }
});

/**
 * GET /api/admin/database/status
 * 获取数据库状态
 */
adminRouter.get('/database/status', async (req, res) => {
    try {
        const config = req.adminConfig;
        const cachePath = config.imgCache || './imgCache';
        const sql = new Sql(cachePath);

        // 获取记录数量
        let recordCount = 0;
        try {
            const Database = (await import('better-sqlite3')).default;
            const db = new Database('./imgCache.db');
            const result = db.prepare('SELECT COUNT(*) as count FROM image').get();
            recordCount = result ? result.count : 0;
            db.close();
        } catch (err) {
            console.error('查询记录数量失败:', err.message);
        }

        const dbInfo = getDatabaseInfo('./imgCache.db');

        res.json({
            dbPath: './imgCache.db',
            dbSize: dbInfo.dbSize,
            recordCount,
            tables: ['image']
        });
    } catch (err) {
        console.error('获取数据库状态失败:', err.message);
        res.status(500).json({ msg: '获取数据库状态失败' });
    }
});
