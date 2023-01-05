// 处理动态路由
/**
 * 1. 获取所有路由配置文件
 * 2. 根据 menuList 动态生成 Route
 */
import type { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
// 获取所有路由配置文件的函数
const getMainRouteFileList = async () => {
  const allRoutes: RouteRecordRaw[] = []
  // import.meta.glob 批量导入文件
  const routeFileList = import.meta.glob('../router/main/**')
  console.log('routeFileList ===', routeFileList)
  for (const path in routeFileList) {
    const mod = await routeFileList[path]()
    allRoutes.push(mod.default)
  }
  return allRoutes
}
// 递归获取Route
const recurseGetRoute = (menus: any[], allRoutes: any[], route: any[]) => {
  // 遍历传递的菜单
  for (const menu of menus) {
    // 如果没有children属性，则将该项直接push到route中
    if (!menu.children) {
      // 找到对应的路由配置文件
      const r = allRoutes.find(
        (route: any) => route.path === '/main' + menu.path,
      )
      // 如果找到匹配的则进行添加
      r && route.push(r)
    } else {
      recurseGetRoute(menu.children, allRoutes, route)
    }
  }
}
// 根据菜单生成路由
export const menuToRoutes = (userMenu: any[]): Promise<RouteRecordRaw[]> => {
  return new Promise(resolve => {
    const routes: RouteRecordRaw[] = []

    getMainRouteFileList().then(res => {
      // 1. 获取所有的routes
      const allRoutes: RouteRecordRaw[] = res
      // 2. 配置该权限的routes
      recurseGetRoute(userMenu, allRoutes, routes)

      resolve(routes)
    })
  })
}
//获取所有子集路由
const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
//处理脱离层级的路由
export const filterRoutes = (routes: RouteRecordRaw[]) => {
  //所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  //根据子集路由进行查重操作
  return routes.filter((route: RouteRecordRaw) => {
    //根据route在childrenRoutes中进行查重，把所有重复路由表剔除
    return !childrenRoutes.find((childrenRoute: RouteRecordRaw) => {
      return childrenRoute.path === route.path
    })
  })
}
//判空
const isNull = (data: any) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

//根据routes(childrenRoutes)数据，返回对应的menu规则数据
export function generateMenus(routes: any, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
