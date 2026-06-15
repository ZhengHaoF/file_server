// history模式
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

import Home from '@/view/main.vue'
import AudioPlay from '@/view/AudioPlay.vue'
import HtmlVideoPlay from '@/view/HtmlVideoPlay.vue'

const routes = [
  {
    name: 'Home',
    path: '/:path*',
    component: Home
  },
  {
    path: '/HtmlVideoPlay',
    component: HtmlVideoPlay
  },
  {
    path: '/AudioPlay',
    component: AudioPlay
  }
]

// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router;
