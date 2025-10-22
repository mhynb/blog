import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('@/pages/Posts.vue'),
  },
  {
    path: '/post/:slug',
    name: 'post',
    component: () => import('@/pages/Post.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})


