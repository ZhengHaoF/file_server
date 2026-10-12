/**
 * "Latest request wins" helper. Each call to begin() aborts the previous
 * in-flight request and returns a token whose isCurrent() reports whether a
 * response may still be applied. Guards against out-of-order responses even if
 * a transport ignores AbortSignal.
 */
export function createLatest() {
  let seq = 0
  let controller = null
  return {
    begin() {
      controller?.abort()
      controller = new AbortController()
      const id = ++seq
      const own = controller
      return {
        signal: own.signal,
        isCurrent: () => id === seq && !own.signal.aborted
      }
    },
    cancel() {
      seq++
      controller?.abort()
      controller = null
    }
  }
}
