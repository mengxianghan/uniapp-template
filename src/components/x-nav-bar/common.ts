export interface NavBarProps {
  customClass?: string
  title?: string
  leftArrow?: boolean
  leftText?: string
  leftArrowClass?: string
  leftClass?: string
  titleClass?: string
  fixed?: boolean
  placeholder?: boolean
}

export interface NavBarEmits {
  (e: 'click-left'): void
}
