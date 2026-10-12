const isNum = (v) => typeof v === 'number' && Number.isFinite(v)

export const DASH = '—'

export function formatBytes(bytes, digits = 1) {
  if (!isNum(bytes)) return DASH
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB', 'TB', 'PB']
  let value = bytes / 1024
  let i = 0
  while (value >= 1024 && i < units.length - 1) { value /= 1024; i++ }
  return `${value.toFixed(value >= 100 ? 0 : digits)} ${units[i]}`
}

export const formatMB = (mb) => (isNum(mb) ? formatBytes(mb * 1024 * 1024) : DASH)
export const formatGB = (gb) => (isNum(gb) ? formatBytes(gb * 1024 ** 3) : DASH)

export function formatPercent(value, digits = 1) {
  if (!isNum(value)) return DASH
  return `${value.toFixed(digits)}%`
}

export function formatNumber(value) {
  if (!isNum(value)) return DASH
  return value.toLocaleString('zh-CN')
}

export function formatDuration(seconds) {
  if (!isNum(seconds) || seconds < 0) return DASH
  const s = Math.floor(seconds)
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (d) return `${d} 天 ${h} 小时`
  if (h) return `${h} 小时 ${m} 分`
  if (m) return `${m} 分 ${s % 60} 秒`
  return `${s} 秒`
}

export function toDate(value) {
  if (value === null || value === undefined || value === '') return null
  const d = value instanceof Date ? value : new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

const pad = (n) => String(n).padStart(2, '0')

export function formatDateTime(value, { seconds = true } = {}) {
  const d = toDate(value)
  if (!d) return DASH
  const base = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  return seconds ? `${base}:${pad(d.getSeconds())}` : base
}

export function formatTime(value) {
  const d = toDate(value)
  if (!d) return DASH
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function formatRelative(value, now = Date.now()) {
  const d = toDate(value)
  if (!d) return DASH
  const diff = Math.round((now - d.getTime()) / 1000)
  const future = diff < 0
  const abs = Math.abs(diff)
  let text
  if (abs < 5) return '刚刚'
  if (abs < 60) text = `${abs} 秒`
  else if (abs < 3600) text = `${Math.floor(abs / 60)} 分钟`
  else if (abs < 86400) text = `${Math.floor(abs / 3600)} 小时`
  else text = `${Math.floor(abs / 86400)} 天`
  return future ? `${text}后` : `${text}前`
}

/** Convert a <input type="datetime-local"> value to ISO string (local timezone). */
export function localInputToIso(value) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString()
}
