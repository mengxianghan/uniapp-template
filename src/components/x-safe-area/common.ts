import type { CSSProperties } from 'vue'

export type SafeAreaInstance = InstanceType<typeof import('./x-safe-area.vue')['default']>

export type SafeAreaClassNames = 'root'

export type SafeAreaStyleNames = 'root'

export interface SafeAreaProps {
  classes?: Partial<Record<SafeAreaClassNames, string>>
  styles?: Partial<Record<SafeAreaStyleNames, CSSProperties>>
  /**
   * 占位方向：bottom 为底部安全区（Home Indicator），top 为顶部（刘海/灵动岛）
   * @default 'bottom'
   */
  position?: SafeAreaPosition
}

export type SafeAreaPosition = 'top' | 'bottom'

export const defaultSafeAreaProps = {
  position: 'bottom' as SafeAreaPosition,
}
