<script setup>
import { computed } from 'vue'

const props = defineProps({
  points: { type: Array, default: () => [] }, // numbers or null (gaps)
  max: { type: Number, default: null },
  color: { type: String, default: 'var(--chart-1)' },
  label: { type: String, default: '趋势' },
  height: { type: Number, default: 44 }
})
const W = 240
const path = computed(() => {
  const pts = props.points
  if (pts.filter((v) => typeof v === 'number').length < 2) return { line: '', area: '' }
  const nums = pts.filter((v) => typeof v === 'number')
  const max = props.max ?? Math.max(...nums, 1)
  const min = props.max ? 0 : Math.min(...nums, 0)
  const span = max - min || 1
  const step = W / Math.max(1, pts.length - 1)
  let line = ''
  let area = ''
  let segStart = null
  pts.forEach((v, i) => {
    if (typeof v !== 'number') { if (segStart !== null) { area += `L${((i - 1) * step).toFixed(1)},${props.height}Z`; segStart = null } return }
    const x = (i * step).toFixed(1)
    const y = (props.height - 2 - ((v - min) / span) * (props.height - 4)).toFixed(1)
    if (segStart === null) { line += `M${x},${y}`; area += `M${x},${props.height}L${x},${y}`; segStart = i } else { line += `L${x},${y}`; area += `L${x},${y}` }
  })
  if (segStart !== null) area += `L${((pts.length - 1) * step).toFixed(1)},${props.height}Z`
  return { line, area }
})
</script>

<template>
  <svg class="spark" :viewBox="`0 0 ${W} ${height}`" preserveAspectRatio="none" role="img" :aria-label="label" :style="{ height: height + 'px' }">
    <template v-if="path.line">
      <path :d="path.area" :fill="color" opacity="0.1" />
      <path :d="path.line" :stroke="color" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke" stroke-linejoin="round" />
    </template>
    <text v-else x="0" :y="height / 2 + 4" class="spark-empty">历史样本不足</text>
  </svg>
</template>

<style scoped>
.spark { width: 100%; display: block; }
.spark-empty { font-size: 11px; fill: var(--color-text-faint); }
</style>
