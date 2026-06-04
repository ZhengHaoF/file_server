import request from '../utils/request.js'

// 获取服务器状态
export function getStatus() {
  return request.get('/status')
}

// 获取数据库状态
export function getDatabaseStatus() {
  return request.get('/database/status')
}

// 重启服务
export function restartServer() {
  return request.post('/restart')
}
