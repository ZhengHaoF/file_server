<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Search, RefreshCw, Radio, Pause, Play, Eraser, Download, ScrollText, ChevronDown, FilterX } from 'lucide-vue-next'
import * as api from '../api/admin.js'
import { auth } from '../stores/auth.js'
import { createLatest } from '../lib/latest.js'
import { createLiveLog, logKey } from '../lib/logLive.js'
import { describeError, isAbort, saveBlob } from '../lib/http.js'
import { PREVIEW } from '../lib/env.js'
import { formatDateTime, localInputToIso } from '../lib/format.js'
import InlineAlert from '../components/InlineAlert.vue'
import EmptyState from '../components/EmptyState.vue'
import SampleStamp from '../components/SampleStamp.vue'

const MAX_ROWS = 2000
const LEVELS = [
  { value: '', label: '全部级别' },
  { value: 'error', label: '错误' },
  { value: 'warn', label: '警告' },
  { value: 'info', label: '信息' },
  { value: 'debug', label: '调试' }
]
const LEVEL_TONE = { error: 'err', warn: 'warn', warning: 'warn', info: 'info', debug: '' }
const LEVEL_TEXT = { error: '错误', warn: '警告', warning: '警告', info: '信息', debug: '调试' }

const filters = reactive({ level: '', keyword: '', source: 'application', start: '', end: '', limit: 100 })
const keywordInput = ref('')
const rangeError = ref('')

const rows = ref([])
const seen = new Set()
const nextCursor = ref(null)
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
const moreError = ref(null)
const fetchedAt = ref(null)
const cleared = ref(false)

const queryLatest = createLatest()
const moreLatest = createLatest()

function serverQuery(extra = {}) {
  return {
    level: filters.level, keyword: filters.keyword, limit: filters.limit, source: filters.source,
    start: localInputToIso(filters.start), end: localInputToIso(filters.end), ...extra
  }
}

function resetRows(list) {
  seen.clear()
  const out = []
  for (const e of list || []) { const k = logKey(e); if (!seen.has(k)) { seen.add(k); out.push(e) } }
  rows.value = out
}

async function query() {
  if (filters.start && filters.end && new Date(filters.start) > new Date(filters.end)) { rangeError.value = '开始时间不能晚于结束时间'; return }
  rangeError.value = ''
  moreLatest.cancel()
  loadingMore.value = false
  const token = queryLatest.begin()
  loading.value = true
  error.value = null
  moreError.value = null
  try {
    const res = await api.getLogs(serverQuery(), { signal: token.signal })
    if (!token.isCurrent()) return
    resetRows(res?.logs)
    nextCursor.value = res?.nextCursor ?? null
    fetchedAt.value = Date.now()
    cleared.value = false
  } catch (err) {
    if (!token.isCurrent() || isAbort(err)) return
    error.value = err
  } finally {
    if (token.isCurrent()) loading.value = false
  }
}

async function loadMore() {
  if (!nextCursor.value) return
  const token = moreLatest.begin()
  loadingMore.value = true
  moreError.value = null
  try {
    const res = await api.getLogs(serverQuery({ before: nextCursor.value }), { signal: token.signal })
    if (!token.isCurrent()) return
    const add = []
    for (const e of res?.logs || []) { const k = logKey(e); if (!seen.has(k)) { seen.add(k); add.push(e) } }
    rows.value = rows.value.concat(add)
    nextCursor.value = res?.nextCursor ?? null
  } catch (err) {
    if (!token.isCurrent() || isAbort(err)) return
    moreError.value = err
  } finally {
    if (token.isCurrent()) loadingMore.value = false
  }
}

// Debounced keyword; other filters apply immediately. Each change cancels the in-flight query.
let kwTimer = null
watch(keywordInput, (v) => { clearTimeout(kwTimer); kwTimer = setTimeout(() => { filters.keyword = v.trim() }, 300) })
watch(() => [filters.level, filters.keyword, filters.source, filters.start, filters.end, filters.limit], () => query())

function resetFilters() {
  keywordInput.value = ''
  Object.assign(filters, { level: '', keyword: '', source: 'application', start: '', end: '', limit: 100 })
}
const filtersActive = computed(() => filters.level || filters.keyword || filters.start || filters.end || filters.source !== 'application' || filters.limit !== 100)

// ---------- Live ----------
const liveMode = PREVIEW ? 'poll' : 'ws'
const liveEnabled = ref(false)
const paused = ref(false)
const liveState = ref('idle')
const liveInfo = ref({})
const buffer = ref([])
const liveCount = ref(0)

function matches(e) {
  if (filters.level && String(e.level || '').toLowerCase() !== filters.level) return false
  if (filters.source && e.source && e.source !== filters.source) return false
  if (filters.keyword) {
    const k = filters.keyword.toLowerCase()
    if (!String(e.message || '').toLowerCase().includes(k) && !String(e.category || '').toLowerCase().includes(k)) return false
  }
  const t = new Date(e.timestamp).getTime()
  if (filters.start && t < new Date(filters.start).getTime()) return false
  if (filters.end && t > new Date(filters.end).getTime()) return false
  return true
}

function ingest(entries) {
  const fresh = []
  for (const e of entries) {
    const k = logKey(e)
    if (seen.has(k) || !matches(e)) continue
    seen.add(k)
    fresh.push(e)
  }
  if (!fresh.length) return
  fresh.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  liveCount.value += fresh.length
  if (paused.value) { buffer.value = fresh.concat(buffer.value).slice(0, MAX_ROWS); return }
  rows.value = fresh.concat(rows.value).slice(0, MAX_ROWS)
}

const live = createLiveLog({
  mode: liveMode,
  onEntries: ingest,
  onState: (s, info) => { liveState.value = s; liveInfo.value = info || {} },
  onAuthProblem: async () => {
    const result = await auth.checkSession()
    if (result === 'anonymous') auth.signedOutRemotely('expired')
  },
  poll: async ({ signal }) => (await api.getLogs({ limit: 50, source: filters.source }, { signal }))?.logs || []
})

watch(liveEnabled, (on) => {
  if (on) { liveCount.value = 0; live.start() } else { live.stop(); flushBuffer(); paused.value = false; liveState.value = 'idle' }
})

function flushBuffer() {
  if (!buffer.value.length) return
  rows.value = buffer.value.concat(rows.value).slice(0, MAX_ROWS)
  buffer.value = []
}
function togglePause() { paused.value = !paused.value; if (!paused.value) flushBuffer() }

const LIVE_TEXT = {
  idle: ['', '实时未开启'], connecting: ['info', '正在连接'], open: ['ok', '实时已连接'],
  reconnecting: ['warn', '连接中断，正在重连'], polling: ['accent', '轮询中（每 3 秒）'],
  failed: ['err', '连接失败'], unauthorized: ['err', '会话失效'], closed: ['', '已断开']
}
const liveView = computed(() => LIVE_TEXT[liveState.value] || ['', liveState.value])

function clearDisplay() {
  rows.value = []
  buffer.value = []
  seen.clear()
  nextCursor.value = null
  cleared.value = true
}

// ---------- Export ----------
const exporting = ref('')
const exportError = ref(null)
const exportDone = ref(null)
async function doExport(format) {
  exportError.value = null
  exportDone.value = null
  exporting.value = format
  try {
    const { blob, filename, truncated } = await api.exportLogs({ ...serverQuery({ limit: undefined }), format })
    const name = filename || `logs-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '')}.${format}`
    saveBlob(blob, name)
    exportDone.value = truncated === true
      ? { tone: 'warn', text: `已导出 ${name}，但结果超过 10,000 行上限，文件只包含最新的 10,000 行。请缩小时间范围或筛选条件后分批导出。` }
      : truncated === false
        ? { tone: 'ok', text: `已导出 ${name}，包含当前筛选条件下的全部记录。` }
        : { tone: 'ok', text: `已导出 ${name}（使用当前筛选条件，服务器最多导出 10,000 行；无法确认是否被截断）。` }
  } catch (err) {
    exportError.value = err
  } finally {
    exporting.value = ''
  }
}

const unsub = auth.onSignOut(() => { liveEnabled.value = false; live.stop() })
onMounted(query)
onBeforeUnmount(() => { clearTimeout(kwTimer); queryLatest.cancel(); moreLatest.cancel(); live.stop(); unsub() })

defineExpose({ ingest, query })
</script>

<template>
  <section class="page" aria-labelledby="logs-title">
    <div class="page-head">
      <div>
        <h1 id="logs-title">日志</h1>
        <p>按日志追加顺序显示最新记录。筛选会立即取消尚未返回的旧查询；轮转使游标失效时请刷新。</p>
      </div>
      <div class="page-actions">
        <SampleStamp :at="fetchedAt" :loading="loading" label="查询于" />
        <button type="button" class="btn" :disabled="loading" data-testid="button-refresh-logs" @click="query"><RefreshCw :class="{ spin: loading }" aria-hidden="true" />刷新</button>
        <button type="button" class="btn" :disabled="!!exporting" data-testid="button-export-csv" @click="doExport('csv')"><RefreshCw v-if="exporting === 'csv'" class="spin" aria-hidden="true" /><Download v-else aria-hidden="true" />导出 CSV</button>
        <button type="button" class="btn" :disabled="!!exporting" data-testid="button-export-json" @click="doExport('json')"><RefreshCw v-if="exporting === 'json'" class="spin" aria-hidden="true" /><Download v-else aria-hidden="true" />导出 JSON</button>
      </div>
    </div>

    <InlineAlert v-if="exportError" tone="err" title="导出失败" data-testid="alert-export-error">{{ describeError(exportError) }}</InlineAlert>
    <InlineAlert v-if="exportDone" :tone="exportDone.tone" data-testid="alert-export-done">{{ exportDone.text }}</InlineAlert>

    <div class="card">
      <form class="filters" role="search" aria-label="日志筛选" @submit.prevent="query">
        <div class="field kw">
          <label class="field-label" for="kw">关键词</label>
          <div class="input-icon"><Search aria-hidden="true" /><input id="kw" v-model="keywordInput" class="input" type="search" placeholder="消息或分类" autocomplete="off" data-testid="input-keyword" /></div>
        </div>
        <div class="field">
          <label class="field-label" for="level">级别</label>
          <select id="level" v-model="filters.level" class="select" data-testid="select-level"><option v-for="l in LEVELS" :key="l.value" :value="l.value">{{ l.label }}</option></select>
        </div>
        <div class="field">
          <label class="field-label" for="source">来源</label>
          <select id="source" v-model="filters.source" class="select" data-testid="select-source"><option value="application">应用日志</option><option value="supervisor">守护进程</option></select>
        </div>
        <div class="field">
          <label class="field-label" for="start">开始时间</label>
          <input id="start" v-model="filters.start" class="input num" type="datetime-local" step="1" data-testid="input-start" />
        </div>
        <div class="field">
          <label class="field-label" for="end">结束时间</label>
          <input id="end" v-model="filters.end" class="input num" type="datetime-local" step="1" data-testid="input-end" />
        </div>
        <div class="field">
          <label class="field-label" for="limit">每页</label>
          <select id="limit" v-model.number="filters.limit" class="select" data-testid="select-limit"><option :value="50">50</option><option :value="100">100</option><option :value="200">200</option><option :value="500">500</option></select>
        </div>
        <div class="filter-actions">
          <button type="button" class="btn btn-ghost" :disabled="!filtersActive" data-testid="button-reset-filters" @click="resetFilters"><FilterX aria-hidden="true" />重置</button>
        </div>
        <p v-if="rangeError" class="field-error range-error" role="alert">{{ rangeError }}</p>
      </form>

      <div class="livebar">
        <label class="switch" data-testid="toggle-live">
          <input v-model="liveEnabled" type="checkbox" role="switch" :aria-checked="liveEnabled" />
          <span class="switch-track" aria-hidden="true" />
          <span class="small"><Radio class="inline-icon" aria-hidden="true" />{{ liveMode === 'poll' ? '实时更新（轮询）' : '实时更新' }}</span>
        </label>
        <span class="badge" :class="liveView[0]" data-testid="badge-live-state" :data-state="liveState"><span class="dot" :class="{ pulse: liveState === 'open' || liveState === 'polling' }" />{{ liveView[1] }}<template v-if="liveState === 'reconnecting' && liveInfo.attempt">（第 {{ liveInfo.attempt }} 次）</template></span>
        <button v-if="liveEnabled" type="button" class="btn btn-sm" :aria-pressed="paused" data-testid="button-pause-live" @click="togglePause">
          <Play v-if="paused" aria-hidden="true" /><Pause v-else aria-hidden="true" />{{ paused ? `继续（${buffer.length} 条待显示）` : '暂停显示' }}
        </button>
        <button v-if="liveState === 'failed'" type="button" class="btn btn-sm" data-testid="button-retry-live" @click="live.retry()"><RefreshCw aria-hidden="true" />重新连接</button>
        <span v-if="liveEnabled && liveCount" class="small muted num">本次收到 {{ liveCount }} 条</span>
        <div class="spacer" />
        <span class="small muted num" data-testid="text-row-count">显示 {{ rows.length }} 条</span>
        <button type="button" class="btn btn-sm btn-ghost" :disabled="!rows.length" title="只清空当前页面显示，不会删除服务器日志" data-testid="button-clear-display" @click="clearDisplay"><Eraser aria-hidden="true" />清空显示</button>
      </div>

      <InlineAlert v-if="error" tone="err" title="查询失败" class="in-card" data-testid="alert-logs-error">
        {{ describeError(error) }}<template v-if="rows.length">。下方仍是上一次查询的结果。</template>
        <template #actions><button type="button" class="btn btn-sm" data-testid="button-retry-logs" @click="query">重试</button></template>
      </InlineAlert>
      <InlineAlert v-if="liveState === 'unauthorized'" tone="err" class="in-card">实时连接被拒绝：管理会话已失效。</InlineAlert>
      <InlineAlert v-if="liveState === 'failed'" tone="err" class="in-card" data-testid="alert-live-failed">实时日志多次重连失败，已停止。可重新连接或使用刷新。</InlineAlert>

      <div class="log-list" :aria-busy="loading" data-testid="log-list">
        <template v-if="loading && !rows.length && !cleared">
          <div v-for="i in 8" :key="i" class="log-row sk"><div class="skeleton sk-line" style="width: 130px" /><div class="skeleton sk-line" style="width: 44px" /><div class="skeleton sk-line" :style="{ width: 30 + (i * 7) % 50 + '%' }" /></div>
        </template>
        <EmptyState v-else-if="!rows.length && cleared" :icon="Eraser" title="显示已清空" text="服务器日志未被删除。刷新即可重新加载，开启实时更新后新日志会显示在这里。">
          <button type="button" class="btn" @click="query">重新加载</button>
        </EmptyState>
        <EmptyState v-else-if="!rows.length && !error" :icon="ScrollText" title="没有匹配的日志" :text="filtersActive ? '当前筛选条件下没有记录，尝试放宽条件。' : '日志文件中暂时没有记录。'">
          <button v-if="filtersActive" type="button" class="btn" @click="resetFilters">重置筛选</button>
        </EmptyState>
        <div v-for="e in rows" :key="logKey(e)" class="log-row" :data-level="e.level" data-testid="log-row">
          <time class="t mono num" :datetime="e.timestamp">{{ formatDateTime(e.timestamp) }}</time>
          <span class="badge lvl" :class="LEVEL_TONE[String(e.level).toLowerCase()]">{{ LEVEL_TEXT[String(e.level).toLowerCase()] || e.level }}</span>
          <span class="msg mono"><span v-if="e.category" class="cat">[{{ e.category }}]</span>{{ e.message }}</span>
          <span v-if="e.source && e.source !== 'application'" class="badge src">{{ e.source === 'supervisor' ? '守护' : e.source }}</span>
        </div>
      </div>

      <div v-if="rows.length" class="list-foot">
        <p v-if="moreError" class="field-error">加载失败：{{ describeError(moreError) }}</p>
        <button v-if="nextCursor" type="button" class="btn" :disabled="loadingMore" data-testid="button-load-more" @click="loadMore"><RefreshCw v-if="loadingMore" class="spin" aria-hidden="true" /><ChevronDown v-else aria-hidden="true" />{{ moreError ? '重试加载' : '加载更早的日志' }}</button>
        <span v-else class="small muted">已到达最早的记录</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters { display: grid; grid-template-columns: minmax(160px, 1.5fr) repeat(2, minmax(100px, 1fr)) repeat(2, minmax(210px, 1.5fr)) minmax(80px, .6fr) auto; gap: var(--space-3); padding: var(--space-4); align-items: end; border-bottom: 1px solid var(--color-divider); }
.filters > *, .filters .input, .filters .select { min-width: 0; max-width: 100%; }
.input-icon { position: relative; }
.input-icon svg { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: var(--color-text-faint); pointer-events: none; }
.input-icon .input { padding-left: 32px; }
.range-error { grid-column: 1 / -1; }
.livebar { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-4); flex-wrap: wrap; border-bottom: 1px solid var(--color-divider); background: var(--color-surface-2); min-height: 52px; }
.inline-icon { width: 14px; height: 14px; vertical-align: -2px; margin-right: 4px; }
.in-card { margin: var(--space-3) var(--space-4) 0; }
.log-list { font-size: var(--text-xs); }
.log-row { display: grid; grid-template-columns: 150px 52px 1fr auto; gap: var(--space-3); align-items: baseline; padding: 6px var(--space-4); border-bottom: 1px solid var(--color-divider); content-visibility: auto; contain-intrinsic-size: 0 30px; }
.log-row:hover { background: var(--color-surface-2); }
.log-row[data-level='error'] { background: color-mix(in oklab, var(--color-error-soft) 55%, transparent); }
.log-row.sk { align-items: center; }
.t { color: var(--color-text-muted); white-space: nowrap; }
.lvl { justify-content: center; height: 20px; }
.msg { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.55; color: var(--color-text); }
.cat { color: var(--color-primary-text); margin-right: 6px; }
.src { height: 20px; }
.list-foot { display: flex; justify-content: center; align-items: center; gap: var(--space-3); padding: var(--space-3); flex-wrap: wrap; }
@media (max-width: 1500px) { .filters { grid-template-columns: repeat(3, minmax(0, 1fr)); } .kw { grid-column: 1 / -1; } }
@media (max-width: 640px) {
  .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .filters .field:has(input[type="datetime-local"]) { grid-column: 1 / -1; }
  .log-row { grid-template-columns: auto 1fr; }
  .t { grid-column: 1 / -1; }
  .msg { grid-column: 1 / -1; }
}
</style>
