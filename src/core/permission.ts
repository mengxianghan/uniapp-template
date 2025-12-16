import type { IRouteLocationNormalized } from 'uni-vant-router'
import { router } from '@/router'
import { useUserStore } from '@/store'

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
