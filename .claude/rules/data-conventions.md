# 数据脚本与目录规范

本规范约定 `scripts/` 数据脚本、`package.json` 命令与生成数据的存放方式。**新增数据生成脚本、引入新的数据源时遵循本规范。**

## scripts/ 脚本与 package.json 命令

- `scripts/` 下的**每个顶层脚本必须在 `package.json` 的 `scripts` 段注册一条命令**，通过 `pnpm <命令>` 调用，不直接 `node scripts/xxx`。
- 命令前缀按职责区分，新增时跟随对应前缀：

| 前缀 | 职责 | 示例 |
| --- | --- | --- |
| `gen:*` | 数据生成（构建脚本） | `gen:xxx-data` |
| `create:*` | 脚手架（页面/组件/store） | `create:page` |
| `dev:*` / `build:*` / `preview:*` / `upload:*` | 应用生命周期 | `dev:h5`、`build:mp-weixin:prod` |

- **数据生成脚本一律用 TypeScript**（`esno scripts/build-<产物>.ts` 直跑，与 `create:*` 同款），命名 `build-<产物>.ts`；保持脚本风格，不引严格类型。
- `mp-weixin/` 下的 CI 脚本（preview/upload）用 node（miniprogram-ci 生态），属例外，不套用本条。
- 数据生成脚本**构建成功后在结尾打印使用提示**（产物位置 + 消费方式，如云导入步骤、中间件伺服路径）。

## 数据存放三层

| 层 | 位置 | git | 内容 |
| --- | --- | --- | --- |
| 源数据缓存 | `.tmp/<包名或仓库名>/` | 忽略 | 第三方原始数据（如 `.tmp/some-dataset/`）。随时可删，脚本缺源时打印下载命令 |
| 构建产物 | `data/<产物>/` | **入库** | 云导入 JSON、被 dev 中间件/运行时代码引用的分块数据 |
| 真临时 | `.tmp/` 根下随意 | 忽略 | 调试截图、探针输出、日志 |

**判断标准一句话**：可再生 = 缓存留 `.tmp/`；交付物（被运行时代码引用，或重新生成成本高）= `data/` 入库。`data/` 入库后新机器 clone 零构建即可用（导云库 / 起 dev server）。

## 数据源管理

- 第三方数据**fork 到自己的 GitHub 账号**后再用，构建脚本内**固定 commit hash** 下载（脚本顶部 `SRC_COMMIT` 常量），保证可复现。
- 数据有错的修复路径：改自己 fork → 改脚本内 `SRC_COMMIT` 为新 hash → 重跑 `pnpm gen:*` → 重新导入。
- 上游仓库通常没有 `package.json`，**不要**尝试把它声明成 npm/pnpm 依赖装进 node_modules。

## 其他

- 数据生成脚本的产物路径、下载提示、文档（`docs/*.md`）三者保持一致，改路径时同步改。
- `.tmp/` 已被全局 gitignore（`~/.gitignore_global` 的 `*.tmp`）覆盖，其中的文件不进本仓库；`data/` 不在该规则内，默认入库，无需额外配置。
- **微信云数据库导入只认 `.json` 扩展名 + JSON Lines 内容**（每行一个文档）：JSON 数组内容报「导入数据格式不正确」，`.jsonl` 扩展名在导入对话框选不到。云导入产物一律 `xxx.json` 名 + JSONL 内容。
