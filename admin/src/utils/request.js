import axios from 'axios'

const request = axios.create({
  baseURL: '/api/admin',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers['X-Admin-Token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      if (status === 401) {
        // Token 无效，清除并跳转登录
        localStorage.removeItem('adminToken')
        window.location.href = '/admin'
      }
      return Promise.reject(data || error.message)
    }
    return Promise.reject(error.message)
  }
)

export default request
