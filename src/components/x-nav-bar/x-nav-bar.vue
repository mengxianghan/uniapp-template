<script setup lang="ts">
import { normalizeStyle } from 'vue'
import { computed, type CSSProperties, useSlots } from 'vue'
import { cn, getMenuButtonBoundingClientRect, getWindowInfo } from '@/utils'
import { defaultNavBarProps, type NavBarEmits, type NavBarProps } from './common'

defineOptions({
  name: 'XNavBar',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(
  defineProps<NavBarProps>(),
  defaultNavBarProps,
)

const emit = defineEmits<NavBarEmits>()

const slots = useSlots()

const pages = getCurrentPages()

const padding = computed(() => {
  const { windowWidth = 0 } = getWindowInfo()
  let left = 12
  let right = 12

  // #ifdef MP
  const { left: menuButtonLeft, width } = getMenuButtonBoundingClientRect()
  left = windowWidth - menuButtonLeft - width
  right = windowWidth - menuButtonLeft + left
  // #endif

  return {
    left,
    right,
  }
})

const statusBarHeight = computed(() => {
  return getWindowInfo().statusBarHeight
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

  const { statusBarHeight = 0 } = getWindowInfo()

  style.paddingTop = `${statusBarHeight}px`
  style.height = `${navBarHeight.value}px`

  if (props.backgroundImage) {
    style.background = `url(${props.backgroundImage}) no-repeat center top/100% auto`
  }

  return style
})

const leftStyle = computed(() => {
  const style: CSSProperties = {
    paddingLeft: `${padding.value?.left}px`,
  }

  return style
})

const rightStyle = computed(() => {
  const style: CSSProperties = {
    paddingRight: `${padding.value?.right}px`,
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
      :class="cn(
        'w-screen',
        {
          'fixed top-0 left-0 right-0 z-[9999]': fixed,
        },
        classes?.root,
      )"
      :style="normalizeStyle([navbarInnerStyle, styles?.root])"
    >
      <view class="w-full h-full relative flex items-center justify-center">
        <!-- 左侧 -->
        <template v-if="showLeft">
          <view
            class="absolute top-0 bottom-0 left-0 z-10 flex items-center justify-center"
            :class="classes?.left"
            :style="leftStyle"
          >
            <slot name="left">
              <view
                class="flex items-center justify-center relative"
                @click="handleBack"
              >
                <text
                  :class="cn(
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
            :class="classes?.title"
          >
            <slot>
              {{ title }}
            </slot>
          </view>
        </template>
        <!-- 右侧 -->
        <template v-if="showRight">
          <view
            :class="cn('absolute top-0 bottom-0 right-0 z-10 flex items-center justify-center', classes?.right)"
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
