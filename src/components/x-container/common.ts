import type { CSSProperties } from 'vue'

export type ContainerInstance = InstanceType<typeof import('./x-container.vue')['default']>

export type ContainerClassNames = 'root' | 'header' | 'body' | 'footer'

export type ContainerStyleNames = 'root' | 'header' | 'body' | 'footer'

export interface ContainerProps {
  classes?: Partial<Record<ContainerClassNames, string>>
  styles?: Partial<Record<ContainerStyleNames, CSSProperties>>
  backgroundImage?: string
  /**
   * 是否固定高度。为 true 时根节点高度固定为一屏可视高度（不随内容伸缩），
   * body 撑满剩余空间、footer 贴底；默认 false，使用 min-height 至少占满一屏。
   */
  fixedHeight?: boolean
}

export const defaultContainerProps = {
  fixedHeight: false,
}

export interface ContainerSlots {
  default?: () => any
  header?: (props: { backgroundImage?: string }) => void
  footer?: () => any
}
