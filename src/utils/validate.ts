/**
 * 判断是否为外部资源
 */
export const isExternal = (path: any) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
