import { createRouter, type IRouteLocationNormalized, type IRouteRecord } from 'uni-vant-router'
import pages from '@/pages.json'
import { useUserStore } from '@/store'

const routes = pages.pages.map((item: IRouteRecord) => ({
  path: `/${item.path}`,
  meta: item.meta || {},
}))

export const router = createRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 需要登录 & 未登录
  if (to.meta?.requiresAuth && !userStore.isLogin) {
    let openType: IRouteLocationNormalized['openType'] = 'navigateTo'

    if (to.openType === 'reLaunch') {
      openType = 'reLaunch'
    }

    if (to.openType === 'switchTab') {
      openType = 'redirectTo'
    }

    next({
      path: '/pages/user/login/index',
      openType,
    })
    return
  }

  next()
})
