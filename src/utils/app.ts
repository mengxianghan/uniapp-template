import type { OnAppReadyCallback } from '@/types/app'
import { useAppStore, useUserStore } from '@/store'
import { emitter } from './event-bus'

const EMIT_NAME = 'app:ready'

export function onAppInit() {
  const userStore = useUserStore()
  emitter.emit(
    EMIT_NAME,
    {
      isLogin: userStore.isLogin,
    },
  )
}

export function onAppReady(callback: OnAppReadyCallback) {
  const appStore = useAppStore()

  emitter.once(EMIT_NAME, callback)

  // 如果已经完成了初始化，则直接执行回调
  if (appStore.completed) {
    onAppInit()
  }
}
