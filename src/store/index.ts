import type { App } from 'vue'
import { createPinia } from 'pinia'

export { useAppStore } from './app'

export function setupStore(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
