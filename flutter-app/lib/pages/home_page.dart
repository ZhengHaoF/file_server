import 'dart:async';
import 'dart:io';

import 'package:desktop_drop/desktop_drop.dart';
import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../models/file_info.dart';
import '../services/api_service.dart';
import '../services/download_service.dart';
import '../services/storage_service.dart';
import '../services/upload_service.dart';
import '../services/app_theme.dart';
import '../utils/date_utils.dart';
import '../utils/file_type_utils.dart';
import '../utils/platform_utils.dart';
import '../widgets/file_icon.dart';
import '../widgets/desktop_file_browser.dart';
import '../utils/file_browser_utils.dart';
import '../widgets/image_preview_dialog.dart';
import '../widgets/mobile_file_browser.dart';
import '../widgets/server_connection_sheet.dart';

class HomePage extends StatefulWidget {
  final String? path;

  const HomePage({super.key, this.path});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ApiService _apiService = ApiService();
  final StorageService _storage = StorageService();

  List<FileInfo> _fileList = [];
  bool _isLoading = false;
  String _currentPath = '';
  String _viewMode = 'list';
  bool _hasDialogOpen = false;
  bool _uploadQueued = false;
  // 有文件正被拖到窗口上方（桌面端用来显示投放提示）
  bool _isDragging = false;
  DateTime? _lastBackPress;
  String? _loadError;
  int _loadGeneration = 0;
  CancelToken? _listCancel;
  // Server address the current list was loaded from; detects address changes
  // made inside the embedded desktop settings section.
  String _loadedServerUrl = '';
  final List<String> _history = [];
  int _historyIndex = 0;

  bool get _desktop =>
      isDesktopPlatform ||
      (kIsWeb &&
          MediaQuery.sizeOf(context).width >= 700 &&
          !isMobilePlatform);

  @override
  void initState() {
    super.initState();
    _currentPath = widget.path ?? '';
    _history.add(_currentPath);
    _viewMode = _storage.model;
    UploadService().addListener(_onUploadUpdate);
    DownloadService().addListener(_onTransferUpdate);
    UploadService().addListener(_onTransferUpdate);
    _loadFileList();
  }

  @override
  void dispose() {
    _listCancel?.cancel('页面已关闭');
    _loadGeneration++;
    UploadService().removeListener(_onUploadUpdate);
    UploadService().removeListener(_onTransferUpdate);
    DownloadService().removeListener(_onTransferUpdate);
    super.dispose();
  }

  void _onTransferUpdate() {
    if (mounted) setState(() {});
  }

  void _onUploadUpdate() {
    if (!_uploadQueued) return;
    if (!UploadService().hasActiveTasks) {
      _uploadQueued = false;
      _loadFileList();
    }
  }

  @override
  void didUpdateWidget(HomePage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.path != oldWidget.path) {
      _currentPath = widget.path ?? '';
      _loadFileList();
    }
  }

  Future<void> _loadFileList() async {
    if (!mounted) return;
    _listCancel?.cancel('已发起新的目录请求');
    final cancel = _listCancel = CancelToken();
    final generation = ++_loadGeneration;
    final path = _currentPath;
    _loadedServerUrl = _apiService.serverBaseUrl;
    setState(() {
      _isLoading = true;
      _loadError = null;
    });

    try {
      final list = await _apiService.getFileList(path, cancelToken: cancel);
      if (!mounted || generation != _loadGeneration) return;
      setState(() {
        _fileList = list;
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted || generation != _loadGeneration || cancel.isCancelled) {
        return;
      }
      setState(() {
        _isLoading = false;
        _loadError = e.toString().replaceFirst('Exception: ', '');
      });
    }
  }

  List<FileInfo> _getSortedFileList() {
    return sortBrowserFiles(
      _fileList,
      _storage.fileSort,
      foldersFirst: _storage.folderSort == 'start',
    );
  }

  List<FileInfo> _getImageFilteredFileList() {
    if (!_storage.onlyShowImages) return _getSortedFileList();
    return _getSortedFileList().where((file) {
      return file.isDirectory || FileTypeUtils.isImg(file.suffix);
    }).toList();
  }

  String get _pathDisplayText {
    if (_currentPath.isEmpty) return '根目录';
    final segments = _currentPath
        .split('/')
        .where((s) => s.isNotEmpty)
        .toList();
    return segments.last;
  }

  bool get _isRoot => _currentPath.isEmpty;

  void _enterDirectory(String dirName) {
    final newPath = _currentPath.isNotEmpty
        ? '$_currentPath/$dirName'
        : dirName;
    if (_desktop) {
      _navigateDesktop(newPath);
      return;
    }
    context.push('/browse', extra: newPath);
  }

  void _navigateDesktop(String path, {bool record = true}) {
    if (path == _currentPath) return;
    setState(() {
      _currentPath = path;
      _fileList = [];
      _loadError = null;
      if (record) {
        _history.removeRange(_historyIndex + 1, _history.length);
        _history.add(path);
        _historyIndex = _history.length - 1;
      }
    });
    _loadFileList();
  }

  void _moveHistory(int delta) {
    final next = _historyIndex + delta;
    if (next < 0 || next >= _history.length) return;
    _historyIndex = next;
    _navigateDesktop(_history[next], record: false);
  }

  void _openDesktopFile(FileInfo file) {
    if (file.isDirectory) {
      _enterDirectory(file.name);
    } else if (FileTypeUtils.isImg(file.suffix)) {
      _showImagePreview(file);
    } else if (FileTypeUtils.isVideo(file.suffix)) {
      _showVideoActions(file, 0);
    } else if (FileTypeUtils.isAudio(file.suffix)) {
      context.push('/audio-play?url=${Uri.encodeComponent(file.url ?? '')}');
    } else if (FileTypeUtils.isText(file.suffix)) {
      context.push(
        '/text-view',
        extra: {'url': file.url ?? '', 'fileName': file.name},
      );
    } else {
      _showFileActions(file, 0);
    }
  }

  Color get _themeColor {
    try {
      final colorStr = _storage.themeColor.replaceAll('#', '');
      return Color(int.parse('FF$colorStr', radix: 16));
    } catch (e) {
      return const Color(0xFFf6823b);
    }
  }

  void _onFileTap(int index) {
    final files = _viewMode == 'img'
        ? _getImageFilteredFileList()
        : _getSortedFileList();
    if (index >= files.length) return;

    final fileInfo = files[index];

    if (fileInfo.isDirectory) {
      _enterDirectory(fileInfo.name);
      return;
    }

    final suffix = fileInfo.suffix ?? '';

    if (FileTypeUtils.isVideo(suffix)) {
      _showVideoActions(fileInfo, index);
    } else if (FileTypeUtils.isImg(suffix)) {
      _showMediaActions(fileInfo, index);
    } else if (FileTypeUtils.isAudio(suffix)) {
      context.push(
        '/audio-play?url=${Uri.encodeComponent(fileInfo.url ?? '')}',
      );
    } else if (FileTypeUtils.isText(suffix)) {
      context.push(
        '/text-view',
        extra: {'url': fileInfo.url ?? '', 'fileName': fileInfo.name},
      );
    } else {
      _showFileActions(fileInfo, index);
    }
  }

  void _onFileLongPress(int index) {
    final files = _viewMode == 'img'
        ? _getImageFilteredFileList()
        : _getSortedFileList();
    if (index >= files.length) return;

    final fileInfo = files[index];

    if (fileInfo.isDirectory) {
      _showFolderActions(fileInfo, index);
    } else {
      final suffix = fileInfo.suffix ?? '';
      if (FileTypeUtils.isVideo(suffix) || FileTypeUtils.isImg(suffix)) {
        _showMediaActions(fileInfo, index);
      } else {
        _showFileActions(fileInfo, index);
      }
    }
  }

  Future<void> _showActionPanel({
    required BuildContext context,
    required WidgetBuilder builder,
  }) async {
    if (_desktop) {
      await showDialog<void>(
        context: context,
        builder: (dialogContext) => Dialog(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 440),
            child: SingleChildScrollView(child: builder(dialogContext)),
          ),
        ),
      );
    } else {
      await showModalBottomSheet<void>(
        context: context,
        useRootNavigator: true,
        builder: builder,
      );
    }
  }

  void _showVideoActions(FileInfo fileInfo, int index) {
    final playMode = _storage.playMode;

    if (playMode == 'vlc') {
      _launchVlc(fileInfo.url ?? '');
    } else if (playMode == 'html') {
      _openVideoPlayer(fileInfo);
    } else {
      setState(() => _hasDialogOpen = true);
      _showActionPanel(
        context: context,
        builder: (context) => SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.play_circle),
                title: const Text('本地播放器'),
                onTap: () {
                  Navigator.pop(context);
                  _openVideoPlayer(fileInfo);
                },
              ),
              ListTile(
                leading: const Icon(Icons.open_in_new),
                title: const Text('VLC 播放'),
                onTap: () {
                  Navigator.pop(context);
                  _launchVlc(fileInfo.url ?? '');
                },
              ),
              ListTile(
                leading: const Text('取消'),
                onTap: () => Navigator.pop(context),
              ),
            ],
          ),
        ),
      ).then((_) {
        if (mounted) setState(() => _hasDialogOpen = false);
      });
    }
  }

  void _openVideoPlayer(FileInfo fileInfo) {
    final videoList = _fileList
        .where((f) => FileTypeUtils.isVideo(f.suffix))
        .toList();
    final currentIndex = videoList.indexWhere((v) => v.name == fileInfo.name);

    context.push(
      '/video-play',
      extra: {
        'url': fileInfo.url ?? '',
        'videoList': videoList,
        'currentIndex': currentIndex >= 0 ? currentIndex : 0,
      },
    );
  }

  void _launchVlc(String url) async {
    final vlcUrl = 'vlc://$url';
    final uri = Uri.parse(vlcUrl);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  void _showMediaActions(FileInfo fileInfo, int index) {
    setState(() => _hasDialogOpen = true);
    _showActionPanel(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.visibility),
              title: const Text('预览'),
              onTap: () {
                Navigator.pop(context);
                _previewFile(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.copy),
              title: const Text('复制链接'),
              onTap: () {
                Navigator.pop(context);
                _copyUrl(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.download),
              title: const Text('下载'),
              onTap: () {
                Navigator.pop(context);
                _downloadFile(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.edit),
              title: const Text('重命名'),
              onTap: () {
                Navigator.pop(context);
                _confirmRename(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete, color: Colors.red),
              title: const Text('删除', style: TextStyle(color: Colors.red)),
              onTap: () {
                Navigator.pop(context);
                _confirmDelete(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.upload),
              title: const Text('上传到此目录'),
              onTap: () {
                Navigator.pop(context);
                _showUploadSheet();
              },
            ),
            ListTile(
              leading: const Text('取消'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    ).then((_) {
      if (mounted) setState(() => _hasDialogOpen = false);
    });
  }

  void _showFileActions(FileInfo fileInfo, int index) {
    setState(() => _hasDialogOpen = true);
    _showActionPanel(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.copy),
              title: const Text('复制链接'),
              onTap: () {
                Navigator.pop(context);
                _copyUrl(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.download),
              title: const Text('下载'),
              onTap: () {
                Navigator.pop(context);
                _downloadFile(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.edit),
              title: const Text('重命名'),
              onTap: () {
                Navigator.pop(context);
                _confirmRename(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete, color: Colors.red),
              title: const Text('删除', style: TextStyle(color: Colors.red)),
              onTap: () {
                Navigator.pop(context);
                _confirmDelete(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.upload),
              title: const Text('上传到此目录'),
              onTap: () {
                Navigator.pop(context);
                _showUploadSheet();
              },
            ),
            ListTile(
              leading: const Text('取消'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    ).then((_) {
      if (mounted) setState(() => _hasDialogOpen = false);
    });
  }

  void _showFolderActions(FileInfo fileInfo, int index) {
    setState(() => _hasDialogOpen = true);
    _showActionPanel(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.copy),
              title: const Text('复制链接'),
              onTap: () {
                Navigator.pop(context);
                _copyUrl(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.edit),
              title: const Text('重命名'),
              onTap: () {
                Navigator.pop(context);
                _confirmRename(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete, color: Colors.red),
              title: const Text('删除', style: TextStyle(color: Colors.red)),
              onTap: () {
                Navigator.pop(context);
                _confirmDelete(fileInfo);
              },
            ),
            ListTile(
              leading: const Icon(Icons.upload),
              title: const Text('上传到此目录'),
              onTap: () {
                Navigator.pop(context);
                _showUploadSheet();
              },
            ),
            ListTile(
              leading: const Text('取消'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    ).then((_) {
      if (mounted) setState(() => _hasDialogOpen = false);
    });
  }

  void _previewFile(FileInfo fileInfo) {
    final suffix = fileInfo.suffix ?? '';
    if (FileTypeUtils.isVideo(suffix)) {
      _openVideoPlayer(fileInfo);
    } else if (FileTypeUtils.isImg(suffix)) {
      _showImagePreview(fileInfo);
    }
  }

  void _showImagePreview(FileInfo fileInfo) {
    final imageFiles = _getSortedFileList()
        .where((f) => FileTypeUtils.isImg(f.suffix))
        .toList();
    final currentIndex = imageFiles.indexWhere((f) => f.name == fileInfo.name);

    final previewWidth = (MediaQuery.of(context).size.width *
            MediaQuery.of(context).devicePixelRatio)
        .round();
    final items = imageFiles.map((f) {
      final url = f.url ?? '';
      final image = _storage.viewOriginalImage
          ? NetworkImage(url)
          : NetworkImage(ApiService.imagePreviewUrl(url, previewWidth));
      return ImagePreviewItem(
        image: image,
        fileName: f.name,
        heroTag: 'grid_image_${f.name}',
      );
    }).toList();

    setState(() => _hasDialogOpen = true);
    showDialog(
      context: context,
      builder: (context) => ImagePreviewDialog(
        items: items,
        initialIndex: currentIndex >= 0 ? currentIndex : 0,
      ),
    ).then((_) {
      if (mounted) setState(() => _hasDialogOpen = false);
    });
  }

  void _copyUrl(FileInfo fileInfo) {
    final url = fileInfo.url ?? fileInfo.path ?? fileInfo.name;
    Clipboard.setData(ClipboardData(text: url));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(fileInfo.isDirectory ? '路径已复制到剪贴板' : '链接已复制到剪贴板')),
    );
  }

  Future<void> _downloadFile(FileInfo fileInfo) async {
    try {
      final url = fileInfo.url ?? '';
      if (kIsWeb) {
        // Web 端降级到浏览器下载
        final uri = Uri.parse(url);
        if (await canLaunchUrl(uri)) {
          await launchUrl(uri, mode: LaunchMode.externalApplication);
        }
      } else {
        // 非 Web 端使用内置下载管理
        await DownloadService().startDownload(
          url,
          fileInfo.name,
          fileInfo.path ?? '',
          fileSize: fileInfo.sizeRow,
        );
        if (mounted) {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(const SnackBar(content: Text('已加入下载队列')));
        }
      }
    } catch (_) {
      if (mounted) _showSnack('无法加入下载队列，请检查保存目录或队列容量');
    }
  }

  void _showUploadSheet() {
    setState(() => _hasDialogOpen = true);
    _showActionPanel(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.folder_open),
              title: const Text('选择文件'),
              subtitle: const Text('上传到当前目录'),
              onTap: () {
                Navigator.pop(context);
                _pickAndUpload();
              },
            ),
            if (!kIsWeb &&
                (defaultTargetPlatform == TargetPlatform.android ||
                    defaultTargetPlatform == TargetPlatform.iOS))
              ListTile(
                leading: const Icon(Icons.photo_camera),
                title: const Text('拍照上传'),
                subtitle: const Text('拍照后直接上传到当前目录'),
                onTap: () {
                  Navigator.pop(context);
                  _takePhotoAndUpload();
                },
              ),
            ListTile(
              leading: const Text('取消'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    ).then((_) {
      if (mounted) setState(() => _hasDialogOpen = false);
    });
  }

  Future<void> _pickAndUpload() async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.any,
        allowMultiple: true,
        withData: false,
      );
      if (result == null || result.files.isEmpty) return;
      _enqueueUploads(result.files);
    } catch (e) {
      if (mounted) _showSnack('选择文件失败');
    }
  }

  Future<void> _takePhotoAndUpload() async {
    try {
      final picker = ImagePicker();
      final file = await picker.pickImage(source: ImageSource.camera);
      if (file == null) return;

      final size = await File(file.path).length();
      _enqueueUploads([
        PlatformFile(
          name: file.name.isNotEmpty
              ? file.name
              : 'photo_${DateTime.now().millisecondsSinceEpoch}.jpg',
          path: file.path,
          size: size,
        ),
      ]);
    } catch (e) {
      if (mounted) _showSnack('拍照失败');
    }
  }

  void _enqueueUploads(List<PlatformFile> files) {
    final items = <({String fileName, String localPath, int fileSize})>[];
    for (final f in files) {
      if (f.path == null) continue;
      items.add((fileName: f.name, localPath: f.path!, fileSize: f.size));
    }
    if (items.isEmpty) {
      if (mounted) _showSnack('所选文件无法上传');
      return;
    }

    _uploadQueued = true;
    UploadService().startUploads(items, _currentPath);
    if (mounted) {
      _showSnack('已加入上传队列（${items.length} 个文件）');
      context.push('/downloads?tab=1');
    }
  }

  void _showSnack(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  void _confirmDelete(FileInfo fileInfo) {
    final isFolder = fileInfo.isDirectory && !fileInfo.isFile;
    final title = isFolder ? '删除文件夹' : '删除文件';
    final message = isFolder
        ? '确定要删除文件夹"${fileInfo.name}"吗？文件夹内的所有内容都将被删除。'
        : '确定要删除文件"${fileInfo.name}"吗？';

    setState(() => _hasDialogOpen = true);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            autofocus: true,
            onPressed: () => Navigator.pop(context),
            child: const Text('取消'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _deleteFile(fileInfo);
            },
            child: const Text('确定', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    ).then((_) {
      if (mounted) setState(() => _hasDialogOpen = false);
    });
  }

  Future<void> _deleteFile(FileInfo fileInfo) async {
    final filePath = fileInfo.path ?? '';
    try {
      final success = await _apiService.deleteFile(filePath);
      if (success) {
        _loadFileList();
        if (mounted) {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(const SnackBar(content: Text('删除成功')));
        }
      }
    } catch (e) {
      if (mounted) {
        final msg = e is Exception
            ? e.toString().replaceFirst('Exception: ', '')
            : e.toString();
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('删除失败: $msg')));
      }
    }
  }

  void _confirmRename(FileInfo fileInfo) {
    final controller = TextEditingController(text: fileInfo.name);

    setState(() => _hasDialogOpen = true);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('重命名'),
        content: TextField(
          controller: controller,
          autofocus: true,
          decoration: InputDecoration(
            labelText: fileInfo.isDirectory ? '文件夹名称' : '文件名称',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('取消'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _renameFile(fileInfo, controller.text);
            },
            child: const Text('确定'),
          ),
        ],
      ),
    ).then((_) {
      if (mounted) setState(() => _hasDialogOpen = false);
    });
  }

  Future<void> _renameFile(FileInfo fileInfo, String newName) async {
    if (newName.isEmpty || newName == fileInfo.name) return;
    if (newName == '.' ||
        newName == '..' ||
        newName.contains('/') ||
        newName.contains(r'\')) {
      if (mounted) _showSnack('名称不能包含路径分隔符或相对目录');
      return;
    }

    final oldPath = fileInfo.path ?? '';
    final lastSlash = oldPath.lastIndexOf('/');
    final parentPath = lastSlash >= 0
        ? oldPath.substring(0, lastSlash + 1)
        : '';
    final newPath = '$parentPath$newName';

    try {
      await _apiService.renameFile(oldPath, newPath);
      _loadFileList();
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('重命名成功')));
      }
    } catch (e) {
      if (mounted) {
        final msg = e is Exception
            ? e.toString().replaceFirst('Exception: ', '')
            : e.toString();
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('重命名失败: $msg')));
      }
    }
  }

  void _toggleViewMode() {
    setState(() {
      _viewMode = _viewMode == 'list' ? 'img' : 'list';
      _storage.model = _viewMode;
    });
  }

  void _handleWillPop(BuildContext context) {
    if (kIsWeb || defaultTargetPlatform != TargetPlatform.android) return;
    if (_hasDialogOpen) {
      setState(() => _hasDialogOpen = false);
      Navigator.of(context).pop();
      return;
    }

    if (_lastBackPress == null ||
        DateTime.now().difference(_lastBackPress!) >
            const Duration(seconds: 2)) {
      _lastBackPress = DateTime.now();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('再按一次返回关闭软件'),
          duration: Duration(seconds: 2),
        ),
      );
    } else {
      if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
        SystemNavigator.pop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_desktop) {
      return Scaffold(
        body: _buildBodyWithDropTarget(
          const [],
          desktopChild: DesktopFileBrowser(
            files: _viewMode == 'img' && _storage.onlyShowImages
                ? _fileList
                      .where(
                        (f) => f.isDirectory || FileTypeUtils.isImg(f.suffix),
                      )
                      .toList()
                : _fileList,
            path: _currentPath,
            server: _apiService.serverBaseUrl,
            loading: _isLoading,
            error: _loadError,
            viewMode: _viewMode,
            sort: _storage.fileSort,
            foldersFirst: _storage.folderSort == 'start',
            activeTransfers:
                DownloadService().activeCount + UploadService().activeCount,
            canBack: _historyIndex > 0,
            canForward: _historyIndex < _history.length - 1,
            onBack: () => _moveHistory(-1),
            onForward: () => _moveHistory(1),
            onNavigate: (path) {
              // 桌面端设置 section 内改了服务器地址后，点“全部文件”回到浏览器时要重载。
              final samePath = path == _currentPath;
              final serverChanged =
                  _apiService.serverBaseUrl != _loadedServerUrl;
              _navigateDesktop(path);
              if (serverChanged && samePath) _loadFileList();
            },
            onRefresh: _loadFileList,
            onUpload: _pickAndUpload,
            onTheme: () {
              cycleAppTheme();
              final label = switch (appThemeMode.value) {
                ThemeMode.system => '跟随系统',
                ThemeMode.light => '浅色',
                ThemeMode.dark => '深色',
              };
              _showSnack('外观：$label');
            },
            onToggleView: _toggleViewMode,
            onSort: (sort) => setState(() => _storage.fileSort = sort),
            onOpen: _openDesktopFile,
            onRename: _confirmRename,
            onDelete: _confirmDelete,
            onDownload: _downloadFile,
            onCopy: _copyUrl,
            thumbnail: (file) {
              if (FileTypeUtils.isImg(file.suffix)) {
                return ApiService.imagePreviewUrl(
                  file.url ?? '',
                  _storage.imgSize,
                );
              }
              if (FileTypeUtils.isVideo(file.suffix) &&
                  _storage.videoThumbnail) {
                return _apiService.getVideoPreviewUrl(file.path ?? '');
              }
              return null;
            },
          ),
        ),
      );
    }

    final files = _viewMode == 'img'
        ? _getImageFilteredFileList()
        : _getSortedFileList();
    return MobileFileBrowser(
      files: files,
      path: _currentPath,
      server: _apiService.serverBaseUrl,
      loading: _isLoading,
      error: _loadError,
      grid: _viewMode == 'img',
      preferredColumns: _storage.columns,
      canDownload: !kIsWeb,
      onRefresh: _loadFileList,
      onBack: () => _isRoot ? _handleWillPop(context) : context.pop(),
      onConnect: () async {
        final previous = _apiService.serverBaseUrl;
        await showServerConnection(context);
        if (!context.mounted) return;
        if (previous != _apiService.serverBaseUrl) {
          context.go('/');
          return;
        }
        _loadFileList();
      },
      onUpload: _showUploadSheet,
      onToggleView: _toggleViewMode,
      onSort: (sort) => setState(() => _storage.fileSort = sort),
      onOpen: _openDesktopFile,
      onDownload: _downloadFile,
      onMore: (file) => _onFileLongPress(files.indexOf(file)),
      thumbnail: (file) => FileTypeUtils.isImg(file.suffix)
          ? ApiService.imagePreviewUrl(file.url ?? '', _storage.imgSize)
          : FileTypeUtils.isVideo(file.suffix) && _storage.videoThumbnail
          ? _apiService.getVideoPreviewUrl(file.path ?? '')
          : null,
    );
  }

  /// 文件区域：桌面端可把文件直接拖进窗口，上传到当前打开的目录
  Widget _buildBodyWithDropTarget(
    List<FileInfo> files, {
    Widget? desktopChild,
  }) {
    return DropTarget(
      onDragEntered: (detail) {
        if (mounted) setState(() => _isDragging = true);
      },
      onDragExited: (detail) {
        if (mounted) setState(() => _isDragging = false);
      },
      onDragDone: _handleDropFiles,
      child: Stack(
        children: [
          if (desktopChild != null)
            desktopChild
          else if (_loadError != null)
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(_loadError!, textAlign: TextAlign.center),
                  TextButton(onPressed: _loadFileList, child: const Text('重试')),
                ],
              ),
            )
          else if (files.isEmpty && !_isLoading)
            const Center(child: Text('当前数据为空'))
          else
            _viewMode == 'list' ? _buildListView(files) : _buildGridView(files),
          if (_isLoading && desktopChild == null)
            Center(
              child: Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: Colors.black87,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(color: Colors.white),
                    SizedBox(height: 12),
                    Text('加载中···', style: TextStyle(color: Colors.white)),
                  ],
                ),
              ),
            ),
          if (_isDragging) _buildDropHint(),
        ],
      ),
    );
  }

  /// 拖拽悬停时的投放提示
  Widget _buildDropHint() {
    return Positioned.fill(
      child: IgnorePointer(
        child: Container(
          color: Colors.black.withValues(alpha: 0.45),
          alignment: Alignment.center,
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 32),
            padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: _themeColor, width: 2),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.upload_file, size: 48, color: _themeColor),
                const SizedBox(height: 14),
                const Text(
                  '松手即上传到当前目录',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 6),
                Text(
                  _pathDisplayText,
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  /// 处理拖入的文件：过滤掉文件夹后交给上传队列（目标目录即当前目录）
  Future<void> _handleDropFiles(DropDoneDetails detail) async {
    if (mounted) setState(() => _isDragging = false);

    final picked = <PlatformFile>[];
    var skippedFolders = 0;

    for (final file in detail.files) {
      try {
        // 后端 /upload 一次只接收一个文件，暂不支持整个文件夹
        if (await FileSystemEntity.isDirectory(file.path)) {
          skippedFolders++;
          continue;
        }
        picked.add(
          PlatformFile(
            name: file.name,
            path: file.path,
            size: await file.length(),
          ),
        );
      } catch (e) {
        // 单个文件读取失败不影响其余文件
      }
    }

    if (picked.isEmpty) {
      if (mounted) {
        _showSnack(skippedFolders > 0 ? '暂不支持拖入文件夹' : '拖入的项目无法上传');
      }
      return;
    }

    if (skippedFolders > 0 && mounted) {
      _showSnack('已跳过 $skippedFolders 个文件夹（暂不支持）');
    }
    _enqueueUploads(picked);
  }

  Widget _buildListView(List<FileInfo> files) {
    return RefreshIndicator(
      onRefresh: _loadFileList,
      child: ListView.builder(
        itemCount: files.length + 1,
        itemBuilder: (context, index) {
          if (index == files.length) {
            return const Padding(
              padding: EdgeInsets.all(16.0),
              child: Center(
                child: Text('到底了···', style: TextStyle(color: Colors.grey)),
              ),
            );
          }

          final file = files[index];
          return _buildListItem(file, index);
        },
      ),
    );
  }

  Widget _buildListItem(FileInfo file, int index) {
    return InkWell(
      onTap: () => _onFileTap(index),
      onLongPress: () => _onFileLongPress(index),
      // 桌面端（Windows/macOS/Linux）用鼠标右键唤出同一份操作菜单。
      // 右键只在有指针设备时触发，触屏设备仍走长按，两个入口并存。
      onSecondaryTapDown: (_) => _onFileLongPress(index),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Row(
          children: [
            FileIcon(
              suffix: file.suffix,
              isDirectory: file.isDirectory,
              size: 24,
              color: _themeColor,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    file.name,
                    style: const TextStyle(fontSize: 14),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          AppDateUtils.formatDateTime(file.mtime),
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                      if (file.isFile)
                        Text(
                          file.size,
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.grey,
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGridView(List<FileInfo> files) {
    final columns = _storage.columns;

    return RefreshIndicator(
      onRefresh: _loadFileList,
      child: GridView.builder(
        padding: const EdgeInsets.all(8),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: columns,
          childAspectRatio: 0.8,
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
        ),
        itemCount: files.length,
        itemBuilder: (context, index) {
          final file = files[index];
          return _buildGridItem(file, index);
        },
      ),
    );
  }

  Widget _buildGridItem(FileInfo file, int index) {
    final suffix = file.suffix ?? '';
    final isImage = FileTypeUtils.isImg(suffix);
    final isVideo = FileTypeUtils.isVideo(suffix);
    final showPreview = isImage || (isVideo && _storage.videoThumbnail);

    String? previewUrl;
    if (showPreview) {
      if (isVideo && _storage.videoThumbnail) {
        previewUrl = _apiService.getVideoPreviewUrl(file.path ?? '');
      } else if (isImage) {
        final w = _storage.imgSize;
        previewUrl = ApiService.imagePreviewUrl(file.url ?? '', w);
      }
    }

    return InkWell(
      onTap: () => _onFileTap(index),
      onLongPress: () => _onFileLongPress(index),
      onSecondaryTapDown: (_) => _onFileLongPress(index),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(4),
              child: showPreview && previewUrl != null
                  ? Hero(
                      tag: 'grid_image_${file.name}',
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: Image.network(
                          previewUrl,
                          fit: BoxFit.cover,
                          width: double.infinity,
                          errorBuilder: (context, error, stackTrace) =>
                              FileIcon(
                                suffix: file.suffix,
                                isDirectory: file.isDirectory,
                                size: 48,
                                color: _themeColor,
                              ),
                        ),
                      ),
                    )
                  : FileIcon(
                      suffix: file.suffix,
                      isDirectory: file.isDirectory,
                      size: 48,
                      color: _themeColor,
                    ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: Text(
              file.name,
              style: const TextStyle(fontSize: 12),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}

