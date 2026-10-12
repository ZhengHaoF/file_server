import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/services.dart';

import '../models/file_info.dart';
import '../utils/date_utils.dart';
import '../utils/file_browser_utils.dart';
import '../utils/file_type_utils.dart';
import 'file_icon.dart';

/// Desktop interaction and layout only. Requests, authorization, uploads and
/// destructive confirmations remain owned by HomePage.
class DesktopFileBrowser extends StatefulWidget {
  final List<FileInfo> files;
  final String path;
  final String server;
  final bool loading;
  final String? error;
  final String viewMode;
  final String sort;
  final bool foldersFirst;
  final int activeTransfers;
  final bool canBack;
  final bool canForward;
  final VoidCallback onBack;
  final VoidCallback onForward;
  final ValueChanged<String> onNavigate;
  final VoidCallback onRefresh;
  final VoidCallback onUpload;
  final VoidCallback onTransfers;
  final VoidCallback onSettings;
  final VoidCallback onTheme;
  final VoidCallback onLogs;
  final VoidCallback onToggleView;
  final ValueChanged<String> onSort;
  final ValueChanged<FileInfo> onOpen;
  final ValueChanged<FileInfo> onRename;
  final ValueChanged<FileInfo> onDelete;
  final ValueChanged<FileInfo> onDownload;
  final ValueChanged<FileInfo> onCopy;
  final String? Function(FileInfo)? thumbnail;

  const DesktopFileBrowser({
    super.key,
    required this.files,
    required this.path,
    required this.server,
    required this.viewMode,
    required this.sort,
    required this.onBack,
    required this.onForward,
    required this.onNavigate,
    required this.onRefresh,
    required this.onUpload,
    required this.onTransfers,
    required this.onSettings,
    required this.onTheme,
    required this.onLogs,
    required this.onToggleView,
    required this.onSort,
    required this.onOpen,
    required this.onRename,
    required this.onDelete,
    required this.onDownload,
    required this.onCopy,
    this.loading = false,
    this.error,
    this.foldersFirst = true,
    this.activeTransfers = 0,
    this.canBack = false,
    this.canForward = false,
    this.thumbnail,
  });

  @override
  State<DesktopFileBrowser> createState() => _DesktopFileBrowserState();
}

class _DesktopFileBrowserState extends State<DesktopFileBrowser> {
  final _selection = FileSelection();
  final _focus = FocusNode(debugLabel: 'desktop-file-area');
  final _search = TextEditingController();
  final _scroll = ScrollController();
  bool _details = true;
  bool _compact = false;
  List<FileInfo> _visible = [];
  int _columns = 1;

  @override
  void initState() {
    super.initState();
    _deriveFiles();
  }

  void _deriveFiles() {
    final query = _search.text.trim().toLowerCase();
    _visible = sortBrowserFiles(
      widget.files.where((f) => f.name.toLowerCase().contains(query)).toList(),
      widget.sort,
      foldersFirst: widget.foldersFirst,
    );
    _selection.reconcile(_visible);
  }

  @override
  void didUpdateWidget(DesktopFileBrowser oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.path != widget.path) {
      _selection.clear();
      _search.clear();
      if (_scroll.hasClients) _scroll.jumpTo(0);
    }
    if (oldWidget.path != widget.path ||
        !identical(oldWidget.files, widget.files) ||
        oldWidget.sort != widget.sort ||
        oldWidget.foldersFirst != widget.foldersFirst) {
      _deriveFiles();
    }
  }

  @override
  void dispose() {
    _focus.dispose();
    _search.dispose();
    _scroll.dispose();
    super.dispose();
  }

  List<FileInfo> get _selected => _visible
      .where((f) => _selection.keys.contains(FileSelection.keyOf(f)))
      .toList();

  void _select(int index) {
    final keys = HardwareKeyboard.instance;
    setState(() {
      _selection.select(
        _visible,
        index,
        toggle: keys.isControlPressed || keys.isMetaPressed,
        range: keys.isShiftPressed,
      );
    });
    _focus.requestFocus();
  }

  void _downloadSelected() {
    for (final file in _selected.where((f) => f.isFile)) {
      widget.onDownload(file);
    }
  }

  KeyEventResult _key(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    // Do not steal text editing, modal dialog or menu input.
    if (ModalRoute.of(context)?.isCurrent != true) {
      return KeyEventResult.ignored;
    }
    final active = FocusManager.instance.primaryFocus;
    if (active != _focus) return KeyEventResult.ignored;
    final key = event.logicalKey;
    final modifiers = HardwareKeyboard.instance;
    if (key == LogicalKeyboardKey.f5) {
      widget.onRefresh();
    } else if (modifiers.isAltPressed && key == LogicalKeyboardKey.arrowLeft) {
      if (widget.canBack) widget.onBack();
    } else if (modifiers.isAltPressed && key == LogicalKeyboardKey.arrowRight) {
      if (widget.canForward) widget.onForward();
    } else if ((modifiers.isControlPressed || modifiers.isMetaPressed) &&
        key == LogicalKeyboardKey.keyA) {
      setState(() => _selection.keys.addAll(_visible.map(FileSelection.keyOf)));
    } else if (key == LogicalKeyboardKey.escape) {
      setState(_selection.clear);
    } else if (key == LogicalKeyboardKey.enter && _selected.length == 1) {
      widget.onOpen(_selected.single);
    } else if (key == LogicalKeyboardKey.f2 && _selected.length == 1) {
      widget.onRename(_selected.single);
    } else if (key == LogicalKeyboardKey.delete && _selected.length == 1) {
      widget.onDelete(_selected.single);
    } else if (_visible.isNotEmpty &&
        [
          LogicalKeyboardKey.arrowUp,
          LogicalKeyboardKey.arrowDown,
          LogicalKeyboardKey.arrowLeft,
          LogicalKeyboardKey.arrowRight,
          LogicalKeyboardKey.home,
          LogicalKeyboardKey.end,
        ].contains(key)) {
      var current = _visible.indexWhere(
        (f) => FileSelection.keyOf(f) == _selection.focused,
      );
      final step = widget.viewMode == 'img' ? _columns : 1;
      final next = switch (key) {
        LogicalKeyboardKey.home => 0,
        LogicalKeyboardKey.end => _visible.length - 1,
        LogicalKeyboardKey.arrowUp => current < 0 ? 0 : current - step,
        LogicalKeyboardKey.arrowDown => current < 0 ? 0 : current + step,
        LogicalKeyboardKey.arrowLeft => current < 0 ? 0 : current - 1,
        _ => current < 0 ? 0 : current + 1,
      };
      current = next.clamp(0, _visible.length - 1);
      setState(
        () => _selection.select(
          _visible,
          current,
          range: modifiers.isShiftPressed,
        ),
      );
      if (_scroll.hasClients) {
        final row = widget.viewMode == 'img' ? current ~/ _columns : current;
        final extent = widget.viewMode == 'img'
            ? 188.0
            : (_compact ? 38.0 : 48.0);
        final top = row * extent;
        final position = _scroll.position;
        if (top < position.pixels ||
            top + extent > position.pixels + position.viewportDimension) {
          _scroll.jumpTo(top.clamp(0, position.maxScrollExtent));
        }
      }
    } else {
      return KeyEventResult.ignored;
    }
    return KeyEventResult.handled;
  }

  Future<void> _menu(int index, Offset point) async {
    final file = _visible[index];
    if (!_selection.keys.contains(FileSelection.keyOf(file))) {
      setState(() => _selection.select(_visible, index));
    }
    _focus.requestFocus();
    final overlay =
        Overlay.of(context).context.findRenderObject()! as RenderBox;
    final local = overlay.globalToLocal(point);
    final single = _selected.length == 1;
    final action = await showMenu<String>(
      context: context,
      position: RelativeRect.fromRect(
        Rect.fromLTWH(local.dx, local.dy, 1, 1),
        Offset.zero & overlay.size,
      ),
      items: [
        if (single)
          const PopupMenuItem(value: 'open', child: Text('打开 · Enter')),
        if (_selected.any((f) => f.isFile))
          const PopupMenuItem(value: 'download', child: Text('加入下载队列')),
        if (single) ...[
          PopupMenuItem(
            value: 'copy',
            child: Text(file.isDirectory ? '复制路径' : '复制链接'),
          ),
          const PopupMenuItem(value: 'rename', child: Text('重命名 · F2')),
          const PopupMenuDivider(),
          const PopupMenuItem(
            value: 'delete',
            child: Text('删除…', style: TextStyle(color: Colors.red)),
          ),
        ],
        if (!single)
          const PopupMenuItem(enabled: false, child: Text('批量删除暂不开放')),
      ],
    );
    if (!mounted) return;
    switch (action) {
      case 'open':
        widget.onOpen(file);
      case 'download':
        _downloadSelected();
      case 'copy':
        widget.onCopy(file);
      case 'rename':
        widget.onRename(file);
      case 'delete':
        widget.onDelete(file);
    }
  }

  Widget _button(IconData icon, String label, VoidCallback? callback) =>
      IconButton(
        tooltip: label,
        icon: Icon(icon, size: 20),
        onPressed: callback,
      );

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    return LayoutBuilder(
      builder: (context, bounds) {
        final wide = bounds.maxWidth >= 1050;
        final rail = bounds.maxWidth < 900;
        final selected = _selected;
        return Row(
          children: [
            Container(
              width: rail ? 64 : 212,
              decoration: BoxDecoration(
                color: colors.surfaceContainerLow,
                border: Border(right: BorderSide(color: colors.outlineVariant)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: rail ? 12 : 20,
                      vertical: 24,
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.folder_copy_outlined,
                          color: colors.primary,
                          size: 28,
                        ),
                        if (!rail) ...[
                          const SizedBox(width: 12),
                          const Expanded(
                            child: Text(
                              'Z-Files',
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  if (!rail)
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 8, 16, 8),
                      child: Text(
                        '工作空间',
                        style: TextStyle(
                          fontSize: 11,
                          color: colors.onSurfaceVariant,
                        ),
                      ),
                    ),
                  _nav(
                    Icons.folder_outlined,
                    '全部文件',
                    () => widget.onNavigate(''),
                    rail,
                    selected: true,
                  ),
                  _nav(Icons.sync_alt, '传输任务', widget.onTransfers, rail),
                  const Spacer(),
                  _nav(
                    Icons.brightness_6_outlined,
                    '切换主题',
                    widget.onTheme,
                    rail,
                  ),
                  _nav(
                    Icons.settings_outlined,
                    '设置与登录',
                    widget.onSettings,
                    rail,
                  ),
                  _nav(
                    Icons.monitor_heart_outlined,
                    '网络日志',
                    widget.onLogs,
                    rail,
                  ),
                  if (!rail)
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: Text(
                        Uri.tryParse(widget.server)?.host ?? '文件服务',
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 12,
                          color: colors.onSurfaceVariant,
                        ),
                      ),
                    ),
                  const SizedBox(height: 12),
                ],
              ),
            ),
            Expanded(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                    child: Row(
                      children: [
                        _button(
                          Icons.arrow_back,
                          '后退 · Alt+Left',
                          widget.canBack ? widget.onBack : null,
                        ),
                        _button(
                          Icons.arrow_forward,
                          '前进 · Alt+Right',
                          widget.canForward ? widget.onForward : null,
                        ),
                        _button(
                          Icons.arrow_upward,
                          '上一级',
                          widget.path.isEmpty
                              ? null
                              : () {
                                  final parts = widget.path.split('/')
                                    ..removeLast();
                                  widget.onNavigate(parts.join('/'));
                                },
                        ),
                        _button(Icons.refresh, '刷新 · F5', widget.onRefresh),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Container(
                            height: 40,
                            decoration: BoxDecoration(
                              color: colors.surfaceContainerLow,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                children: [
                                  TextButton(
                                    onPressed: () => widget.onNavigate(''),
                                    child: const Text('全部文件'),
                                  ),
                                  ..._breadcrumbs(),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
                    child: Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        SizedBox(
                          width: (bounds.maxWidth - (rail ? 64 : 212) - 40)
                              .clamp(120, 260),
                          child: TextField(
                            key: const Key('file-search'),
                            controller: _search,
                            onChanged: (_) => setState(_deriveFiles),
                            decoration: const InputDecoration(
                              hintText: '搜索当前目录',
                              prefixIcon: Icon(Icons.search, size: 20),
                              isDense: true,
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ),
                        FilledButton.icon(
                          onPressed: widget.onUpload,
                          icon: const Icon(Icons.upload_file, size: 18),
                          label: const Text('上传文件'),
                        ),
                        _button(
                          widget.viewMode == 'img'
                              ? Icons.view_list_outlined
                              : Icons.grid_view,
                          '切换列表 / 网格',
                          widget.onToggleView,
                        ),
                        _button(
                          Icons.density_small,
                          '切换紧凑密度',
                          () => setState(() => _compact = !_compact),
                        ),
                        PopupMenuButton<String>(
                          tooltip: '排序',
                          icon: const Icon(Icons.sort, size: 20),
                          initialValue: widget.sort,
                          onSelected: widget.onSort,
                          itemBuilder: (_) => const [
                            PopupMenuItem(
                              value: 'nameStoB',
                              child: Text('名称：升序'),
                            ),
                            PopupMenuItem(
                              value: 'nameBtoS',
                              child: Text('名称：降序'),
                            ),
                            PopupMenuItem(
                              value: 'timeBtoS',
                              child: Text('修改时间：最新优先'),
                            ),
                            PopupMenuItem(
                              value: 'timeStoB',
                              child: Text('修改时间：最早优先'),
                            ),
                            PopupMenuItem(
                              value: 'sizeStoB',
                              child: Text('大小：从小到大'),
                            ),
                            PopupMenuItem(
                              value: 'sizeBtoS',
                              child: Text('大小：从大到小'),
                            ),
                          ],
                        ),
                        if (wide)
                          _button(
                            Icons.info_outline,
                            '显示 / 隐藏详情',
                            () => setState(() => _details = !_details),
                          ),
                      ],
                    ),
                  ),
                  if (selected.isNotEmpty)
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 4,
                      ),
                      color: colors.primaryContainer.withValues(alpha: .45),
                      child: Row(
                        children: [
                          Expanded(child: Text('已选择 ${selected.length} 项')),
                          if (selected.any((f) => f.isFile))
                            _button(
                              Icons.download_outlined,
                              '下载选中文件',
                              _downloadSelected,
                            ),
                          if (selected.length == 1) ...[
                            _button(
                              Icons.edit_outlined,
                              '重命名 · F2',
                              () => widget.onRename(selected.single),
                            ),
                            _button(
                              Icons.delete_outline,
                              '删除（需确认）',
                              () => widget.onDelete(selected.single),
                            ),
                          ],
                          _button(
                            Icons.close,
                            '取消选择 · Escape',
                            () => setState(_selection.clear),
                          ),
                        ],
                      ),
                    ),
                  if (widget.error != null)
                    Material(
                      color: colors.errorContainer,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 8,
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.warning_amber,
                              size: 20,
                              color: colors.onErrorContainer,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                '${widget.error}${widget.files.isNotEmpty ? ' · 当前为上次成功数据' : ''}',
                                maxLines: 3,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            TextButton(
                              onPressed: widget.onRefresh,
                              child: const Text('重试'),
                            ),
                            TextButton(
                              onPressed: widget.onSettings,
                              child: const Text('设置'),
                            ),
                          ],
                        ),
                      ),
                    ),
                  SizedBox(
                    height: 2,
                    child: widget.loading
                        ? const LinearProgressIndicator()
                        : const SizedBox.shrink(),
                  ),
                  Expanded(
                    child: Row(
                      children: [
                        Expanded(
                          child: Focus(
                            focusNode: _focus,
                            autofocus: true,
                            onKeyEvent: _key,
                            child: _fileArea(),
                          ),
                        ),
                        if (wide && _details)
                          _detailPanel(
                            selected.length == 1 ? selected.single : null,
                          ),
                      ],
                    ),
                  ),
                  Container(
                    height: 38,
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    decoration: BoxDecoration(
                      border: Border(
                        top: BorderSide(color: colors.outlineVariant),
                      ),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: Text(
                            '${_visible.length} 项${_search.text.isNotEmpty ? ' · 仅搜索当前已加载目录' : ''}',
                            style: TextStyle(
                              fontSize: 12,
                              color: colors.onSurfaceVariant,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        TextButton.icon(
                          onPressed: widget.onTransfers,
                          icon: const Icon(Icons.sync_alt, size: 16),
                          label: Text(
                            widget.activeTransfers > 0
                                ? '${widget.activeTransfers} 项传输中'
                                : '传输任务',
                            style: const TextStyle(fontSize: 12),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _nav(
    IconData icon,
    String label,
    VoidCallback callback,
    bool rail, {
    bool selected = false,
  }) {
    final colors = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      child: Tooltip(
        message: rail ? label : '',
        child: InkWell(
          borderRadius: BorderRadius.circular(8),
          onTap: callback,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            decoration: BoxDecoration(
              color: selected ? colors.primaryContainer : null,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                Icon(
                  icon,
                  size: 20,
                  color: selected
                      ? colors.onPrimaryContainer
                      : colors.onSurfaceVariant,
                ),
                if (!rail) ...[const SizedBox(width: 12), Text(label)],
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _breadcrumbs() {
    final parts = widget.path.split('/').where((p) => p.isNotEmpty).toList();
    return [
      for (var i = 0; i < parts.length; i++) ...[
        const Icon(Icons.chevron_right, size: 16),
        TextButton(
          onPressed: () => widget.onNavigate(parts.take(i + 1).join('/')),
          child: Text(parts[i]),
        ),
      ],
    ];
  }

  Widget _fileArea() {
    if (_visible.isEmpty) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              widget.error != null
                  ? Icons.cloud_off_outlined
                  : Icons.folder_open,
              size: 48,
              color: Theme.of(context).colorScheme.onSurfaceVariant,
            ),
            const SizedBox(height: 16),
            Text(
              widget.loading
                  ? '正在读取目录…'
                  : widget.error != null
                  ? '目录暂时无法加载'
                  : _search.text.isNotEmpty
                  ? '没有匹配的文件'
                  : '这个目录是空的',
            ),
          ],
        ),
      );
    }
    if (widget.viewMode == 'img') {
      return LayoutBuilder(
        builder: (context, bounds) {
          _columns = (bounds.maxWidth / 180).floor().clamp(1, 20);
          return Scrollbar(
            controller: _scroll,
            child: GridView.builder(
              key: const Key('desktop-grid'),
              controller: _scroll,
              padding: const EdgeInsets.all(12),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: _columns,
                mainAxisExtent: 176,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
              ),
              itemCount: _visible.length,
              itemBuilder: (_, index) => _item(index, grid: true),
            ),
          );
        },
      );
    }
    return LayoutBuilder(
      builder: (context, bounds) {
        final extended = bounds.maxWidth >= 650;
        return Column(
          children: [
            Container(
              height: 36,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              color: Theme.of(context).colorScheme.surfaceContainerLow,
              child: Row(
                children: [
                  Expanded(
                    child: TextButton(
                      style: TextButton.styleFrom(
                        alignment: Alignment.centerLeft,
                      ),
                      onPressed: () => widget.onSort(
                        widget.sort == 'nameStoB' ? 'nameBtoS' : 'nameStoB',
                      ),
                      child: const Text('名称'),
                    ),
                  ),
                  if (extended)
                    SizedBox(
                      width: 100,
                      child: Text(
                        '类型',
                        style: Theme.of(context).textTheme.labelMedium,
                      ),
                    ),
                  SizedBox(
                    width: extended ? 100 : 86,
                    child: TextButton(
                      onPressed: () => widget.onSort(
                        widget.sort == 'sizeStoB' ? 'sizeBtoS' : 'sizeStoB',
                      ),
                      child: const Text('大小'),
                    ),
                  ),
                  if (extended)
                    SizedBox(
                      width: 170,
                      child: TextButton(
                        onPressed: () => widget.onSort(
                          widget.sort == 'timeBtoS' ? 'timeStoB' : 'timeBtoS',
                        ),
                        child: const Text('修改时间'),
                      ),
                    ),
                ],
              ),
            ),
            Expanded(
              child: Scrollbar(
                controller: _scroll,
                child: ListView.builder(
                  key: const Key('desktop-list'),
                  controller: _scroll,
                  itemExtent: _compact ? 38 : 48,
                  itemCount: _visible.length,
                  itemBuilder: (_, index) => _item(index, extended: extended),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _item(int index, {bool grid = false, bool extended = false}) {
    final file = _visible[index];
    final colors = Theme.of(context).colorScheme;
    final selected = _selection.keys.contains(FileSelection.keyOf(file));
    final focused = _selection.focused == FileSelection.keyOf(file);
    final icon = FileIcon(
      suffix: file.suffix,
      isDirectory: file.isDirectory,
      size: grid ? 54 : 22,
      color: file.isDirectory ? colors.primary : null,
    );
    final thumbnail = grid ? widget.thumbnail?.call(file) : null;
    return Semantics(
      label: file.name,
      selected: selected,
      button: true,
      excludeSemantics: true,
      onTap: () => _select(index),
      customSemanticsActions: {
        const CustomSemanticsAction(label: '打开'): () => widget.onOpen(file),
      },
      child: Listener(
        onPointerDown: (event) {
          if (event.buttons == kPrimaryMouseButton) _select(index);
        },
        child: Material(
          color: selected
              ? colors.primaryContainer.withValues(alpha: .6)
              : colors.surface,
          child: InkWell(
            key: ValueKey('file:${FileSelection.keyOf(file)}'),
            canRequestFocus: false,
            onTap: () {},
            onDoubleTap: () {
              _select(index);
              widget.onOpen(file);
            },
            onSecondaryTapDown: (details) =>
                _menu(index, details.globalPosition),
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: focused
                      ? colors.primary
                      : grid
                      ? colors.outlineVariant
                      : Colors.transparent,
                ),
                borderRadius: BorderRadius.circular(grid ? 8 : 0),
              ),
              padding: EdgeInsets.symmetric(
                horizontal: grid ? 12 : 16,
                vertical: grid ? 8 : 0,
              ),
              child: grid
                  ? Column(
                      children: [
                        Expanded(
                          child: Center(
                            child: thumbnail == null
                                ? icon
                                : ClipRRect(
                                    borderRadius: BorderRadius.circular(6),
                                    child: Image.network(
                                      thumbnail,
                                      fit: BoxFit.cover,
                                      width: double.infinity,
                                      errorBuilder: (_, error, stack) => icon,
                                    ),
                                  ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          file.name,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          file.isDirectory
                              ? '文件夹'
                              : formatFileBytes(file.sizeRow),
                          style: TextStyle(
                            fontSize: 11,
                            color: colors.onSurfaceVariant,
                          ),
                        ),
                      ],
                    )
                  : Row(
                      children: [
                        icon,
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            file.name,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        if (extended)
                          SizedBox(
                            width: 100,
                            child: Text(
                              _type(file),
                              style: TextStyle(
                                fontSize: 12,
                                color: colors.onSurfaceVariant,
                              ),
                            ),
                          ),
                        SizedBox(
                          width: extended ? 100 : 86,
                          child: Text(
                            file.isDirectory
                                ? '—'
                                : formatFileBytes(file.sizeRow),
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 12),
                          ),
                        ),
                        if (extended)
                          SizedBox(
                            width: 170,
                            child: Text(
                              AppDateUtils.formatDateTime(file.mtime),
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 12,
                                color: colors.onSurfaceVariant,
                              ),
                            ),
                          ),
                      ],
                    ),
            ),
          ),
        ),
      ),
    );
  }

  String _type(FileInfo file) => file.isDirectory
      ? '文件夹'
      : (file.suffix?.replaceFirst('.', '').toUpperCase().isNotEmpty ?? false)
      ? '${file.suffix!.replaceFirst('.', '').toUpperCase()} 文件'
      : '文件';

  Widget _detailPanel(FileInfo? file) {
    final colors = Theme.of(context).colorScheme;
    return Container(
      width: 260,
      height: double.infinity,
      decoration: BoxDecoration(
        border: Border(left: BorderSide(color: colors.outlineVariant)),
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('文件详情', style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 36),
            if (file == null) ...[
              Icon(
                Icons.touch_app_outlined,
                color: colors.onSurfaceVariant,
                size: 40,
              ),
              const SizedBox(height: 16),
              const Text('选择一个文件查看详情'),
              const SizedBox(height: 12),
              Text(
                '双击打开\nCtrl / Shift 多选\nF2 重命名\nDelete 进入删除确认',
                style: TextStyle(
                  fontSize: 12,
                  height: 1.8,
                  color: colors.onSurfaceVariant,
                ),
              ),
            ] else ...[
              FileIcon(
                suffix: file.suffix,
                isDirectory: file.isDirectory,
                size: 64,
              ),
              const SizedBox(height: 24),
              SelectableText(
                file.name,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 24),
              _property('类型', _type(file)),
              if (file.isFile) _property('大小', formatFileBytes(file.sizeRow)),
              _property('修改时间', AppDateUtils.formatDateTime(file.mtime)),
              _property('路径', file.path ?? file.name),
              const SizedBox(height: 16),
              OutlinedButton.icon(
                onPressed: () => widget.onOpen(file),
                icon: const Icon(Icons.open_in_new, size: 16),
                label: const Text('打开'),
              ),
              if (FileTypeUtils.isImg(file.suffix))
                const Padding(
                  padding: EdgeInsets.only(top: 12),
                  child: Text('双击打开图片预览'),
                ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _property(String label, String value) => Padding(
    padding: const EdgeInsets.only(bottom: 16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        ),
        const SizedBox(height: 4),
        SelectableText(value, style: const TextStyle(fontSize: 12)),
      ],
    ),
  );
}
