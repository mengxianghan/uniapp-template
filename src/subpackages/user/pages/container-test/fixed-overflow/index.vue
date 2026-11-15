<script setup lang="ts">
const lines = Array.from({ length: 50 }, (_, i) => `溢出测试行 ${i + 1}`)
</script>

<template>
  <!-- 预期：容器高度固定一屏，body 区域内部滚动，底部按钮始终可见不被内容挤走 -->
  <x-container
    fixed-height
    :classes="{ root: 'border-2 border-dashed border-green-400' }"
  >
    <view class="p-3">
      <view
        v-for="line in lines"
        :key="line"
        class="py-1"
      >
        {{ line }}
      </view>
    </view>
    <template #footer>
      <view class="p-3 bg-white">
        <wd-button
          type="success"
          block
        >
          底部按钮应始终可见
        </wd-button>
      </view>
    </template>
  </x-container>
</template>

<style scoped lang="scss">

</style>
