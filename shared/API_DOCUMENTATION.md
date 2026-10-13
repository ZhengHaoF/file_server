# File Serve API 文档

当前唯一后端为Rust，完整字段、状态码、环境变量和部署行为以 [RUST_API.md](RUST_API.md) 为准。本文是客户端接入索引，不再记录已移除Node实现的运行步骤。

## 文件读取

| 操作 | 接口 | 参数 |
|---|---|---|
| 目录列表 | `GET /api/v2/files` | `path`、`sta`、`end` |
| 原文件、播放、下载 | `GET\|HEAD /api/v2/content` | `path`；支持Range和条件请求 |
| 图片缩略图 | `GET\|HEAD /api/v2/preview` | `path`、`kind=image`、`width`、`height` |
| 视频截图 | `GET\|HEAD /api/v2/preview` | `path`、`kind=video` |

path是原始相对路径，由query encoder编码一次，空字符串代表根目录。`$`/`$$`是字面目录名，`foo.jpg!320x240`不触发预览。新客户端不自动回退旧读取协议，写入接口和Rust保留的过渡入口详见正式契约。

## 认证与管理

`POST /api/auth/login {token}`用长期令牌换取8小时内存会话和只读媒体票据。文件会话cookie为`fs_session`，管理会话为`fs_admin_session`；临时Bearer只放客户端内存，不保存到浏览器存储或下载队列URL。

文件访问和管理令牌必须不同。只读票据仅可读取文件/预览，不能上传、改名、删除或管理；管理密码不得放入URL。`POST /api/auth/logout {role}`撤销对应会话，不覆盖另一角色cookie。

管理端在 `/admin/`，包含状态、缓存任务、日志/实时WebSocket、配置校验/保存/回滚、会话与SQLite审计。管理DTO以正式契约为准，交互约束见 [ADMIN_CONTRACT.md](ADMIN_CONTRACT.md)。

## 运行与错误

默认HTTP只监听`127.0.0.1:3000`，HTTPS默认关闭；显式开启HTTPS但证书/私钥/端口无效时拒绝整个服务启动并退出78。服务停止后管理页也不可用，启动和恢复由系统、容器或内置supervise负责。

错误返回JSON中的`msg`及可选`code`，字段校验包含`errors`。依据状态码/错误码处理，不以中文文案判断权限；网络失败不等于会话失效。预览JPEG、源图像素/尺寸上限、媒体工具缺失、维护/超时和队列错误详见正式契约。
