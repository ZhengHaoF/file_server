import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import net from 'node:net';
import { HttpError, validatePath } from '../utils/fileSafety.js';
import { getMaskedConfig } from '../utils/systemInfo.js';

const field = (key, label, type, group, help, options = {}) =>
    ({ key, label, type, group, help, restartRequired: false, ...options });
export const CONFIG_FIELDS = [
    field('rootPath', '共享目录', 'string', 'basic', '必须已经存在，不能包含服务代码或运行数据。', { restartRequired: true }),
    field('host', '监听地址', 'string', 'basic', '127.0.0.1 仅本机；0.0.0.0 允许内网，需防火墙和 HTTPS。', { restartRequired: true }),
    field('port', 'HTTP 端口', 'number', 'basic', '更改后访问地址会变化。', { restartRequired: true, min: 1, max: 65535 }),
    field('httpsEnabled', '直接 HTTPS', 'boolean', 'basic', '必须预先安装自己的证书；TLS 反代不需要打开此项。', { restartRequired: true }),
    field('httpsPort', 'HTTPS 端口', 'number', 'basic', '仅直接 HTTPS 启用时使用。', { restartRequired: true, min: 1, max: 65535 }),
    field('publicRead', '匿名读取', 'boolean', 'access', '开启后，能连到服务的人无需登录即可读取文件。'),
    field('writeEnabled', '允许文件写入', 'boolean', 'access', '允许已认证访问者删除、重命名与上传。'),
    field('uploadEnabled', '允许上传', 'boolean', 'access', '同时需要打开允许文件写入。'),
    field('uploadMaxSizeMB', '上传上限（MB）', 'number', 'access', '每个新上传请求立即使用新上限。', { min: 0.001, max: 1048576 }),
    field('allowedOrigins', '允许来源', 'origins', 'access', '每行一个完整来源，例如 https://files.example.com；不允许通配符。'),
    field('secureCookies', '仅 HTTPS 发送会话', 'boolean', 'access', 'TLS 反向代理后建议打开；纯 HTTP 下只能使用临时 Bearer，刷新恢复会话与实时日志需 HTTPS。'),
    field('cacheMaxSizeMB', '缓存容量上限（MB）', 'number', 'cache', '0 表示不按容量清理；自动维护按最近访问淘汰。', { min: 0, max: 1048576 }),
    field('cacheRetentionDays', '缓存保留天数', 'number', 'cache', '自动维护时删除超过此天数未访问的缓存。', { min: 1, max: 3650 }),
    field('autoCleanupEnabled', '自动维护', 'boolean', 'cache', '每分钟检查策略；只删除派生缓存，不删除原始文件。'),
];
const keys = new Set(CONFIG_FIELDS.map(item => item.key));
const envKeys = { rootPath: 'FILE_SERVER_ROOT' };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

async function readObject(file) {
    try {
        if ((await fs.promises.lstat(file)).isSymbolicLink()) throw new HttpError(400, '私有配置文件不能是软链接');
        const parsed = JSON.parse((await fs.promises.readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new HttpError(400, '配置必须为对象');
        return parsed;
    } catch (error) { if (error.code === 'ENOENT') return {}; throw error; }
}
export async function atomicJson(file, value) {
    const temporary = path.join(path.dirname(file), `.admin-write-${crypto.randomUUID()}.json`);
    let handle;
    try {
        handle = await fs.promises.open(temporary, 'wx', 0o600);
        await handle.writeFile(JSON.stringify(value, null, 2) + '\n');
        await handle.sync();
        await handle.close(); handle = null;
        await fs.promises.rename(temporary, file);
    } finally {
        if (handle) await handle.close();
        await fs.promises.unlink(temporary).catch(() => {});
    }
}

export function createAdminConfig(config, { cwd = config.configDir || process.cwd(), env = process.env, audit = () => {} } = {}) {
    const file = path.join(config.dataPath, 'admin-config.local.json');
    const backup = path.join(config.dataPath, 'admin-config.backup.local.json');
    const local = path.join(cwd, 'config.local.json');
    const base = Object.fromEntries(CONFIG_FIELDS.map(item => [item.key, config[item.key]]));
    let saving = false;
    async function snapshot() {
        const [saved, privateValues] = await Promise.all([readObject(file), readObject(local)]);
        const revision = crypto.createHash('sha256').update(JSON.stringify([saved, privateValues])).digest('hex');
        const values = { ...base,
            ...Object.fromEntries(Object.entries(privateValues).filter(([key]) => keys.has(key))),
            ...Object.fromEntries(Object.entries(saved).filter(([key]) => keys.has(key))) };
        if (typeof values.rootPath === 'string') values.rootPath = path.resolve(cwd, values.rootPath);
        for (const [key, variable] of Object.entries(envKeys)) if (env[variable]) values[key] = config[key];
        const fields = CONFIG_FIELDS.map(item => ({ ...item,
            readonly: Boolean(env[envKeys[item.key]]),
            source: env[envKeys[item.key]] ? 'environment' : item.key in saved || item.key in privateValues ? 'local' : 'default',
        }));
        const pendingRestart = fields.filter(item => item.restartRequired && !same(values[item.key], config[item.key])).map(item => item.key);
        return { ...getMaskedConfig(config), revision, values, fields, pendingRestart,
            backupAvailable: fs.existsSync(backup) };
    }
    async function validate(input) {
        const current = await snapshot();
        if (!input || input.revision !== current.revision) throw new HttpError(409, '配置已变化，请刷新后重新确认');
        const errors = {};
        const values = input.values;
        if (!values || typeof values !== 'object' || Array.isArray(values)) throw new HttpError(400, 'values 必须为配置对象');
        for (const key of Object.keys(values)) if (!keys.has(key)) errors[key] = '此字段不允许通过后台修改';
        const next = { ...current.values };
        for (const item of current.fields) {
            if (!(item.key in values)) continue;
            const value = values[item.key];
            if (item.readonly && !same(value, current.values[item.key])) { errors[item.key] = '环境变量覆盖的字段只读'; continue; }
            if (item.type === 'boolean' && typeof value !== 'boolean') errors[item.key] = '必须为布尔值';
            if (item.type === 'number' && (typeof value !== 'number' || !Number.isFinite(value) || value < item.min
                || value > item.max || (item.key !== 'uploadMaxSizeMB' && !Number.isInteger(value)))) errors[item.key] = `请输入 ${item.min} 到 ${item.max} 的有效数值`;
            if (item.type === 'string' && (typeof value !== 'string' || !value.trim() || value.length > 4096 || value.includes('\0'))) errors[item.key] = '请输入有效文本';
            if (item.type === 'origins' && (!Array.isArray(value) || value.length > 16 || value.some(origin => {
                try { const url = new URL(origin); return !['http:', 'https:'].includes(url.protocol) || url.origin !== origin; }
                catch { return true; }
            }))) errors[item.key] = '只允许最多 16 个完整 HTTP/HTTPS 来源，不允许通配符';
            next[item.key] = value;
        }
        if (!errors.host && !net.isIP(next.host) && next.host !== 'localhost') errors.host = '请填写 IP 地址或 localhost';
        if (!errors.rootPath) {
            try {
                const root = await fs.promises.realpath(path.resolve(cwd, next.rootPath));
                if (!(await fs.promises.stat(root)).isDirectory() || root === path.parse(root).root
                    || [cwd, config.dataPath, config.imgCache].some(target => validatePath(target, root))) {
                    errors.rootPath = '不能共享系统根目录，或包含源码、配置、数据库和缓存的目录';
                } else next.rootPath = root;
            } catch { errors.rootPath = '共享目录必须存在且可读取'; }
        }
        if (next.httpsEnabled && next.port === next.httpsPort) errors.httpsPort = 'HTTP 和 HTTPS 端口不能相同';
        if (next.httpsEnabled && !config.httpsEnabled) {
            for (const certificate of [config.certPath || './cert/file.crt', config.keyPath || './cert/private.pem']) {
                try { await fs.promises.access(path.resolve(cwd, certificate), fs.constants.R_OK); }
                catch { errors.httpsEnabled = '请先安装自己的 HTTPS 证书和私钥，再启用'; }
            }
        }
        if (Object.keys(errors).length) {
            const error = new HttpError(400, '配置校验未通过'); error.errors = errors; throw error;
        }
        const changes = current.fields.filter(item => !same(next[item.key], current.values[item.key]))
            .map(item => ({ key: item.key, before: current.values[item.key], after: next[item.key], restartRequired: item.restartRequired }));
        const warnings = [];
        if (next.publicRead) warnings.push('匿名读取已开启：所有能连接服务的人都能读取文件。');
        if (next.host === '0.0.0.0' || next.host === '::') warnings.push('将监听所有网卡，请确认防火墙和 HTTPS。');
        if (next.uploadEnabled && !next.writeEnabled) warnings.push('上传已开启但写入关闭，实际仍不能上传。');
        if (next.secureCookies && !config.httpsEnabled) warnings.push('Secure cookie 需要 HTTPS；请确认 TLS 反向代理已配置，否则无法刷新恢复会话或连接实时日志。');
        return { valid: true, changes, warnings, next, current };
    }
    async function save(input, actor, rollback = false) {
        if (saving) throw new HttpError(409, '另一配置操作正在保存，请稍后重试');
        saving = true;
        try {
            const current = await snapshot();
            const values = rollback ? await readObject(backup) : input.values;
            if (rollback && !fs.existsSync(backup)) throw new HttpError(404, '尚无可回滚配置');
            const checked = await validate({ revision: input.revision, values });
            if (rollback) {
                // A backup is a complete overrides snapshot; absent values restore startup defaults.
                const restored = { ...base, ...values };
                const fullCheck = await validate({ revision: input.revision, values: restored });
                Object.assign(checked, fullCheck);
            }
            const stored = Object.fromEntries(Object.entries(checked.next).filter(([key]) => keys.has(key)));
            await atomicJson(backup, current.values);
            // Recheck external edits after backup I/O, before publishing.
            if ((await snapshot()).revision !== current.revision) throw new HttpError(409, '配置已被其他操作修改，请刷新');
            await atomicJson(file, stored);
            for (const item of CONFIG_FIELDS) if (!item.restartRequired) config[item.key] = checked.next[item.key];
            audit(rollback ? 'config.rollback' : 'config.save', actor, 'admin-config', 'succeeded', { keys: checked.changes.map(item => item.key) });
            return { msg: rollback ? '配置已回滚' : '配置已保存', config: await snapshot(), changes: checked.changes };
        } finally { saving = false; }
    }
    return { snapshot, validate, save, async export() { return (await snapshot()).values; } };
}
