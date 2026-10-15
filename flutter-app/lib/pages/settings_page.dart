import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../services/api_service.dart';
import '../services/storage_service.dart';
import '../services/token_store.dart';
import '../services/app_theme.dart';
import '../utils/platform_utils.dart';
import '../utils/server_address.dart';
import '../widgets/network_log_dialog.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  final StorageService _storage = StorageService();
  final ApiService _apiService = ApiService();

  late int _imgSize;
  late int _columns;
  late String _playMode;
  late String _fileSort;
  late String _folderSort;
  late Color _themeColor;
  late bool _onlyShowImages;
  late bool _viewOriginalImage;
  late bool _videoThumbnail;
  late String _serverBaseUrl;

  @override
  void initState() {
    super.initState();
    _imgSize = _storage.imgSize;
    _columns = _storage.columns;
    _playMode = _storage.playMode;
    _fileSort = _storage.fileSort;
    _folderSort = _storage.folderSort;
    _onlyShowImages = _storage.onlyShowImages;
    _viewOriginalImage = _storage.viewOriginalImage;
    _videoThumbnail = _storage.videoThumbnail;
    _serverBaseUrl = _apiService.serverBaseUrl;

    try {
      final colorStr = _storage.themeColor.replaceAll('#', '');
      _themeColor = Color(int.parse('FF$colorStr', radix: 16));
    } catch (e) {
      _themeColor = const Color(0xFFf6823b);
    }
  }

  void _saveSettings() {
    _storage.imgSize = _imgSize;
    _storage.columns = _columns;
    _storage.playMode = _playMode;
    _storage.fileSort = _fileSort;
    _storage.folderSort = _folderSort;
    _storage.onlyShowImages = _onlyShowImages;
    _storage.viewOriginalImage = _viewOriginalImage;
    _storage.videoThumbnail = _videoThumbnail;
    _storage.serverBaseUrl = _serverBaseUrl;
    _apiService.setServerUrl(_serverBaseUrl);

    final colorHex = _themeColor
        .toARGB32()
        .toRadixString(16)
        .substring(2)
        .toUpperCase();
    _storage.themeColor = '#$colorHex';
    appThemeRevision.value++;

    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('设置已保存')));

    if (context.canPop()) {
      context.pop();
    } else {
      context.go('/');
    }
  }

  String _normalizeServerUrl(String input) {
    return normalizeServerAddress(input);
  }

  void _showServerUrlDialog() {
    final controller = TextEditingController(text: _serverBaseUrl);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('修改服务器地址'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(
            labelText: '服务器地址',
            hintText: 'http://localhost:3000',
          ),
          autofocus: true,
          keyboardType: TextInputType.url,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('取消'),
          ),
          TextButton(
            onPressed: () {
              try {
                final url = _normalizeServerUrl(controller.text);
                _apiService.setServerUrl(url);
                setState(() => _serverBaseUrl = url);
                Navigator.pop(context);
              } on FormatException catch (e) {
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text(e.message)));
              }
            },
            child: const Text('确定'),
          ),
        ],
      ),
    );
  }

  Future<void> _showLoginDialog() async {
    final controller = TextEditingController();
    var remember = false;
    var isLoading = false;
    String? errorMessage;

    await showDialog(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (_, setDialogState) {
          final screenWidth = MediaQuery.sizeOf(dialogContext).width;
          final dialogWidth = screenWidth > 464
              ? 400.0
              : (screenWidth - 64).clamp(240.0, 400.0);

          Future<void> handleLogin() async {
            final token = controller.text.trim();
            if (token.isEmpty) {
              setDialogState(() {
                errorMessage = '请输入访问令牌';
              });
              return;
            }
            setDialogState(() {
              isLoading = true;
              errorMessage = null;
            });
            try {
              final remembered = await _apiService.login(
                token,
                remember: remember,
              );
              if (dialogContext.mounted) {
                controller.clear();
                Navigator.pop(dialogContext);
              }
              if (mounted) {
                setState(() {});
                if (remember && !remembered) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('当前系统无法安全保存令牌，重启后需重新登录'),
                    ),
                  );
                }
              }
            } catch (e) {
              String error = '登录失败，请检查服务器和令牌';
              if (e is DioException) {
                final data = e.response?.data;
                final status = e.response?.statusCode;
                if (data is Map && data.containsKey('msg') && data['msg'] != null) {
                  error = data['msg'].toString();
                } else if (status == 401) {
                  error = '访问令牌无效或已过期';
                } else if (status == 403) {
                  error = '服务器拒绝访问，请检查权限';
                } else if (status == 429) {
                  error = '登录尝试过多，请稍后再试';
                } else if (e.type == DioExceptionType.connectionTimeout ||
                    e.type == DioExceptionType.receiveTimeout ||
                    e.type == DioExceptionType.sendTimeout) {
                  error = '连接超时，请检查网络和服务器地址';
                } else if (e.type == DioExceptionType.connectionError) {
                  error = '无法连接到服务器，请检查地址是否正确';
                }
              } else if (e is StateError) {
                error = e.message;
              } else if (e is FormatException) {
                error = e.message;
              }

              if (dialogContext.mounted) {
                setDialogState(() {
                  isLoading = false;
                  errorMessage = error;
                });
              }
            }
          }

          return PopScope(
            canPop: !isLoading,
            child: AlertDialog(
              title: const Text('登录文件服务'),
              content: SizedBox(
                width: dialogWidth,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    TextField(
                      controller: controller,
                      obscureText: true,
                      autocorrect: false,
                      enableSuggestions: false,
                      enabled: !isLoading,
                      onChanged: (_) {
                        if (errorMessage != null) {
                          setDialogState(() => errorMessage = null);
                        }
                      },
                      onSubmitted: isLoading ? null : (_) => handleLogin(),
                      decoration: InputDecoration(
                        labelText: '访问令牌',
                        helperText: errorMessage == null
                            ? '令牌用于换取文件服务会话'
                            : null,
                        errorText: errorMessage,
                      ),
                    ),
                    if (TokenStore().isBlocked || TokenStore().isUnavailable)
                      const Padding(
                        padding: EdgeInsets.only(top: 8),
                        child: Text(
                          '当前平台无法安全保存令牌，重启后需重新登录',
                          style: TextStyle(fontSize: 12),
                        ),
                      )
                    else
                      CheckboxListTile(
                        value: remember,
                        enabled: !isLoading,
                        onChanged: isLoading
                            ? null
                            : (value) =>
                                setDialogState(() => remember = value ?? false),
                        title: const Text('记住登录状态'),
                        subtitle: const Text('令牌加密保存在系统安全存储中'),
                        contentPadding: EdgeInsets.zero,
                        controlAffinity: ListTileControlAffinity.trailing,
                      ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  onPressed:
                      isLoading ? null : () => Navigator.pop(dialogContext),
                  child: const Text('取消'),
                ),
                TextButton(
                  onPressed: isLoading ? null : handleLogin,
                  child: isLoading
                      ? const SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('登录'),
                ),
              ],
            ),
          );
        },
      ),
    );
    // The dialog exit animation may still reference its controller.
    await Future<void>.delayed(const Duration(milliseconds: 300));
    controller.dispose();
  }

  Future<void> _confirmLogout() async {
    final remembered = _apiService.tokenRemembered;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('退出登录'),
        content: Text(
          remembered
              ? '将清除本地会话和已保存的令牌，之后需要重新输入访问令牌。'
              : '将清除本地会话，重启应用后需要重新输入访问令牌。',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, false),
            child: const Text('取消'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, true),
            child: const Text('退出登录'),
          ),
        ],
      ),
    );
    if (confirmed != true) return;
    await _apiService.logout();
    if (mounted) {
      setState(() {});
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('已退出登录')));
    }
  }

  void _restoreDefaults() async {
    await _storage.clear();
    restoreAppTheme();
    appThemeRevision.value++;
    if (mounted) {
      setState(() {
        _imgSize = _storage.imgSize;
        _columns = _storage.columns;
        _playMode = _storage.playMode;
        _fileSort = _storage.fileSort;
        _folderSort = _storage.folderSort;
        _onlyShowImages = _storage.onlyShowImages;
        _viewOriginalImage = _storage.viewOriginalImage;
        _videoThumbnail = _storage.videoThumbnail;
        _serverBaseUrl = _storage.serverBaseUrl;

        try {
          final colorStr = _storage.themeColor.replaceAll('#', '');
          _themeColor = Color(int.parse('FF$colorStr', radix: 16));
        } catch (e) {
          _themeColor = const Color(0xFFf6823b);
        }
      });
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('已恢复默认设置')));
    }
  }

  Future<void> _openAdmin() async {
    try {
      final uri = _apiService.adminUri;
      if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
        throw Exception('无法打开管理后台，请在浏览器中访问 $uri');
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('无法打开管理后台，请在浏览器中访问 ${_apiService.adminUri}')),
        );
      }
    }
  }

  String _loginSubtitle() {
    if (!_apiService.isLoggedIn) return '输入访问令牌以浏览文件';
    return _apiService.tokenRemembered ? '已登录（令牌已保存）' : '已登录';
  }

  void _showColorPicker() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('选择主题色'),
        content: SingleChildScrollView(
          child: ColorPicker(
            pickerColor: _themeColor,
            onColorChanged: (color) {
              setState(() => _themeColor = color);
            },
            pickerAreaHeightPercent: 0.8,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('确定'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('设置'),
        actions: [
          TextButton(onPressed: _saveSettings, child: const Text('保存')),
        ],
      ),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 820),
          child: ListView(
            children: [
              _buildSection(
                title: '服务设置',
                children: [
                  ListTile(
                    title: const Text('登录文件服务'),
                    subtitle: Text(_loginSubtitle()),
                    trailing: Icon(
                      _apiService.isLoggedIn ? Icons.lock : Icons.lock_outline,
                    ),
                    onTap: _apiService.isLoggedIn
                        ? _confirmLogout
                        : _showLoginDialog,
                  ),
                  ListTile(
                    title: const Text('服务器地址'),
                    subtitle: Text(
                      _serverBaseUrl,
                      style: const TextStyle(fontSize: 12, color: Colors.grey),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    trailing: const Icon(Icons.edit),
                    onTap: _showServerUrlDialog,
                  ),
                ],
              ),
              _buildSection(
                title: '显示设置',
                children: [
                  _buildDropdownTile(
                    title: '外观',
                    value: appThemeMode.value.name,
                    items: const {
                      'system': '跟随系统',
                      'light': '浅色',
                      'dark': '深色',
                    },
                    onChanged: (value) {
                      if (value == null) return;
                      setState(() {
                        appThemeMode.value = ThemeMode.values.firstWhere(
                          (mode) => mode.name == value,
                        );
                        _storage.appearance = value;
                      });
                    },
                  ),
                  _buildStepperTile(
                    title: '预览图像素',
                    value: _imgSize,
                    min: 50,
                    max: 5000,
                    onChanged: (v) => setState(() => _imgSize = v),
                  ),
                  // 列数只作用于移动端触控布局；桌面端按窗口宽度自动计算列数，
                  // 不展示这项设置。
                  if (!isDesktopLayout(context))
                    _buildStepperTile(
                      title: '显示列数',
                      value: _columns,
                      min: 2,
                      max: 6,
                      onChanged: (v) => setState(() => _columns = v),
                    ),
                  _buildColorTile(),
                  _buildDropdownTile(
                    title: '视频打开方式',
                    value: _playMode,
                    items: const {
                      'ask': '每次询问',
                      'vlc': 'VLC播放',
                      'html': '本地播放器',
                    },
                    onChanged: (v) => setState(() => _playMode = v!),
                  ),
                  _buildDropdownTile(
                    title: '文件排序方式',
                    value: _fileSort,
                    items: const {
                      'timeStoB': '时间正序',
                      'timeBtoS': '时间倒序',
                      'sizeStoB': '大小：从小到大',
                      'sizeBtoS': '大小：从大到小',
                      'nameStoB': '名称正序',
                      'nameBtoS': '名称倒序',
                    },
                    onChanged: (v) => setState(() => _fileSort = v!),
                  ),
                  _buildDropdownTile(
                    title: '文件夹位置',
                    value: _folderSort,
                    items: const {'start': '最前', 'end': '最后'},
                    onChanged: (v) => setState(() => _folderSort = v!),
                  ),
                  _buildSwitchTile(
                    title: '图片模式只显示图片',
                    value: _onlyShowImages,
                    onChanged: (v) => setState(() => _onlyShowImages = v),
                  ),
                  _buildSwitchTile(
                    title: '是否查看原图',
                    value: _viewOriginalImage,
                    onChanged: (v) => setState(() => _viewOriginalImage = v),
                  ),
                  _buildSwitchTile(
                    title: '开启视频缩略图',
                    value: _videoThumbnail,
                    onChanged: (v) => setState(() => _videoThumbnail = v),
                  ),
                ],
              ),
              _buildSection(
                title: '系统操作',
                children: [
                  ListTile(
                    title: const Text('重置显示设置'),
                    subtitle: const Text('保留连接地址和传输记录'),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: _restoreDefaults,
                  ),
                  _buildAdminTile(),
                  ListTile(
                    title: const Text('网络诊断日志'),
                    leading: const Icon(Icons.bug_report_outlined),
                    onTap: () => NetworkLogDialog.show(context),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSection({
    required String title,
    required List<Widget> children,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Text(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: Colors.grey[600],
            ),
          ),
        ),
        ...children,
        const Divider(),
      ],
    );
  }

  Widget _buildStepperTile({
    required String title,
    required int value,
    required int min,
    required int max,
    required ValueChanged<int> onChanged,
  }) {
    return ListTile(
      title: Text(title),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: const Icon(Icons.remove),
            onPressed: value > min ? () => onChanged(value - 1) : null,
          ),
          GestureDetector(
            onTap: () {
              final controller = TextEditingController(text: '$value');
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: Text('设置$title'),
                  content: TextField(
                    controller: controller,
                    autofocus: true,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(hintText: '$min - $max'),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('取消'),
                    ),
                    TextButton(
                      onPressed: () {
                        final input = int.tryParse(controller.text);
                        if (input != null) {
                          final clamped = input.clamp(min, max);
                          onChanged(clamped);
                        }
                        Navigator.pop(context);
                      },
                      child: const Text('确定'),
                    ),
                  ],
                ),
              );
            },
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey[300]!),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text('$value', style: const TextStyle(fontSize: 16)),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: value < max ? () => onChanged(value + 1) : null,
          ),
        ],
      ),
    );
  }

  Widget _buildColorTile() {
    return ListTile(
      title: const Text('主题色'),
      trailing: GestureDetector(
        onTap: _showColorPicker,
        child: Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: _themeColor,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: Colors.grey[300]!),
          ),
        ),
      ),
    );
  }

  Widget _buildDropdownTile({
    required String title,
    required String value,
    required Map<String, String> items,
    required ValueChanged<String?> onChanged,
  }) {
    return ListTile(
      title: Text(title),
      trailing: DropdownButton<String>(
        value: value,
        items: items.entries.map((e) {
          return DropdownMenuItem(value: e.key, child: Text(e.value));
        }).toList(),
        onChanged: onChanged,
      ),
    );
  }

  Widget _buildSwitchTile({
    required String title,
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return SwitchListTile(
      title: Text(title),
      value: value,
      onChanged: onChanged,
    );
  }

  Widget _buildAdminTile() {
    return ListTile(
      title: const Text('服务管理'),
      subtitle: const Text('在管理后台查看日志、配置与重启能力；需要管理会话。'),
      trailing: const Icon(Icons.open_in_new),
      onTap: _openAdmin,
    );
  }
}
