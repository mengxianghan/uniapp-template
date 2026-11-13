import type { CSSProperties } from 'vue'

export type NavBarInstance = InstanceType<typeof import('./x-nav-bar.vue')['default']>

export type NavBarClassNames = 'root' | 'left' | 'title' | 'right'

export type NavBarStyleNames = 'root'

export interface NavBarProps {
  classes?: Partial<Record<NavBarClassNames, string>>
  styles?: Partial<Record<NavBarStyleNames, CSSProperties>>
  title?: string
  showBack?: boolean
  fixed?: boolean
  placeholder?: boolean
  backgroundImage?: string
}

export const defaultNavBarProps = {}

export interface NavBarEmits {
  (e: 'click-back'): void
}
