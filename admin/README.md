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
- `src/components/ConfirmHost.vue`：可键盘操作的确认对话框（替代 `window.confirm`）。
- `src/views/`：概览、缓存、日志、配置、任务与审计、会话、登录、404。
