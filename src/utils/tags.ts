//不需要被保存的路由
const whiteList = ['/login', '/404', '/401']

export const isSaveTags = (path: any) => {
  return !whiteList.includes(path)
}
