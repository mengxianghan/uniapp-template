export interface ModalEmits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

export interface ModalProps {
  title?: string
  content?: string
  confirmButtonText?: string
  cancelButtonText?: string
  showConfirmButton?: boolean
  showCancelButton?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  closeable?: boolean
  customClass?: string
  beforeClose?: () => Promise<boolean>
}

export const defaultModalProps = {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: true,
}
