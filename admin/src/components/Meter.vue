<script setup>
import { computed } from 'vue'
const props = defineProps({ value: { type: Number, default: null }, label: { type: String, default: '' } })
const pct = computed(() => (typeof props.value === 'number' && Number.isFinite(props.value) ? Math.min(100, Math.max(0, props.value)) : null))
const tone = computed(() => (pct.value === null ? '' : pct.value >= 90 ? 'err' : pct.value >= 75 ? 'warn' : 'ok'))
</script>

<template>
  <div class="meter" :class="tone" role="meter" :aria-label="label" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="pct ?? undefined" :aria-valuetext="pct === null ? '未知' : `${pct.toFixed(1)}%`">
    <div v-if="pct !== null" class="meter-fill" :style="{ width: pct + '%' }" />
    <div v-else class="meter-unknown" />
  </div>
</template>

<style scoped>
.meter { height: 6px; border-radius: var(--radius-full); background: var(--color-surface-offset); overflow: hidden; }
.meter-fill { height: 100%; background: var(--color-primary); border-radius: inherit; transition: width 500ms var(--ease); }
.meter.warn .meter-fill { background: var(--color-warning); }
.meter.err .meter-fill { background: var(--color-error); }
.meter-unknown { height: 100%; width: 100%; background: repeating-linear-gradient(135deg, var(--color-surface-dynamic) 0 6px, transparent 6px 12px); }
</style>
