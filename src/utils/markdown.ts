import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// 配置 marked 的渲染器
const renderer = new marked.Renderer()

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const language = lang || ''
  if (language && hljs.getLanguage(language)) {
    try {
      const highlighted = hljs.highlight(text, { language }).value
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
    } catch (err) {
      console.error('Highlight error:', err)
    }
  }
  const highlighted = hljs.highlightAuto(text).value
  return `<pre><code class="hljs">${highlighted}</code></pre>`
}

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
})

export function renderMarkdown(md: string): string {
  try {
    const result = marked.parse(md)
    // 确保返回字符串类型
    return typeof result === 'string' ? result : ''
  } catch (error) {
    console.error('Markdown 解析错误:', error)
    return `<p class="markdown-error">解析 Markdown 内容时出错</p>`
  }
}

/**
 * 从 Markdown 内容中提取摘要
 * @param md Markdown 内容
 * @param maxLength 最大长度
 * @returns 提取的摘要
 */
export function extractExcerpt(md: string, maxLength = 150): string {
  // 移除代码块
  let plainText = md.replace(/```[\s\S]*?```/g, '')
  
  // 移除行内代码
  plainText = plainText.replace(/`[^`]+`/g, '')
  
  // 移除 Markdown 语法
  plainText = plainText
    .replace(/#{1,6}\s+/g, '') // 标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 粗体
    .replace(/\*(.*?)\*/g, '$1') // 斜体
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // 链接
    .replace(/!\[(.*?)\]\((.*?)\)/g, '') // 图片
    .replace(/\n+/g, ' ') // 换行符转空格
    .replace(/\s+/g, ' ') // 多余空格
    .trim()
  
  // 截取指定长度
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  // 尝试在单词边界处截断
  const truncated = plainText.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  if (lastSpaceIndex > maxLength * 0.7) {
    return truncated.substring(0, lastSpaceIndex) + '...'
  }
  
  return truncated + '...'
}

/**
 * 高亮显示代码块
 * 注：这里是一个简单实现，实际项目中可以集成语法高亮库
 */
export function highlightCode(code: string, lang: string): string {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(code, { language: lang }).value
    } catch (err) {
      console.error('Highlight error:', err)
    }
  }
  return hljs.highlightAuto(code).value
}


