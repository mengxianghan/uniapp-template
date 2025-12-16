<script setup lang="ts">
import type { ModalEmits, ModalProps } from './common'
import { computed, ref, useSlots } from 'vue'
import { callInterceptor, clsx, isEmpty } from '@/utils'
import { defaultModalProps } from './common'

const props = withDefaults(
  defineProps<ModalProps>(),
  defaultModalProps,
)

const emit = defineEmits<ModalEmits>()

const slots = useSlots()

const show = defineModel<boolean>('show', { default: false })

const state = ref<ModalProps | null>(props)

const showButton = computed(() => {
  return state.value?.showConfirmButton || state.value?.showCancelButton || slots.footer
})
const showTitle = computed(() => {
  return !isEmpty(state.value?.title) || slots.title
})
const showContent = computed(() => {
  return !isEmpty(state.value?.content) || slots.default
})
const showClose = computed(() => {
  return state.value?.closeable
})

function open(options: ModalProps) {
  state.value = {
    ...props,
    ...(options || {}),
  }
  show.value = true
}

async function handleConfirm() {
  callInterceptor(
    props.beforeClose,
    {
      done: () => {
        show.value = false

        if (typeof state.value?.onConfirm === 'function') {
          state.value?.onConfirm()
        }

        emit('confirm')
      },
    },
  )
}

function handleCancel() {
  show.value = false

  if (typeof state.value?.onCancel === 'function') {
    state.value?.onCancel()
  }

  emit('cancel')
}

defineExpose({
  open,
  close: handleCancel,
})
</script>

<template>
  <wd-popup
    v-model="show"
    :z-index="1000"
    :close-on-click-modal="false"
  >
    <view
      :class="clsx(
        'bg-[linear-gradient(164deg,#DDE8FF_0%,#F0F3F9_27%,#FFFFFF_100%)] w-[300px] rounded-xl relative overflow-hidden shadow-[0px_2px_12px_0px_rgba(44,44,44,0.24)]',
        state?.customClass,
      )"
    >
      <!-- 关闭按钮 -->
      <template v-if="showClose">
        <view
          class="w-6 h-6 flex items-center justify-center absolute right-2 top-2 z-20 text-tertiary text-lg"
          @click="handleCancel"
        >
          <text class="iconify tdesign--close" />
        </view>
      </template>
      <view class="relative z-10">
        <!-- 标题 -->
        <template v-if="showTitle">
          <view
            :class="clsx(
              'text-base font-medium text-center pt-6',
              showClose && 'pt-8',
              !showContent && showButton && 'pb-6',
            )"
          >
            <slot name="title">
              {{ state?.title }}
            </slot>
          </view>
        </template>
        <!-- 内容 -->
        <template v-if="showContent">
          <view
            :class="clsx(
              'text-sm text-center px-5 pt-3 pb-7',
              !showTitle && 'py-6',
              showClose && !showTitle && 'pt-8',
              !showButton && 'pb-6',
            )"
          >
            <slot>
              <rich-text :nodes="state?.content" />
            </slot>
          </view>
        </template>
        <!-- 按钮 -->
        <template v-if="showButton">
          <slot name="footer">
            <view class="flex items-center gap-3 px-6 pb-7">
              <!-- 取消按钮 -->
              <template v-if="state?.showCancelButton">
                <view
                  class="btn btn--round flex-1"
                  @click="handleCancel"
                >
                  {{ state?.cancelButtonText }}
                </view>
              </template>
              <!-- 确定按钮 -->
              <template v-if="state?.showConfirmButton">
                <button
                  class="btn btn--round btn--primary flex-1"
                  @click="handleConfirm"
                >
                  {{ state?.confirmButtonText }}
                </button>
              </template>
            </view>
          </slot>
        </template>
      </view>
    </view>
  </wd-popup>
</template>

<style scoped>

</style>
