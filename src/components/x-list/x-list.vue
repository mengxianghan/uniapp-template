<script lang="ts" setup>
import type { ListEmits, ListProps } from './common'
import { nextTick, onMounted, watch } from 'vue'
import { debounce } from '@/utils'
import { defaultListProps } from './common'

const props = withDefaults(
  defineProps<ListProps>(),
  defaultListProps,
)

const emit = defineEmits<ListEmits>()

const windowInfo = uni.getWindowInfo()

watch(() => [
  props.finished,
  props.error,
  props.loading,
], debounce(check, 100))

onMounted(() => {
  if (props.immediateCheck) {
    check()
  }
})

function check() {
  nextTick(() => {
    if (props.loading || props.finished || props.disabled || props.error) {
      return
    }

    const query = uni.createSelectorQuery().select(props.container)
    query.boundingClientRect((result) => {
      let nodeInfo: UniApp.NodeInfo = result as UniApp.NodeInfo
      if (!result) {
        return
      }
      if (Array.isArray(result)) {
        nodeInfo = result[0]
      }

      const offset = +props.offset - (nodeInfo.top ?? 0)
      const height = nodeInfo.height ?? 0

      if (height - windowInfo.windowHeight >= offset) {
        return
      }

      emit('update:loading', true)

      if (typeof props.loadData === 'function') {
        props.loadData()
      }
    }).exec()
  })
}

function handleErrorText() {
  emit('update:error', false)
  check()
}

function reachBottom() {
  if (props.loading || props.finished || props.disabled || props.error) {
    return
  }

  emit('update:loading', true)

  if (typeof props.loadData === 'function') {
    props.loadData()
  }
}

defineExpose({
  reachBottom,
})
</script>

<template>
  <view
    class="x-list"
    :class="props.customClass"
    :style="props.customStyle"
  >
    <view class="x-list__content">
      <slot />
    </view>
    <template v-if="error">
      <view
        class="x-list__error-text"
        @click="handleErrorText"
      >
        <slot name="error">
          {{ errorText }}
        </slot>
      </view>
    </template>
    <template v-if="finished">
      <view class="x-list__finished-text">
        <template v-if="useFinishedSlot">
          <slot name="finished">
            {{ finishedText }}
          </slot>
        </template>
        <template v-else>
          {{ finishedText }}
        </template>
      </view>
    </template>
    <template v-if="loading">
      <view class="x-list__loading-text">
        <slot name="loading">
          {{ loadingText }}
        </slot>
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.x-list {
  &__loading-text,
  &__finished-text,
  &__error-text {
    padding: 12px 0;
    text-align: center;
    line-height: 24px;
    color: theme('textColor.tertiary');
    font-size: 12px;
  }
}
</style>
