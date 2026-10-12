<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { RefreshCw, Save, ShieldCheck, Undo2, History, Download, Lock, RotateCw, SlidersHorizontal, Info, AlertTriangle } from 'lucide-vue-next'
import * as api from '../api/admin.js'
import { useResource } from '../composables/useResource.js'
import { confirm } from '../composables/useConfirm.js'
import { describeError, saveBlob } from '../lib/http.js'
import SampleStamp from '../components/SampleStamp.vue'
import InlineAlert from '../components/InlineAlert.vue'
import EmptyState from '../components/EmptyState.vue'
import CopyButton from '../components/CopyButton.vue'

const GROUPS = {
  basic: { title: '基础', desc: '共享目录与监听地址。修改后需要重启服务。' },
  access: { title: '访问控制', desc: '读写开关、上传限制与来源白名单，保存后立即生效。' },
  cache: { title: '缓存', desc: '缓存容量与自动清理策略，保存后立即生效。' }
}
const KEY_GROUP = {
  rootPath: 'basic', host: 'basic', port: 'basic', httpsEnabled: 'basic', httpsPort: 'basic',
  publicRead: 'access', writeEnabled: 'access', uploadEnabled: 'access', uploadMaxSizeMB: 'access', allowedOrigins: 'access', secureCookies: 'access',
  cacheMaxSizeMB: 'cache', cacheRetentionDays: 'cache', autoCleanupEnabled: 'cache'
}
const META_KEYS = new Set(['revision', 'values', 'fields', 'pendingRestart', 'backupAvailable'])

const config = useResource((o) => api.getConfig(o), { sampledAt: () => null })
const cfg = computed(() => config.data.value)
const fields = computed(() => cfg.value?.fields || [])
const fieldMap = computed(() => Object.fromEntries(fields.value.map((f) => [f.key, f])))
const groups = computed(() => {
  const order = []
  const map = new Map()
  for (const f of fields.value) {
    const g = normalizeGroup(f.group, f.key)
    if (!map.has(g)) { map.set(g, []); order.push(g) }
    map.get(g).push(f)
  }
  const rank = (g) => ({ basic: 0, access: 1, cache: 2 }[g] ?? 9)
  return order.sort((a, b) => rank(a) - rank(b)).map((g) => ({ id: g, ...(GROUPS[g] || { title: g, desc: '' }), fields: map.get(g) }))
})
function normalizeGroup(group, key) {
  const g = String(group || '').toLowerCase()
  if (['basic', '基础', 'general'].includes(g)) return 'basic'
  if (['access', '访问', '访问控制', 'security'].includes(g)) return 'access'
  if (['cache', '缓存'].includes(g)) return 'cache'
  return group || KEY_GROUP[key] || 'basic'
}
const pending = computed(() => new Set(cfg.value?.pendingRestart || []))
const runtimeInfo = computed(() => {
  if (!cfg.value) return []
  const editable = new Set(fields.value.map((f) => f.key))
  return Object.entries(cfg.value)
    .filter(([k, v]) => !META_KEYS.has(k) && !editable.has(k) && (typeof v !== 'object' || v === null || Array.isArray(v)))
    .map(([k, v]) => ({ key: k, value: Array.isArray(v) ? v.join(', ') : v === null ? '—' : String(v) }))
})

// ---------- Draft ----------
const draft = ref({})
const original = ref({})
const fieldErrors = ref({})
const warnings = ref([])
const changes = ref(null) // from validate
const busy = ref('') // validate | save | rollback | export
const outcome = ref(null) // { tone, title, text, restart }
const conflict = ref(false)

const toForm = (f, v) => (f.type === 'origins' ? (Array.isArray(v) ? v.join('\n') : v ?? '') : f.type === 'number' ? (v ?? '') : f.type === 'boolean' ? !!v : v ?? '')
function fromForm(f, v) {
  if (f.type === 'origins') return String(v || '').split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
  if (f.type === 'number') return v === '' || v === null ? null : Number(v)
  if (f.type === 'boolean') return !!v
  return typeof v === 'string' ? v.trim() : v
}

function resetDraft() {
  const values = cfg.value?.values || {}
  const d = {}
  for (const f of fields.value) d[f.key] = toForm(f, values[f.key])
  draft.value = d
  original.value = JSON.parse(JSON.stringify(d))
  fieldErrors.value = {}
  warnings.value = []
  changes.value = null
}

watch(cfg, (next, prev) => { if (next && (!prev || next.revision !== prev.revision || !dirty.value)) resetDraft() })

const dirtyKeys = computed(() => fields.value.filter((f) => !f.readonly && JSON.stringify(fromForm(f, draft.value[f.key])) !== JSON.stringify(fromForm(f, original.value[f.key]))).map((f) => f.key))
const dirty = computed(() => dirtyKeys.value.length > 0)

function payloadValues() {
  const out = {}
  for (const f of fields.value) if (!f.readonly) out[f.key] = fromForm(f, draft.value[f.key])
  return out
}

function localValidate() {
  const errs = {}
  for (const f of fields.value) {
    if (f.readonly) continue
    const v = fromForm(f, draft.value[f.key])
    if (f.type === 'number') {
      if (v === null || !Number.isFinite(v)) errs[f.key] = '请输入数字'
      else if (f.integer === true && !Number.isInteger(v)) errs[f.key] = '请输入整数'
      else if (f.min !== undefined && v < f.min) errs[f.key] = `不能小于 ${f.min}`
      else if (f.max !== undefined && v > f.max) errs[f.key] = `不能大于 ${f.max}`
    }
    if (f.type === 'origins') {
      const bad = v.find((o) => !/^https?:\/\/[^/\s]+$/i.test(o))
      if (bad) errs[f.key] = `来源格式无效：${bad}（应为 http(s)://主机[:端口]，不带路径）`
    }
  }
  fieldErrors.value = errs
  return !Object.keys(errs).length
}

function onField(key) {
  outcome.value = null
  changes.value = null
  if (fieldErrors.value[key]) { const { [key]: _omit, ...rest } = fieldErrors.value; fieldErrors.value = rest }
}

function handleError(error, title) {
  if (error?.status === 409) { conflict.value = true; return }
  if (error?.status === 400 && error.data?.errors) {
    fieldErrors.value = { ...error.data.errors }
    outcome.value = { tone: 'err', title: '校验未通过', text: error.data.msg || '请修正标记的字段。' }
    return
  }
  outcome.value = { tone: 'err', title, text: describeError(error) }
}

async function runValidate(payload = { revision: cfg.value.revision, values: payloadValues() }) {
  outcome.value = null
  if (!localValidate()) { outcome.value = { tone: 'err', title: '校验未通过', text: '请修正标记的字段。' }; return null }
  busy.value = 'validate'
  try {
    const res = await api.validateConfig(payload)
    if (res?.valid !== true || !Array.isArray(res.changes)) {
      outcome.value = { tone: 'err', title: '校验失败', text: '服务器未确认配置有效，本次修改不会保存。' }
      return null
    }
    changes.value = res?.changes || []
    warnings.value = res?.warnings || []
    fieldErrors.value = {}
    return res
  } catch (error) {
    handleError(error, '校验失败')
    return null
  } finally {
    busy.value = ''
  }
}

async function onValidate() {
  const res = await runValidate()
  if (res) outcome.value = { tone: 'ok', title: '校验通过', text: res.changes?.length ? `${res.changes.length} 项修改可以保存。` : '没有检测到需要保存的修改。' }
}

const labelOf = (key) => fieldMap.value[key]?.label || key

async function onSave() {
  if (busy.value || !cfg.value || config.stale.value || !dirty.value) return
  // Save exactly the revision and values that the server validated and the user confirmed.
  const payload = { revision: cfg.value.revision, values: payloadValues() }
  const res = await runValidate(payload)
  if (!res) return
  if (!res.changes?.length) { outcome.value = { tone: 'info', title: '无需保存', text: '服务器上的配置与当前表单一致。' }; return }
  const needsRestart = res.changes.some((c) => c.restartRequired)
  const ok = await confirm({
    title: '保存配置',
    message: `确认以下 ${res.changes.length} 项修改。${needsRestart ? '\n标记“需重启”的项目在重启服务后生效。' : ''}${res.warnings?.length ? `\n\n注意：\n${res.warnings.map((w) => `· ${w}`).join('\n')}` : ''}`,
    details: res.changes.map((c) => ({ label: labelOf(c.key), before: c.before, after: c.after, note: c.restartRequired ? '需重启' : '' })),
    confirmText: '保存'
  })
  if (!ok) return
  busy.value = 'save'
  try {
    const saved = await api.saveConfig(payload)
    const list = saved?.changes || res.changes
    if (saved?.config) config.set(saved.config); else await config.load()
    resetDraft()
    const restart = list.some((c) => c.restartRequired)
    outcome.value = { tone: 'ok', title: '配置已保存', text: `${list.length} 项修改已写入。${restart ? '部分修改需要重启服务后生效。' : '修改已立即生效。'}`, restart, list }
  } catch (error) {
    handleError(error, '保存失败，服务器配置未改变')
  } finally {
    busy.value = ''
  }
}

async function onDiscard() {
  if (!dirty.value) return
  const ok = await confirm({ title: '放弃修改', message: `放弃 ${dirtyKeys.value.length} 项未保存的修改？`, confirmText: '放弃修改', tone: 'danger' })
  if (ok) { resetDraft(); outcome.value = null }
}

async function onReloadConflict() {
  await config.load()
  if (config.error.value) {
    outcome.value = { tone: 'err', title: '重新加载失败', text: `${describeError(config.error.value)}。未保存的修改仍保留。` }
    return
  }
  conflict.value = false
  resetDraft()
  outcome.value = { tone: 'info', title: '已重新加载', text: '表单已更新为服务器上的最新配置，请重新修改。' }
}

async function onRollback() {
  const ok = await confirm({
    title: '回滚到上一次配置',
    message: '将恢复上一次保存前的配置备份，当前配置会被替换。涉及监听地址或共享目录的项目需要重启后生效。',
    confirmText: '回滚', tone: 'danger'
  })
  if (!ok) return
  busy.value = 'rollback'
  outcome.value = null
  try {
    const res = await api.rollbackConfig(cfg.value.revision)
    if (res?.config) config.set(res.config); else await config.load()
    resetDraft()
    outcome.value = { tone: 'ok', title: '已回滚', text: res?.msg || '配置已恢复到上一次备份。', restart: (res?.config?.pendingRestart || []).length > 0 }
  } catch (error) {
    handleError(error, '回滚失败，当前配置未改变')
  } finally {
    busy.value = ''
  }
}

async function onExport() {
  busy.value = 'export'
  try {
    const { blob, filename } = await api.exportConfig()
    saveBlob(blob, filename || `file-serve-config-${new Date().toISOString().slice(0, 10)}.json`)
    outcome.value = { tone: 'ok', title: '已导出', text: '导出文件包含共享目录路径等本机设置，不包含任何令牌或密钥，请妥善保管。' }
  } catch (error) {
    outcome.value = { tone: 'err', title: '导出失败', text: describeError(error) }
  } finally {
    busy.value = ''
  }
}

// ---------- Unsaved-change protection ----------
onBeforeRouteLeave(async () => {
  if (!dirty.value) return true
  return confirm({ title: '离开此页面？', message: `有 ${dirtyKeys.value.length} 项未保存的配置修改，离开后将丢失。`, confirmText: '放弃并离开', cancelText: '留在此页', tone: 'danger' })
})
const beforeUnload = (e) => { if (dirty.value) { e.preventDefault(); e.returnValue = '' } }
onMounted(() => window.addEventListener('beforeunload', beforeUnload))
onBeforeUnmount(() => window.removeEventListener('beforeunload', beforeUnload))

const SOURCE = { env: '环境变量', environment: '环境变量', file: '配置文件', default: '默认值', local: '本地配置' }
</script>

<template>
  <section class="page" aria-labelledby="config-title">
    <div class="page-head">
      <div>
        <h1 id="config-title">配置</h1>
        <p>只开放白名单字段。保存前会先在服务器校验并展示差异；令牌、数据库与缓存路径不在此修改。</p>
      </div>
      <div class="page-actions">
        <SampleStamp :at="config.receivedAt.value" :stale="config.stale.value" :loading="config.loading.value" label="读取于" />
        <button type="button" class="btn" :disabled="config.loading.value || !!busy" data-testid="button-reload-config" @click="dirty ? onDiscard() : config.load()"><RefreshCw :class="{ spin: config.loading.value }" aria-hidden="true" />{{ dirty ? '放弃修改' : '重新读取' }}</button>
        <button type="button" class="btn" :disabled="!cfg || !!busy" data-testid="button-export-config" @click="onExport"><Download aria-hidden="true" />导出</button>
        <button type="button" class="btn" :disabled="!cfg?.backupAvailable || !!busy || dirty" :title="cfg?.backupAvailable ? '恢复上一次保存前的配置' : '没有可用的备份'" data-testid="button-rollback" @click="onRollback"><History aria-hidden="true" />回滚</button>
      </div>
    </div>

    <InlineAlert v-if="config.stale.value" tone="warn" title="刷新失败">{{ describeError(config.error.value) }}。显示的是上次读取的配置。</InlineAlert>
    <InlineAlert v-if="conflict" tone="warn" title="配置已被修改" data-testid="alert-config-conflict">
      其他会话或进程在你编辑期间修改了配置（版本冲突），本次修改未保存。
      <template #actions><button type="button" class="btn btn-sm btn-primary" data-testid="button-reload-conflict" @click="onReloadConflict">读取最新配置</button></template>
    </InlineAlert>
    <InlineAlert v-if="cfg?.pendingRestart?.length" tone="info" title="有修改等待重启" data-testid="alert-pending-restart">
      {{ cfg.pendingRestart.map(labelOf).join('、') }} 已保存，但需要重启服务后生效。
      <template #actions><RouterLink to="/overview" class="btn btn-sm"><RotateCw aria-hidden="true" />前往重启</RouterLink></template>
    </InlineAlert>

    <div v-if="config.error.value && !cfg" class="card">
      <EmptyState :icon="SlidersHorizontal" title="无法读取配置" :text="describeError(config.error.value)">
        <button type="button" class="btn btn-primary" data-testid="button-retry-config" @click="config.load()"><RefreshCw aria-hidden="true" />重试</button>
      </EmptyState>
    </div>

    <div v-else-if="!cfg" class="stack" aria-busy="true">
      <div v-for="i in 3" :key="i" class="card card-body stack"><div class="skeleton sk-line" style="width: 20%" /><div v-for="j in 3" :key="j" class="skeleton" style="height: 36px" /></div>
    </div>

    <form v-else class="cfg" novalidate data-testid="form-config" @submit.prevent="onSave">
      <InlineAlert v-if="!fields.length" tone="info" data-testid="alert-config-readonly">当前服务未提供可编辑配置字段，仅显示只读信息。不会提交遮蔽的敏感值。</InlineAlert>
      <section v-for="g in groups" :key="g.id" class="card" :aria-labelledby="`grp-${g.id}`">
        <div class="card-head"><div><h2 :id="`grp-${g.id}`">{{ g.title }}</h2><p v-if="g.desc" class="small muted">{{ g.desc }}</p></div></div>
        <div class="fields">
          <div v-for="f in g.fields" :key="f.key" class="cfg-field" :class="{ changed: dirtyKeys.includes(f.key), error: fieldErrors[f.key] }" :data-testid="`field-${f.key}`">
            <div class="cfg-label">
              <label class="field-label" :for="`f-${f.key}`">
                {{ f.label || f.key }}
                <span v-if="dirtyKeys.includes(f.key)" class="badge accent">已修改</span>
                <span v-if="f.restartRequired" class="badge"><RotateCw aria-hidden="true" />需重启</span>
                <span v-if="pending.has(f.key)" class="badge warn">待重启生效</span>
                <span v-if="f.readonly" class="badge" :title="f.source ? `由${SOURCE[f.source] || f.source}控制` : ''"><Lock aria-hidden="true" />{{ SOURCE[f.source] || f.source || '只读' }}</span>
              </label>
              <p v-if="f.help" :id="`h-${f.key}`" class="field-help">{{ f.help }}</p>
              <code class="key faint">{{ f.key }}</code>
            </div>
            <div class="cfg-control">
              <label v-if="f.type === 'boolean'" class="switch">
                <input :id="`f-${f.key}`" v-model="draft[f.key]" type="checkbox" role="switch" :disabled="f.readonly || !!busy" :aria-describedby="f.help ? `h-${f.key}` : undefined" :data-testid="`input-${f.key}`" @change="onField(f.key)" />
                <span class="switch-track" aria-hidden="true" />
                <span class="small">{{ draft[f.key] ? '开启' : '关闭' }}</span>
              </label>
              <textarea v-else-if="f.type === 'origins'" :id="`f-${f.key}`" v-model="draft[f.key]" class="textarea" :class="{ invalid: fieldErrors[f.key] }" rows="3" placeholder="每行一个，例如 https://nas.local:3443" :disabled="f.readonly || !!busy" :aria-invalid="!!fieldErrors[f.key]" :aria-describedby="`e-${f.key}`" spellcheck="false" :data-testid="`input-${f.key}`" @input="onField(f.key)" />
              <div v-else class="row nowrap">
                <input :id="`f-${f.key}`" v-model="draft[f.key]" class="input" :class="{ invalid: fieldErrors[f.key], mono: f.type === 'string', num: f.type === 'number' }" :type="f.type === 'number' ? 'number' : 'text'" :min="f.min" :max="f.max" :step="f.type === 'number' ? (f.integer === true ? 1 : 'any') : undefined" :inputmode="f.type === 'number' ? (f.integer === true ? 'numeric' : 'decimal') : undefined" :disabled="f.readonly || !!busy" :aria-invalid="!!fieldErrors[f.key]" :aria-describedby="`e-${f.key}`" spellcheck="false" autocomplete="off" :data-testid="`input-${f.key}`" @input="onField(f.key)" />
                <CopyButton v-if="f.type === 'string' && draft[f.key]" :value="String(draft[f.key])" :label="`复制${f.label || f.key}`" />
              </div>
              <p v-if="f.type === 'number' && (f.min !== undefined || f.max !== undefined)" class="field-help num">范围 {{ f.min ?? '—' }} – {{ f.max ?? '—' }}</p>
              <p v-if="fieldErrors[f.key]" :id="`e-${f.key}`" class="field-error" role="alert" :data-testid="`error-${f.key}`"><AlertTriangle class="ei" aria-hidden="true" />{{ fieldErrors[f.key] }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="runtimeInfo.length" class="card" aria-labelledby="rt-title">
        <div class="card-head"><div><h2 id="rt-title"><Info aria-hidden="true" />运行时信息（只读）</h2><p class="small muted">由部署环境决定，敏感值已由服务器遮蔽。</p></div></div>
        <div class="table-wrap">
          <table class="table">
            <tbody>
              <tr v-for="r in runtimeInfo" :key="r.key" :data-testid="`runtime-${r.key}`"><td class="mono small rk">{{ r.key }}</td><td class="mono small rv">{{ r.value }}</td><td class="r"><CopyButton :value="r.value" :label="`复制 ${r.key}`" /></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div class="savebar" :class="{ active: dirty || outcome || warnings.length }" data-testid="savebar">
        <div class="savebar-inner">
          <div class="save-msgs">
            <InlineAlert v-if="outcome" :tone="outcome.tone" :title="outcome.title" data-testid="alert-config-outcome">
              {{ outcome.text }}
              <ul v-if="outcome.list?.length" class="chg">
                <li v-for="c in outcome.list" :key="c.key">{{ labelOf(c.key) }}<span v-if="c.restartRequired" class="badge">需重启</span></li>
              </ul>
              <template v-if="outcome.restart" #actions><RouterLink to="/overview" class="btn btn-sm" data-testid="link-restart">前往重启</RouterLink></template>
            </InlineAlert>
            <InlineAlert v-if="warnings.length" tone="warn" title="校验提示" data-testid="alert-config-warnings"><ul class="chg"><li v-for="(w, i) in warnings" :key="i">{{ w }}</li></ul></InlineAlert>
            <p v-if="changes && changes.length && !outcome?.list" class="small muted">待保存：{{ changes.map((c) => labelOf(c.key)).join('、') }}</p>
          </div>
          <div class="save-actions">
            <span class="small" :class="dirty ? 'dirty' : 'muted'" data-testid="text-dirty">{{ dirty ? `${dirtyKeys.length} 项未保存` : '没有未保存的修改' }}</span>
            <button type="button" class="btn btn-ghost" :disabled="!dirty || !!busy" data-testid="button-discard" @click="onDiscard"><Undo2 aria-hidden="true" />撤销</button>
            <button type="button" class="btn" :disabled="!dirty || !!busy || config.stale.value" data-testid="button-validate" @click="onValidate"><RefreshCw v-if="busy === 'validate'" class="spin" aria-hidden="true" /><ShieldCheck v-else aria-hidden="true" />校验</button>
            <button type="submit" class="btn btn-primary" :disabled="!dirty || !!busy || config.stale.value" data-testid="button-save"><RefreshCw v-if="busy === 'save'" class="spin" aria-hidden="true" /><Save v-else aria-hidden="true" />保存</button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
.cfg { display: grid; gap: var(--space-4); }
.card-head h2 { display: flex; align-items: center; gap: var(--space-2); }
.card-head p { margin-top: 2px; }
.fields { display: grid; }
.cfg-field { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: var(--space-2) var(--space-6); padding: var(--space-4); border-bottom: 1px solid var(--color-divider); transition: background var(--transition); }
.cfg-field:last-child { border-bottom: 0; }
.cfg-field.changed { background: color-mix(in oklab, var(--color-primary-soft) 45%, transparent); }
.cfg-field.error { background: color-mix(in oklab, var(--color-error-soft) 45%, transparent); }
.cfg-label { display: grid; gap: 4px; align-content: start; }
.key { font-size: var(--text-xs); }
.cfg-control { display: grid; gap: var(--space-1); align-content: start; }
.nowrap { flex-wrap: nowrap; }
.ei { width: 13px; height: 13px; flex: none; }
.rk { width: 30%; color: var(--color-text-muted); }
.rv { overflow-wrap: anywhere; }
.savebar { position: static; bottom: 0; z-index: 4; margin: 0 calc(-1 * var(--space-2)); padding: var(--space-2); }
.savebar-inner { display: flex; gap: var(--space-4); align-items: flex-end; justify-content: space-between; flex-wrap: wrap; background: var(--color-surface); border: 1px solid var(--color-border-strong); border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4); box-shadow: var(--shadow-sm); }
.savebar.active { position: sticky; }
.savebar.active .savebar-inner { box-shadow: var(--shadow-md); }
.save-msgs { flex: 1 1 320px; display: grid; gap: var(--space-2); min-width: 0; }
.save-actions { display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap; }
.dirty { color: var(--color-primary-text); font-weight: 600; }
.chg { margin: var(--space-1) 0 0; padding-left: var(--space-5); display: grid; gap: 2px; }
.chg .badge { margin-left: var(--space-2); }
@media (max-width: 800px) { .cfg-field { grid-template-columns: 1fr; } .save-actions { width: 100%; } }
</style>
