# Store 代码规范

本规范由 `scripts/create-store.ts` 脚手架和 `src/store/` 现有 store（app、user）共同约定。**新增 store 一律使用 `pnpm create:store <name>` 生成，不要手写文件。**

## 位置与命名

- store 为扁平单文件：`src/store/<name>.ts`，不建目录。
- 支持子路径传参（如 `pnpm create:store module/foo`），生成 `src/store/module/foo.ts`。
- 文件名 kebab-case，多个单词用短横线连接；脚手架自动转换命名：
  - 导出函数：`use<UpperCamel>Store`，如 `useUserStore`
  - store id：camelCase，与文件名一致，如 `defineStore('userCard', ...)`
- **子包私有 store 例外**：放在 `src/subpackages/<模块>/store/` 下，**不注册**主包 `src/store/index.ts` 桶文件（主包桶引用子包代码会把子包代码打进主包，导致分包失效）；由子包页面直接 import（相对路径或 `@/subpackages/<模块>/store/xxx`）。全局共享 store 仍在 `src/store/` 并照常注册（见分包规范）。

## 写法风格

脚手架生成的是 **setup 风格**：

```ts
import { defineStore } from 'pinia'

export const useUserCardStore = defineStore('userCard', () => {
  return {}
})
```

现有 `app.ts` / `user.ts` 是 **options 风格**（`state` / `getters` / `actions`）。两种风格均允许，规则是：

- **新 store 跟随脚手架用 setup 风格**，不再新建 options 风格的 store。
- 不要为统一风格把现有 options 风格 store 重写成 setup 风格。
- 同一文件内不混用两种风格。

注意差异：options 风格自带 `$reset()`；setup 风格没有，需要重置能力时在 store 内自己暴露一个 `reset()` 函数。

## 注册与引用

- 每个 store 文件必须在 `src/store/index.ts` 桶文件中导出：`export { useUserCardStore } from './user-card'`（子路径的导出 `./module/foo`）。
- 业务代码统一从桶文件引入：`import { useUserCardStore } from '@/store'`，不直接深入单文件路径。

## 状态持久化

- **不使用持久化插件**（无 pinia-plugin-persistedstate），需要持久化的字段手动读写 `storage`（`@/utils` 导出，`uni-vant-storage` 封装）。
- 标准模式（参考 `src/store/user.ts`）：
  - state 初始值从 storage 恢复：`token: storage.getItem(STORAGE_TOKEN, '')`
  - 在 actions 中变更后同步写回：`storage.setItem(STORAGE_USER_INFO, userInfo)`
- storage 的 key 统一定义在 `src/constants/index.ts`，命名 `STORAGE_XXX`，不要散落字符串字面量。
- 只有真正需要跨启动保留的字段才持久化（如 token、userInfo），页面级临时状态留在内存。

## 其他

- store 内不发起路由跳转、不弹 UI 提示（toast/modal），这些副作用留给调用方或专门的工具函数。
- store id 全局唯一，重名会导致状态串库；子路径 store 的 id 仍按文件名取，不加模块前缀。
- 脚手架生成后自动执行 `eslint --fix`，提交前需通过 `pnpm lint` 与 `pnpm type-check`。
