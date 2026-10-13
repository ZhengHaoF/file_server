# File Serve 开发约定

## 当前架构

- `server-rust/` 是唯一服务端，Rust二进制 `file-server` 同域托管文件客户端与 `/admin/`，不使用Tauri。
- `server-rust/src/` 包含配置、认证、文件流、预览队列、SQLite、静态托管与管理接口；`tests/` 使用隔离数据和真实TCP服务。
- `web/` 是Vue/Vant文件客户端；`admin/` 是Vue管理后台，history base为 `/admin/`；`flutter-app/` 是原生客户端。
- 正式服务契约见 `shared/RUST_API.md`，管理交互见 `shared/ADMIN_CONTRACT.md`，迁移与回退见 `docs/RUST_MIGRATION.md`。
- 旧Node后端、旧打包入口和专用CI已移除。Node22只用于Vue构建、测试及仓库脚本；不要重新引入 `server/` 或 `dev:legacy`。
- 用户允许改革不合理的协议/交互/架构，但必须同步调整客户端、契约和回归测试。

## 安全与实现

- 路径必须按组件验证真实目录边界，拒绝软链接/reparse、隐藏路径和临时上传文件；共享根禁止删除或改名。不以字符串前缀代替路径包含检查。
- 启动与后台root候选复用隔离规则，校验必须早于mkdir/chmod；配置、凭据、数据库和日志不能进入共享或静态路径。私钥不能位于共享、静态或缓存目录。
- 文件/管理角色分离，分别使用 `fs_session` / `fs_admin_session`。只读票据不能取得写入或管理权限；管理凭据不能放URL，原始凭据不能持久化在浏览器。
- 内部使用原始相对路径，只在URL边界编码一次。当前客户端读取使用 `/api/v2/*` 显式参数，空path为根，`$`/`$$`/`!尺寸`保持字面意义。
- 上传和普通文件改名采用同盘安全不覆盖发布，不支持时明确失败，不能回退成覆盖rename。目录操作有进程内锁，不承诺抵御恶意本地进程挂载点替换。
- 分页后受限并发取元数据，每项错误单独处理；文件流和Range不得全量读入内存。
- 预览队列、输入像素、进程执行时间和stderr缓存必须有界。同键合并生成，拒绝异常缓存链接；JPEG扩展名与MIME一致，落盘后才索引。
- SQLite启动只允许非破坏性迁移，不执行DROP/初始化清空。缓存维护阻止新预览并等待在途任务，只清理派生文件。
- 日志不得包含长期令牌、票据、Authorization/Cookie或登录请求体；保留脱敏与转义回归。
- 后台配置仅允许白名单字段，验证revision并原子保存私有覆盖/备份；不能提交遮盖后的敏感值，不能把不可启动的root保存成待重启配置。
- HTTPS显式启用但无法配置/绑定时，在任何请求处理前失败并退出78；内置supervise遇78停止。受管重启退出75，必须验证新进程真实恢复。
- HTTP默认loopback，远程监听/TLS/写入由部署者显式开启。未知指标用null，缺少V8heap或服务能力不得显示伪造成功/零值。
- `VITE_ADMIN_PREVIEW=1`仅用于明确标注的隔离演示，生产构建不能设置。网络错误不当作401，不把演示轮询当作真实WS验证。
- 凭据、私钥、运行数据库、用户文件、构建/QA产物不得提交或打包；打包使用安全默认模板，拒绝静态路径里的链接、数据库签名及sidecar。

## 构建与检查

```bash
npm --prefix web ci
npm --prefix admin ci
npm run check:rust
cargo build --locked --manifest-path server-rust/Cargo.toml
npm run test:rust:smoke
npm run test:rust:security
npm --prefix web test -- --run
npm --prefix admin test -- --run
npm run test:repository
npm run test:distribution
npm run assemble
npm run build:server
npm run pack
```

`assemble.js`只同步两个生产前端到 `server-rust/static/`。`scripts/pack-rust.cjs`只分发当前平台Rust二进制、前端和安全模板，缺产物立即失败；目标机器需有libvips、vipsheader和FFmpeg。

Flutter改动须执行 `flutter analyze` 与全套 `flutter test`。当前 `dart:io` 路径不是完整Flutter Web适配。

## 验证与操作边界

测试只能使用独立临时目录，不能对用户真实共享目录执行删除、上传冲突、改名或缓存清空。重点覆盖路径越界、Windows盘符/reparse、认证/来源、v2特殊名称、Range、原子发布、媒体输入/协议和超时、缓存源更新、配置冲突及持久化重启。

Windows/ARM NAS/原生平台实机体验与Linux或CI构建分开记录。不能因为工作流存在或构建通过就宣称NAS性能、权限和备份恢复已经验收；没有用户授权不直接替换正式服务。
