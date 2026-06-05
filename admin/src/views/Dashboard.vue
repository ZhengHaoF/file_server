<template>
  <div class="p-8 space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="badge badge-accent mb-4">
          <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          实时监控
        </div>
        <h1 class="text-4xl font-bold tracking-tight mb-2">服务器状态</h1>
        <p class="text-text-secondary text-lg">实时监控服务器运行状态和性能指标</p>
      </div>
      <button
        @click="refreshData"
        class="btn btn-secondary"
      >
        <svg class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>刷新数据</span>
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- CPU Card -->
      <div class="card animate-fade-in-up delay-75">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-info-soft flex items-center justify-center">
              <svg class="w-6 h-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider">CPU</span>
          </div>
          <div class="text-4xl font-bold mb-3">{{ statusStore.cpuUsage }}%</div>
          <div class="progress-bar mb-4">
            <div 
              class="progress-bar-fill bg-gradient-to-r from-blue-500 to-cyan-500"
              :style="{ width: `${statusStore.cpuUsage}%` }"
            />
          </div>
          <p class="text-sm text-text-muted">{{ statusStore.status?.cpu?.cores || 0 }} 核心处理器</p>
        </div>
      </div>

      <!-- Memory Card -->
      <div class="card animate-fade-in-up delay-100">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center">
              <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider">内存</span>
          </div>
          <div class="text-4xl font-bold mb-3">{{ statusStore.memoryUsage }}%</div>
          <div class="progress-bar mb-4">
            <div 
              class="progress-bar-fill bg-gradient-to-r from-purple-500 to-pink-500"
              :style="{ width: `${statusStore.memoryUsage}%` }"
            />
          </div>
          <p class="text-sm text-text-muted">
            {{ formatMB(statusStore.status?.memory?.used) }} / {{ formatMB(statusStore.status?.memory?.total) }}
          </p>
        </div>
      </div>

      <!-- Disk Card -->
      <div class="card animate-fade-in-up delay-150">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-warning-soft flex items-center justify-center">
              <svg class="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider">磁盘</span>
          </div>
          <div class="text-4xl font-bold mb-3">{{ statusStore.diskUsage }}%</div>
          <div class="progress-bar mb-4">
            <div 
              class="progress-bar-fill bg-gradient-to-r from-amber-500 to-orange-500"
              :style="{ width: `${statusStore.diskUsage}%` }"
            />
          </div>
          <p class="text-sm text-text-muted">
            {{ formatGB(statusStore.status?.disk?.used) }} / {{ formatGB(statusStore.status?.disk?.total) }}
          </p>
        </div>
      </div>

      <!-- Uptime Card -->
      <div class="card animate-fade-in-up delay-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-success-soft flex items-center justify-center">
              <svg class="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider">运行时长</span>
          </div>
          <div class="text-4xl font-bold mb-3">{{ statusStore.uptimeFormatted }}</div>
          <div class="status-indicator mt-4" :class="serviceOverallStatus === 'running' ? 'success' : 'error'">
            <span class="status-dot"></span>
            <span>{{ serviceOverallStatus === 'running' ? '服务正常运行' : '服务已停止' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Status -->
    <div class="card animate-fade-in-up delay-250">
      <div class="p-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <svg class="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold">服务状态</h2>
            <p class="text-sm text-text-muted">HTTP/HTTPS 服务运行状态</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- HTTP -->
          <div class="bg-bg-elevated rounded-2xl p-5 border border-border-subtle">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-info-soft flex items-center justify-center">
                  <span class="text-lg font-bold text-info">H</span>
                </div>
                <div>
                  <p class="font-semibold">HTTP 服务</p>
                  <p class="text-sm text-text-muted">端口 {{ statusStore.status?.server?.httpPort || 3000 }}</p>
                </div>
              </div>
              <div class="status-indicator" :class="statusStore.status?.server?.httpStatus === 'running' ? 'success' : 'error'">
                <span class="status-dot"></span>
                <span>{{ statusStore.status?.server?.httpStatus === 'running' ? '运行中' : '已停止' }}</span>
              </div>
            </div>
          </div>

          <!-- HTTPS -->
          <div class="bg-bg-elevated rounded-2xl p-5 border border-border-subtle">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-success-soft flex items-center justify-center">
                  <span class="text-lg font-bold text-success">S</span>
                </div>
                <div>
                  <p class="font-semibold">HTTPS 服务</p>
                  <p class="text-sm text-text-muted">端口 {{ statusStore.status?.server?.httpsPort || 3001 }}</p>
                </div>
              </div>
              <div class="status-indicator" :class="statusStore.status?.server?.httpsStatus === 'running' ? 'success' : 'error'">
                <span class="status-dot"></span>
                <span>{{ statusStore.status?.server?.httpsStatus === 'running' ? '运行中' : '已停止' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-border-subtle">
          <div class="flex items-center justify-between">
            <span class="text-sm text-text-muted">Node.js 版本</span>
            <span class="font-mono text-sm bg-bg-elevated px-3 py-1.5 rounded-lg border border-border-subtle">
              {{ statusStore.status?.server?.nodeVersion || '-' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStatusStore } from '../stores/status.js'

const statusStore = useStatusStore()
const loading = statusStore.loading

// 计算服务整体状态
const serviceOverallStatus = computed(() => {
  const http = statusStore.status?.server?.httpStatus
  const https = statusStore.status?.server?.httpsStatus
  if (http === 'running' || https === 'running') return 'running'
  return 'stopped'
})

function formatMB(mb) {
  if (!mb) return '0 MB'
  return `${(mb / 1024).toFixed(1)} GB`
}

function formatGB(gb) {
  if (!gb) return '0 GB'
  return `${gb.toFixed(1)} GB`
}

async function refreshData() {
  await statusStore.fetchStatus()
}

onMounted(() => {
  refreshData()
})
</script>
