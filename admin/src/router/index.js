import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: 'cache',
        name: 'CacheManager',
        component: () => import('../views/CacheManager.vue'),
        meta: { title: '缓存管理' }
      },
      {
        path: 'logs',
        name: 'LogViewer',
        component: () => import('../views/LogViewer.vue'),
        meta: { title: '日志中心' }
      },
      {
        path: 'config',
        name: 'ConfigManager',
        component: () => import('../views/ConfigManager.vue'),
        meta: { title: '配置管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken')
  
  if (to.meta.requiresAuth && !token) {
    // 需要认证但没有 token，跳转登录
    next('/login')
  } else if (to.path === '/login' && token) {
    // 已登录访问登录页，跳转仪表盘
    next('/dashboard')
  } else {
    next()
  }
})

export default router
