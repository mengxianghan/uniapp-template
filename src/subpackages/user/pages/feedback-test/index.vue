<script setup lang="ts">
import { showLoading, showModal, showToast } from '@/utils'

function handleTextToast() {
  showToast('这是一段纯文字提示')
}

function handleSuccessToast() {
  showToast({ title: '操作成功', icon: 'success' })
}

function handleErrorToast() {
  showToast({ title: '操作失败', icon: 'error' })
}

function handleLoadingToast() {
  showLoading('加载中...')
  setTimeout(() => {
    uni.hideLoading()
  }, 2000)
}

function handleModal() {
  showModal({
    title: '提示',
    content: '这是一个普通的确认弹窗，用于验证 H5 下样式是否被 Tailwind 影响。',
    confirmText: '我知道了',
  })
}

function handleCancelModal() {
  showModal({
    title: '删除确认',
    content: '确定要删除这条记录吗？删除后无法恢复。',
    cancelText: '取消',
    confirmText: '删除',
    confirmColor: '#ff3b30',
  })
}

function handleEditableModal() {
  showModal({
    title: '请输入',
    content: '',
    editable: true,
    placeholderText: '请输入内容',
    cancelText: '取消',
    confirmText: '确定',
  })
}
</script>

<template>
  <x-container>
    <view class="px-6 py-6">
      <view class="mb-4 text-lg font-medium">
        Toast / Modal 样式验证
      </view>

      <view class="flex flex-col gap-3">
        <wd-button
          type="primary"
          @click="handleTextToast"
        >
          纯文字 Toast
        </wd-button>

        <wd-button
          type="success"
          @click="handleSuccessToast"
        >
          成功 Toast
        </wd-button>

        <wd-button
          type="error"
          @click="handleErrorToast"
        >
          错误 Toast
        </wd-button>

        <wd-button
          type="warning"
          @click="handleLoadingToast"
        >
          Loading Toast
        </wd-button>

        <wd-button
          type="primary"
          @click="handleModal"
        >
          普通 Modal
        </wd-button>

        <wd-button
          type="error"
          @click="handleCancelModal"
        >
          带取消 Modal
        </wd-button>

        <wd-button
          type="primary"
          @click="handleEditableModal"
        >
          可输入 Modal
        </wd-button>
      </view>
    </view>
  </x-container>
</template>

<style scoped lang="scss">
</style>
