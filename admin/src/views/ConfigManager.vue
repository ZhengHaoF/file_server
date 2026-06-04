<template>
  <div class="p-8 space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="badge badge-success mb-4">
          <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          配置管理
        </div>
        <h1 class="text-4xl font-bold tracking-tight mb-2">配置管理</h1>
        <p class="text-text-secondary text-lg">查看服务器配置和系统信息</p>
      </div>
      <button
        @click="refreshConfig"
        class="btn btn-secondary"
      >
        <svg class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>刷新配置</span>
      </button>
    </div>

    <!-- Config Display -->
    <div class="card animate-fade-in-up delay-75">
      <div class="p-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold">当前配置</h2>
            <p class="text-sm text-text-muted">服务器运行时配置（敏感信息已脱敏）</p>
          </div>
        </div>

        <div v-if="loading" class="p-12 text-center">
          <div class="inline-flex items-center gap-3 text-text-muted">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="text-sm font-medium">加载中...</span>
          </div>
        </div>

        <div v-else-if="config" class="space-y-4">
          <div
            v-for="(value, key) in config"
            :key="key"
            class="bg-bg-elevated rounded-xl p-4 border border-border-subtle hover:border-border-default transition-fast"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <span class="text-sm font-bold text-text-muted font-mono">{{ key.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <p class="font-semibold text-sm">{{ key }}</p>
                  <p class="text-xs text-text-muted font-mono mt-1">{{ value }}</p>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="p-12 text-center">
          <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p class="text-text-muted font-medium">暂无配置信息</p>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="card animate-fade-in-up delay-100 border-error/20">
      <div class="p-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-xl bg-error-soft flex items-center justify-center">
            <svg class="w-5 h-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-error">危险操作</h2>
            <p class="text-sm text-text-muted">以下操作可能影响服务运行</p>
          </div>
        </div>

        <div class="bg-bg-elevated rounded-2xl p-6 border border-error/20">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold mb-2">重启服务器</h3>
              <p class="text-sm text-text-muted">重启后服务将短暂中断，请谨慎操作</p>
            </div>
            <button
              @click="handleRestart"
              :disabled="restarting"
              class="btn btn-danger px-6"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ restarting ? '重启中...' : '重启服务' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getConfig } from '../api/config.js'
import { restartServer } from '../api/status.js'

const config = ref(null)
const loading = ref(false)
const restarting = ref(false)

async function refreshConfig() {
  loading.value = true
  try {
    config.value = await getConfig()
  } catch (e) {
    console.error('获取配置失败:', e)
  } finally {
    loading.value = false
  }
}

async function handleRestart() {
  if (!confirm('确定要重启服务器吗？服务将短暂中断。')) return
  restarting.value = true
  try {
    await restartServer()
    alert('重启指令已发送，服务将在几秒后重启')
  } catch (e) {
    alert(e.message || '重启失败')
  } finally {
    restarting.value = false
  }
}

onMounted(() => {
  refreshConfig()
})
</script>
