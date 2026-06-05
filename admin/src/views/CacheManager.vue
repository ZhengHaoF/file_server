<template>
  <div class="p-8 space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="badge badge-info mb-4">
          <span class="w-2 h-2 rounded-full bg-info animate-pulse"></span>
          缓存管理
        </div>
        <h1 class="text-4xl font-bold tracking-tight mb-2">缓存管理</h1>
        <p class="text-text-secondary text-lg">监控和管理图片视频缓存</p>
      </div>
      <button
        @click="refreshStats"
        class="btn btn-secondary"
      >
        <svg class="w-5 h-5" :class="{ 'animate-spin': cacheStore.loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>刷新统计</span>
      </button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Cache -->
      <div class="card animate-fade-in-up delay-75">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center">
              <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider">总计</span>
          </div>
          <div class="text-4xl font-bold mb-2 text-gradient">{{ cacheStore.totalSizeFormatted }}</div>
          <p class="text-sm text-text-muted">{{ cacheStore.totalFiles }} 个文件</p>
        </div>
      </div>

      <!-- Image Cache -->
      <div class="card animate-fade-in-up delay-100">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-info-soft flex items-center justify-center">
              <svg class="w-6 h-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider">图片</span>
          </div>
          <div class="text-4xl font-bold mb-2">{{ cacheStore.imageCache.count }}</div>
          <p class="text-sm text-text-muted">个缓存文件</p>
        </div>
      </div>

      <!-- Database -->
      <div class="card animate-fade-in-up delay-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-success-soft flex items-center justify-center">
              <svg class="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8M12 8v8" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-text-muted uppercase tracking-wider">数据库</span>
          </div>
          <div class="text-4xl font-bold mb-2">{{ cacheStore.dbSizeFormatted }}</div>
          <p class="text-sm text-text-muted">imgCache.db</p>
        </div>
      </div>
    </div>

    <!-- Clean Actions -->
    <div class="card animate-fade-in-up delay-250">
      <div class="p-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-xl bg-error-soft flex items-center justify-center">
            <svg class="w-5 h-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold">清理操作</h2>
            <p class="text-sm text-text-muted">清理过期或全部缓存文件</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Clean by days -->
          <div class="bg-bg-elevated rounded-2xl p-6 border border-border-subtle">
            <h3 class="text-lg font-semibold mb-2">清理旧缓存</h3>
            <p class="text-sm text-text-muted mb-6">清理指定天数之前的缓存文件</p>
            <div class="flex items-center gap-3">
              <div class="relative flex-1">
                <input
                  v-model="cleanDays"
                  type="number"
                  min="1"
                  max="365"
                  class="input pr-12"
                  placeholder="天数"
                />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium">天</span>
              </div>
              <button
                @click="handleCleanDays"
                :disabled="cacheStore.cleaning"
                class="btn btn-primary px-6"
              >
                清理
              </button>
            </div>
          </div>

          <!-- Clean all -->
          <div class="bg-bg-elevated rounded-2xl p-6 border border-error/20">
            <h3 class="text-lg font-semibold mb-2 text-error">清空全部缓存</h3>
            <p class="text-sm text-text-muted mb-6">删除所有缓存文件，此操作不可恢复</p>
            <button
              @click="handleCleanAll"
              :disabled="cacheStore.cleaning"
              class="btn btn-danger w-full py-3"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{{ cacheStore.cleaning ? '清理中...' : '清空全部' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCacheStore } from '../stores/cache.js'

const cacheStore = useCacheStore()
const cleanDays = ref(30)

async function refreshStats() {
  await cacheStore.fetchStats()
}

async function handleCleanDays() {
  if (!cleanDays.value || cleanDays.value < 1) return
  try {
    await cacheStore.clean(cleanDays.value)
  } catch (e) {
    alert(e.message || '清理失败')
  }
}

async function handleCleanAll() {
  if (!confirm('确定要清空全部缓存吗？此操作不可恢复。')) return
  try {
    await cacheStore.clean()
  } catch (e) {
    alert(e.message || '清理失败')
  }
}

onMounted(() => {
  refreshStats()
})
</script>
