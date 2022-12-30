import { defineStore } from 'pinia'
import { LocalCache } from '/@/utils/cache'
import { DEFAULT_COLOR } from '/@/constant'
import variables from '/@/style/variables.module.scss'

/**
 * 应用配置
 */
export const useAppConfigStore = defineStore({
  id: 'appConfig',
  state: () => {
    return {
      sidebarOpened: true,
      language: LocalCache.getItem('appConfig')?.language
        ? LocalCache.getItem('appConfig')?.language
        : 'zh',
      mainTheme: LocalCache.getItem('appConfig')?.mainTheme || DEFAULT_COLOR,
      variablesTheme: variables,
    }
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    setLanguage(lang: string) {
      this.language = lang
    },
    setMainTheme(theme: string) {
      this.mainTheme = theme
      this.variablesTheme.menuBg = theme
    },
  },
  persist: true,
})
