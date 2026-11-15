<script setup lang="ts">
</script>

<template>
  <!-- 预期：容器虚线边框撑满一屏可视高度（H5 下不超出导航栏+tabBar 之间的区域），内容超高时可继续伸长 -->
  <x-container :classes="{ root: 'border-2 border-dashed border-red-400' }">
    <view class="p-3">
      内容很短，但容器应至少为一屏可视高度；继续追加内容时容器随之伸长。
    </view>
  </x-container>
</template>

<style scoped lang="scss">

</style>
