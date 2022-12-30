import { defineStore } from 'pinia'
import { generateColors } from '/@/utils/theme'
import { LocalCache } from '/@/utils/cache'
import { DEFAULT_COLOR } from '/@/constant'
import { useAppConfigStore } from '/@/store/modules/appConfig'

/**
 * 主题颜色更换
 */
export const useStyleStore = defineStore({
  id: 'style',
  state: () => {
    return {
      cssVar: {
        ...useAppConfigStore().variablesTheme,
        ...generateColors(
          LocalCache.getItem('appConfig')?.mainTheme || DEFAULT_COLOR,
        ),
      },
    }
  },
  getters: {},
})
