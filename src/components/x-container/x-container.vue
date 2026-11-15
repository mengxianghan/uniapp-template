<script setup lang="ts">
import type { ContainerProps, ContainerSlots } from './common'
import { computed, type CSSProperties, useSlots } from 'vue'
import pagesJson from '@/pages.json'
import { cn, getWindowInfo } from '@/utils'
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

// uni-app H5 的 --window-bottom 全局生效（恒等于 tabBar 高度），与当前页面是否有 tabBar 无关，需按当前路由判断
const tabBarPaths = (pagesJson.tabBar?.list ?? []).map((item: { pagePath: string }) => `/${item.pagePath}`)

function isTabBarPage() {
  const pages = getCurrentPages()
  const current = pages[pages.length - 1]
  return current ? tabBarPaths.includes(`/${current.route}`) : false
}

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  const { windowHeight } = getWindowInfo()

  let height = ''

  // H5 端 windowHeight 包含模拟导航栏/tabBar，需扣除；小程序端 windowHeight 已是可视高度
  // #ifdef H5
  const tabBarHeight = isTabBarPage() ? ' - var(--window-bottom, 0px)' : ''
  height = `calc(${windowHeight}px - var(--window-top, 0px)${tabBarHeight})`
  // #endif

  // #ifndef H5
  height = `${windowHeight}px`
  // #endif

  if (props.fixedHeight) {
    style.height = height
  }
  else {
    style.minHeight = height
  }

  return style
})
</script>

<template>
  <view
    :class="cn(
      'relative',
      props.fixedHeight && 'overflow-hidden',
      slots.footer && 'flex flex-col',
      classes?.root,
    )"
    :style="[rootStyle, styles?.root]"
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
      class="z-10 relative"
      :class="classes?.footer"
      :style="styles?.footer"
    >
      <slot name="footer" />
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
