// Isolated in-browser demo backend. Loaded ONLY when VITE_ADMIN_PREVIEW=1 (dynamic import in
// lib/http.js behind a build-time constant), so production bundles never contain it.
// All data here is synthetic and clearly labelled by the demo banner.
import { API_BASE, PREVIEW_TOKEN } from '../lib/env.js'

const MB = 1024 * 1024
const rand = (a, b) => a + Math.random() * (b - a)
const iso = (t = Date.now()) => new Date(t).toISOString()
const sid = () => Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10)

const db = {
  bootId: sid(),
  bootAt: Date.now() - 3 * 86400e3 - 4 * 3600e3,
  downUntil: 0,
  sessions: new Map(), // token -> session
  history: [],
  cache: { image: [1842, 612 * MB], video: [233, 148 * MB], legacy: [57, 21 * MB] },
  lastCleanupAt: iso(Date.now() - 26 * 3600e3),
  jobs: [],
  audit: [],
  logs: [],
  logSeq: 1000,
  jobSeq: 40,
  auditSeq: 300,
  revision: 7,
  values: {
    rootPath: '/srv/share', host: '0.0.0.0', port: 3000, httpsEnabled: false, httpsPort: 3443,
    publicRead: false, writeEnabled: true, uploadEnabled: true, uploadMaxSizeMB: 2048,
    allowedOrigins: ['http://nas.local:3000'], secureCookies: false,
    cacheMaxSizeMB: 2048, cacheRetentionDays: 30, autoCleanupEnabled: true
  },
  backup: null,
  pendingRestart: []
}

const FIELDS = [
  { key: 'rootPath', label: '共享根目录', type: 'string', group: 'basic', help: '对外共享的目录绝对路径。', restartRequired: true, readonly: false, source: 'file' },
  { key: 'host', label: '监听地址', type: 'string', group: 'basic', help: '0.0.0.0 表示所有网卡；127.0.0.1 仅本机。', restartRequired: true, readonly: false, source: 'file' },
  { key: 'port', label: 'HTTP 端口', type: 'number', group: 'basic', help: '', restartRequired: true, readonly: true, source: 'env', min: 1, max: 65535 },
  { key: 'httpsEnabled', label: '启用 HTTPS', type: 'boolean', group: 'basic', help: '需要证书文件位于 cert/ 目录。', restartRequired: true, readonly: false, source: 'file' },
  { key: 'httpsPort', label: 'HTTPS 端口', type: 'number', group: 'basic', help: '', restartRequired: true, readonly: false, source: 'file', min: 1, max: 65535 },
  { key: 'publicRead', label: '匿名只读', type: 'boolean', group: 'access', help: '允许未登录用户浏览和下载。', restartRequired: false, readonly: false, source: 'file' },
  { key: 'writeEnabled', label: '允许写入', type: 'boolean', group: 'access', help: '新建目录、重命名与删除。', restartRequired: false, readonly: false, source: 'file' },
  { key: 'uploadEnabled', label: '允许上传', type: 'boolean', group: 'access', help: '', restartRequired: false, readonly: false, source: 'file' },
  { key: 'uploadMaxSizeMB', label: '单文件上传上限（MB）', type: 'number', group: 'access', help: '下一次上传立即生效。', restartRequired: false, readonly: false, source: 'file', min: 1, max: 102400 },
  { key: 'allowedOrigins', label: '来源白名单', type: 'origins', group: 'access', help: '允许跨域访问的来源，每行一个。', restartRequired: false, readonly: false, source: 'file' },
  { key: 'secureCookies', label: '仅 HTTPS 发送 Cookie', type: 'boolean', group: 'access', help: '通过 TLS 反向代理访问时开启。', restartRequired: false, readonly: false, source: 'file' },
  { key: 'cacheMaxSizeMB', label: '缓存容量上限（MB）', type: 'number', group: 'cache', help: '0 表示不限容量；启用自动维护后按最近访问淘汰。', restartRequired: false, readonly: false, source: 'file', min: 0, max: 1048576 },
  { key: 'cacheRetentionDays', label: '缓存保留天数', type: 'number', group: 'cache', help: '', restartRequired: false, readonly: false, source: 'file', min: 1, max: 3650 },
  { key: 'autoCleanupEnabled', label: '自动清理', type: 'boolean', group: 'cache', help: '每分钟检查缓存策略。此预览中的维护仅模拟执行。', restartRequired: false, readonly: false, source: 'file' }
]

const CATS = ['http', 'auth', 'preview', 'upload', 'cache', 'system']
const MSGS = [
  ['info', 'http', 'GET /api/files?path=%2F照片%2F2026 200 18ms'],
  ['info', 'preview', '生成缩略图 照片/2026/IMG_2041.jpg (312 KB)'],
  ['info', 'upload', '上传完成 文档/报告-Q3.pdf (4.2 MB)'],
  ['warn', 'preview', '视频截图超时，已跳过 影片/家庭录像-07.mkv'],
  ['info', 'auth', '管理会话登录成功'],
  ['debug', 'cache', '缓存命中率 93.1%（最近 5 分钟）'],
  ['error', 'http', 'GET /api/download 文件不存在：备份/旧版.zip'],
  ['info', 'system', '磁盘使用率检查完成']
]

function pushLog(t = Date.now(), pick = null) {
  const [level, category, message] = pick || MSGS[Math.floor(Math.random() * MSGS.length)]
  db.logs.unshift({ id: ++db.logSeq, timestamp: iso(t), level, category, message, source: Math.random() < 0.08 ? 'supervisor' : 'application' })
  if (db.logs.length > 3000) db.logs.length = 3000
}
function audit(action, target, result = 'success', details = null) {
  db.audit.unshift({ id: ++db.auditSeq, createdAt: iso(), action, actor: 'admin@demo', target, result, details })
}

// Seed
;(function seed() {
  const now = Date.now()
  for (let i = 60; i > 0; i--) db.history.push({ time: iso(now - i * 10000), cpu: rand(6, 28), memory: rand(41, 47), processRss: rand(118, 142) * MB })
  for (let i = 600; i > 0; i--) pushLog(now - i * 37000)
  db.jobs.push(
    { id: ++db.jobSeq, type: 'cache-expired', status: 'succeeded', createdAt: iso(now - 26 * 3600e3), startedAt: iso(now - 26 * 3600e3 + 400), finishedAt: iso(now - 26 * 3600e3 + 5200), progress: { processed: 412, total: 412 }, result: { cleaned: 386, freedBytes: 214 * MB, failed: 0 }, error: null },
    { id: ++db.jobSeq, type: 'cache-policy', status: 'interrupted', createdAt: iso(now - 4 * 86400e3), startedAt: iso(now - 4 * 86400e3 + 300), finishedAt: iso(now - 4 * 86400e3 + 2100), progress: { processed: 120, total: 980 }, result: { cleaned: 118, freedBytes: 61 * MB, failed: 2 }, error: '服务重启，任务中断' }
  )
  db.jobs.reverse()
  ;[['login', 'session', 'success'], ['config.update', 'cacheRetentionDays', 'success', { before: 14, after: 30 }], ['login', 'session', 'failure', { reason: 'invalid token' }], ['cache.job', `job:${db.jobs[0].id}`, 'success']].forEach((a) => audit(...a))
  const others = [['read', '192.168.1.24', 5], ['admin', '192.168.1.8', 90]]
  for (const [role, ip, ageMin] of others) db.sessions.set(sid(), { id: sid(), role, ip, createdAt: iso(now - ageMin * 60e3), lastSeenAt: iso(now - rand(1, 20) * 60e3), expiresAt: iso(now + 6 * 3600e3) })
})()

// Background drift: logs + history samples.
let lastTick = Date.now()
function advance() {
  const now = Date.now()
  while (now - lastTick > 2500) { lastTick += 2500; if (Math.random() < 0.8) pushLog(lastTick) }
  const last = db.history[db.history.length - 1]
  if (!last || now - new Date(last.time).getTime() >= 10000) {
    db.history.push({ time: iso(now), cpu: rand(5, 35), memory: rand(41, 48), processRss: rand(118, 150) * MB })
    if (db.history.length > 60) db.history.shift()
  }
  for (const job of db.jobs) {
    if (job.status === 'queued' && now - new Date(job.createdAt).getTime() > 800) { job.status = 'running'; job.startedAt = iso() }
    if (job.status === 'running') {
      job.progress.processed = Math.min(job.progress.total, job.progress.processed + Math.ceil(job.progress.total / 8))
      if (job.progress.processed >= job.progress.total) finishJob(job)
    }
  }
}

function finishJob(job) {
  const share = job.mode === 'all' ? 1 : job.mode === 'policy' ? 0.25 : 0.4
  let cleaned = 0
  let freed = 0
  for (const k of Object.keys(db.cache)) {
    const [c, s] = db.cache[k]
    const dc = Math.round(c * share)
    const ds = Math.round(s * share)
    cleaned += dc
    freed += ds
    db.cache[k] = [c - dc, s - ds]
  }
  job.status = 'succeeded'
  job.finishedAt = iso()
  job.result = { cleaned, freedBytes: freed, failed: job.mode === 'all' ? 0 : Math.round(Math.random()) }
  db.lastCleanupAt = job.finishedAt
}

function json(status, body, headers = {}) {
  return new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } })
}

function sessionOf(init) {
  const auth = init?.headers?.Authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  return token ? db.sessions.get(token) : null
}

function statusPayload() {
  const last = db.history[db.history.length - 1]
  const running = db.jobs.some((j) => j.status === 'running' || j.status === 'queued')
  const total = 16384
  const used = (last.memory / 100) * total
  return {
    sampledAt: iso(), bootId: db.bootId,
    cpu: { usage: last.cpu, cores: 4, warmingUp: false },
    memory: { total, free: total - used, used, usage: last.memory, scope: 'host' },
    disk: { total: 3726, used: 2981, free: 745, usage: 80.0, available: true, scope: 'shared-filesystem' },
    process: { rss: last.processRss, heapUsed: null, heapTotal: null },
    server: { uptime: (Date.now() - db.bootAt) / 1000, runtime: 'Rust', version: '0.2.0', httpPort: db.values.port, httpsPort: db.values.httpsPort, httpStatus: 'running', httpsStatus: db.values.httpsEnabled ? 'running' : 'disabled', restartSupported: true, deployment: 'supervisor' },
    queues: { image: { active: Math.round(rand(0, 2)), pending: Math.round(rand(0, 6)), limit: 2 }, video: { active: 0, pending: 0, limit: 1 }, upload: { active: Math.round(rand(0, 1)), pending: 0, limit: 4 }, maintenance: running ? { active: true, status: '清理中' } : { active: false, status: 'idle' } },
    history: db.history.slice(),
    alerts: [{ level: 'warning', message: '共享目录所在磁盘已使用 80%，可用空间 745 GB。' }]
  }
}

function cachePayload() {
  const c = db.cache
  const totalSize = c.image[1] + c.video[1] + c.legacy[1]
  const running = db.jobs.find((j) => j.status === 'running' || j.status === 'queued')
  return {
    sampledAt: iso(), totalFiles: c.image[0] + c.video[0] + c.legacy[0], totalSize,
    imageCache: { count: c.image[0], size: c.image[1] }, videoCache: { count: c.video[0], size: c.video[1] }, legacyCache: { count: c.legacy[0], size: c.legacy[1] },
    dbSize: 4.2 * MB, database: { main: 4.2 * MB, wal: 0.6 * MB, shm: 32768, total: 4.83 * MB, recordCount: c.image[0] + c.video[0] },
    policy: { cacheMaxSizeMB: db.values.cacheMaxSizeMB, cacheRetentionDays: db.values.cacheRetentionDays, autoCleanupEnabled: db.values.autoCleanupEnabled },
    maintenance: running ? { active: true, status: '清理中' } : { active: false, status: 'idle' }, lastCleanupAt: db.lastCleanupAt
  }
}

function configPayload() {
  return {
    ...db.values, port: db.values.port, adminToken: '******', accessToken: '******', dbPath: './data/cache.db', cachePath: './cache', logPath: './logs/app.log',
    revision: db.revision, values: { ...db.values }, fields: FIELDS, pendingRestart: db.pendingRestart.slice(), backupAvailable: !!db.backup
  }
}

function diff(values) {
  const changes = []
  const errors = {}
  for (const f of FIELDS) {
    if (f.readonly || !(f.key in values)) continue
    const v = values[f.key]
    if (f.type === 'number' && (typeof v !== 'number' || !Number.isFinite(v) || (f.min !== undefined && v < f.min) || (f.max !== undefined && v > f.max))) errors[f.key] = `必须是 ${f.min}–${f.max} 之间的数字`
    if (f.key === 'rootPath' && (!String(v).startsWith('/') || String(v).length < 2)) errors[f.key] = '必须是存在的绝对路径（演示：以 / 开头）'
    if (JSON.stringify(v) !== JSON.stringify(db.values[f.key])) changes.push({ key: f.key, before: db.values[f.key], after: v, restartRequired: f.restartRequired })
  }
  const warnings = []
  if (values.host === '0.0.0.0' && values.publicRead) warnings.push('匿名只读与全网卡监听同时开启，局域网内任何人都能浏览共享目录。')
  if (values.httpsEnabled === false && values.secureCookies === true) warnings.push('未启用 HTTPS 时开启“仅 HTTPS 发送 Cookie”，直接 HTTP 访问将无法登录。')
  return { changes, errors, warnings }
}

function filteredLogs(q) {
  const level = q.get('level')
  const kw = (q.get('keyword') || '').toLowerCase()
  const source = q.get('source')
  const start = q.get('start') ? Date.parse(q.get('start')) : null
  const end = q.get('end') ? Date.parse(q.get('end')) : null
  return db.logs.filter((l) => (!level || l.level === level) && (!source || l.source === source) && (!kw || l.message.toLowerCase().includes(kw) || l.category.includes(kw))
    && (start === null || Date.parse(l.timestamp) >= start) && (end === null || Date.parse(l.timestamp) <= end))
}

function page(list, q, key, limitDefault) {
  const limit = Math.min(500, Number(q.get('limit')) || limitDefault)
  const before = q.get('before')
  const from = before ? list.findIndex((x) => String(x.id) === before) + 1 : 0
  const slice = list.slice(from, from + limit)
  return { [key]: slice, next: from + limit < list.length && slice.length ? slice[slice.length - 1].id : null }
}

async function route(method, path, q, body, init) {
  advance()
  if (Date.now() < db.downUntil) throw new TypeError('Failed to fetch')

  if (path === '/api/auth/login' && method === 'POST') {
    if (body?.token !== PREVIEW_TOKEN) return json(401, { msg: '令牌无效（演示模式请使用演示令牌）' })
    const token = sid() + sid()
    const s = { id: sid(), role: 'admin', ip: '127.0.0.1', createdAt: iso(), lastSeenAt: iso(), expiresAt: iso(Date.now() + 12 * 3600e3), token }
    db.sessions.set(token, s)
    audit('login', 'session')
    return json(200, { role: 'admin', sessionToken: token, readTicket: sid(), expiresAt: Date.parse(s.expiresAt), ticketExpiresAt: Date.now() + 300e3 })
  }
  const session = sessionOf(init)
  if (!session) return json(401, { msg: '未登录或会话已过期' })
  session.lastSeenAt = iso()

  if (path === '/api/auth/session') return json(200, { role: session.role, expiresAt: Date.parse(session.expiresAt), sessionId: session.id })
  if (path === '/api/auth/logout') { db.sessions.delete(session.token); audit('logout', 'session'); return json(200, { msg: '已退出' }) }

  if (path === '/api/admin/sessions' && method === 'GET') {
    return json(200, { sessions: [...db.sessions.values()].map(({ token, ...s }) => ({ ...s, current: s.id === session.id })) })
  }
  const sm = /^\/api\/admin\/sessions\/(.+)$/.exec(path)
  if (sm && method === 'DELETE') {
    const entry = [...db.sessions.entries()].find(([, s]) => s.id === decodeURIComponent(sm[1]))
    if (!entry) return json(404, { msg: '会话不存在' })
    db.sessions.delete(entry[0])
    audit('session.revoke', `session:${entry[1].id.slice(0, 8)}`)
    return json(200, { msg: '已撤销', current: entry[1].id === session.id })
  }

  if (path === '/api/admin/status') return json(200, statusPayload())
  if (path === '/api/admin/restart' && method === 'POST') {
    audit('restart', 'server')
    setTimeout(() => {
      db.downUntil = Date.now() + 6000
      db.bootId = sid()
      db.bootAt = Date.now() + 6000
      db.sessions.clear()
      db.pendingRestart = []
      db.history = db.history.slice(-3)
      pushLog(Date.now() + 6000, ['info', 'system', '服务已启动（演示重启）'])
    }, 1200)
    return json(202, { msg: '重启请求已接受', bootId: db.bootId })
  }

  if (path === '/api/admin/cache/stats') return json(200, cachePayload())
  if (path === '/api/admin/cache/jobs' && method === 'POST') {
    if (db.jobs.some((j) => j.status === 'running' || j.status === 'queued')) return json(409, { msg: '已有维护任务在运行' })
    if (!['expired', 'all', 'policy'].includes(body?.mode)) return json(400, { msg: '无效的清理方式' })
    const total = db.cache.image[0] + db.cache.video[0] + db.cache.legacy[0]
    const job = { id: ++db.jobSeq, type: `cache-${body.mode}`, mode: body.mode, status: 'queued', createdAt: iso(), startedAt: null, finishedAt: null, progress: { processed: 0, total }, result: null, error: null }
    db.jobs.unshift(job)
    audit('cache.job', `job:${job.id}`, 'success', { mode: body.mode, days: body.days })
    return json(202, { job: { ...job } })
  }
  if (path === '/api/admin/jobs') { const p = page(db.jobs, q, 'jobs', 25); return json(200, { jobs: p.jobs.map((j) => ({ ...j })), nextBefore: p.next }) }
  const jm = /^\/api\/admin\/jobs\/(\d+)$/.exec(path)
  if (jm) { const j = db.jobs.find((x) => x.id === Number(jm[1])); return j ? json(200, { job: { ...j, progress: { ...j.progress } } }) : json(404, { msg: '任务不存在' }) }
  if (path === '/api/admin/audit') { const p = page(db.audit, q, 'entries', 50); return json(200, { entries: p.entries, nextBefore: p.next }) }

  if (path === '/api/admin/logs') {
    const p = page(filteredLogs(q), q, 'logs', 100)
    return json(200, { logs: p.logs, nextCursor: p.next, total: p.logs.length })
  }
  if (path === '/api/admin/logs/export') {
    const all = filteredLogs(q)
    const list = all.slice(0, 10000)
    const fmt = q.get('format') === 'json' ? 'json' : 'csv'
    const text = fmt === 'json' ? JSON.stringify(list, null, 2) : ['timestamp,level,category,source,message', ...list.map((l) => [l.timestamp, l.level, l.category, l.source, `"${l.message.replace(/"/g, '""')}"`].join(','))].join('\n')
    return new Response(text, { status: 200, headers: { 'Content-Type': fmt === 'json' ? 'application/json' : 'text/csv', 'Content-Disposition': `attachment; filename="demo-logs.${fmt}"`, 'X-Export-Truncated': String(all.length > 10000) } })
  }

  if (path === '/api/admin/config' && method === 'GET') return json(200, configPayload())
  if (path === '/api/admin/config/export') {
    return new Response(JSON.stringify({ exportedAt: iso(), demo: true, values: db.values }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json', 'Content-Disposition': 'attachment; filename="demo-config.json"' } })
  }
  if ((path === '/api/admin/config/validate' && method === 'POST') || (path === '/api/admin/config' && method === 'PUT')) {
    if (body?.revision !== db.revision) return json(409, { msg: '配置版本已变化' })
    const { changes, errors, warnings } = diff(body.values || {})
    if (Object.keys(errors).length) return json(400, { msg: '配置校验失败', errors })
    if (method === 'POST') return json(200, { valid: true, changes, warnings })
    db.backup = { ...db.values }
    for (const c of changes) {
      db.values[c.key] = c.after
      if (c.restartRequired && !db.pendingRestart.includes(c.key)) db.pendingRestart.push(c.key)
    }
    db.revision++
    audit('config.update', changes.map((c) => c.key).join(','), 'success', { count: changes.length })
    return json(200, { msg: '配置已保存', config: configPayload(), changes })
  }
  if (path === '/api/admin/config/rollback' && method === 'POST') {
    if (!db.backup) return json(409, { msg: '没有可用的备份' })
    if (body?.revision !== db.revision) return json(409, { msg: '配置版本已变化' })
    db.values = { ...db.backup }
    db.backup = null
    db.revision++
    audit('config.rollback', 'config')
    return json(200, { msg: '已恢复到上一次保存前的配置', config: configPayload() })
  }
  return json(404, { msg: `演示后端未实现 ${method} ${path}` })
}

/** fetch-compatible transport honoring AbortSignal and simulated latency. */
export async function previewFetch(url, init = {}) {
  const u = new URL(url, globalThis.location?.origin || 'http://localhost')
  let path = u.pathname
  const base = API_BASE && !/^https?:/i.test(API_BASE) ? API_BASE : API_BASE ? new URL(API_BASE).pathname : ''
  if (base && path.startsWith(base)) path = path.slice(base.length)
  const method = (init.method || 'GET').toUpperCase()
  const body = init.body ? JSON.parse(init.body) : undefined
  await new Promise((resolve, reject) => {
    const t = setTimeout(resolve, rand(120, 420))
    init.signal?.addEventListener('abort', () => { clearTimeout(t); reject(new DOMException('Aborted', 'AbortError')) }, { once: true })
  })
  if (init.signal?.aborted) throw new DOMException('Aborted', 'AbortError')
  return route(method, path, u.searchParams, body, init)
}
