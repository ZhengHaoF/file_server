import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/upload_task.dart';
import 'api_service.dart';

const _kUploadTasksKey = 'upload_tasks';
const _kMaxUploadTasks = 200;

class UploadService extends ChangeNotifier {
  static final UploadService _instance = UploadService._internal();
  factory UploadService() => _instance;
  UploadService._internal();

  final Dio _dio = Dio();
  final List<AppUploadTask> _tasks = [];
  final Map<String, CancelToken> _cancelTokens = {};
  bool _initialized = false;
  bool _running = false;

  List<AppUploadTask> get tasks => List.unmodifiable(_tasks);

  bool get hasActiveTasks =>
      _tasks.any((t) =>
          t.status == AppUploadStatus.uploading ||
          t.status == AppUploadStatus.enqueued);

  int get activeCount =>
      _tasks.where((t) =>
          t.status == AppUploadStatus.uploading ||
          t.status == AppUploadStatus.enqueued).length;

  Future<void> init() async {
    if (_initialized) return;
    _initialized = true;
    await _loadTasks();
  }

  /// 将多个文件加入上传队列（前台串行，一次传一个）
  void startUploads(
    List<({String fileName, String localPath, int fileSize})> items,
    String destPath,
  ) {
    for (final item in items) {
      if (_tasks.length >= _kMaxUploadTasks) {
        _tasks.removeWhere((t) => t.status.isTerminal);
        if (_tasks.length >= _kMaxUploadTasks) {
          _tasks.removeRange(0, _tasks.length - _kMaxUploadTasks + 1);
        }
      }

      final task = AppUploadTask(
        id: DateTime.now().microsecondsSinceEpoch.toString(),
        fileName: item.fileName,
        destPath: destPath,
        localPath: item.localPath,
        fileSize: item.fileSize,
      );
      _tasks.insert(0, task);
    }
    _saveTasks();
    notifyListeners();
    _runQueue();
  }

  Future<void> _runQueue() async {
    if (_running) return;
    _running = true;
    try {
      while (true) {
        final next = _tasks
            .where((t) => t.status == AppUploadStatus.enqueued)
            .toList();
        if (next.isEmpty) break;
        await _executeUpload(next.first);
      }
    } finally {
      _running = false;
    }
  }

  Future<void> _executeUpload(AppUploadTask task) async {
    final cancelToken = CancelToken();
    _cancelTokens[task.id] = cancelToken;

    task.status = AppUploadStatus.uploading;
    task.errorMsg = null;
    notifyListeners();

    try {
      // destPath 必须排在 file 之前：后端在 multer 的 destination 回调里读取它决定落盘目录
      final formData = FormData.fromMap({
        'destPath': task.destPath,
        'file': await MultipartFile.fromFile(
          task.localPath,
          filename: task.fileName,
        ),
      });

      await _dio.post(
        '${ApiService().serverBaseUrl}/upload',
        data: formData,
        cancelToken: cancelToken,
        onSendProgress: (sent, total) {
          if (total > 0) {
            task.progress = sent / total;
            notifyListeners();
          }
        },
      );

      if (cancelToken.isCancelled) return;

      task.status = AppUploadStatus.completed;
      task.progress = 1.0;
      task.completedAt = DateTime.now();
    } on DioException catch (e) {
      if (cancelToken.isCancelled) return;

      task.status = AppUploadStatus.failed;
      final data = e.response?.data;
      if (data is Map<String, dynamic> && data['msg'] != null) {
        task.errorMsg = data['msg'].toString();
      } else {
        task.errorMsg = '上传失败 (${e.response?.statusCode ?? e.message})';
      }
      debugPrint('上传失败 [${e.type}]: ${task.errorMsg}');
      debugPrint('  URL: ${ApiService().serverBaseUrl}/upload');
      debugPrint('  状态码: ${e.response?.statusCode}');
    } catch (e) {
      if (cancelToken.isCancelled) return;

      task.status = AppUploadStatus.failed;
      task.errorMsg = '上传失败: $e';
      debugPrint('上传失败: $e');
      debugPrint('  本地文件: ${task.localPath}');
    } finally {
      _cancelTokens.remove(task.id);
      _saveTasks();
      notifyListeners();
    }
  }

  /// 取消任务（正在上传的会中断本次请求）
  Future<void> cancelUpload(String taskId) async {
    final cancelToken = _cancelTokens[taskId];
    if (cancelToken != null && !cancelToken.isCancelled) {
      cancelToken.cancel('用户取消');
    }

    final index = _tasks.indexWhere((t) => t.id == taskId);
    if (index == -1) return;

    _tasks[index].status = AppUploadStatus.canceled;
    _saveTasks();
    notifyListeners();
  }

  /// 重试失败任务；[newName] 用于冲突后改名重试（如 409）
  Future<void> retryUpload(String taskId, {String? newName}) async {
    final index = _tasks.indexWhere((t) => t.id == taskId);
    if (index == -1) return;

    final task = _tasks[index];
    if (task.status != AppUploadStatus.failed &&
        task.status != AppUploadStatus.canceled) {
      return;
    }

    if (newName != null && newName.trim().isNotEmpty) {
      task.fileName = newName.trim();
    }
    task.id = DateTime.now().microsecondsSinceEpoch.toString();
    task.status = AppUploadStatus.enqueued;
    task.progress = 0.0;
    task.errorMsg = null;
    task.completedAt = null;
    _saveTasks();
    notifyListeners();

    _runQueue();
  }

  /// 移除任务记录
  void removeTask(String taskId) {
    _cancelTokens[taskId]?.cancel('移除任务');
    _cancelTokens.remove(taskId);

    _tasks.removeWhere((t) => t.id == taskId);
    _saveTasks();
    notifyListeners();
  }

  void clearCompleted() {
    _tasks.removeWhere((t) => t.status.isTerminal);
    _saveTasks();
    notifyListeners();
  }

  Future<void> _loadTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final json = prefs.getString(_kUploadTasksKey) ?? '';
    final loaded = AppUploadTask.listFromJson(json);
    _tasks.clear();
    _tasks.addAll(loaded);

    // 恢复后，之前上传中/排队中的任务标记为失败（进程已退出无法续传）
    for (final task in _tasks) {
      if (task.status == AppUploadStatus.uploading ||
          task.status == AppUploadStatus.enqueued) {
        task.status = AppUploadStatus.failed;
        task.errorMsg = '上传中断，请重试';
      }
    }
    notifyListeners();
  }

  Future<void> _saveTasks() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kUploadTasksKey, AppUploadTask.listToJson(_tasks));
  }
}