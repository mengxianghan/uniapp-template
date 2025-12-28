<script setup lang="ts">
import type { NavBarEmits, NavBarProps } from './common'
import { normalizeStyle } from 'vue'
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

const paddingHorizontal = computed(() => {
  const { windowWidth = 0 } = getSystemInfo()
  let paddingHorizontal = 0

  // #ifdef MP
  const { left, width } = getMenuButtonBoundingClientRect()
  paddingHorizontal = windowWidth - left - width
  // #endif

  // #ifndef MP
  paddingHorizontal = 12
  // #endif

  return paddingHorizontal
})

const statusBarHeight = computed(() => {
  return getSystemInfo().statusBarHeight as number
})

const menuBarHeight = computed(() => {
  let height = 0

  // #ifdef MP
  const { top: menuButtonTop, height: menuButtonHeight } = getMenuButtonBoundingClientRect()
  height = menuButtonHeight + (menuButtonTop - statusBarHeight.value) * 2
  // #endif

  // #ifdef WEB || APP
  height = 44
  // #endif

  return height
})

const navBarHeight = computed<number>(() => menuBarHeight.value + statusBarHeight.value)

const navBarStyle = computed(() => {
  const style: CSSProperties = {}

  if (!props.placeholder) {
    return style
  }

  style.height = `${navBarHeight.value}px`

  return style
})

const navbarInnerStyle = computed(() => {
  const style: CSSProperties = {}

  const { statusBarHeight = 0 } = getSystemInfo()

  style.paddingTop = `${statusBarHeight}px`
  style.height = `${navBarHeight.value}px`

  if (props.backgroundImage) {
    style.background = `url(${props.backgroundImage}) no-repeat center top/100% auto`
  }

  return style
})

const leftStyle = computed(() => {
  const style: CSSProperties = {
    paddingLeft: `${paddingHorizontal.value}px`,
  }

  return style
})

const rightStyle = computed(() => {
  const style: CSSProperties = {
    paddingRight: `${paddingHorizontal.value}px`,
  }

  return style
})

const showLeft = computed(() => slots.left || props.showBack)
const showTitle = computed(() => slots.default || props.title)
const showRight = computed(() => slots.right)

function handleBack() {
  emit('click-back')
}
</script>

<template>
  <view :style="navBarStyle">
    <view
      :class="clsx(
        'w-screen',
        {
          'fixed top-0 left-0 right-0 z-[9999]': fixed,
        },
        customClass,
      )"
      :style="normalizeStyle([navbarInnerStyle, customStyle])"
    >
      <view class="w-full h-full relative flex items-center justify-center">
        <!-- 左侧 -->
        <template v-if="showLeft">
          <view
            class="absolute top-0 bottom-0 left-0 z-10 flex items-center justify-center"
            :class="leftClass"
            :style="leftStyle"
          >
            <slot name="left">
              <view
                class="flex items-center justify-center relative"
                @click="handleBack"
              >
                <text
                  :class="clsx(
                    'iconify text-2xl',
                    pages.length > 1 && 'weui--back-filled',
                    pages.length === 1 && 'weui--home-outlined',
                  )"
                />
                <text class="size-8 absolute" />
              </view>
            </slot>
          </view>
        </template>
        <!-- 中间 -->
        <template v-if="showTitle">
          <view
            class="text-[17px] font-medium text-heading text-center max-w-[60%] mx-auto"
            :class="titleClass"
          >
            <slot>
              {{ title }}
            </slot>
          </view>
        </template>
        <!-- 右侧 -->
        <template v-if="showRight">
          <view
            :class="clsx('absolute top-0 bottom-0 right-0 z-10 flex items-center justify-center', rightClass)"
            :style="rightStyle"
          >
            <slot name="right" />
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
