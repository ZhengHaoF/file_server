import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setTransport, getBearer } from '../lib/http.js'
import { auth } from '../stores/auth.js'
import { createAppRouter, safeRedirect } from '../router/index.js'
import { jsonResponse, deferred } from './helpers.js'

function routeTransport(map) {
  const calls = []
  setTransport(async (url, init) => {
    calls.push([init.method, url, init])
    const key = `${init.method} ${url.split('?')[0]}`
    const h = map[key]
    if (!h) return jsonResponse(404, { msg: 'nope' })
    return typeof h === 'function' ? h(init) : h
  })
  return calls
}

beforeEach(() => auth._reset())

describe('auth store', () => {
  it('an old session response cannot reauthenticate after local revocation', async () => {
    const pending = deferred()
    setTransport(() => pending.promise)
    const checking = auth.checkSession()
    await Promise.resolve()
    auth.signedOutRemotely('revoked')
    pending.resolve(jsonResponse(200, { role: 'admin', sessionId: 'revoked-session' }))
    await checking
    expect(auth.state.status).toBe('anonymous')
    expect(auth.state.sessionId).toBe(null)
    expect(getBearer()).toBe(null)
  })
  it('network failure is unreachable, not signed out', async () => {
    setTransport(async () => { throw new TypeError('fail') })
    expect(await auth.checkSession()).toBe('unreachable')
    expect(auth.state.status).toBe('unreachable')
  })

  it('network failure after authentication keeps the session', async () => {
    routeTransport({ 'GET /api/auth/session': jsonResponse(200, { role: 'admin', sessionId: 's1', expiresAt: 1 }) })
    expect(await auth.checkSession()).toBe('authenticated')
    setTransport(async () => jsonResponse(503, {}))
    expect(await auth.checkSession()).toBe('unreachable')
    expect(auth.state.status).toBe('authenticated')
  })

  it('401 signs out and notifies listeners', async () => {
    const listener = vi.fn()
    auth.onSignOut(listener)
    routeTransport({ 'GET /api/auth/session': jsonResponse(401, {}) })
    expect(await auth.checkSession()).toBe('anonymous')
    expect(listener).toHaveBeenCalled()
  })

  it('login keeps the session token in memory only and rejects non-admin roles', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    const calls = routeTransport({
      'POST /api/auth/login': (init) => jsonResponse(200, JSON.parse(init.body).token === 'good' ? { role: 'admin', sessionToken: 'S', expiresAt: 5 } : { role: 'read', sessionToken: 'R' }),
      'POST /api/auth/logout': jsonResponse(200, { msg: 'ok' }),
      'GET /api/auth/session': jsonResponse(200, { role: 'admin', sessionId: 'id1' })
    })
    await expect(auth.login('weak')).rejects.toMatchObject({ kind: 'forbidden' })
    const revoke = calls.find(([m, u]) => m === 'POST' && u === '/api/auth/logout')
    expect(revoke[2].headers.Authorization).toBe('Bearer R')
    expect(getBearer()).toBe(null)
    await auth.login('good')
    expect(getBearer()).toBe('S')
    expect(auth.state.status).toBe('authenticated')
    expect(setItem).not.toHaveBeenCalled()
  })

  it('logout clears local state and reports an unconfirmed server logout', async () => {
    const nav = vi.fn()
    auth.setNavigator(nav)
    routeTransport({ 'POST /api/auth/login': jsonResponse(200, { role: 'admin', sessionToken: 'S' }), 'GET /api/auth/session': jsonResponse(200, { role: 'admin' }) })
    await auth.login('x')
    setTransport(async () => { throw new TypeError('down') })
    const { serverError } = await auth.logout()
    expect(serverError).toBeTruthy()
    expect(getBearer()).toBe(null)
    expect(auth.state.status).toBe('anonymous')
    expect(nav).toHaveBeenCalledWith({ reason: 'logout-unconfirmed' })
  })
})

describe('router guard', () => {
  it('redirects anonymous users to login with the requested path', async () => {
    routeTransport({ 'GET /api/auth/session': jsonResponse(401, {}) })
    const router = createAppRouter({ memory: true })
    await router.push('/logs?level=error')
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/logs?level=error')
  })

  it('does not bounce to login when the server is unreachable', async () => {
    setTransport(async () => { throw new TypeError('down') })
    const router = createAppRouter({ memory: true })
    await router.push('/cache')
    expect(router.currentRoute.value.name).toBe('cache')
  })

  it('sends authenticated users away from login and maps legacy/unknown paths', async () => {
    routeTransport({ 'GET /api/auth/session': jsonResponse(200, { role: 'admin' }) })
    const router = createAppRouter({ memory: true })
    await router.push('/login?redirect=/config')
    expect(router.currentRoute.value.name).toBe('config')
    await router.push('/dashboard')
    expect(router.currentRoute.value.name).toBe('overview')
    await router.push('/no/such/page')
    expect(router.currentRoute.value.name).toBe('not-found')
  })

  it('401 during use navigates to login keeping the path', async () => {
    routeTransport({ 'GET /api/auth/session': jsonResponse(200, { role: 'admin' }), 'GET /api/admin/status': jsonResponse(401, {}) })
    const router = createAppRouter({ memory: true })
    await router.push('/sessions')
    const { getStatus } = await import('../api/admin.js')
    await expect(getStatus()).rejects.toBeTruthy()
    await new Promise((r) => setTimeout(r, 0))
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query).toMatchObject({ reason: 'expired', redirect: '/sessions' })
  })

  it('safeRedirect rejects open redirects', () => {
    expect(safeRedirect('//evil.com')).toBe('/overview')
    expect(safeRedirect('https://evil.com')).toBe('/overview')
    expect(safeRedirect('/\\evil')).toBe('/overview')
    expect(safeRedirect('/logs')).toBe('/logs')
  })
})
