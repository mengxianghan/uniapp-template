# 分包规范

分包按业务/模块分组，统一放在 `src/subpackages/` 下。**新增分包页面一律使用 `pnpm create:page` 生成，创建后需手动注册到 `src/pages.json` 的 `subPackages`。**

## 目录结构

```
src/subpackages/
  shop/                    # 模块名 kebab-case，即业务/模块名
    pages/                 # 模块页面，结构与主包一致（页面目录 + index.vue）
      goods-list/
        index.vue
      goods/
        detail/
          index.vue
    apis/                  # 模块私有接口封装
    utils/                 # 模块私有工具
    store/                 # 模块私有 Pinia store
    constants/             # 模块私有常量
  order/
    pages/
      list/
        index.vue
    apis/
    utils/
    store/
    constants/
```

- 每个模块是 `src/subpackages/` 下的一个一级目录，**目录结构镜像主包**：`pages`（页面）、`apis`（接口）、`utils`（工具）、`store`（状态）、`constants`（常量）五个目录按需保留；模块私有的代码一律放自己模块内。
- 路由路径 = `/subpackages/<模块>/pages/<页面路径>/index`，如 `/subpackages/shop/pages/goods/detail/index`。
- 模块内文件之间用相对路径引用；引用主包共享代码（`@/components`、`@/utils`、`@/store`、`@/constants`、`@/apis`）统一用 `@/` 别名。

## 主包只存 tabBar 页面

- `src/pages/` 下**只保留 `tabBar.list` 中注册的页面**；新增非 tab 页面一律进对应业务模块的子包。
- 主包保留全局共享代码：`src/components/`（全局组件）、`src/utils/`、`src/constants/`、`src/apis/`、`src/store/`、`src/layouts/`、`src/static/` 等。
- **子包之间禁止相互引用**；两个模块都要用的代码，先上提到主包对应目录，再从 `@/` 引入。

## 子包 store 约定

- 子包私有 store 放在 `subpackages/<模块>/store/`，文件名与写法遵循 store 规范。
- **不注册**主包 `src/store/index.ts` 桶文件——主包桶引用子包代码会把子包代码打进主包，导致分包失效。子包页面直接 import 本模块 store（如 `import { useXxxStore } from '../store/xxx'` 或别名 `@/subpackages/<模块>/store/xxx`）。
- 全局共享 store 仍在 `src/store/` 编写并照常注册桶文件。

## 创建

```bash
pnpm create:page subpackages/shop/pages/goods-list   # 生成 src/subpackages/shop/pages/goods-list/index.vue
pnpm create:page subpackages/shop/pages/goods/detail # 支持多级页面路径
```

脚手架生成 `.vue` 文件（`<view>` 骨架）后结束，**注册需手动完成**，在 `src/pages.json`（JSONC，允许注释）中添加：

```jsonc
// 首个分包需新增 subPackages 键；模块已存在则在该模块的 pages 数组中追加
"subPackages": [
  {
    "root": "subpackages/shop",
    "pages": [
      {
        "path": "pages/goods-list/index",              // 相对 root，不含扩展名
        "style": {
          "navigationBarTitleText": "商品列表"
        }
      }
    ]
  }
]
```

- 模块目录不存在时，先按「目录结构」创建 `subpackages/<模块>/`（含五个子目录）再生成页面。
- 新页面一律追加到数组尾部。
- 登录控制同样通过 `meta.requiresAuth`（生成后可手动在 pages.json 的对应条目上补 `"meta": { "requiresAuth": true }`）。

## 约束

- **tabBar 页面必须放在主包**（`src/pages/`），分包页面不能进 `tabBar.list`。
- 分包页面跳转用 `navigateTo`（`@/utils` 导航封装），路径写完整 `/subpackages/<模块>/pages/<页面>/index`。
- 需要预下载时在 `pages.json` 的 `preloadRule` 中配置，不在分包目录内做约定。
- 分包之间、分包与主包之间共享的组件必须放到 `src/components/`（`x-` 前缀，全局注册）；只有单个模块内部使用的组件才允许放在该模块 `components/` 中（如 `src/subpackages/shop/components/`，私有组件不带 `x-` 前缀、显式 import，规范见组件规范）。
- 路由表由 `src/router/index.ts` 从 `pages.json` 合并 `pages` + `subPackages` 生成，新增分包页面无需改路由代码。
