import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getStatus, getDatabaseStatus } from '../api/status.js'

export const useStatusStore = defineStore('status', () => {
  const status = ref(null)
  const databaseStatus = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const cpuUsage = computed(() => status.value?.cpu?.usage || 0)
  const memoryUsage = computed(() => status.value?.memory?.usage || 0)
  const diskUsage = computed(() => status.value?.disk?.usage || 0)
  const uptime = computed(() => status.value?.server?.uptime || 0)

  const uptimeFormatted = computed(() => {
    const seconds = uptime.value
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) {
      return `${days}天 ${hours}小时`
    }
    if (hours > 0) {
      return `${hours}小时 ${minutes}分钟`
    }
    return `${minutes}分钟`
  })

  async function fetchStatus() {
    loading.value = true
    error.value = null
    try {
      status.value = await getStatus()
    } catch (e) {
      error.value = e.message || '获取状态失败'
      // 请求失败时清空状态，确保显示为停止状态
      status.value = null
    } finally {
      loading.value = false
    }
  }

  async function fetchDatabaseStatus() {
    try {
      databaseStatus.value = await getDatabaseStatus()
    } catch (e) {
      console.error('获取数据库状态失败:', e)
    }
  }

  return {
    status,
    databaseStatus,
    loading,
    error,
    cpuUsage,
    memoryUsage,
    diskUsage,
    uptime,
    uptimeFormatted,
    fetchStatus,
    fetchDatabaseStatus
  }
})
