import type { App } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import './permission'

export function useCore(app: App) {
  setupStore(app)
  setupRouter(app)
}
