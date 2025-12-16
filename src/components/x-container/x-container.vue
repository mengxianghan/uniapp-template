<script setup lang="ts">
import type { ContainerProps } from './common'
import { useSlots } from 'vue'
import { clsx } from '@/utils'
import { defaultContainerProps } from './common'

withDefaults(
  defineProps<ContainerProps>(),
  defaultContainerProps,
)

const slots = useSlots()
</script>

<template>
  <view
    :class="clsx(
      'min-h-screen',
      customClass,
    )"
  >
    <image
      v-if="backgroundImage"
      class="fixed left-0 top-0 w-full"
      :src="backgroundImage"
      mode="widthFix"
    />
    <view
      v-if="slots.header"
      class="z-[9999] relative"
    >
      <slot name="header" />
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
