# file_server_web
简易文件共享服务前端

## 新版读取协议

当前客户端要求支持 v2 的 Rust 服务，不自动回退旧 Node 读取接口：

- 列表：`GET /api/v2/files?path=<相对原始路径>&sta=0&end=500`，空 `path` 是根目录；`$`、`$$` 是字面目录名。
- 原文件：`GET /api/v2/content?path=<相对原始路径>`，`foo.jpg!320x240` 永远是原文件名，不解析为预览请求。
- 图片预览：`GET /api/v2/preview?path=<相对原始路径>&kind=image&width=320&height=320`。
- 视频截图：`GET /api/v2/preview?path=<相对原始路径>&kind=video`。

统一 URL helper 在 `src/tools/fileApi.js`；路径只由 query encoder 编码一次，不先手工 URL 编码。cookie/Bearer 与只读 `ticket` 认证不变，写入接口保留。服务管理入口打开独立 `/admin/`，不传递凭据。旧Node后端已移除，如需回退须从Git历史检出完整旧版及对应客户端。
