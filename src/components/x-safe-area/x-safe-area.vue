<script setup lang="ts">
import type { SafeAreaProps } from './common'
import { computed, type CSSProperties } from 'vue'
import { cn } from '@/utils'
import { defaultSafeAreaProps } from './common'

defineOptions({
  name: 'XSafeArea',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(
  defineProps<SafeAreaProps>(),
  defaultSafeAreaProps,
)

const rootStyle = computed(() => {
  const style: CSSProperties = {}

  style.height = props.position === 'top' ? 'env(safe-area-inset-top)' : 'env(safe-area-inset-bottom)'

  return style
})
</script>

<template>
  <view
    :class="cn('w-full shrink-0', classes?.root)"
    :style="[rootStyle, styles?.root]"
  />
</template>

<style scoped lang="scss">

</style>
