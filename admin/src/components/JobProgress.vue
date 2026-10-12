<script setup>
import { computed } from 'vue'
import { JOB_STATUS, jobTypeLabel } from '../composables/useJobWatcher.js'
import { formatBytes, formatDateTime, formatNumber } from '../lib/format.js'

const props = defineProps({ job: { type: Object, required: true }, compact: Boolean })
const st = computed(() => JOB_STATUS[props.job.status] || ['', props.job.status || '未知'])
const pct = computed(() => {
  const p = props.job.progress
  if (!p || !p.total) return null
  return Math.min(100, Math.round((p.processed / p.total) * 100))
})
</script>

<template>
  <div class="job" :data-status="job.status" data-testid="job-progress">
    <div class="job-head">
      <span class="badge" :class="st[0]" data-testid="badge-job-status"><span class="dot" :class="{ pulse: job.status === 'running' }" />{{ st[1] }}</span>
      <strong>{{ jobTypeLabel(job.type) }}</strong>
      <span class="mono small faint">#{{ job.id }}</span>
    </div>
    <div v-if="job.status === 'running' || job.status === 'queued'" class="bar" role="progressbar" :aria-valuenow="pct ?? undefined" aria-valuemin="0" aria-valuemax="100" :aria-label="`${jobTypeLabel(job.type)}进度`">
      <div class="bar-fill" :class="{ indeterminate: pct === null }" :style="pct !== null ? { width: pct + '%' } : {}" />
    </div>
    <div class="job-meta small muted num">
      <span v-if="job.progress">已处理 {{ formatNumber(job.progress.processed) }}<template v-if="job.progress.total"> / {{ formatNumber(job.progress.total) }}</template></span>
      <span v-if="job.result">删除 {{ formatNumber(job.result.cleaned) }} 个 · 释放 {{ formatBytes(job.result.freedBytes) }} · 失败 {{ formatNumber(job.result.failed) }}</span>
      <span v-if="!compact">创建 {{ formatDateTime(job.createdAt) }}</span>
      <span v-if="job.finishedAt && !compact">结束 {{ formatDateTime(job.finishedAt) }}</span>
    </div>
    <p v-if="job.error" class="field-error" data-testid="text-job-error">{{ job.error }}</p>
  </div>
</template>

<style scoped>
.job { display: grid; gap: var(--space-2); }
.job-head { display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap; font-size: var(--text-sm); }
.bar { height: 6px; background: var(--color-surface-offset); border-radius: var(--radius-full); overflow: hidden; }
.bar-fill { height: 100%; background: var(--color-primary); transition: width 400ms var(--ease); }
.bar-fill.indeterminate { width: 30%; animation: indet 1.4s ease-in-out infinite; }
@keyframes indet { 0% { transform: translateX(-100%); } 100% { transform: translateX(340%); } }
.job-meta { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-4); }
</style>
