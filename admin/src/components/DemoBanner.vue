<script setup>
import { FlaskConical } from 'lucide-vue-next'
import { PREVIEW } from '../lib/env.js'
</script>

<template>
  <div v-if="PREVIEW" class="demo" role="note" data-testid="demo-banner">
    <FlaskConical aria-hidden="true" />
    <strong>演示模式</strong>
    <span>所有数据均为浏览器内隔离的示例数据，不连接真实服务器，操作不会产生任何实际影响。</span>
  </div>
</template>

<style scoped>
.demo { display: flex; align-items: center; gap: var(--space-2); padding: 6px var(--space-4); background: repeating-linear-gradient(135deg, #f2c94c 0 12px, #e8b830 12px 24px); color: #2b2100; font-size: var(--text-xs); line-height: 1.4; flex-wrap: wrap; }
.demo svg { width: 14px; height: 14px; flex: none; }
.demo strong { font-weight: 700; letter-spacing: 0.02em; }
</style>
