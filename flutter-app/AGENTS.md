# AGENTS.md

> 给在本项目上工作的 AI 编码 Agent 阅读的指南。
> 描述项目结构、约定、关键命令和常见坑点。

---

## 项目概述

跨端文件浏览/管理 App，技术栈是 **Flutter**，单仓多端：

- **Flutter 移动端**（`lib/`）：浏览/播放后端文件服务器上的文件（视频、音频、图片、其他文件），支持设置主题、排序、播放方式等
- **配套 Web 端**（`网页项目/`）：Vue 3 实现，独立的网页版文件浏览器，与 Flutter 端功能镜像
- **后端服务**（不在本仓内，地址默认 `http://localhost:3000`）：提供 `list / getFile / getVideoPreview / delFile / restartServer` 等接口

Flutter 端不是单例状态管理（没有用 Provider/Riverpod），直接 `setState` + `Navigator.push`，代码风格偏简单直接。

---

## 技术栈

| 维度 | 选型 |
|---|---|
| 框架 | Flutter（SDK `^3.12.0`） |
| 路由 | `go_router ^14.6.2` |
| 网络 | `dio ^5.7.0` |
| 持久化 | `shared_preferences ^2.3.4` |
| 安全存储 | `flutter_secure_storage ^9.2.4`（长期访问令牌，Keychain/Keystore/DPAPI，Web 端禁用） |
| 视频播放 | `media_kit ^1.2.5` + `media_kit_video ^2.0.1` + `media_kit_libs_video ^1.0.7` |
| 音频播放 | `audioplayers ^6.1.0` |
| 外部唤起 | `url_launcher ^6.3.1`（VLC） |
| 图片缓存 | `cached_network_image ^3.4.1` |
| 图片预览 | `photo_view ^0.15.0` |
| 主题色 | `flutter_colorpicker ^1.1.0` |
| 图片选择 | `image_picker ^1.1.2` |
| 路径处理 | `path ^1.9.0` |
| Lint | `flutter_lints ^6.0.0` |

平台覆盖：Android / iOS / Windows / macOS / Linux / Web。

---

## 目录结构

```
flutter_application_1/
├── lib/
│   ├── main.dart                       # 入口，初始化 StorageService
│   ├── models/
│   │   └── file_info.dart              # 文件元数据模型，fromJson 内含 URL 拼接
│   ├── pages/
│   │   ├── home_page.dart              # 主页（文件列表 + 列表/网格切换 + 各种弹窗）
│   │   ├── settings_page.dart          # 设置页（显示/服务/系统操作）
│   │   ├── video_player_page.dart      # 视频播放器（media_kit + 上下集 + 音轨切换）
│   │   ├── audio_player_page.dart      # 音频播放器
│   │   └── text_viewer_page.dart       # 文本文件查看器（支持 .txt/.md/.json/.dart 等）
│   ├── router/
│   │   └── app_router.dart             # GoRouter 配置（/ /browse /settings /audio-play /video-play /text-view）
│   ├── services/
│   │   ├── api_service.dart            # 单例，Dio 封装 + 网络日志拦截器
│   │   ├── storage_service.dart        # 单例，SharedPreferences 封装
│   │   ├── token_store.dart            # 单例，长期访问令牌的安全存储（按 origin 隔离）
│   │   └── network_log_service.dart    # 单例 ChangeNotifier，记录网络请求
│   ├── utils/
│   │   ├── date_utils.dart
│   │   └── file_type_utils.dart
│   └── widgets/
│       ├── file_icon.dart
│       └── network_log_dialog.dart     # 网络日志弹窗
├── web/                                # Flutter Web 入口
│   ├── index.html
│   └── manifest.json
├── android/                            # Android 原生壳
│   └── app/src/main/AndroidManifest.xml
├── ios/  macos/  linux/  windows/      # 其他平台
├── test/                              # Flutter 测试
│   └── widget_test.dart               # 默认生成的 widget 测试入口
├── 网页项目/                           # 独立 Vue 3 Web 项目（不在 Flutter 编译范围内）
└── pubspec.yaml
```

---

## 关键文件 & 职责

### `main.dart`

唯一入口。**启动顺序**：

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  MediaKit.ensureInitialized();    // media_kit 必须在任何 Player 创建前初始化
  await StorageService().init();   // 必须先初始化，后续服务才能用
  restoreAppTheme();
  unawaited(ApiService().restoreSession());  // 记住的令牌在后台静默登录
  runApp(const MyApp());
}
```

`StorageService.init()` 完成前，**不要**触发任何 `ApiService` 调用。`MediaKit.ensureInitialized()` 必须在 `main()` 中最先调用。

### `services/storage_service.dart`

- 整个 App 的"设置中心"：所有用户偏好 + 服务器地址都存在 `SharedPreferences` 里
- 单例（`factory` 模式 + `_internal()`），**不能改 init 流程**
- 加新设置项：写一个 `get/set` 对，写法参考已有条目

### `services/api_service.dart`

- **单例 Dio 封装**（`factory ApiService() => _instance`）
- 持有一个 Dio 实例 + 网络日志拦截器
- `_serverBaseUrl` **不要**用硬编码默认值，必须从 `StorageService().serverBaseUrl` 读
- `setServerUrl(url)` 同步更新内存字段和持久化（**两个都要写**）
- `login(token, {remember})` 用长期令牌换会话，返回"是否已记住"；`restoreSession()` 用记住的令牌静默登录（**不抛异常**，启动时调用，并发调用复用同一次在途登录）；`ensureSessionRestored()` 供首屏目录加载等待在途登录，避免把"还在换会话"误判成未登录；`logout()` 调 `POST /api/auth/logout` 并清本地态；`tokenRemembered` 供 UI 显示"已登录（令牌已保存）"
- `getFileList` 遇 401 时，若有记住的令牌会**静默重登一次并重试**（8h 会话过期但长期令牌仍有效的常见场景）
- `_checkResponse(response)` 统一检查响应状态码，非 2xx 时从 body 提取 `msg` 抛异常
- `getFileUrl(path, name)` / `getVideoPreviewUrl(path)` 辅助方法用于拼接文件 URL
- 加新接口：在类里加一个 `Future` 方法，URL 用 `'$_serverBaseUrl/xxx'`
- `_NetworkLogInterceptor`（Dio 拦截器）定义在本文件底部，负责记录请求/响应到 `NetworkLogService`

### `services/token_store.dart`

- 长期访问令牌的唯一持久化出口，底层 `flutter_secure_storage`（iOS/macOS Keychain、Android Keystore、Windows DPAPI）
- **key 按服务器 origin 隔离**：`zfiles.accessToken.<origin>`，令牌只会发回当初输入它的那台服务器
- 用户显式勾选"记住登录状态"才写入；`login()` 不传 `remember` 会**清除**该 origin 的旧令牌（避免"取消记住"后旧令牌被复活）
- **Flutter Web（`kIsWeb`）一律禁用**：网页版没有安全存储，令牌只进内存
- 后端不可用（如 Linux 桌面没有 secret service、Keystore 锁定）时 `save` 返回 false、`read` 返回 null 并标记 `_unavailable`，**绝不回退到 SharedPreferences 明文**
- `SecureStorageBackend` 抽象 + `debugOverride/debugReset` 测试钩子，测试用内存假后端驱动平台故障

### `services/network_log_service.dart`

- 本文件包含 `NetworkLogEntry` 数据类 + `NetworkLogService` 单例（`ChangeNotifier`），最多缓存 500 条
- `NetworkLogEntry` 包含 timestamp / method / url / headers / body / statusCode / durationMs / isRequestError 等字段，以及多个 `formatted*` 格式化 getter
- 两个开关：`enabled`（默认 `true`）和 `showImageRequests`（默认 `true`，关闭后跳过带 `!WxH` 后缀的图片缩略图请求）
- 提供 `clear()` 一键清空
- 弹窗 `NetworkLogDialog` 通过监听它实现实时刷新
- 加新日志维度：扩展 `NetworkLogEntry` 字段 + 修改 `api_service.dart` 里 `_NetworkLogInterceptor` 的 `_record` 方法

### `pages/home_page.dart`

- 主页的 `ApiService` 实例字段（`final ApiService _apiService = ApiService();`）—— 因为是单例，写法上 `new` 多少次都返回同一个，**不要改成构造参数注入**
- `_loadFileList()` 开头 `await _apiService.ensureSessionRestored()`，等启动时的静默登录落地后再发请求，否则会把"还在换会话"报成"请连接并登录文件服务"
- 视图模式（`list` / `img`）、排序、过滤、文件点击/长按动作、播放方式选择都集中在这一个文件
- 图片文件点击后弹出 `_showMediaActions` 底部弹窗，支持预览/复制链接/下载/删除
- 图片预览使用 `photo_view` 实现 `ImagePreviewDialog`（`widgets/image_preview_dialog.dart`，支持手势缩放 + 左右滑动，桌面端另有箭头按钮、方向键、Esc 关闭与滚轮缩放），网格视图带 Hero 动画
- 文本文件（`.txt/.md/.json/.dart` 等）点击后跳转 `/text-view` 路由
- 添加新弹窗时注意 `_hasDialogOpen` 状态（控制返回键拦截）
- 错误处理：404 自动回根目录，其他错误显示 SnackBar

### `pages/settings_page.dart`

- 三个区块：**服务设置 / 显示设置 / 系统操作**
- 保存按钮是 AppBar 上的 `TextButton`（不是 ListTile）
- "登录文件服务"：未登录弹登录对话框（含"记住登录状态"勾选，Web 端隐藏并提示无法安全保存）；已登录点击则弹退出登录确认，走 `ApiService().logout()`
- 加新设置项：在对应区块里加一行，状态变量在 `initState` 读、`_saveSettings` 写

### `pages/text_viewer_page.dart`

- 文本文件查看器，接收 `url` + `fileName` 参数
- 使用独立的 `Dio` 实例（非单例 `ApiService`）以 `ResponseType.plain` 加载文本内容
- 支持 `.txt / .log / .md / .json / .xml / .csv / .yaml / .sql / .js / .ts / .dart / .py` 等扩展名
- 内容通过 `SelectableText` 展示，支持复制选中文本

---

## 开发约定

### 强制要求

1. **必须用 PowerShell 7 执行命令**（项目要求的运行环境）
2. **前后端修改好后通知用户即可，不要自动运行/构建**——这是用户的硬性规矩

##  Thinking Process | 思考规范

*Apply strictly during reasoning/thinking phases. 仅在思考过程中严格执行。*

- **Telegraphic Style | 电报风格：** Keywords, short lists, or arrows (`->`) only. Zero complete or lengthy sentences. 仅使用关键词、短列表或箭头，严禁完整长句。
- **High Density | 高信息密度：** Log ONLY critical logical turns, intermediate calculations, or assumptions needing validation. Skip obvious facts. 仅记录关键逻辑转折、中间计算值或待校验假设。跳过常识。
- **Efficiency | 高效收敛：** Output the final result immediately once derivation is verified. 验证推导无误后立刻终止反思并输出结果。

### 命名 / 结构

- 服务类用 `factory + _internal` 模式做单例
- 私有变量 `_` 前缀
- 模型类用 `fromJson` 命名工厂
- 弹窗类放在 `widgets/` 或 `pages/`，单独文件

### 持久化设置

新增一个设置项的标准模板（参考 `serverBaseUrl`）：

```dart
// storage_service.dart
String get xxx => _prefs.getString('xxx') ?? '默认值';
set xxx(String value) => _prefs.setString('xxx', value);
```

```dart
// settings_page.dart
late String _xxx;

@override
void initState() {
  super.initState();
  _xxx = _storage.xxx;
}

void _saveSettings() {
  _storage.xxx = _xxx;
  // ...
}
```

**凭据不走 SharedPreferences。** 长期访问令牌只进 `TokenStore`（系统安全存储，按 origin 隔离）；`readTicket` 等短期票据只进内存。任何"把令牌写进 prefs/日志/URL"的改动都是回退项。

---

## 常用命令（PowerShell 7）

| 用途 | 命令 |
|---|---|
| 安装依赖 | `flutter pub get` |
| 静态分析 | `flutter analyze` |
| 运行 Chrome（推荐，国内环境） | `flutter run -d chrome --no-web-resources-cdn` |
| 运行 Chrome（默认） | `flutter run -d chrome` |
| 打 release APK | `flutter build apk --release` |
| 打 Web release | `flutter build web` |
| 指定端口 | `flutter run -d chrome --web-port=8080` |

---

## 常见坑点

### 1. Android HTTP 明文流量（必须配置）

`android/app/src/main/AndroidManifest.xml` **必须**包含：

```xml
<uses-permission android:name="android.permission.INTERNET"/>
...
<application
    ...
    android:usesCleartextTraffic="true">
```

否则 release APK 装上后会所有网络请求 `Connection failed`（debug 变体有 Flutter 自动塞的 `INTERNET`，但 release 没有）。

### 2. Flutter Web 国内访问 gstatic.com

构建/运行 Web 时加 `--no-web-resources-cdn`，把 canvaskit 资源打包进 `build/web/`，否则会报 `Failed to fetch canvaskit.js`。

### 3. 服务器地址变更

- `ApiService` **是单例**，但**每个 widget 还是写 `final ApiService _apiService = ApiService();`**（因为是单例所以这没问题，不要改成注入）
- `setServerUrl` 内部必须**同时**更新内存字段和 `StorageService`，否则只改一个会有同步问题

### 4. Web 端没有 Flutter 入口

`web/` 目录是 Flutter Web 的入口（`index.html` + `flutter_bootstrap.js`），**不是** Vue 那个 `网页项目/`。两个 web 项目相互独立，不要混用。

### 5. `NetworkLogService` 在生产环境

- 当前 `enabled` 默认 `true`，会记录所有 Dio 请求/响应
- `showImageRequests` 默认 `true`，关闭后 `_isImageRequest` 会过滤掉 `.png/.jpg/.jpeg/.gif/.webp/.bmp/.svg` 这类带 `!WxH` 后缀的缩略图请求，减少日志量
- 大响应体（图片二进制）会占内存，必要时调小 `_maxEntries` 或加大小限制
- 弹窗里没做"按 URL 过滤"功能，目前只展示全部

### 6. 文件 URL 在 `FileInfo.fromJson` 时就拼死了

`FileInfo` 对象的 `url` 字段在加载列表时确定，**改服务器地址后需要重新加载列表**。所以 `home_page.dart` 在设置页返回后会调 `_loadFileList()` 刷新。

### 8. Windows 构建需要 ATL 组件（`flutter_secure_storage`）

`flutter_secure_storage_windows` 的 C++ 实现用了 `atlstr.h`（`CA2W`/`CW2A` 字符串转换）。VS Build Tools 若只装了最小 C++ 工具集，`flutter run -d windows` 会报：

```
error C1083: 无法打开包括文件 "atlstr.h"
```

修复（管理员 PowerShell，一次性）：

```powershell
& "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vs_installer.exe" modify `
  --installPath "C:\Program Files (x86)\Microsoft Visual Studio\18\BuildTools" `
  --add Microsoft.VisualStudio.Component.VC.ATL --quiet --norestart
```

或 Visual Studio Installer → 修改 → 单个组件 → 搜 "ATL" → 勾选 **C++ ATL for latest v143 build tools (x86 & x64)**。
装完重开终端再构建即可；`TokenStore` 的降级逻辑只在**运行期**后端不可用（如 Linux 无 secret service）时生效，编译期缺头文件它救不了。

### 9. 令牌持久化（`TokenStore`）

- 只有用户勾选"记住登录状态"才写系统安全存储；`login()` 不传 `remember: true` 会**清除**该 origin 的旧令牌，别把这当成 bug 修掉
- Web 端（`kIsWeb`）永远不保存令牌，UI 上也不要显示勾选框
- 后端不可用时（Linux 无 secret service、Keystore 锁定）降级为"仅内存会话"并提示用户，**禁止**回退到 SharedPreferences 明文
- `restoreSession()` 只对 401 删除已存令牌；网络不通/限流(429)时保留，避免用户被自己的失效循环锁死在登录限流外
- 服务端登录限流是 15 分钟 10 次，任何自动重登都必须有次数上限（当前：每次 401 最多一次，重试一次后不再重登）
- Android 自动备份会备份加密 blob 但不备份 Keystore 密钥，恢复后解密失败按"无存储"处理即可，不要报崩溃

---

## 配套 Web 项目（`网页项目/`）

独立目录，独立 `package.json`（Vue 3 + Vite），跟 Flutter 端**没有共享代码**。改的时候注意不要把 Vue 组件路径写到 Flutter 那边去。

主要技术栈：
- Vue 3 + Vue Router
- Vite
- axios
- 各种 `*.vue` 单文件组件

---

## 最近一次重大变更（Agent 应该知道的历史）

1. **网络日志功能**：通过 `Dio Interceptor`（`_NetworkLogInterceptor` 在 `api_service.dart` 底部） + 单例 `NetworkLogService`（含 `NetworkLogEntry` 数据类） + `NetworkLogDialog` 实现，主页 AppBar 有 `bug_report` 按钮
2. **可配置服务器地址**：默认 `http://localhost:3000`，存储在 `SharedPreferences`，设置页"服务设置"区块可改
3. **AndroidManifest 补全**：补了 `INTERNET` 权限和 `usesCleartextTraffic="true"`，修了 release APK 网络不通的问题
4. **网络日志 URL 完整显示**：列表项的 URL 从 `maxLines: 1 + ellipsis` 改成 `SelectableText` 不限行
5. **图片预览功能**：使用 `photo_view` 实现图片浏览弹窗（现位于 `widgets/image_preview_dialog.dart`，支持手势缩放 + 左右滑动；桌面端追加箭头按钮、方向键翻页、Esc 关闭与滚轮缩放），网格视图带 Hero 动画
6. **文本文件查看器**：新增 `TextViewerPage`，通过 `/text-view` 路由访问，支持查看 `.txt / .md / .json / .dart` 等多种文本文件
7. **Lint 清理**：移除未使用的 `share_plus` 导入和 `_goBack` 方法，修复 `deprecated_member_use`（`Color.value` → `.toARGB32()`，`withOpacity` → `.withValues()`）和 `unnecessary_underscores`
8. **访问令牌可安全持久化**：新增 `services/token_store.dart`（`flutter_secure_storage`，key 按 origin 隔离，Web 端禁用）；登录对话框与连接弹窗加"记住登录状态"勾选；`ApiService.restoreSession()` 启动时静默登录，`getFileList` 遇 401 静默重登并重试一次；新增 `logout()`（调 `POST /api/auth/logout`）与设置页退出登录入口
9. **桌面端上传入口合并**：命令栏的「上传文件 / 上传文件夹」两个按钮合并为单个「上传」按钮 + `MenuAnchor` 菜单（`desktop_file_browser.dart`），与移动端上传弹窗、Web 单入口保持一致；`onUploadFolder` 为 null 时菜单只保留文件路径——`home_page.dart` 按 `kIsWeb` 门控（Flutter Web 的 `getDirectoryPath` 不受支持，此前宽窗 Web 下该按钮必败）
10. **底部 tab 切换统一为渐显**：`router/app_router.dart` 新增 `tabFadePage`（新页面 210ms 淡入、被替换页面在前 43% 即约 90ms 淡出，与桌面端 fade-through 同语言，`MediaQuery.disableAnimationsOf` 时零时长直切），`/`、`/downloads`、`/settings` 三个 tab 目的地共用；`/browse`（进入子目录的层级推进）保持右侧滑入，勿“顺手”改掉

---

## 提问 / 求助时该提供的信息

如果 Agent 在改代码时遇到不确定的问题，向用户报告时带上：

1. **改动了哪些文件**（绝对路径）
2. **关键 diff**（不要全文，只贴改的部分）
3. **是否需要用户自己跑命令验证**（默认是需要的）
4. **如果你想让我跑命令就明确说**，否则我不会主动跑
