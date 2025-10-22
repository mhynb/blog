<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import posts from '@/posts/index'
const list = computed(() => posts)
</script>

<template>
  <section>
    <h1>文章列表</h1>
    <ul class="posts">
      <li v-for="p in list" :key="p.slug">
        <RouterLink :to="`/post/${p.slug}`">{{ p.title }}</RouterLink>
        <span class="date">{{ p.date }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.posts { list-style: none; padding: 0; }
.posts li { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
.posts .date { color: #999; font-size: 13px; }
h1 { font-size: 24px; margin: 12px 0 16px; }
</style>


