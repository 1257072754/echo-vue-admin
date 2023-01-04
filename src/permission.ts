import router from '/@/router'
import { LocalCache } from '/@/utils/cache'
import { TOKEN } from '/@/constant'

const witheList = ['/login']
// 路由前置守卫

router.beforeEach((to, from, next) => {
  // 用户已登录
  if (LocalCache.getItem(TOKEN)) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (witheList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  // 用户未登录
})
