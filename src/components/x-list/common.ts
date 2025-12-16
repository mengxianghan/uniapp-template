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
  customClass?: string | string[] | Record<string, boolean>
  customStyle?: string | Record<string, string>
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
