export type NavBarInstance = InstanceType<typeof import('./nav-bar.vue')['default']>

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

export const defaultNavBarProps = {}

export interface NavBarEmits {
  (e: 'click-back'): void
}
