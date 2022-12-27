import { defineStore } from 'pinia'
import variables from '/@/style/variables.module.scss'

/**
 * 主题颜色更换
 */
export const useStyleStore = defineStore({
  id: 'style',
  state: () => {
    return { cssVar: variables }
  },
  getters: {},
})
