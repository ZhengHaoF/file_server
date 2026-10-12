// Build-time environment. VITE_ADMIN_PREVIEW is statically replaced by Vite so the
// preview backend is tree-shaken from production bundles.
export const PREVIEW = import.meta.env.VITE_ADMIN_PREVIEW === '1'
// Demo-only token; compiled out of production bundles.
export const PREVIEW_TOKEN = import.meta.env.VITE_ADMIN_PREVIEW === '1' ? 'demo-admin-isolated-data-only' : ''

/** Normalise an optional API prefix: '' | '/prefix' | 'https://host/prefix' (no trailing slash). */
export function normalizeBase(raw) {
  const value = String(raw ?? '').trim()
  if (!value || value === '/') return ''
  return value.replace(/\/+$/, '')
}

export const API_BASE = normalizeBase(import.meta.env.VITE_API_BASE)

/** Join the configured prefix with an absolute API path ('/api/...'). */
export function apiUrl(path, base = API_BASE) {
  if (typeof path !== 'string' || !path.startsWith('/')) throw new TypeError(`API path must be absolute: ${path}`)
  return `${base}${path}`
}

/** WebSocket URL: same-origin (ws/wss chosen from page protocol) unless the prefix is an absolute URL. */
export function wsUrl(path, base = API_BASE, loc = globalThis.location) {
  const full = apiUrl(path, base)
  if (/^https?:\/\//i.test(full)) return full.replace(/^http/i, 'ws')
  const scheme = loc.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${scheme}//${loc.host}${full}`
}

/** Whether the API lives on another origin (needs credentials: 'include'). */
export function isCrossOrigin(base = API_BASE, loc = globalThis.location) {
  if (!/^https?:\/\//i.test(base)) return false
  try { return new URL(base).origin !== loc.origin } catch { return false }
}
