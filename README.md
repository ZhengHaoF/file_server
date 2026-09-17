# 简易文件服务器后台
针对大量查看NAS图片的需求开发，不改变文件结构，支持实时压缩图片。体验超丝滑
### 直接运行
1. 从 https://github.com/ZhengHaoF/file_server/releases/tag/beta 下载对应的压缩包
2. 修改config.json中需要共享的目录（不能把根目录设置为共享目录）
3. 双击`启动.bat` 运行

> 需要目标机器已安装 Node.js ≥ 18.17 —— 分发包不再捆绑 node.exe。`启动.bat` 会自检 Node 版本，首次运行自动安装依赖。

### 从源码运行
1. `git clone https://github.com/ZhengHaoF/file_server.git`
2. `cd file_server/server`
3. `npm install`
4. 修改config.json中需要共享的目录（不能把根目录设置为共享目录）
5. `node index.js` 运行（或 `npm start` 走 nodemon 热重载）

### 配置文件说明
```json
{
    "rootPath": "G:/图片",
    "imgCache": "./imgCache",
    "restartPwd": "123456",
    "uploadEnabled": false,
    "uploadMaxSizeMB": 4096
}
```

| 字段 | 说明 |
|------|------|
| rootPath | 要共享的文件夹，**不能设为根目录** |
| imgCache | 图片缩略图缓存目录 |
| restartPwd | 服务器重启密码（同时兼作管理后台令牌） |
| uploadEnabled | 是否启用上传接口，**无鉴权**，仅建议在可信内网开启 |
| uploadMaxSizeMB | 单文件上传上限（MB），默认 4096 |

### 在线预览
- 支持常见图片预览
- 支持常见视频预览
- 支持调用外部Vlc播放器
- 可以直接预览缩略图

### 打包说明
```bash
npm run assemble   # 构建 web 与 admin，产物同步到 server/web、server/admin/dist
npm run pack       # 复制服务端运行所需的文件到 server/dist，并压缩成 file-serve-v<版本>.zip
```

产物：
- `server/dist/` —— 可直接运行的分发目录
- `file-serve-v1.0.0.zip` —— 上传到 GitHub Releases 即可分发

分发包**不含** `node_modules`、`node.exe`、`imgCache`、`logs`、`imgCache.db`；目标机器需自备 Node ≥ 18.17，首次双击 `启动.bat` 会自动安装依赖。

### 其他说明
因为浏览器对视屏支持有限，目前主流浏览器大多只支持mp4,ogg,webm等基础格式，详细可以看这里：https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Containers
而大多数国产手机浏览器都有视屏小窗之类的功能，对视屏的兼容性是网页所不能及的，所以建议使用网页播放器，方便浏览器调用自带的播放器，这样体验最好。


### 项目结构
```
file-serve/
├── server/          # 后端服务（Node.js + Express）
├── web/             # Web 前端（Vue 3 + Vite）
├── flutter-app/     # Flutter 跨平台应用（Android/iOS/Windows/macOS/Linux/Web）
├── admin/           # 管理面板（Vue 3 + Vite）
├── shared/          # 共享资源（API 文档等）
├── assemble.js      # 构建 web + admin 并同步产物到 server/（npm run assemble）
└── pack.js          # 打包服务端分发包（npm run pack）
```

## 注意：不能把根目录设置为共享目录
