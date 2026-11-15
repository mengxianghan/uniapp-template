<script setup lang="ts">
import { navigateTo } from '@/utils'

const pages = [
  { path: '/subpackages/user/pages/container-test/default/index', label: '默认模式（min-height 至少一屏）' },
  { path: '/subpackages/user/pages/container-test/fixed-footer/index', label: 'fixed-height + footer（贴底）' },
  { path: '/subpackages/user/pages/container-test/fixed-overflow/index', label: 'fixed-height + footer + 内容溢出（内部滚动）' },
  { path: '/subpackages/user/pages/container-test/header-bg/index', label: 'header slot + background-image' },
  { path: '/subpackages/user/pages/container-test/classes-styles/index', label: 'classes / styles 透传' },
]
</script>

<template>
  <x-container>
    <view class="p-3 space-y-3">
      <view
        v-for="item in pages"
        :key="item.path"
      >
        <wd-button
          block
          @click="navigateTo(item.path)"
        >
          {{ item.label }}
        </wd-button>
      </view>
    </view>
  </x-container>
</template>

<style scoped lang="scss">

</style>
