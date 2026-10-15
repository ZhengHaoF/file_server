# Rust 文件服务

独立运行 `file-server`，在 `/admin/` 提供管理端（`/` 重定向到 `/admin/`）；文件客户端是 Flutter 原生应用，不再内置浏览器文件端。没有 Tauri 外壳，也没有 Node 运行时依赖；媒体预览需要可执行的 `vips`、`vipsheader` 和 `ffmpeg`。

## 配置与启动

```bash
./file-server --config /absolute/path/config.json
./file-server check-config --config /absolute/path/config.json
./file-server supervise --config /absolute/path/config.json
```

`serve` 是默认子命令，前台运行；`supervise` 是可选本机监督模式。Docker/systemd 应直接运行服务，不嵌套另一个监督进程。所有配置文件相对路径基于配置文件所在目录解析；没有配置时基于可执行文件目录，不依赖调用时的工作目录。

源码开发使用仓库中的 `server-rust/config.json`，自行创建 `server-rust/files` 或在忽略提交的 `config.local.json` 中设置绝对共享目录。分发包已有空的 `files/` 与 `static/`，运行 `start.sh` 或 `启动.bat` 即可；首次启动自动创建私有数据目录并生成访问/管理凭据。

```json
{
  "rootPath": "/absolute/path/to/shared/files",
  "dataPath": "/absolute/path/to/private/data",
  "imgCache": "/absolute/path/to/private/cache",
  "staticDir": "/absolute/path/to/static",
  "host": "127.0.0.1",
  "port": 3000,
  "writeEnabled": false,
  "uploadEnabled": false
}
```

完整字段、环境变量、加载顺序与接口差异见 [Rust API 契约](../shared/RUST_API.md)。凭据位于 `<dataPath>/auth.local.json`；文件访问与管理令牌必须不同且各至少 16 字符，不把它们放入 URL、截图或日志。

## 无界面部署与重启

前台运行时不支持 Web 自助重启，管理接口返回 409。只有确实存在监督者时才设置 `FILE_SERVER_MANAGED=1`；受管重启会优雅退出并返回退出码 75，由外部监督者重新拉起，会话失效后需重新登录。

示例 `file-serve.service` 默认监听本机、共享目录只读，指定 `FILE_SERVER_DEPLOYMENT=systemd`。安装前创建 `fileserve` 用户，准备 `/opt/file-serve` 中的二进制和静态资源，并让该用户可以读取 `/srv/file-serve/files`、写入 `/var/lib/file-serve` 和 `/var/cache/file-serve`。管理员审核路径、权限和运行工具后再安装 unit 与启用服务，不盲目复制执行。

如果需要写入原文件，必须同时调整应用写入开关、操作系统权限和 unit 的共享目录只读限制。后台开关不会绕过系统权限；不要以 root 运行服务来解决权限错误。

## Docker

从仓库根目录构建镜像。镜像分阶段构建前端和 Rust，最终只包含可执行文件、静态资源和媒体工具，并以 UID/GID 10001 运行。

```bash
docker build -f server-rust/Dockerfile -t file-serve:rust .
FILE_SERVER_SHARE=/absolute/path/to/share docker compose -f server-rust/compose.yml up -d --build
```

Compose 默认只把端口绑定到宿主机 `127.0.0.1:3000`，共享目录以 `:ro` 挂载，数据库和缓存使用独立数据卷，并设置整个服务容器 1 GiB 内存、128 个进程/线程的上限。资源上限应按实际 NAS 内存与媒体负载调整；它不是性能保证，过低可能使大型媒体处理失败。确保 UID 10001 可以读取共享目录；如要上传或删除，先明确把挂载改为可写并设置应用开关，默认不开放写入。

远程访问推荐使用 HTTPS 反向代理，显式配置 `allowedOrigins` 和 `secureCookies`，不信任未配置的转发头，也不把后台凭据传给代理日志。服务器停机时需要通过宿主机、容器或 NAS 管理工具恢复，浏览器管理网页不能启动自己。

## 分发注意

`npm run assemble && npm run build:server && npm run pack` 在仓库根目录生成对应平台安装包。安装包默认不含 libvips/FFmpeg，目标机器需自行安装，或通过 `FILE_SERVER_VIPS`、`FILE_SERVER_VIPSHEADER`、`FILE_SERVER_FFMPEG` 指定可执行文件；缺失对应工具时相关预览失败，而不是假报成功。

也可以把媒体工具**平铺暂存**到 `server-rust/tools/<platform>-<arch>/`（例如 `server-rust/tools/win32-x64/` 直接放 `vips.exe`、`vipsheader.exe`、`ffmpeg.exe` 及其依赖 DLL，不放子目录），再执行 `npm run pack`，工具会随包分发为 `tools/` 目录。服务端按以下顺序解析工具：环境变量覆盖 → 可执行文件同级的 `tools/` 目录 → PATH；三者都找不到时预览返回 `PREVIEW_UNAVAILABLE`，其余功能不受影响。该暂存目录已被 git 忽略，二进制不要提交；`pack` 会拒绝暂存目录中的软链接，缺任一本体工具时立即失败。

再分发 FFmpeg 需遵守其许可证：GPL 构建（如含 x264/x265 的 full build）随包分发须履行 GPL 义务，对外分发建议换 LGPL 构建；libvips 为 LGPL，动态链接分发即可。Windows、ARM NAS 和不同媒体编码的实际运行需在目标设备验证；Linux 构建通过不代表所有平台都已验收。当前仓库已移除旧 Node 后端，但不自动删除部署机器上的旧服务目录、旧缓存或用户共享文件；旧版回退须从 Git 历史检出完整版本。
