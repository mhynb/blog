# 个人博客项目

一个使用 Vue 3 + Vite + TypeScript 构建的现代化个人博客系统。

## ✨ 功能特性

### 核心功能
- 📝 **文章管理** - 支持 Markdown 格式的文章展示
- 🏷️ **标签系统** - 文章分类和标签过滤
- 🔍 **搜索功能** - 全文搜索文章内容
- 📱 **响应式设计** - 完美适配各种设备

### 最新完善功能

#### 1. 完善的关于页面 ✅
- 个人简介和头像
- 技能展示（带进度条动画）
- 联系方式（GitHub、Email、LinkedIn）
- 项目理念展示

#### 2. 增强的主题系统 ✅
- 完整的 CSS 变量系统
- 亮色/暗色/自动三种主题模式
- 平滑的主题切换动画
- 自定义滚动条样式

#### 3. 代码语法高亮 ✅
- 集成 highlight.js
- 支持多种编程语言
- GitHub Dark 主题风格
- 自动语言识别

#### 4. 阅读体验优化 ✅
- **阅读进度条** - 顶部固定位置显示阅读进度
- **文章目录(TOC)** - 自动生成文章大纲，支持点击跳转
- **平滑滚动** - 优雅的页面滚动体验

#### 5. SEO 优化 ✅
- 动态 meta 标签
- Open Graph 支持（社交分享优化）
- Twitter Card 支持
- 结构化数据

#### 6. RSS 订阅 ✅
- 自动生成 RSS feed
- 一键下载订阅文件
- 包含文章标签和分类

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

### 部署到 GitHub Pages
```bash
npm run deploy
```

## 📁 项目结构

```
blog/
├── src/
│   ├── assets/          # 静态资源
│   │   ├── base.css     # 基础样式和主题变量
│   │   └── main.css     # 主样式文件
│   ├── components/      # 公共组件
│   ├── composables/     # Vue 组合式函数
│   │   ├── useTheme.ts        # 主题切换
│   │   ├── useReadingProgress.ts  # 阅读进度
│   │   ├── useToc.ts          # 文章目录
│   │   └── useMeta.ts         # SEO meta 标签
│   ├── pages/          # 页面组件
│   │   ├── Home.vue    # 首页
│   │   ├── Posts.vue   # 文章列表
│   │   ├── Post.vue    # 文章详情
│   │   ├── About.vue   # 关于页面
│   │   └── NotFound.vue # 404 页面
│   ├── posts/          # 文章数据
│   │   └── index.ts    # 文章列表
│   ├── router/         # 路由配置
│   ├── utils/          # 工具函数
│   │   ├── markdown.ts # Markdown 渲染
│   │   └── rss.ts      # RSS 生成
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── public/             # 公共静态资源
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
```

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **语言**: TypeScript
- **路由**: Vue Router 4
- **Markdown**: marked
- **代码高亮**: highlight.js
- **部署**: GitHub Pages

## 📝 添加新文章

在 `src/posts/index.ts` 中添加文章数据：

```typescript
{
  slug: 'article-slug',           // 文章 URL 标识
  title: '文章标题',              // 文章标题
  date: '2025-12-05',             // 发布日期
  excerpt: '文章摘要',            // 文章摘要（可选）
  tags: ['标签1', '标签2'],      // 文章标签（可选）
  content: `# Markdown 内容...`  // 文章正文（Markdown 格式）
}
```

## 🎨 自定义主题

在 `src/assets/base.css` 中修改 CSS 变量来自定义主题颜色：

```css
:root {
  --color-primary: hsla(160, 100%, 37%, 1);
  --color-secondary: hsla(216, 73%, 63%, 1);
  /* 更多变量... */
}
```

## 📱 响应式断点

- 移动设备: < 768px
- 平板设备: 768px - 1024px  
- 桌面设备: > 1024px
- 大屏设备: > 1400px (显示 TOC)

## 🔧 配置说明

### 修改网站信息

1. **博客标题和描述** - 编辑 `src/App.vue` 和各页面的 meta 信息
2. **GitHub 链接** - 修改 `src/App.vue` 中的 GitHub 链接
3. **RSS 配置** - 编辑 `src/utils/rss.ts` 中的配置信息
4. **部署域名** - 修改 `package.json` 中的 `homepage` 字段

## 📄 License

MIT License

## 👨‍💻 作者

BL_Coder - [@mhynb](https://github.com/mhynb)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
