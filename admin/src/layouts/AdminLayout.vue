<template>
  <div class="flex min-h-[100dvh]">
    <!-- Sidebar -->
    <aside class="w-72 bg-bg-secondary border-r border-border-subtle flex flex-col">
      <!-- Logo Header -->
      <div class="p-6 border-b border-border-subtle">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center shadow-glow">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold tracking-tight">File Serve</h1>
            <p class="text-xs text-text-muted font-medium uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="group flex items-center gap-4 px-4 py-3 rounded-xl transition-smooth"
          :class="isActive(item.path) 
            ? 'bg-accent-soft text-accent shadow-glow' 
            : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'"
        >
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center transition-smooth"
            :class="isActive(item.path) ? 'bg-accent/20' : 'bg-white/5 group-hover:bg-white/10'"
          >
            <component :is="item.icon" class="w-5 h-5" />
          </div>
          <div class="flex-1">
            <span class="text-sm font-semibold">{{ item.label }}</span>
            <p class="text-xs text-text-muted mt-0.5">{{ item.description }}</p>
          </div>
          <div 
            v-if="isActive(item.path)"
            class="w-2 h-2 rounded-full bg-accent animate-pulse"
          />
        </router-link>
      </nav>

      <!-- Server Status Footer -->
      <div class="p-4 border-t border-border-subtle">
        <div class="card">
          <div class="p-4">
            <div class="flex items-center gap-3 mb-3">
              <div class="status-indicator" :class="serviceOverallStatus === 'running' ? 'success' : 'error'">
                <span class="status-dot"></span>
                <span>{{ serviceOverallStatus === 'running' ? '运行中' : '已停止' }}</span>
              </div>
            </div>
            <div class="space-y-2 text-xs text-text-muted">
              <div class="flex justify-between">
                <span>HTTP 服务</span>
                <span :class="statusStore.status?.server?.httpStatus === 'running' ? 'text-success' : 'text-error'">
                  {{ statusStore.status?.server?.httpStatus === 'running' ? '正常' : '停止' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span>HTTPS 服务</span>
                <span :class="statusStore.status?.server?.httpsStatus === 'running' ? 'text-success' : 'text-error'">
                  {{ statusStore.status?.server?.httpsStatus === 'running' ? '正常' : '停止' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto bg-bg-primary">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animate-fade-in-up"
          leave-active-class="animate-fade-in"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStatusStore } from '../stores/status.js'
import IconDashboard from '../components/icons/IconDashboard.vue'
import IconCache from '../components/icons/IconCache.vue'
import IconLog from '../components/icons/IconLog.vue'
import IconConfig from '../components/icons/IconConfig.vue'

const route = useRoute()
const statusStore = useStatusStore()

// 计算服务整体状态
const serviceOverallStatus = computed(() => {
  const http = statusStore.status?.server?.httpStatus
  const https = statusStore.status?.server?.httpsStatus
  if (http === 'running' || https === 'running') return 'running'
  return 'stopped'
})

// 定时刷新状态
let statusTimer = null
onMounted(() => {
  statusStore.fetchStatus()
  statusTimer = setInterval(() => {
    statusStore.fetchStatus()
  }, 30000) // 每30秒刷新一次
})

const navItems = [
  { 
    path: '/dashboard', 
    label: '仪表盘', 
    description: '服务器状态监控',
    icon: IconDashboard 
  },
  { 
    path: '/cache', 
    label: '缓存管理', 
    description: '清理和优化缓存',
    icon: IconCache 
  },
  { 
    path: '/logs', 
    label: '日志中心', 
    description: '查看系统日志',
    icon: IconLog 
  },
  { 
    path: '/config', 
    label: '配置管理', 
    description: '服务器配置',
    icon: IconConfig 
  }
]

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.router-link-active {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}
</style>
