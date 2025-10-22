<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isVisible = ref(false)
const errorCode = ref('404')

onMounted(() => {
  // 数字动画效果
  const digits = errorCode.value.split('')
  let currentIndex = 0
  
  const animateDigit = () => {
    if (currentIndex < digits.length) {
      const digit = parseInt(digits[currentIndex])
      let count = 0
      
      const updateCount = () => {
        if (count <= digit) {
          digits[currentIndex] = count.toString()
          errorCode.value = digits.join('')
          count++
          setTimeout(updateCount, 150)
        } else {
          currentIndex++
          animateDigit()
        }
      }
      
      updateCount()
    } else {
      // 数字动画完成后显示页面
      setTimeout(() => {
        isVisible.value = true
      }, 300)
    }
  }
  
  animateDigit()
})
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content" :class="{ 'visible': isVisible }">
      <!-- 错误代码 -->
      <div class="error-code" :class="{ 'animate': isVisible }">
        {{ errorCode }}
      </div>
      
      <!-- 错误消息 -->
      <h2 class="error-title">页面未找到</h2>
      <p class="error-message">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      
      <!-- 可能的原因 -->
      <div class="possible-causes">
        <div class="cause-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>链接可能已过期或被错误输入</span>
        </div>
        <div class="cause-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>该页面可能已被管理员移除</span>
        </div>
      </div>
      
      <!-- 导航按钮 -->
      <div class="action-buttons">
        <RouterLink to="/" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回首页
        </RouterLink>
        <RouterLink to="/posts" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          浏览文章
        </RouterLink>
      </div>
      
      <!-- 装饰元素 -->
      <div class="decorative-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  position: relative;
  overflow: hidden;
}

.not-found-content {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 40px;
  border-radius: 24px;
  background-color: var(--color-background);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  max-width: 480px;
  width: 90%;
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  opacity: 0;
  transform: scale(0.8) translateY(50px);
}

.not-found-content.visible {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* 错误代码 */
.error-code {
  font-size: 120px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, hsla(160, 100%, 37%, 1), #2196f3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -5px;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.6s ease;
}

.error-code.animate {
  opacity: 1;
  transform: scale(1);
}

/* 错误标题 */
.error-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.2s;
}

.not-found-content.visible .error-title {
  opacity: 1;
  transform: translateY(0);
}

/* 错误消息 */
.error-message {
  font-size: 16px;
  color: var(--color-text-light-2);
  line-height: 1.6;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.3s;
}

.not-found-content.visible .error-message {
  opacity: 1;
  transform: translateY(0);
}

/* 可能的原因 */
.possible-causes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.4s;
}

.not-found-content.visible .possible-causes {
  opacity: 1;
  transform: translateY(0);
}

.cause-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--color-background-soft);
  border-radius: 12px;
  font-size: 14px;
  color: var(--color-text-light);
}

.cause-item svg {
  color: hsla(160, 100%, 37%, 1);
  flex-shrink: 0;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.5s;
}

.not-found-content.visible .action-buttons {
  opacity: 1;
  transform: translateY(0);
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  border: none;
  outline: none;
  min-width: 140px;
  justify-content: center;
}

.btn-primary {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}

.btn-primary:hover {
  background-color: hsla(160, 90%, 30%, 1);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 200, 135, 0.3);
  color: white;
}

.btn-secondary {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-background-mute);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 装饰元素 */
.decorative-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background-color: hsla(160, 100%, 37%, 1);
  top: -50px;
  left: -50px;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background-color: #2196f3;
  bottom: -50px;
  right: -50px;
  animation: float 10s ease-in-out infinite reverse;
}

.shape-3 {
  width: 100px;
  height: 100px;
  background-color: #ff5722;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 12s ease-in-out infinite 2s;
}

/* 动画 */
@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, 20px) rotate(5deg);
  }
  50% {
    transform: translate(0, 40px) rotate(0deg);
  }
  75% {
    transform: translate(-20px, 20px) rotate(-5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-container {
    min-height: 90vh;
  }
  
  .not-found-content {
    padding: 32px 24px;
    margin: 20px;
  }
  
  .error-code {
    font-size: 80px;
    letter-spacing: -3px;
    margin-bottom: 20px;
  }
  
  .error-title {
    font-size: 28px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 16px;
  }
  
  .btn {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: 24px 16px;
  }
  
  .error-code {
    font-size: 60px;
    letter-spacing: -2px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-message {
    font-size: 14px;
  }
  
  .possible-causes {
    margin-bottom: 24px;
  }
}
</style>


