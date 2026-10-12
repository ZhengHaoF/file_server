<script setup>
import { computed } from 'vue'

// Server-reported: running | disabled | stopped | error. Client-only: offline | unknown.
const props = defineProps({ status: { type: String, default: 'unknown' } })
const MAP = {
  running: ['ok', '运行中'],
  disabled: ['', '未启用'],
  stopped: ['warn', '已停止'],
  error: ['err', '错误'],
  offline: ['err', '连接失败'],
  unknown: ['', '状态未知']
}
const view = computed(() => MAP[props.status] || ['', `未知（${props.status}）`])
</script>

<template>
  <span class="badge" :class="view[0]" :data-status="status" data-testid="server-status">
    <span class="dot" :class="{ pulse: status === 'running' }" aria-hidden="true" />{{ view[1] }}
  </span>
</template>
