/**
 * 获取窗口信息
 */
export const getWindowInfo = (() => {
  let windowInfo: UniApp.GetWindowInfoResult | null = null

  return () => {
    if (!windowInfo) {
      windowInfo = uni.getWindowInfo()
    }
    return windowInfo
  }
})()

/**
 * 获取胶囊按钮信息
 */
export const getMenuButtonBoundingClientRect = (() => {
  let menuButtonBoundingClientRect: UniApp.GetMenuButtonBoundingClientRectRes | null = null

  return () => {
    // #ifdef MP
    if (!menuButtonBoundingClientRect) {
      menuButtonBoundingClientRect = uni.getMenuButtonBoundingClientRect()
    }
    // #endif

    return menuButtonBoundingClientRect
  }
})()

/**
 * 获取设备信息
 */
export const getDeviceInfo = (() => {
  let deviceInfo: UniNamespace.GetDeviceInfoResult | null = null

  return () => {
    if (!deviceInfo) {
      deviceInfo = uni.getDeviceInfo()
    }

    return deviceInfo
  }
})()

export function getSuffix(filePath: string): string {
  return filePath?.split?.('.')?.pop() || ''
}
