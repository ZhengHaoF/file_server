<script setup>
import { computed } from 'vue'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-vue-next'

const props = defineProps({
  tone: { type: String, default: 'info' }, // info | ok | warn | err
  title: { type: String, default: '' },
  live: { type: Boolean, default: true }
})
const icon = computed(() => ({ ok: CheckCircle2, warn: AlertTriangle, err: XCircle }[props.tone] || Info))
</script>

<template>
  <div class="alert" :class="tone" :role="tone === 'err' ? 'alert' : 'status'" :aria-live="live ? 'polite' : 'off'">
    <component :is="icon" class="alert-icon" aria-hidden="true" />
    <div class="alert-body">
      <strong v-if="title" class="alert-title">{{ title }}</strong>
      <div class="alert-text"><slot /></div>
    </div>
    <div v-if="$slots.actions" class="alert-actions"><slot name="actions" /></div>
  </div>
</template>

<style scoped>
.alert { display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border: 1px solid transparent; font-size: var(--text-sm); background: var(--color-info-soft); color: var(--color-text); border-color: color-mix(in oklab, var(--color-info) 25%, transparent); }
.alert.ok { background: var(--color-success-soft); border-color: color-mix(in oklab, var(--color-success) 25%, transparent); }
.alert.warn { background: var(--color-warning-soft); border-color: color-mix(in oklab, var(--color-warning) 28%, transparent); }
.alert.err { background: var(--color-error-soft); border-color: color-mix(in oklab, var(--color-error) 28%, transparent); }
.alert-icon { width: 18px; height: 18px; flex: none; margin-top: 1px; color: var(--color-info); }
.ok .alert-icon { color: var(--color-success); }
.warn .alert-icon { color: var(--color-warning); }
.err .alert-icon { color: var(--color-error); }
.alert-body { flex: 1; min-width: 0; display: grid; gap: 2px; }
.alert-title { font-weight: 620; }
.alert-text { color: var(--color-text); overflow-wrap: anywhere; }
.alert-actions { display: flex; gap: var(--space-2); flex-wrap: wrap; align-self: center; }
@media (max-width: 600px) { .alert { flex-wrap: wrap; } .alert-actions { width: 100%; } }
</style>
