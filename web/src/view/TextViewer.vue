<template>
  <div class="text-viewer">
    <van-nav-bar
      left-arrow
      :title="fileName || '文本查看'"
      @click-left="goBack"
    />
    <div class="text-content" v-if="!loading && !errorMsg">
      <pre class="text-pre"><code>{{ content }}</code></pre>
    </div>
    <div class="loading-state" v-else-if="loading">
      <van-loading type="spinner" color="#1989fa" size="36" />
      <span class="loading-text">加载中...</span>
    </div>
    <div class="error-state" v-else>
      <van-empty :description="errorMsg" image="error">
        <van-button type="primary" size="small" @click="fetchContent">重新加载</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const content = ref('')
const loading = ref(false)
const errorMsg = ref('')
const fileName = ref('')

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const fetchContent = async () => {
  const url = route.query.url
  if (!url) {
    errorMsg.value = '未提供文件地址'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    const response = await axios.get(url, { responseType: 'text' })
    content.value = response.data
  } catch (err) {
    console.error('加载文本文件失败:', err)
    if (err.response) {
      if (err.response.status === 404) {
        errorMsg.value = '文件不存在'
      } else if (err.response.status === 403) {
        errorMsg.value = '无权访问该文件'
      } else {
        errorMsg.value = `加载失败 (${err.response.status})`
      }
    } else if (err.code === 'ECONNABORTED') {
      errorMsg.value = '加载超时，请重试'
    } else {
      errorMsg.value = '网络错误，请检查连接后重试'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fileName.value = route.query.fileName || ''
  fetchContent()
})
</script>

<style scoped>
.text-viewer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
}

.text-content {
  flex: 1;
  overflow: auto;
  padding: 12px;
  background-color: #fff;
}

.text-pre {
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #323233;
  user-select: text;
  -webkit-user-select: text;
}

.text-pre code {
  font-family: inherit;
}

.loading-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.loading-text {
  font-size: 14px;
  color: #969799;
}

.error-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
