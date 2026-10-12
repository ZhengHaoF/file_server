<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { KeyRound, RefreshCw, LogOut, Ban } from 'lucide-vue-next'
import * as api from '../api/admin.js'
import { auth } from '../stores/auth.js'
import { useResource } from '../composables/useResource.js'
import { useClock } from '../composables/useClock.js'
import { confirm } from '../composables/useConfirm.js'
import { describeError } from '../lib/http.js'
import { formatDateTime, formatRelative, DASH } from '../lib/format.js'
import InlineAlert from '../components/InlineAlert.vue'
import EmptyState from '../components/EmptyState.vue'
import SampleStamp from '../components/SampleStamp.vue'

const list = useResource((o) => api.listSessions(o), { sampledAt: () => null })
const sessions = computed(() => {
  const items = list.data.value?.sessions || []
  return [...items].sort((a, b) => (b.current ? 1 : 0) - (a.current ? 1 : 0) || new Date(b.lastSeenAt || 0) - new Date(a.lastSeenAt || 0))
})
const { now, release } = useClock()
onBeforeUnmount(release)

const revoking = ref('')
const outcome = ref(null)
const ROLE = { admin: '管理', file: '文件访问', read: '只读', write: '读写', access: '文件访问' }
const shortId = (id) => (String(id).length > 12 ? `${String(id).slice(0, 8)}…${String(id).slice(-4)}` : String(id))

async function revoke(s) {
  const ok = await confirm(s.current
    ? { title: '撤销当前会话', message: '这是你正在使用的会话。撤销后将立即退出登录，并关闭实时日志连接。', confirmText: '撤销并退出', tone: 'danger' }
    : { title: '撤销会话', message: `撤销会话 ${shortId(s.id)}（${ROLE[s.role] || s.role}${s.ip ? `，来自 ${s.ip}` : ''}）。该会话及其媒体票据将立即失效。`, confirmText: '撤销会话', tone: 'danger' })
  if (!ok) return
  revoking.value = s.id
  outcome.value = null
  try {
    const res = await api.revokeSession(s.id)
    if (res?.current || s.current) { auth.signedOutRemotely('revoked'); return }
    outcome.value = { tone: 'ok', text: `已撤销会话 ${shortId(s.id)}。` }
    await list.load()
  } catch (error) {
    if (error?.status === 404) { outcome.value = { tone: 'info', text: '该会话已不存在（可能已过期或已被撤销）。' }; await list.load() }
    else outcome.value = { tone: 'err', text: `撤销失败：${describeError(error)}` }
  } finally {
    revoking.value = ''
  }
}

async function logoutCurrent() {
  const ok = await confirm({ title: '退出登录', message: '将撤销当前管理会话。', confirmText: '退出登录' })
  if (ok) await auth.logout()
}
</script>

<template>
  <section class="page" aria-labelledby="sess-title">
    <div class="page-head">
      <div>
        <h1 id="sess-title">会话</h1>
        <p>当前有效的登录会话。服务重启会清空全部会话。列表中的标识仅用于管理，不是登录凭据。</p>
      </div>
      <div class="page-actions">
        <SampleStamp :at="list.receivedAt.value" :stale="list.stale.value" :loading="list.loading.value" label="读取于" />
        <button type="button" class="btn" :disabled="list.loading.value" data-testid="button-refresh-sessions" @click="list.load()"><RefreshCw :class="{ spin: list.loading.value }" aria-hidden="true" />刷新</button>
        <button type="button" class="btn" data-testid="button-logout-current" @click="logoutCurrent"><LogOut aria-hidden="true" />退出登录</button>
      </div>
    </div>

    <InlineAlert v-if="outcome" :tone="outcome.tone" data-testid="alert-session-outcome">{{ outcome.text }}</InlineAlert>
    <InlineAlert v-if="list.stale.value" tone="warn" title="刷新失败">{{ describeError(list.error.value) }}。显示的是上次读取的列表。</InlineAlert>

    <div class="card">
      <div v-if="list.error.value && !list.data.value">
        <EmptyState :icon="KeyRound" title="无法读取会话" :text="describeError(list.error.value)"><button type="button" class="btn btn-primary" @click="list.load()">重试</button></EmptyState>
      </div>
      <div v-else-if="!list.data.value" class="sk" aria-busy="true"><div v-for="i in 3" :key="i" class="skeleton sk-line" /></div>
      <EmptyState v-else-if="!sessions.length" :icon="KeyRound" title="没有有效会话" text="服务器没有返回任何会话记录。" />
      <div v-else class="table-wrap" tabindex="0" role="region" aria-label="会话列表，可左右滚动">
        <p class="table-hint">表格可左右滑动，右侧可撤销会话。</p>
        <table class="table">
          <thead><tr><th>会话</th><th>角色</th><th>来源 IP</th><th>创建</th><th>最近活动</th><th>到期</th><th class="r">操作</th></tr></thead>
          <tbody>
            <tr v-for="s in sessions" :key="s.id" :class="{ current: s.current }" :data-testid="`row-session-${s.id}`">
              <td><span class="mono small" :title="String(s.id)">{{ shortId(s.id) }}</span><span v-if="s.current" class="badge accent cur">当前会话</span></td>
              <td><span class="badge" :class="s.role === 'admin' ? 'info' : ''">{{ ROLE[s.role] || s.role }}</span></td>
              <td class="mono small">{{ s.ip || DASH }}</td>
              <td class="num small">{{ formatDateTime(s.createdAt) }}</td>
              <td class="num small"><span :title="formatDateTime(s.lastSeenAt)">{{ s.lastSeenAt ? formatRelative(s.lastSeenAt, now) : DASH }}</span></td>
              <td class="num small">{{ formatDateTime(s.expiresAt) }}</td>
              <td class="r">
                <button type="button" class="btn btn-sm btn-quiet-danger" :disabled="!!revoking" :data-testid="`button-revoke-${s.id}`" @click="revoke(s)">
                  <RefreshCw v-if="revoking === s.id" class="spin" aria-hidden="true" /><Ban v-else aria-hidden="true" />撤销
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sk { display: grid; gap: var(--space-3); padding: var(--space-4); }
.cur { margin-left: var(--space-2); }
tr.current td { background: color-mix(in oklab, var(--color-primary-soft) 40%, transparent); }
</style>
