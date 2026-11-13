import type { CSSProperties } from 'vue'

export type ContainerInstance = InstanceType<typeof import('./x-container.vue')['default']>

export type ContainerClassNames = 'root' | 'header' | 'body'

export type ContainerStyleNames = 'root' | 'header' | 'body'

export interface ContainerProps {
  classes?: Partial<Record<ContainerClassNames, string>>
  styles?: Partial<Record<ContainerStyleNames, CSSProperties>>
  backgroundImage?: string
  hasNavBar?: boolean
  hasTabBar?: boolean
}

export const defaultContainerProps = {}

export interface ContainerSlots {
  default?: () => any
  navBar?: () => any
  tabBar?: () => any
}
