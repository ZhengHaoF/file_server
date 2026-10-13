# File Serve

面向 NAS 图片与视频浏览的文件服务。新的默认服务端使用 Rust，独立提供 HTTP API，并在同一地址托管 Web 文件客户端和 `/admin/` 管理后台；不需要 Tauri、桌面窗口或运行时 Node.js。前端仍使用 Vue，原生客户端仍使用 Flutter。

这次迁移把服务运行、管理、媒体任务和安全边界集中到后端，不把语言重写当作性能提升的保证。新版文件读取使用显式路径与预览参数的 v2 API，修复 `$` 根目录标记和 `!尺寸` 文件名重载的歧义。旧 Node 后端与专用打包入口已移除；如需回退，使用 Git 历史中的完整旧版本及对应客户端，见 [迁移与回退说明](docs/RUST_MIGRATION.md)。

## 构建与运行

源码构建需要 Rust stable（锁定依赖至少需要 1.89）、Node.js 22，以及图片/视频预览所需的 libvips 命令行工具和 FFmpeg。Node 只用于构建前端；分发后的 Rust 服务本身不依赖 Node。安装包可选附带媒体工具（暂存到 `server-rust/tools/<平台>-<架构>/` 后打包），见 [Rust 服务说明](server-rust/README.md)。

```bash
git clone https://github.com/ZhengHaoF/file_server.git
cd file_server
npm --prefix web ci
npm --prefix admin ci
npm run assemble
mkdir -p server-rust/files
npm run build:server
server-rust/target/release/file-server --config server-rust/config.json
```

Windows 可用 PowerShell `New-Item -ItemType Directory -Force server-rust/files` 创建目录，然后运行 `server-rust/target/release/file-server.exe --config server-rust/config.json`。生产使用自己的共享目录与私有配置，不要把真实照片复制到仓库。

默认访问 `http://127.0.0.1:3000/`，管理地址为 `http://127.0.0.1:3000/admin/`。首次启动生成 `server-rust/data/auth.local.json`，使用其中的文件访问令牌登录文件客户端，管理令牌登录后台；该文件不能提交或分享。默认只监听本机，匿名读取、文件写入和上传均关闭。

详细路径规则、认证和接口行为见 [Rust API 契约](shared/RUST_API.md)。部署、系统服务与 Docker 说明见 [Rust 服务说明](server-rust/README.md)，旧环境升级见 [迁移说明](docs/RUST_MIGRATION.md)。

## 管理与安全

- **浏览器管理**：概览、缓存、日志、配置、任务/审计和会话均由 Rust 服务管理，前端不是另一套数据源。
- **受控文件访问**：认证与授权在服务端执行，拒绝目录越界、隐藏路径和软链接；写入需要显式启用，上传和改名不覆盖已有文件。
- **媒体处理**：Rust 调度受限任务，libvips 生成图片缩略图，FFmpeg 抽取视频帧；生成后缓存，不重新实现媒体解码器。
- **运维边界**：服务停止后管理网页也停止。启动、自启与故障恢复交给系统服务、容器或显式 `supervise` 模式，不伪装成浏览器可以启动一个未运行的进程。
- **数据隔离**：共享目录不能包含配置、数据库、缓存或服务源码。安装包不包含运行凭据、用户文件和私钥；不要把明文 HTTP 直接暴露到公网。

这是面向可信本机/家庭 NAS 的轻量文件服务，不是带多租户隔离的企业网盘。请把共享目录作为可信本地文件系统；路径检查不能替代操作系统权限，也不应承诺防御有能力持续修改挂载点的恶意本地进程。

## 测试与分发

```bash
npm run check:rust
cargo build --locked --manifest-path server-rust/Cargo.toml
npm run test:rust:smoke
npm run test:rust:security
npm --prefix web test -- --run
npm --prefix admin test -- --run
npm run test:distribution
npm run test:repository
npm run assemble
npm run build:server
npm run pack
```

黑盒验收只对独立临时目录运行。`npm run pack` 按当前编译平台打包 Rust 可执行文件和生产前端，输出 `dist/file-serve-rust-<平台>-<架构>.tar.gz` 或 `.zip`；跨平台必须在对应平台构建。未暂存媒体工具的包仍需目标机器安装 libvips 和 FFmpeg，暂存后则随包分发。

`npm run dev:server` 启动 Rust 开发服务，`dev:web` 和 `dev:admin` 启动前端开发环境。CI 包含 Rust 检查/测试、Linux 分发、Windows 构建、Docker 启动检查及 Web/Flutter 检查；前端和打包脚本仍需要 Node，但不再存在 Node 服务入口。
