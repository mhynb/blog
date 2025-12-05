<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { downloadRSS } from '@/utils/rss'

const route = useRoute()
const isLoading = ref(true)
const { theme, toggleTheme } = useTheme()

// 页面加载动画控制
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

// 获取主题图标
const getThemeIcon = () => {
  switch (theme.value) {
    case 'light':
      return 'sun'
    case 'dark':
      return 'moon'
    case 'auto':
      return 'auto'
    default:
      return 'auto'
  }
}
</script>

<template>
  <div class="layout" :class="{ 'loaded': !isLoading }">
    <!-- 页面加载动画 -->
    <div class="loader" v-if="isLoading">
      <div class="loader-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
    <!-- 导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <RouterLink to="/" class="logo-link">
            <span class="logo-text">Blog</span>
          </RouterLink>
        </div>
        <nav class="nav">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path" 
            class="nav-link"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <a 
              :href="href" 
              @click="navigate"
              :class="['nav-item', { active: isActive }]"
            >
              {{ item.label }}
              <span class="nav-item-underline" v-if="isActive"></span>
            </a>
          </RouterLink>
          <a 
            href="https://github.com/mhynb" 
            target="_blank" 
            rel="noopener"
            class="gh"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
          <button 
            @click="downloadRSS" 
            class="rss-button"
            aria-label="订阅 RSS"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg>
          </button>
          <button 
            @click="toggleTheme" 
            class="theme-toggle"
            :aria-label="'切换主题: ' + theme"
          >
            <!-- 太阳图标 (亮色模式) -->
            <svg v-if="getThemeIcon() === 'sun'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- 月亮图标 (暗色模式) -->
            <svg v-else-if="getThemeIcon() === 'moon'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <!-- 自动图标 -->
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </nav>
      </div>
    </header>
    
    <!-- 主要内容区域 -->
    <main class="main">
      <RouterView v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>© {{ new Date().getFullYear() }} mhynb</p>
        <p class="footer-subtitle">热爱技术，分享生活</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      navItems: [
        { path: '/', label: '首页' },
        { path: '/posts', label: '文章' },
        { path: '/about', label: '关于' }
      ]
    }
  }
}
</script>

<style scoped>
/* 页面加载动画 */
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  z-index: 9999;
  transition: opacity 0.5s ease;
}

.loader-dots {
  display: flex;
  gap: 8px;
}

.loader-dots span {
  width: 12px;
  height: 12px;
  background-color: hsla(160, 100%, 37%, 1);
  border-radius: 50%;
  animation: loader-bounce 1.4s infinite ease-in-out both;
}

.loader-dots span:nth-child(1) { animation-delay: -0.32s; }
.loader-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes loader-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 页面加载完成后隐藏loader */
.loaded .loader {
  opacity: 0;
  pointer-events: none;
}

/* 布局样式 */
.layout {
  max-width: 880px;
  margin: 0 auto;
  padding: 0 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.header {
  padding: 32px 0 24px;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo样式 */
.logo-link {
  display: inline-block;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
  letter-spacing: -1px;
}

/* 导航栏样式 */
.nav {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-item {
  position: relative;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: hsla(160, 100%, 37%, 1);
}

.nav-item-active {
  color: hsla(160, 100%, 37%, 1);
}

.nav-item-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: hsla(160, 100%, 37%, 1);
  transform: scaleX(1);
  animation: underlineAppear 0.3s ease;
}

@keyframes underlineAppear {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* GitHub图标样式 */
.gh,
.rss-button,
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  color: var(--color-text);
}

.gh:hover,
.rss-button:hover,
.theme-toggle:hover {
  background-color: var(--color-background-mute);
  transform: translateY(-2px);
}

.rss-button:hover {
  color: var(--color-warning);
}

/* 主要内容区域 */
.main {
  flex: 1;
  padding: 40px 0;
}

/* 页脚样式 */
.footer {
  padding: 24px 0;
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.footer-content {
  text-align: center;
}

.footer-subtitle {
  font-size: 12px;
  color: var(--color-text-light-2);
  margin-top: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    padding: 24px 0 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .nav {
    gap: 16px;
  }
  
  .main {
    padding: 24px 0;
  }
}
</style>
