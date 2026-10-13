/** Runtime-neutral status presentation; old Node servers only report nodeVersion. */
export function runtimeInfo(server = {}) {
  const runtime = typeof server.runtime === 'string' ? server.runtime.trim() : ''
  const version = typeof server.version === 'string' ? server.version.trim() : ''
  const legacy = typeof server.nodeVersion === 'string' ? server.nodeVersion.trim() : ''
  if (runtime) {
    const label = { rust: 'Rust', node: 'Node.js', nodejs: 'Node.js', 'node.js': 'Node.js' }[runtime.toLowerCase()] || runtime
    return { label, version: version || (label === 'Node.js' ? legacy : '') }
  }
  return { label: legacy ? 'Node.js' : '未知', version: version || legacy }
}

/** Do not infer restart support from runtime or deployment names. */
export function restartInfo(server = {}) {
  if (server.restartSupported === true) return { supported: true, text: '' }
  const reason = typeof server.restartReason === 'string' ? server.restartReason : ''
  return {
    supported: false,
    text: reason || (server.restartSupported === false
      ? '当前服务不支持在线重启。请在主机或容器管理工具中重启。'
      : '服务器未报告在线重启能力。请在主机或容器管理工具中重启。')
  }
}

export function isUnsupportedRestart(error) {
  // A 409 can also mean maintenance is busy; it must not permanently disable restart.
  return error?.status === 501 || error?.data?.code === 'RESTART_UNSUPPORTED'
}

const CAPABILITY_LABELS = {
  imagePreview: '图片预览', videoPreview: '视频截图', restart: '在线重启',
  tls: 'TLS', logsStream: '实时日志', configWrite: '配置编辑'
}

/** Optional capability reports are descriptive only, never guessed from runtime. */
export function capabilityEntries(capabilities) {
  if (!capabilities || typeof capabilities !== 'object' || Array.isArray(capabilities)) return []
  return Object.entries(capabilities).flatMap(([key, value]) => {
    if (typeof value !== 'boolean') return []
    return [{ key, label: CAPABILITY_LABELS[key] || key, available: value }]
  })
}
