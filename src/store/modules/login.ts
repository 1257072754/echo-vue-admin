import { defineStore } from 'pinia'
import { LocalCache } from '/@/utils/cache'
import { TOKEN } from '/@/constant'
import { store } from '/@/store'
import { login } from '/@/api/mock'
import router from '/@/router'

interface GlobalState {
  token: string
}

export const useUserStore = defineStore({
  id: 'login',
  state: (): GlobalState => {
    return {
      token: '',
    }
  },
  getters: {
    gerToken: () => {
      return LocalCache.getItem(TOKEN)
    },
  },
  actions: {
    userLogin(params: any) {
      login(params).then(result => {
        const { statusCode, data } = result
        if (statusCode === 200) {
          console.log('result ===', result)
          this.token = data.userInfo.token
          LocalCache.setItem(TOKEN, data.userInfo.token)
          router.push('/')
        }
      })
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
