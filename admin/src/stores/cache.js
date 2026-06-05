import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCacheStats, cleanCache } from '../api/cache.js'

export const useCacheStore = defineStore('cache', () => {
  const stats = ref(null)
  const loading = ref(false)
  const cleaning = ref(false)
  const error = ref(null)

  const totalFiles = computed(() => stats.value?.totalFiles || 0)
  const totalSize = computed(() => stats.value?.totalSize || 0)
  const imageCache = computed(() => stats.value?.imageCache || { count: 0, size: 0 })
  const dbSize = computed(() => stats.value?.dbSize || 0)

  const totalSizeFormatted = computed(() => formatBytes(totalSize.value))
  const imageSizeFormatted = computed(() => formatBytes(imageCache.value.size))
  const dbSizeFormatted = computed(() => formatBytes(dbSize.value))

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  async function fetchStats() {
    loading.value = true
    error.value = null
    try {
      stats.value = await getCacheStats()
    } catch (e) {
      error.value = e.message || '获取缓存统计失败'
    } finally {
      loading.value = false
    }
  }

  async function clean(days = null) {
    cleaning.value = true
    error.value = null
    try {
      const result = await cleanCache({ days, all: !days })
      await fetchStats()
      return result
    } catch (e) {
      error.value = e.message || '清理缓存失败'
      throw e
    } finally {
      cleaning.value = false
    }
  }

  return {
    stats,
    loading,
    cleaning,
    error,
    totalFiles,
    totalSize,
    imageCache,
    dbSize,
    totalSizeFormatted,
    imageSizeFormatted,
    dbSizeFormatted,
    formatBytes,
    fetchStats,
    clean
  }
})
