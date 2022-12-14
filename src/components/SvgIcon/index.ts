import svgIcon from '../SvgIcon/src/index.vue'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component('SvgIcon', svgIcon)
  },
}
