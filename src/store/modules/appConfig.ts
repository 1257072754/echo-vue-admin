import { defineStore } from 'pinia'
import { LocalCache } from '/@/utils/cache'

/**
 * 应用配置
 */
export const useAppConfigStore = defineStore({
  id: 'appConfig',
  state: () => {
    return {
      sidebarOpened: true,
      language: LocalCache.getItem('appConfig').language || 'zh',
    }
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    setLanguage(lang: string) {
      this.language = lang
    },
  },
  persist: true,
})
