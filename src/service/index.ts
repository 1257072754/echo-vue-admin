import Request from './request'
import { AxiosResponse } from 'axios'

import type { RequestConfig } from './request/types'
import { LocalCache } from '/@/utils/cache'
import { TOKEN } from '/@/constant'

type Recordable<T = any> = Record<string, T>

export interface IResponse<T> {
  statusCode: number
  desc: string
  data: T
}

// 重写返回类型
interface IRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      ;(config as Recordable).headers['Token'] = LocalCache.getItem(TOKEN) | ''
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 */
const apiRequest = <D = any, T = any>(config: IRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<IResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default apiRequest
