# 旧 Node 服务说明（迁移回退用）

以下是迁移前版本的历史说明。新版客户端使用 Rust v2 读取协议，不能按本文直接与旧 Node 搭配部署；回退应取迁移前完整版本与对应客户端，参见 [迁移说明](RUST_MIGRATION.md)。

面向 NAS 图片与视频浏览，不改变原文件目录结构。服务端使用 Express、sharp 和 FFmpeg，提供 Web、Flutter 跨端客户端及管理后台。

## 安全升级须知

新版本默认需要登录、关闭文件写入和上传，并只监听 `127.0.0.1`。旧版本的演示密码 `123456` 不再生效，升级不会删除原文件、旧缩略图或数据库；旧客户端需升级以支持登录及分页。

- 文件访问令牌与管理令牌分离；两者必须不同且各至少 16 个字符。
- 首次启动自动生成随机令牌，保存在 `auth.local.json`，不输出到日志。环境变量优先于文件配置。
- 不再分发开发者的配置与证书私钥。生产部署请使用 HTTPS 反向代理，或自行提供证书并启用 HTTPS。
- 共享目录不得是系统根目录，也不得包含服务端源码、运行配置、数据库或缓存目录。
- 隐藏文件、上传临时文件、软链接与 Windows 目录联接不对外提供访问。
- 这是单用户共享服务，不是具有用户隔离、配额与审计体系的企业网盘。不要把明文 HTTP 直接暴露到公网。

## 从源码运行

服务端运行需要 Node.js ≥ 20.19；构建当前管理后台的依赖需要 Node.js ≥ 22.18，建议统一使用 Node 22。

```bash
git clone https://github.com/ZhengHaoF/file_server.git
cd file_server
npm --prefix server ci
npm --prefix web ci
npm --prefix admin ci
npm run assemble
```

在 `server/config.local.json` 写入私有配置（该文件不会提交或打包）：

```json
{
  "rootPath": "/absolute/path/to/shared/files",
  "host": "127.0.0.1",
  "writeEnabled": false,
  "uploadEnabled": false
}
```

Windows 的目录可填写 `"D:\\照片"`。然后：

```bash
cd server
node start.js
```

访问 `http://127.0.0.1:3000`，输入 `auth.local.json` 中的 `accessToken`。管理后台位于 `/admin/`，使用其中的 `restartPwd`。Flutter 在“设置 → 登录文件服务”输入访问令牌，原始令牌不保存在应用偏好设置中。

通过可信内网访问时，可把 `host` 改为 `0.0.0.0`，并配置防火墙与 HTTPS。需要删除、重命名时启用 `writeEnabled`；需要上传时还须同时启用 `uploadEnabled`。后台保存时会列出差异与风险提示，区分立即生效和需要重启的字段。

## 管理后台

后台提供概览、缓存、日志、配置、任务与审计、会话六个工作区，支持浅色/深色主题和移动端。

- 概览显示真实采样、主机资源与当前 Node 进程内存，HTTPS 未配置显示为“未启用”；网络异常不伪装为零值或自动退出。
- 缓存区区分图片、视频和历史未分类缓存，显示 SQLite 主文件、WAL 与 SHM；支持按天、全部、容量/保留策略维护。清理只作用于可识别的派生缓存，未知名称和软链接保留；暂停新预览并等待已有任务结束，不删除原文件。
- 日志支持历史分页、时间/级别/关键词过滤、认证实时流与 CSV/JSON 导出；“清空显示”不会删除服务器日志。
- 配置保存采用版本校验、字段白名单、差异确认、原子写入和一次备份回滚。管理令牌、访问令牌和私钥不通过后台编辑或导出。
- 会话使用非凭据 ID，支持撤销其他会话、当前会话与退出登录；撤销同时使关联媒体票据失效。
- 缓存维护任务和管理操作记录保存在 SQLite，重启前未完成任务标为中断，不假报成功。审计最多保留 5000 条，任务最多保留 100 条；它不是防篡改合规日志。

后台覆盖文件保存在 `dataPath/admin-config.local.json`，备份为 `admin-config.backup.local.json`，按私有文件权限写入。两者均不提交或打包；Docker 中保存在数据卷，而不是写入只读挂载的 `config.local.json`。共享目录、监听地址、端口、直接 HTTPS 变更需要重启；访问开关、上传限制与缓存策略对新请求立即生效。环境变量控制的共享目录在后台只读。

重启按钮只在 `node start.js` 守护运行或受管 Docker 容器中可用。请求被接受不等于恢复成功；后台等待新启动标识或登录接口恢复，并提示重新登录。更改端口/地址后可能需要手动访问新地址，不能保证旧页面自动恢复。

## 配置项

加载顺序：`config.json` → `config.local.json` → `dataPath/admin-config.local.json` → 环境变量覆盖指定字段。提交到仓库的 `config.json` 只提供安全默认值。

| 字段 | 默认值 | 说明 |
|---|---|---|
| `rootPath` | `./files` | 已存在的共享目录 |
| `imgCache` | `./imgCache` | 共享目录之外的缩略图目录 |
| `dataPath` | `.` | 数据库和自动生成令牌的运行目录 |
| `accessToken` | 自动生成 | 文件访问令牌 |
| `restartPwd` | 自动生成 | 管理令牌，兼容旧重启接口 |
| `publicRead` | `false` | 显式开放匿名读取，不开放写入 |
| `writeEnabled` | `false` | 允许已登录的文件访问者删除、重命名及上传 |
| `uploadEnabled` | `false` | 上传额外开关 |
| `uploadMaxSizeMB` | `4096` | 单文件上传上限，按实际传输字节检查 |
| `host` / `port` | `127.0.0.1` / `3000` | HTTP 监听地址 |
| `httpsEnabled` / `httpsPort` | `false` / `3001` | 是否启动独立 HTTPS 服务 |
| `certPath` / `keyPath` | `./cert/file.crt` / `./cert/private.pem` | 用户自行提供的证书与私钥 |
| `allowedOrigins` | `[]` | 单独部署前端或 TLS 代理时允许的明确来源，例如 `https://files.example.com`，不允许通配符 |
| `secureCookies` | `false` | TLS 反向代理后设为 `true`；直接 HTTPS 自动使用 Secure cookie |
| `cacheMaxSizeMB` | `0` | 派生缓存容量上限，0 不按容量淘汰 |
| `cacheRetentionDays` | `30` | 自动维护按最近访问保留天数 |
| `autoCleanupEnabled` | `false` | 每分钟检查并执行缓存策略 |

环境变量：`FILE_SERVER_ROOT`、`FILE_SERVER_ACCESS_TOKEN`、`FILE_SERVER_ADMIN_TOKEN`、`FILE_SERVER_DATA_DIR`、`FILE_SERVER_CACHE_DIR`。请勿把实际令牌写进公开文档或 URL。

会话有效期为 8 小时，媒体 URL 使用只读随机票据，有效期为 1 小时；客户端刷新列表时续签票据。带票据的分享链接等同临时只读凭据，请只分享给可信对象；退出登录会撤销该会话的票据。服务重启后需重新登录。

## 测试和分发

```bash
npm --prefix server test
npm --prefix web test -- --run
npm --prefix admin test -- --run
npm run assemble
npm run pack
```

打包必须已有最新的 Web 与管理后台构建产物，否则失败。Windows 产物为 `file-serve-v<版本>.zip`，Linux/macOS 为 `.tar.gz`；包内不含依赖、原始文件、运行凭据、私有配置或证书。目标机器安装 Node 后，修改共享目录并双击 `启动.bat`，或在分发目录执行 `npm ci --omit=dev && node start.js`。

数据库在启动时非破坏性建表，无需先执行初始化脚本。`node init.js --force` 是显式清空缓存、日志和缓存数据库的维护操作，不是安装步骤。

## Docker

先在仓库根目录执行 `npm run assemble`。创建 `server/files/` 和 `server/config.local.json`（容器内须监听 `0.0.0.0`）：

```json
{
  "host": "0.0.0.0",
  "writeEnabled": false,
  "uploadEnabled": false
}
```

然后在 `server/` 执行 `docker compose up -d --build`。端口只发布到宿主机 loopback，运行数据保存在命名卷，默认不暴露公网；原文件目录保持挂载，容器以非 root 用户运行，挂载目录须给予相应权限。可用 `docker compose exec file-serve cat data/auth.local.json` 在自己的终端查看首次生成的令牌。

## 边界与后续优化

- 图片生成并发最多 4 个，视频截图最多 2 个，上传最多 4 个；相同缩略图任务合并，视频处理有 30 秒超时。
- 目录枚举仍需要读取目录项，但仅对请求页执行异步元数据读取；Web 图片墙使用虚拟滚动，Flutter 使用 builder 列表。
- 文件落盘使用同盘硬链接实现不覆盖发布；不支持硬链接的文件系统会失败而不会回退覆盖。目录改名只提供进程内冲突防护。
- 路径检查不能消除恶意本地进程在检查与操作之间替换目录的所有竞态。服务应使用最小权限账户，且不应允许不可信本地进程修改共享目录结构。
- 暂未增加断点续传上传、完整 Flutter Web 文件系统适配、全文搜索或多用户权限体系。
- 后台没有多管理员账户、RBAC、邮件告警、远程证书上传或防篡改审计；主机指标不是容器 cgroup 配额，进程内存单独列出。容量限制为定时清理策略，不是每次生成前的硬配额。

API 约定见 [shared/API_DOCUMENTATION.md](../shared/API_DOCUMENTATION.md)，开发约定见 [AGENTS.md](../AGENTS.md)。
