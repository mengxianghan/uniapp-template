# 组件开发规范

本规范由 `scripts/create-component.ts` 脚手架和 `src/components/` 现有组件（x-list、x-modal、x-nav-bar、x-container）共同约定。**新增组件（不管是全局组件还是私有组件）一律使用 `pnpm create:component <name>` 生成骨架，不要手写目录结构。**

## 组件的两种归属

| 类型 | 位置 | 命名 | 注册方式 |
| --- | --- | --- | --- |
| **全局组件** | `src/components/` | 必须 `x-` 前缀，如 `x-foo` | easycom autoscan 自动注册，页面中免 import |
| **私有组件** | 使用方的 `components/` 子目录，如 `src/pages/user/components/` | 不带 `x-` 前缀，如 `pay-panel` | 使用页面中显式 `import` |

- 只在单个页面/功能内使用的组件，放到该页面目录下的 `components/` 中，不进入 `src/components/`。
- 私有组件目录同样要求目录名与 `.vue` 文件名一致，便于需要时整体迁移为全局组件。
- 私有组件同样用 `pnpm create:component` 生成，参数传完整路径前缀（如 `pnpm create:component subpackages/user/pages/info/components/pay-panel`），脚手架按最后一段组件名落盘，生成不带 `x-` 前缀的两文件结构；script 内的类型声明方式（`defineProps<T>` 泛型、`virtualHost` 等）与全局组件保持一致。

## 命名

| 对象 | 规则 | 示例 |
| --- | --- | --- |
| 目录 / 文件名 | kebab-case，单词用短横线连接 | `x-user-card/`、`x-user-card.vue` |
| `defineOptions.name` | UpperCamelCase | `XUserCard` |
| 类型名 | `XxxProps` / `XxxEmits` / `XxxSlots` / `XxxContext` / `XxxInstance` / `XxxClassNames` / `XxxStyleNames`（Xxx 为去掉 `x-` 前缀的 UpperCamel） | `UserCardProps` |
| 默认值对象 | `defaultXxxProps` | `defaultUserCardProps` |
| 注入键 | `xxxContextKey`（camelCase），值为 `Symbol` 并断言为 `InjectionKey<XxxContext>` | `userCardContextKey` |

支持传带子路径的名称（如 `pnpm create:component business/x-pay`），最后一段为组件名，自动落到 `src/components/business/x-pay/`。

## 目录结构（两文件固定）

```
src/components/x-foo/
  x-foo.vue    # 组件本体
  common.ts    # 全部类型定义与默认值
```

- **`common.ts`**：组件的 props / emits / slots / provide 类型集中在此，标准导出一组：
  `XxxInstance`、`XxxClassNames`、`XxxStyleNames`、`XxxProps`、`defaultXxxProps`、`XxxSlots`、`XxxEmits`、`XxxContext`、`xxxContextKey`。
  不需要的类型（如无跨层级注入）可以省略，但不得在其他文件中重复定义这些类型。
- 私有组件由脚手架生成同样的两文件结构；生成后如确实用不到 `common.ts`（无对外类型、无语义键）可删除简化为单文件，但生成必须走脚手架，不手写文件。

## 组件本体（x-foo.vue）

固定写法，顺序如下：

```vue
<script setup lang="ts">
import type { XFooProps, XFooSlots, XFooEmits } from './common'
import { defaultXFooProps } from './common'

defineOptions({
  name: 'XFoo',
  options: {
    virtualHost: true, // 小程序端必需，保持样式隔离与事件透传
  },
})

withDefaults(
  defineProps<XFooProps>(),
  defaultXFooProps,
)

defineSlots<XFooSlots>()

defineEmits<XFooEmits>()
</script>

<template>
  ...
</template>

<style scoped lang="scss">
</style>
```

- 始终使用 `<script setup lang="ts">`，props/emits/slots 通过泛型宏声明，**不使用运行时声明**。
- props 必填项不带 `?`，可选项带 `?`；可选 props 的默认值一律放进 `defaultXxxProps` 对象，不散落在 `withDefaults` 第二个参数里写内联字面量（`defaultXxxProps` 本身是组件文件与 common.ts 之间唯一的默认值来源）。
- 样式一律 `scoped lang="scss"`；跨端样式用 Tailwind 工具类，类名组合用 `@/utils` 的 `cn`。

## 语义化 classes / styles

对齐 antdv-next 规范，类名/样式透传不使用 `custom-class` / `custom-style` 或散落的 `xxxClass` props，统一为语义化对象：

```ts
import type { CSSProperties } from 'vue'

export type XxxClassNames = 'root' | 'header' | 'body' // classes 可用的语义键
export type XxxStyleNames = 'root' | 'body' // styles 可用的语义键，与 ClassNames 独立定义、可不同

export interface XxxProps {
  classes?: Partial<Record<XxxClassNames, string>>
  styles?: Partial<Record<XxxStyleNames, CSSProperties>>
}
```

- 每个组件分别定义 `XxxClassNames` 与 `XxxStyleNames` 两个语义键联合，彼此独立（某个语义部分可以只支持类名不支持样式，反之亦然）。
- `root` 为必备语义键（组件根节点），其余按键名的语义结构命名，如 `header` / `body` / `left` / `title` / `right` / `content`。
- 组件内将对应键合并到语义节点：类名用 `@/utils` 的 `cn` 合并，样式用 vue 的 `normalizeStyle` 或与计算样式组成数组绑定：
  ```vue
  <view :class="cn('relative', classes?.root)" :style="styles?.root">
  <view :style="normalizeStyle([innerStyle, styles?.root])">
  ```

## 注册与使用

- 全局组件通过 `src/pages.json` 的 easycom `autoscan` 自动注册：目录名与 `.vue` 文件名必须一致（`x-foo/x-foo.vue`），页面中**直接使用标签 `<x-foo />`，无需 import**。
- 私有组件不在 autoscan 范围内，由使用方显式 `import`（别名 `@/pages/user/components/pay-panel.vue`）。
- 模板中标签一律 kebab-case（ESLint `vue/component-name-in-template-casing` 强制），自定义事件名同样 kebab-case。
- 向页面外暴露组件实例类型时使用 `XxxInstance`（供 `ref` 标注）；跨层级共享状态用 `xxxContextKey` + `provide/inject`，不要透传 props。

## Slots

- 在 `common.ts` 的 `XxxSlots` 接口中定义，组件内用 `defineSlots<XxxSlots>()` 声明，不用运行时插槽声明。
- 具名插槽以插槽名为属性名；作用域插槽的返回值类型即插槽 props 类型：
  ```ts
  export interface ListSlots {
    default: () => void
    header: (props: { backgroundImage?: string }) => void
  }
  ```
- 插槽可选时在模板中可直接用 `$slots.xxx` 判断存在性（如 `v-if="$slots.footer"`），script 中需要响应式跟踪时用 `useSlots()`，两者均可。
- 默认插槽必须显式写 `default` 属性，不允许空接口。
- 模板中使用时标签与插槽名一律 kebab-case：`<slot name="header" />`、`<template #header>`。

## Emits

- 在 `common.ts` 的 `XxxEmits` 接口中用**调用签名**形式定义，不用对象形式：
  ```ts
  export interface ListEmits {
    (e: 'update:loading', value: boolean): void
    (e: 'load-data'): void
  }
  ```
- 事件名 kebab-case（ESLint `vue/custom-event-name-casing` 强制）；`v-model` 写法的事件名用 `update:xxx`。
- 回调型 props（如 `onConfirm?: () => void`、`beforeClose?: () => Promise<boolean>`）与事件并存时：对外通知用 emit，props 回调用于调用方需要拿到 Promise 结果的场景（参考 x-modal 的 `beforeClose`），两者职责不混用。
- 组件内通过 `const emit = defineEmits<XxxEmits>()` 接收后调用，不要直接透传 props 里的 `onXxx` 函数。

## $attrs

- 允许在模板中直接使用 `$attrs`（如透传到内部元素 `<view v-bind="$attrs">`），也允许在 script 中用 `useAttrs()` 取到，两者均可。
- 组件默认开启属性透传（`inheritAttrs: true`），不强制关闭；仅当根元素不是实际渲染节点（如多根节点、根节点需要保留给 wrapper）时，才在 `defineOptions` 中按需设置 `inheritAttrs: false` 并显式 `v-bind="$attrs"`。
- 透传属性不要再声明为 props，避免重复定义。
- **class / style 不透传 `$attrs`**：组件需要对外提供类名/样式定制能力时，必须显式声明 `classes` / `styles` 语义化 props（见「语义化 classes / styles」一节），在根节点用 `cn(classes?.root)` / `styles?.root` 合并；禁止靠 `$attrs` 的 class/style 自动 fallthrough 作为样式定制入口（`$attrs` 仅用于事件、id、`data-*` 等其余属性的透传）。

## Provide / Inject

- 仅用于跨层级共享状态（组件树内部、组件与其插槽内容之间），props 能解决的场景不用 provide。
- 注入键集中定义在 `common.ts`：`xxxContextKey = Symbol('x-xxx') as InjectionKey<XxxContext>`，**禁止用字符串作 inject key、禁止散落定义 Symbol**。
- `XxxContext` 接口描述提供给后代的数据与方法，provide 时用 `reactive` 包裹保证响应性：
  ```ts
  provide<XxxContext>(xxxContextKey, reactive({ visible, close }))
  ```
- 后代组件中 `inject(xxxContextKey)` 后必须判空（组件可能被单独使用），为空时给出合理的降级行为，不直接非空断言。
- context 数据流向保持单向：后代通过 context 调用上层方法，不直接修改上层状态；需要修改时由上层在 context 中暴露明确的 mutation 方法。

## 修改组件的注意事项

- 修改 props/emits/slots 签名时同步更新 `common.ts` 中的类型与 `defaultXxxProps`。
- 组件依赖 `virtualHost: true`，**不要删除** `defineOptions`，否则小程序端类名/事件绑定会失效。
- 脚手架在生成后会自动执行 `eslint --fix`，提交前仍需通过 `pnpm lint` 与 `pnpm type-check`。
