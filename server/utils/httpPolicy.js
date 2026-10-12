/**
 * @typedef {object} UploadTimeoutConfig
 * @property {number} uploadTimeoutSeconds
 * @property {number} uploadIdleTimeoutSeconds
 */

/**
 * Keep header protection, while allowing configured large uploads to finish.
 * @param {import('node:http').Server} server
 * @param {UploadTimeoutConfig} config
 */
export function configureHttpTimeouts(server, config) {
    server.requestTimeout = Math.max(120000, config.uploadTimeoutSeconds * 1000);
    server.headersTimeout = 15000;
}

/**
 * Enforce an absolute per-request budget and an idle socket budget.
 * The larger upload budget does not apply to ordinary routes.
 * @param {UploadTimeoutConfig} config
 * @returns {import('express').RequestHandler}
 */
export function requestBudget(config) {
    return (req, res, next) => {
        const upload = req.path === '/upload' && req.method === 'POST';
        const duration = upload ? config.uploadTimeoutSeconds * 1000 : 120000;
        const idle = upload ? config.uploadIdleTimeoutSeconds * 1000 : 120000;
        const expire = () => {
            if (!res.headersSent) {
                res.set('Connection', 'close');
                res.once('finish', () => req.destroy());
                res.status(408).json({
                    msg: '请求超时，请检查网络后重试',
                    code: 'REQUEST_TIMEOUT',
                });
            } else {
                req.destroy();
            }
        };
        const timer = setTimeout(expire, duration);
        timer.unref();
        req.setTimeout(idle, expire);
        const cleanup = () => {
            clearTimeout(timer);
            req.removeListener('timeout', expire);
        };
        res.once('finish', cleanup);
        res.once('close', cleanup);
        next();
    };
}
