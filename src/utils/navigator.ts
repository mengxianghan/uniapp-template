import { router } from '@/router'

export function navigateBack() {
  const pages = getCurrentPages()
  if (pages.length === 1) {
    switchTabToIndex()
    return
  }
  router.navigateBack()
}

export function switchTabToIndex() {
  router.switchTab({
    path: '/pages/index/index',
  })
}

export function navigateToLogin() {
  router.navigateTo({
    path: '/pages/user/login/index',
  })
}

export function navigateToUserInfo() {
  router.navigateTo({
    path: '/pages/user/info/index',
  })
}
