import { defineStore } from 'pinia'

/**
 * 应用配置
 */
export const useAppConfigStore = defineStore({
  id: 'appConfig',
  state: () => {
    return { sidebarOpened: true }
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
  },
})
