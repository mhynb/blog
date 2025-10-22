<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <nav class="nav">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/posts">文章</RouterLink>
      <RouterLink to="/about">关于</RouterLink>
      <a class="gh" href="https://github.com/mhynb/blog" target="_blank" rel="noopener">GitHub</a>
    </nav>
    <main class="main">
      <RouterView />
    </main>
    <footer class="footer">© {{ new Date().getFullYear() }} mhynb</footer>
  </div>
  
</template>

<style scoped>
.layout {
  max-width: 880px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}
.nav {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px 0 24px;
}
.nav :deep(a) {
  text-decoration: none;
  color: var(--vt-c-text-1);
}
.nav :deep(a.router-link-active) {
  font-weight: 600;
}
.main {
  min-height: 60vh;
}
.footer {
  margin-top: 32px;
  color: #888;
  font-size: 14px;
  text-align: center;
}
</style>
