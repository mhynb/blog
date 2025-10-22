<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { renderMarkdown } from '@/utils/markdown'
import posts from '@/posts/index'

const route = useRoute()
const router = useRouter()
const isVisible = ref(false)
const isLoading = ref(true)
const slug = String(route.params.slug)
const post = ref(posts.find(p => p.slug === slug))
const animationKey = ref(0)

// 页面加载动画
onMounted(() => {
  // 模拟文章加载
  setTimeout(() => {
    isLoading.value = false
    setTimeout(() => {
      isVisible.value = true
      // 更新页面标题
      if (post.value) {
        document.title = `${post.value.title} - 我的个人博客`
      }
    }, 100)
  }, 300)
})

// 监听路由变化
onUnmounted(() => {
  isVisible.value = false
})

// 返回文章列表
const goBack = () => {
  router.push('/posts')
}

// 分享功能
const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: post.value?.title,
      text: post.value?.excerpt || `来看看这篇文章: ${post.value?.title}`,
      url: window.location.href
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('链接已复制到剪贴板！')
      })
      .catch(err => {
        console.error('复制失败:', err)
        alert('复制失败，请手动复制链接')
      })
  }
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

// 为重新渲染添加动画效果
const triggerReRender = () => {
  animationKey.value++
}
</script>

<template>
  <section class="post-section" :class="{ 'visible': isVisible }">
    <!-- 加载指示器 -->
    <div v-if="isLoading" class="loading-indicator">
      <div class="loading-spinner"></div>
      <p>文章加载中...</p>
    </div>
    
    <!-- 未找到文章 -->
    <div v-else-if="!post" class="not-found">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="not-found-icon">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h2>文章未找到</h2>
      <p>抱歉，您请求的文章不存在或已被删除。</p>
      <RouterLink to="/posts" class="btn btn-primary">返回文章列表</RouterLink>
    </div>
    
    <!-- 文章详情 -->
    <article v-else class="post-container" :key="animationKey">
      <!-- 文章头部 -->
      <header class="post-header">
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <button @click="goBack" class="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            返回
          </button>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
        
        <!-- 文章标签 -->
        <div v-if="post.tags && post.tags.length > 0" class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">
            {{ tag }}
          </span>
        </div>
        
        <!-- 文章摘要 -->
        <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
      </header>
      
      <!-- 文章内容 -->
      <div class="post-content">
        <div class="markdown-content" v-html="renderMarkdown(post.content)"></div>
      </div>
      
      <!-- 文章底部 -->
      <footer class="post-footer">
        <div class="footer-actions">
          <button @click="sharePost" class="share-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            分享文章
          </button>
          <button @click="triggerReRender" class="refresh-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            刷新
          </button>
        </div>
        <div class="footer-info">
          <p>发布于 {{ formatDate(post.date) }}</p>
          <RouterLink to="/posts" class="more-posts">查看更多文章</RouterLink>
        </div>
      </footer>
    </article>
  </section>
</template>

<style scoped>
.post-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.post-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 加载指示器样式 */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-indicator p {
  color: var(--color-text-secondary);
  font-size: 1.125rem;
}

/* 未找到文章样式 */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem;
  text-align: center;
  animation: fadeIn 0.5s ease-out 0.3s forwards;
  opacity: 0;
}

.not-found-icon {
  color: var(--color-text-tertiary);
  margin-bottom: 1.5rem;
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

.not-found h2 {
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.not-found p {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 400px;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.back-link:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

/* 文章容器样式 */
.post-container {
  background-color: var(--color-background-secondary);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out;
  transition: all 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 文章头部样式 */
.post-header {
  padding: 2.5rem 2rem;
  border-bottom: 1px solid var(--color-border);
  position: relative;
  background: linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background-tertiary) 100%);
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.post-date {
  color: var(--color-primary);
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-date::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: var(--color-primary);
  border-radius: 50%;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: var(--color-background-tertiary);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateX(-2px);
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.3;
  background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 文章标签样式 */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.post-tag {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background-color: rgba(var(--color-primary-rgb), 0.1);
  border-radius: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-primary);
  font-weight: 500;
  transition: all 0.2s ease;
}

.post-tag:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-1px);
}

/* 文章摘要样式 */
.post-excerpt {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 0;
  font-style: italic;
  padding-left: 1rem;
  border-left: 3px solid var(--color-primary);
}

/* 文章内容样式 */
.post-content {
  padding: 2.5rem 2rem;
  line-height: 1.8;
  transition: all 0.3s ease;
}

.markdown-content {
  animation: fadeIn 0.5s ease-out 0.3s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.markdown-content :deep(h1) { 
  font-size: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-top: 0;
}
.markdown-content :deep(h2) { 
  font-size: 1.75rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.375rem;
}
.markdown-content :deep(h3) { font-size: 1.5rem; }
.markdown-content :deep(h4) { font-size: 1.25rem; }
.markdown-content :deep(h5) { font-size: 1.125rem; }
.markdown-content :deep(h6) { font-size: 1rem; }

.markdown-content :deep(p) {
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
}

.markdown-content :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
  font-weight: 500;
}

.markdown-content :deep(a::after) {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.2s ease;
}

.markdown-content :deep(a:hover) {
  color: var(--color-primary-dark);
}

.markdown-content :deep(a:hover::after) {
  width: 100%;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  color: var(--color-text-primary);
}

.markdown-content :deep(li) {
  margin-bottom: 0.75rem;
}

.markdown-content :deep(li:last-child) {
  margin-bottom: 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background-color: var(--color-background-tertiary);
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.markdown-content :deep(blockquote:hover) {
  transform: translateX(4px);
}

.markdown-content :deep(code) {
  background-color: var(--color-background-tertiary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875em;
  color: var(--color-text-secondary);
}

.markdown-content :deep(pre) {
  background-color: var(--color-background-tertiary);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.markdown-content :deep(pre:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: var(--color-text-primary);
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.markdown-content :deep(img:hover) {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  overflow: hidden;
  border-radius: 0.5rem;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.markdown-content :deep(th) {
  background-color: var(--color-background-tertiary);
  font-weight: 600;
  color: var(--color-text-primary);
}

.markdown-content :deep(tr:hover) {
  background-color: var(--color-background-tertiary);
}

/* 文章底部样式 */
.post-footer {
  padding: 2rem;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background-tertiary);
  transition: all 0.3s ease;
}

.footer-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.share-button,
.refresh-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
  background-color: transparent;
  color: var(--color-text-secondary);
}

.share-button:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

.refresh-button:hover {
  background-color: var(--color-background-secondary);
  border-color: var(--color-text-secondary);
  color: var(--color-text-primary);
  transform: translateY(-2px);
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-info p {
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
  margin: 0;
}

.more-posts {
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  display: inline-block;
}

.more-posts:hover {
  color: var(--color-primary-dark);
  transform: translateX(2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-section {
    padding: 2rem 1rem;
  }
  
  .post-header,
  .post-content,
  .post-footer {
    padding: 1.5rem 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .footer-actions {
    flex-direction: column;
  }
  
  .share-button,
  .refresh-button {
    width: 100%;
    justify-content: center;
  }
  
  .markdown-content :deep(h1) { font-size: 1.75rem; }
  .markdown-content :deep(h2) { font-size: 1.5rem; }
  .markdown-content :deep(h3) { font-size: 1.25rem; }
}

/* 暗色模式优化 */
@media (prefers-color-scheme: dark) {
  .post-container {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
  
  .markdown-content :deep(img:hover) {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
}
</style>


