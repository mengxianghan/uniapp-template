<script setup lang="ts">
import type { NavBarEmits, NavBarProps } from './common'
import { computed, type CSSProperties, useSlots } from 'vue'
import { clsx, getMenuButtonBoundingClientRect, getSystemInfo } from '@/utils'

defineOptions({
  name: 'XNavBar',
  options: {
    virtualHost: true,
  },
})

const props = defineProps<NavBarProps>()

const emit = defineEmits<NavBarEmits>()

const slots = useSlots()

const pages = getCurrentPages()

// const paddingHorizontal = computed(() => {
//   const { windowWidth = 0 } = getSystemInfo()
//   const { left, width } = getMenuButtonBoundingClientRect()
//   return windowWidth - left - width
// })

const navbarHeight = computed<number>(() => {
  const { statusBarHeight = 0 } = getSystemInfo()
  const { top, height } = getMenuButtonBoundingClientRect()

  return height + statusBarHeight + (top - statusBarHeight) * 2
})

const navbarStyle = computed(() => {
  const style: CSSProperties = {}

  if (!props.placeholder) {
    return style
  }

  const { statusBarHeight = 0 } = getSystemInfo()

  style.height = `${statusBarHeight + navbarHeight.value}px`

  return style
})

const navbarInnerStyle = computed(() => {
  const style: CSSProperties = {}

  const { statusBarHeight = 0 } = getSystemInfo()

  style.paddingTop = `${statusBarHeight}px`
  style.height = `${navbarHeight.value}px`

  return style
})

// const leftStyle = computed(() => {
//   const style: CSSProperties = {
//     paddingLeft: `${paddingHorizontal.value}px`,
//     paddingRight: `${paddingHorizontal.value}px`,
//   }
//
//   return style
// })

const showLeft = computed(() => slots.left || props.leftArrow)

const showTitle = computed(() => slots.title || props.title)

function handleLeft() {
  emit('click-left')
}
</script>

<template>
  <view :style="navbarStyle">
    <view
      :class="clsx(
        customClass,
        {
          'fixed top-0 left-0 right-0 z-[9999]': fixed,
        },
      )"
      :style="navbarInnerStyle"
    >
      <view class="h-full relative flex items-center justify-center">
        <template v-if="showLeft">
          <!-- left -->
          <view
            class="absolute top-0 bottom-0 flex items-center justify-center left-0 pl-3"
            :class="leftClass"
            @click="handleLeft"
          >
            <slot name="left">
              <view class="h-full flex items-center justify-center relative">
                <text
                  :class="clsx(
                    'iconify text-2xl',
                    pages.length > 1 && 'weui--back-filled',
                    pages.length === 1 && 'weui--home-outlined',
                    leftArrowClass,
                  )"
                />
                <template v-if="leftText">
                  <text class="ml-0.5">
                    {{ leftText }}
                  </text>
                </template>
                <text class="size-6 absolute" />
              </view>
            </slot>
          </view>
        </template>
        <template v-if="showTitle">
          <view
            class="text-[17px] font-bold text-heading text-center max-w-[60%] mx-auto"
            :class="titleClass"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
