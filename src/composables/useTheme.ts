import { ref, onMounted, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

const THEME_KEY = 'blog-theme'

export function useTheme() {
  const theme = ref<Theme>('auto')
  const isDark = ref(false)

  // 获取系统主题偏好
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // 更新主题
  const updateTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem(THEME_KEY, newTheme)
    applyTheme()
  }

  // 应用主题到 DOM
  const applyTheme = () => {
    const actualTheme = theme.value === 'auto' ? getSystemTheme() : theme.value
    isDark.value = actualTheme === 'dark'
    
    if (actualTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  // 初始化主题
  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    if (savedTheme) {
      theme.value = savedTheme
    }
    applyTheme()

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme.value === 'auto') {
        applyTheme()
      }
    }
    
    // 使用新的 addEventListener API
    mediaQuery.addEventListener('change', handleChange)
    
    // 清理监听器
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  // 监听主题变化
  watch(theme, () => {
    applyTheme()
  })

  // 切换主题
  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex]
    if (nextTheme) {
      updateTheme(nextTheme)
    }
  }

  return {
    theme,
    isDark,
    updateTheme,
    toggleTheme
  }
}
