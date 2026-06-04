<template>
  <div class="p-8 space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="badge badge-warning mb-4">
          <span class="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
          日志中心
        </div>
        <h1 class="text-4xl font-bold tracking-tight mb-2">日志中心</h1>
        <p class="text-text-secondary text-lg">查看和筛选服务器日志</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="refreshLogs"
          class="btn btn-secondary"
        >
          <svg class="w-5 h-5" :class="{ 'animate-spin': logStore.loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>刷新</span>
        </button>
        <button
          @click="clearLogs"
          class="btn btn-ghost"
        >
          清空
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card animate-fade-in-up delay-75">
      <div class="p-5">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Level Filter -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-semibold text-text-secondary">级别</span>
            <div class="flex gap-2">
              <button
                v-for="level in levels"
                :key="level.value"
                @click="setLevel(level.value)"
                class="btn btn-sm"
                :class="currentLevel === level.value ? 'btn-primary' : 'btn-ghost'"
              >
                {{ level.label }}
              </button>
            </div>
          </div>

          <!-- Search -->
          <div class="flex-1 min-w-[200px]">
            <div class="relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="keyword"
                type="text"
                placeholder="搜索关键词..."
                class="input pl-12"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>

          <!-- Limit -->
          <select
            v-model="limit"
            class="input w-auto cursor-pointer"
          >
            <option :value="50">50 条</option>
            <option :value="100">100 条</option>
            <option :value="200">200 条</option>
            <option :value="500">500 条</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Log List -->
    <div class="card animate-fade-in-up delay-100">
      <div class="border-b border-border-subtle p-5">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold">日志记录</h2>
          <span class="badge badge-accent">共 {{ logStore.logs.length }} 条</span>
        </div>
      </div>

      <div class="max-h-[600px] overflow-y-auto">
        <div v-if="logStore.loading" class="p-12 text-center">
          <div class="inline-flex items-center gap-3 text-text-muted">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="text-sm font-medium">加载中...</span>
          </div>
        </div>

        <div v-else-if="logStore.logs.length === 0" class="p-12 text-center">
          <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
          </div>
          <p class="text-text-muted font-medium">暂无日志记录</p>
        </div>

        <div v-else class="divide-y divide-border-subtle">
          <div
            v-for="(log, index) in logStore.logs"
            :key="index"
            class="px-5 py-4 hover:bg-white/3 transition-fast"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 mt-1">
                <span
                  class="badge"
                  :class="getLevelClass(log.level)"
                >
                  {{ log.level }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs text-text-muted font-mono bg-bg-elevated px-2 py-1 rounded">
                    {{ formatTime(log.timestamp) }}
                  </span>
                  <span v-if="log.category" class="text-xs text-text-muted font-mono">
                    [{{ log.category }}]
                  </span>
                </div>
                <p class="text-sm text-text-primary leading-relaxed">{{ log.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useLogStore } from '../stores/log.js'

const logStore = useLogStore()

const levels = [
  { label: '全部', value: '' },
  { label: 'INFO', value: 'info' },
  { label: 'WARN', value: 'warn' },
  { label: 'ERROR', value: 'error' }
]

const currentLevel = ref('')
const keyword = ref('')
const limit = ref(100)

function getLevelClass(level) {
  const classes = {
    info: 'badge-info',
    warn: 'badge-warning',
    error: 'badge-error'
  }
  return classes[level] || 'badge-accent'
}

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function setLevel(level) {
  currentLevel.value = level
  logStore.setFilters({ level })
}

function handleSearch() {
  logStore.setFilters({ keyword: keyword.value })
}

function refreshLogs() {
  logStore.setFilters({
    level: currentLevel.value,
    keyword: keyword.value,
    limit: limit.value
  })
}

function clearLogs() {
  logStore.clearLogs()
}

watch(limit, () => {
  logStore.setFilters({ limit: limit.value })
})

onMounted(() => {
  refreshLogs()
})
</script>
