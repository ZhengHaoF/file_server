import request from '../utils/request.js'

// 获取配置信息
export function getConfig() {
  return request.get('/config')
}
