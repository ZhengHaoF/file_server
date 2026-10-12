import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:mime/mime.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/download_task.dart';
import 'api_service.dart';

const _kTasksKey = 'download_tasks';
const _kMaxTasks = 200;
const _kChannel = MethodChannel('com.example.flutter_application_1/storage');

class DownloadService extends ChangeNotifier {
  static final DownloadService _instance = DownloadService._internal();
  factory DownloadService() => _instance;
  DownloadService._internal();

  final Dio _dio = Dio(
    BaseOptions(
      followRedirects: false,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 60),
    ),
  );
  final List<AppDownloadTask> _tasks = [];
  final Map<String, CancelToken> _cancelTokens = {};
  bool _initialized = false;
  String _tempDir = '';
  final Set<String> _reservedPaths = {};

  Future<String> _reserveSavePath(String fileName) async {
    final original = await _resolveSavePath(fileName);
    final dot = original.lastIndexOf('.');
    final slash = original.lastIndexOf('/');
    final stem = dot > slash ? original.substring(0, dot) : original;
    final extension = dot > slash ? original.substring(dot) : '';
    var counter = 0;
    while (true) {
      final candidate = counter == 0 ? original : '$stem ($counter)$extension';
      counter++;
      if (_reservedPaths.contains(candidate)) continue;
      _reservedPaths.add(candidate);
      if (!await File(candidate).exists()) return candidate;
      _reservedPaths.remove(candidate);
    }
  }

  void _runQueue() {
    while (_cancelTokens.length < 3) {
      final pending = _tasks.where(
        (task) => task.status == AppDownloadStatus.enqueued,
      );
      if (pending.isEmpty) return;
      _executeDownload(pending.first).whenComplete(_runQueue);
    }
  }

  List<AppDownloadTask> get tasks => List.unmodifiable(_tasks);

  int get activeCount => _tasks
      .where(
        (t) =>
            t.status == AppDownloadStatus.downloading ||
            t.status == AppDownloadStatus.enqueued,
      )
      .length;

  Future<void> init() async {
    if (_initialized) return;
    _initialized = true;

    final tempDir = await getTemporaryDirectory();
    _tempDir = tempDir.path;

    await _loadTasks();
  }

  /// Android 版本号（如 14、13），非 Android 平台返回 0
  Future<int> get _androidSdk async =>
      await _kChannel.invokeMethod<int>('getSdkVersion') ?? 0;

  /// 计算文件的最终保存路径
  Future<String> _resolveSavePath(String fileName) async {
    if (Platform.isAndroid) {
      // Android 10+：下载到临时目录（后续会插入 MediaStore，保留临时文件用于预览）
      // Android 9-：直接写公共 Download 目录
      if (await _androidSdk >= 29) {
        return '$_tempDir/$fileName';
      }
      final allowed = await _kChannel.invokeMethod<bool>(
        'requestStoragePermission',
      );
      if (allowed != true) throw StateError('未获得存储权限，请在系统设置中授权');
      final result = await _kChannel.invokeMethod<String>(
        'getExternalDownloads',
      );
      if (result != null) {
        final dir = Directory('$result/Z-Files');
        if (!await dir.exists()) {
          await dir.create(recursive: true);
        }
        return '${dir.path}/$fileName';
      }
      return '$_tempDir/$fileName';
    }

    if (Platform.isWindows || Platform.isMacOS || Platform.isLinux) {
      String home;
      if (Platform.isWindows) {
        home = Platform.environment['USERPROFILE'] ?? '';
      } else {
        home = Platform.environment['HOME'] ?? '';
      }
      if (home.isNotEmpty) {
        final dir = Directory('$home/Downloads/Z-Files');
        if (!await dir.exists()) {
          await dir.create(recursive: true);
        }
        return '${dir.path}/$fileName';
      }
    }

    if (Platform.isIOS) {
      final documents = await getApplicationDocumentsDirectory();
      final dir = Directory('${documents.path}/Downloads');
      await dir.create(recursive: true);
      return '${dir.path}/$fileName';
    }

    return '$_tempDir/$fileName';
  }

  Future<void> startDownload(
    String url,
    String fileName,
    String filePath, {
    int fileSize = 0,
  }) async {
    // 检查是否已在下载列表中
    final exists = _tasks.any((t) => t.url == url && !t.status.isTerminal);
    if (exists) return;

    // 限制任务数量，清理已完成的旧任务
    if (_tasks.length >= _kMaxTasks) {
      _tasks.removeWhere((t) => t.status.isTerminal);
      if (_tasks.length >= _kMaxTasks) {
        throw StateError('下载队列已满，请先完成或取消现有任务');
      }
    }

    final taskId = DateTime.now().microsecondsSinceEpoch.toString();
    final savePath = await _reserveSavePath(fileName);

    final task = AppDownloadTask(
      id: taskId,
      url: url,
      fileName: fileName,
      filePath: filePath,
      fileSize: fileSize,
    );
    task.savePath = savePath;

    _tasks.insert(0, task);
    _saveTasks();
    notifyListeners();

    // 异步执行下载，不阻塞调用方
    _runQueue();
  }

  Future<void> _executeDownload(AppDownloadTask task) async {
    final cancelToken = CancelToken();
    _cancelTokens[task.id] = cancelToken;

    task.status = AppDownloadStatus.downloading;
    task.errorMsg = null;
    notifyListeners();

    try {
      await _dio.download(
        task.url,
        task.savePath,
        options: Options(headers: ApiService().authHeadersFor(task.url)),
        cancelToken: cancelToken,
        onReceiveProgress: (received, total) {
          if (total > 0) {
            task.progress = received / total;
            notifyListeners();
          }
        },
      );

      if (cancelToken.isCancelled) return;

      // Android 10+ 需要额外插入 MediaStore（临时文件保留用于预览）
      if (Platform.isAndroid && await _androidSdk >= 29) {
        final tempFile = File(task.savePath);
        if (await tempFile.exists()) {
          task.savedUri = await _insertToMediaStore(tempFile, task.fileName);
          // 临时文件不删除，task.savePath 指向它，用于 App 内预览
        }
      }

      if (cancelToken.isCancelled) return;
      task.status = AppDownloadStatus.completed;
      task.progress = 1.0;
      task.completedAt = DateTime.now();
    } on DioException catch (e) {
      if (cancelToken.isCancelled) return;

      task.status = AppDownloadStatus.failed;
      task.errorMsg = '下载失败，请检查连接与授权后重试';
      debugPrint('下载失败 [${e.type}]: ${e.message}');
      debugPrint('  状态码: ${e.response?.statusCode}');
      debugPrint('  响应: ${e.response?.data}');
    } catch (e) {
      if (cancelToken.isCancelled) return;

      task.status = AppDownloadStatus.failed;
      task.errorMsg = '保存失败: $e';
      debugPrint('下载失败: $e');
      debugPrint('  保存路径: ${task.savePath}');
    } finally {
      _cancelTokens.remove(task.id);
      _reservedPaths.remove(task.savePath);
      _saveTasks();
      notifyListeners();
    }
  }

  // ── Android 10+：通过 MediaStore 插入公共目录 ──

  Future<String> _insertToMediaStore(File tempFile, String fileName) async {
    final mimeType = lookupMimeType(fileName) ?? 'application/octet-stream';
    final isMedia =
        mimeType.startsWith('image/') || mimeType.startsWith('video/');

    final uri = await _kChannel.invokeMethod<String>('insertMediaStore', {
      'fileName': fileName,
      'mimeType': mimeType,
      'isMedia': isMedia,
      'tempFilePath': tempFile.path,
    });

    if (uri == null || uri.isEmpty) throw StateError('系统未确认文件保存');
    return uri;
  }

  Future<void> openSavedFile(AppDownloadTask task) async {
    if (task.savedUri == null) throw StateError('没有系统保存位置');
    await _kChannel.invokeMethod<void>('openSavedFile', {
      'uri': task.savedUri,
      'mimeType': lookupMimeType(task.fileName) ?? 'application/octet-stream',
    });
  }

  // ── 任务管理 ──

  Future<void> cancelDownload(String taskId) async {
    final cancelToken = _cancelTokens[taskId];
    if (cancelToken != null && !cancelToken.isCancelled) {
      cancelToken.cancel('用户取消');
    }

    final index = _tasks.indexWhere((t) => t.id == taskId);
    if (index == -1) return;

    _tasks[index].status = AppDownloadStatus.canceled;
    if (cancelToken == null) _reservedPaths.remove(_tasks[index].savePath);
    _saveTasks();
    notifyListeners();
  }

  Future<void> retryDownload(String taskId) async {
    final index = _tasks.indexWhere((t) => t.id == taskId);
    if (index == -1) return;

    final task = _tasks[index];
    if (task.status != AppDownloadStatus.failed &&
        task.status != AppDownloadStatus.canceled) {
      return;
    }

    task.id = DateTime.now().microsecondsSinceEpoch.toString();
    task.status = AppDownloadStatus.enqueued;
    task.progress = 0.0;
    task.savedUri = null;
    task.errorMsg = null;
    task.completedAt = null;
    _saveTasks();
    notifyListeners();

    _runQueue();
  }

  /// 移除任务记录，可选删除磁盘文件
  void removeTask(String taskId, {bool deleteFile = false}) {
    _cancelTokens[taskId]?.cancel('移除任务');

    if (deleteFile) {
      final index = _tasks.indexWhere((t) => t.id == taskId);
      if (index != -1) {
        _deleteLocalFile(_tasks[index].savePath);
      }
    }

    _tasks.removeWhere((t) => t.id == taskId);
    _saveTasks();
    notifyListeners();
  }

  Future<void> _deleteLocalFile(String path) async {
    if (path.isEmpty) return;
    try {
      final file = File(path);
      if (await file.exists()) {
        await file.delete();
      }
    } catch (e) {
      debugPrint('删除文件失败: $e');
    }
  }

  void clearCompleted() {
    _tasks.removeWhere((t) => t.status.isTerminal);
    _saveTasks();
    notifyListeners();
  }

  Future<void> _loadTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final json = prefs.getString(_kTasksKey) ?? '';
    final loaded = AppDownloadTask.listFromJson(json);
    _tasks.clear();
    _tasks.addAll(loaded);

    // 恢复后，之前 downloading 的任务标记为 failed（重启后无法恢复）
    for (final task in _tasks) {
      if (task.status == AppDownloadStatus.downloading ||
          task.status == AppDownloadStatus.enqueued) {
        task.status = AppDownloadStatus.failed;
        task.errorMsg = '传输已中断，请重试（不是断点续传）';
      }
    }
    notifyListeners();
  }

  Future<void> _saveTasks() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kTasksKey, AppDownloadTask.listToJson(_tasks));
  }
}

extension _TaskStatusExt on AppDownloadStatus {
  bool get isTerminal =>
      this == AppDownloadStatus.completed ||
      this == AppDownloadStatus.failed ||
      this == AppDownloadStatus.canceled;
}
