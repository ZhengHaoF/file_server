import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import { auth } from '../stores/auth.js'

export const routes = [
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { title: '登录', public: true } },
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/overview' },
      { path: 'dashboard', redirect: '/overview' }, // legacy path
      { path: 'overview', name: 'overview', component: () => import('../views/OverviewView.vue'), meta: { title: '概览' } },
      { path: 'cache', name: 'cache', component: () => import('../views/CacheView.vue'), meta: { title: '缓存' } },
      { path: 'logs', name: 'logs', component: () => import('../views/LogsView.vue'), meta: { title: '日志' } },
      { path: 'config', name: 'config', component: () => import('../views/ConfigView.vue'), meta: { title: '配置' } },
      { path: 'operations', name: 'operations', component: () => import('../views/OperationsView.vue'), meta: { title: '任务与审计' } },
      { path: 'sessions', name: 'sessions', component: () => import('../views/SessionsView.vue'), meta: { title: '会话' } }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: '页面不存在', public: true } }
]

/** Only allow same-app relative redirects (no protocol-relative or absolute URLs). */
export function safeRedirect(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return '/overview'
  if (value.startsWith('/login')) return '/overview'
  return value
}

export async function authGuard(to) {
  const needsAuth = to.matched.some((r) => r.meta.requiresAuth)
  if (to.name === 'login') {
    if (auth.state.status === 'unknown') await auth.checkSession()
    if (auth.state.status === 'authenticated') return safeRedirect(to.query.redirect)
    return true
  }
  if (!needsAuth) return true
  if (auth.state.status === 'authenticated') return true
  const result = auth.state.status === 'anonymous' ? 'anonymous' : await auth.checkSession()
  if (result === 'authenticated') return true
  // Unreachable: let the layout render its connection error + retry, do NOT sign out.
  if (result === 'unreachable') return true
  return { name: 'login', query: to.fullPath && to.fullPath !== '/' ? { redirect: to.fullPath } : {} }
}

export function createAppRouter({ memory = false } = {}) {
  const router = createRouter({
    history: memory ? createMemoryHistory('/admin/') : createWebHistory('/admin/'),
    routes,
    scrollBehavior: () => ({ top: 0 })
  })
  router.beforeEach(authGuard)
  router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} · File Serve 管理` : 'File Serve 管理'
  })
  auth.setNavigator(({ reason, keepPath } = {}) => {
    const current = router.currentRoute.value
    if (current.name === 'login') return
    const query = { reason }
    if (keepPath && current.fullPath && !current.matched.some((r) => r.meta.public)) query.redirect = current.fullPath
    router.replace({ name: 'login', query })
  })
  return router
}
