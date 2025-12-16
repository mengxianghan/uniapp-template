<script setup lang="ts">
import { onTabItemTap } from '@dcloudio/uni-app'
import { useRouter } from 'uni-vant-router'

const router = useRouter()

onTabItemTap(() => {
  router.tabItemShow()
})
</script>

<template>
  <view>
    购物车，校验登录状态
  </view>
</template>

<style scoped lang="scss">

</style>
