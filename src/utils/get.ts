let systemInfo: UniApp.GetSystemInfoResult | null = null

/**
 * 获取系统信息
 */
export function getSystemInfo(): UniApp.GetSystemInfoResult {
  if (!systemInfo) {
    systemInfo = uni.getSystemInfoSync()
  }
  return systemInfo
}

let windowInfo: UniApp.GetWindowInfoResult | null = null

/**
 * 获取窗口信息
 */
export function getWindowInfo(): UniApp.GetWindowInfoResult {
  if (!windowInfo) {
    windowInfo = uni.getWindowInfo()
  }
  return windowInfo
}

let menuButtonBoundingClientRect: UniApp.GetMenuButtonBoundingClientRectRes | null = null
/**
 * 获取胶囊按钮信息
 */
export function getMenuButtonBoundingClientRect(): UniApp.GetMenuButtonBoundingClientRectRes {
  // #ifdef MP
  if (!menuButtonBoundingClientRect) {
    menuButtonBoundingClientRect = uni.getMenuButtonBoundingClientRect()
  }
  // #endif

  return menuButtonBoundingClientRect
}

let deviceInfo: UniNamespace.GetDeviceInfoResult | null = null

/**
 * 获取设备信息
 */
export function getDeviceInfo(): UniNamespace.GetDeviceInfoResult {
  if (!deviceInfo) {
    deviceInfo = uni.getDeviceInfo()
  }

  return deviceInfo
}

export function getSuffix(filePath: string): string {
  return filePath?.split?.('.')?.pop() || ''
}
