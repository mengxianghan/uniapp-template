<script setup lang="ts">
import type { FixedProps, FixedSlots } from './common'
import { uniqueId } from 'lodash-es'
import {
  computed,
  type CSSProperties,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
} from 'vue'
import { cn } from '@/utils'
import { defaultFixedProps } from './common'

defineOptions({
  name: 'XFixed',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(
  defineProps<FixedProps>(),
  defaultFixedProps,
)

defineSlots<FixedSlots>()

const instance = getCurrentInstance()

const id = ref(uniqueId('j-x-fixed-'))
const height = ref<number>()

const fixedStyle = computed(() => {
  const style: CSSProperties = {}

  if (props.placeholder && height.value) {
    style.height = `${height.value}px`
  }

  return style
})

const fixedInnerStyle = computed(() => {
  const style: CSSProperties = {}

  // H5 端 --window-top = 导航栏高度，避免被模拟 navbar 遮住；小程序端为 0
  if (props.position === 'top') {
    style.top = 'var(--window-top, 0px)'
  }

  // H5 端 --window-bottom = tabBar 高度，避免被模拟 tabBar 遮住；无 tabBar 页面为 0
  if (props.position === 'bottom') {
    style.bottom = 'var(--window-bottom, 0px)'
  }

  if (props.safeAreaInsetBottom) {
    style.paddingBottom = 'env(safe-area-inset-bottom)'
  }

  return style
})

onMounted(() => {
  calculateHeight()
})

function calculateHeight() {
  nextTick(() => {
    uni.createSelectorQuery().in(instance).select(`.${id.value}`).boundingClientRect((res) => {
      const node = Array.isArray(res) ? res[0] : res
      height.value = node.height
    }).exec()
  })
}

defineExpose({
  update: calculateHeight,
})
</script>

<template>
  <view
    :class="classes?.root"
    :style="[fixedStyle, styles?.root]"
  >
    <view
      :class="cn([
        id,
        { 'fixed left-0 right-0 z-[100]': !disabled },
        classes?.fixed,
      ])"
      :style="[fixedInnerStyle, styles?.fixed]"
    >
      <view
        :class="cn(classes?.content)"
        :style="styles?.content"
      >
        <slot />
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
