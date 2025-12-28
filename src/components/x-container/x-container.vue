<script setup lang="ts">
import type { ContainerProps } from './common'
import { computed, type CSSProperties, useSlots } from 'vue'
import { clsx } from '@/utils'
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

const slots = useSlots()

const rootStyle = computed(() => {
  const style: CSSProperties = {}

  const { windowHeight } = uni.getSystemInfoSync()

  style.minHeight = `${windowHeight}px`

  return style
})
</script>

<template>
  <view
    :class="clsx(
      'relative',
      customClass,
    )"
    :style="rootStyle"
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
    >
      <slot
        name="header"
        :background-image="backgroundImage"
      />
    </view>

    <view
      :class="clsx(
        'z-10 relative',
        bodyClass,
      )"
    >
      <slot />
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
