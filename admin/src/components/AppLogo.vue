<script setup>
defineProps({ size: { type: Number, default: 28 } })
</script>

<template>
  <!-- Mark: a NAS chassis — three drive bays, the top one with an activity light. -->
  <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" role="img" aria-label="File Serve 标志" class="app-logo">
    <rect x="3" y="3" width="26" height="26" rx="6" stroke="currentColor" stroke-width="2" />
    <path d="M9 11h9M9 16h14M9 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <circle cx="22.5" cy="11" r="2" fill="var(--color-primary)" />
  </svg>
</template>
