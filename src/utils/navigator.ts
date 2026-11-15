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

export function navigateTo(path: string) {
  router.navigateTo({
    path,
  })
}

export function navigateToLogin() {
  router.navigateTo({
    path: '/subpackages/user/pages/login/index',
  })
}

export function navigateToUserInfo() {
  router.navigateTo({
    path: '/subpackages/user/pages/info/index',
  })
}

export function navigateToFeedbackTest() {
  router.navigateTo({
    path: '/subpackages/user/pages/feedback-test/index',
  })
}

export function navigateToContainerTest() {
  router.navigateTo({
    path: '/subpackages/user/pages/container-test/index',
  })
}
