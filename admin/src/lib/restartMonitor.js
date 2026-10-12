/**
 * Follow a managed restart until the server is reachable again.
 * Phases: waiting → restarting → restored | restored-login | timeout
 *  - unreachable / 5xx       → restarting (process is down)
 *  - 401 from session check  → restored-login (new process, in-memory sessions reset)
 *  - 200 and bootId changed  → restored
 *  - 200 with same bootId    → still the old process; keep waiting
 */
export function monitorRestart({ previousBootId, checkSession, getBootId, onPhase, interval = 2000, timeout = 120000, signal, sleep }) {
  const wait = sleep || ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))
  const started = Date.now()
  let sawDown = false
  const emit = (phase, extra = {}) => onPhase?.({ phase, sawDown, elapsed: Date.now() - started, ...extra })

  return (async () => {
    emit('waiting')
    while (!signal?.aborted) {
      if (Date.now() - started > timeout) { emit('timeout'); return 'timeout' }
      await wait(interval)
      if (signal?.aborted) break
      try {
        await checkSession()
        let bootId = null
        try { bootId = await getBootId() } catch (error) { if (error?.status === 401) { emit('restored-login'); return 'restored-login' } }
        if (bootId && previousBootId && bootId !== previousBootId) { emit('restored', { bootId }); return 'restored' }
        if (bootId && !previousBootId && sawDown) { emit('restored', { bootId }); return 'restored' }
        emit(sawDown ? 'restarting' : 'waiting')
      } catch (error) {
        if (error?.kind === 'abort') break
        if (error?.status === 401) { emit('restored-login'); return 'restored-login' }
        sawDown = true
        emit('restarting', { error })
      }
    }
    return 'cancelled'
  })()
}
