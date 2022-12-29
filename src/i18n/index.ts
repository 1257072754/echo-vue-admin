import { createI18n } from 'vue-i18n'

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from './lang/en'
import zhLocale from './lang/zh'

const messages = {
  en: {
    msg: { ...enLocale, ...elementEnLocale },
  },
  zh: {
    msg: {
      ...zhLocale,
      ...elementZhLocale,
    },
  },
}
const locale = 'zh'
const i18n = createI18n({
  //是否组合式API
  legacy: false,
  //全局使用$t函数
  globalInjection: true,
  locale,
  messages,
})
export default i18n
