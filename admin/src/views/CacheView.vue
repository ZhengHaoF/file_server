<script setup>
import { ref, computed, onMounted } from 'vue'
import { HardDrive, Database, RefreshCw, Eraser, Settings2, ListChecks } from 'lucide-vue-next'
import * as api from '../api/admin.js'
import { useResource } from '../composables/useResource.js'
import { useJobWatcher, TERMINAL } from '../composables/useJobWatcher.js'
import { confirm } from '../composables/useConfirm.js'
import { describeError } from '../lib/http.js'
import { formatBytes, formatNumber, formatDateTime, DASH } from '../lib/format.js'
import SampleStamp from '../components/SampleStamp.vue'
import InlineAlert from '../components/InlineAlert.vue'
import EmptyState from '../components/EmptyState.vue'
import JobProgress from '../components/JobProgress.vue'

const stats = useResource((o) => api.getCacheStats(o))
const d = computed(() => stats.data.value)

const segments = computed(() => {
  if (!d.value) return []
  const items = [
    { key: 'image', label: '图片缩略图', color: 'var(--chart-1)', ...(d.value.imageCache || {}) },
    { key: 'video', label: '视频截图', color: 'var(--chart-2)', ...(d.value.videoCache || {}) },
    { key: 'legacy', label: '旧版未分类', color: 'var(--chart-3)', ...(d.value.legacyCache || {}) }
  ]
  const total = items.reduce((sum, i) => sum + (i.size || 0), 0)
  return items.map((i) => ({ ...i, pct: total ? ((i.size || 0) / total) * 100 : 0 }))
})
const db = computed(() => d.value?.database || null)
const policy = computed(() => d.value?.policy || null)
const usagePct = computed(() => {
  if (!policy.value?.cacheMaxSizeMB || typeof d.value?.totalSize !== 'number') return null
  return (d.value.totalSize / (policy.value.cacheMaxSizeMB * 1024 * 1024)) * 100
})
const maintenance = computed(() => {
  const m = d.value?.maintenance
  if (!m) return null
  if (typeof m === 'string') return m === 'idle' ? null : m
  if (typeof m === 'object') return m.active || m.running || m.paused ? (m.status || '维护中') : null
  return m === true ? '维护中' : null
})

// ---------- Cleanup job ----------
const mode = ref('expired')
const days = ref(30)
const daysError = ref('')
const submitting = ref(false)
const submitError = ref(null)
const outcome = ref(null) // finished job
const watcher = useJobWatcher({ onDone: (job) => { outcome.value = job; stats.load() } })
const activeJob = computed(() => (watcher.job.value && !TERMINAL.has(watcher.job.value.status) ? watcher.job.value : null))

const MODES = [
  { value: 'expired', label: '清理过期缓存', help: '删除超过指定天数未访问的缓存文件。' },
  { value: 'policy', label: '按当前策略清理', help: '按保留天数与容量上限清理，与自动清理规则一致。' },
  { value: 'all', label: '清空全部缓存', help: '删除全部派生缓存，之后浏览时会重新生成。' }
]

function validateDays() {
  const n = Number(days.value)
  if (!Number.isInteger(n) || n < 1 || n > 3650) { daysError.value = '请输入 1–3650 之间的整数天数'; return false }
  daysError.value = ''
  return true
}

async function startJob() {
  submitError.value = null
  outcome.value = null
  if (mode.value === 'expired' && !validateDays()) return
  const payload = { mode: mode.value }
  if (mode.value === 'expired') payload.days = Number(days.value)
  const ok = await confirm(mode.value === 'all'
    ? { title: '清空全部缓存', tone: 'danger', confirmText: '清空缓存', requireText: '清空',
        message: `当前缓存目录有 ${formatNumber(d.value?.totalFiles)} 个文件（${formatBytes(d.value?.totalSize)}）。将删除其中可识别的派生缓存，未知名称与软链接会保留。\n不会删除共享目录中的原始文件。清理期间新的预览生成会暂停。` }
    : { title: MODES.find((m) => m.value === mode.value).label, confirmText: '开始清理',
        message: `${mode.value === 'expired' ? `删除超过 ${payload.days} 天未访问的缓存。` : '按保留天数与容量上限清理缓存。'}\n只影响派生缓存，不会删除原始文件。` })
  if (!ok) return
  submitting.value = true
  try {
    const res = await api.startCacheJob(payload)
    watcher.watch(res?.job ?? res)
  } catch (error) {
    submitError.value = error
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  // Resume tracking a maintenance job started elsewhere (another tab or auto cleanup).
  try {
    const res = await api.listJobs({ limit: 10 })
    const running = res?.jobs?.find((j) => !TERMINAL.has(j.status) && String(j.type || '').includes('cache'))
    if (running && !watcher.job.value) watcher.watch(running)
  } catch { /* non-critical */ }
})
</script>

<template>
  <section class="page" aria-labelledby="cache-title">
    <div class="page-head">
      <div>
        <h1 id="cache-title">缓存</h1>
        <p>缩略图与视频截图等派生缓存。清理只删除缓存文件，不触及共享目录中的原始文件。</p>
      </div>
      <div class="page-actions">
        <SampleStamp :at="stats.sampledAt.value" :stale="stats.stale.value" :loading="stats.loading.value" label="统计于" />
        <button type="button" class="btn" :disabled="stats.loading.value" data-testid="button-refresh-cache" @click="stats.load()"><RefreshCw :class="{ spin: stats.loading.value }" aria-hidden="true" />重新统计</button>
      </div>
    </div>

    <InlineAlert v-if="stats.stale.value" tone="warn" title="统计刷新失败" data-testid="alert-cache-stale">{{ describeError(stats.error.value) }}。显示的是上次成功统计的结果。</InlineAlert>

    <div v-if="stats.error.value && !d" class="card">
      <EmptyState :icon="HardDrive" title="无法读取缓存统计" :text="describeError(stats.error.value)">
        <button type="button" class="btn btn-primary" data-testid="button-retry-cache" @click="stats.load()"><RefreshCw aria-hidden="true" />重试</button>
      </EmptyState>
    </div>

    <div v-else class="cache-grid">
      <div class="card usage">
        <div class="card-head"><h2><HardDrive aria-hidden="true" />缓存占用</h2><span v-if="maintenance" class="badge warn" data-testid="badge-cache-maintenance"><span class="dot pulse" />{{ maintenance }}</span></div>
        <div class="card-body">
          <template v-if="d">
            <div class="total">
              <div><div class="big num" data-testid="text-cache-size">{{ formatBytes(d.totalSize) }}</div><div class="small muted num">{{ formatNumber(d.totalFiles) }} 个文件</div></div>
              <div v-if="usagePct !== null" class="cap small muted num">容量上限 {{ formatBytes(policy.cacheMaxSizeMB * 1024 * 1024) }} · 已用 {{ usagePct.toFixed(1) }}%</div>
            </div>
            <div class="stacked" role="img" :aria-label="segments.map((s) => `${s.label} ${formatBytes(s.size)}`).join('，')">
              <span v-for="s in segments" v-show="s.pct > 0" :key="s.key" :style="{ width: s.pct + '%', background: s.color }" />
            </div>
            <table class="table legend">
              <thead><tr><th>类型</th><th class="r">文件数</th><th class="r">大小</th></tr></thead>
              <tbody>
                <tr v-for="s in segments" :key="s.key" :data-testid="`row-cache-${s.key}`">
                  <td><span class="swatch" :style="{ background: s.color }" aria-hidden="true" />{{ s.label }}</td>
                  <td class="r num">{{ formatNumber(s.count) }}</td>
                  <td class="r num">{{ formatBytes(s.size) }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          <div v-else aria-busy="true" class="stack"><div class="skeleton sk-value" style="width: 30%" /><div class="skeleton sk-line" /><div v-for="i in 3" :key="i" class="skeleton sk-line" /></div>
        </div>
      </div>

      <div class="side">
        <div class="card">
          <div class="card-head"><h2><Database aria-hidden="true" />缓存数据库</h2></div>
          <div class="card-body">
            <dl v-if="d" class="kv">
              <dt>主文件</dt><dd class="num">{{ formatBytes(db?.main ?? d.dbSize) }}</dd>
              <dt>WAL 日志</dt><dd class="num">{{ formatBytes(db?.wal) }}</dd>
              <dt>SHM 共享内存</dt><dd class="num">{{ formatBytes(db?.shm) }}</dd>
              <dt>合计</dt><dd class="num strong">{{ formatBytes(db?.total) }}</dd>
              <dt>记录数</dt><dd class="num">{{ formatNumber(db?.recordCount) }}</dd>
            </dl>
            <div v-else class="stack" aria-busy="true"><div v-for="i in 4" :key="i" class="skeleton sk-line" /></div>
          </div>
        </div>
        <div class="card">
          <div class="card-head"><h2><Settings2 aria-hidden="true" />清理策略</h2><RouterLink to="/config" class="small" data-testid="link-cache-policy">修改策略</RouterLink></div>
          <div class="card-body">
            <dl v-if="d" class="kv">
              <dt>容量上限</dt><dd class="num">{{ policy?.cacheMaxSizeMB ? `${formatNumber(policy.cacheMaxSizeMB)} MB` : '不限制' }}</dd>
              <dt>保留天数</dt><dd class="num">{{ policy?.cacheRetentionDays ? `${policy.cacheRetentionDays} 天` : DASH }}</dd>
              <dt>自动清理</dt><dd><span class="badge" :class="policy?.autoCleanupEnabled ? 'ok' : ''">{{ policy?.autoCleanupEnabled ? '已开启' : '已关闭' }}</span></dd>
              <dt>上次清理</dt><dd class="num">{{ d.lastCleanupAt ? formatDateTime(d.lastCleanupAt) : '从未' }}</dd>
            </dl>
            <div v-else class="stack" aria-busy="true"><div v-for="i in 4" :key="i" class="skeleton sk-line" /></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h2><Eraser aria-hidden="true" />手动清理</h2><RouterLink to="/operations" class="small" data-testid="link-cache-jobs"><ListChecks class="inline-icon" aria-hidden="true" />全部任务记录</RouterLink></div>
      <div class="card-body clean">
        <fieldset class="modes" :disabled="!!activeJob || submitting">
          <legend class="sr-only">清理方式</legend>
          <label v-for="m in MODES" :key="m.value" class="mode" :class="{ on: mode === m.value, danger: m.value === 'all' }">
            <input v-model="mode" type="radio" name="mode" :value="m.value" :data-testid="`radio-mode-${m.value}`" />
            <span class="mode-text"><strong>{{ m.label }}</strong><span class="small muted">{{ m.help }}</span></span>
          </label>
        </fieldset>
        <div class="clean-actions">
          <div v-if="mode === 'expired'" class="field days">
            <label class="field-label" for="days">未访问天数</label>
            <input id="days" v-model.number="days" class="input num" :class="{ invalid: daysError }" type="number" min="1" max="3650" step="1" inputmode="numeric" :aria-invalid="!!daysError" data-testid="input-days" @input="daysError && validateDays()" />
            <p v-if="daysError" class="field-error" role="alert">{{ daysError }}</p>
          </div>
          <button type="button" class="btn" :class="mode === 'all' ? 'btn-danger' : 'btn-primary'" :disabled="!!activeJob || submitting" data-testid="button-start-clean" @click="startJob">
            <RefreshCw v-if="submitting" class="spin" aria-hidden="true" /><Eraser v-else aria-hidden="true" />{{ activeJob ? '有任务正在运行' : MODES.find((m) => m.value === mode).label }}
          </button>
        </div>

        <div v-if="activeJob" class="job-box" data-testid="active-job">
          <JobProgress :job="activeJob" />
          <p class="small muted">清理期间新的预览生成会暂停，已有任务完成后继续。可以离开此页面，任务在服务器上继续执行。</p>
          <p v-if="watcher.error.value" class="small warn-text">无法刷新任务进度：{{ describeError(watcher.error.value) }}，稍后自动重试。</p>
        </div>
        <InlineAlert v-if="submitError" :tone="submitError.status === 409 ? 'warn' : 'err'" :title="submitError.status === 409 ? '已有维护任务' : '无法开始清理'" data-testid="alert-clean-error">
          {{ submitError.status === 409 ? '已有一个缓存维护任务在运行，完成后才能开始新的清理。' : describeError(submitError) }}
          <template v-if="submitError.status === 409" #actions><RouterLink to="/operations" class="btn btn-sm">查看任务</RouterLink></template>
        </InlineAlert>
        <InlineAlert v-if="outcome" :tone="outcome.status === 'succeeded' ? (outcome.result?.failed ? 'warn' : 'ok') : 'err'" :title="outcome.status === 'succeeded' ? '清理完成' : outcome.status === 'interrupted' ? '清理已中断' : '清理失败'" data-testid="alert-clean-result">
          <template v-if="outcome.result">删除 <strong class="num">{{ formatNumber(outcome.result.cleaned) }}</strong> 个文件，释放 <strong class="num">{{ formatBytes(outcome.result.freedBytes) }}</strong><template v-if="outcome.result.failed">，<strong class="num">{{ formatNumber(outcome.result.failed) }}</strong> 个删除失败</template>。</template>
          <template v-if="outcome.error"> {{ outcome.error }}</template>
          统计已重新读取。
        </InlineAlert>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cache-grid { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--space-3); align-items: start; }
.side { display: grid; gap: var(--space-3); }
.total { display: flex; justify-content: space-between; align-items: flex-end; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-3); }
.big { font-size: var(--text-xl); font-weight: 650; }
.stacked { display: flex; height: 10px; border-radius: var(--radius-full); overflow: hidden; background: var(--color-surface-offset); gap: 2px; margin-bottom: var(--space-4); }
.stacked span { display: block; height: 100%; min-width: 3px; }
.legend th, .legend td { padding-left: 0; }
.swatch { display: inline-block; width: 9px; height: 9px; border-radius: 2px; margin-right: var(--space-2); vertical-align: 0; }
.strong { font-weight: 650; }
.clean { display: grid; gap: var(--space-4); }
.modes { border: 0; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-2); }
.mode { display: flex; gap: var(--space-3); padding: var(--space-3); border: 1px solid var(--color-border-strong); border-radius: var(--radius-md); cursor: pointer; transition: border-color var(--transition), background var(--transition); min-height: 44px; }
.mode input { margin-top: 3px; accent-color: var(--color-primary); }
.mode.on { border-color: var(--color-primary); background: var(--color-primary-soft); }
.mode.on.danger { border-color: var(--color-error); background: var(--color-error-soft); }
.mode.danger input { accent-color: var(--color-error); }
.mode-text { display: grid; gap: 2px; }
.modes:disabled .mode { opacity: 0.6; cursor: not-allowed; }
.clean-actions { display: flex; gap: var(--space-3); align-items: flex-end; flex-wrap: wrap; }
.days { width: 160px; }
.job-box { display: grid; gap: var(--space-2); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); background: var(--color-surface-2); border: 1px solid var(--color-border); }
.warn-text { color: var(--color-warning); }
.inline-icon { width: 14px; height: 14px; vertical-align: -2px; margin-right: 4px; }
@media (max-width: 1000px) { .cache-grid { grid-template-columns: 1fr; } .modes { grid-template-columns: 1fr; } }
</style>
