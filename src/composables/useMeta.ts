import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export interface MetaInfo {
  title?: string
  description?: string
  keywords?: string
  author?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: string
}

export function useMeta(meta: MetaInfo) {
  const route = useRoute()

  const updateMeta = () => {
    // 更新标题
    if (meta.title) {
      document.title = meta.title
    }

    // 更新或创建 meta 标签
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // 基本 meta 标签
    if (meta.description) {
      updateMetaTag('description', meta.description)
    }

    if (meta.keywords) {
      updateMetaTag('keywords', meta.keywords)
    }

    if (meta.author) {
      updateMetaTag('author', meta.author)
    }

    // Open Graph 标签
    if (meta.ogTitle) {
      updateMetaTag('og:title', meta.ogTitle, true)
    }

    if (meta.ogDescription) {
      updateMetaTag('og:description', meta.ogDescription, true)
    }

    if (meta.ogImage) {
      updateMetaTag('og:image', meta.ogImage, true)
    }

    if (meta.ogUrl) {
      updateMetaTag('og:url', meta.ogUrl, true)
    }

    updateMetaTag('og:type', 'website', true)

    // Twitter Card 标签
    if (meta.twitterCard) {
      updateMetaTag('twitter:card', meta.twitterCard)
    }

    if (meta.ogTitle) {
      updateMetaTag('twitter:title', meta.ogTitle)
    }

    if (meta.ogDescription) {
      updateMetaTag('twitter:description', meta.ogDescription)
    }

    if (meta.ogImage) {
      updateMetaTag('twitter:image', meta.ogImage)
    }
  }

  onMounted(() => {
    updateMeta()
  })

  // 监听路由变化
  watch(() => route.path, () => {
    updateMeta()
  })

  return {
    updateMeta
  }
}
