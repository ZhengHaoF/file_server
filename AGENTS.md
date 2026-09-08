# AGENTS.md

> 面向 AI 编码代理（Agent）与新加入贡献者的项目说明。
> 本文档描述 `file-serve`（简易文件服务器 monorepo）的架构、约定与开发注意事项。

---

## 1. 项目概览

`file-serve` 是一个 **monorepo**，包含以下子项目：

| 子项目 | 路径 | 技术栈 | 说明 |
|--------|------|--------|------|
| **后端服务** | `server/` | Node.js + Express | 文件服务器核心，提供 API 和静态文件托管 |
| **Web 前端** | `web/` | Vue 3 + Vite + Vant | 用户端文件浏览器（hash 路由，可独立部署到别处） |
| **管理面板** | `admin/` | Vue 3 + Vite + Tailwind/DaisyUI + Pinia + ECharts | 运维后台（history 路由，base `/admin/`，构建产物由后端托管） |
| **移动端** | `flutter-app/` | Flutter/Dart | 跨端文件浏览 App（Android/iOS/Web/Desktop） |
| **共享资源** | `shared/` | - | API 文档等多端共享资源 |

### 后端核心特性

- **不改原文件结构**，只读/列出/删除/重命名 `rootPath` 内的内容
- **图片实时压缩**：使用 `sharp` 按需缩放并缓存到本地
- **视频缩略图**：使用 `ffmpeg-static` + `fluent-ffmpeg` 在 `00:00:01` 截取一帧
- **缓存元数据**：使用 `better-sqlite3`（`imgCache.db`）管理缩略图缓存
- **同时提供 HTTP（3000）与 HTTPS（3001）服务**

> ⚠️ **重要约束**：`server/config.json` 中的 `rootPath` **不能设置为系统根目录**，否则安全检查形同虚设。

---

## 2. 目录结构

```
file-serve/
├── server/                          # 后端服务（自包含）
│   ├── index.js                     # 主入口：HTTP/HTTPS 服务与所有 API
│   ├── sqllite.js                   # better-sqlite3 封装
│   ├── build.js                     # 打包脚本（dist/ 输出 + npm install）
│   ├── init.js                      # 初始化：清空 imgCache、logs、数据库
│   ├── clean.js                     # 清理过期（默认 30 天）缓存数据
│   ├── start.js                     # 守护进程：监控 index.js 退出并自动重启
│   ├── config.json                  # 运行时配置（rootPath / imgCache / restartPwd）
│   ├── mime.json                    # 预留的 MIME 映射
│   ├── package.json                 # 后端依赖
│   ├── 启动.bat                     # Windows 一键启动脚本
│   ├── Dockerfile                   # 多阶段构建镜像
│   ├── docker-compose.yml           # 容器编排
│   ├── cert/                        # HTTPS 证书（private.pem + file.crt）
│   ├── middleware/                  # Express 中间件
│   │   └── adminAuth.js             # /api/admin 的 X-Admin-Token 校验
│   ├── routes/                      # 路由模块
│   │   └── admin.js                 # /api/admin/* 管理接口
│   ├── utils/                       # 通用工具
│   │   ├── systemInfo.js            # CPU/内存/磁盘/日志解析等系统信息
│   │   └── utils.js                 # formatDate 等小工具
│   ├── web/                         # Express 托管在 `/` 的静态前端产物
│   ├── test-admin-api.js            # 手写的管理接口冒烟测试脚本
│   ├── test-range.js                # 手写的 Range 请求冒烟测试脚本
│   ├── imgCache/                    # 生成的图片/视频缩略图缓存目录
│   ├── logs/                        # log4js 日志输出目录
│   └── imgCache.db                  # SQLite 数据库文件（缓存索引）
│
├── web/                             # Vue 3 用户前端（原 file-server-web）
│   ├── src/
│   │   ├── view/                    # main.vue（文件浏览器主体）+ 播放器/文本查看页
│   │   ├── components/              # 组件
│   │   ├── composables/             # useFilePath.js / useLongPress.js
│   │   ├── router/                  # hash 模式路由
│   │   ├── tools/                   # 前端业务工具
│   │   └── assets/                  # 样式与静态资源
│   ├── utils/                       # ⚠️ src 之外的孤立工具目录（fileTypeUtils.js / utils.js）
│   ├── test/                        # tools.test.js
│   ├── public/                      # 静态资源
│   ├── API_DOCUMENTATION.md         # ⚠️ 与 shared/ 下的同名文档内容重复
│   ├── package.json                 # 前端依赖
│   └── vite.config.js               # Vite 配置
│
├── admin/                           # 管理面板（Vue 3 + Tailwind/DaisyUI + Pinia + ECharts）
│   ├── src/
│   │   ├── views/                   # Login / Dashboard / CacheManager / LogViewer / ConfigManager
│   │   ├── layouts/                 # AdminLayout.vue
│   │   ├── api/                     # status / cache / log / config 四组封装
│   │   ├── stores/                  # Pinia：status / cache / log
│   │   ├── router/                  # history 模式，base = /admin/
│   │   └── utils/                   # request.js（axios 封装 + token 注入）
│   ├── admin-server.js              # 独立的 dist 静态托管脚本（3008，无 npm script 引用）
│   ├── public/                      # 静态资源
│   ├── package.json                 # 管理面板依赖
│   └── vite.config.js               # base: '/admin/'，dev 端口 3008
│
├── flutter-app/                     # Flutter 客户端（原 mobile/ file_server_flutter）
│   ├── lib/                         # Dart 源码
│   ├── android/                     # Android 平台
│   ├── ios/                         # iOS 平台
│   ├── web/                         # Flutter Web 入口
│   └── pubspec.yaml                 # Flutter 依赖
│
├── shared/                          # 共享资源
│   └── API_DOCUMENTATION.md         # API 接口文档（用户端接口，不含 /api/admin）
│
├── package.json                     # 根 workspace（仅 scripts）
├── pnpm-workspace.yaml              # pnpm 工作空间配置
├── AGENTS.md                        # 本文档
├── README.md                        # 项目说明
└── .gitignore
```

---

## 3. 关键模块说明

### 3.1 `server/index.js`（主入口）

按职责可拆为 6 段：

| 段落 | 作用 |
|------|------|
| 启动与配置加载 | 读取 `config.json`、校验 `rootPath`、创建 `imgCache` |
| 工具函数 | `validatePath`（防路径遍历）、`getNowPath`（路径归一化）、`getCompressImg`（sharp 缩放）、`getVideoThumbnail`（ffmpeg 截帧） |
| 中间件 | `imageInterceptor` 拦截 `/getFile/*.jpg!WxH` 形式的图片缩放请求、`rangeInterceptor` 处理 Range 断点续传、`adminAuth` 守卫 `/api/admin` |
| 路由 | 见下表 |
| 管理后台挂载 | `/admin` 静态 + `/api/admin` + WebSocket 日志流 |
| HTTP/HTTPS 启动 | 监听 3000 / 3001 |

**路由一览**（用户端接口详见 `shared/API_DOCUMENTATION.md`；`/api/admin/*` 该文档尚未覆盖）：

| 方法 | 路径 | 鉴权 | 作用 |
|------|------|------|------|
| GET  | `/list/:filePath(*)` | 无 | 列出目录（`$` 代替 `/`，`$$` 为根），支持 `sta/end` 分页 |
| POST | `/delFile` | **无** | 删除文件或递归删除文件夹 |
| POST | `/renameFile` | **无** | 重命名/移动；校验 `validatePath`，禁止操作根目录，目标已存在返回 409 |
| POST | `/restartServer` | `restartPwd` | 密码校验后 `process.exit(0)`，由 `start.js` 拉起 |
| GET  | `/cleanOldData/:day` | **无** | 调用 `sql.cleanOldData(day)` 清理过期缓存 |
| GET  | `/getVideoPreview/:path(*)` | 无 | 生成/读取视频缩略图（缓存到 `imgCache`） |
| GET  | `/getFile/*` | 无 | 静态文件 + Range 断点续传 + 图片按需缩放（`imageInterceptor` 处理 `!WxH` 后缀） |
| 静态 | `/` | 无 | 托管 `server/web/`（`web/` 的构建产物） |
| 静态 | `/admin/*` | 无 | 托管 `admin/dist`（**仅当启动时该目录存在才挂载**），并带 SPA history 回退 |
| GET  | `/api/admin/status` | `X-Admin-Token` | CPU/内存/磁盘/uptime/Node 版本/端口 |
| GET  | `/api/admin/cache/stats` | `X-Admin-Token` | 缩略图缓存统计 |
| POST | `/api/admin/cache/clean` | `X-Admin-Token` | `{days}` 按天清理，或 `{all:true}` 全量重置（`cleanCache()` + `sql.reset()`） |
| GET  | `/api/admin/logs` | `X-Admin-Token` | 读取日志，支持 `level` / `limit` / `keyword` |
| GET  | `/api/admin/config` | `X-Admin-Token` | 返回脱敏后的 `config.json`（**只读，无写入接口**） |
| POST | `/api/admin/restart` | `X-Admin-Token` | 先响应再 `process.exit(0)`（100ms 延时） |
| GET  | `/api/admin/database/status` | `X-Admin-Token` | `sql.getCount()` + 表清单 |
| WS   | `/api/admin/logs/stream` | URL `?token=` | 实时日志推送（挂在 **httpServer** 上，仅 3000） |

> `/admin` 相关注意事项：
> - `fs.existsSync('admin/dist')` **只在进程启动时判断一次**，构建完 admin 后需重启后端才会挂载。
> - 该路径是**相对进程 cwd** 的，只有在 `server/`（或打包后的 `dist/`）目录下启动才能命中；本地开发请用 `admin` 子项目的 `pnpm run dev`（端口 3008 + Vite proxy）。
> - `admin/` 用 `createWebHistory('/admin/')`，因此深链/刷新必须依赖上面的 SPA 回退路由；`web/` 用 hash 模式，天然不需要回退。
> - SPA 回退只对**无扩展名**的路径生效，缺失的 js/css 仍返回 404 而不是 HTML。

**安全要点**：
- 所有接收路径的路由都调用 `validatePath(fullPath, rootPath)`，使用 `path.normalize` + `startsWith` 拦截 `../` 路径遍历。
- `imageInterceptor` 在拼接 `rootPath + filePath` 之前会先校验一次。
- `delFile`、`renameFile`、`getVideoPreview`、图片中间件 都已加入同样的 `validatePath` 校验，**新增文件相关路由时必须复用该函数**。
- `renameFile` 额外拦截了「重命名根目录」，并对目标已存在返回 409。
- ⚠️ **路径遍历已被拦住，但写入类接口没有任何身份认证**：`/delFile`、`/renameFile`、`/cleanOldData/:day` 任意人可调用；`/restartServer` 只有一个明文口令比对。公网部署前必须补认证中间件。

**图片缩放 URL 协议**：
```
/getFile/<path>.jpg!<W>x<H>
```
- W/H 可省略其一（解析时会得到 `NaN`，**目前未做防御**，新增需求时建议校验）。
- 缓存键 = `sha256(filePath + "!WxH")`，写盘文件名为 `<hash><ext>`。

### 3.2 `server/sqllite.js`

封装 `better-sqlite3`，表结构：

```sql
CREATE TABLE image (
  psha256 TEXT PRIMARY KEY,  -- sha256(路径+尺寸)
  ext     TEXT,              -- 原扩展名（用于定位缓存文件）
  ctime   TEXT               -- 最近一次访问时间（毫秒时间戳字符串）
);
```

公开方法：`init()`、`insertInfo`、`updateInfo`、`selectInfo`、`cleanOldData(day=30)`、`close()`。

> 修改表结构时需考虑旧 `imgCache.db` 的兼容：可新增列，但不要直接 `DROP`。

### 3.3 `server/build.js`

执行 `npm run build` 会：

1. 删除并重建 `dist/`
2. 跑 `node init.js`（清空缓存与日志）
3. 拷贝源码、配置、`cert/`、`web/`、`node.exe`、`启动.bat`
4. 构建 `admin/` 管理面板并复制到 `dist/admin/`
5. 在 `dist/` 内写入裁剪过的 `package.json`
6. 在 `dist/` 内执行 `npm install`

`--upbuild` 模式（`npm run upbuild`）只复制源码与 `web/`，用于增量更新。

### 3.4 `server/start.js`

守护进程，最多自动重启 10 次，写入 `server/logs/restart.log`。`/restartServer` 接口正是依赖 `start.js` 实现"软重启"。

### 3.5 `server/init.js` / `server/clean.js`

- `init.js`：**危险操作** — 同步执行 `fs.rm` 删除 `imgCache/` 和 `logs/`，并调用 `sql.init()`（`DROP TABLE + VACUUM + CREATE`）。任何对数据库结构的调整都要在这里同步。
- `clean.js`：默认清理 30 天未访问的缓存图片/视频缩略图。

### 3.6 管理后台（`admin/` + `server/routes/admin.js` + `server/middleware/adminAuth.js`）

三处同名但含义不同，容易混淆：

| 名称 | 是什么 |
|------|--------|
| `admin/` | 仓库子项目目录（Vue 3 源码） |
| `/admin` | 后端挂载的**静态资源 URL 前缀**（指向 `admin/dist`） |
| `/api/admin` | 后端**管理接口**前缀，由 `adminAuth` 守卫 |

- **鉴权方式很弱，且与设计耦合**：`adminAuth.js` 直接把请求头 `X-Admin-Token` 与 `config.json` 的 `restartPwd` 做 `String()` 比较。也就是说**管理面板口令 == 重启口令 == 默认 `123456`**，没有 session/JWT/过期，且每次请求都同步读一次 `config.json`。
- 前端把该口令**原样存进 `localStorage.adminToken`**（`admin/src/views/Login.vue`），一旦发生 XSS 等于永久泄露凭据。
- WebSocket 走 **URL query 传 token**（`?token=`），会进入访问日志，与 header 方式不一致。
- `POST /api/admin/restart` 同样依赖 `start.js` 守护进程拉起，直接 `node index.js` 启动时是"真退出"。
- `/api/admin/config` 是**只读脱敏视图**，后端没有配置写入口，所以 `ConfigManager.vue` 无法保存修改，改配置仍需编辑 `config.json` 并重启。
- `admin/admin-server.js` 是一个把 `admin/dist` 挂在 **3008 根路径**的独立小脚本，没有任何 npm script 引用它；由于 `vite.config.js` 的 `base` 是 `/admin/`，这样启动时资源路径并不对，需要 `/admin` 前缀时请用主后端托管。

---

## 4. 配置文件

`server/config.json`（UTF-8 with BOM，使用 `strip-bom` 解析）：

```json
{
  "rootPath": "C:\\Users\\zheng\\Downloads",
  "imgCache": "./imgCache",
  "restartPwd": "123456"
}
```

- `rootPath`：共享目录的根，**绝对路径**更稳。
- `imgCache`：相对路径时相对进程工作目录（即 `server/`）。
- `restartPwd`：`String(req.body.pwd) === String(restartPwd)` 比较，**类型必须一致**（注意数字与字符串）。
- ⚠️ `restartPwd` **同时充当 `/api/admin/*` 的管理令牌**（`adminAuth.js` 直接比对 `X-Admin-Token`）。改这个值等于同时改重启口令和后台登录口令。

---

## 5. 开发约定

### 5.1 风格与依赖

- 后端是 **ESM 项目**（`"type": "module"`），所有文件使用 `import` / `export`。
- Node ≥ 18.17.0（`engines` 字段）。
- HTTP 框架：**Express 4.x**。中间件顺序很重要，实际注册顺序为：`cors()` → `express.static('web')` → `express.json` → `express.urlencoded` → `imageInterceptor` → `app.use('/getFile', rangeInterceptor, express.static(rootPath))` → 各 API 路由 → `/admin` 静态 + SPA 回退 → `adminAuth` → `adminRouter`。
- 新增路由时注意：`/getFile` 的静态挂载在 API 路由**之前**，而 `/list`、`/delFile` 等都在其后，别把新路由放到会被静态中间件吞掉的位置。
- 日志统一使用 `log4js`（`server/logs/app.log`，最大 10MB × 3 个备份，gzip 压缩）。**不要**用 `console.log` 代替业务日志。
- 图片处理统一走 `sharp`；视频走 `fluent-ffmpeg` + `ffmpeg-static`，**不要**额外安装系统级 ffmpeg。

### 5.2 安全红线

- 任何涉及用户可控路径的接口，**必须**调用 `validatePath(fullPath, rootPath)`，否则存在路径遍历。
- 涉及删除/写入/重启的接口必须有授权（如密码）或边界限制。
- ⚠️ 现实是 `/delFile`、`/renameFile`、`/cleanOldData/:day` **至今没有任何鉴权**，只有路径校验；`/restartServer` 只有明文口令。当前所有"写"接口都只在可信内网可用。
- ⚠️ 管理后台令牌 = `restartPwd`（默认 `123456`），没有过期、没有 session、明文存前端 `localStorage`。**不要**把它当成真正的访问控制，也不要在前端硬编码。
- 当前 HTTPS 证书是仓库内的 `server/cert/`，**仅供本地/内网测试**，生产环境请替换为可信 CA 签发证书。

### 5.3 缓存键与文件命名

- 图片缩放：`<sha256(path + "!WxH")><原 ext>`，存于 `server/imgCache/`。
- 视频缩略图：`<sha256(fullPath + "!video_preview")>.jpg`，存于 `server/imgCache/`。
- 调整缩放算法、输出格式（当前是 progressive JPEG）时，**需要**变更缓存键或主动清缓存，否则会读到旧文件。

### 5.4 错误处理

- API 风格：`{ msg: "..." }` 作为文本响应，`{ listNum, list }` / `{ name, size, isDirectory, isFile, suffix, mtime }` 作为数据响应。
- HTTP 状态码：400（缺参）、403（路径非法）、404（不存在）、409（重命名目标已存在）、500（内部错误）。
- `imageInterceptor` 内异常一律 `next()`，**不要**直接 5xx，否则会破坏普通文件下载。
- 新增接口请沿用同一风格：错误一律 `{ msg }`，成功直接返回数据对象（`/api/admin/*` 也是如此，没有额外的 `{success, data}` 包装）。

---

## 6. 常用命令

### Monorepo 命令（在根目录执行）

```powershell
# 安装所有子项目依赖
pnpm install

# 启动各子项目开发服务
pnpm run dev:server      # 启动后端
pnpm run dev:web         # 启动 Web 前端
pnpm run dev:admin       # 启动管理面板

# 构建各子项目
pnpm run build:server    # 构建后端
pnpm run build:web       # 构建 Web 前端
pnpm run build:admin     # 构建管理面板
pnpm run build:all       # 构建所有
```

### 后端命令（在 `server/` 目录执行）

```powershell
# 安装依赖
npm install

# 初始化（清空缓存、日志、数据库）—— 危险
node init.js

# 启动开发服务（nodemon 热重载）
npm start

# 启动生产服务（带自动重启守护）
node start.js

# 清理 30 天前的缓存
node clean.js

# 打包发布（输出到 dist/）
npm run build
npm run upbuild   # 仅打包更新文件

# Docker
docker compose up -d
```

### Flutter 命令（在 `flutter-app/` 目录执行）

```powershell
# 安装依赖
flutter pub get

# 运行 Chrome
flutter run -d chrome --no-web-resources-cdn

# 打 release APK
flutter build apk --release

# 打 Web release
flutter build web
```

---

## 7. 给 AI Agent 的修改建议

1. **新增路由**：
   - 必须放在 `app.use('/getFile', rangeInterceptor, express.static(rootPath))` 之后，**避免被静态中间件吞掉**（除非你确实想优先静态）。
   - 涉及路径的，复制 `validatePath` 校验。
   - 涉及缓存的，沿用 `crypto.createHash('sha256')` 命名规则并在 `sqllite.js` 添加对应方法。
   - 新增管理接口挂到 `server/routes/admin.js`（会自动继承 `/api/admin` 前的 `adminAuth`），不要绕过它自己 `app.get`。
   - 改了 `admin/` 源码后要重新构建 **并重启后端**，否则 `/admin` 挂载判断不会刷新。

2. **新增依赖**：
   - 后端：更新 `server/package.json`，同步更新 `server/build.js` 内 `distPackageJson.dependencies`。
   - 前端：更新对应子项目的 `package.json`（`web/` 或 `admin/`）。
   - 如果是 `sharp` / `better-sqlite3` / `ffmpeg-static` 这类含原生模块的包，`server/Dockerfile` 也需要相应调整（alpine 需要预装编译工具）。

3. **修改数据库结构**：
   - 改 `server/sqllite.js` 的 `init()`，并评估是否需要迁移脚本（项目目前没有迁移机制，建议手动 `node init.js` 后再启动）。

4. **修改图片/视频处理**：
   - 调整 sharp 或 ffmpeg 参数后，请考虑缓存失效（旧 `<hash><ext>` 文件可能仍存在并被命中）。可临时调用 `GET /cleanOldData/0` 清空。

5. **不要做**：
   - 不要把 `rootPath` 暴露给前端做任意读写控制。
   - 不要把 `restartPwd` 设为弱口令或硬编码到前端。（**现状已违反**：默认 `123456`，且 `admin/` 把它原样存进 `localStorage`，见 §3.6）
   - 不要绕过 `validatePath` 直接 `path.join`。
   - 不要在 `imageInterceptor` 中直接 `res.send` 错误页 — 会让所有 `/getFile` 请求的异常处理路径不一致。

6. **改动后请检查**：
   - 在 `server/` 目录执行 `node init.js`（可选）→ `node start.js` → 用浏览器或 `curl` 验证 `/`、`/list/$`、`/getFile/...`、`/getVideoPreview/...`。
   - 动了管理后台就再验证 `/api/admin/status`（带 `X-Admin-Token`）和 `/admin/logs` 这类**深链刷新**是否正常。
   - 若新增 API，请在 `shared/API_DOCUMENTATION.md` 同步更新（**注意：该文件目前完全没有 `/api/admin/*` 的内容**）。

---

## 8. 已知遗留问题

- `server/build.js` 中 `execCommand('cd dist && cd && npm install')` 写法有误，依赖的是进程默认 cwd 而非 `dist/`。建议改为：在 `dist/` 下 spawn `npm install`。
- `server/index.js` 中 `W` / `H` 解析后未做 `Number.isFinite` 校验，传 `abc` 会让 sharp 抛错。
- `/delFile`、`/renameFile`、`/cleanOldData/:day` 没有任何鉴权，仅靠路径校验；在公网部署需加认证中间件。
- 管理后台鉴权与 `restartPwd` 强耦合，且无 session/过期/失败限速（见 §3.6）。若要加固，需单独设计登录换 token 协议（改动涉及前后端）。
- `shared/API_DOCUMENTATION.md` 只覆盖用户端接口，`/api/admin/*` 与 WebSocket 完全没有文档；同时该文档在 `web/`、`flutter-app/` 下还有内容分叉的副本，缺乏单一可信来源。
- `admin/admin-server.js` 无 script 引用，且与 `base: '/admin/'` 的路径约定冲突，实际不可用。
- `web/` 下 `package-lock.json` 与 `pnpm-lock.yaml` 并存，包管理器不统一；`web/utils/` 位于 `src/` 之外，位置可疑。
- `server/mime.json` 已存在但未被 `index.js` 引用，文件下载时浏览器依赖扩展名猜测 MIME。
- HTTPS 证书是仓库内置的自签证书，仅适合本地测试。

---

## 9. 相关资源

- 前端仓库：<https://github.com/ZhengHaoF/file_server_web>
- 移动端仓库：<https://github.com/ZhengHaoF/file_server_flutter>
- 详细 API：见 [shared/API_DOCUMENTATION.md](./shared/API_DOCUMENTATION.md)
- 用户文档：见 [README.md](./README.md)
