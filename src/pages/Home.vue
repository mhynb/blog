<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isVisible = ref(false)

onMounted(() => {
  // 给页面元素添加进入动画
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="opacity-0 translate-y-4 transition-all duration-700 ease-out" :class="{ 'opacity-100 translate-y-0': isVisible }">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 p-8 md:p-12 mb-16 text-center shadow-sm">
      <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Hello, I'm
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">BL_Coder</span>
        </h1>
        <p class="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium mb-6">coding never die</p>
        
        <div class="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
          <p class="mb-2">This is my personal blog where I document my technical growth, reflections on life, and thoughts on programming.</p>
          <p>I hope to explore the limitless possibilities of technology with you.</p>
        </div>
        
        <div class="flex justify-center">
          <RouterLink to="/posts" class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group">
            Browse Articles
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="group p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
        <div class="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold mb-2 group-hover:text-emerald-500 transition-colors">技术文章</h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">分享前端开发、后端开发、Java、Vue、SpringBoot等技术内容</p>
      </div>
      
      <div class="group p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
        <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">生活记录</h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">记录日常思考、学习心得和生活点滴</p>
      </div>
      
      <div class="group p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
        <div class="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold mb-2 group-hover:text-purple-500 transition-colors">开源项目</h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">展示我的开源作品，欢迎一起交流合作</p>
      </div>
    </div>
  </section>
</template>
