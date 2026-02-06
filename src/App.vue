<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { downloadRSS } from '@/utils/rss'

const route = useRoute()
const isLoading = ref(true)
const { theme, toggleTheme } = useTheme()

const navItems = [
  { path: '/', label: '首页' },
  { path: '/posts', label: '文章' },
  { path: '/about', label: '关于' }
]

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
  <div class="min-h-screen flex flex-col bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
    <!-- Page Loader -->
    <div v-if="isLoading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-neutral-900 transition-opacity duration-500" :class="{ 'opacity-0 pointer-events-none': !isLoading }">
      <div class="flex gap-2">
        <span class="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.32s]"></span>
        <span class="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.16s]"></span>
        <span class="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></span>
      </div>
    </div>
    
    <!-- Navbar -->
    <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <RouterLink to="/" class="group flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg group-hover:rotate-12 transition-transform duration-300">
              B
            </div>
            <span class="font-bold text-xl tracking-tight group-hover:text-emerald-500 transition-colors">Blog</span>
          </RouterLink>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-8">
            <RouterLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path" 
              class="relative text-sm font-medium hover:text-emerald-500 transition-colors py-2"
              active-class="text-emerald-500"
            >
              {{ item.label }}
              <span v-if="route.path === item.path" class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
            </RouterLink>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <a 
              href="https://github.com/mhynb" 
              target="_blank" 
              rel="noopener"
              class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
              aria-label="GitHub"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <button 
              @click="downloadRSS" 
              class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400 hover:text-amber-500"
              aria-label="RSS"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 11a9 9 0 0 1 9 9"></path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>
                <circle cx="5" cy="19" r="1"></circle>
              </svg>
            </button>
            <button 
              @click="toggleTheme" 
              class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
              :aria-label="'Switch theme: ' + theme"
            >
              <svg v-if="getThemeIcon() === 'sun'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <svg v-else-if="getThemeIcon() === 'moon'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Nav (Simple version for now) -->
        <div class="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-center gap-6">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path" 
            class="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-500"
            active-class="text-emerald-500"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <!-- Footer -->
    <footer class="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <p class="font-medium text-neutral-900 dark:text-neutral-100">Blog</p>
            <p class="text-sm text-neutral-500 mt-1">热爱技术，分享生活</p>
          </div>
          <div class="text-sm text-neutral-500">
            &copy; {{ new Date().getFullYear() }} mhynb. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

