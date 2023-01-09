import { createApp } from 'vue'
// 引入 pinia
import { setupStore } from '/@/store'
import App from './App.vue'
// 引入 vue-router
import router from './router'

// 初始化CSS
import './style/index.scss'
import 'animate.css'
import elementPlus from 'element-plus'
// 单独引入 ElMessage 和 ElMessageBox 的样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
// 引入svg-icon
import svgIcon from '/@/components/SvgIcon'
// 路由守望
import './permission'
// 引入i18n
import i18n from '/@/i18n/index'

const app = createApp(App)
setupStore(app)
app
  .use(router)
  .use(svgIcon)
  .use(i18n)
  .use(elementPlus, { i18n: i18n.global.t }) // 设置element-plus国际化
  .mount('#app')
