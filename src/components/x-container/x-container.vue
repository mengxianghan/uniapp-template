<script setup lang="ts">
import type { ContainerProps, ContainerSlots } from './common'
import { useSlots } from 'vue'
import { cn } from '@/utils'
import { defaultContainerProps } from './common'

defineOptions({
  name: 'XContainer',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(
  defineProps<ContainerProps>(),
  defaultContainerProps,
)

defineSlots<ContainerSlots>()

const slots = useSlots()
</script>

<template>
  <view
    :class="cn(
      'relative x-container-root',
      props.fixedHeight && 'x-container-root--fixed-height overflow-hidden',
      slots.footer && 'flex flex-col',
      classes?.root,
    )"
    :style="styles?.root"
  >
    <!-- 背景图 -->
    <image
      v-if="backgroundImage"
      class="fixed left-0 top-0 w-full pointer-events-none"
      :src="backgroundImage"
      mode="widthFix"
    />
    <view
      v-if="slots.header"
      class="z-[9999] relative"
      :class="classes?.header"
      :style="styles?.header"
    >
      <slot
        name="header"
        :background-image="backgroundImage"
      />
    </view>

    <view
      :class="cn(
        'z-10 relative',
        (props.fixedHeight || slots.footer) && 'flex-1',
        props.fixedHeight && 'overflow-y-auto',
        classes?.body,
      )"
      :style="styles?.body"
    >
      <slot />
    </view>

    <view
      v-if="slots.footer"
      class="relative"
      :class="classes?.footer"
      :style="styles?.footer"
    >
      <slot name="footer" />
    </view>

    <!-- 底部安全区占位 -->
    <x-safe-area v-if="props.safeAreaBottom" />
  </view>
</template>

<style scoped lang="scss">
// 高度基准 = 可视窗口 - 导航栏占位（--window-top）- tabBar 占位（--window-bottom）
// H5 端由 uni-app 注入这两个变量；小程序端 vh 本身已排除导航栏/tabBar，变量为 0
// 100dvh 为 H5 移动端浏览器回退（地址栏动态收缩），小程序端忽略不认识的声明
.x-container-root {
  min-height: calc(100vh - var(--window-top, 0px) - var(--window-bottom, 0px));
  min-height: calc(100dvh - var(--window-top, 0px) - var(--window-bottom, 0px));

  &--fixed-height {
    min-height: 0;
    height: calc(100vh - var(--window-top, 0px) - var(--window-bottom, 0px));
    height: calc(100dvh - var(--window-top, 0px) - var(--window-bottom, 0px));
  }
}
</style>
