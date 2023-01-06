import router from '/@/router'
import { LocalCache } from '/@/utils/cache'
import { PERMISSION, TOKEN } from '/@/constant'
import { useUserStore } from '/@/store/modules/login'
import { usePermissionStore } from '/@/store/modules/permission'

const witheList = ['/login']
// 路由前置守卫

router.beforeEach(async (to, from, next) => {
  // 用户已登录
  if (LocalCache.getItem(TOKEN)) {
    if (to.path === '/login') {
      console.log('111 ===', 11)
      next('/')
    } else {
      console.log('444 ===', 444)
      //判断用户资料是否存在，如果不存在，则获取用户信息
      if (LocalCache.getItem(PERMISSION)) {
        const userStore = useUserStore()
        const permissionStore = usePermissionStore()
        const permission = await userStore.getPermission
        //处理用户权限，筛选需要添加的路由
        const filterRoutes = await permissionStore.filterRoutes(
          permission.menus,
        )
        //console.log('filterRoutes ===', filterRoutes)
        //循环添加对应的动态路由
        filterRoutes.forEach((item: any) => {
          router.addRoute(item)
          // console.log('item ===', item)
        })
        //添加完动态路由后，需要进行一次主动跳转
        // console.log('getRoutes ===', router.getRoutes())
        return next(to.path)
      } else {
        console.log(' 1111===')
        next()
      }
    }
  }
  // 用户未登录
  else {
    if (witheList.indexOf(to.path) > -1) {
      console.log('222 ===', 222)
      next()
    } else {
      console.log('333 ===', 333)
      next('/login')
    }
  }
})
