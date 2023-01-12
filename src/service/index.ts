import Request from './request'

import type { RequestConfig } from './request/types'
import { LocalCache } from '/@/utils/cache'
import { TOKEN } from '/@/constant'
import { isCheckTimeout } from '/@/utils/auth'
import router from '/@/router'
import { ElMessage } from 'element-plus'

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
    requestInterceptors: (config: any) => {
      console.log('config ===', config)
      if (LocalCache.getItem(TOKEN) && isCheckTimeout()) {
        //token过期，退出
        LocalCache.removeItem(TOKEN)
        router.push('/login')
        return Promise.reject(new Error('token 失效'))
      }

      ;(config as Recordable).headers['Token'] = LocalCache.getItem(TOKEN) || ''
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: any) => {
      console.log('result ===', result)
      const { statusCode, msg } = result.data
      if (statusCode === 200) {
        return result
      } else {
        ElMessage.error(msg)
        return Promise.reject(new Error(msg))
      }
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
