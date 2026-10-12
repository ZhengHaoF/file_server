/** Copy text; returns true on success. Falls back to a hidden textarea when the async API is unavailable. */
export async function copyText(text) {
  try {
    if (globalThis.navigator?.clipboard?.writeText && globalThis.isSecureContext !== false) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch { /* fall through to legacy path */ }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand?.('copy') ?? false
    ta.remove()
    return !!ok
  } catch {
    return false
  }
}
