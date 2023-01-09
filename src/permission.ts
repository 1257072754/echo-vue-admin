import router from '/@/router'
import { LocalCache } from '/@/utils/cache'
import { TOKEN } from '/@/constant'
import { useUserStore } from '/@/store/modules/login'
import { usePermissionStore } from '/@/store/modules/permission'
import { useFirstStore } from '/@/store/modules/first'
// 白名单
const witheList = ['/login']
/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 要从哪里来
 * @param {*} next 是否要去
 */

router.beforeEach(async (to, from, next) => {
  // 用户已登录，存在 token ，进入主页
  if (LocalCache.getItem(TOKEN)) {
    if (to.path === '/login') {
      //已经登录但是想进入登录页，重定向到根目录
      next('/')
    } else {
      const firstStore = useFirstStore()
      //判断用户资料是否存在，如果不存在，则获取用户信息
      if (!firstStore.getFlag) {
        firstStore.setFlag(true)
        const userStore = useUserStore()
        const permissionStore = usePermissionStore()
        const permission = await userStore.getPermission
        //处理用户权限，筛选需要添加的路由
        const filterRoutes = await permissionStore.filterRoutes(
          permission.menus,
        )
        //循环添加对应的动态路由
        filterRoutes.forEach((item: any) => {
          router.addRoute(item)
        })
        console.log('动态路由添加完成 ===', router.getRoutes())
        //添加完动态路由后，需要进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  }
  // 用户未登录
  else {
    // 没有token的情况下，可以进入白名单
    if (witheList.indexOf(to.path) > -1) {
      next()
    } else {
      //跳转路径不在白名单里，跳转到登录页
      next('/login')
    }
  }
})
