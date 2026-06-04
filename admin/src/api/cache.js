import request from '../utils/request.js'

// 获取缓存统计
export function getCacheStats() {
  return request.get('/cache/stats')
}

// 清理缓存
export function cleanCache(options = {}) {
  if (options.all) {
    return request.post('/cache/clean', { all: true })
  }
  return request.post('/cache/clean', { days: options.days || 30 })
}
