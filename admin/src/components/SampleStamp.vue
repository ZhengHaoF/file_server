<script setup>
import { computed, onBeforeUnmount } from 'vue'
import { Clock, AlertTriangle, RefreshCw } from 'lucide-vue-next'
import { useClock } from '../composables/useClock.js'
import { formatTime, formatRelative, formatDateTime, toDate } from '../lib/format.js'

const props = defineProps({
  at: { type: [Number, String, Date], default: null },
  stale: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  label: { type: String, default: '采样于' }
})
const { now, release } = useClock()
onBeforeUnmount(release)
const date = computed(() => toDate(props.at))
const rel = computed(() => (date.value ? formatRelative(date.value, now.value) : ''))
</script>

<template>
  <span class="stamp" :class="{ stale }" data-testid="sample-stamp" :title="date ? formatDateTime(date) : ''">
    <RefreshCw v-if="loading" class="spin" aria-hidden="true" />
    <AlertTriangle v-else-if="stale" aria-hidden="true" />
    <Clock v-else aria-hidden="true" />
    <template v-if="date">
      <span>{{ stale ? '数据可能已过期 · ' : '' }}{{ label }} <time class="num" :datetime="date.toISOString()">{{ formatTime(date) }}</time></span>
      <span class="faint">（{{ rel }}）</span>
    </template>
    <span v-else>{{ loading ? '正在获取…' : '尚无数据' }}</span>
  </span>
</template>

<style scoped>
.stamp { display: inline-flex; align-items: center; gap: 6px; font-size: var(--text-xs); color: var(--color-text-muted); white-space: nowrap; }
.stamp svg { width: 13px; height: 13px; }
.stamp.stale { color: var(--color-warning); }
@media (max-width: 520px) { .stamp { white-space: normal; flex-wrap: wrap; } }
</style>
