import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import axios from 'axios'

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
  history: createWebHistory('/admin/'),
  routes
})

// 路由守卫
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true;
  try {
    await axios.get('/api/admin/status', { withCredentials: true, timeout: 10000 });
    return true;
  } catch {
    return '/login';
  }
})

export default router
