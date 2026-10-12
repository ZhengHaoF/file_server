<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { AlertTriangle, HelpCircle, X } from 'lucide-vue-next'
import { confirmState, settleConfirm } from '../composables/useConfirm.js'

const dialog = ref(null)
const typed = ref('')
let restoreFocus = null

const canConfirm = computed(() => !confirmState.requireText || typed.value.trim() === confirmState.requireText)

function focusables() {
  return dialog.value ? [...dialog.value.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')] : []
}

watch(() => confirmState.open, async (open) => {
  if (open) {
    restoreFocus = document.activeElement
    typed.value = ''
    document.body.style.overflow = 'hidden'
    await nextTick()
    // Focus the safe choice (cancel) for destructive actions; the input when typing is required.
    const target = dialog.value?.querySelector(confirmState.requireText ? 'input' : confirmState.tone === 'danger' ? '[data-role="cancel"]' : '[data-role="confirm"]')
    target?.focus()
  } else {
    document.body.style.overflow = ''
    restoreFocus?.focus?.()
    restoreFocus = null
  }
})

function onKeydown(event) {
  if (event.key === 'Escape') { event.preventDefault(); settleConfirm(false); return }
  if (event.key === 'Tab') {
    const items = focusables()
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
}

function fmt(value) {
  if (value === undefined) return '（未设置）'
  if (Array.isArray(value)) return value.length ? value.join(', ') : '（空）'
  if (typeof value === 'boolean') return value ? '开启' : '关闭'
  if (value === '' || value === null) return '（空）'
  return String(value)
}

onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="confirmState.open" class="backdrop" data-testid="confirm-backdrop" @mousedown.self="settleConfirm(false)">
        <div ref="dialog" class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message" data-testid="confirm-dialog" @keydown="onKeydown">
          <header class="dialog-head">
            <AlertTriangle v-if="confirmState.tone === 'danger'" class="dialog-icon danger" aria-hidden="true" />
            <HelpCircle v-else class="dialog-icon" aria-hidden="true" />
            <h2 id="confirm-title">{{ confirmState.title }}</h2>
            <button type="button" class="btn btn-ghost btn-icon" aria-label="关闭" data-testid="button-confirm-close" @click="settleConfirm(false)"><X /></button>
          </header>
          <div class="dialog-body">
            <p id="confirm-message" class="message">{{ confirmState.message }}</p>
            <div v-if="confirmState.details?.length" class="diff" data-testid="confirm-details">
              <div v-for="(d, i) in confirmState.details" :key="i" class="diff-row">
                <div class="diff-key">{{ d.label }}<span v-if="d.note" class="badge warn">{{ d.note }}</span></div>
                <div v-if="'before' in d || 'after' in d" class="diff-vals">
                  <code class="before">{{ fmt(d.before) }}</code>
                  <span aria-hidden="true" class="arrow">→</span>
                  <span class="sr-only">改为</span>
                  <code class="after">{{ fmt(d.after) }}</code>
                </div>
                <div v-else-if="d.text" class="muted small">{{ d.text }}</div>
              </div>
            </div>
            <label v-if="confirmState.requireText" class="field require">
              <span class="field-label">请输入 <code>{{ confirmState.requireText }}</code> 以确认</span>
              <input v-model="typed" class="input" autocomplete="off" spellcheck="false" data-testid="input-confirm-text" @keydown.enter.prevent="canConfirm && settleConfirm(true)" />
            </label>
          </div>
          <footer class="dialog-foot">
            <button type="button" class="btn" data-role="cancel" data-testid="button-confirm-cancel" @click="settleConfirm(false)">{{ confirmState.cancelText }}</button>
            <button type="button" class="btn" :class="confirmState.tone === 'danger' ? 'btn-danger' : 'btn-primary'" data-role="confirm" data-testid="button-confirm-ok" :disabled="!canConfirm" @click="settleConfirm(true)">{{ confirmState.confirmText }}</button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop { position: fixed; inset: 0; z-index: 80; background: oklch(0.15 0.01 230 / 0.45); display: grid; place-items: center; padding: var(--space-4); }
.dialog { width: min(520px, 100%); max-height: calc(100dvh - 2 * var(--space-4)); display: flex; flex-direction: column; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); }
.dialog-head { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-3) var(--space-3) var(--space-5); border-bottom: 1px solid var(--color-divider); }
.dialog-head h2 { flex: 1; }
.dialog-icon { width: 18px; height: 18px; color: var(--color-primary); }
.dialog-icon.danger { color: var(--color-error); }
.dialog-body { padding: var(--space-4) var(--space-5); overflow-y: auto; overscroll-behavior: contain; display: grid; gap: var(--space-4); }
.message { color: var(--color-text); white-space: pre-line; }
.diff { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.diff-row { padding: var(--space-2) var(--space-3); display: grid; gap: 4px; border-bottom: 1px solid var(--color-divider); }
.diff-row:last-child { border-bottom: 0; }
.diff-key { font-size: var(--text-xs); font-weight: 600; display: flex; gap: var(--space-2); align-items: center; }
.diff-vals { display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: center; font-size: var(--text-xs); }
.before { color: var(--color-text-muted); text-decoration: line-through; overflow-wrap: anywhere; }
.after { color: var(--color-primary-text); font-weight: 600; overflow-wrap: anywhere; }
.arrow { color: var(--color-text-faint); }
.dialog-foot { display: flex; justify-content: flex-end; gap: var(--space-2); padding: var(--space-3) var(--space-5) var(--space-4); }
.modal-enter-active, .modal-leave-active { transition: opacity 160ms var(--ease); }
.modal-enter-active .dialog, .modal-leave-active .dialog { transition: transform 200ms var(--ease); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .dialog { transform: translateY(8px) scale(0.98); }
</style>
