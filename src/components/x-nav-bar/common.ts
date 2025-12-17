export interface NavBarProps {
  customClass?: string | Record<string, any>
  customStyle?: string | Record<string, any>
  title?: string
  showBack?: boolean
  leftClass?: string
  titleClass?: string
  fixed?: boolean
  placeholder?: boolean
}

export interface NavBarEmits {
  (e: 'click-back'): void
}
