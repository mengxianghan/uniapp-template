import type { App } from 'vue'
import pages from '@/pages.json'
import { createRouter, type IRouteRecord } from 'uni-vant-router'

const routes = pages.pages.map((item: IRouteRecord) => ({
  path: `/${item.path}`,
  meta: item.meta || {},
}))

export const router = createRouter({
  routes,
})

export function setupRouter(app: App) {
  app.use(router)

  return app
}
