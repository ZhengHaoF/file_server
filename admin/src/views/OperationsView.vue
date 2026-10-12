<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RefreshCw, ListChecks, ShieldCheck, ChevronDown, ChevronRight } from 'lucide-vue-next'
import * as api from '../api/admin.js'
import { createLatest } from '../lib/latest.js'
import { describeError, isAbort } from '../lib/http.js'
import { JOB_STATUS, TERMINAL, jobTypeLabel } from '../composables/useJobWatcher.js'
import { formatBytes, formatDateTime, formatNumber, DASH } from '../lib/format.js'
import InlineAlert from '../components/InlineAlert.vue'
import EmptyState from '../components/EmptyState.vue'
import SampleStamp from '../components/SampleStamp.vue'
import JobProgress from '../components/JobProgress.vue'

const route = useRoute()
const router = useRouter()
const tab = computed(() => (route.query.tab === 'audit' ? 'audit' : 'jobs'))
function setTab(t) { router.replace({ query: { ...route.query, tab: t } }) }
function onTabKey(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault()
    const next = tab.value === 'jobs' ? 'audit' : 'jobs'
    setTab(next)
    document.getElementById(`tab-${next}`)?.focus()
  }
}

function createList(fetchPage, key) {
  const items = ref([])
  const next = ref(null)
  const loading = ref(false)
  const more = ref(false)
  const error = ref(null)
  const fetchedAt = ref(null)
  const latest = createLatest()
  async function load(append = false) {
    const token = latest.begin()
    append ? (more.value = true) : (loading.value = true)
    error.value = null
    try {
      const res = await fetchPage(append ? next.value : undefined, token.signal)
      if (!token.isCurrent()) return
      const list = res?.[key] || []
      items.value = append ? items.value.concat(list.filter((i) => !items.value.some((x) => x.id === i.id))) : list
      next.value = res?.nextBefore ?? null
      fetchedAt.value = Date.now()
    } catch (err) {
      if (!token.isCurrent() || isAbort(err)) return
      error.value = err
    } finally {
      if (token.isCurrent()) { loading.value = false; more.value = false }
    }
  }
  return { items, next, loading, more, error, fetchedAt, load, cancel: () => latest.cancel() }
}

const jobs = createList((before, signal) => api.listJobs({ limit: 25, before }, { signal }), 'jobs')
const audit = createList((before, signal) => api.listAudit({ limit: 50, before }, { signal }), 'entries')
const current = computed(() => (tab.value === 'audit' ? audit : jobs))

// Expanded job rows with on-demand refresh of a single job.
const expanded = ref(new Set())
const jobRefresh = ref({}) // id -> 'loading' | error message
function toggle(id) {
  const s = new Set(expanded.value)
  s.has(id) ? s.delete(id) : s.add(id)
  expanded.value = s
}
async function refreshJob(id) {
  jobRefresh.value = { ...jobRefresh.value, [id]: 'loading' }
  try {
    const res = await api.getJob(id)
    const job = res?.job ?? res
    jobs.items.value = jobs.items.value.map((j) => (j.id === id ? job : j))
    jobRefresh.value = { ...jobRefresh.value, [id]: '' }
  } catch (err) {
    jobRefresh.value = { ...jobRefresh.value, [id]: describeError(err) }
  }
}

// Auto-refresh while any job is unfinished.
let timer = null
function schedule() {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    if (tab.value === 'jobs' && jobs.items.value.some((j) => !TERMINAL.has(j.status)) && !jobs.loading.value) await jobs.load()
    schedule()
  }, 3000)
}

const RESULT = { accepted: ['info', '已接受'], success: ['ok', '成功'], succeeded: ['ok', '成功'], ok: ['ok', '成功'], failure: ['err', '失败'], failed: ['err', '失败'], error: ['err', '失败'], denied: ['warn', '拒绝'], rejected: ['warn', '拒绝'] }
const resultView = (r) => RESULT[String(r).toLowerCase()] || ['', r || DASH]
const ACTIONS = {
  'auth.login': '登录', 'auth.logout': '退出登录', 'config.save': '保存配置', 'server.restart': '重启服务', 'cache.cleanup': '缓存清理',
  login: '登录', logout: '退出登录', 'session.revoke': '撤销会话', 'config.update': '修改配置', 'config.rollback': '回滚配置',
  'config.export': '导出配置', restart: '重启服务', 'cache.job': '缓存清理', 'cache.clean': '缓存清理', 'logs.export': '导出日志'
}
const actionLabel = (a) => ACTIONS[a] || a
const detailText = (d) => (d === null || d === undefined || d === '' ? '' : typeof d === 'string' ? d : JSON.stringify(d))
const duration = (j) => {
  if (!j.startedAt || !j.finishedAt) return DASH
  const ms = new Date(j.finishedAt) - new Date(j.startedAt)
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} 秒`
}

onMounted(() => { jobs.load(); audit.load(); schedule() })
onBeforeUnmount(() => { clearTimeout(timer); jobs.cancel(); audit.cancel() })
</script>

<template>
  <section class="page" aria-labelledby="ops-title">
    <div class="page-head">
      <div>
        <h1 id="ops-title">任务与审计</h1>
        <p>服务器持久化的维护任务与管理操作记录。</p>
      </div>
      <div class="page-actions">
        <SampleStamp :at="current.fetchedAt.value" :loading="current.loading.value" label="读取于" />
        <button type="button" class="btn" :disabled="current.loading.value" data-testid="button-refresh-ops" @click="current.load()"><RefreshCw :class="{ spin: current.loading.value }" aria-hidden="true" />刷新</button>
      </div>
    </div>

    <div class="card">
      <div class="tabs" role="tablist" aria-label="记录类型">
        <button id="tab-jobs" type="button" role="tab" class="tab" :aria-selected="tab === 'jobs'" :tabindex="tab === 'jobs' ? 0 : -1" aria-controls="panel-jobs" data-testid="tab-jobs" @click="setTab('jobs')" @keydown="onTabKey"><ListChecks aria-hidden="true" />维护任务</button>
        <button id="tab-audit" type="button" role="tab" class="tab" :aria-selected="tab === 'audit'" :tabindex="tab === 'audit' ? 0 : -1" aria-controls="panel-audit" data-testid="tab-audit" @click="setTab('audit')" @keydown="onTabKey"><ShieldCheck aria-hidden="true" />审计日志</button>
      </div>

      <div v-show="tab === 'jobs'" id="panel-jobs" role="tabpanel" aria-labelledby="tab-jobs">
        <InlineAlert v-if="jobs.error.value" tone="err" title="读取任务失败" class="in-card" data-testid="alert-jobs-error">{{ describeError(jobs.error.value) }}<template #actions><button type="button" class="btn btn-sm" @click="jobs.load()">重试</button></template></InlineAlert>
        <div v-if="jobs.loading.value && !jobs.items.value.length" class="sk-rows" aria-busy="true"><div v-for="i in 5" :key="i" class="skeleton sk-line" /></div>
        <EmptyState v-else-if="!jobs.items.value.length && !jobs.error.value" :icon="ListChecks" title="还没有维护任务" text="在“缓存”页发起清理后，任务会记录在这里。">
          <RouterLink to="/cache" class="btn">前往缓存</RouterLink>
        </EmptyState>
        <div v-else-if="jobs.items.value.length" class="table-wrap" tabindex="0" role="region" aria-label="维护任务，可左右滚动">
          <p class="table-hint">表格可左右滑动查看完整记录。</p>
          <table class="table">
            <thead><tr><th class="w-exp"><span class="sr-only">展开</span></th><th>任务</th><th>状态</th><th>创建时间</th><th class="r">耗时</th><th class="r">结果</th></tr></thead>
            <tbody>
              <template v-for="j in jobs.items.value" :key="j.id">
                <tr class="job-row" :data-testid="`row-job-${j.id}`">
                  <td><button type="button" class="btn btn-ghost btn-icon btn-sm" :aria-expanded="expanded.has(j.id)" :aria-label="expanded.has(j.id) ? '收起详情' : '展开详情'" :data-testid="`button-expand-job-${j.id}`" @click="toggle(j.id)"><ChevronDown v-if="expanded.has(j.id)" /><ChevronRight v-else /></button></td>
                  <td><div class="cell-main">{{ jobTypeLabel(j.type) }}</div><div class="mono small faint">#{{ j.id }}</div></td>
                  <td><span class="badge" :class="(JOB_STATUS[j.status] || [''])[0]"><span class="dot" :class="{ pulse: j.status === 'running' }" />{{ (JOB_STATUS[j.status] || ['', j.status])[1] }}</span></td>
                  <td class="num small">{{ formatDateTime(j.createdAt) }}</td>
                  <td class="r num small">{{ duration(j) }}</td>
                  <td class="r num small">
                    <template v-if="j.result">{{ formatNumber(j.result.cleaned) }} 个 · {{ formatBytes(j.result.freedBytes) }}<span v-if="j.result.failed" class="err-text"> · 失败 {{ j.result.failed }}</span></template>
                    <span v-else-if="j.error" class="err-text">出错</span>
                    <span v-else class="faint">{{ DASH }}</span>
                  </td>
                </tr>
                <tr v-if="expanded.has(j.id)" class="detail-row">
                  <td />
                  <td colspan="5">
                    <div class="detail">
                      <JobProgress :job="j" />
                      <dl class="kv small">
                        <dt>开始</dt><dd class="num">{{ formatDateTime(j.startedAt) }}</dd>
                        <dt>结束</dt><dd class="num">{{ formatDateTime(j.finishedAt) }}</dd>
                      </dl>
                      <div class="row">
                        <button type="button" class="btn btn-sm" :disabled="jobRefresh[j.id] === 'loading'" :data-testid="`button-refresh-job-${j.id}`" @click="refreshJob(j.id)"><RefreshCw :class="{ spin: jobRefresh[j.id] === 'loading' }" aria-hidden="true" />刷新此任务</button>
                        <span v-if="jobRefresh[j.id] && jobRefresh[j.id] !== 'loading'" class="field-error">{{ jobRefresh[j.id] }}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-if="jobs.items.value.length" class="list-foot">
          <button v-if="jobs.next.value !== null" type="button" class="btn" :disabled="jobs.more.value" data-testid="button-more-jobs" @click="jobs.load(true)"><RefreshCw v-if="jobs.more.value" class="spin" aria-hidden="true" /><ChevronDown v-else aria-hidden="true" />加载更早的任务</button>
          <span v-else class="small muted">没有更早的任务</span>
        </div>
      </div>

      <div v-show="tab === 'audit'" id="panel-audit" role="tabpanel" aria-labelledby="tab-audit">
        <InlineAlert v-if="audit.error.value" tone="err" title="读取审计日志失败" class="in-card" data-testid="alert-audit-error">{{ describeError(audit.error.value) }}<template #actions><button type="button" class="btn btn-sm" @click="audit.load()">重试</button></template></InlineAlert>
        <div v-if="audit.loading.value && !audit.items.value.length" class="sk-rows" aria-busy="true"><div v-for="i in 6" :key="i" class="skeleton sk-line" /></div>
        <EmptyState v-else-if="!audit.items.value.length && !audit.error.value" :icon="ShieldCheck" title="暂无审计记录" text="登录、配置修改、会话撤销等管理操作会记录在这里。" />
        <div v-else-if="audit.items.value.length" class="table-wrap" tabindex="0" role="region" aria-label="审计日志，可左右滚动">
          <p class="table-hint">表格可左右滑动查看完整记录。</p>
          <table class="table">
            <thead><tr><th>时间</th><th>操作</th><th>操作者</th><th>对象</th><th>结果</th><th>详情</th></tr></thead>
            <tbody>
              <tr v-for="a in audit.items.value" :key="a.id" :data-testid="`row-audit-${a.id}`">
                <td class="num small nowrap">{{ formatDateTime(a.createdAt) }}</td>
                <td><span class="cell-main">{{ actionLabel(a.action) }}</span><div v-if="actionLabel(a.action) !== a.action" class="mono small faint">{{ a.action }}</div></td>
                <td class="small mono">{{ a.actor || DASH }}</td>
                <td class="small mono target">{{ a.target || DASH }}</td>
                <td><span class="badge" :class="resultView(a.result)[0]">{{ resultView(a.result)[1] }}</span></td>
                <td class="small mono details" :title="detailText(a.details)">{{ detailText(a.details) || DASH }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="audit.items.value.length" class="list-foot">
          <button v-if="audit.next.value !== null" type="button" class="btn" :disabled="audit.more.value" data-testid="button-more-audit" @click="audit.load(true)"><RefreshCw v-if="audit.more.value" class="spin" aria-hidden="true" /><ChevronDown v-else aria-hidden="true" />加载更早的记录</button>
          <span v-else class="small muted">没有更早的记录</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabs { display: flex; gap: var(--space-1); padding: 0 var(--space-3); border-bottom: 1px solid var(--color-border); }
.tab { display: inline-flex; align-items: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-3); border: 0; background: none; color: var(--color-text-muted); font-size: var(--text-sm); font-weight: 560; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab svg { width: 15px; height: 15px; }
.tab[aria-selected='true'] { color: var(--color-primary-text); border-bottom-color: var(--color-primary); }
.tab:hover { color: var(--color-text); }
.in-card { margin: var(--space-3) var(--space-4); }
.sk-rows { display: grid; gap: var(--space-3); padding: var(--space-4); }
.w-exp { width: 48px; }
.cell-main { font-weight: 560; }
.detail-row td { background: var(--color-surface-2); }
.detail { display: grid; gap: var(--space-3); padding: var(--space-2) 0; max-width: 640px; }
.err-text { color: var(--color-error); }
.nowrap { white-space: nowrap; }
.target { max-width: 220px; overflow-wrap: anywhere; }
.details { max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--color-text-muted); }
.list-foot { display: flex; justify-content: center; padding: var(--space-3); border-top: 1px solid var(--color-divider); }
</style>
