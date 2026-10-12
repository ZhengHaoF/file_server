import { describe, it, expect, vi } from 'vitest'

vi.mock('../lib/http.js', () => ({
  http: { get: vi.fn(), post: vi.fn(), put: vi.fn(), del: vi.fn() }
}))

import { http } from '../lib/http.js'
import { getCacheStats, getLogs, exportLogs } from '../api/admin.js'

describe('admin request policies', () => {
  it('uses cached statistics normally and preserves an explicit manual refresh', () => {
    const signal = new AbortController().signal
    getCacheStats({ signal })
    expect(http.get).toHaveBeenLastCalledWith('/api/admin/cache/stats', { signal })
    getCacheStats({ signal, query: { refresh: 'true' } })
    expect(http.get).toHaveBeenLastCalledWith('/api/admin/cache/stats', { signal, query: { refresh: 'true' } })
  })

  it('uses physical append paging for the log UI without changing export defaults', () => {
    getLogs({ limit: 100, before: 'cursor' }, { timeout: 9000 })
    expect(http.get).toHaveBeenLastCalledWith('/api/admin/logs', {
      timeout: 9000, query: { order: 'append', limit: 100, before: 'cursor' }
    })
    exportLogs({ format: 'csv' })
    expect(http.get).toHaveBeenLastCalledWith('/api/admin/logs/export', {
      timeout: 60000, query: { format: 'csv' }, responseType: 'blob'
    })
  })
})
