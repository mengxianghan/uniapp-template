import type { CSSProperties } from 'vue'

export type ListInstance = InstanceType<typeof import('./x-list.vue')['default']>

export type ListClassNames = 'root' | 'content' | 'loadingText' | 'finishedText' | 'errorText'

export type ListStyleNames = 'root' | 'content'

export interface ListProps {
  loading: boolean
  loadingText?: string
  finished: boolean
  finishedText?: string
  useFinishedSlot?: boolean
  error: boolean
  errorText?: string
  immediateCheck?: boolean
  disabled?: boolean
  loadData: () => void
  container: string
  offset?: number
  classes?: Partial<Record<ListClassNames, string>>
  styles?: Partial<Record<ListStyleNames, CSSProperties>>
}

export const defaultListProps = {
  loadingText: '努力加载中…',
  finishedText: '没有更多内容了',
  errorText: '出错了，点击重新加载',
  immediateCheck: true,
  offset: 50,
}

export interface ListEmits {
  (e: 'update:loading', value: boolean): void
  (e: 'update:error', value: boolean): void
}

export interface ListSlots {
  default: () => void
  finished: () => void
  error: () => void
}
