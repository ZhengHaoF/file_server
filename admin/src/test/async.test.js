import { describe, it, expect, vi } from 'vitest'
import { useResource } from '../composables/useResource.js'
import { monitorRestart } from '../lib/restartMonitor.js'
import { createLiveLog } from '../lib/logLive.js'
import { ApiError } from '../lib/http.js'
import { deferred, flush } from './helpers.js'

describe('useResource', () => {
  it('ignores out-of-order responses (latest wins) and aborts the stale one', async () => {
    const calls = []
    const r = useResource(({ signal }) => { const d = deferred(); calls.push({ d, signal }); return d.promise }, { immediate: false })
    r.load(); r.load()
    expect(calls[0].signal.aborted).toBe(true)
    calls[1].d.resolve({ v: 'new' })
    await flush()
    calls[0].d.resolve({ v: 'old' })
    await flush()
    expect(r.data.value).toEqual({ v: 'new' })
  })

  it('keeps last good data on failure and flags it stale', async () => {
    let fail = false
    const r = useResource(async () => { if (fail) throw new ApiError('x', { kind: 'network' }); return { sampledAt: '2026-01-01T00:00:00Z', cpu: 3 } }, { immediate: false })
    await r.load()
    expect(r.stale.value).toBe(false)
    fail = true
    await r.load()
    expect(r.data.value.cpu).toBe(3)
    expect(r.stale.value).toBe(true)
    expect(r.sampledAt.value).toBe('2026-01-01T00:00:00Z')
  })
})

describe('monitorRestart', () => {
  const sleep = () => Promise.resolve()
  it('reports restarting then restored-login on 401', async () => {
    const phases = []
    const seq = [() => { throw new ApiError('n', { kind: 'network' }) }, () => { throw new ApiError('a', { kind: 'auth', status: 401 }) }]
    const result = await monitorRestart({ previousBootId: 'a', checkSession: async () => seq.shift()(), getBootId: async () => 'a', onPhase: (p) => phases.push(p.phase), sleep })
    expect(result).toBe('restored-login')
    expect(phases).toEqual(['waiting', 'restarting', 'restored-login'])
  })
  it('does not claim success while the old process still answers', async () => {
    const boots = ['a', 'a', 'b']
    const result = await monitorRestart({ previousBootId: 'a', checkSession: async () => ({}), getBootId: async () => boots.shift(), sleep })
    expect(result).toBe('restored')
    expect(boots).toEqual([])
  })
  it('times out', async () => {
    const result = await monitorRestart({ previousBootId: 'a', checkSession: async () => { throw new ApiError('n', { kind: 'network' }) }, getBootId: async () => 'a', sleep: (ms) => new Promise((r) => setTimeout(r, 2)), timeout: 10 })
    expect(result).toBe('timeout')
  })
})

class FakeWS {
  static all = []
  constructor(url) { this.url = url; FakeWS.all.push(this) }
  close() { this.closed = true }
}

describe('createLiveLog', () => {
  it('reconnects with backoff, stops on 1008, and stop() cancels reconnects', async () => {
    vi.useFakeTimers()
    FakeWS.all = []
    const states = []
    const auth = vi.fn()
    const entries = vi.fn()
    const live = createLiveLog({ WebSocketImpl: FakeWS, url: 'ws://x', onState: (s) => states.push(s), onEntries: entries, onAuthProblem: auth })
    live.start()
    const ws1 = FakeWS.all[0]
    ws1.onopen()
    ws1.onmessage({ data: JSON.stringify({ id: 1, message: 'hi', timestamp: 't' }) })
    expect(entries).toHaveBeenCalledWith([{ id: 1, message: 'hi', timestamp: 't' }])
    ws1.onclose({ code: 1006 })
    expect(states.at(-1)).toBe('reconnecting')
    vi.advanceTimersByTime(1000)
    expect(FakeWS.all.length).toBe(2)
    FakeWS.all[1].onclose({ code: 1008 })
    expect(states.at(-1)).toBe('unauthorized')
    expect(auth).toHaveBeenCalled()
    vi.advanceTimersByTime(60000)
    expect(FakeWS.all.length).toBe(2)

    live.start()
    FakeWS.all[2].onclose({ code: 1006 })
    live.stop()
    vi.advanceTimersByTime(60000)
    expect(FakeWS.all.length).toBe(3)
    vi.useRealTimers()
  })
})
