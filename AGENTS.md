# AGENTS.md

> 面向 AI 编码代理（Agent）与新加入贡献者的项目说明。
> 本文档描述 `file-serve`（简易文件服务器后台）的架构、约定与开发注意事项。

---

## 1. 项目概览

`file-serve` 是一个基于 **Node.js + Express** 的轻量级文件服务器，专为 **大量查看 NAS 图片/视频** 的场景设计，特点：

- **不改原文件结构**，只读/删除/列出 `rootPath` 内的内容
- **图片实时压缩**：使用 `sharp` 按需缩放并缓存到本地
- **视频缩略图**：使用 `ffmpeg-static` + `fluent-ffmpeg` 在 `00:00:01` 截取一帧
- **缓存元数据**：使用 `better-sqlite3`（`imgCache.db`）管理缩略图缓存
- **同时提供 HTTP（3000）与 HTTPS（3001）服务**
- **Web 前端**位于 `web/`，由 `express.static('web')` 托管

> ⚠️ **重要约束**：`config.json` 中的 `rootPath` **不能设置为系统根目录**，否则安全检查形同虚设。

---

## 2. 目录结构

```
file-serve/
├── index.js              # 主入口：HTTP/HTTPS 服务与所有 API
├── sqllite.js            # better-sqlite3 封装：图片/视频缓存元数据
├── build.js              # 打包脚本（dist/ 输出 + npm install）
├── init.js               # 初始化：清空 imgCache、logs、数据库
├── clean.js              # 清理过期（默认 30 天）缓存数据
├── start.js              # 守护进程：监控 index.js 退出并自动重启
├── utils/utils.js        # 通用工具：formatDate
├── config.json           # 运行时配置（rootPath / imgCache / restartPwd）
├── mime.json             # 预留的 MIME 映射（当前未在 index.js 中使用）
├── web/                  # 前端静态资源（HTML/JS/CSS/Icon）
├── cert/                 # HTTPS 证书（private.pem + file.crt）
├── imgCache/             # 生成的图片/视频缩略图缓存目录
├── logs/                 # log4js 日志输出目录
├── imgCache.db           # SQLite 数据库文件（缓存索引）
├── Dockerfile            # 多阶段构建镜像
├── docker-compose.yml    # 容器编排
├── 启动.bat              # Windows 一键启动脚本
└── package.json
```

---

## 3. 关键模块说明

### 3.1 `index.js`（主入口）

按职责可拆为 5 段：

| 段落 | 作用 |
|------|------|
| 启动与配置加载 | 读取 `config.json`、校验 `rootPath`、创建 `imgCache` |
| 工具函数 | `validatePath`（防路径遍历）、`getNowPath`（路径归一化）、`getCompressImg`（sharp 缩放）、`getVideoThumbnail`（ffmpeg 截帧） |
| 中间件 | `imageInterceptor` 拦截 `/getFile/*.jpg!WxH` 形式的图片缩放请求 |
| 路由 | 见下表 |
| HTTP/HTTPS 启动 | 监听 3000 / 3001 |

**路由一览**（详见 `API_DOCUMENTATION.md`）：

| 方法 | 路径 | 作用 |
|------|------|------|
| GET  | `/list/:filePath(*)` | 列出目录（`$` 代替 `/`，`$$` 为根），支持 `sta/end` 分页 |
| POST | `/delFile` | 删除文件或递归删除文件夹 |
| POST | `/restartServer` | 密码校验后 `process.exit(0)`，由 `start.js` 拉起 |
| GET  | `/cleanOldData/:day` | 调用 `sql.cleanOldData(day)` 清理过期缓存 |
| GET  | `/getVideoPreview/:path(*)` | 生成/读取视频缩略图（缓存到 `imgCache`） |
| GET  | `/getFile/*` | 静态文件 + 图片按需缩放（由 `imageInterceptor` 处理 `!WxH` 后缀） |
| 静态 | `/` | 托管 `web/` 前端 |

**安全要点**：
- 所有接收路径的路由都调用 `validatePath(fullPath, rootPath)`，使用 `path.normalize` + `startsWith` 拦截 `../` 路径遍历。
- `imageInterceptor` 在拼接 `rootPath + filePath` 之前会先校验一次。
- `delFile`、`getVideoPreview`、图片中间件 都已加入同样的 `validatePath` 校验，**新增文件相关路由时必须复用该函数**。

**图片缩放 URL 协议**：
```
/getFile/<path>.jpg!<W>x<H>
```
- W/H 可省略其一（解析时会得到 `NaN`，**目前未做防御**，新增需求时建议校验）。
- 缓存键 = `sha256(filePath + "!WxH")`，写盘文件名为 `<hash><ext>`。

### 3.2 `sqllite.js`

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

### 3.3 `build.js`

执行 `npm run build` 会：

1. 删除并重建 `dist/`
2. 跑 `node init.js`（清空缓存与日志）
3. 拷贝源码、配置、`cert/`、`web/`、`node.exe`、`启动.bat`
4. 在 `dist/` 内写入裁剪过的 `package.json`（**注意**：dist 的 `package.json` 与根目录的 `dependencies` 不完全一致，新增依赖需要**同步两处**）
5. 在 `dist/` 内执行 `npm install`（注意：`execCommand('cd dist && cd && npm install')` 中的 `cd &&` 实际未生效，**这是已知 bug**）

`--upbuild` 模式（`npm run upbuild`）只复制源码与 `web/`，用于增量更新。

### 3.4 `start.js`

守护进程，最多自动重启 10 次，写入 `logs/restart.log`。`/restartServer` 接口正是依赖 `start.js` 实现“软重启”。

### 3.5 `init.js` / `clean.js`

- `init.js`：**危险操作** — 同步执行 `fs.rm` 删除 `imgCache/` 和 `logs/`，并调用 `sql.init()`（`DROP TABLE + VACUUM + CREATE`）。任何对数据库结构的调整都要在这里同步。
- `clean.js`：默认清理 30 天未访问的缓存图片/视频缩略图。

---

## 4. 配置文件

`config.json`（UTF-8 with BOM，使用 `strip-bom` 解析）：

```json
{
  "rootPath": "C:\\Users\\zheng\\Downloads",
  "imgCache": "./imgCache",
  "restartPwd": "123456"
}
```

- `rootPath`：共享目录的根，**绝对路径**更稳。
- `imgCache`：相对路径时相对进程工作目录。
- `restartPwd`：`String(req.body.pwd) === String(restartPwd)` 比较，**类型必须一致**（注意数字与字符串）。

---

## 5. 开发约定

### 5.1 风格与依赖

- **ESM 项目**（`"type": "module"`），所有文件使用 `import` / `export`。
- Node ≥ 18.17.0（`engines` 字段）。
- HTTP 框架：**Express 4.x**。中间件顺序很重要：`cors()` → `express.static('web')` → `express.json` → `imageInterceptor` → `express.static('getFile', rootPath)` → 路由。
- 日志统一使用 `log4js`（`logs/app.log`，最大 10MB × 3 个备份，gzip 压缩）。**不要**用 `console.log` 代替业务日志。
- 图片处理统一走 `sharp`；视频走 `fluent-ffmpeg` + `ffmpeg-static`，**不要**额外安装系统级 ffmpeg。

### 5.2 安全红线

- 任何涉及用户可控路径的接口，**必须**调用 `validatePath(fullPath, rootPath)`，否则存在路径遍历。
- 涉及删除/写入/重启的接口必须有授权（如密码）或边界限制。
- 当前 HTTPS 证书是仓库内的 `cert/`，**仅供本地/内网测试**，生产环境请替换为可信 CA 签发证书。

### 5.3 缓存键与文件命名

- 图片缩放：`<sha256(path + "!WxH")><原 ext>`，存于 `imgCache/`。
- 视频缩略图：`<sha256(fullPath + "!video_preview")>.jpg`，存于 `imgCache/`。
- 调整缩放算法、输出格式（当前是 progressive JPEG）时，**需要**变更缓存键或主动清缓存，否则会读到旧文件。

### 5.4 错误处理

- API 风格：`{ msg: "..." }` 作为文本响应，`{ listNum, list }` / `{ name, size, isDirectory, isFile, suffix, mtime }` 作为数据响应。
- HTTP 状态码：400（缺参）、403（路径非法）、404（不存在）、500（内部错误）。
- `imageInterceptor` 内异常一律 `next()`，**不要**直接 5xx，否则会破坏普通文件下载。

---

## 6. 常用命令

```powershell
# 安装依赖
pnpm install   # 或 npm install

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

---

## 7. 给 AI Agent 的修改建议

1. **新增路由**：
   - 必须放在 `app.use(express.static('getFile', rootPath))` 之后，**避免被静态中间件吞掉**（除非你确实想优先静态）。
   - 涉及路径的，复制 `validatePath` 校验。
   - 涉及缓存的，沿用 `crypto.createHash('sha256')` 命名规则并在 `sqllite.js` 添加对应方法。

2. **新增依赖**：
   - 同步更新根 `package.json` 与 `build.js` 内 `distPackageJson.dependencies`。
   - 如果是 `sharp` / `better-sqlite3` / `ffmpeg-static` 这类含原生模块的包，Dockerfile 也需要相应调整（alpine 需要预装编译工具）。

3. **修改数据库结构**：
   - 改 `sqllite.js` 的 `init()`，并评估是否需要迁移脚本（项目目前没有迁移机制，建议手动 `node init.js` 后再启动）。

4. **修改图片/视频处理**：
   - 调整 sharp 或 ffmpeg 参数后，请考虑缓存失效（旧 `<hash><ext>` 文件可能仍存在并被命中）。可临时调用 `GET /cleanOldData/0` 清空。

5. **不要做**：
   - 不要把 `rootPath` 暴露给前端做任意读写控制。
   - 不要把 `restartPwd` 设为弱口令或硬编码到前端。
   - 不要绕过 `validatePath` 直接 `path.join`。
   - 不要在 `imageInterceptor` 中直接 `res.send` 错误页 — 会让所有 `/getFile` 请求的异常处理路径不一致。

6. **改动后请检查**：
   - `node init.js`（可选）→ `node start.js` → 用浏览器或 `curl` 验证 `/`、`/list/$`、`/getFile/...`、`/getVideoPreview/...`。
   - 若新增 API，请在 `API_DOCUMENTATION.md` 同步更新。

---

## 8. 已知遗留问题

- `build.js` 中 `execCommand('cd dist && cd && npm install')` 写法有误，依赖的是进程默认 cwd 而非 `dist/`。建议改为：在 `dist/` 下 spawn `npm install`。
- `index.js` 中 `W` / `H` 解析后未做 `Number.isFinite` 校验，传 `abc` 会让 sharp 抛错。
- `delFile` 没有任何鉴权，仅靠路径校验；在公网部署需加认证中间件。
- `mime.json` 已存在但未被 `index.js` 引用，文件下载时浏览器依赖扩展名猜测 MIME。
- HTTPS 证书是仓库内置的自签证书，仅适合本地测试。

---

## 9. 相关资源

- 前端仓库：<https://github.com/ZhengHaoF/file_server_web>
- 详细 API：见 [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- 用户文档：见 [README.md](./README.md)
