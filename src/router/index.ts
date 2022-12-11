import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// 公开路由表
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
  },
]

const router = createRouter({
  routes: publicRoutes,
  history: createWebHistory(),
})

export default router
