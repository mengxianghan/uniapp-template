export interface NavBarProps {
  customClass?: string | Record<string, any>
  customStyle?: string | Record<string, any>
  title?: string
  showBack?: boolean
  leftClass?: string
  titleClass?: string
  rightClass?: string
  fixed?: boolean
  placeholder?: boolean
  backgroundImage?: string
}

export interface NavBarEmits {
  (e: 'click-back'): void
}
