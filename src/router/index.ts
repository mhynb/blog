import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: '首页 - 我的个人博客'
    }
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('@/pages/Posts.vue'),
    meta: {
      title: '文章列表 - 我的个人博客'
    }
  },
  {
    path: '/posts/:slug',
    name: 'post',
    component: () => import('@/pages/Post.vue'),
    props: true,
    meta: {
      title: '文章详情 - 我的个人博客'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    meta: {
      title: '关于 - 我的个人博客'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      title: '404 - 页面未找到'
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 页面切换时滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 动态修改页面标题
router.afterEach((to) => {
  document.title = to.meta.title as string || '我的个人博客'
})

export default router


