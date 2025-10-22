export type PostMeta = {
  slug: string
  title: string
  date: string
  content: string
  excerpt?: string
  tags?: string[]
}

const posts: PostMeta[] = [
  {
    slug: 'hello-world',
    title: '你好，博客！',
    date: '2025-10-22',
    excerpt: '这是我的第一篇博客文章，介绍了博客的搭建过程。',
    tags: ['介绍', 'Vue', 'Vite'],
    content: `# 你好，博客！\n\n欢迎来到我的个人博客！这个博客使用 Vue 3 + Vite 搭建，并部署到 GitHub Pages。\n\n## 博客特点\n\n- **现代化技术栈**：使用 Vue 3、TypeScript 和 Vite 构建\n- **优雅的 UI**：精心设计的界面，流畅的动画效果\n- **Markdown 支持**：轻松编写格式化文章\n- **响应式设计**：适配各种设备屏幕\n- **自动部署**：通过 GitHub Actions 实现持续部署\n\n## 未来规划\n\n1. 添加更多内容\n2. 实现文章分类和标签功能\n3. 增加评论系统\n4. 优化 SEO 表现\n\n感谢您的访问！`,
  },
  {
    slug: 'vue3-composition-api',
    title: 'Vue 3 Composition API 深度解析',
    date: '2025-10-20',
    excerpt: '深入探讨 Vue 3 中 Composition API 的使用方法和最佳实践。',
    tags: ['Vue', 'Composition API', '前端'],
    content: `# Vue 3 Composition API 深度解析\n\nVue 3 引入的 Composition API 是一个革命性的变化，它提供了更灵活、更强大的组件逻辑组织方式。\n\n## 什么是 Composition API？\n\nComposition API 是一组基于函数的 API，它允许我们以更灵活的方式组织组件逻辑。相比于 Options API，它提供了更好的 TypeScript 支持和逻辑复用能力。\n\n## 基本使用\n\n使用 setup 函数作为入口点：\n\n\`\`\`typescript\nimport { ref, computed, onMounted } from 'vue'\n\nexport default {\n  setup() {\n    const count = ref(0)\n    const doubled = computed(() => count.value * 2)\n    \n    const increment = () => {\n      count.value++\n    }\n    \n    onMounted(() => {\n      console.log('组件已挂载')\n    })\n    \n    return {\n      count,\n      doubled,\n      increment\n    }\n  }\n}\n\`\`\`\n\n## 逻辑复用\n\n使用 Composition API 可以轻松实现逻辑复用：\n\n\`\`\`typescript\n// useCounter.ts\nimport { ref, computed } from 'vue'\n\nexport function useCounter(initialValue = 0) {\n  const count = ref(initialValue)\n  const increment = () => count.value++\n  const decrement = () => count.value--\n  const reset = () => count.value = initialValue\n  \n  return {\n    count,\n    increment,\n    decrement,\n    reset\n  }\n}\n\`\`\`\n\n## 最佳实践\n\n1. 按照功能组织相关的状态和逻辑\n2. 使用 TypeScript 获得更好的类型支持\n3. 将可复用逻辑提取为自定义 Hook\n4. 避免在 setup 中使用 this\n\n## 总结\n\nComposition API 为 Vue 3 带来了更灵活、更强大的组件开发模式，特别适合构建大型应用和需要高度逻辑复用的场景。`,
  },
  {
    slug: 'modern-css-tricks',
    title: '2025年现代CSS技巧合集',
    date: '2025-10-18',
    excerpt: '分享2025年最流行的CSS技巧和最佳实践，让你的页面更美观、更高效。',
    tags: ['CSS', '前端', '设计'],
    content: `# 2025年现代CSS技巧合集\n\n随着CSS的不断发展，我们有了更多强大的工具和特性来创建令人惊叹的用户界面。本文将分享2025年最值得掌握的CSS技巧。\n\n## 1. CSS Grid 高级布局\n\nCSS Grid 提供了强大的二维布局系统：\n\n\`\`\`css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  place-items: center;\n}\n\`\`\n\n## 2. 渐变和阴影效果\n\n使用高级渐变和阴影创建深度感：\n\n\`\`\`css\n.card {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4);\n}\n\`\`\`\n\n## 3. CSS 动画和过渡\n\n创建流畅的动画效果：\n\n\`\`\`css\n@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}\n\n.element {\n  animation: float 6s ease-in-out infinite;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\`\`\`\n\n## 4. CSS 变量和主题\n\n使用CSS变量实现主题切换：\n\n\`\`\`css\n:root {\n  --primary-color: #4CAF50;\n  --text-color: #333;\n  --background-color: #fff;\n}\n\n[data-theme="dark"] {\n  --primary-color: #8BC34A;\n  --text-color: #eee;\n  --background-color: #333;\n}\n\`\`\`\n\n## 5. 响应式设计技巧\n\n使用媒体查询和现代CSS特性创建响应式布局：\n\n\`\`\`css\n/* 基础样式 */\n.container {\n  display: flex;\n  flex-direction: column;\n}\n\n/* 平板和桌面设备 */\n@media (min-width: 768px) {\n  .container {\n    flex-direction: row;\n  }\n}\n\`\`\`\n\n## 总结\n\n现代CSS提供了强大的工具来创建令人惊叹的用户界面。通过掌握这些技巧，你可以构建更美观、更高效的网站和应用。`,
  },
  {
    slug: 'vite-performance-optimization',
    title: 'Vite 性能优化完全指南',
    date: '2025-10-15',
    excerpt: '详细介绍如何优化 Vite 项目的构建和运行性能，提升开发体验和用户体验。',
    tags: ['Vite', '性能优化', '构建工具'],
    content: `# Vite 性能优化完全指南\n\nVite 是一个现代化的前端构建工具，提供了极速的开发服务器和优化的构建过程。本文将介绍如何进一步优化 Vite 项目的性能。\n\n## 1. 依赖优化\n\n使用 Vite 的依赖预构建功能：\n\n\`\`\`javascript\n// vite.config.js\nexport default {\n  optimizeDeps: {\n    include: ['axios', 'lodash-es'],\n    exclude: ['some-heavy-lib'],\n    esbuildOptions: {\n      target: 'es2020'\n    }\n  }\n}\n\`\`\`\n\n## 2. 代码分割\n\n使用动态导入实现代码分割：\n\n\`\`\`javascript\n// 动态导入\nconst LazyComponent = () => import('./LazyComponent.vue')\n\n// 在路由中使用\nconst routes = [\n  {\n    path: '/heavy-page',\n    component: () => import('./HeavyPage.vue'),\n    meta: { transition: 'fade' }\n  }\n]\n\`\`\`\n\n## 3. 构建优化\n\n配置生产构建选项：\n\n\`\`\`javascript\n// vite.config.js\nexport default {\n  build: {\n    target: 'es2015',\n    minify: 'terser',\n    terserOptions: {\n      compress: {\n        drop_console: true,\n        drop_debugger: true\n      }\n    },\n    chunkSizeWarningLimit: 1000,\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          'vue-vendor': ['vue', 'vue-router', 'pinia'],\n          'ui-vendor': ['ant-design-vue', 'element-plus']\n        }\n      }\n    }\n  }\n}\n\`\`\`\n\n## 4. 图片和资源优化\n\n使用 Vite 的资源处理功能：\n\n\`\`\`javascript\n// vite.config.js\nexport default {\n  build: {\n    assetsInlineLimit: 4096 // 4kb\n  },\n  plugins: [\n    // 可以添加图片压缩插件\n    viteImagemin({\n      gifsicle: {\n        optimizationLevel: 7\n      },\n      optipng: {\n        optimizationLevel: 7\n      },\n      mozjpeg: {\n        quality: 80\n      },\n      pngquant: {\n        quality: [0.8, 0.9],\n        speed: 4\n      },\n      svgo: {\n        plugins: [\n          {\n            name: 'removeViewBox',\n            active: false\n          }\n        ]\n      }\n    })\n  ]\n}\n\`\`\`\n\n## 5. 开发服务器优化\n\n提升开发体验：\n\n\`\`\`javascript\n// vite.config.js\nexport default {\n  server: {\n    port: 3000,\n    open: true,\n    hmr: {\n      overlay: false // 禁用错误覆盖层\n    },\n    proxy: {\n      '/api': {\n        target: 'http://localhost:8000',\n        changeOrigin: true,\n        rewrite: (path) => path.replace(/^\/api/, '')\n      }\n    }\n  }\n}\n\`\`\`\n\n## 总结\n\n通过这些优化措施，你可以显著提升 Vite 项目的构建速度和运行性能，为用户提供更好的体验。`,
  }
]

export default posts


