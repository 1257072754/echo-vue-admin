import { createPinia } from 'pinia'
import type { App } from 'vue'
import piniaPluginPersistedstate, {
  PersistedStateOptions,
} from 'pinia-plugin-persistedstate'

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @return persist
 */
export const storePersistConfig = (key: string) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage,
  }
  return persist
}

// piniaPersist(持久化)
const store = createPinia()
store.use(piniaPluginPersistedstate)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
