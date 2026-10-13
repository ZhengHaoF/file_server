# File Serve Flutter API 文档

当前客户端连接Rust后端，正式服务契约见 [RUST_API.md](../shared/RUST_API.md)。旧Node后端已从当前源码移除，历史客户端/接口只能在完整旧版本中对照。

## v2 文件读取

| 操作 | 接口 | 参数 |
|---|---|---|
| 目录列表 | `GET /api/v2/files` | `path`（根目录为空字符串）、`sta`、`end` |
| 原文件、播放、下载 | `GET /api/v2/content` | `path` |
| 图片缩略图 | `GET /api/v2/preview` | `path`、`kind=image`、`width`、`height` |
| 视频截图 | `GET /api/v2/preview` | `path`、`kind=video` |

path是原始相对路径，由query encoder编码一次，不先调用`Uri.encodeComponent`。`$`/`$$`是字面目录名，原文件`foo.jpg!320x240`不隐式触发预览；客户端不自动回退旧读取协议。

统一读取URL helper位于`lib/utils/file_urls.dart`，`FileInfo`与`ApiService`共用。目录响应为`{listNum,list,nextStart}`，各项包含名称、类型、大小、后缀和mtime；分页按nextStart继续，拒绝不前进的游标。

## 会话与写入

长期文件令牌只用于登录换取临时会话。Bearer/readTicket保存在内存，401清理会话并提示重新登录；网络错误不能当作401。删除、改名、上传使用正式契约中的写入路径，必须启用服务端开关，媒体票据不能获得写权限。

下载任务保存不带凭据的内容URL，恢复旧记录清除票据及userinfo，重试使用当前同源Bearer。失败记录不保存响应正文或凭据；缩略图以内存加载，不把带票据URL写入磁盘图片缓存。旧应用图片磁盘缓存不会自动迁移，可在升级后清理派生缓存，不删除原文件。

## 服务管理

重启、配置与日志通过`/admin/`浏览器入口，不在管理URL中携带密码，不提交旧密码式`/restartServer`。服务端缺少监督者时明确禁用重启，原生客户端不伪造成功反馈。

错误码、配置路径、认证角色和媒体工具要求以正式Rust契约为准。Windows原生交互、Android/iOS系统浏览器唤起需实机验证，平台构建通过不能替代这些检查。
