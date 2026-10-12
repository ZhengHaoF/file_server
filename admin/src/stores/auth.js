import { reactive, readonly } from 'vue'
import * as api from '../api/admin.js'
import { onUnauthorized, setBearer, ApiError } from '../lib/http.js'

/**
 * status:
 *  unknown       – not checked yet
 *  authenticated – GET /api/auth/session succeeded with role admin
 *  anonymous     – server answered 401 (or non-admin role)
 *  unreachable   – network/5xx/timeout; NOT treated as signed out
 */
const state = reactive({
  status: 'unknown',
  role: null,
  expiresAt: null,
  sessionId: null,
  reason: null, // why we are signed out: 'expired' | 'revoked' | 'logout' | 'restart'
  lastError: null
})

const signOutListeners = new Set()
let navigateToLogin = null
let pendingCheck = null
let sessionEpoch = 0

function applySession(data) {
  state.status = 'authenticated'
  state.role = data?.role ?? 'admin'
  state.expiresAt = data?.expiresAt ?? null
  state.sessionId = data?.sessionId ?? null
  state.lastError = null
  state.reason = null
}

function clearLocal(reason) {
  sessionEpoch++
  pendingCheck = null
  setBearer(null)
  const wasAuthenticated = state.status === 'authenticated'
  state.status = 'anonymous'
  state.role = null
  state.expiresAt = null
  state.sessionId = null
  state.reason = reason ?? null
  for (const fn of signOutListeners) { try { fn(reason) } catch { /* listener errors are isolated */ } }
  return wasAuthenticated
}

/** Check the current session. Returns 'authenticated' | 'anonymous' | 'unreachable'. */
async function checkSession({ signal } = {}) {
  if (pendingCheck) return pendingCheck
  const epoch = sessionEpoch
  pendingCheck = (async () => {
    try {
      const data = await api.getSession({ signal })
      if (epoch !== sessionEpoch) return state.status
      if (data?.role !== 'admin') { clearLocal('forbidden'); return 'anonymous' }
      applySession(data)
      return 'authenticated'
    } catch (error) {
      if (epoch !== sessionEpoch) return state.status
      if (error instanceof ApiError && error.kind === 'auth') { clearLocal(state.status === 'authenticated' ? 'expired' : null); return 'anonymous' }
      if (error instanceof ApiError && error.kind === 'forbidden') { clearLocal('forbidden'); return 'anonymous' }
      if (error instanceof ApiError && error.kind === 'abort') return state.status
      // Network or server error: keep whatever we knew, mark unreachable only if we never confirmed.
      state.lastError = error
      if (state.status !== 'authenticated') state.status = 'unreachable'
      return 'unreachable'
    } finally {
      if (epoch === sessionEpoch) pendingCheck = null
    }
  })()
  return pendingCheck
}

async function login(token) {
  sessionEpoch++
  pendingCheck = null
  const data = await api.login(token)
  if (data?.role !== 'admin') {
    // A non-admin credential produced a session; revoke it immediately.
    setBearer(data?.sessionToken)
    try { await api.logout() } catch { /* best effort */ }
    setBearer(null)
    throw new ApiError('该凭据没有管理权限，请使用管理令牌', { kind: 'forbidden', status: 403 })
  }
  setBearer(data.sessionToken)
  applySession({ role: data.role, expiresAt: data.expiresAt, sessionId: data.sessionId ?? null })
  // Fill sessionId from the canonical endpoint; failure here is not fatal.
  checkSession().catch(() => {})
  return data
}

/** Server logout then local sign-out. Local state is cleared even if the server is unreachable. */
async function logout() {
  let serverError = null
  try { await api.logout() } catch (error) { if (error?.kind !== 'auth') serverError = error }
  clearLocal('logout')
  // If the server did not confirm, the login page shows a prominent warning instead of "已退出".
  navigateToLogin?.({ reason: serverError ? 'logout-unconfirmed' : 'logout' })
  return { serverError }
}

/** Called after the current session was revoked server-side (e.g. sessions page). */
function signedOutRemotely(reason = 'revoked') {
  clearLocal(reason)
  navigateToLogin?.({ reason })
}

// Only HTTP 401 reaches here. Network errors and 5xx never sign the user out.
onUnauthorized(() => {
  if (state.status === 'anonymous') return
  clearLocal('expired')
  navigateToLogin?.({ reason: 'expired', keepPath: true })
})

export const auth = {
  state: readonly(state),
  checkSession,
  login,
  logout,
  signedOutRemotely,
  clearLocal,
  onSignOut(fn) { signOutListeners.add(fn); return () => signOutListeners.delete(fn) },
  setNavigator(fn) { navigateToLogin = fn },
  /** test helper */
  _reset() { sessionEpoch++; pendingCheck = null; setBearer(null); Object.assign(state, { status: 'unknown', role: null, expiresAt: null, sessionId: null, reason: null, lastError: null }); signOutListeners.clear() }
}
