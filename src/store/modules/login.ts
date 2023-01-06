import { defineStore } from 'pinia'
import { LocalCache } from '/@/utils/cache'
import { PERMISSION, TOKEN } from '/@/constant'
import { login } from '/@/api/mock'
import router from '/@/router'
import { setTimeStamp } from '/@/utils/auth'

interface GlobalState {
  token: string
  permission: []
}

export const useUserStore = defineStore({
  id: 'login',
  state: (): GlobalState => {
    return {
      token: LocalCache.getItem(TOKEN) || '',
      permission: LocalCache.getItem(PERMISSION) || [],
    }
  },
  getters: {
    getToken: () => {
      return LocalCache.getItem(TOKEN)
    },
    getPermission: () => {
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
          router.push('/')
        }
      })
    },
    userLogout() {
      return new Promise(resolve => {
        LocalCache.clear()
        resolve('200')
      })
    },
  },
})
