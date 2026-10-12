<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutDashboard, HardDrive, ScrollText, SlidersHorizontal, ListChecks, KeyRound,
  LogOut, Menu, X, Sun, Moon, WifiOff, RefreshCw
} from 'lucide-vue-next'
import AppLogo from '../components/AppLogo.vue'
import DemoBanner from '../components/DemoBanner.vue'
import InlineAlert from '../components/InlineAlert.vue'
import { auth } from '../stores/auth.js'
import { useTheme } from '../composables/useTheme.js'
import { confirm } from '../composables/useConfirm.js'
import { describeError } from '../lib/http.js'
import { formatDateTime } from '../lib/format.js'

const route = useRoute()
const { theme, toggle } = useTheme()
const drawerOpen = ref(false)
const sidebar = ref(null)
let drawerFocus = null
const loggingOut = ref(false)
const retrying = ref(false)

const nav = [
  { to: '/overview', label: '概览', icon: LayoutDashboard },
  { to: '/cache', label: '缓存', icon: HardDrive },
  { to: '/logs', label: '日志', icon: ScrollText },
  { to: '/config', label: '配置', icon: SlidersHorizontal },
  { to: '/operations', label: '任务与审计', icon: ListChecks },
  { to: '/sessions', label: '会话', icon: KeyRound }
]

const unreachable = computed(() => auth.state.status === 'unreachable')
const title = computed(() => route.meta.title || '')

watch(() => route.fullPath, () => { drawerOpen.value = false })
watch(drawerOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    drawerFocus = document.activeElement
    await nextTick()
    sidebar.value?.querySelector('button')?.focus()
  } else {
    await nextTick()
    drawerFocus?.focus?.()
    drawerFocus = null
  }
})

function onKey(e) {
  if (!drawerOpen.value) return
  if (e.key === 'Escape') { e.preventDefault(); drawerOpen.value = false }
  if (e.key === 'Tab') {
    const items = [...(sidebar.value?.querySelectorAll('a,button:not([disabled])') || [])]
    const first = items[0], last = items.at(-1)
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' })

async function onLogout() {
  const ok = await confirm({ title: '退出登录', message: '将撤销当前管理会话并关闭实时日志连接。', confirmText: '退出登录' })
  if (!ok) return
  loggingOut.value = true
  // Navigates to login; an unconfirmed server logout is reported prominently there.
  await auth.logout()
  loggingOut.value = false
}

async function retryConnection() {
  retrying.value = true
  await auth.checkSession()
  retrying.value = false
}
</script>

<template>
  <div class="shell" :class="{ 'drawer-open': drawerOpen }">
    <a class="skip-link" href="#main">跳到主要内容</a>
    <DemoBanner class="shell-banner" />
    <aside id="sidebar" ref="sidebar" class="sidebar" aria-label="主导航" :role="drawerOpen ? 'dialog' : undefined" :aria-modal="drawerOpen ? 'true' : undefined">
      <div class="brand">
        <AppLogo :size="26" />
        <div class="brand-text"><strong>File Serve</strong><span>管理后台</span></div>
        <button type="button" class="btn btn-ghost btn-icon drawer-close" aria-label="关闭导航" data-testid="button-close-nav" @click="drawerOpen = false"><X /></button>
      </div>
      <nav class="nav">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-link" :data-testid="`link-nav-${item.to.slice(1)}`">
          <component :is="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="side-foot">
        <div v-if="auth.state.expiresAt" class="small muted session-exp">会话到期 <span class="num">{{ formatDateTime(auth.state.expiresAt, { seconds: false }) }}</span></div>
        <button type="button" class="btn btn-ghost nav-link logout" :disabled="loggingOut" data-testid="button-logout" @click="onLogout">
          <RefreshCw v-if="loggingOut" class="spin" aria-hidden="true" /><LogOut v-else aria-hidden="true" />
          <span>{{ loggingOut ? '正在退出…' : '退出登录' }}</span>
        </button>
      </div>
    </aside>
    <div class="scrim" aria-hidden="true" @click="drawerOpen = false" />

    <header class="topbar" :inert="drawerOpen">
      <button type="button" class="btn btn-ghost btn-icon menu-btn" aria-label="打开导航" aria-controls="sidebar" :aria-expanded="drawerOpen" data-testid="button-open-nav" @click="drawerOpen = true"><Menu /></button>
      <div class="topbar-title">{{ title }}</div>
      <div class="spacer" />
      <button type="button" class="btn btn-ghost btn-icon" :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'" :title="theme === 'dark' ? '浅色模式' : '深色模式'" data-testid="button-theme" @click="toggle">
        <Sun v-if="theme === 'dark'" /><Moon v-else />
      </button>
    </header>

    <main id="main" class="main" tabindex="-1" :inert="drawerOpen">
      <div v-if="unreachable" class="main-alerts">
        <InlineAlert v-if="unreachable" tone="err" title="无法连接管理服务" data-testid="alert-unreachable">
          {{ describeError(auth.state.lastError) }}。这不代表已退出登录；页面会保留最后获取的数据。
          <template #actions>
            <button type="button" class="btn btn-sm" :disabled="retrying" data-testid="button-retry-connection" @click="retryConnection">
              <RefreshCw :class="{ spin: retrying }" aria-hidden="true" />重试连接
            </button>
          </template>
        </InlineAlert>
      </div>
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.shell { display: grid; grid-template-columns: var(--sidebar-w) minmax(0, 1fr); grid-template-rows: auto var(--topbar-h) 1fr; height: 100dvh; }
.shell-banner { grid-column: 1 / -1; grid-row: 1; }
.sidebar { grid-row: 2 / -1; display: flex; flex-direction: column; background: var(--color-surface); border-right: 1px solid var(--color-border); overflow-y: auto; overscroll-behavior: contain; }
.brand { display: flex; align-items: center; gap: var(--space-3); height: var(--topbar-h); padding: 0 var(--space-4); color: var(--color-text); border-bottom: 1px solid var(--color-divider); flex: none; }
.brand-text { display: grid; line-height: 1.15; flex: 1; }
.brand-text strong { font-size: var(--text-sm); font-weight: 680; letter-spacing: -0.005em; }
.brand-text span { font-size: var(--text-xs); color: var(--color-text-muted); }
.drawer-close { display: none; }
.nav { display: grid; gap: 2px; padding: var(--space-3) var(--space-2); }
.nav-link { display: flex; align-items: center; gap: var(--space-3); min-height: 38px; padding: 0 var(--space-3); border-radius: var(--radius-md); color: var(--color-text-muted); font-size: var(--text-sm); font-weight: 520; text-decoration: none; width: 100%; justify-content: flex-start; border: 0; }
.nav-link svg { width: 17px; height: 17px; flex: none; }
.nav-link:hover { background: var(--color-surface-offset); color: var(--color-text); text-decoration: none; }
.nav-link.router-link-active { background: var(--color-primary-soft); color: var(--color-primary-text); font-weight: 600; }
.side-foot { margin-top: auto; padding: var(--space-3) var(--space-2) var(--space-4); border-top: 1px solid var(--color-divider); display: grid; gap: var(--space-2); }
.session-exp { padding: 0 var(--space-3); }
.logout:hover:not(:disabled) { color: var(--color-error); }
.topbar { grid-column: 2; grid-row: 2; display: flex; align-items: center; gap: var(--space-2); padding: 0 var(--space-4) 0 var(--space-6); background: color-mix(in oklab, var(--color-bg) 88%, transparent); border-bottom: 1px solid var(--color-divider); backdrop-filter: blur(8px); z-index: 5; }
.topbar-title { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-muted); }
.menu-btn { display: none; }
.main { min-width: 0; grid-column: 2; grid-row: 3; overflow-y: auto; overscroll-behavior: contain; outline: none; }
.main-alerts { max-width: 1320px; margin: var(--space-4) auto 0; padding: 0 var(--space-6); display: grid; gap: var(--space-2); }
.scrim { display: none; }

@media (max-width: 960px) {
  .shell { grid-template-columns: minmax(0, 1fr); }
  .sidebar { position: fixed; inset: 0 auto 0 0; width: min(280px, 84vw); z-index: 60; transform: translateX(-100%); transition: transform 220ms var(--ease); box-shadow: var(--shadow-lg); }
  .drawer-open .sidebar { transform: none; }
  .drawer-close { display: inline-flex; }
  .scrim { display: block; position: fixed; inset: 0; z-index: 55; background: oklch(0.15 0.01 230 / 0.4); opacity: 0; pointer-events: none; transition: opacity 200ms; }
  .drawer-open .scrim { opacity: 1; pointer-events: auto; }
  .topbar, .main { grid-column: 1; }
  .topbar { padding: 0 var(--space-3); }
  .menu-btn { display: inline-flex; }
  .main-alerts { padding: 0 var(--space-3); }
}
@media (max-width: 960px) { .nav-link { min-height: 44px; } }
</style>
