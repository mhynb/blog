<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isVisible = ref(false)
const errorCode = ref('404')

onMounted(() => {
  // Digit animation
  const digits = errorCode.value.split('')
  let currentIndex = 0
  
  const animateDigit = () => {
    if (currentIndex < digits.length) {
      const digit = parseInt(digits[currentIndex] || '0')
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
      setTimeout(() => {
        isVisible.value = true
      }, 300)
    }
  }
  
  animateDigit()
})
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center p-4 overflow-hidden relative">
    <!-- Decorative Background Elements -->
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

    <div 
      class="text-center relative z-10 max-w-lg w-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 dark:border-neutral-700/50 transition-all duration-700 transform"
      :class="isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-12'"
    >
      <!-- Error Code -->
      <div class="text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600 select-none">
        {{ errorCode }}
      </div>
      
      <!-- Error Message -->
      <h2 class="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Page Not Found</h2>
      <p class="text-neutral-500 dark:text-neutral-400 mb-8 text-lg">
        Sorry, the page you are looking for does not exist or has been removed.
      </p>
      
      <!-- Possible Causes -->
      <div class="space-y-3 mb-8 text-left">
        <div class="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl text-neutral-600 dark:text-neutral-300 text-sm">
          <svg class="w-5 h-5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>The link might be expired or typed incorrectly</span>
        </div>
        <div class="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl text-neutral-600 dark:text-neutral-300 text-sm">
          <svg class="w-5 h-5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>The page might have been removed by the admin</span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink 
          to="/" 
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-1"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back Home
        </RouterLink>
        <RouterLink 
          to="/posts" 
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 font-semibold rounded-xl transition-all hover:bg-neutral-50 dark:hover:bg-neutral-600 hover:-translate-y-1"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          Browse Articles
        </RouterLink>
      </div>
    </div>
  </div>
</template>
