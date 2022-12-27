import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import layout from '/@/layout/index.vue'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
//私有路由表
const privateRoutes: RouteRecordRaw[] = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter,
]
// 公开路由表
const publicRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/',
    component: () => layout,
    redirect: '/profile',
    children: [
      //个人中心
      {
        path: '/profile',
        name: '/profile',
        component: () => import('/@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel',
        },
      },
      //404
      {
        path: '/404',
        name: '/404',
        component: () => import('/@/views/error-page/404.vue'),
      },
      //个人中心
      {
        path: '/401',
        name: '/401',
        component: () => import('/@/views/error-page/401.vue'),
      },
    ],
  },
]

const router = createRouter({
  routes: [...publicRoutes, ...privateRoutes],
  history: createWebHistory(),
})

export default router
