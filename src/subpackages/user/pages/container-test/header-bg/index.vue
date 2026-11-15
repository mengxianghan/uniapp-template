<script setup lang="ts">
// 背景图测试用网络图片，避免向模板仓库新增静态资源
const backgroundImage = 'https://placehold.co/750x400'
</script>

<template>
  <!-- 预期：header 与 body 都渲染在背景图之上，header 通过作用域插槽拿到 backgroundImage -->
  <x-container :background-image="backgroundImage">
    <template #header="{ backgroundImage: bg }">
      <view class="p-3">
        <view class="text-white font-bold drop-shadow">
          header 内容（背景图：{{ bg ? '已传入' : '未传入' }}）
        </view>
      </view>
    </template>
    <view class="p-3 bg-white/80">
      body 内容应位于背景图之上。
    </view>
  </x-container>
</template>

<style scoped lang="scss">

</style>
