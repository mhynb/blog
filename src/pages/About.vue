<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

const skills = [
  { name: 'Vue.js', level: 90, icon: '🎨' },
  { name: 'TypeScript', level: 85, icon: '💻' },
  { name: 'Java', level: 88, icon: '☕' },
  { name: 'Spring Boot', level: 82, icon: '🍃' },
  { name: 'CSS/SCSS', level: 80, icon: '🎨' },
  { name: 'Node.js', level: 75, icon: '📦' }
]

const contact = [
  { icon: '📧', label: 'Email', value: 'your.email@example.com', link: 'mailto:your.email@example.com' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/mhynb', link: 'https://github.com/mhynb' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/yourname', link: 'https://linkedin.com' }
]

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="about-section" :class="{ 'visible': isVisible }">
    <!-- 个人介绍卡片 -->
    <div class="profile-card">
      <div class="profile-avatar">
        <div class="avatar-placeholder">
          <span class="avatar-emoji">👨‍💻</span>
        </div>
      </div>
      <h1 class="profile-name">BL_Coder</h1>
      <p class="profile-title">全栈开发工程师</p>
      <p class="profile-bio">
        热爱技术,喜欢分享与创造。专注于前端和后端开发,
        致力于打造优雅高效的用户体验。
      </p>
    </div>

    <!-- 关于我 -->
    <div class="content-card">
      <h2 class="section-title">
        <span class="title-icon">✨</span>
        关于我
      </h2>
      <div class="about-content">
        <p>你好!我是一名充满热情的开发者,拥有多年的软件开发经验。</p>
        <p>我喜欢学习新技术,解决复杂问题,并将想法转化为现实。这个博客是我分享技术见解、项目经验和生活感悟的地方。</p>
        <p>在业余时间,我喜欢参与开源项目,阅读技术文章,以及探索前沿技术趋势。</p>
      </div>
    </div>

    <!-- 技能 -->
    <div class="content-card">
      <h2 class="section-title">
        <span class="title-icon">🚀</span>
        技能专长
      </h2>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-header">
            <span class="skill-icon">{{ skill.icon }}</span>
            <span class="skill-name">{{ skill.name }}</span>
          </div>
          <div class="skill-bar">
            <div 
              class="skill-progress" 
              :style="{ width: skill.level + '%' }"
              :data-level="skill.level"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="content-card">
      <h2 class="section-title">
        <span class="title-icon">📬</span>
        联系我
      </h2>
      <div class="contact-grid">
        <a 
          v-for="item in contact" 
          :key="item.label"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-item"
        >
          <span class="contact-icon">{{ item.icon }}</span>
          <div class="contact-info">
            <div class="contact-label">{{ item.label }}</div>
            <div class="contact-value">{{ item.value }}</div>
          </div>
          <svg class="contact-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- 项目理念 -->
    <div class="content-card highlight-card">
      <h2 class="section-title">
        <span class="title-icon">💡</span>
        博客理念
      </h2>
      <div class="philosophy">
        <blockquote>
          "代码不息,学习不止。通过分享知识,我们不仅帮助他人成长,也在不断完善自己。"
        </blockquote>
        <p>这个博客的目标是创建一个技术交流和知识分享的平台,希望能够帮助更多的开发者成长。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.about-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 个人资料卡片 */
.profile-card {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, var(--color-background-mute) 100%);
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out;
}

.profile-avatar {
  margin-bottom: 1.5rem;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: linear-gradient(135deg, hsla(160, 100%, 37%, 0.2) 0%, hsla(216, 73%, 63%, 0.2) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid hsla(160, 100%, 37%, 0.3);
  transition: all 0.3s ease;
}

.avatar-placeholder:hover {
  transform: scale(1.05);
  border-color: hsla(160, 100%, 37%, 0.6);
}

.avatar-emoji {
  font-size: 3.5rem;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, hsl(159.55, 55.46%, 53.33%), hsl(216.52, 73.4%, 63.14%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-title {
  font-size: 1.125rem;
  color: hsla(160, 100%, 37%, 1);
  font-weight: 500;
  margin-bottom: 1rem;
}

.profile-bio {
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.9;
}

/* 内容卡片 */
.content-card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.content-card:nth-child(2) { animation-delay: 0.1s; }
.content-card:nth-child(3) { animation-delay: 0.2s; }
.content-card:nth-child(4) { animation-delay: 0.3s; }
.content-card:nth-child(5) { animation-delay: 0.4s; }

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: hsla(160, 100%, 37%, 0.3);
}

.highlight-card {
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-soft) 100%);
  border: 2px solid hsla(160, 100%, 37%, 0.2);
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

/* 标题 */
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-heading);
}

.title-icon {
  font-size: 1.75rem;
}

/* 关于内容 */
.about-content p {
  margin-bottom: 1rem;
  line-height: 1.8;
  color: var(--color-text);
}

.about-content p:last-child {
  margin-bottom: 0;
}

/* 技能网格 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background-color: var(--color-background-mute);
  transform: translateY(-2px);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.skill-icon {
  font-size: 1.5rem;
}

.skill-name {
  font-weight: 600;
  color: var(--color-heading);
}

.skill-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, hsla(160, 100%, 37%, 1) 0%, hsla(216, 73%, 63%, 1) 100%);
  border-radius: 4px;
  transition: width 1s ease-out 0.3s;
  position: relative;
}

.skill-progress::after {
  content: attr(data-level) '%';
  position: absolute;
  right: 8px;
  top: -24px;
  font-size: 0.75rem;
  font-weight: 600;
  color: hsla(160, 100%, 37%, 1);
}

/* 联系网格 */
.contact-grid {
  display: grid;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  color: var(--color-text);
}

.contact-item:hover {
  background-color: var(--color-background-mute);
  border-color: hsla(160, 100%, 37%, 0.5);
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.contact-icon {
  font-size: 2rem;
  min-width: 40px;
  text-align: center;
}

.contact-info {
  flex: 1;
}

.contact-label {
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 0.25rem;
}

.contact-value {
  font-weight: 500;
  color: var(--color-heading);
}

.contact-arrow {
  color: hsla(160, 100%, 37%, 1);
  transition: transform 0.3s ease;
}

.contact-item:hover .contact-arrow {
  transform: translateX(5px);
}

/* 项目理念 */
.philosophy blockquote {
  padding: 1.5rem;
  margin: 0 0 1.5rem 0;
  border-left: 4px solid hsla(160, 100%, 37%, 1);
  background-color: var(--color-background-soft);
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-heading);
}

.philosophy p {
  line-height: 1.8;
  color: var(--color-text);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-section {
    padding: 2rem 1rem;
  }
  
  .profile-card {
    padding: 2rem 1rem;
  }
  
  .avatar-placeholder {
    width: 100px;
    height: 100px;
  }
  
  .avatar-emoji {
    font-size: 3rem;
  }
  
  .profile-name {
    font-size: 1.75rem;
  }
  
  .content-card {
    padding: 1.5rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
}
</style>


