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
      tagsViewList: LocalCache.getItem('appConfig')?.tagsViewList || [],
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
    addTagsView(tag: any) {
      // console.log('tag ===', tag)
      // console.log('this.tagsViewList ===', this.tagsViewList)
      // const find = this.tagsViewList.find(item => {
      //   debugger
      //   return item.path === tag.path
      // })
      //处理重复
      this.tagsViewList.push(tag)
    },
  },
  persist: true,
})
