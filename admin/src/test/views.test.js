import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory, RouterView } from 'vue-router'
import { defineComponent, h } from 'vue'
import { ApiError } from '../lib/http.js'
import { deferred } from './helpers.js'

vi.mock('../api/admin.js', () => ({
  getStatus: vi.fn(), restartServer: vi.fn(), getSession: vi.fn(), login: vi.fn(), logout: vi.fn(),
  getCacheStats: vi.fn(), startCacheJob: vi.fn(), listJobs: vi.fn(), getJob: vi.fn(), listAudit: vi.fn(),
  getLogs: vi.fn(), exportLogs: vi.fn(), getConfig: vi.fn(), validateConfig: vi.fn(), saveConfig: vi.fn(),
  rollbackConfig: vi.fn(), exportConfig: vi.fn(), listSessions: vi.fn(), revokeSession: vi.fn()
}))
const api = await import('../api/admin.js')
const { default: ConfirmHost } = await import('../components/ConfirmHost.vue')
const { confirm, confirmState, settleConfirm } = await import('../composables/useConfirm.js')
const { default: OverviewView } = await import('../views/OverviewView.vue')
const { default: ConfigView } = await import('../views/ConfigView.vue')
const { default: LogsView } = await import('../views/LogsView.vue')
const { default: CacheView } = await import('../views/CacheView.vue')
const { default: SessionsView } = await import('../views/SessionsView.vue')
const { default: OperationsView } = await import('../views/OperationsView.vue')

const Blank = defineComponent({ render: () => h('div', 'other') })

async function mountWithRouter(View, path = '/x') {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/x', component: View }, { path: '/:p(.*)*', component: Blank }] })
  await router.push(path)
  const Host = defineComponent({ render: () => [h(ConfirmHost), h(RouterView)] })
  const wrapper = mount(Host, { global: { plugins: [router] }, attachTo: document.body })
  await flushPromises()
  return { wrapper, router }
}

const STATUS = {
  sampledAt: '2026-10-11T10:00:00Z', bootId: 'b1',
  cpu: { usage: null, cores: 4, warmingUp: true },
  memory: { total: 8192, free: 4096, used: 4096, usage: 50, scope: 'host' },
  disk: { total: 100, used: 40, free: 60, usage: 40, available: true, scope: 'shared-filesystem' },
  process: { rss: 100 * 1024 * 1024, heapUsed: 1, heapTotal: 2 },
  server: { uptime: 100, nodeVersion: 'v22', httpPort: 3000, httpsPort: 3443, httpStatus: 'running', httpsStatus: 'disabled', restartSupported: false, deployment: 'direct' },
  queues: { image: { active: 0, pending: 0, limit: 2 }, video: { active: 0, pending: 0, limit: 1 }, upload: { active: 0, pending: 0, limit: 4 }, maintenance: null },
  history: [], alerts: []
}

beforeEach(() => { vi.clearAllMocks(); document.body.innerHTML = ''; if (confirmState.open) settleConfirm(false) })
afterEach(() => { document.body.innerHTML = ''; vi.unstubAllGlobals() })

describe('ConfirmHost', () => {
  it('opens, focuses cancel for danger, Escape cancels, confirm resolves true', async () => {
    const w = mount(ConfirmHost, { attachTo: document.body })
    let p = confirm({ title: '删除', message: 'm', tone: 'danger' })
    await flushPromises()
    const dlg = document.querySelector('[data-testid="confirm-dialog"]')
    expect(dlg.getAttribute('role')).toBe('alertdialog')
    expect(document.activeElement?.dataset.testid).toBe('button-confirm-cancel')
    dlg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(await p).toBe(false)
    p = confirm({ title: 'ok', message: 'm' })
    await flushPromises()
    document.querySelector('[data-testid="button-confirm-ok"]').click()
    expect(await p).toBe(true)
    w.unmount()
  })
  it('requires typed text when requested', async () => {
    const w = mount(ConfirmHost, { attachTo: document.body })
    const p = confirm({ title: 'x', requireText: '清空' })
    await flushPromises()
    const ok = document.querySelector('[data-testid="button-confirm-ok"]')
    expect(ok.disabled).toBe(true)
    const input = document.querySelector('[data-testid="input-confirm-text"]')
    input.value = '清空'; input.dispatchEvent(new Event('input'))
    await flushPromises()
    expect(ok.disabled).toBe(false)
    ok.click()
    expect(await p).toBe(true)
    w.unmount()
  })
})

describe('OverviewView', () => {
  it('displays Rust version, unavailable heap metrics and a disabled restart action', async () => {
    api.getStatus.mockResolvedValue({
      ...STATUS, process: { rss: 100 * 1024 * 1024, heapUsed: null, heapTotal: null },
      server: { ...STATUS.server, runtime: 'rust', version: '0.1.0', restartReason: '由外部服务管理器重启' },
      capabilities: { imagePreview: false, videoPreview: true }
    })
    const { wrapper } = await mountWithRouter(OverviewView)
    expect(wrapper.find('[data-testid="text-runtime"]').text()).toBe('Rust')
    expect(wrapper.find('[data-testid="text-runtime-version"]').text()).toBe('0.1.0')
    expect(wrapper.find('[data-testid="kpi-process"]').text()).toContain('未提供堆内存统计')
    expect(wrapper.find('[data-testid="button-restart"]').element.disabled).toBe(true)
    expect(wrapper.find('[data-testid="text-restart-unsupported"]').text()).toContain('外部服务管理器')
    expect(wrapper.find('[data-testid="capability-imagePreview"]').text()).toBe('图片预览：不可用')
    expect(wrapper.find('[data-testid="capability-videoPreview"]').text()).toBe('视频截图：可用')
    await wrapper.find('[data-testid="button-restart"]').trigger('click')
    expect(api.restartServer).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  it('falls back to old Node status and never enables unknown restart support', async () => {
    api.getStatus.mockResolvedValue({ ...STATUS, server: { nodeVersion: 'v22' } })
    const { wrapper } = await mountWithRouter(OverviewView)
    expect(wrapper.find('[data-testid="text-runtime"]').text()).toBe('Node.js')
    expect(wrapper.find('[data-testid="text-runtime-version"]').text()).toBe('v22')
    expect(wrapper.find('[data-testid="button-restart"]').element.disabled).toBe(true)
    expect(wrapper.find('[data-testid="text-restart-unsupported"]').text()).toContain('未报告')
    wrapper.unmount()
  })
  it('distinguishes disabled HTTPS from stopped and shows warming CPU, not 0', async () => {
    api.getStatus.mockResolvedValue(STATUS)
    const { wrapper } = await mountWithRouter(OverviewView)
    expect(wrapper.find('[data-testid="status-https"]').text()).toBe('未启用')
    expect(wrapper.find('[data-testid="status-http"]').text()).toBe('运行中')
    expect(wrapper.find('[data-testid="kpi-cpu"]').text()).toContain('采样中')
    expect(wrapper.find('[data-testid="kpi-disk"]').text()).toContain('可用 60.0 GB')
    expect(wrapper.find('[data-testid="text-restart-unsupported"]').exists()).toBe(true)
    wrapper.unmount()
  })
  it('shows disk unknown when available=false (never 0%)', async () => {
    api.getStatus.mockResolvedValue({ ...STATUS, disk: { total: null, used: null, free: null, usage: null, available: false, scope: 'shared-filesystem' } })
    const { wrapper } = await mountWithRouter(OverviewView)
    const disk = wrapper.find('[data-testid="kpi-disk"]').text()
    expect(disk).toContain('未知')
    expect(disk).not.toContain('0%')
    wrapper.unmount()
  })
  it('keeps last sample and flags stale on network error', async () => {
    api.getStatus.mockResolvedValueOnce(STATUS).mockRejectedValueOnce(new ApiError('down', { kind: 'network' }))
    const { wrapper } = await mountWithRouter(OverviewView)
    await wrapper.find('[data-testid="button-refresh-status"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="alert-status-stale"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="badge-offline"]').text()).toContain('连接失败')
    expect(wrapper.find('[data-testid="kpi-memory"]').text()).toContain('50.0%')
    expect(wrapper.find('[data-testid="sample-stamp"]').text()).toContain('数据可能已过期')
    wrapper.unmount()
  })
  it('shows an error state (not zeros) when the first load fails', async () => {
    api.getStatus.mockRejectedValue(new ApiError('down', { kind: 'network' }))
    const { wrapper } = await mountWithRouter(OverviewView)
    expect(wrapper.find('[data-testid="status-error"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="kpi-cpu"]').exists()).toBe(false)
    wrapper.unmount()
  })
})

const CONFIG = {
  revision: 3, port: 3000, adminToken: '******', backupAvailable: true, pendingRestart: [],
  values: { host: '127.0.0.1', uploadMaxSizeMB: 100, publicRead: false, allowedOrigins: ['http://a:1'], port: 3000 },
  fields: [
    { key: 'host', label: '监听地址', type: 'string', group: 'basic', restartRequired: true, readonly: false, source: 'file' },
    { key: 'port', label: '端口', type: 'number', group: 'basic', restartRequired: true, readonly: true, source: 'env' },
    { key: 'uploadMaxSizeMB', label: '上传上限', type: 'number', group: 'access', restartRequired: false, readonly: false, min: 1, max: 1000 },
    { key: 'publicRead', label: '匿名只读', type: 'boolean', group: 'access', restartRequired: false, readonly: false },
    { key: 'allowedOrigins', label: '来源', type: 'origins', group: 'access', restartRequired: false, readonly: false }
  ]
}

describe('ConfigView', () => {
  it('handles Rust string revisions, new timeout fields and integer descriptors', async () => {
    api.getConfig.mockResolvedValue({
      ...CONFIG, revision: 'sha256-revision',
      values: { ...CONFIG.values, uploadTimeoutSeconds: 1800 },
      fields: [...CONFIG.fields, { key: 'uploadTimeoutSeconds', label: '上传总期限', type: 'number', group: 'access', integer: true, min: 1, max: 86400 }]
    })
    const { wrapper } = await mountWithRouter(ConfigView)
    const timeout = wrapper.find('[data-testid="input-uploadTimeoutSeconds"]')
    expect(timeout.attributes('step')).toBe('1')
    expect(wrapper.find('[data-testid="input-uploadMaxSizeMB"]').attributes('step')).toBe('any')
    await timeout.setValue('3.5')
    await wrapper.find('[data-testid="button-validate"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="error-uploadTimeoutSeconds"]').text()).toContain('整数')
    expect(api.validateConfig).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  it('submits the exact values and revision that were validated and confirmed', async () => {
    api.getConfig.mockResolvedValue(CONFIG)
    api.validateConfig.mockResolvedValue({ valid: true, changes: [{ key: 'host', before: '127.0.0.1', after: '0.0.0.0', restartRequired: true }], warnings: [] })
    api.saveConfig.mockResolvedValue({ config: { ...CONFIG, revision: 4, values: { ...CONFIG.values, host: '0.0.0.0' } } })
    const { wrapper } = await mountWithRouter(ConfigView)
    await wrapper.find('[data-testid="input-host"]').setValue('0.0.0.0')
    await wrapper.find('[data-testid="form-config"]').trigger('submit')
    await flushPromises()
    const validated = api.validateConfig.mock.calls[0][0]
    // Changing form state while confirmation is pending must not bypass validation.
    await wrapper.find('[data-testid="input-host"]').setValue('different.local')
    document.querySelector('[data-testid="button-confirm-ok"]').click()
    await flushPromises()
    expect(api.saveConfig).toHaveBeenCalledWith(validated)
    expect(validated.values.host).toBe('0.0.0.0')
    wrapper.unmount()
  })
  it('does not claim a successful validation when the service fails to confirm validity', async () => {
    api.getConfig.mockResolvedValue(CONFIG)
    api.validateConfig.mockResolvedValue({ valid: false, changes: [] })
    const { wrapper } = await mountWithRouter(ConfigView)
    await wrapper.find('[data-testid="input-host"]').setValue('0.0.0.0')
    await wrapper.find('[data-testid="form-config"]').trigger('submit')
    await flushPromises()
    expect(wrapper.find('[data-testid="alert-config-outcome"]').text()).toContain('未确认配置有效')
    expect(api.saveConfig).not.toHaveBeenCalled()
    expect(confirmState.open).toBe(false)
    wrapper.unmount()
  })
  it('keeps the draft and conflict warning when reloading a conflicting revision fails', async () => {
    api.getConfig.mockResolvedValueOnce(CONFIG).mockRejectedValueOnce(new ApiError('down', { kind: 'network' }))
    api.validateConfig.mockRejectedValue(new ApiError('conflict', { kind: 'http', status: 409 }))
    const { wrapper } = await mountWithRouter(ConfigView)
    await wrapper.find('[data-testid="input-host"]').setValue('0.0.0.0')
    await wrapper.find('[data-testid="button-validate"]').trigger('click')
    await flushPromises()
    await wrapper.find('[data-testid="button-reload-conflict"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="input-host"]').element.value).toBe('0.0.0.0')
    expect(wrapper.find('[data-testid="alert-config-conflict"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="alert-config-outcome"]').text()).toContain('重新加载失败')
    expect(wrapper.find('[data-testid="button-save"]').element.disabled).toBe(true)
    wrapper.unmount()
  })
  it('tracks dirty state, validates, confirms the diff and saves', async () => {
    api.getConfig.mockResolvedValue(CONFIG)
    api.validateConfig.mockResolvedValue({ valid: true, changes: [{ key: 'uploadMaxSizeMB', before: 100, after: 200, restartRequired: false }], warnings: [] })
    api.saveConfig.mockResolvedValue({ msg: 'ok', config: { ...CONFIG, revision: 4, values: { ...CONFIG.values, uploadMaxSizeMB: 200 } }, changes: [{ key: 'uploadMaxSizeMB', before: 100, after: 200, restartRequired: false }] })
    const { wrapper } = await mountWithRouter(ConfigView)
    expect(wrapper.find('[data-testid="input-port"]').element.disabled).toBe(true)
    await wrapper.find('[data-testid="input-uploadMaxSizeMB"]').setValue('200')
    expect(wrapper.find('[data-testid="text-dirty"]').text()).toContain('1 项未保存')
    await wrapper.find('[data-testid="form-config"]').trigger('submit')
    await flushPromises()
    expect(api.validateConfig).toHaveBeenCalledWith({ revision: 3, values: { host: '127.0.0.1', uploadMaxSizeMB: 200, publicRead: false, allowedOrigins: ['http://a:1'] } })
    expect(document.querySelector('[data-testid="confirm-details"]').textContent).toContain('上传上限')
    expect(api.saveConfig).not.toHaveBeenCalled()
    document.querySelector('[data-testid="button-confirm-ok"]').click()
    await flushPromises()
    expect(api.saveConfig).toHaveBeenCalledTimes(1)
    expect(wrapper.find('[data-testid="alert-config-outcome"]').text()).toContain('配置已保存')
    expect(wrapper.find('[data-testid="text-dirty"]').text()).toContain('没有未保存')
    wrapper.unmount()
  })
  it('shows per-field server errors and local range errors', async () => {
    api.getConfig.mockResolvedValue(CONFIG)
    api.validateConfig.mockRejectedValue(new ApiError('bad', { kind: 'http', status: 400, data: { msg: '校验失败', errors: { host: '地址无效' } } }))
    const { wrapper } = await mountWithRouter(ConfigView)
    await wrapper.find('[data-testid="input-uploadMaxSizeMB"]').setValue('5000')
    await wrapper.find('[data-testid="button-validate"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="error-uploadMaxSizeMB"]').text()).toContain('不能大于 1000')
    expect(api.validateConfig).not.toHaveBeenCalled()
    await wrapper.find('[data-testid="input-uploadMaxSizeMB"]').setValue('50')
    await wrapper.find('[data-testid="input-host"]').setValue('bad host')
    await wrapper.find('[data-testid="button-validate"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="error-host"]').text()).toContain('地址无效')
    wrapper.unmount()
  })
  it('shows conflict on stale revision', async () => {
    api.getConfig.mockResolvedValue(CONFIG)
    api.validateConfig.mockRejectedValue(new ApiError('conflict', { kind: 'http', status: 409 }))
    const { wrapper } = await mountWithRouter(ConfigView)
    await wrapper.find('[data-testid="input-publicRead"]').setValue(true)
    await wrapper.find('[data-testid="button-validate"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="alert-config-conflict"]').exists()).toBe(true)
    wrapper.unmount()
  })
  it('guards navigation with unsaved changes', async () => {
    api.getConfig.mockResolvedValue(CONFIG)
    const { wrapper, router } = await mountWithRouter(ConfigView)
    await wrapper.find('[data-testid="input-host"]').setValue('0.0.0.0')
    const nav = router.push('/elsewhere')
    await flushPromises()
    expect(document.querySelector('[data-testid="confirm-dialog"]')).not.toBeNull()
    document.querySelector('[data-testid="button-confirm-cancel"]').click()
    await nav
    expect(router.currentRoute.value.path).toBe('/x')
    wrapper.unmount()
  })
})

describe('LogsView', () => {
  it('does not display previously buffered entries after changing the source filter', async () => {
    vi.stubGlobal('WebSocket', class { close() {} })
    api.getLogs.mockResolvedValue({ logs: [], nextCursor: null })
    const { wrapper } = await mountWithRouter(LogsView)
    const vm = wrapper.findComponent(LogsView).vm
    await wrapper.find('[data-testid="toggle-live"] input').setValue(true)
    await wrapper.find('[data-testid="button-pause-live"]').trigger('click')
    vm.ingest([{ id: 'app-1', timestamp: '2026-10-11T09:00:00Z', level: 'info', message: 'application-buffer' }])
    await wrapper.find('[data-testid="select-source"]').setValue('supervisor')
    await flushPromises()
    vm.ingest([{ id: 'app-2', timestamp: '2026-10-11T09:00:00Z', level: 'info', message: 'application-new' }])
    await wrapper.find('[data-testid="button-pause-live"]').trigger('click')
    expect(wrapper.findAll('[data-testid="log-row"]')).toHaveLength(0)
    wrapper.unmount()
  })
  it('only shows results of the latest filter even if older requests resolve later', async () => {
    const pending = []
    api.getLogs.mockImplementation((q, { signal }) => { const d = deferred(); pending.push({ q, d, signal }); return d.promise })
    const { wrapper } = await mountWithRouter(LogsView)
    await wrapper.find('[data-testid="select-level"]').setValue('error')
    await flushPromises()
    expect(pending.length).toBe(2)
    expect(pending[0].signal.aborted).toBe(true)
    pending[1].d.resolve({ logs: [{ id: 2, timestamp: '2026-10-11T10:00:00Z', level: 'error', message: 'new' }], nextCursor: null })
    await flushPromises()
    pending[0].d.resolve({ logs: [{ id: 1, timestamp: '2026-10-11T09:00:00Z', level: 'info', message: 'old' }], nextCursor: null })
    await flushPromises()
    const rows = wrapper.findAll('[data-testid="log-row"]')
    expect(rows.length).toBe(1)
    expect(rows[0].text()).toContain('new')
    wrapper.unmount()
  })
  it('deduplicates live entries, applies client filters and clear only empties the display', async () => {
    api.getLogs.mockResolvedValue({ logs: [{ id: 1, timestamp: '2026-10-11T09:00:00Z', level: 'info', message: 'a', source: 'application' }], nextCursor: 'c1' })
    const { wrapper } = await mountWithRouter(LogsView)
    const vm = wrapper.findComponent(LogsView).vm
    vm.ingest([{ id: 1, timestamp: '2026-10-11T09:00:00Z', level: 'info', message: 'a' }, { id: 3, timestamp: '2026-10-11T11:00:00Z', level: 'info', message: 'b', source: 'application' }])
    await flushPromises()
    expect(wrapper.findAll('[data-testid="log-row"]').length).toBe(2)
    expect(wrapper.find('[data-testid="button-clear-display"]').text()).toContain('清空显示')
    await wrapper.find('[data-testid="button-clear-display"]').trigger('click')
    expect(wrapper.findAll('[data-testid="log-row"]').length).toBe(0)
    expect(wrapper.text()).toContain('服务器日志未被删除')
    wrapper.unmount()
  })
  it('paginates with nextCursor', async () => {
    api.getLogs.mockResolvedValueOnce({ logs: [{ id: 5, timestamp: 't5', level: 'info', message: 'x' }], nextCursor: 'c5' })
      .mockResolvedValueOnce({ logs: [{ id: 4, timestamp: 't4', level: 'info', message: 'y' }], nextCursor: null })
    const { wrapper } = await mountWithRouter(LogsView)
    await wrapper.find('[data-testid="button-load-more"]').trigger('click')
    await flushPromises()
    expect(api.getLogs.mock.calls[1][0].before).toBe('c5')
    expect(wrapper.findAll('[data-testid="log-row"]').length).toBe(2)
    expect(wrapper.find('[data-testid="button-load-more"]').exists()).toBe(false)
    wrapper.unmount()
  })
})

describe('CacheView', () => {
  it('does not invent policy settings when the service omits them', async () => {
    api.getCacheStats.mockResolvedValue({ totalSize: null, totalFiles: null })
    api.listJobs.mockResolvedValue({ jobs: [] })
    const { wrapper } = await mountWithRouter(CacheView)
    expect(wrapper.text()).toContain('未知')
    expect(wrapper.text()).not.toContain('已关闭')
    expect(wrapper.text()).not.toContain('不限制')
    expect(wrapper.find('[data-testid="text-cache-size"]').text()).toBe('—')
    wrapper.unmount()
  })
  it('requires typed confirmation for clear-all and reports 409 inline', async () => {
    api.getCacheStats.mockResolvedValue({ sampledAt: 't', totalFiles: 3, totalSize: 300, imageCache: { count: 1, size: 100 }, videoCache: { count: 1, size: 100 }, legacyCache: { count: 1, size: 100 }, dbSize: 1, database: { main: 1, wal: 2, shm: 3, total: 6, recordCount: 2 }, policy: { cacheMaxSizeMB: 1, cacheRetentionDays: 30, autoCleanupEnabled: true }, maintenance: null, lastCleanupAt: null })
    api.listJobs.mockResolvedValue({ jobs: [], nextBefore: null })
    api.startCacheJob.mockRejectedValue(new ApiError('busy', { kind: 'http', status: 409 }))
    const { wrapper } = await mountWithRouter(CacheView)
    expect(wrapper.find('[data-testid="row-cache-video"]').text()).toContain('100 B')
    await wrapper.find('[data-testid="radio-mode-all"]').setValue(true)
    await wrapper.find('[data-testid="button-start-clean"]').trigger('click')
    await flushPromises()
    expect(document.querySelector('[data-testid="button-confirm-ok"]').disabled).toBe(true)
    const input = document.querySelector('[data-testid="input-confirm-text"]')
    input.value = '清空'; input.dispatchEvent(new Event('input'))
    await flushPromises()
    document.querySelector('[data-testid="button-confirm-ok"]').click()
    await flushPromises()
    expect(api.startCacheJob).toHaveBeenCalledWith({ mode: 'all' })
    expect(wrapper.find('[data-testid="alert-clean-error"]').text()).toContain('已有一个缓存维护任务')
    wrapper.unmount()
  })
})

describe('Rust-compatible management records', () => {
  it('renders sessions with public management IDs and confirms revocation', async () => {
    api.listSessions.mockResolvedValue({ sessions: [{ id: 'public-id', role: 'access', current: false, createdAt: 1700000000000, lastSeenAt: 1700000000001, expiresAt: 1800000000000, ip: '127.0.0.1' }] })
    api.revokeSession.mockResolvedValue({ current: false, msg: 'ok' })
    const { wrapper } = await mountWithRouter(SessionsView)
    expect(wrapper.find('[data-testid="row-session-public-id"]').text()).toContain('文件访问')
    await wrapper.find('[data-testid="button-revoke-public-id"]').trigger('click')
    await flushPromises()
    expect(api.revokeSession).not.toHaveBeenCalled()
    document.querySelector('[data-testid="button-confirm-ok"]').click()
    await flushPromises()
    expect(api.revokeSession).toHaveBeenCalledWith('public-id')
    expect(wrapper.find('[data-testid="alert-session-outcome"]').text()).toContain('已撤销')
    wrapper.unmount()
  })
  it('shows an explicit unsupported capability error, not an empty successful record list', async () => {
    api.listJobs.mockRejectedValue(new ApiError('持久化任务不可用', { kind: 'http', status: 501 }))
    api.listAudit.mockResolvedValue({ entries: [], nextBefore: null })
    const { wrapper } = await mountWithRouter(OperationsView)
    expect(wrapper.find('[data-testid="alert-jobs-error"]').text()).toContain('能力不可用')
    expect(wrapper.text()).not.toContain('还没有维护任务')
    wrapper.unmount()
  })
})
