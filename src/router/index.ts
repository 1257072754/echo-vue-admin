import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import layout from '/@/layout/index.vue'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import { useFirstStore } from '/@/store/modules/first'
import { useUserStore } from '/@/store/modules/login'

//私有路由表
export const privateRoutes: RouteRecordRaw[] = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter,
]
// 公开路由表
export const publicRoutes: RouteRecordRaw[] = [
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
        name: 'profile',
        component: () => import('/@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel',
        },
      },
      //404
      {
        path: '/404',
        name: '404',
        component: () => import('/@/views/error-page/404.vue'),
      },
      //个人中心
      {
        path: '/401',
        name: '401',
        component: () => import('/@/views/error-page/401.vue'),
      },
    ],
  },
]

const router = createRouter({
  routes: publicRoutes,
  history: createWebHistory(),
})
//初始化路由表
export const resetRoutes = () => {
  const firstStore = useFirstStore()
  const userStore = useUserStore()
  if (firstStore.flag && userStore.permission) {
    const menus = userStore.getPermission.menus
    menus.forEach((item: any) => {
      console.log('item ===', item)
      router.removeRoute(item)
    })
    console.log('router.getRoutes() ===', router.getRoutes())
  }
}

export default router
