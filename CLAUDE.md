# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 Vue 3 + Vite + TypeScript 的 UniApp 跨端模板，支持 H5 与多家小程序（微信、支付宝、抖音等）。包管理使用 pnpm（见 `.nvmrc` / `.npmrc`）。UI 组件库为 Wot UI（`@wot-ui/ui`），样式方案为 Tailwind CSS + weapp-tailwindcss。

## 常用命令

```bash
# 开发
pnpm dev:h5              # H5
pnpm dev:mp-weixin       # 微信小程序

# 构建（通过 --mode 选择 .env / .env.test / .env.pre / .env.prod）
pnpm build:h5:prod
pnpm build:mp-weixin:prod

# 微信小程序 CI（预览 / 上传，需要 scripts/mp-weixin/private.<appid>.key 私钥，appid 取自 src/manifest.json）
pnpm preview:mp-weixin:test
pnpm upload:mp-weixin:prod
pnpm build:prod          # 组合命令：构建 + 上传

# 代码生成（交互式脚本，esno 直接运行 TS）
pnpm create:page         # 生成页面并自动注册到 src/pages.json
pnpm create:component    # 生成组件（含 props/emits/slots 类型文件）
pnpm create:store        # 生成 Pinia store

# 质量
pnpm lint / pnpm lint:fix # eslint（@antfu/eslint-config，见下）
pnpm type-check          # vue-tsc --noEmit
```

Git 提交遵循 conventional commits（commitlint + husky + lint-staged 在提交前自动 lint）。

## 代码风格（eslint.config.ts 强制）

- 无分号、单引号、2 空格缩进、printWidth 200
- 模板中组件名与自定义事件名一律 kebab-case
- 模板属性每行最多 1 个（`vue/max-attributes-per-line`）

## 架构要点

### 路由：pages.json 是唯一路由源

`src/router/index.ts` 从 `src/pages.json` 生成路由表（`uni-vant-router`），不手写路由配置。页面访问控制通过在 `pages.json` 的页面配置中加 `meta.requiresAuth: true` 实现，路由守卫（`router.beforeEach`）会重定向到登录页。新增页面用 `pnpm create:page` 生成（如 `create:page pages/user/info` 或分包 `create:page subpackages/shop/goods-list`），脚手架只生成 `.vue` 文件，创建后需手动注册到 `src/pages.json`。

### 组件约定：x-* 组件的三文件结构

`src/components/` 下的自定义组件遵循固定结构（`pnpm create:component` 会自动生成）：

```
src/components/x-foo/
  x-foo.vue   # <script setup>，defineOptions({ name: 'XFoo', options: { virtualHost: true } })
  common.ts   # FooProps / defaultFooProps / FooEmits / FooSlots / FooInstance 类型
  index.ts    # export { default as XFoo } from './x-foo.vue'; export * from './common'
```

组件通过 pages.json 的 easycom `autoscan` 自动注册（`wd-*` 前缀映射到 Wot UI），无需手动 import。

### 环境配置：constants 集中读取 import.meta.env

`src/constants/index.ts` 是唯一读取 `import.meta.env.VITE_*` 的地方（如 `VITE_API_BASIC`、`VITE_STORAGE_NAMESPACE`），其他代码从 `@/constants` 引入，不直接访问环境变量。环境文件：`.env`（开发）、`.env.test`、`.env.pre`、`.env.prod`。

### HTTP 层：uni-vant-http + 业务错误码约定

`src/utils/request.ts` 用 `createHttp` 创建命名实例（如 `basic`）。响应拦截器约定：后端返回体含 `resultStatus` / `message`，状态码在 `HTTP_CODE_IGNORES`（200、401）之外的请求会弹 toast 并抛出 `ResponseError`。401 被忽略是因为登录态处理由调用方/路由层负责。

### 状态持久化：Pinia store 手动同步 storage

`src/store/` 下的 store（如 `user`）在 actions 中显式调用 `storage`（`uni-vant-storage` 封装）读写本地缓存，token / userInfo 初始值直接从 storage 恢复。没有使用自动持久化插件。

### 跨端样式

- Tailwind 经 `weapp-tailwindcss` 的 `UnifiedViteWeappTailwindcssPlugin` 编译到小程序；`tailwindcss-rem-to-px` 将 rem 转 px
- preflight 仅在 H5 开启（`process.env.UNI_PLATFORM === 'h5'`），小程序全局样式注意不要依赖 preflight/标签选择器
- 图标通过 `@iconify/tailwind` 以 `i-{tdesign|weui}-xxx` 类名内联

### 布局与目录别名

- 页面布局由 `@uni-helper/vite-plugin-uni-layouts` 提供，`src/layouts/default.vue` 为默认布局
- 路径别名 `@/` 指向 `src/`（tsconfig 与 vite 均已配置）

### 其他

- `src/utils/index.ts` 是工具函数的统一出口（除 `request`、`storage`、`emitter` 以命名/命名空间导出），新增工具时在对应分类文件中编写并从这里导出
- 小程序 CI 脚本（`scripts/mp-weixin/`）通过 `miniprogram-ci` 调用微信开发者平台，私钥文件 `scripts/mp-weixin/private.<appid>.key` 不入库
