<script setup>
defineProps({ icon: { type: [Object, Function], default: null }, title: String, text: String })
</script>

<template>
  <div class="empty" data-testid="empty-state">
    <component :is="icon" v-if="icon" class="empty-icon" aria-hidden="true" />
    <p class="empty-title">{{ title }}</p>
    <p v-if="text" class="empty-text">{{ text }}</p>
    <div v-if="$slots.default" class="empty-actions"><slot /></div>
  </div>
</template>

<style scoped>
.empty { display: grid; justify-items: center; text-align: center; gap: var(--space-2); padding: var(--space-10) var(--space-6); color: var(--color-text-muted); }
.empty-icon { width: 28px; height: 28px; color: var(--color-text-faint); margin-bottom: var(--space-1); }
.empty-title { color: var(--color-text); font-weight: 600; }
.empty-text { max-width: 44ch; font-size: var(--text-sm); }
.empty-actions { margin-top: var(--space-2); display: flex; gap: var(--space-2); }
</style>
