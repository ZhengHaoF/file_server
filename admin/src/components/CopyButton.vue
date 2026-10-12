<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Copy, Check, X } from 'lucide-vue-next'
import { copyText } from '../lib/clipboard.js'

const props = defineProps({ value: { type: String, default: '' }, label: { type: String, default: '复制' } })
const state = ref('idle') // idle | ok | fail
let timer = null
async function onCopy() {
  clearTimeout(timer)
  state.value = (await copyText(props.value)) ? 'ok' : 'fail'
  timer = setTimeout(() => { state.value = 'idle' }, 2200)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button type="button" class="btn btn-ghost btn-sm copy" :class="state" :aria-label="`${label}`" data-testid="button-copy" @click="onCopy">
    <Check v-if="state === 'ok'" aria-hidden="true" />
    <X v-else-if="state === 'fail'" aria-hidden="true" />
    <Copy v-else aria-hidden="true" />
    <span aria-live="polite">{{ state === 'ok' ? '已复制' : state === 'fail' ? '复制失败' : '复制' }}</span>
  </button>
</template>

<style scoped>
.copy.ok { color: var(--color-success); }
.copy.fail { color: var(--color-error); }
</style>
