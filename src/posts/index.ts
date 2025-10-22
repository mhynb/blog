export type PostMeta = {
  slug: string
  title: string
  date: string
  content: string
}

const posts: PostMeta[] = [
  {
    slug: 'hello-world',
    title: '你好，博客！',
    date: '2025-10-22',
    content: `# 你好，博客！\n\n使用 Vue 3 + Vite 搭建，并部署到 GitHub Pages。\n\n- 支持路由\n- 支持 Markdown\n- 自动部署`,
  },
]

export default posts


