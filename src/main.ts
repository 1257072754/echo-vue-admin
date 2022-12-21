import { createApp } from 'vue'
import App from './App.vue'
// 引入 vue-router
import router from './router'
// 引入 pinia
import { setupStore } from '/@/store'
// 初始化CSS
import './style/index.scss'
import 'animate.css'
// 单独引入 ElMessage 和 ElMessageBox 的样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
// 引入svg-icon
import svgIcon from '/@/components/SvgIcon'
import './permission'

const app = createApp(App)
setupStore(app)
app.use(router).use(svgIcon).mount('#app')
