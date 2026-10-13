<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Eye, EyeOff, LogIn, RefreshCw, Sun, Moon } from 'lucide-vue-next'
import AppLogo from '../components/AppLogo.vue'
import DemoBanner from '../components/DemoBanner.vue'
import InlineAlert from '../components/InlineAlert.vue'
import { auth } from '../stores/auth.js'
import { safeRedirect } from '../router/index.js'
import { describeError } from '../lib/http.js'
import { PREVIEW, PREVIEW_TOKEN } from '../lib/env.js'
import { useTheme } from '../composables/useTheme.js'

const route = useRoute()
const router = useRouter()
const { theme, toggle } = useTheme()
const token = ref('')
const reveal = ref(false)
const submitting = ref(false)
const error = ref('')
const fieldError = ref('')
const input = ref(null)

const REASONS = {
  expired: ['warn', '会话已失效，请重新登录。'],
  revoked: ['info', '当前会话已被撤销。'],
  logout: ['ok', '已退出登录，服务器会话已撤销。'],
  'logout-unconfirmed': ['err', '已在本浏览器退出，但服务器未确认注销（无法连接或出错）。该会话可能仍然有效，直到过期；恢复连接后请登录并在“会话”页撤销。'],
  restart: ['info', '服务已重启，内存中的会话已重置，请重新登录。'],
  forbidden: ['warn', '当前凭据没有管理权限。']
}
const reason = computed(() => REASONS[route.query.reason] || null)

async function submit() {
  error.value = ''
  fieldError.value = ''
  const value = token.value.trim()
  if (!value) { fieldError.value = '请输入管理令牌'; input.value?.focus(); return }
  submitting.value = true
  try {
    await auth.login(value)
    token.value = ''
    await router.replace(safeRedirect(route.query.redirect))
  } catch (err) {
    if (err?.status === 401) fieldError.value = '令牌无效，请检查后重试'
    else if (err?.status === 429) error.value = '登录尝试过于频繁，请稍后再试'
    else error.value = describeError(err)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  if (PREVIEW) {
    token.value = PREVIEW_TOKEN
    if (!route.query.reason) submit()
  }
  input.value?.focus()
})
</script>

<template>
  <div class="login-page">
    <DemoBanner />
    <button type="button" class="btn btn-ghost btn-icon theme" :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'" data-testid="button-theme" @click="toggle">
      <Sun v-if="theme === 'dark'" /><Moon v-else />
    </button>
    <main class="login-main">
      <form class="login-card card" novalidate data-testid="form-login" @submit.prevent="submit">
        <div class="brand">
          <AppLogo :size="36" />
          <div>
            <h1>File Serve 管理后台</h1>
            <p class="muted small">使用管理令牌登录。令牌只用于换取会话，不会保存在浏览器中。</p>
          </div>
        </div>

        <InlineAlert v-if="reason && !error" :tone="reason[0]" :title="route.query.reason === 'logout-unconfirmed' ? '注销未确认' : ''" data-testid="alert-login-reason">{{ reason[1] }}</InlineAlert>
        <InlineAlert v-if="error" tone="err" title="登录失败" data-testid="alert-login-error">{{ error }}</InlineAlert>
        <InlineAlert v-if="PREVIEW" tone="warn">演示模式将使用隔离的演示令牌自动登录。</InlineAlert>

        <div class="field">
          <label class="field-label" for="token">管理令牌</label>
          <div class="pw">
            <input id="token" ref="input" v-model="token" class="input mono" :class="{ invalid: fieldError }" :type="reveal ? 'text' : 'password'" autocomplete="off" spellcheck="false" :aria-invalid="!!fieldError" aria-describedby="token-error" data-testid="input-token" />
            <button type="button" class="btn btn-ghost btn-icon reveal" :aria-label="reveal ? '隐藏令牌' : '显示令牌'" :aria-pressed="reveal" data-testid="button-reveal" @click="reveal = !reveal">
              <EyeOff v-if="reveal" /><Eye v-else />
            </button>
          </div>
          <p v-if="fieldError" id="token-error" class="field-error" role="alert" data-testid="text-token-error">{{ fieldError }}</p>
        </div>

        <button type="submit" class="btn btn-primary submit" :disabled="submitting" data-testid="button-login">
          <RefreshCw v-if="submitting" class="spin" aria-hidden="true" /><LogIn v-else aria-hidden="true" />
          {{ submitting ? '正在验证…' : '登录' }}
        </button>
        <p class="muted small foot">管理令牌与文件访问令牌不同，位于服务器私有配置 <code>auth.local.json</code>。</p>
      </form>
    </main>
  </div>
</template>

<style scoped>
.login-page { min-height: 100dvh; display: flex; flex-direction: column; background: var(--color-bg); position: relative; }
.theme { position: absolute; right: var(--space-3); top: var(--space-3); }
.login-page :deep(.demo) + .theme { top: calc(var(--space-3) + 28px); }
.login-main { flex: 1; display: grid; place-items: center; padding: var(--space-8) var(--space-4); }
.login-card { width: min(400px, 100%); padding: var(--space-6); display: grid; gap: var(--space-4); box-shadow: var(--shadow-md); }
.brand { display: flex; gap: var(--space-3); align-items: flex-start; color: var(--color-text); }
.brand h1 { font-size: var(--text-lg); margin-bottom: 2px; }
.pw { position: relative; }
.pw .input { padding-right: 44px; }
.reveal { position: absolute; right: 2px; top: 50%; transform: translateY(-50%); }
.submit { width: 100%; min-height: 40px; }
.foot { line-height: 1.6; }
</style>
