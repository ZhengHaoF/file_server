import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLogs } from '../api/log.js'

export const useLogStore = defineStore('log', () => {
  const logs = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({
    level: '',
    keyword: '',
    limit: 100
  })

  const filteredLogs = computed(() => {
    return logs.value
  })

  async function fetchLogs() {
    loading.value = true
    error.value = null
    try {
      const params = {}
      if (filters.value.level) params.level = filters.value.level
      if (filters.value.keyword) params.keyword = filters.value.keyword
      if (filters.value.limit) params.limit = filters.value.limit
      
      const result = await getLogs(params)
      logs.value = result.logs || []
    } catch (e) {
      error.value = e.message || '获取日志失败'
    } finally {
      loading.value = false
    }
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
    fetchLogs()
  }

  function clearLogs() {
    logs.value = []
  }

  return {
    logs,
    loading,
    error,
    filters,
    filteredLogs,
    fetchLogs,
    setFilters,
    clearLogs
  }
})
