<template>
  <div class="min-h-[100dvh] flex items-center justify-center p-8 bg-bg-primary">
    <div class="relative w-full max-w-md animate-fade-in-up">
      <!-- Login Card -->
      <div class="card">
        <div class="p-8">
          <!-- Logo -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-accent mb-6 shadow-glow-lg">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <h1 class="text-3xl font-bold tracking-tight mb-2">File Serve Admin</h1>
            <p class="text-text-secondary">请输入管理员密码访问后台</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                管理员密码
              </label>
              <div class="relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  v-model="password"
                  type="password"
                  placeholder="输入密码"
                  class="input pl-12"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary w-full py-4 text-base font-semibold"
            >
              <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ loading ? '验证中...' : '登录' }}</span>
            </button>

            <div v-if="error" class="bg-error-soft border border-error/20 rounded-xl p-4">
              <p class="text-sm text-error text-center font-medium">{{ error }}</p>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-xs text-text-muted">File Serve 管理后台 v1.0</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getStatus } from '../api/status.js'

const router = useRouter()
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!password.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    // 存储 token 到 localStorage
    localStorage.setItem('adminToken', password.value)
    
    // 验证 token 是否有效
    await getStatus()
    
    // 验证成功，跳转到仪表盘
    router.push('/dashboard')
  } catch (e) {
    // 验证失败，清除 token
    localStorage.removeItem('adminToken')
    error.value = e.message || '密码错误，请重试'
  } finally {
    loading.value = false
  }
}
</script>
