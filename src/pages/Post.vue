<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { renderMarkdown } from '@/utils/markdown'
import { useReadingProgress } from '@/composables/useReadingProgress'
import { useToc } from '@/composables/useToc'
import { useMeta } from '@/composables/useMeta'
import posts from '@/posts/index'

const route = useRoute()
const router = useRouter()
const isVisible = ref(false)
const isLoading = ref(true)
const slug = String(route.params.slug)
const post = ref(posts.find(p => p.slug === slug))
const animationKey = ref(0)
const { progress } = useReadingProgress()
const contentRef = ref<HTMLElement | null>(null)
const { tocItems, activeId, scrollToHeading } = useToc(contentRef)
const showToc = ref(false)

// SEO Optimization
const metaInfo = computed(() => {
  if (!post.value) return {}
  
  return {
    title: `${post.value.title} - My Personal Blog`,
    description: post.value.excerpt || 'An interesting technical article',
    keywords: post.value.tags?.join(', ') || 'blog,tech',
    author: 'BL_Coder',
    ogTitle: post.value.title,
    ogDescription: post.value.excerpt || 'An interesting technical article',
    ogUrl: window.location.href,
    twitterCard: 'summary_large_image'
  }
})

if (post.value) {
  useMeta(metaInfo.value)
}

// Page Load Animation
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
    nextTick(() => {
      isVisible.value = true
      if (post.value) {
        document.title = `${post.value.title} - My Personal Blog`
      }
    })
  }, 300)
})

onUnmounted(() => {
  isVisible.value = false
})

const goBack = () => {
  router.push('/posts')
}

const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: post.value?.title,
      text: post.value?.excerpt || `Check out this article: ${post.value?.title}`,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('Link copied to clipboard!')
      })
      .catch(err => {
        console.error('Copy failed:', err)
        alert('Copy failed, please copy manually')
      })
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const triggerReRender = () => {
  animationKey.value++
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-800 z-50">
      <div 
        class="h-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-100 ease-out"
        :style="{ width: progress + '%' }"
      ></div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-[60vh] flex flex-col items-center justify-center">
      <div class="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
      <p class="text-neutral-500 dark:text-neutral-400 animate-pulse">Loading article...</p>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!post" class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div class="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-6">
        <svg class="w-12 h-12 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Article Not Found</h2>
      <p class="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md">Sorry, the article you requested does not exist or has been removed.</p>
      <RouterLink 
        to="/posts" 
        class="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-emerald-500/20"
      >
        Back to Articles
      </RouterLink>
    </div>

    <!-- Post Content -->
    <article 
      v-else 
      class="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16 transition-opacity duration-700"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      :key="animationKey"
    >
      <!-- Header -->
      <header class="mb-12 text-center md:text-left">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <button 
            @click="goBack" 
            class="inline-flex items-center text-neutral-500 hover:text-emerald-500 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors group"
          >
            <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          
          <time class="text-neutral-400 font-mono text-sm tracking-wider uppercase">
            {{ formatDate(post.date) }}
          </time>
        </div>

        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            {{ post.title }}
          </span>
        </h1>

        <div class="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="px-3 py-1 text-sm font-medium rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/50"
          >
            #{{ tag }}
          </span>
        </div>

        <p v-if="post.excerpt" class="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed italic border-l-4 border-emerald-500 pl-4 md:pl-6 py-1">
          {{ post.excerpt }}
        </p>
      </header>

      <div class="flex gap-12 relative">
        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <div 
            ref="contentRef"
            class="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-emerald-500 prose-a:no-underline hover:prose-a:underline
            prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-700
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-emerald-500 prose-blockquote:bg-neutral-50 dark:prose-blockquote:bg-neutral-800/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
            v-html="renderMarkdown(post.content)"
          ></div>
        </div>

        <!-- TOC Sidebar (Desktop) -->
        <aside class="hidden xl:block w-64 shrink-0">
          <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar p-4 bg-white dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-sm backdrop-blur-sm">
            <h3 class="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              Table of Contents
            </h3>
            <nav>
              <ul class="space-y-1">
                <li 
                  v-for="item in tocItems" 
                  :key="item.id"
                  :class="`pl-${(item.level - 1) * 3}`"
                >
                  <a 
                    href="javascript:void(0)" 
                    @click="scrollToHeading(item.id)"
                    class="block py-1.5 text-sm transition-colors border-l-2 pl-3 hover:text-emerald-500 hover:border-emerald-500"
                    :class="activeId === item.id ? 'text-emerald-500 border-emerald-500 font-medium' : 'text-neutral-500 dark:text-neutral-400 border-transparent'"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>

      <!-- Footer -->
      <footer class="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="flex gap-4">
            <button 
              @click="sharePost"
              class="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share Article
            </button>
            <button 
              @click="triggerReRender"
              class="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              Refresh
            </button>
          </div>
          
          <div class="text-sm text-neutral-400">
            Published on {{ formatDate(post.date) }}
          </div>
        </div>
      </footer>
    </article>
    
    <!-- Mobile TOC Toggle (Floating Action Button) -->
    <div class="xl:hidden fixed bottom-6 right-6 z-40">
      <button 
        @click="showToc = !showToc"
        class="p-4 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-transform active:scale-95"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <!-- Mobile TOC Drawer -->
    <div 
      class="fixed inset-0 z-50 xl:hidden transition-opacity duration-300" 
      :class="showToc ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showToc = false"></div>
      <div 
        class="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-neutral-900 shadow-2xl transform transition-transform duration-300 p-6 overflow-y-auto"
        :class="showToc ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Table of Contents</h3>
          <button @click="showToc = false" class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav>
          <ul class="space-y-2">
            <li 
              v-for="item in tocItems" 
              :key="item.id"
              :class="`pl-${(item.level - 1) * 3}`"
            >
              <a 
                href="javascript:void(0)" 
                @click="scrollToHeading(item.id); showToc = false"
                class="block py-2 text-sm border-l-2 pl-3 transition-colors"
                :class="activeId === item.id ? 'text-emerald-500 border-emerald-500 font-medium' : 'text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style>
/* Custom Scrollbar for TOC */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}
</style>
