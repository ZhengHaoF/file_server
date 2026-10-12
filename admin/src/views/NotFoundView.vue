<script setup>
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import AppLogo from '../components/AppLogo.vue'
const route = useRoute()
</script>

<template>
  <main class="nf">
    <div class="nf-card">
      <AppLogo :size="32" />
      <p class="code num">404</p>
      <h1>页面不存在</h1>
      <p class="muted">管理后台中没有 <code data-testid="text-missing-path">{{ route.fullPath }}</code> 这个页面。</p>
      <RouterLink to="/overview" class="btn btn-primary" data-testid="link-home"><ArrowLeft aria-hidden="true" />返回概览</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.nf { min-height: 100dvh; display: grid; place-items: center; padding: var(--space-6); }
.nf-card { display: grid; justify-items: start; gap: var(--space-3); max-width: 420px; color: var(--color-text); }
.code { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-faint); letter-spacing: 0.2em; }
.nf-card p { overflow-wrap: anywhere; }
.btn { text-decoration: none; margin-top: var(--space-2); }
</style>
