import { ref, shallowRef, computed, onBeforeUnmount, getCurrentInstance } from 'vue'
import { createLatest } from '../lib/latest.js'
import { isAbort } from '../lib/http.js'

/**
 * Fetch state with stale-data retention and race protection.
 * - data keeps the last successful payload when a later refresh fails
 * - error holds the last failure; stale === (error && data)
 * - sampledAt: from payload.sampledAt (server) when present, else client receive time
 * - optional polling (pauses while document hidden)
 */
export function useResource(fetcher, { interval = 0, immediate = true, sampledAt: pickSample } = {}) {
  const data = shallowRef(null)
  const error = shallowRef(null)
  const loading = ref(false)
  const sampledAt = ref(null)
  const receivedAt = ref(null)
  const latest = createLatest()
  let timer = null
  let stopped = false

  async function load() {
    const token = latest.begin()
    loading.value = true
    try {
      const result = await fetcher({ signal: token.signal })
      if (!token.isCurrent()) return
      data.value = result
      error.value = null
      receivedAt.value = Date.now()
      const fromPayload = pickSample ? pickSample(result) : result?.sampledAt
      sampledAt.value = fromPayload ?? receivedAt.value
    } catch (err) {
      if (!token.isCurrent() || isAbort(err)) return
      error.value = err
    } finally {
      if (token.isCurrent()) loading.value = false
    }
  }

  function schedule() {
    clearTimeout(timer)
    if (!interval || stopped) return
    timer = setTimeout(async () => {
      if (typeof document === 'undefined' || document.visibilityState !== 'hidden') await load()
      schedule()
    }, interval)
  }

  function start() { stopped = false; schedule() }
  function stop() { stopped = true; clearTimeout(timer); latest.cancel(); loading.value = false }

  const onVisible = () => { if (document.visibilityState === 'visible' && interval && !stopped) { load(); schedule() } }
  if (interval && typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisible)

  if (getCurrentInstance()) {
    onBeforeUnmount(() => {
      stop()
      if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisible)
    })
  }

  if (immediate) { load(); if (interval) schedule() }

  return {
    data, error, loading, sampledAt, receivedAt,
    stale: computed(() => !!(error.value && data.value)),
    initialLoading: computed(() => loading.value && !data.value && !error.value),
    load, start, stop,
    /** Replace data from a mutation response. */
    set(value) { data.value = value; error.value = null; receivedAt.value = Date.now(); sampledAt.value = value?.sampledAt ?? receivedAt.value }
  }
}
