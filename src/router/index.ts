import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// 公开路由表
const publicRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/',
    component: () => import('/@/layout/index.vue'),
  },
]

const router = createRouter({
  routes: publicRoutes,
  history: createWebHistory(),
})

export default router
