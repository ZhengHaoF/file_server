import { ref } from 'vue'

// Theme preference only (not a credential). Persisting is best-effort; failures are ignored.
const KEY = 'fs-admin-theme'
const theme = ref('light')

function read() {
  try { const v = globalThis.localStorage?.getItem(KEY); if (v === 'light' || v === 'dark') return v } catch { /* blocked storage */ }
  return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(value) {
  theme.value = value
  document.documentElement.setAttribute('data-theme', value)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'dark' ? '#121416' : '#f5f6f7')
}

export function initTheme() { apply(read()) }

export function useTheme() {
  return {
    theme,
    toggle() {
      const next = theme.value === 'dark' ? 'light' : 'dark'
      apply(next)
      try { globalThis.localStorage?.setItem(KEY, next) } catch { /* ignore */ }
    }
  }
}
