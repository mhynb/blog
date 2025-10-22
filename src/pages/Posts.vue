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
  <section class="posts-section" :class="{ 'visible': isVisible }">
    <div class="section-header">
      <h1 class="section-title">文章列表</h1>
      <p class="section-subtitle">记录我的技术思考和生活点滴</p>
    </div>
    
    <!-- 过滤和搜索区域 -->
    <div class="filter-section">
      <!-- 搜索框 -->
      <div class="search-container">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索文章..."
          class="search-input"
          aria-label="搜索文章"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="clear-search"
          aria-label="清除搜索"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <!-- 标签过滤 -->
      <div v-if="allTags.length > 0" class="tags-container">
        <div class="tags-label">标签：</div>
        <div class="tags-list">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="selectedTag = selectedTag === tag ? '' : tag"
            class="tag-item"
            :class="{ 'active': selectedTag === tag }"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      
      <!-- 过滤状态 -->
      <div v-if="searchQuery || selectedTag" class="filter-status">
        <span class="status-text">
          {{ searchQuery && selectedTag ? '搜索并筛选标签' : 
             searchQuery ? '搜索中' : '筛选标签' }}
        </span>
        <button @click="clearFilters" class="clear-filters">
          清除
        </button>
      </div>
    </div>
    
    <div class="posts-container">
      <div 
        v-for="(post, index) in filteredPosts()" 
        :key="post.slug"
        class="post-card"
        :style="{ transitionDelay: `${index * 0.1}s` }"
      >
        <RouterLink 
          :to="`/posts/${post.slug}`" 
          class="post-link"
          custom
          v-slot="{ navigate }"
        >
          <div 
            class="post-content"
            @click="navigate"
          >
            <div class="post-meta">
              <span class="post-date">{{ formatDate(post.date) }}</span>
            </div>
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-excerpt">{{ post.excerpt || extractExcerpt(post.content) }}</p>
            
            <!-- 文章标签 -->
            <div v-if="post.tags && post.tags.length > 0" class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="post-tag">
                {{ tag }}
              </span>
            </div>
            
            <div class="post-read-more">
              <span>阅读更多</span>
              <svg class="post-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    
    <!-- 如果没有文章显示 -->
    <div v-if="filteredPosts().length === 0" class="no-posts">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="no-posts-icon">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
      <h3>未找到文章</h3>
      <p v-if="searchQuery || selectedTag">
        没有找到符合条件的文章，请尝试更改搜索条件。
      </p>
      <p v-else>文章正在赶来的路上...</p>
      <button v-if="searchQuery || selectedTag" @click="clearFilters" class="clear-filters-btn">
        清除筛选条件
      </button>
    </div>
  </section>
</template>

<style scoped>
.posts-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.posts-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  margin-bottom: 0;
}

/* 过滤和搜索区域样式 */
.filter-section {
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease-out 0.3s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 搜索框样式 */
.search-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.875rem 2.5rem 0.875rem 3rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background-secondary);
  color: var(--color-text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.clear-search {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clear-search:hover {
  background-color: var(--color-background-tertiary);
  color: var(--color-text-secondary);
}

/* 标签过滤样式 */
.tags-container {
  margin-bottom: 1rem;
}

.tags-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
  padding: 0.375rem 0.75rem;
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tag-item:hover {
  background-color: var(--color-background-tertiary);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-1px);
}

.tag-item.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* 过滤状态样式 */
.filter-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: var(--color-background-tertiary);
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.status-text {
  color: var(--color-text-secondary);
}

.clear-filters {
  background-color: transparent;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.clear-filters:hover {
  background-color: var(--color-background-secondary);
  opacity: 0.8;
}

/* 文章列表样式 */
.posts-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.post-card {
  background-color: var(--color-background-secondary);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.posts-section.visible .post-card {
  opacity: 1;
  transform: translateY(0);
}

.post-link {
  display: block;
  text-decoration: none;
}

.post-content {
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.post-content:hover .post-title {
  color: var(--color-primary);
}

.post-meta {
  margin-bottom: 1rem;
}

.post-date {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  transition: color 0.3s ease;
  line-height: 1.3;
}

.post-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* 文章标签样式 */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.post-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-background-tertiary);
  border-radius: 1rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.post-content:hover .post-tag {
  background-color: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
}

.post-read-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.post-content:hover .post-read-more {
  opacity: 0.8;
}

.post-arrow {
  transition: transform 0.2s ease;
}

.post-content:hover .post-arrow {
  transform: translateX(3px);
}

/* 无文章状态样式 */
.no-posts {
  text-align: center;
  padding: 4rem 1.5rem;
  animation: fadeIn 0.5s ease-out 0.3s forwards;
  opacity: 0;
}

.no-posts-icon {
  margin-bottom: 1.5rem;
  color: var(--color-text-tertiary);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.no-posts h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.no-posts p {
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.clear-filters-btn {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .posts-section {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .post-title {
    font-size: 1.25rem;
  }
  
  .filter-status {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .clear-filters {
    text-align: center;
    padding: 0.5rem;
  }
}
</style>


