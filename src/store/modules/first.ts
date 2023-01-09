import { defineStore } from 'pinia'

/**
 * 主题颜色更换
 */
export const useFirstStore = defineStore({
  id: 'first',
  state: () => {
    return {
      flag: false,
    }
  },
  getters: {
    getFlag(): boolean {
      return this.flag
    },
  },
  actions: {
    setFlag(flag: boolean) {
      this.flag = flag
    },
  },
})
