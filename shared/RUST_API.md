# Rust 服务契约（server-rust）

> 正式契约（server-rust 0.2.0）。与 Node 版 `server/` 的差异与迁移说明见文末。

## 二进制与命令行

二进制名 `file-server`（Windows `file-server.exe`），crate 位于 `server-rust/`。

```
file-server [serve] [--config <path/config.json>]   # 默认子命令，前台运行
file-server supervise [--config <path>]             # 可选内置守护：拉起子进程并设置 FILE_SERVER_MANAGED=1
file-server check-config [--config <path>]          # 校验并打印解析后的非凭据路径，成功 0，配置错误 78
file-server --version | --help
```

### 配置文件发现（第一个命中者为准）

1. `--config <file>`
2. 环境变量 `FILE_SERVER_CONFIG=<file>`（必须存在）
3. 当前工作目录 `./config.json`
4. 可执行文件所在目录 `config.json`
5. 仅调试构建：`server-rust/config.json`（基于 `CARGO_MANIFEST_DIR`，使 `npm run dev:server` 从仓库根运行稳定）
6. 都不存在：使用内置默认值，**基准目录 = 可执行文件所在目录**

相对路径一律相对于“配置基准目录”（配置文件所在目录；第 6 种情况为 exe 目录），不依赖进程 cwd。叠加顺序：`config.json` → 同目录 `config.local.json` → `<dataPath>/admin-config.local.json`（后台保存）→ 环境变量。

### 默认路径（相对基准目录）

| 键 | 默认 | 环境变量 |
|---|---|---|
| `rootPath` 共享目录（必须已存在） | `./files` | `FILE_SERVER_ROOT` |
| `dataPath` 私有数据（凭据、数据库、日志、配置覆盖） | `./data` | `FILE_SERVER_DATA_DIR` |
| `imgCache` 缩略图缓存 | `<dataPath>/cache` | `FILE_SERVER_CACHE_DIR` |
| `staticDir` 前端产物，内含 `web/` 与 `admin/` | `./static` | `FILE_SERVER_STATIC_DIR` |
| `host` | `127.0.0.1` | `FILE_SERVER_HOST` |
| `port` | `3000` | `FILE_SERVER_PORT` |
| `httpsPort` | `3001` | `FILE_SERVER_HTTPS_PORT` |
| `certPath` / `keyPath` | `./cert/file.crt` / `./cert/private.pem` | — |

数据目录内：`auth.local.json`（0600，两种随机凭据）、`imgCache.db`（+WAL/SHM）、`logs/app.log`（10 MB 轮转 3 份）、`logs/restart.log`（supervise 写入）、`admin-config.local.json` 与 `admin-config.backup.local.json`。

启动校验（`config::check_layout`，后台修改 `rootPath` 复用同一规则，保证“可保存即可启动”），全部在任何 mkdir/chmod 之前完成：

- 共享目录不能是文件系统根；不能位于数据目录、缓存目录内；与静态目录不能互相包含。
- `dataPath`、`imgCache`、配置基准目录不能位于共享目录或静态目录内。
- `dataPath`/`imgCache` 不能是文件系统根，也不能**包含**共享目录、静态目录或配置目录（例如 `dataPath: "."` 被拒绝，基准目录权限保持不变）；缓存与数据目录必须分开且缓存不能包含数据目录。
- TLS 证书/私钥不能位于共享、静态或缓存目录内。
- 数据目录、日志目录、`imgCache.db`、`app.log` 等私有条目若为软链接/联接则拒绝启动；私有目录创建为 0700，凭据/数据库/日志文件 0600。
- 静态目录缺失时 API 仍可用，页面返回 404 `UI_NOT_INSTALLED`。

启动退出码：0 正常停止；75 管理端请求重启；78 配置/启动失败（含 HTTPS 已启用但证书/私钥/端口无法使用）。启动顺序为 fail-closed：先校验 TLS 证书与私钥、绑定全部监听端口，全部成功后才打开数据库并开始接受连接；任一失败时没有任何端口（包括明文 HTTP）接收过请求；supervise 遇 78 停止重启。

### 其他环境变量

- `FILE_SERVER_ACCESS_TOKEN` / `FILE_SERVER_ADMIN_TOKEN`：覆盖长期凭据（各 ≥16 字符且不同）。未提供时首次启动随机生成 2×32 字节 hex 并写入 `<dataPath>/auth.local.json`，日志只打印文件路径，不打印令牌。
- `FILE_SERVER_MANAGED=1`：声明存在重启监督（supervise 子进程、Docker `restart: unless-stopped|always|on-failure`、systemd `Restart=always|on-failure`）。只有此时 `POST /api/admin/restart` 返回 202；服务优雅退出并以 **退出码 75** 结束，由监督者拉起。否则 409。
- `FILE_SERVER_DEPLOYMENT=docker|systemd|supervisor|standalone`：仅用于状态展示，未设置时 managed→`supervisor`，否则 `standalone`。
- `FILE_SERVER_VIPS`（默认 `vips`）、`FILE_SERVER_VIPSHEADER`（默认 `vipsheader`）、`FILE_SERVER_FFMPEG`（默认 `ffmpeg`）：缩略图外部程序。缺失时对应预览返回 503 `PREVIEW_UNAVAILABLE`，不影响其他功能。
- `RUST_LOG` 不使用；日志级别固定 INFO。

## 文件读取 v2（推荐新客户端使用；旧路由保留为过渡兼容）

路径一律通过查询参数 `path` 传递**原始相对路径**（URL 编码一次，`/` 分隔，空串或省略 = 根目录）。不再有 `$`/`$$` 根别名，也不解析 `!WxH` 后缀，因此名为 `$` 的目录与名为 `a.jpg!320x240` 的文件均可正常访问。认证与旧接口相同：会话 cookie / `Authorization: Bearer` / `X-File-Token` / `?ticket=`（只读）/ `publicRead`。

| 方法与路径 | 说明 |
|---|---|
| `GET /api/v2/files?path=<rel>&sta=0&end=200` | 目录列表，响应 DTO 与 `/list` 相同 `{listNum,list:[{name,size,isDirectory,isFile,suffix,mtime}],nextStart}` |
| `GET\|HEAD /api/v2/content?path=<rel>` | 原文件流，Range/后缀 Range/If-Range/ETag/304，与 `/getFile` 相同的 sandbox CSP 与附件规则 |
| `GET\|HEAD /api/v2/preview?path=<rel>&kind=image&width=320&height=240` | 图片缩略图（JPEG/PNG/GIF/SVG/WebP 源；1–5000，总像素 ≤1600 万） |
| `GET\|HEAD /api/v2/preview?path=<rel>&kind=video` | 视频截图（最大 320×240，第 1 秒，短视频回退第 0 秒）；`width/height` 被忽略 |

预览始终返回 `image/jpeg`。预览错误：400 参数无效、413 源图像素超限（>6400 万）、422 无法解码 `PREVIEW_FAILED`、429 队列已满、503 维护中 `MAINTENANCE` 或未安装程序 `PREVIEW_UNAVAILABLE`、504 超时 `PREVIEW_TIMEOUT`。

## 认证与会话

| 接口 | 说明 |
|---|---|
| `POST /api/auth/login {token}` | 文件令牌→`role:"file"`，管理令牌→`role:"admin"`。响应 `{sessionToken, readTicket, expiresAt, ticketExpiresAt, role, sessionId, writeEnabled, uploadEnabled}`；同 IP 15 分钟 10 次失败后 429 `RATE_LIMITED`；错误 401 `INVALID_TOKEN` |
| `GET /api/auth/session` | `{role, expiresAt, sessionId}`，无效 401 |
| `POST /api/auth/ticket` | 续期只读票据 `{readTicket, ticketExpiresAt}`（票据 1 h，仅可用于 GET 读取；长期令牌请求头调用返回 400 `TICKET_REQUIRES_SESSION`） |
| `POST /api/auth/logout {role?}` | 撤销 Bearer 会话；否则撤销 `role` 指定角色的 cookie 会话（省略 = 优先级最高的已出示会话）。只清除对应角色的 cookie |

**角色分离 cookie（相对 Node 的修正）**：文件会话 `fs_session`、管理会话 `fs_admin_session`，均 `HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`，HTTPS 或 `secureCookies` 时加 `Secure`。登录只设置本角色 cookie，因此同一浏览器先登录管理端再登录文件端不会覆盖管理会话（旧设计共用 `fs_session`，导致只读 cookie 的管理日志 WebSocket 失效）。身份识别顺序：`Authorization: Bearer` → `fs_admin_session` → `fs_session` → `X-File-Token`/`X-Admin-Token` 长期令牌请求头；某角色 cookie 中放入另一角色的会话令牌不被接受。前端无需读取 cookie，`credentials: 'include'` 即可。会话 8 h，进程内存保存（重启后需重新登录）。

非 GET/HEAD 请求若带 `Origin`，必须与 `scheme://Host` 相同或在 `allowedOrigins` 中，否则 403 `ORIGIN_REJECTED`（含登录）。CORS 仅对 `allowedOrigins` 返回 `Access-Control-Allow-Origin`+`Credentials`，暴露 `Content-Range, Accept-Ranges, Content-Disposition, X-Export-Truncated, X-Request-Id`。

## 通用约定

- 错误体统一 `{msg, code?, requestId, errors?}`；每个响应带 `X-Request-Id`、`X-Content-Type-Options: nosniff`、`Referrer-Policy: no-referrer`、`X-Frame-Options: DENY`。
- JSON 请求体必须 `Content-Type: application/json`，上限 16 KB（上传除外）。
- 非上传请求的处理期限 120 s 只约束到响应头产生，**下载/视频流不受 120 s 限制**；连接请求头读取 15 s 超时；每个监听器最多 256 个活跃连接，超出直接关闭新连接。
- 目录排序为 UTF-16 码元顺序（与 JavaScript 默认 `Array.prototype.sort` 字符串比较一致）；隐藏项（`.` 开头）、软链接、非 UTF-8 名称不列出也不可访问。
- 健康检查：`GET /health/live` → `{status:"ok"}`；`GET /health/ready` → 200 `{status:"ready"}` 或 503（数据库不可用/正在关闭）。

## 旧文件接口（保留）

`GET /list[/<path>]?sta&end`（`$`/`$$` 根别名保留）、`GET|HEAD /getFile/<path>`（`a.jpg!WxH` 仍为缩略图语法）、`GET /getVideoPreview/<path>`、`POST /delFile {filePath}`、`POST /renameFile {oldPath,newPath}`、`POST /upload`（multipart：`destPath` 字段必须在唯一的 `file` 字段之前；最多 3 个字段）。

- 写入需要会话/长期令牌 **且** `writeEnabled`（否则 403 `WRITE_DISABLED`）；上传另需 `uploadEnabled`。`publicRead` 与票据永远不授予写权限。
- 上传：写入同目录隐藏临时文件后以硬链接发布，**从不覆盖**（409）；超过 `uploadMaxSizeMB` 413；总期限 `uploadTimeoutSeconds`、空闲期限 `uploadIdleTimeoutSeconds` 超时 408；任何失败/断开都会删除临时文件；同时最多 4 个上传。
- 删除/重命名拒绝共享根、`..`、软链接、隐藏名；重命名不覆盖（409），禁止改成可执行网页扩展名（`.html .htm .xhtml .shtml .js .mjs .mhtml .svg .xml`，400）。
- 预览失败旧路由与 v2 相同：无法解码 422（Node 为 500）。

## 静态托管

`staticDir/web` 挂在 `/`，`staticDir/admin` 挂在 `/admin/`（`/admin` 308 重定向到 `/admin/`）。`/admin/*` 无扩展名且**确实不存在**的路径回退 `admin/index.html`（history 路由）；被拒绝的路径（软链接、隐藏文件、穿越）返回 403，绝不伪装成 index。所有静态路径（包括 `web`/`admin` 目录本身与 `index.html`）都从已校验的 `staticDir` 根逐段解析并拒绝软链接。`/assets/*` 带 `immutable` 缓存，其余 `no-cache`。未知 `/api/*` 返回 JSON 404。

## 管理接口 `/api/admin/*`

全部要求管理身份（否则 401 `AUTH_REQUIRED` "需要管理员认证"），响应 `Cache-Control: no-store`。

| 接口 | 说明 |
|---|---|
| `GET status` | 见下 |
| `GET cache/stats[?refresh=true]` | `{sampledAt,totalFiles,totalSize,imageCache{count,size},videoCache,legacyCache,dbSize,database{main,wal,shm,total,recordCount},maintenance,policy{cacheMaxSizeMB,cacheRetentionDays,autoCleanupEnabled},lastCleanupAt}`；15 s 缓存，refresh 单飞共享扫描。`lastCleanupAt` 重启后从 SQLite 中最近一次成功的缓存任务恢复 |
| `POST cache/jobs {mode:"expired",days}` / `{mode:"all"}` / `{mode:"policy"}` | 202 `{job}`；同时只允许一个（409）；只删除受管缓存名 `^[0-9a-f]{64}\.(jpg|…)$`，其他文件保留；维护期间新预览 503 `MAINTENANCE` |
| `POST cache/clean {days}` / `{all:true}` | 旧同步接口，返回 `{msg,cleaned,freedBytes,failed}` |
| `GET jobs?limit=25&before=` / `GET jobs/{id}` | 任务 `{id,type,status:queued|running|succeeded|failed|interrupted,createdAt,startedAt,finishedAt,progress{processed,total},result{cleaned,freedBytes,failed},error}`；分页 `{jobs,nextBefore}` |
| `GET audit?limit=50&before=` | `{entries:[{id,time,action,actor,target,result,details}],nextBefore}`；动作 `auth.login`、`auth.logout`、`auth.rate_limit`、`session.revoke`、`config.save`、`config.rollback`、`server.restart`、`cache.cleanup`、`file.upload`、`file.delete`、`file.rename` |
| `GET logs` | 见日志 |
| `GET logs/export?format=csv|json&…` | 最多 10000 条，`X-Export-Truncated: true|false`；CSV 带 BOM，公式前缀转义 |
| `GET logs/stream`（WebSocket） | 见日志 |
| `GET config` / `POST config/validate` / `PUT config` / `POST config/rollback` / `GET config/export` | `{revision, values, fields[{key,type,min,max,integer,restartRequired,readonly}], pendingRestart, backupAvailable, …}`；写操作体 `{revision, values}`（rollback 只需 `revision`）；revision 过期 409 `STALE_REVISION`；字段错误 400 `{errors:{key:msg}}`；保存为原子写+备份；不需要重启的字段即时生效（publicRead、writeEnabled、uploadEnabled、上传限额/期限、allowedOrigins、secureCookies、缓存策略） |
| `POST restart` | 仅 `FILE_SERVER_MANAGED=1` 时 202 `{msg,bootId}`，随后优雅退出码 75；否则 409 `RESTART_UNSUPPORTED`；缓存维护中 409 `MAINTENANCE` |
| `GET sessions` / `DELETE sessions/{id}` | `{sessions:[{id,role,createdAt,expiresAt,lastSeenAt,current}]}`；撤销当前会话时清除对应角色 cookie |
| `GET database/status` | `{main,wal,shm,total,dbSize,recordCount,tables,schemaVersion}` |

### `GET /api/admin/status`

```
{ sampledAt, bootId,
  cpu: { usage: number|null, cores, warmingUp },          // 首次采样无差值 → null + warmingUp:true
  memory: { total, free, used, usage, scope:"host" },      // MB；free = 可用内存
  disk: { total, used, free, usage, available, scope:"shared-filesystem", sampledAt }, // GB(1 位小数)；不可用时全部 null + available:false
  process: { rss, heapUsed: null, heapTotal: null },       // rss 字节；Rust 无 JS 堆，固定 null
  server: { uptime, runtime:"rust", version, nodeVersion:null, httpPort, httpsPort,
            httpStatus, httpsStatus:"running|disabled|stopped|error", restartSupported, restartReason?, deployment },
  queues: { image{active,pending,limit}, video{…}, upload{active,pending:0,limit:4}, maintenance },
  history: [{ time, cpu, memory, processRss }],            // 5 s 采样，最多 120 点
  alerts: [{ level, message }] }
```

未知值一律 `null`，绝不以 0 冒充。

## 日志

- 文件：`<dataPath>/logs/app.log`（10 MB 轮转 `app.log.1..3`，读取也支持 `.gz`），supervise 写 `restart.log`。行格式 `[ISO-8601Z] [LEVEL] [category] [eventId=uuid] message`；凭据（`token=`、`Bearer`、`Basic`、JSON 中的 token/password 字段等）在写入前脱敏。
- `GET /api/admin/logs?level=&keyword=&start=&end=&limit=100(1–1000)&source=application|supervisor&order=time|append&before=<cursor>` → `{logs:[{id,timestamp,level,category,message,source}],total,order,nextCursor}`。
  - `order=time`：按时间倒序。`order=append`：按物理追加顺序倒序，游标绑定文件身份+偏移，轮转后仍稳定；文件被截断/游标对应文件消失 409（需刷新）；游标与排序不匹配 400。
  - `id` 为 24 位 hex，同一事件在快照与 WebSocket 中相同；相同文本的两行 id 不同。
- WebSocket `GET /api/admin/logs/stream`：需要管理身份（`fs_admin_session` cookie 或 Bearer）且 Origin 同源/允许；每条消息为一个日志对象（同上）；客户端可发 `{"action":"filter","level":"error"}`。每秒复核会话，撤销/过期后关闭码 1008；客户端过慢 1013；服务关闭 1001。

## 与 Node 版差异与迁移说明

| 项 | Node | Rust | 客户端/运维动作 |
|---|---|---|---|
| `POST /restartServer {pwd}` | 密码重启 | 410 `ENDPOINT_REMOVED` | 使用管理端 `POST /api/admin/restart`（前端已移除旧按钮） |
| `/cleanOldData/{day}` | 清理 | 405 | 使用 `POST /api/admin/cache/jobs` |
| 会话 cookie | 共用 `fs_session` | `fs_session` + `fs_admin_session` | 无需改动；退出管理端可传 `{role:"admin"}` |
| 状态 `process.heapUsed/heapTotal`、`server.nodeVersion` | 数值 | `null` | 显示“不适用”；改用 `server.runtime/version` |
| 重启不受监督 | 可能自杀式退出 | 409 `RESTART_UNSUPPORTED` + `restartSupported:false` + `restartReason` | 按 `restartSupported` 禁用按钮 |
| 预览解码失败 | 500 | 422 `PREVIEW_FAILED` | 当作“无法预览” |
| JSON 请求 | 宽松 | 必须 `application/json` | 现有前端已满足 |
| 下载 120 s 超时 | 有 | 无（流式） | — |
| HTTPS 证书错误 | 仅 HTTP 继续 | 拒绝启动（退出 78） | 修正证书或关闭 `httpsEnabled` |
| 特殊文件名 | `$`、`!WxH` 冲突 | v2 接口无歧义 | 新代码用 `/api/v2/*` |
| 默认 | 示例密码、写入开启 | 仅 loopback、写入/上传关闭、随机凭据 | 在 `config.local.json` 或后台显式开启 |

**数据迁移**：Rust 默认数据目录为 `server-rust/data`（或打包目录 `data/`），不能再把 `dataPath` 设为包含共享/配置目录的 `.`。如需沿用 Node 的 `imgCache.db`，停止服务后复制到 `<dataPath>/imgCache.db`：迁移是非破坏、只增列/表（`user_version=2`），旧表数据保留。预览缓存键已改版（`preview-rust-v1`），旧缩略图文件不再命中，会被 LRU/过期策略逐步清理或通过“清空缓存”删除。旧明文凭据 `123456` 不会被沿用，首次启动会生成随机凭据到 `auth.local.json`（也可用 `accessToken`/`restartPwd` 私有配置或环境变量指定）。

## 开发与测试

```
export PATH=$HOME/.cargo/bin:$PATH
cargo fmt --manifest-path server-rust/Cargo.toml --check
cargo clippy --manifest-path server-rust/Cargo.toml --all-targets --locked -- -D warnings
cargo test --manifest-path server-rust/Cargo.toml --locked
```

集成测试（`server-rust/tests/api.rs`）在临时目录启动真实 TCP 服务；预览用例需要 `ffmpeg`、`vips`、`vipsheader`（缺少 ffmpeg 时自动跳过生成夹具）。
