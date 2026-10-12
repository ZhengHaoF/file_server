# File Serve API 文档

HTTP 默认 `127.0.0.1:3000`；HTTPS 默认关闭，可由部署者启用。错误响应统一为 `{ "msg": "说明" }`，不要依据错误文字判断权限。

## 认证与权限

`POST /api/auth/login`，JSON 请求体 `{ "token": "<访问令牌或管理令牌>" }`。返回 `sessionToken`、`readTicket`、`expiresAt`、`ticketExpiresAt`、`role`、`writeEnabled` 和 `uploadEnabled`；浏览器同时收到 HttpOnly、SameSite=Strict 的 `fs_session` cookie。

- 会话 `sessionToken` 有效期 8 小时，非浏览器客户端通过 `Authorization: Bearer <sessionToken>` 传递。
- 浏览器默认使用 HttpOnly cookie，不保存原始密码。跨来源部署须配置 `allowedOrigins`；跨站 cookie 受浏览器限制，Web 客户端登录后可在内存中使用 Bearer 会话。
- 图片、播放器及临时分享 URL 可携带 `?ticket=<readTicket>`，有效期 1 小时，只能读取，不能写入或进入管理后台。票据不是原始长期令牌，请仍把它视作敏感凭据。
- `POST /api/auth/ticket` 凭会话续签只读票据；`POST /api/auth/logout` 撤销会话与其票据。
- 脚本也可使用 `X-File-Token` 访问文件接口，或 `X-Admin-Token` 使用管理令牌。两个长期令牌必须不同且各至少 16 个字符。
- `publicRead: true` 仅允许匿名读取。写操作须登录并开启 `writeEnabled`；上传还须开启 `uploadEnabled`。管理接口只接受管理身份。
- 登录失败超过每 IP 每 15 分钟 10 次时返回 429。服务重启会使内存会话和票据失效。
- 所有跨来源状态变更受 Origin 白名单限制。经 TLS 代理时请配置代理公开来源和 `secureCookies: true`，不要在未受信任的代理后开启 trust proxy。

## 文件端点

| 方法与路径 | 权限 | 请求与响应 |
|---|---|---|
| `GET /list/:filePath(*)` | 读取 | 相对路径按 URL 编码一次；`$` / `$$` 只表示根目录。`sta` 起始、`end` 不包含的结束索引；默认 200 项，单页上限 2000。返回 `{listNum,list,nextStart}`，`nextStart: null` 表示结束 |
| `GET /getFile/*` | 读取 | 原文件流；支持标准 Range、后缀 Range、If-Range。动态内容只以附件与 sandbox CSP 返回 |
| `GET /getFile/photo.jpg!320x240` | 读取 | 缩略图，输出始终为 `image/jpeg`；单边 1–5000，总像素不超过 1600 万。支持 JPEG/PNG/GIF/SVG/WebP 输入 |
| `GET /getVideoPreview/:path(*)` | 读取 | 在第 1 秒生成最大 320×240 的 JPEG 视频截图，处理上限 30 秒 |
| `POST /delFile` | 写入 | JSON `{filePath}`；支持递归删除目录，禁止根目录、软链接与共享目录外路径 |
| `POST /renameFile` | 写入 | JSON `{oldPath,newPath}`；目标已存在返回 409，不允许改成可执行网页文件类型 |
| `POST /upload` | 写入与上传开关 | multipart，`destPath` 必须先于 `file`；单文件，规范化后的名称仍须通过类型检查；大小超限 413、同名 409 |
| `POST /restartServer` | 管理 | 兼容 JSON `{pwd}`（仅强管理令牌），或正常管理会话；只有通过守护程序启动才能自动重新拉起 |
| `GET /cleanOldData/:day` | 管理 | 旧接口返回 405，改用下面的 POST 管理接口，不再通过 GET 修改缓存 |

列表中的文件项仍保留 `name`、`size`、`isDirectory`、`isFile`、`suffix` 和 `mtime`。目录按名称稳定排序后分页；隐藏文件、临时文件和软链接不列出，单项读取失败会跳过，不中断整个服务。请求页越界时返回空列表。

名称中的 `$` 和 `__` 保留原义，不再用作路径分隔符。URL 路径只编码一次，JSON/multipart 的路径传递原始相对路径；文件名包含 `%`、`#`、中文时同样适用。

上传先写 `.fsupload-<uuid>` 临时文件，再通过同盘硬链接进行原子不覆盖发布并移除临时名。异常退出可能留下临时文件，它们不能通过文件接口读取，可在服务停止后自行清理。上传与普通文件改名不支持硬链接的目标文件系统会失败，不会回退成覆盖。

## 管理端点

下列端点统一要求管理身份；WebSocket 使用管理会话 cookie（或非浏览器客户端的认证头），不接受 URL 中的管理密码。

| 方法与路径 | 功能 |
|---|---|
| `GET /api/admin/status` | CPU、内存、磁盘、进程状态 |
| `GET /api/admin/cache/stats` | 图片/视频/历史缓存及 SQLite main/WAL/SHM，异步统计缓存 15 秒，`refresh=true` 强制刷新；生成和维护使缓存失效 |
| `POST /api/admin/cache/clean` | `{days: 1..3650}` 按数据库最近访问时间清理，或 `{all:true}` 清空 |
| `POST /api/admin/cache/jobs` | `{mode:"expired"\|"all"\|"policy",days?}`，202 返回可轮询的持久化任务 |
| `GET /api/admin/jobs` / `GET /api/admin/jobs/:id` | 任务历史及进度，`limit`/`before` 分页 |
| `GET /api/admin/audit` | 管理操作记录，`limit`/`before` 分页 |
| `GET /api/admin/logs` | `level`、`keyword`、`start`、`end`、`source`、`limit`、`before`；稳定游标，上限 1000 条 |
| `GET /api/admin/logs/export` | 同样过滤，`format=csv\|json`，最多 10000 条；CSV 防公式注入 |
| `GET /api/admin/config` | 脱敏兼容字段，以及 revision、values、fields、pendingRestart、backupAvailable |
| `POST /api/admin/config/validate` | `{revision,values}`，返回差异和风险提示 |
| `PUT /api/admin/config` | `{revision,values}`，原子保存白名单字段，过期版本 409，非法字段 400 |
| `POST /api/admin/config/rollback` | `{revision}`，恢复上次备份 |
| `GET /api/admin/config/export` | 可编辑的非凭据配置 JSON |
| `GET /api/admin/sessions` / `DELETE /api/admin/sessions/:id` | 会话非凭据 ID 列表与撤销，不能获得真实令牌 |
| `GET /api/admin/database/status` | 缓存数据库状态 |
| `POST /api/admin/restart` | 202 已接受并返回旧 bootId；无守护/维护中返回 409，前端另行验证恢复 |
| `WS /api/admin/logs/stream` | HTTP 与 HTTPS 均可接入；HTTPS 页面须使用 `wss://` |

`GET /api/auth/session` 返回当前 `role`、`expiresAt`、非凭据 `sessionId`。后台状态与会话接口禁止缓存；日志实时流同样在会话撤销后关闭。完整数据字段、单位、配置加载与任务状态约定见 [ADMIN_CONTRACT.md](ADMIN_CONTRACT.md)。

## 缓存与错误码

缩略图缓存键包含缓存版本、文件完整路径、文件大小、修改/变更时间和变换参数。JPEG 缓存落盘后才建立数据库记录；同一键的并发生成会合并。HTTP 响应要求重新验证，避免原文件修改后浏览器仍使用旧缩略图。

数据库启动时只做 `CREATE TABLE/INDEX IF NOT EXISTS`，兼容原有表，不自动清空。缓存最近访问时间最多每分钟刷新一次；按天清理不以文件 mtime 代替最近访问时间。

| 状态码 | 含义 |
|---|---|
| 400 | 无效路径、参数、文件名或类型 |
| 401 | 未登录、会话过期或身份不满足 |
| 403 | 目录边界、来源或功能开关限制 |
| 404 | 文件/目录不存在 |
| 405 | 已弃用的 GET 清理接口 |
| 409 | 目标名称冲突 |
| 413 | 文件大小超限 |
| 416 | 无法满足的 Range |
| 429 | 登录限速或处理队列已满 |
| 500 | 服务处理失败或目标文件系统不支持安全发布 |
