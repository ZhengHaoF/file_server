import { describe, expect, it } from 'vitest'
import { runtimeInfo, restartInfo, isUnsupportedRestart, capabilityEntries } from '../lib/serverInfo.js'

describe('runtime-neutral server status', () => {
  it('uses Rust runtime/version without falling back to a legacy Node version', () => {
    expect(runtimeInfo({ runtime: 'rust', version: '0.1.0', nodeVersion: 'v22' })).toEqual({ label: 'Rust', version: '0.1.0' })
    expect(runtimeInfo({ runtime: 'Rust', nodeVersion: 'v22' })).toEqual({ label: 'Rust', version: '' })
  })
  it('retains the old Node contract and handles missing fields honestly', () => {
    expect(runtimeInfo({ nodeVersion: 'v22.20.0' })).toEqual({ label: 'Node.js', version: 'v22.20.0' })
    expect(runtimeInfo({ runtime: 'node', nodeVersion: 'v22' })).toEqual({ label: 'Node.js', version: 'v22' })
    expect(runtimeInfo()).toEqual({ label: '未知', version: '' })
  })
  it('keeps other runtime names instead of assuming Node', () => {
    expect(runtimeInfo({ runtime: 'custom', version: '1.2' })).toEqual({ label: 'custom', version: '1.2' })
  })
  it('enables restart only on explicit support and displays a server-provided reason', () => {
    expect(restartInfo({ restartSupported: true }).supported).toBe(true)
    expect(restartInfo({ restartSupported: 'true', deployment: 'supervisor' }).supported).toBe(false)
    expect(restartInfo().text).toContain('未报告')
    expect(restartInfo({ restartSupported: false, restartReason: '由 systemd 管理' }).text).toBe('由 systemd 管理')
  })
  it('distinguishes unsupported restart from a temporary maintenance conflict', () => {
    expect(isUnsupportedRestart({ status: 409, data: { code: 'MAINTENANCE_BUSY' } })).toBe(false)
    expect(isUnsupportedRestart({ status: 409, data: { code: 'RESTART_UNSUPPORTED' } })).toBe(true)
    expect(isUnsupportedRestart({ status: 501 })).toBe(true)
  })
  it('only displays explicitly reported boolean capabilities, not invented ones', () => {
    expect(capabilityEntries()).toEqual([])
    expect(capabilityEntries({ imagePreview: false, videoPreview: true, unknown: false, ignored: 'false' })).toEqual([
      { key: 'imagePreview', label: '图片预览', available: false },
      { key: 'videoPreview', label: '视频截图', available: true },
      { key: 'unknown', label: 'unknown', available: false }
    ])
  })
})
