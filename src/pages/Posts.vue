<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import posts from '@/posts/index'
import { extractExcerpt } from '@/utils/markdown'

const isVisible = ref(false)
const searchQuery = ref('')
const selectedTag = ref('')

// 获取所有唯一标签
const allTags = Array.from(
  new Set(posts.flatMap(post => post.tags || []))
).sort()

// 过滤文章
const filteredPosts = () => {
  return posts.filter(post => {
    // 搜索过滤
    const matchesSearch = !searchQuery.value ||
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase())

    // 标签过滤
    const matchesTag = !selectedTag.value ||
      (post.tags && post.tags.includes(selectedTag.value))

    return matchesSearch && matchesTag
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 清除过滤
const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = ''
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  // 页面加载动画
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="opacity-0 translate-y-4 transition-all duration-700 ease-out"
    :class="{ 'opacity-100 translate-y-0': isVisible }">
    <div class="mb-12 text-center">
      <h1 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">文章列表</h1>
      <p class="text-neutral-500 dark:text-neutral-400 text-lg">记录我的技术思考和生活点滴</p>
    </div>

    <!-- Filter Section -->
    <div class="mb-12 space-y-6">
      <!-- Search -->
      <div class="relative max-w-xl mx-auto">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input v-model="searchQuery" type="text" placeholder="搜索文章..."
          class="w-full pl-12 pr-10 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
          aria-label="搜索文章" />
        <button v-if="searchQuery" @click="searchQuery = ''"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          aria-label="清除搜索">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Tags -->
      <div v-if="allTags.length > 0" class="flex flex-wrap justify-center gap-2">
        <button v-for="tag in allTags" :key="tag" @click="selectedTag = selectedTag === tag ? '' : tag"
          class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border" :class="[
            selectedTag === tag
              ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
              : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400'
          ]">
          #{{ tag }}
        </button>
      </div>
    </div>

    <!-- Post List -->
    <div class="space-y-8" v-if="filteredPosts().length > 0">
      <article v-for="(post, index) in filteredPosts()" :key="post.slug"
        class="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
        :style="{ transitionDelay: `${index * 50}ms` }">
        <div class="flex-shrink-0 md:w-48 flex flex-col justify-center">
          <time class="text-sm font-bold text-neutral-400 dark:text-neutral-500 mb-2 font-mono tracking-wider">{{
            formatDate(post.date) }}</time>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in post.tags" :key="tag"
              class="text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
              #{{ tag }}
            </span>
          </div>
        </div>

        <div class="flex-grow">
          <h2 class="text-2xl font-bold mb-3 group-hover:text-emerald-500 transition-colors">
            <RouterLink :to="'/posts/' + post.slug" class="before:absolute before:inset-0 focus:outline-none">
              {{ post.title }}
            </RouterLink>
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-3">
            {{ post.excerpt || extractExcerpt(post.content) }}
          </p>
          <RouterLink
            :to="'/posts/' + post.slug"
            class="flex items-center text-emerald-500 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300 relative z-10"
          >
            Read more
            <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <div
        class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mb-4">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-2">未找到相关文章</h3>
      <p class="text-neutral-500 dark:text-neutral-400 mb-6">尝试搜索其他关键词或清除筛选条件</p>
      <button @click="clearFilters"
        class="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium hover:opacity-90 transition-opacity">
        清除筛选
      </button>
    </div>
  </section>
</template>
