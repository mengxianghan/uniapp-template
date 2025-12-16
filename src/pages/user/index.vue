<script setup lang="ts">
import { onTabItemTap } from '@dcloudio/uni-app'
import { useRouter } from 'uni-vant-router'
import { useUserStore } from '@/store'
import { navigateToLogin, navigateToUserInfo } from '@/utils'

const router = useRouter()

const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
}

onTabItemTap(() => {
  router.tabItemShow()
})
</script>

<template>
  <view class="min-h-screen flex flex-col items-center justify-center">
    <template v-if="userStore.isLogin">
      <view @click="handleLogout">
        退出登录
      </view>
    </template>

    <template v-else>
      <view @click="navigateToLogin">
        点击登录
      </view>
    </template>

    <view
      class="mt-4"
      @click="navigateToUserInfo"
    >
      用户信息（验证登录）
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
