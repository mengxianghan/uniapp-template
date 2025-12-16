<script setup lang="ts">
import { useUserStore } from '@/store'
import { showToast, sleep, switchTabToIndex } from '@/utils'

const userStore = useUserStore()

async function handleLogin() {
  userStore.setUserInfo({
    username: 'mock-name',
  })
  userStore.setToken('mock-token')
  showToast('登录成功')
  await sleep(1000)
  switchTabToIndex()
}
</script>

<template>
  <x-container custom-class="flex items-center justify-center">
    <view @click="handleLogin">
      登录
    </view>
  </x-container>
</template>

<style scoped lang="scss">

</style>
