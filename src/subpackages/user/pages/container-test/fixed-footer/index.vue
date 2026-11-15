<script setup lang="ts">
</script>

<template>
  <!-- 预期：容器高度恰好一屏（H5 扣除导航栏/tabBar），body 内容很少时 footer 贴在容器底部 -->
  <x-container
    fixed-height
    :classes="{ root: 'border-2 border-dashed border-blue-400' }"
  >
    <view class="p-3">
      body 内容很少，下方「提交」按钮应贴在容器底部。
    </view>
    <template #footer>
      <view class="p-3 bg-white">
        <wd-button
          type="primary"
          block
        >
          提交
        </wd-button>
      </view>
    </template>
  </x-container>
</template>

<style scoped lang="scss">

</style>
