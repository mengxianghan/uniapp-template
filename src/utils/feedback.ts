export function showToast(options: UniApp.ShowToastOptions | string) {
  options = typeof options === 'string' ? { title: options } : options
  uni.showToast({
    duration: 1500,
    mask: true,
    icon: 'none',
    ...options,
  })
}

export const hideToast = uni.hideToast

export function showModal(options: UniApp.ShowModalOptions | string) {
  options = typeof options === 'string' ? { content: options } : options
  uni.showModal({
    // confirmColor: '#FF8484',
    ...options,
  })
}

export function showLoading(options?: UniApp.ShowLoadingOptions | string) {
  options = typeof options === 'string' ? { title: options } : options
  uni.showLoading({
    mask: true,
    ...(options || {}),
  })
}

export const hideLoading = uni.hideLoading
