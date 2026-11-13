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

  if (props.position === 'top') {
    style.top = 0
  }

  if (props.position === 'bottom') {
    style.bottom = 0
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
