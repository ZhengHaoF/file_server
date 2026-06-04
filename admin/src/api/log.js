import request from '../utils/request.js'

// 获取日志列表
export function getLogs(params = {}) {
  return request.get('/logs', { params })
}

// 下载日志
export function downloadLogs() {
  return request.get('/logs/download', { responseType: 'blob' })
}
