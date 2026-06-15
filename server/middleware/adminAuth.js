import fs from 'fs';
import stripBom from 'strip-bom';

/**
 * 管理员认证中间件
 * 验证请求头中的 X-Admin-Token 是否与配置中的 restartPwd 一致
 */
export function adminAuth(req, res, next) {
    try {
        const token = req.headers['x-admin-token'];

        if (!token) {
            return res.status(401).json({ msg: '缺少认证令牌' });
        }

        // 读取配置文件
        const config = JSON.parse(stripBom(fs.readFileSync('config.json', 'utf8')));
        const restartPwd = config.restartPwd;

        if (String(token) !== String(restartPwd)) {
            return res.status(401).json({ msg: '认证失败' });
        }

        // 认证通过，将配置挂载到 req 上供后续使用
        req.adminConfig = config;
        next();
    } catch (err) {
        console.error('管理员认证中间件错误:', err.message);
        return res.status(500).json({ msg: '服务器内部错误' });
    }
}
