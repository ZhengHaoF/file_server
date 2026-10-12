import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import stripBom from 'strip-bom';
import { validatePath } from './utils/fileSafety.js';
import { numericConfigErrors } from './utils/configSchema.js';

export function normalizeConfig(raw, cwd = process.cwd(), env = process.env) {
    const config = { ...raw };
    Object.defineProperty(config, 'configDir', { value: path.resolve(cwd), enumerable: false });
    config.rootPath = fs.realpathSync(
        path.resolve(cwd, env.FILE_SERVER_ROOT || raw.rootPath || './files'),
    );
    if (!fs.statSync(config.rootPath).isDirectory()) throw new Error('共享路径必须为目录');
    if (config.rootPath === path.parse(config.rootPath).root) {
        throw new Error('不能将系统根目录设为共享目录');
    }
    config.dataPath = path.resolve(cwd, env.FILE_SERVER_DATA_DIR || raw.dataPath || '.');
    if (validatePath(config.dataPath, config.rootPath))
        throw new Error('运行数据目录不能位于共享目录内');
    fs.mkdirSync(config.dataPath, { recursive: true });
    config.dataPath = fs.realpathSync(config.dataPath);
    if (validatePath(config.dataPath, config.rootPath))
        throw new Error('运行数据目录不能位于共享目录内');
    config.dbPath = path.join(config.dataPath, 'imgCache.db');
    config.imgCache = path.resolve(cwd, env.FILE_SERVER_CACHE_DIR || raw.imgCache || './imgCache');
    // Keep runtime credentials, caches and database outside the served tree.
    if (validatePath(config.imgCache, config.rootPath) || validatePath(cwd, config.rootPath)) {
        throw new Error('共享目录不能包含服务端源码、配置或缓存目录');
    }
    fs.mkdirSync(config.imgCache, { recursive: true });
    config.imgCache = fs.realpathSync(config.imgCache);
    if (validatePath(config.imgCache, config.rootPath))
        throw new Error('缓存目录不能位于共享目录内');
    config.accessToken = env.FILE_SERVER_ACCESS_TOKEN || raw.accessToken || '';
    config.restartPwd = env.FILE_SERVER_ADMIN_TOKEN || raw.restartPwd || '';
    config.publicRead = raw.publicRead === true;
    config.writeEnabled = raw.writeEnabled === true;
    config.uploadEnabled = raw.uploadEnabled === true;
    config.secureCookies = raw.secureCookies === true;
    config.httpsEnabled = raw.httpsEnabled === true;
    config.cacheMaxSizeMB = Number(raw.cacheMaxSizeMB ?? 0);
    config.cacheRetentionDays = Number(raw.cacheRetentionDays ?? 30);
    config.autoCleanupEnabled = raw.autoCleanupEnabled === true;
    config.host = raw.host || '127.0.0.1';
    config.port = Number(raw.port ?? 3000);
    config.httpsPort = Number(raw.httpsPort ?? 3001);
    config.uploadMaxSizeMB = Number(raw.uploadMaxSizeMB ?? 4096);
    config.uploadTimeoutSeconds = Number(raw.uploadTimeoutSeconds ?? 1800);
    config.uploadIdleTimeoutSeconds = Number(raw.uploadIdleTimeoutSeconds ?? 120);
    const errors = numericConfigErrors(config, { allowEphemeralPorts: true });
    if (Object.keys(errors).length)
        throw new Error(`配置数值无效: ${Object.keys(errors).join(', ')}`);
    config.allowedOrigins = Array.isArray(raw.allowedOrigins) ? raw.allowedOrigins : [];
    if (
        config.allowedOrigins.length > 16 ||
        config.allowedOrigins.some((origin) => {
            try {
                const url = new URL(origin);
                return !['http:', 'https:'].includes(url.protocol) || url.origin !== origin;
            } catch {
                return true;
            }
        })
    ) {
        throw new Error('allowedOrigins 只能填写明确的 http/https 来源，不能使用通配符');
    }
    return config;
}

export function loadConfig(cwd = process.cwd()) {
    const read = (file) => JSON.parse(stripBom(fs.readFileSync(path.join(cwd, file), 'utf8')));
    const raw = { ...read('config.json') };
    if (fs.existsSync(path.join(cwd, 'config.local.json')))
        Object.assign(raw, read('config.local.json'));
    const dataPath = path.resolve(cwd, process.env.FILE_SERVER_DATA_DIR || raw.dataPath || '.');
    fs.mkdirSync(dataPath, { recursive: true });
    const adminPath = path.join(dataPath, 'admin-config.local.json');
    if (fs.existsSync(adminPath))
        Object.assign(raw, JSON.parse(stripBom(fs.readFileSync(adminPath, 'utf8'))));
    const secretsPath = path.join(dataPath, 'auth.local.json');
    const saved = fs.existsSync(secretsPath)
        ? JSON.parse(stripBom(fs.readFileSync(secretsPath, 'utf8')))
        : {};
    // Replace the historical demonstration password rather than leaving it usable.
    if (!raw.restartPwd || String(raw.restartPwd) === '123456')
        raw.restartPwd = saved.restartPwd || crypto.randomBytes(32).toString('hex');
    if (!raw.accessToken)
        raw.accessToken = saved.accessToken || crypto.randomBytes(32).toString('hex');
    const config = normalizeConfig(raw, cwd);
    if (
        typeof config.accessToken !== 'string' ||
        typeof config.restartPwd !== 'string' ||
        config.accessToken.length < 16 ||
        config.restartPwd.length < 16 ||
        config.accessToken === config.restartPwd
    ) {
        throw new Error('访问令牌和管理令牌必须不同，且各至少 16 个字符；请修改私有配置或环境变量');
    }
    if (!fs.existsSync(secretsPath) || !saved.accessToken || !saved.restartPwd) {
        fs.writeFileSync(
            secretsPath,
            JSON.stringify({ accessToken: raw.accessToken, restartPwd: raw.restartPwd }, null, 2),
            {
                mode: 0o600,
                flag: fs.existsSync(secretsPath) ? 'w' : 'wx',
            },
        );
    }
    return config;
}
