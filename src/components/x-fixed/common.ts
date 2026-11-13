import type { CSSProperties } from 'vue'

export type FixedInstance = InstanceType<typeof import('./x-fixed.vue')['default']>

export type FixedClassNames = 'root' | 'fixed' | 'content'

export type FixedStyleNames = 'root' | 'fixed' | 'content'

export interface FixedProps {
  position?: FixedPosition
  placeholder?: boolean
  classes?: Partial<Record<FixedClassNames, string>>
  styles?: Partial<Record<FixedStyleNames, CSSProperties>>
  safeAreaInsetBottom?: boolean
  disabled?: boolean
}

export type FixedPosition = 'top' | 'bottom'

export const defaultFixedProps = {
  position: 'bottom' as FixedPosition,
  placeholder: true,
  safeAreaInsetBottom: true,
}

export interface FixedSlots {
  default: () => void
}
