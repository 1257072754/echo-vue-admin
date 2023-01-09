import { defineStore } from 'pinia'
import { LocalCache } from '/@/utils/cache'
import { PERMISSION, TOKEN, USERINFO } from '/@/constant'
import { login } from '/@/api/mock'
import router, { resetRoutes } from '/@/router'
import { setTimeStamp } from '/@/utils/auth'

interface GlobalState {
  token: string
  permission: []
  userInfo: object
}

export const useUserStore = defineStore({
  id: 'login',
  state: (): GlobalState => {
    return {
      token: LocalCache.getItem(TOKEN) || '',
      permission: LocalCache.getItem(PERMISSION) || [],
      userInfo: LocalCache.getItem(USERINFO) || {},
    }
  },
  getters: {
    getToken: () => {
      return LocalCache.getItem(TOKEN)
    },
    getPermission: () => {
      return LocalCache.getItem(PERMISSION)
    },
    getUserInfo: () => {
      return LocalCache.getItem(PERMISSION)
    },
  },
  actions: {
    userLogin(params: any) {
      login(params).then(result => {
        const { statusCode, data } = result
        if (statusCode === 200) {
          console.log('result ===', result)
          this.token = data.userInfo.token
          this.permission = data.userInfo.permissions
          setTimeStamp()
          LocalCache.setItem(TOKEN, data.userInfo.token)
          LocalCache.setItem(PERMISSION, data.userInfo.permissions)
          LocalCache.setItem(USERINFO, data.userInfo.info)
          router.push('/')
        }
      })
    },
    userLogout() {
      return new Promise(resolve => {
        LocalCache.clear()
        resetRoutes()
        resolve('200')
      })
    },
  },
})
