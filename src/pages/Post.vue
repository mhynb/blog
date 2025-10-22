<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import posts from '@/posts/index'
import { renderMarkdown } from '@/utils/markdown'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const meta = computed(() => posts.find(p => p.slug === slug.value))
const html = computed(() => meta.value ? renderMarkdown(meta.value.content) : '<p>未找到文章。</p>')
</script>

<template>
  <article v-if="meta">
    <h1>{{ meta?.title }}</h1>
    <p class="date">{{ meta?.date }}</p>
    <div class="content" v-html="html"></div>
  </article>
  <p v-else>未找到文章。</p>
</template>

<style scoped>
h1 { font-size: 28px; margin: 6px 0 0; }
.date { color: #999; font-size: 13px; margin-bottom: 16px; }
.content :deep(img) { max-width: 100%; }
.content :deep(pre) { background: #111; color: #eee; padding: 12px; border-radius: 6px; overflow: auto; }
</style>


