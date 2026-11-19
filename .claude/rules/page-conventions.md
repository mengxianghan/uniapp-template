# 页面开发规范

本规范由 `scripts/create-page.ts` 脚手架和 `src/pages/` 现有页面共同约定。**新增页面一律使用 `pnpm create:page <name>` 生成骨架，不要手写文件。**

## 位置与命名

- 页面目录固定在 `src/pages/` 下，标准结构为 `src/pages/<name>/index.vue`（目录 + `index.vue`）。
- **主包 `src/pages/` 只保留 tabBar 页面**；非 tab 页面一律放对应业务模块的子包（`src/subpackages/<模块>/pages/`，见分包规范）。
- 目录名 kebab-case，多个单词用短横线连接，如 `src/pages/shopping-car/`。
- 脚手架支持直接传 `.vue` 后缀生成单文件（`pnpm create:page pages/foo/index.vue`），但除非确有必要，统一用目录形式，与现有页面保持一致。

## 注册 pages.json（手动）

**脚手架只生成 `.vue` 文件，不修改 pages.json**，创建后需手动注册。在 `src/pages.json`（JSONC，允许注释）的 `pages` 数组尾部追加：

```jsonc
{
  "path": "pages/user/info/index",      // 相对 src/ 的路径，不含扩展名
  "style": {
    "navigationBarTitleText": "用户信息"
  },
  "meta": {
    "requiresAuth": true                // 需要登录态时加，路由守卫会自动拦截跳登录页
  }
}
```

- 脚手架运行结束会打印需注册的 path，直接复制使用。
- `pages` 数组**第一项是应用启动页**，新页面一律追加到数组尾部，不要插入最前。
- 需要登录的页面通过 `meta.requiresAuth: true` 声明（`src/router/index.ts` 的守卫统一处理重定向，页面内不自己写登录判断）。
- 分包页面见分包规范（`subpackages/<模块>/pages/<页面>`），注册到 `subPackages` 数组。
- tab 页面需同时加入 `tabBar.list`；tab 页面之间切换用 `switchTab`，不能用 `navigateTo`（可用 `@/utils` 的 `switchTabToIndex` 等导航封装）。

## 页面骨架

```vue
<script setup lang="ts">
</script>

<template>
  <view>
    ...
  </view>
</template>

<style scoped lang="scss">
</style>
```

- 始终 `<script setup lang="ts">` + `<style scoped lang="scss">`。
- 页面整体结构通常包一层 `x-container`（自动处理导航栏/tabBar 占位、背景图等），参考 `src/subpackages/user/pages/login/index.vue`。
- 页面标题在 `pages.json` 的 `navigationBarTitleText` 中配置，不在页面里自绘导航栏（除非设计稿要求，用 `x-nav-bar`）。

## 页面内的组织

- 仅本页使用的私有组件放在页面目录下的 `components/` 子目录，不带 `x-` 前缀，显式 import（见组件规范）。
- 登录态、用户信息从 `@/store` 读取；接口请求走 `@/utils` 的 `request` 实例。
- **页面跳转统一走页面级导航方法**（定义在 `src/utils/navigator.ts`，经 `@/utils` 桶导出）：每个目标页面一个独立导出函数，参数统一为 query 对象（可选字段、便于扩展），如 `navigateToUserInfo({ id })`，内部直接调 `router.navigateTo({ path, query })`（`@/router` 的 uni-vant-router 实例原生支持 query 对象，值可为 string / number / 数组，由 router 拼 querystring）。页面内**不内联** `navigateTo`、不出现路由路径字符串、不自定义 `openXxx` 包装方法，也不直接调 `uni.navigateTo` 等原始 API。新增页面时在 `navigator.ts` 补对应方法（小程序 `onShareAppMessage` 的分享 path 除外，它必须是路径字符串）。
- 页面路径引用静态资源用 `/static/...` 绝对路径（如 tabBar 图标）。

## 其他

- 脚手架生成后自动执行 `eslint --fix`，提交前需通过 `pnpm lint` 与 `pnpm type-check`。
- 路由跳转的路径必须与 `pages.json` 注册的 path 一致（含前导 `/`，如 `/pages/user/index`、`/subpackages/user/pages/info/index`）。
