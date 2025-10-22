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
  <section class="home-section" :class="{ 'visible': isVisible }">
    <div class="hero">
      <h1 class="hero-title">
        Hello, I'm
        <span class="hero-title">BL_Coder</span>
      </h1>
      <p class="hero-subtitle">coding never die</p>
      <div class="hero-description">
        <p>This is my personal blog where I document my technical growth, reflections on life, and thoughts on programming.</p>
        <p>I hope to explore the limitless possibilities of technology with you.</p>
      </div>
      <div class="hero-cta">
        <RouterLink to="/posts" class="btn btn-primary">
          Browse Articles
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </RouterLink>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-item">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <h3>技术文章</h3>
        <p>分享前端开发、后端开发、Java、Vuet、SpringBoot等技术内容</p>
      </div>
      
      <div class="feature-item">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <h3>生活记录</h3>
        <p>记录日常思考、学习心得和生活点滴</p>
      </div>
      
      <div class="feature-item">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h3>开源项目</h3>
        <p>展示我的开源作品，欢迎一起交流合作</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.home-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hero区域样式 */
.hero {
  text-align: center;
  padding: 60px 20px;
  margin-bottom: 60px;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-soft) 100%);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(45deg, hsl(159.55,55.46%,53.33%), hsl(216.52,73.4%,63.14%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.hero-highlight {
  color: hsla(160, 100%, 37%, 1);
  -webkit-text-fill-color: hsla(160, 100%, 37%, 1);
}

.hero-subtitle {
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: 24px;
  font-weight: 500;
}

.hero-description {
  max-width: 600px;
  margin: 0 auto 32px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text-light-2);
}

.hero-description p {
  margin-bottom: 12px;
}

.hero-description p:last-child {
  margin-bottom: 0;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}

.btn-primary:hover {
  background-color: hsla(160, 90%, 30%, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 200, 135, 0.3);
  color: white;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
  transform: translateX(3px);
}

/* 特性区域 */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 40px;
}

.feature-item {
  padding: 32px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border-color: hsla(160, 100%, 37%, 0.3);
}

.feature-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: hsla(160, 100%, 37%, 0);
  transition: background-color 0.3s ease;
}

.feature-item:hover::before {
  background-color: hsla(160, 100%, 37%, 1);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  background-color: var(--color-background-soft);
  border-radius: 50%;
  color: hsla(160, 100%, 37%, 1);
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon {
  background-color: hsla(160, 100%, 37%, 0.1);
  transform: scale(1.1);
}

.feature-item h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-heading);
}

.feature-item p {
  font-size: 14px;
  color: var(--color-text-light-2);
  line-height: 1.6;
}

/* 动画延迟效果 */
.hero {
  transition-delay: 0.1s;
}

.feature-item:nth-child(1) {
  transition-delay: 0.2s;
}

.feature-item:nth-child(2) {
  transition-delay: 0.3s;
}

.feature-item:nth-child(3) {
  transition-delay: 0.4s;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero {
    padding: 40px 16px;
    margin-bottom: 40px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .features {
    gap: 20px;
  }
  
  .feature-item {
    padding: 24px;
  }
}
</style>


