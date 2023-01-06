import { defineStore } from 'pinia'
import { privateRoutes, publicRoutes } from '/@/router'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => {
    return {
      //路由表,初始时拥有的路由表
      routes: publicRoutes,
    }
  },
  getters: {},
  actions: {
    //追加路由
    setRoutes(newRoutes: any) {
      this.routes = [...publicRoutes, ...newRoutes]
    },
    //根据权限数据筛选路由
    filterRoutes(menus: any) {
      //筛选之后，获取到的需要通过addRoute进行添加的路由表数据
      const routes: any = []
      menus.forEach((key: any) => {
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      //所有不匹配的路由，全部进入404的路由配置
      //注意：该配置必须要在所有路由指定之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404',
      })
      this.setRoutes(routes)
      return routes
    },
  },
})
