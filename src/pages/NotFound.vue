<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section>
    <h1>页面未找到</h1>
    <RouterLink to="/">返回首页</RouterLink>
  </section>
</template>

<style scoped>
h1 { font-size: 24px; margin: 12px 0; }
a { color: var(--vt-c-text-1); }
</style>


