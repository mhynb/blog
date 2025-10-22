import { marked } from 'marked'

export function renderMarkdown(md: string): string {
  // 确保返回字符串类型
  const result = marked.parse(md)
  return typeof result === 'string' ? result : ''
}


