import { defineStore } from 'pinia'
import { publicRoutes } from '/@/router/index'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => {
    return {
      //路由表,初始时拥有的路由表
      permissionList: publicRoutes,
    }
  },
  getters: {},
  actions: {
    //追加路由
    // serRoutes(newRoutes){
    //     this.
    // }
  },
})
