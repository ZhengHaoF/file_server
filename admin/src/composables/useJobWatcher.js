import { shallowRef, ref, onBeforeUnmount, getCurrentInstance } from 'vue'
import * as api from '../api/admin.js'
import { isAbort } from '../lib/http.js'

export const TERMINAL = new Set(['succeeded', 'failed', 'interrupted'])
export const JOB_STATUS = {
  queued: ['info', '排队中'],
  running: ['accent', '运行中'],
  succeeded: ['ok', '已完成'],
  failed: ['err', '失败'],
  interrupted: ['warn', '已中断']
}
export const JOB_TYPES = {
  'cache.expired': '清理过期缓存', 'cache.all': '清空全部缓存', 'cache.policy': '按策略清理缓存',
  'cache-expired': '清理过期缓存', 'cache-all': '清空全部缓存', 'cache-policy': '按策略清理缓存',
  expired: '清理过期缓存', all: '清空全部缓存', policy: '按策略清理缓存'
}
export const jobTypeLabel = (type) => JOB_TYPES[type] || type || '任务'

/** Poll a job until it reaches a terminal status. Tolerates transient network errors. */
export function useJobWatcher({ interval = 1500, onDone } = {}) {
  const job = shallowRef(null)
  const error = shallowRef(null)
  const watching = ref(false)
  let timer = null
  let controller = null

  function stop() { clearTimeout(timer); controller?.abort(); controller = null; watching.value = false }

  async function tick(id) {
    controller = new AbortController()
    try {
      const res = await api.getJob(id, { signal: controller.signal })
      job.value = res?.job ?? res
      error.value = null
      if (TERMINAL.has(job.value?.status)) { watching.value = false; onDone?.(job.value); return }
    } catch (err) {
      if (isAbort(err)) return
      error.value = err // keep polling; the job keeps running server-side
    }
    if (watching.value) timer = setTimeout(() => tick(id), interval)
  }

  function watch(initial) {
    stop()
    job.value = initial
    error.value = null
    if (!initial?.id || TERMINAL.has(initial.status)) { if (initial && TERMINAL.has(initial.status)) onDone?.(initial); return }
    watching.value = true
    timer = setTimeout(() => tick(initial.id), interval)
  }

  if (getCurrentInstance()) onBeforeUnmount(stop)
  return { job, error, watching, watch, stop }
}
