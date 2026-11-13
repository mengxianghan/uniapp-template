<script setup lang="ts">
import type { OnAppReadyCallbackOption } from '@/types/app'
import { onShow, onTabItemTap } from '@dcloudio/uni-app'
import { useRouter } from 'uni-vant-router'
import { ref } from 'vue'
import { navigateToFeedbackTest, onAppReady } from '@/utils'

const router = useRouter()

const welcome = ref('')

onShow(() => {
  onAppReady((option: OnAppReadyCallbackOption) => {
    welcome.value = option.isLogin ? '欢迎回来' : '欢迎使用 uniapp template，当前未登录'
  })
})

onTabItemTap(() => {
  router.tabItemShow()
})
</script>

<template>
  <x-container :classes="{ body: 'flex flex-col items-center' }">
    <image
      src="/static/logo.svg"
      class="w-[120px]"
    />
    <view>
      {{ welcome }}
    </view>
    <wd-button
      class="mt-6"
      type="primary"
      @click="navigateToFeedbackTest"
    >
      反馈组件样式测试
    </wd-button>
  </x-container>
</template>

<style lang="scss" scoped>
</style>
