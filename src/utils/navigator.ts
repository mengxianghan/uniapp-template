import { router } from '@/router'

/**
 * 页面级导航方法：每个目标页面一个独立导出函数，参数统一为 query 对象（可选字段、便于扩展）。
 * 内部直接调 router.navigateTo / router.switchTab（@/router 的 uni-vant-router 实例，
 * 原生支持 query 对象，值可为 string / number / 数组，由 router 拼 querystring）。
 * 页面/组件内不拼路径、不内联 navigateTo；新增页面时在此补对应方法，并在 pages.json 注册同名路由。
 */

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
