import { apiUrl, isCrossOrigin } from './env.js'

/**
 * ApiError.kind:
 *  - 'auth'     HTTP 401 (session missing/expired)
 *  - 'forbidden' HTTP 403
 *  - 'http'     other HTTP error with a status
 *  - 'network'  server unreachable / CORS / DNS
 *  - 'timeout'  request exceeded its timeout
 *  - 'abort'    cancelled by caller (stale request); callers should ignore
 */
export class ApiError extends Error {
  constructor(message, { kind, status = 0, data = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
    this.data = data
  }
  get aborted() { return this.kind === 'abort' }
}

export const isAbort = (error) => error?.kind === 'abort' || error?.name === 'AbortError'

// In-memory only. Never written to localStorage/sessionStorage/cookies by script.
let bearer = null
export function setBearer(token) { bearer = token || null }
export function getBearer() { return bearer }

let unauthorizedHandler = null
/** Registered by the auth store. Called only for HTTP 401, never for network/5xx failures. */
export function onUnauthorized(fn) { unauthorizedHandler = fn }

let transport = null
/** Swap the fetch implementation (tests, isolated preview backend). */
export function setTransport(fn) { transport = fn }

async function getTransport() {
  if (transport) return transport
  // Inline env check so Vite statically removes the preview backend from production builds.
  if (import.meta.env.VITE_ADMIN_PREVIEW === '1') {
    const mod = await import('../preview/backend.js')
    transport = mod.previewFetch
    return transport
  }
  return (...args) => globalThis.fetch(...args)
}

function buildQuery(query) {
  if (!query) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue
    params.append(key, String(value))
  }
  const text = params.toString()
  return text ? `?${text}` : ''
}

const STATUS_TEXT = {
  400: '请求参数无效', 401: '会话已失效，请重新登录', 403: '没有管理权限', 404: '接口不存在',
  409: '操作冲突', 413: '请求过大', 429: '请求过于频繁，请稍后再试', 500: '服务器内部错误',
  501: '当前服务不支持此功能', 502: '网关错误', 503: '服务暂不可用', 504: '网关超时'
}

/**
 * Perform an API request.
 * @param {string} method
 * @param {string} path absolute '/api/...' path; prefixed via apiUrl()
 * @param {{query?:object, body?:any, signal?:AbortSignal, timeout?:number, responseType?:'json'|'blob', skipAuthHandler?:boolean}} options
 */
export async function request(method, path, options = {}) {
  const { query, body, signal, timeout = 15000, responseType = 'json', skipAuthHandler = false } = options
  const url = apiUrl(path) + buildQuery(query)
  const controller = new AbortController()
  let timedOut = false
  const timer = timeout > 0 ? setTimeout(() => { timedOut = true; controller.abort() }, timeout) : null
  const relay = () => controller.abort()
  if (signal) {
    if (signal.aborted) controller.abort()
    else signal.addEventListener('abort', relay, { once: true })
  }
  const headers = { Accept: responseType === 'blob' ? '*/*' : 'application/json' }
  const requestBearer = bearer
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (bearer) headers.Authorization = `Bearer ${bearer}`

  const fail = (error) => {
    if (signal?.aborted) return new ApiError('请求已取消', { kind: 'abort' })
    if (timedOut) return new ApiError('请求超时，服务器未在规定时间内响应', { kind: 'timeout' })
    if (error instanceof ApiError) return error
    if (error?.name === 'AbortError') return new ApiError('请求已取消', { kind: 'abort' })
    return new ApiError('无法连接服务器', { kind: 'network' })
  }

  // The timeout covers headers AND body; the timer is cleared only after the body is consumed.
  try {
    let response
    try {
      const doFetch = await getTransport()
      response = await doFetch(url, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials: isCrossOrigin() ? 'include' : 'same-origin',
        cache: 'no-store',
        signal: controller.signal
      })
    } catch (error) {
      throw fail(error)
    }

    if (!response.ok) {
      let data = null
      let text = ''
      try { text = await response.text() } catch (error) { throw fail(error) }
      try { data = text ? JSON.parse(text) : null } catch { data = null }
      if (signal?.aborted) throw fail(null)
      const status = response.status
      const message = (data && (data.msg || data.message)) || STATUS_TEXT[status] || `请求失败（HTTP ${status}）`
      const kind = status === 401 ? 'auth' : status === 403 ? 'forbidden' : 'http'
      const error = new ApiError(message, { kind, status, data })
      // A late rejection for an old session must not revoke a newer login.
      if (kind === 'auth' && !skipAuthHandler && unauthorizedHandler && requestBearer === bearer) unauthorizedHandler(error)
      throw error
    }

    if (responseType === 'blob') {
      let blob
      try { blob = await response.blob() } catch (error) { throw fail(error) }
      if (signal?.aborted) throw fail(null)
      const truncatedHeader = response.headers.get('X-Export-Truncated')
      return {
        blob,
        filename: filenameFrom(response.headers.get('Content-Disposition')),
        type: response.headers.get('Content-Type'),
        // null = unknown (header absent or not exposed cross-origin)
        truncated: truncatedHeader === null ? null : /^(1|true|yes)$/i.test(truncatedHeader.trim())
      }
    }
    let text
    try { text = await response.text() } catch (error) { throw fail(error) }
    if (signal?.aborted) throw fail(null)
    if (response.status === 204 || !text) return null
    try { return JSON.parse(text) } catch {
      throw new ApiError('服务器返回了无法解析的数据', { kind: 'http', status: response.status })
    }
  } finally {
    if (timer) clearTimeout(timer)
    signal?.removeEventListener?.('abort', relay)
  }
}

export function filenameFrom(disposition) {
  if (!disposition) return null
  const star = /filename\*=UTF-8''([^;]+)/i.exec(disposition)
  if (star) { try { return decodeURIComponent(star[1].trim()) } catch { /* fallthrough */ } }
  const plain = /filename="?([^";]+)"?/i.exec(disposition)
  return plain ? plain[1].trim() : null
}

export const http = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options = {}) => request('POST', path, { ...options, body: body ?? {} }),
  put: (path, body, options = {}) => request('PUT', path, { ...options, body: body ?? {} }),
  del: (path, options) => request('DELETE', path, options)
}

/** Human readable description of any error for inline display. */
export function describeError(error) {
  if (!error) return ''
  if (error instanceof ApiError) {
    if (error.kind === 'network') return '无法连接服务器，请检查服务是否运行或网络是否可达'
    if (error.kind === 'timeout') return '请求超时，服务器响应过慢'
    const requestId = typeof error.data?.requestId === 'string' ? `；请求标识：${error.data.requestId}` : ''
    if (error.status === 501) return `${error.message}（当前服务能力不可用，HTTP 501）${requestId}`
    if (error.status) return `${error.message}（HTTP ${error.status}）${requestId}`
    return error.message
  }
  return error.message || String(error)
}

/** Trigger a browser download for an in-memory Blob (no credentials in URLs). */
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
