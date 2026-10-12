# File Serve 管理后台

Vue 3 + Vite，history 路由 base `/admin/`，同源调用后端（HttpOnly 会话 cookie；登录返回的临时 Bearer 只保存在内存中，从不写入浏览器存储或 URL）。

```bash
npm ci
npm run dev            # http://localhost:3008/admin/，/api 代理到 :3000（含 WebSocket）
npm run build          # 生产构建 → dist/
npm test -- --run      # Vitest（happy-dom）单元/组件测试
npm run dev:preview    # 隔离演示模式（内置浏览器内示例后端）
npm run build:preview  # 演示构建 → dist-preview/（相对 base + 内存路由）
```

## 环境变量

- `VITE_API_BASE`（可选）：API 前缀，如 `/nas` 或 `https://host/prefix`。所有 `/api/...` 绝对路径都经 `src/lib/env.js` 的 `apiUrl()` 拼接；日志 WebSocket 由同一前缀推导，同源时按页面协议使用 `ws:`/`wss:`。
- `VITE_ADMIN_PREVIEW=1`：演示模式。显示醒目的演示横幅，使用演示令牌自动登录，所有请求由 `src/preview/backend.js` 在浏览器内处理，实时日志使用轮询并标注“轮询”。生产构建中该模块与演示令牌会被静态移除。

## 结构

- `src/lib/http.js`：fetch 封装，支持 AbortSignal、超时（含响应体读取）、错误分类（auth/forbidden/http/network/timeout/abort）。只有 HTTP 401 会触发退出；网络错误与 5xx 不会。
- `src/stores/auth.js`：会话状态（authenticated / anonymous / unreachable）。
- `src/composables/useResource.js`：最新请求优先、保留过期数据并标记 stale、采样时间与可见性感知轮询。
- `src/lib/logLive.js`：日志 WebSocket（退避重连、1008 识别会话失效）/ 演示轮询。
- `src/lib/serverInfo.js`：优先读取 `server.runtime` / `server.version`；仅旧 Node 服务回退到 `nodeVersion`。缺少 Rust 堆内存统计时明确显示不可用；仅 `restartSupported === true` 允许在线重启。
- `src/components/ConfirmHost.vue`：可键盘操作的确认对话框（替代 `window.confirm`）。
- `src/views/`：概览、缓存、日志、配置、任务与审计、会话、登录、404。

## Rust / 旧 Node 服务适配

两种服务使用相同的管理 URL、管理会话 cookie 和只读媒体票据 URL，不按运行时切换认证协议。生产构建不设置 `VITE_ADMIN_PREVIEW`，实时日志仍使用真实 WebSocket，不静默降级为模拟数据或轮询。

错误中的 `msg`、字段级 `errors` 和非凭据的 `requestId` 会保留用于诊断；HTTP 501 明确显示能力不可用。重启 `409` 可能是暂时维护冲突，只有 `RESTART_UNSUPPORTED` 或 `501` 才标记为不支持，避免永久禁用正常部署的重启按钮。

配置保存提交的是已校验、已确认的同一份 revision/values 快照，不能在确认期间通过修改表单绕过校验。冲突后的重新加载失败保留未保存草稿，不误报成功。

Web 与 Flutter 文件客户端的“服务管理”入口打开 `/admin/`，不把凭据放进 URL；重启确认、能力检查与恢复验证统一由后台处理，不依赖旧服务的固定中文响应。新版文件客户端读取仅用 `/api/v2/files`、`/api/v2/content`、`/api/v2/preview` 的原字符串 query path；不再把 `$` / `$$` 当根目录，也不解析原文件的 `!WxH`。旧 Node 的运行时展示仍可回退，但新版文件客户端不自动回退旧读取协议。
