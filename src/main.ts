import { createSSRApp } from 'vue'
import { router } from '@/router'
import { store } from '@/store'
import App from './App.vue'
import '@/styles/index.scss'

export function createApp() {
  const app = createSSRApp(App)

  app.use(router)
  app.use(store)

  return {
    app,
  }
}
