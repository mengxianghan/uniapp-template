import { createSSRApp } from 'vue'
import { useCore } from '@/core'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  useCore(app)

  return {
    app,
  }
}
