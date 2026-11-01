# 分包规范

分包按业务/模块分组，统一放在 `src/subpackages/` 下。**新增分包页面一律使用 `pnpm create:page` 生成，创建后需手动注册到 `src/pages.json` 的 `subPackages`。**

## 目录结构

```
src/subpackages/
  shop/                    # 模块名 kebab-case，即业务/模块名
    goods-list/
      index.vue
    goods/
      detail/
        index.vue
  order/
    list/
      index.vue
```

- 每个模块是 `src/subpackages/` 下的一个一级目录，模块内页面结构与主包一致（页面目录 + `index.vue`）。
- 路由路径 = `/subpackages/<模块>/<页面路径>/index`，如 `/subpackages/shop/goods/detail/index`。

## 创建

```bash
pnpm create:page subpackages/shop/goods-list   # 生成 src/subpackages/shop/goods-list/index.vue
pnpm create:page subpackages/shop/goods/detail # 支持多级页面路径
```

脚手架生成 `.vue` 文件（`<view>` 骨架）后结束，**注册需手动完成**，在 `src/pages.json`（JSONC，允许注释）中添加：

```jsonc
// 首个分包需新增 subPackages 键；模块已存在则在该模块的 pages 数组中追加
"subPackages": [
  {
    "root": "subpackages/shop",
    "pages": [
      {
        "path": "goods-list/index",              // 相对 root，不含扩展名
        "style": {
          "navigationBarTitleText": "商品列表"
        }
      }
    ]
  }
]
```

脚手架运行结束会打印需注册的 path（如 `{ "path": "subpackages/shop/goods-list/index" }`），直接复制使用。注册时注意：

- 首个分包：新增 `subPackages` 键；模块已存在：在其 `pages` 数组中追加；模块不存在：在 `subPackages` 数组中追加新模块条目。
- 新页面一律追加到数组尾部。

## 约束

- **tabBar 页面必须放在主包**（`src/pages/`），分包页面不能进 `tabBar.list`。
- 分包页面跳转用 `navigateTo`（`@/utils` 导航封装），路径写完整 `/subpackages/<模块>/<页面>/index`。
- 需要预下载时在 `pages.json` 的 `preloadRule` 中配置，不在分包目录内做约定。
- 分包之间、分包与主包之间共享的组件必须放到 `src/components/`（`x-` 前缀，全局注册）；只有单个分包内部使用的组件才允许放在该模块目录下的 `components/` 中（私有组件规范见组件规范）。
- 登录控制同样通过 `meta.requiresAuth`（生成后可手动在 pages.json 的对应条目上补 `"meta": { "requiresAuth": true }`）。
