import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiUrl, wsUrl, normalizeBase, isCrossOrigin } from '../lib/env.js'
import { request, setTransport, setBearer, onUnauthorized, ApiError, filenameFrom } from '../lib/http.js'
import { createLatest } from '../lib/latest.js'
import { formatBytes, formatRelative, formatDuration } from '../lib/format.js'
import { jsonResponse } from './helpers.js'

describe('env prefix helpers', () => {
  it('normalises prefix and joins absolute paths', () => {
    expect(normalizeBase('')).toBe('')
    expect(normalizeBase('/')).toBe('')
    expect(normalizeBase('/nas/')).toBe('/nas')
    expect(apiUrl('/api/admin/status', '')).toBe('/api/admin/status')
    expect(apiUrl('/api/admin/status', '/nas')).toBe('/nas/api/admin/status')
    expect(() => apiUrl('api/x', '')).toThrow()
  })
  it('derives same-origin ws/wss URLs from page protocol', () => {
    expect(wsUrl('/api/admin/logs/stream', '', { protocol: 'https:', host: 'nas:3443' })).toBe('wss://nas:3443/api/admin/logs/stream')
    expect(wsUrl('/api/admin/logs/stream', '/p', { protocol: 'http:', host: 'nas:3000' })).toBe('ws://nas:3000/p/api/admin/logs/stream')
    expect(wsUrl('/api/x', 'https://api.example', { protocol: 'http:', host: 'a' })).toBe('wss://api.example/api/x')
  })
  it('detects cross origin bases', () => {
    expect(isCrossOrigin('/p', { origin: 'http://a' })).toBe(false)
    expect(isCrossOrigin('http://b:1', { origin: 'http://a' })).toBe(true)
  })
})

describe('http request', () => {
  let handler
  beforeEach(() => { handler = vi.fn(); onUnauthorized(handler); setBearer(null) })

  it('sends in-memory bearer, query and honours signal', async () => {
    const transport = vi.fn(async () => jsonResponse(200, { ok: 1 }))
    setTransport(transport)
    setBearer('tok')
    const ctl = new AbortController()
    const res = await request('GET', '/api/admin/logs', { query: { level: 'error', keyword: '', before: 5 }, signal: ctl.signal })
    expect(res).toEqual({ ok: 1 })
    const [url, init] = transport.mock.calls[0]
    expect(url).toBe('/api/admin/logs?level=error&before=5')
    expect(init.headers.Authorization).toBe('Bearer tok')
    expect(init.signal).toBeInstanceOf(AbortSignal)
    expect(init.credentials).toBe('same-origin')
  })

  it('401 triggers the unauthorized handler exactly once', async () => {
    setTransport(async () => jsonResponse(401, { msg: '未登录' }))
    await expect(request('GET', '/api/admin/status')).rejects.toMatchObject({ kind: 'auth', status: 401 })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('skipAuthHandler suppresses the handler', async () => {
    setTransport(async () => jsonResponse(401, {}))
    await expect(request('GET', '/api/auth/session', { skipAuthHandler: true })).rejects.toBeInstanceOf(ApiError)
    expect(handler).not.toHaveBeenCalled()
  })

  it('503 and network failures never trigger logout', async () => {
    setTransport(async () => jsonResponse(503, { msg: 'busy' }))
    await expect(request('GET', '/api/admin/status')).rejects.toMatchObject({ kind: 'http', status: 503 })
    setTransport(async () => { throw new TypeError('Failed to fetch') })
    await expect(request('GET', '/api/admin/status')).rejects.toMatchObject({ kind: 'network' })
    expect(handler).not.toHaveBeenCalled()
  })

  it('aborting rejects with kind abort and forwards to transport', async () => {
    let seen
    setTransport((url, init) => new Promise((_, reject) => { seen = init.signal; init.signal.addEventListener('abort', () => reject(new DOMException('x', 'AbortError'))) }))
    const ctl = new AbortController()
    const p = request('GET', '/api/admin/logs', { signal: ctl.signal })
    await Promise.resolve(); await Promise.resolve()
    ctl.abort()
    await expect(p).rejects.toMatchObject({ kind: 'abort' })
    expect(seen.aborted).toBe(true)
  })

  it('times out as kind timeout', async () => {
    setTransport((url, init) => new Promise((_, reject) => init.signal.addEventListener('abort', () => reject(new DOMException('x', 'AbortError')))))
    await expect(request('GET', '/api/x', { timeout: 10 })).rejects.toMatchObject({ kind: 'timeout' })
  })

  it('timeout also covers a stalled response body', async () => {
    setTransport((url, init) => Promise.resolve({
      ok: true, status: 200, headers: new Headers(),
      text: () => new Promise((_, reject) => init.signal.addEventListener('abort', () => reject(new DOMException('x', 'AbortError'))))
    }))
    await expect(request('GET', '/api/x', { timeout: 15 })).rejects.toMatchObject({ kind: 'timeout' })
  })

  it('returns blobs with filename from Content-Disposition', async () => {
    setTransport(async () => new Response('a,b', { status: 200, headers: { 'Content-Disposition': 'attachment; filename="logs.csv"', 'X-Export-Truncated': 'true' } }))
    const res = await request('GET', '/api/admin/logs/export', { responseType: 'blob' })
    expect(res.filename).toBe('logs.csv')
    expect(res.truncated).toBe(true)
    expect(await res.blob.text()).toBe('a,b')
    expect(filenameFrom("attachment; filename*=UTF-8''%E6%97%A5%E5%BF%97.json")).toBe('日志.json')
  })
})

describe('createLatest', () => {
  it('aborts previous and marks it stale', () => {
    const l = createLatest()
    const a = l.begin()
    const b = l.begin()
    expect(a.signal.aborted).toBe(true)
    expect(a.isCurrent()).toBe(false)
    expect(b.isCurrent()).toBe(true)
    l.cancel()
    expect(b.isCurrent()).toBe(false)
  })
})

describe('format', () => {
  it('never renders missing values as zero', () => {
    expect(formatBytes(undefined)).toBe('—')
    expect(formatBytes(null)).toBe('—')
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatDuration(90061)).toBe('1 天 1 小时')
    expect(formatRelative(1000, 31000)).toBe('30 秒前')
  })
})
