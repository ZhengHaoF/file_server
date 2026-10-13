<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Cpu, MemoryStick, HardDrive, Activity, RefreshCw, Server, Layers, BellRing, Power, LogIn, RotateCcw } from 'lucide-vue-next'
import * as api from '../api/admin.js'
import { useResource } from '../composables/useResource.js'
import { confirm } from '../composables/useConfirm.js'
import { auth } from '../stores/auth.js'
import { describeError } from '../lib/http.js'
import { monitorRestart } from '../lib/restartMonitor.js'
import { runtimeInfo, restartInfo, isUnsupportedRestart, capabilityEntries } from '../lib/serverInfo.js'
import { formatBytes, formatMB, formatGB, formatPercent, formatDuration, formatNumber, formatTime, DASH } from '../lib/format.js'
import SampleStamp from '../components/SampleStamp.vue'
import InlineAlert from '../components/InlineAlert.vue'
import Meter from '../components/Meter.vue'
import Sparkline from '../components/Sparkline.vue'
import ServerStatusBadge from '../components/ServerStatusBadge.vue'
import EmptyState from '../components/EmptyState.vue'

const router = useRouter()
const status = useResource((o) => api.getStatus(o), { interval: 10000 })
const s = computed(() => status.data.value)
const offline = computed(() => !!status.error.value && ['network', 'timeout', 'http'].includes(status.error.value.kind))
const runtime = computed(() => runtimeInfo(s.value?.server))
const restartCapability = computed(() => restartInfo(s.value?.server))
const capabilities = computed(() => capabilityEntries(s.value?.capabilities ?? s.value?.server?.capabilities))

const isNum = (v) => typeof v === 'number' && Number.isFinite(v)

const kpis = computed(() => {
  const d = s.value
  if (!d) return []
  const cpu = d.cpu || {}
  const mem = d.memory || {}
  const disk = d.disk || {}
  const proc = d.process || {}
  return [
    {
      key: 'cpu', label: 'CPU', icon: Cpu,
      value: isNum(cpu.usage) ? formatPercent(cpu.usage) : cpu.warmingUp ? '采样中' : '不可用',
      pending: !isNum(cpu.usage),
      meter: isNum(cpu.usage) ? cpu.usage : null,
      sub: isNum(cpu.cores) ? `${cpu.cores} 核${cpu.warmingUp ? ' · 正在建立基准' : ''}` : DASH
    },
    {
      key: 'memory', label: '主机内存', icon: MemoryStick,
      value: formatPercent(mem.usage), meter: isNum(mem.usage) ? mem.usage : null,
      sub: `${formatMB(mem.used)} / ${formatMB(mem.total)} · 可用 ${formatMB(mem.free)}`
    },
    // disk.available is a boolean "statistics available" flag; free space is disk.free (GB).
    disk.available === false
      ? { key: 'disk', label: '共享目录磁盘', icon: HardDrive, value: '未知', pending: true, meter: null, sub: '无法读取共享目录所在文件系统的容量' }
      : {
          key: 'disk', label: '共享目录磁盘', icon: HardDrive,
          value: formatPercent(disk.usage), meter: isNum(disk.usage) ? disk.usage : null,
          sub: `${formatGB(disk.used)} / ${formatGB(disk.total)} · 可用 ${formatGB(disk.free)}`
        },
    {
      key: 'process', label: '服务进程', icon: Activity,
      value: formatBytes(proc.rss), meter: null,
      sub: isNum(proc.heapUsed) && isNum(proc.heapTotal)
        ? `堆 ${formatBytes(proc.heapUsed)} / ${formatBytes(proc.heapTotal)}`
        : '当前运行时未提供堆内存统计'
    }
  ]
})

const history = computed(() => s.value?.history || [])
const histCpu = computed(() => history.value.map((h) => (isNum(h.cpu) ? h.cpu : null)))
const histMem = computed(() => history.value.map((h) => (isNum(h.memory) ? h.memory : null)))
const histRss = computed(() => history.value.map((h) => (isNum(h.processRss) ? h.processRss : null)))
const lastOf = (arr) => { for (let i = arr.length - 1; i >= 0; i--) if (arr[i] !== null) return arr[i]; return null }
const histRange = computed(() => history.value.length ? `${formatTime(history.value[0].time)} – ${formatTime(history.value[history.value.length - 1].time)}` : '')

const queues = computed(() => {
  const q = s.value?.queues || {}
  return [['image', '图片缩略图'], ['video', '视频截图'], ['upload', '上传']].map(([key, label]) => ({ key, label, ...(q[key] || {}) }))
})
const maintenanceText = computed(() => describeMaintenance(s.value?.queues?.maintenance))

function describeMaintenance(m) {
  if (m === undefined) return { tone: '', text: '未知' }
  if (m === null || m === false) return { tone: '', text: '空闲' }
  if (m === true) return { tone: 'warn', text: '维护中' }
  if (typeof m === 'string') return { tone: m === 'idle' ? '' : 'warn', text: m === 'idle' ? '空闲' : m }
  if (typeof m === 'object') {
    const active = m.active ?? m.running ?? m.paused ?? !!m.job
    const label = m.status || m.state || (active ? '维护中' : '空闲')
    return { tone: active ? 'warn' : '', text: label === 'idle' ? '空闲' : label === 'running' ? '维护中' : label }
  }
  return { tone: '', text: String(m) }
}

const alerts = computed(() => s.value?.alerts || [])
const alertTone = (level) => ({ critical: 'err', error: 'err', warning: 'warn', warn: 'warn' }[String(level).toLowerCase()] || 'info')

// ---------- Restart ----------
const restart = ref({ phase: 'idle', message: '', elapsed: 0 })
let restartAbort = null
onBeforeUnmount(() => restartAbort?.abort())
const restartBusy = computed(() => ['requesting', 'waiting', 'restarting'].includes(restart.value.phase))

async function onRestart() {
  if (!restartCapability.value.supported || status.stale.value || restartBusy.value) return
  const ok = await confirm({
    title: '重启服务',
    message: '服务将短暂不可用，进行中的上传与预览任务会中断。\n重启后所有会话（包括当前会话）都会失效，需要重新登录。',
    confirmText: '重启服务',
    tone: 'danger'
  })
  if (!ok) return
  let previousBoot = s.value?.bootId ?? null
  restart.value = { phase: 'requesting', message: '', elapsed: 0 }
  try {
    const accepted = await api.restartServer()
    // The acknowledgement is authoritative if a fresher bootId is returned.
    if (accepted?.bootId) previousBoot = accepted.bootId
  } catch (error) {
    restart.value = { phase: isUnsupportedRestart(error) ? 'unsupported' : 'failed', message: describeError(error), elapsed: 0 }
    return
  }
  status.stop() // avoid status polling during restart (401s here are expected)
  restartAbort = new AbortController()
  const result = await monitorRestart({
    previousBootId: previousBoot,
    checkSession: () => api.getSession({ timeout: 4000, signal: restartAbort.signal }),
    getBootId: async () => (await api.getStatus({ timeout: 4000, signal: restartAbort.signal, skipAuthHandler: true }))?.bootId,
    signal: restartAbort.signal,
    onPhase: ({ phase, elapsed }) => { restart.value = { phase, message: '', elapsed } }
  })
  if (result === 'restored') { status.load(); status.start() }
}

function onRestartRetry() {
  if (restart.value.phase === 'timeout') {
    restart.value = { phase: 'idle', message: '', elapsed: 0 }
    status.load()
    status.start()
  } else onRestart()
}

function goLogin() {
  auth.clearLocal('restart')
  router.replace({ name: 'login', query: { reason: 'restart', redirect: '/overview' } })
}

const RESTART_TEXT = {
  requesting: ['info', '正在发送重启请求…'],
  waiting: ['info', '重启请求已接受，等待服务进程退出…'],
  restarting: ['info', '服务正在重启，暂时无法连接（这是预期行为）…'],
  restored: ['ok', '服务已恢复运行，新进程已就绪。'],
  'restored-login': ['ok', '服务已恢复。重启会重置会话，请重新登录。'],
  timeout: ['err', '等待超时：服务在 2 分钟内没有恢复。请检查进程守护或容器日志。'],
  failed: ['err', '重启请求失败'],
  unsupported: ['warn', '当前部署方式不支持在线重启']
}
</script>

<template>
  <section class="page" aria-labelledby="overview-title">
    <div class="page-head">
      <div>
        <h1 id="overview-title">概览</h1>
        <p>服务器资源、服务端口与后台队列。每 10 秒自动刷新，页面隐藏时暂停。</p>
      </div>
      <div class="page-actions">
        <span v-if="offline && s" class="badge err" data-testid="badge-offline"><span class="dot" />连接失败</span>
        <SampleStamp :at="status.sampledAt.value" :stale="status.stale.value" :loading="status.loading.value" />
        <button type="button" class="btn" :disabled="status.loading.value || restartBusy" data-testid="button-refresh-status" @click="status.load()">
          <RefreshCw :class="{ spin: status.loading.value }" aria-hidden="true" />刷新
        </button>
      </div>
    </div>

    <InlineAlert v-if="status.stale.value" tone="warn" title="状态刷新失败" data-testid="alert-status-stale">
      {{ describeError(status.error.value) }}。下方显示的是最后一次成功采样的数据，不代表服务当前状态。
    </InlineAlert>

    <!-- Initial error without any data -->
    <div v-if="status.error.value && !s" class="card" data-testid="status-error">
      <EmptyState :icon="Server" title="无法获取服务器状态" :text="describeError(status.error.value)">
        <button type="button" class="btn btn-primary" data-testid="button-retry-status" @click="status.load()"><RefreshCw aria-hidden="true" />重试</button>
      </EmptyState>
    </div>

    <!-- KPIs -->
    <div v-if="!s && !status.error.value" class="kpis" aria-busy="true" data-testid="status-skeleton">
      <div v-for="i in 4" :key="i" class="card kpi"><div class="skeleton sk-line" style="width: 40%" /><div class="skeleton sk-value" /><div class="skeleton sk-line" style="width: 70%" /></div>
    </div>
    <div v-else-if="s" class="kpis" :class="{ dim: status.stale.value }">
      <div v-for="k in kpis" :key="k.key" class="card kpi" :data-testid="`kpi-${k.key}`">
        <div class="kpi-label"><component :is="k.icon" aria-hidden="true" />{{ k.label }}</div>
        <div class="kpi-value num" :class="{ pending: k.pending }">{{ k.value }}</div>
        <Meter v-if="k.key !== 'process'" :value="k.meter" :label="`${k.label}使用率`" />
        <div class="kpi-sub small muted num">{{ k.sub }}</div>
      </div>
    </div>

    <div v-if="s" class="grid-2" :class="{ dim: status.stale.value }">
      <div class="card">
        <div class="card-head">
          <h2><Activity aria-hidden="true" />近期趋势</h2>
          <span class="small muted num">{{ history.length ? `${history.length} 个样本 · ${histRange}` : '暂无历史样本' }}</span>
        </div>
        <div class="card-body trends">
          <div class="trend">
            <div class="trend-head"><span>CPU</span><strong class="num">{{ formatPercent(lastOf(histCpu)) }}</strong></div>
            <Sparkline :points="histCpu" :max="100" label="CPU 使用率趋势" />
          </div>
          <div class="trend">
            <div class="trend-head"><span>主机内存</span><strong class="num">{{ formatPercent(lastOf(histMem)) }}</strong></div>
            <Sparkline :points="histMem" :max="100" color="var(--chart-2)" label="内存使用率趋势" />
          </div>
          <div class="trend">
            <div class="trend-head"><span>进程 RSS</span><strong class="num">{{ formatBytes(lastOf(histRss)) }}</strong></div>
            <Sparkline :points="histRss" color="var(--chart-3)" label="进程内存趋势" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h2><Server aria-hidden="true" />服务</h2></div>
        <div class="card-body">
          <dl class="kv">
            <dt>HTTP</dt>
            <dd class="row"><ServerStatusBadge :status="s.server?.httpStatus || 'unknown'" data-testid="status-http" /><span class="mono small">:{{ s.server?.httpPort ?? DASH }}</span></dd>
            <dt>HTTPS</dt>
            <dd class="row"><ServerStatusBadge :status="s.server?.httpsStatus || 'unknown'" data-testid="status-https" /><span v-if="s.server?.httpsStatus !== 'disabled'" class="mono small">:{{ s.server?.httpsPort ?? DASH }}</span></dd>
            <dt>运行时长</dt><dd class="num">{{ formatDuration(s.server?.uptime) }}</dd>
            <dt>运行时</dt><dd class="mono small" data-testid="text-runtime">{{ runtime.label }}</dd>
            <dt>版本</dt><dd class="mono small" data-testid="text-runtime-version">{{ runtime.version || DASH }}</dd>
            <dt>部署方式</dt><dd>{{ s.server?.deployment || DASH }}</dd>
            <dt>启动标识</dt><dd class="mono small faint">{{ s.bootId || DASH }}</dd>
          </dl>
          <div v-if="capabilities.length" class="stack service-capabilities" data-testid="service-capabilities">
            <h3 class="small muted">功能能力</h3>
            <div class="row">
              <span v-for="c in capabilities" :key="c.key" class="badge" :class="c.available ? 'ok' : 'warn'" :data-testid="`capability-${c.key}`">{{ c.label }}：{{ c.available ? '可用' : '不可用' }}</span>
            </div>
          </div>
          <p v-if="status.stale.value" class="small warn-text">以上为最后一次成功采样时的状态。</p>
        </div>
      </div>
    </div>

    <div v-if="s" class="grid-2" :class="{ dim: status.stale.value }">
      <div class="card">
        <div class="card-head">
          <h2><Layers aria-hidden="true" />后台队列</h2>
          <span class="badge" :class="maintenanceText.tone" data-testid="badge-maintenance">缓存维护：{{ maintenanceText.text }}</span>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>队列</th><th class="r">运行中</th><th class="r">等待</th><th class="r">并发上限</th><th>负载</th></tr></thead>
            <tbody>
              <tr v-for="q in queues" :key="q.key" :data-testid="`row-queue-${q.key}`">
                <td>{{ q.label }}</td>
                <td class="r num">{{ formatNumber(q.active) }}</td>
                <td class="r num">{{ formatNumber(q.pending) }}</td>
                <td class="r num">{{ formatNumber(q.limit) }}</td>
                <td class="load"><Meter :value="isNum(q.active) && q.limit ? (q.active / q.limit) * 100 : null" :label="`${q.label}负载`" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h2><BellRing aria-hidden="true" />告警</h2><span class="small muted">{{ alerts.length ? `${alerts.length} 条` : '' }}</span></div>
        <div class="card-body">
          <div v-if="alerts.length" class="stack alerts">
            <InlineAlert v-for="(a, i) in alerts" :key="i" :tone="alertTone(a.level)" :live="false" :data-testid="`alert-server-${i}`">{{ a.message }}</InlineAlert>
          </div>
          <p v-else class="muted small" data-testid="text-no-alerts">当前采样没有告警。</p>
        </div>
      </div>
    </div>

    <div v-if="s" class="card">
      <div class="card-head"><h2><Power aria-hidden="true" />服务重启</h2></div>
      <div class="card-body restart">
        <div class="restart-text">
          <p v-if="restartCapability.supported" class="small">由进程守护（{{ s.server?.deployment || '托管' }}）负责拉起新进程。重启会中断进行中的任务并重置所有会话。</p>
          <p v-else class="small muted" data-testid="text-restart-unsupported">{{ restartCapability.text }}</p>
        </div>
        <button type="button" class="btn btn-quiet-danger" :disabled="!restartCapability.supported || restartBusy || status.stale.value || restart.phase === 'unsupported'" :title="restartCapability.supported ? undefined : restartCapability.text" data-testid="button-restart" @click="onRestart">
          <RefreshCw v-if="restartBusy" class="spin" aria-hidden="true" /><Power v-else aria-hidden="true" />重启服务
        </button>
      </div>
      <div v-if="restart.phase !== 'idle'" class="card-body restart-status">
        <InlineAlert :tone="RESTART_TEXT[restart.phase][0]" data-testid="alert-restart" :data-phase="restart.phase">
          {{ RESTART_TEXT[restart.phase][1] }}<template v-if="restart.message">：{{ restart.message }}</template>
          <span v-if="restartBusy && restart.elapsed" class="muted num">（已等待 {{ Math.round(restart.elapsed / 1000) }} 秒）</span>
          <template #actions>
            <button v-if="restart.phase === 'restored-login'" type="button" class="btn btn-sm btn-primary" data-testid="button-restart-login" @click="goLogin"><LogIn aria-hidden="true" />重新登录</button>
            <button v-if="restart.phase === 'timeout' || restart.phase === 'failed'" type="button" class="btn btn-sm" data-testid="button-restart-retry" @click="onRestartRetry">
              <RotateCcw aria-hidden="true" />{{ restart.phase === 'timeout' ? '重新检查状态' : '重试' }}
            </button>
          </template>
        </InlineAlert>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--space-3); }
.kpi { padding: var(--space-4); display: grid; gap: var(--space-2); align-content: start; }
.kpi-label { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-xs); color: var(--color-text-muted); font-weight: 560; }
.kpi-label svg { width: 14px; height: 14px; }
.kpi-value { font-size: var(--text-xl); font-weight: 650; letter-spacing: -0.01em; line-height: 1.2; }
.kpi-value.pending { color: var(--color-text-muted); font-size: var(--text-lg); }
.kpi-sub { overflow-wrap: anywhere; }
.grid-2 { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--space-3); }
.trends { display: grid; gap: var(--space-4); }
.trend-head { display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-1); }
.trend-head strong { color: var(--color-text); font-weight: 600; }
.load { min-width: 90px; }
.restart { display: flex; gap: var(--space-4); align-items: center; justify-content: space-between; flex-wrap: wrap; }
.restart-text { max-width: 72ch; }
.restart-status { padding-top: 0; }
.dim { opacity: 0.72; transition: opacity 200ms; }
.warn-text { color: var(--color-warning); margin-top: var(--space-3); }
.service-capabilities { margin-top: var(--space-4); }
@media (max-width: 1100px) { .kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); } .grid-2 { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .kpis { grid-template-columns: 1fr; } }
</style>
