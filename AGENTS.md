# File Serve 开发约定

## 项目结构

- `server/index.js`：配置、HTTP/HTTPS、优雅退出和日志流启动。
- `server/app.js`：可测试的 Express app 工厂，保留旧文件 API 路径与响应字段。
- `server/configuration.js`：安全默认值、私有配置、环境覆盖与随机凭据初始化。
- `server/middleware/auth.js`：访问/管理身份、HttpOnly 会话、只读媒体票据、登录限速与来源检查。
- `server/utils/fileSafety.js`：路径边界、软链接策略、文件名规范化、不覆盖发布、受控并发。
- `server/utils/previews.js`：图片/视频缩略图、缓存键、任务合并及队列。
- `server/utils/logStream.js`：同时供 HTTP/HTTPS 使用的认证 WebSocket 日志。
- `server/services/`：后台配置持久化、脱敏日志查询、实际采样、缓存维护任务和管理审计。
- `server/sqllite.js`：单例与可注入数据库路径，启动时非破坏性建表。
- `server/test/`：使用真实本地 HTTP、临时文件、SQLite、sharp 与 FFmpeg 的 Node 测试。
- `web/`：Vue 3/Vant 用户客户端，hash 路由，支持登录、分页和图片墙虚拟滚动。
- `admin/`：Vue 3 管理后台，history 路由，base `/admin/`，使用管理会话 cookie。
- `flutter-app/`：Flutter 原生客户端；访问凭据只换取内存中的临时会话，上传/下载携带认证头。
- `shared/API_DOCUMENTATION.md`：文件与认证 API；后台完整响应约定见 `shared/ADMIN_CONTRACT.md`，修改接口须同步更新。

## 修改规则

- 后端为 ESM，Express 4。Node 运行至少 20.19；当前管理前端依赖要求构建机至少 22.18。
- 任何文件路径都必须经过 `resolveSafePathAsync`（请求中使用异步版本）或 `resolveSafePath`。不得退回字符串 `startsWith` 判断目录边界。
- 拒绝软链接、目录联接、隐藏文件和上传临时文件；共享根目录禁止删除与改名。
- 内部路径使用原始名称，只有 URL 边界编码一次。不要把 `$` / `__` 当路径分隔符。
- 文件接口读取必须通过 `readRequired`，写入通过 `writeRequired`；管理接口只通过 `adminRequired`。只读票据不能获得写入或管理权限。
- 文件访问令牌和管理令牌不能相同，不能保存演示弱口令，不能在前端硬编码或持久化原始密码。
- 原始上传文件名须先规范化，再检查扩展名。重命名也必须检查最终名称。不要用黑名单替代 sandbox CSP 与安全下载响应头。
- 上传与普通文件移动使用同盘 `link` + `unlink` 做不覆盖发布，不可失败后回退成会覆盖目标的 `rename`。目录移动有进程内目标锁，但不保证防御恶意本地进程竞态。
- 目录分页先选择目录项，再受控并发读取所选项的元数据；每项异常独立处理。不得在异步回调内使用未捕获同步 stat。
- 图片输出为 JPEG，缓存文件扩展名和 MIME 均一致。缓存键包含原文件版本信息；缓存完成落盘后才写数据库。
- 缩略图队列和上传并发须有上限，视频进程必须有超时。
- SQLite 表结构变更需非破坏性迁移；普通启动不得调用 DROP 或 init。
- `config.local.json`、`auth.local.json`、运行数据库和用户证书不能提交或打包。
- 写日志不得包含长期令牌、临时票据、Authorization/Cookie 或登录请求体。
- 后台配置仅允许白名单字段；保存须校验 revision、原子写入数据目录中的私有覆盖文件，不能改写打包默认配置或暴露凭据。维护缓存前必须阻止新预览并等待在途任务。
- `VITE_ADMIN_PREVIEW=1` 仅供标明模拟数据的隔离演示，生产构建必须不设置。管理会话只存内存/HttpOnly cookie，不存 localStorage。
- HTTP 默认 loopback；启用内网监听/TLS/写入属于部署者的显式选择。

## 构建与检查

```bash
npm --prefix server ci
npm --prefix web ci
npm --prefix admin ci
npm --prefix server test
npm --prefix web test -- --run
npm --prefix admin test -- --run
npm run assemble
npm run pack
```

Flutter 改动需执行 `flutter analyze` 和 `flutter test`，并说明未验证的目标平台。当前 `dart:io` 路径不是完整 Flutter Web 适配。

`assemble.js` 构建并同步两个前端到服务端目录；包内必须有两套最新产物。`pack.js` 缺产物立即失败，只输出安全配置模板，不复制实时配置或私钥。

`node init.js --force` 是清空缓存、日志和缓存数据库的显式维护命令，不是部署步骤。Docker 直接运行 `index.js`，由 Docker 重启策略管理，不嵌套守护进程。

## 测试边界

安全测试必须仅使用独立临时目录，不能对用户共享目录运行删除/重命名测试。重点回归：兄弟目录前缀、Windows 盘符、软链接、匿名写入、只读票据权限、文件名规范化、同名上传冲突、来源白名单、分页边界、Range 后缀、缓存源文件更新、视频临时输出与非破坏性建表。
