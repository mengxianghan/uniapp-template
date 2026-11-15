<script setup lang="ts">
</script>

<template>
  <!-- 预期：root 虚线边框 + 固定一屏高；body 橙色背景、footer 紫色背景，均带 12px 内边距 -->
  <x-container
    fixed-height
    :classes="{
      root: 'border-2 border-dashed border-purple-400',
      body: 'bg-orange-100',
      footer: 'bg-purple-200',
    }"
    :styles="{
      body: { padding: '12px' },
      footer: { padding: '12px' },
    }"
  >
    <view>body：橙色背景 + 12px 内边距（来自 classes.body + styles.body）。</view>
    <template #footer>
      <view>footer：紫色背景 + 12px 内边距（来自 classes.footer + styles.footer）。</view>
    </template>
  </x-container>
</template>

<style scoped lang="scss">

</style>
