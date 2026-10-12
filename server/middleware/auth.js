import crypto from 'node:crypto';

export function equalToken(provided, expected) {
    if (typeof provided !== 'string' || typeof expected !== 'string' || expected.length < 16) return false;
    const a = crypto.createHash('sha256').update(provided).digest();
    const b = crypto.createHash('sha256').update(expected).digest();
    return crypto.timingSafeEqual(a, b);
}

export function createAuth(config, { now = Date.now, onEvent = () => {} } = {}) {
    const sessions = new Map();
    const tickets = new Map();
    const attempts = new Map();
    const sessionMs = 8 * 60 * 60 * 1000;
    const ticketMs = 60 * 60 * 1000;
    const prune = map => {
        for (const [key, value] of map) if (value.expiresAt <= now()) map.delete(key);
        while (map.size > 2048) map.delete(map.keys().next().value);
    };
    function credentials(req) {
        const header = req.headers.authorization;
        const bearer = typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7) : '';
        const cookie = (req.headers.cookie || '').split(';').map(part => part.trim())
            .find(part => part.startsWith('fs_session='));
        const sessionId = bearer || cookie?.slice('fs_session='.length);
        const session = sessions.get(sessionId);
        if (session && session.expiresAt > now()) {
            session.lastSeenAt = now();
            return session;
        }
        if (equalToken(req.headers['x-admin-token'], config.restartPwd)) return { role: 'admin' };
        if (equalToken(req.headers['x-file-token'], config.accessToken)) return { role: 'file' };
        return null;
    }
    function readRequired(req, res, next) {
        const session = credentials(req);
        const ticket = typeof req.query.ticket === 'string' ? tickets.get(req.query.ticket) : null;
        const ticketSession = ticket?.sessionToken ? sessions.get(ticket.sessionToken) : null;
        if (config.publicRead || session || (ticket && ticket.expiresAt > now()
            && (!ticket.sessionToken || ticketSession?.expiresAt > now()))) return next();
        return res.status(401).json({ msg: '请先登录文件服务', code: 'AUTH_REQUIRED' });
    }
    function adminRequired(req, res, next) {
        if (credentials(req)?.role !== 'admin') return res.status(401).json({ msg: '需要管理员认证' });
        req.adminConfig = config;
        next();
    }
    function writeRequired(req, res, next) {
        if (!credentials(req)) return res.status(401).json({ msg: '请先登录文件服务' });
        if (!config.writeEnabled) return res.status(403).json({ msg: '文件写入功能未启用（writeEnabled）' });
        next();
    }
    function login(req, res) {
        const origin = req.headers.origin;
        if (origin && origin !== `${req.protocol}://${req.headers.host}` && !config.allowedOrigins.includes(origin)) {
            return res.status(403).json({ msg: '不允许该来源登录' });
        }
        prune(attempts);
        const key = req.ip;
        const attempt = attempts.get(key) || { count: 0, expiresAt: now() + 15 * 60 * 1000 };
        if (++attempt.count > 10) return res.status(429).json({ msg: '登录尝试过多，请 15 分钟后再试' });
        attempts.set(key, attempt);
        let role = null;
        if (equalToken(req.body?.token, config.restartPwd)) role = 'admin';
        else if (equalToken(req.body?.token, config.accessToken)) role = 'file';
        if (!role) return res.status(401).json({ msg: '令牌错误' });
        attempts.delete(key);
        prune(sessions);
        prune(tickets);
        const sessionToken = crypto.randomBytes(32).toString('hex');
        const readTicket = crypto.randomBytes(32).toString('hex');
        const session = { role, expiresAt: now() + sessionMs, createdAt: now(), lastSeenAt: now(),
            sessionId: crypto.randomBytes(12).toString('hex'), ip: req.ip };
        sessions.set(sessionToken, session);
        onEvent('auth.login', session, session.sessionId, 'succeeded');
        tickets.set(readTicket, { sessionToken, expiresAt: now() + ticketMs });
        res.set('Cache-Control', 'no-store');
        res.cookie('fs_session', sessionToken, { httpOnly: true, secure: req.secure || config.secureCookies === true, sameSite: 'strict', maxAge: sessionMs, path: '/' });
        res.json({ sessionToken, readTicket, expiresAt: now() + sessionMs, ticketExpiresAt: now() + ticketMs,
            role, writeEnabled: config.writeEnabled, uploadEnabled: config.uploadEnabled });
    }
    function renew(req, res) {
        const session = credentials(req);
        if (!session) return res.status(401).json({ msg: '请重新登录' });
        prune(tickets);
        const readTicket = crypto.randomBytes(32).toString('hex');
        const bearer = (req.headers.authorization || '').replace(/^Bearer /, '');
        const cookie = (req.headers.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith('fs_session='));
        tickets.set(readTicket, { sessionToken: bearer || cookie?.slice('fs_session='.length), expiresAt: now() + ticketMs });
        res.set('Cache-Control', 'no-store').json({ readTicket, ticketExpiresAt: now() + ticketMs });
    }
    function logout(req, res) {
        const session = credentials(req);
        if (!session) return res.status(401).json({ msg: '请先登录文件服务' });
        const bearer = (req.headers.authorization || '').replace(/^Bearer /, '');
        const cookie = (req.headers.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith('fs_session='));
        const id = bearer || cookie?.slice('fs_session='.length);
        sessions.delete(id);
        if (id) for (const [key, ticket] of tickets) if (ticket.sessionToken === id) tickets.delete(key);
        onEvent('auth.logout', session, session.sessionId || session.role, 'succeeded');
        res.clearCookie('fs_session', { path: '/' }).json({ msg: '已退出' });
    }
    function sessionInfo(req, res) {
        const session = credentials(req);
        if (!session) return res.status(401).json({ msg: '请重新登录' });
        res.set('Cache-Control', 'no-store').json({ role: session.role,
            expiresAt: session.expiresAt || null, sessionId: session.sessionId || null });
    }
    function listSessions(req) {
        prune(sessions);
        const current = credentials(req)?.sessionId;
        return [...sessions.values()].map(session => ({
            id: session.sessionId, role: session.role, createdAt: session.createdAt,
            lastSeenAt: session.lastSeenAt, expiresAt: session.expiresAt, current: session.sessionId === current, ip: session.ip,
        })).sort((a, b) => b.createdAt - a.createdAt);
    }
    function revokeSession(req, id) {
        const current = credentials(req);
        for (const [token, session] of sessions) {
            if (session.sessionId !== id) continue;
            sessions.delete(token);
            for (const [key, ticket] of tickets) if (ticket.sessionToken === token) tickets.delete(key);
            onEvent('session.revoke', current, id, 'succeeded');
            return { msg: '会话已撤销', current: current?.sessionId === id };
        }
        return null;
    }
    return { readRequired, adminRequired, writeRequired, credentials, login, logout, renew, sessionInfo, listSessions, revokeSession };
}
