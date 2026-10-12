// Kept as a compatibility export for callers outside the main server.
import { equalToken } from './auth.js';
import { loadConfig } from '../configuration.js';

export function adminAuth(req, res, next) {
    const config = loadConfig();
    if (!equalToken(req.headers['x-admin-token'], config.restartPwd))
        return res.status(401).json({ msg: '需要管理员认证' });
    req.adminConfig = config;
    next();
}
