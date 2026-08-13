export type ContainerInstance = InstanceType<typeof import('./index.vue')['default']>

export interface ContainerProps {
  customClass?: string
  bodyClass?: string
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
