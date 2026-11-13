<script setup lang="ts">
import type { ContainerProps, ContainerSlots } from './common'
import { computed, type CSSProperties, useSlots } from 'vue'
import { cn, getWindowInfo } from '@/utils'
import { defaultContainerProps } from './common'

defineOptions({
  name: 'XContainer',
  options: {
    virtualHost: true,
  },
})

withDefaults(
  defineProps<ContainerProps>(),
  defaultContainerProps,
)

defineSlots<ContainerSlots>()

const slots = useSlots()

const rootStyle = computed(() => {
  const style: CSSProperties = {}

  const { windowHeight } = getWindowInfo()

  style.minHeight = `${windowHeight}px`

  return style
})
</script>

<template>
  <view
    :class="cn(
      'relative',
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
        classes?.body,
      )"
      :style="styles?.body"
    >
      <slot />
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
