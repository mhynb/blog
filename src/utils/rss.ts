import posts from '@/posts/index'

interface RSSConfig {
  title: string
  description: string
  link: string
  language: string
  copyright: string
}

export function generateRSS(config: RSSConfig): string {
  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => {
      const link = `${config.link}/posts/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.title}</title>
    <description>${config.description}</description>
    <link>${config.link}</link>
    <language>${config.language}</language>
    <copyright>${config.copyright}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${config.link}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`
}

export function downloadRSS() {
  const config: RSSConfig = {
    title: 'BL_Coder 的博客',
    description: '记录技术成长与生活思考',
    link: 'https://mhynb.github.io/blog',
    language: 'zh-CN',
    copyright: `Copyright ${new Date().getFullYear()} BL_Coder`
  }

  const rssContent = generateRSS(config)
  const blob = new Blob([rssContent], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'rss.xml'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
