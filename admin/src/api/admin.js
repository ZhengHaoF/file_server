import { http } from '../lib/http.js'

// Auth
export const login = (token, opts) => http.post('/api/auth/login', { token }, { ...opts, skipAuthHandler: true })
export const getSession = (opts) => http.get('/api/auth/session', { timeout: 8000, ...opts, skipAuthHandler: true })
export const logout = (opts) => http.post('/api/auth/logout', {}, { ...opts, skipAuthHandler: true })
export const listSessions = (opts) => http.get('/api/admin/sessions', opts)
export const revokeSession = (id, opts) => http.del(`/api/admin/sessions/${encodeURIComponent(id)}`, opts)

// Overview
export const getStatus = (opts) => http.get('/api/admin/status', opts)
export const restartServer = (opts) => http.post('/api/admin/restart', {}, opts)

// Cache
export const getCacheStats = (opts) => http.get('/api/admin/cache/stats', { ...opts, query: { refresh: 'true' } })
export const startCacheJob = (payload, opts) => http.post('/api/admin/cache/jobs', payload, opts)

// Operations
export const listJobs = ({ limit = 25, before } = {}, opts) => http.get('/api/admin/jobs', { ...opts, query: { limit, before } })
export const getJob = (id, opts) => http.get(`/api/admin/jobs/${encodeURIComponent(id)}`, opts)
export const listAudit = ({ limit = 50, before } = {}, opts) => http.get('/api/admin/audit', { ...opts, query: { limit, before } })

// Logs
export const getLogs = (query, opts) => http.get('/api/admin/logs', { ...opts, query })
export const exportLogs = (query, opts) => http.get('/api/admin/logs/export', { timeout: 60000, ...opts, query, responseType: 'blob' })

// Config
export const getConfig = (opts) => http.get('/api/admin/config', opts)
export const validateConfig = (payload, opts) => http.post('/api/admin/config/validate', payload, opts)
export const saveConfig = (payload, opts) => http.put('/api/admin/config', payload, opts)
export const rollbackConfig = (revision, opts) => http.post('/api/admin/config/rollback', { revision }, opts)
export const exportConfig = (opts) => http.get('/api/admin/config/export', { ...opts, responseType: 'blob' })
