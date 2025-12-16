let systemInfo: UniApp.GetSystemInfoResult | null = null
export function getSystemInfo(): UniApp.GetSystemInfoResult {
  if (!systemInfo) {
    systemInfo = uni.getSystemInfoSync()
  }
  return systemInfo
}

let menuButtonBoundingClientRect: UniApp.GetMenuButtonBoundingClientRectRes | null = null
export function getMenuButtonBoundingClientRect(): UniApp.GetMenuButtonBoundingClientRectRes {
  if (!menuButtonBoundingClientRect) {
    menuButtonBoundingClientRect = uni.getMenuButtonBoundingClientRect()
  }

  return menuButtonBoundingClientRect
}

export function getSuffix(filePath: string): string {
  return filePath?.split?.('.')?.pop() || ''
}

let deviceInfo: UniNamespace.GetDeviceInfoResult | null = null
export function getDeviceInfo(key?: keyof UniNamespace.GetDeviceInfoResult) {
  if (!deviceInfo) {
    deviceInfo = uni.getDeviceInfo()
  }

  if (key) {
    return deviceInfo[key]
  }

  return deviceInfo
}
