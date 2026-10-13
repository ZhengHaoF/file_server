import { describe, expect, it } from 'vitest'
import { ApiError, describeError, request, setTransport, setBearer, onUnauthorized } from '../lib/http.js'

describe('structured Rust errors', () => {
  it('does not sign out a newer login when an older authenticated request returns 401', async () => {
    let finish
    let calls = 0
    onUnauthorized(() => { calls++ })
    setBearer('old-session')
    setTransport(() => new Promise(resolve => { finish = resolve }))
    const pending = request('GET', '/api/admin/status')
    const rejected = expect(pending).rejects.toMatchObject({ status: 401 })
    await Promise.resolve()
    await Promise.resolve()
    setBearer('new-session')
    finish(new Response('{}', { status: 401 }))
    await rejected
    expect(calls).toBe(0)
    setBearer(null)
    setTransport(null)
    onUnauthorized(null)
  })
  it('retains safe diagnostics and field errors returned by the service', async () => {
    setTransport(async () => new Response(JSON.stringify({
      msg: '配置校验失败', code: 'REQUEST_INVALID', requestId: 'req-123', errors: { host: '无效地址' }
    }), { status: 400, headers: { 'Content-Type': 'application/json' } }))
    try {
      await request('PUT', '/api/admin/config')
      throw new Error('expected rejection')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect(error.data.errors).toEqual({ host: '无效地址' })
      expect(describeError(error)).toContain('请求标识：req-123')
    } finally { setTransport(null) }
  })
  it('clearly marks an unavailable service capability', () => {
    expect(describeError(new ApiError('未安装预览程序', { kind: 'http', status: 501 }))).toContain('当前服务能力不可用')
  })
})
