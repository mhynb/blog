import { ref, onMounted, type Ref } from 'vue'

export interface TocItem {
  id: string
  text: string
  level: number
}

export function useToc(contentRef: Ref<HTMLElement | null>) {
  const tocItems = ref<TocItem[]>([])
  const activeId = ref<string>('')

  const generateToc = () => {
    if (!contentRef.value) return

    const headings = contentRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1))
      const text = heading.textContent || ''
      const id = `heading-${index}`
      
      // 为标题添加 ID
      heading.id = id
      
      items.push({ id, text, level })
    })

    tocItems.value = items
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Header height offset
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      activeId.value = id
    }
  }

  const updateActiveHeading = () => {
    if (tocItems.value.length === 0) return

    const scrollPosition = window.scrollY + 100

    for (let i = tocItems.value.length - 1; i >= 0; i--) {
      const item = tocItems.value[i]
      if (!item) continue
      
      const heading = document.getElementById(item.id)
      if (heading && heading.offsetTop <= scrollPosition) {
        activeId.value = item.id
        return
      }
    }

    const firstItem = tocItems.value[0]
    if (firstItem) {
      activeId.value = firstItem.id
    }
  }

  onMounted(() => {
    setTimeout(() => {
      generateToc()
      updateActiveHeading()
    }, 500)

    window.addEventListener('scroll', updateActiveHeading, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveHeading)
    }
  })

  return {
    tocItems,
    activeId,
    scrollToHeading
  }
}
