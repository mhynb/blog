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
  <section 
    class="max-w-4xl mx-auto px-6 py-16 transition-all duration-700 ease-out transform"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <!-- Profile Card -->
    <div class="text-center p-12 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl mb-12 shadow-sm border border-neutral-100 dark:border-neutral-800 relative overflow-hidden group">
      <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
      <div class="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
      
      <div class="relative z-10">
        <div class="mb-6 inline-block">
          <div class="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full flex items-center justify-center border-4 border-white dark:border-neutral-700 shadow-xl transform transition-transform duration-300 hover:scale-105 hover:rotate-3">
            <span class="text-6xl select-none">👨‍💻</span>
          </div>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">BL_Coder</span>
        </h1>
        <p class="text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-6">Full Stack Developer</p>
        
        <p class="max-w-xl mx-auto text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
          Passionate about technology, sharing, and creating. Focused on front-end and back-end development, dedicated to building elegant and efficient user experiences.
        </p>
      </div>
    </div>

    <!-- About Me -->
    <div class="bg-white dark:bg-neutral-800 rounded-2xl p-8 mb-8 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-neutral-900 dark:text-white">
        <span class="text-2xl">✨</span>
        About Me
      </h2>
      <div class="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
        <p>Hello! I am a passionate developer with years of experience in software development.</p>
        <p>I love learning new technologies, solving complex problems, and turning ideas into reality. This blog is where I share technical insights, project experiences, and thoughts on life.</p>
        <p>In my spare time, I enjoy contributing to open source projects, reading technical articles, and exploring cutting-edge technology trends.</p>
      </div>
    </div>

    <!-- Skills -->
    <div class="bg-white dark:bg-neutral-800 rounded-2xl p-8 mb-8 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-neutral-900 dark:text-white">
        <span class="text-2xl">🚀</span>
        Skills & Expertise
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="skill in skills" 
          :key="skill.name" 
          class="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">{{ skill.icon }}</span>
            <span class="font-semibold text-neutral-900 dark:text-neutral-100">{{ skill.name }}</span>
          </div>
          <div class="h-2 bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative group-hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all duration-1000 ease-out"
              :style="{ width: isVisible ? skill.level + '%' : '0%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="bg-white dark:bg-neutral-800 rounded-2xl p-8 mb-8 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-neutral-900 dark:text-white">
        <span class="text-2xl">📬</span>
        Contact Me
      </h2>
      <div class="grid gap-4">
        <a 
          v-for="item in contact" 
          :key="item.label"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all duration-300 group"
        >
          <span class="text-3xl bg-neutral-100 dark:bg-neutral-700 p-2 rounded-lg group-hover:bg-white dark:group-hover:bg-neutral-600 transition-colors">{{ item.icon }}</span>
          <div class="flex-1">
            <div class="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{{ item.label }}</div>
            <div class="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{{ item.value }}</div>
          </div>
          <svg class="w-5 h-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Philosophy -->
    <div class="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-neutral-900 dark:text-white">
        <span class="text-2xl">💡</span>
        Philosophy
      </h2>
      <div class="relative pl-6 border-l-4 border-emerald-500">
        <blockquote class="text-xl font-medium italic text-neutral-800 dark:text-neutral-200 mb-4">
          "Coding never stops, learning never ends. By sharing knowledge, we not only help others grow but also continuously improve ourselves."
        </blockquote>
        <p class="text-neutral-600 dark:text-neutral-400">
          The goal of this blog is to create a platform for technical exchange and knowledge sharing, hoping to help more developers grow.
        </p>
      </div>
    </div>
  </section>
</template>
