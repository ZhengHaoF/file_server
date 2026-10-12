import { wsUrl } from './env.js'

/**
 * Live log feed.
 *  mode 'ws'   – authenticated WebSocket (HttpOnly cookie), auto-reconnect with backoff
 *  mode 'poll' – periodic HTTP polling (preview builds only; labelled in the UI)
 * States: idle | connecting | open | reconnecting | polling | failed | unauthorized | closed
 */
export function createLiveLog({ mode = 'ws', onEntries, onState, onAuthProblem, poll, pollInterval = 3000, WebSocketImpl, maxAttempts = 8, url } = {}) {
  const WS = WebSocketImpl || globalThis.WebSocket
  let ws = null
  let timer = null
  let attempts = 0
  let failuresBeforeOpen = 0
  let stopped = true
  let pollController = null
  let state = 'idle'

  const setState = (next, info = {}) => { state = next; onState?.(next, info) }

  function normalize(payload) {
    if (Array.isArray(payload)) return payload
    if (payload && Array.isArray(payload.logs)) return payload.logs
    if (payload && typeof payload === 'object' && (payload.message !== undefined || payload.timestamp)) return [payload]
    return []
  }

  function connect() {
    if (stopped) return
    setState(attempts ? 'reconnecting' : 'connecting', { attempt: attempts })
    let opened = false
    try {
      ws = new WS(url || wsUrl('/api/admin/logs/stream'))
    } catch {
      scheduleReconnect()
      return
    }
    ws.onopen = () => { opened = true; attempts = 0; failuresBeforeOpen = 0; setState('open') }
    ws.onmessage = (event) => {
      try { const entries = normalize(JSON.parse(event.data)); if (entries.length) onEntries?.(entries) } catch { /* ignore malformed frame */ }
    }
    ws.onerror = () => { /* onclose follows */ }
    ws.onclose = (event) => {
      ws = null
      if (stopped) return
      if (event?.code === 1008) { setState('unauthorized'); onAuthProblem?.(); stopped = true; return }
      if (!opened) {
        failuresBeforeOpen++
        // Upgrade rejections (e.g. 401) surface as 1006 without opening; verify the session over HTTP.
        if (failuresBeforeOpen === 2) onAuthProblem?.()
      }
      scheduleReconnect()
    }
  }

  function scheduleReconnect() {
    if (stopped) return
    attempts++
    if (attempts > maxAttempts) { setState('failed', { attempt: attempts - 1 }); stopped = true; return }
    const delay = Math.min(15000, 1000 * 2 ** (attempts - 1))
    setState('reconnecting', { attempt: attempts, delay })
    timer = setTimeout(connect, delay)
  }

  async function pollOnce() {
    if (stopped) return
    pollController = new AbortController()
    try {
      const entries = await poll({ signal: pollController.signal })
      if (stopped) return
      setState('polling')
      if (entries?.length) onEntries?.(entries)
    } catch (error) {
      if (stopped || error?.kind === 'abort') return
      if (error?.kind === 'auth') { setState('unauthorized'); stopped = true; return }
      setState('polling', { error })
    }
    if (!stopped) timer = setTimeout(pollOnce, pollInterval)
  }

  return {
    get state() { return state },
    start() {
      if (!stopped) return
      stopped = false
      attempts = 0
      failuresBeforeOpen = 0
      if (mode === 'poll') { setState('polling'); pollOnce() } else connect()
    },
    stop() {
      stopped = true
      clearTimeout(timer)
      pollController?.abort()
      if (ws) { ws.onclose = null; ws.onmessage = null; try { ws.close(1000) } catch { /* ignore */ } ws = null }
      setState('closed')
    },
    /** Retry after 'failed' */
    retry() { this.stop(); this.start() }
  }
}

/** Stable key for deduplication: server id when present, else content hash fields. */
export const logKey = (entry) => (entry?.id !== undefined && entry?.id !== null ? `id:${entry.id}` : `t:${entry?.timestamp}|${entry?.level}|${entry?.message}`)
