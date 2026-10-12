import 'package:flutter/material.dart';
import '../models/file_info.dart';
import '../widgets/file_icon.dart';
import '../utils/file_browser_utils.dart';

/// Touch-specific browser. Selection is path based, never tied to row indices.
class MobileFileBrowser extends StatefulWidget {
  final List<FileInfo> files;
  final String path;
  final String server;
  final String? error;
  final bool loading;
  final bool grid;
  final bool canDownload;
  final int preferredColumns;
  final Future<void> Function() onRefresh;
  final VoidCallback onConnect;
  final VoidCallback onBack;
  final VoidCallback onUpload;
  final VoidCallback onToggleView;
  final void Function(String) onSort;
  final void Function(FileInfo) onOpen;
  final void Function(FileInfo) onMore;
  final void Function(FileInfo) onDownload;
  final String? Function(FileInfo) thumbnail;
  const MobileFileBrowser({
    super.key,
    required this.files,
    required this.path,
    required this.server,
    required this.loading,
    this.error,
    required this.grid,
    required this.preferredColumns,
    required this.onRefresh,
    required this.onConnect,
    required this.onBack,
    required this.onUpload,
    required this.onToggleView,
    required this.onSort,
    required this.onOpen,
    required this.onMore,
    required this.onDownload,
    required this.thumbnail,
    this.canDownload = true,
  });

  @override
  State<MobileFileBrowser> createState() => _MobileFileBrowserState();
}

class _MobileFileBrowserState extends State<MobileFileBrowser> {
  final _search = TextEditingController();
  final _selected = <String>{};
  bool _searching = false;
  String _key(FileInfo file) => file.path ?? '${widget.path}/${file.name}';

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(MobileFileBrowser oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.path != widget.path || oldWidget.server != widget.server) {
      _selected.clear();
      _search.clear();
    }
    final existing = widget.files.map(_key).toSet();
    _selected.removeWhere((key) => !existing.contains(key));
  }

  void _toggle(FileInfo file) => setState(() {
    final key = _key(file);
    if (!_selected.add(key)) _selected.remove(key);
  });

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final query = _search.text.trim().toLowerCase();
    final files = widget.files
        .where((file) => file.name.toLowerCase().contains(query))
        .toList();
    final selectedFiles = widget.files
        .where((file) => _selected.contains(_key(file)))
        .toList();
    return PopScope(
      canPop: _selected.isEmpty && widget.path.isNotEmpty,
      onPopInvokedWithResult: (didPop, _) {
        if (didPop) return;
        if (_selected.isNotEmpty) {
          setState(_selected.clear);
        } else if (widget.path.isEmpty) {
          widget.onBack();
        }
      },
      child: Scaffold(
        appBar: AppBar(
          leading: _selected.isNotEmpty
              ? IconButton(
                  tooltip: '退出选择',
                  icon: const Icon(Icons.close),
                  onPressed: () => setState(_selected.clear),
                )
              : widget.path.isNotEmpty
              ? IconButton(
                  tooltip: '返回上一级',
                  icon: const Icon(Icons.arrow_back),
                  onPressed: widget.onBack,
                )
              : null,
          title: Text(
            _selected.isNotEmpty ? '已选 ${_selected.length} 项' : '文件',
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          actions: [
            if (_selected.isNotEmpty && widget.canDownload)
              IconButton(
                tooltip: '下载选中文件',
                icon: const Icon(Icons.download),
                onPressed: selectedFiles.any((f) => !f.isDirectory)
                    ? () {
                        for (final file in selectedFiles.where(
                          (f) => !f.isDirectory,
                        )) {
                          widget.onDownload(file);
                        }
                        setState(_selected.clear);
                      }
                    : null,
              ),
            if (_selected.isEmpty)
              IconButton(
                tooltip: '搜索当前目录',
                icon: const Icon(Icons.search),
                onPressed: () => setState(() {
                  _searching = !_searching;
                  if (!_searching) _search.clear();
                }),
              ),
            PopupMenuButton<String>(
              tooltip: '目录选项',
              onSelected: (value) {
                if (value == 'view') widget.onToggleView();
                if (value == 'connect') widget.onConnect();
                if (value == 'nameStoB' || value == 'timeBtoS') {
                  widget.onSort(value);
                }
                if (value == 'select') {
                  setState(() => _selected.addAll(files.map(_key)));
                }
              },
              itemBuilder: (_) => [
                const PopupMenuItem(value: 'connect', child: Text('连接服务器')),
                PopupMenuItem(
                  value: 'view',
                  child: Text(widget.grid ? '列表视图' : '图片网格'),
                ),
                const PopupMenuItem(value: 'nameStoB', child: Text('名称排序')),
                const PopupMenuItem(value: 'timeBtoS', child: Text('最近修改优先')),
                const PopupMenuItem(value: 'select', child: Text('选择当前结果')),
              ],
            ),
          ],
        ),
        floatingActionButton: widget.canDownload && _selected.isEmpty
            ? FloatingActionButton(
                tooltip: '上传到当前目录',
                onPressed: widget.onUpload,
                child: const Icon(Icons.add),
              )
            : null,
        body: Column(
          children: [
            ListTile(
              dense: true,
              leading: Icon(Icons.dns_outlined, color: colors.primary),
              title: Text(
                widget.server,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              subtitle: Text(
                widget.path.isEmpty
                    ? '根目录'
                    : '根目录 / ${widget.path.replaceAll('/', ' / ')}',
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              trailing: const Icon(Icons.link),
              onTap: widget.onConnect,
            ),
            if (_searching)
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
                child: TextField(
                  controller: _search,
                  autofocus: true,
                  onChanged: (_) => setState(() {}),
                  decoration: const InputDecoration(
                    labelText: '搜索当前目录',
                    prefixIcon: Icon(Icons.search),
                    helperText: '仅筛选当前目录，不包含子目录',
                  ),
                ),
              ),
            if (widget.error != null && widget.files.isNotEmpty)
              MaterialBanner(
                content: Text('刷新失败，显示上次数据：${widget.error}'),
                actions: [
                  TextButton(
                    onPressed: widget.onRefresh,
                    child: const Text('重试'),
                  ),
                ],
              ),
            if (widget.loading) const LinearProgressIndicator(),
            Expanded(
              child: widget.files.isEmpty && widget.error != null
                  ? Center(
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.cloud_off_outlined, size: 48),
                            const SizedBox(height: 12),
                            Text(widget.error!, textAlign: TextAlign.center),
                            const SizedBox(height: 12),
                            FilledButton(
                              onPressed: widget.onConnect,
                              child: const Text('连接并登录'),
                            ),
                            TextButton(
                              onPressed: widget.onRefresh,
                              child: const Text('重试'),
                            ),
                          ],
                        ),
                      ),
                    )
                  : RefreshIndicator(
                      onRefresh: widget.onRefresh,
                      child: files.isEmpty
                          ? ListView(
                              physics: const AlwaysScrollableScrollPhysics(),
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(40),
                                  child: Text(
                                    widget.loading
                                        ? '正在读取目录…'
                                        : query.isEmpty
                                        ? '目录为空，上传文件开始使用'
                                        : '没有匹配的文件',
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                              ],
                            )
                          : widget.grid
                          ? _grid(files)
                          : ListView.builder(
                              key: PageStorageKey(
                                'mobile-list:${widget.server}:${widget.path}',
                              ),
                              padding: const EdgeInsets.only(bottom: 96),
                              physics: const AlwaysScrollableScrollPhysics(),
                              itemCount: files.length,
                              itemBuilder: (_, index) => _row(files[index]),
                            ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _row(FileInfo file) {
    final selected = _selected.contains(_key(file));
    return ListTile(
      key: ValueKey(_key(file)),
      selected: selected,
      selectedTileColor: Theme.of(context).colorScheme.secondaryContainer,
      leading: selected
          ? const Icon(Icons.check_circle)
          : FileIcon(
              suffix: file.suffix,
              isDirectory: file.isDirectory,
              size: 32,
            ),
      title: Text(file.name, maxLines: 2, overflow: TextOverflow.ellipsis),
      subtitle: Text(file.isDirectory ? '文件夹' : formatFileBytes(file.sizeRow)),
      onTap: () => _selected.isNotEmpty ? _toggle(file) : widget.onOpen(file),
      onLongPress: () => _toggle(file),
      trailing: _selected.isNotEmpty
          ? null
          : IconButton(
              tooltip: '文件操作',
              icon: const Icon(Icons.more_vert),
              onPressed: () => widget.onMore(file),
            ),
    );
  }

  Widget _grid(List<FileInfo> files) => LayoutBuilder(
    builder: (context, constraints) {
      final scale = MediaQuery.textScalerOf(context).scale(1).clamp(1.0, 2.0);
      final maxColumns = ((constraints.maxWidth - 24) / (108 * scale))
          .floor()
          .clamp(1, 8);
      final columns = widget.preferredColumns.clamp(1, maxColumns);
      return GridView.builder(
        key: PageStorageKey('mobile-grid:${widget.server}:${widget.path}'),
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 96),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: columns,
          mainAxisExtent: 160 * scale,
          mainAxisSpacing: 8,
          crossAxisSpacing: 8,
        ),
        itemCount: files.length,
        itemBuilder: (context, index) {
          final file = files[index];
          final selected = _selected.contains(_key(file));
          final thumbnail = widget.thumbnail(file);
          return Material(
            color: selected
                ? Theme.of(context).colorScheme.secondaryContainer
                : Theme.of(context).colorScheme.surfaceContainerLow,
            borderRadius: BorderRadius.circular(12),
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              key: ValueKey(_key(file)),
              onTap: () =>
                  _selected.isNotEmpty ? _toggle(file) : widget.onOpen(file),
              onLongPress: () => _toggle(file),
              child: Column(
                children: [
                  Expanded(
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        if (thumbnail != null)
                          Image.network(
                            thumbnail,
                            fit: BoxFit.cover,
                            errorBuilder: (_, _, _) => Center(
                              child: FileIcon(
                                suffix: file.suffix,
                                isDirectory: file.isDirectory,
                                size: 40,
                              ),
                            ),
                          )
                        else
                          Center(
                            child: FileIcon(
                              suffix: file.suffix,
                              isDirectory: file.isDirectory,
                              size: 40,
                            ),
                          ),
                        if (_selected.isEmpty)
                          Align(
                            alignment: Alignment.topRight,
                            child: IconButton(
                              tooltip: '文件操作',
                              style: IconButton.styleFrom(
                                backgroundColor: Theme.of(
                                  context,
                                ).colorScheme.surface.withValues(alpha: 0.85),
                              ),
                              constraints: const BoxConstraints(
                                minHeight: 48,
                                minWidth: 48,
                              ),
                              icon: const Icon(Icons.more_vert),
                              onPressed: () => widget.onMore(file),
                            ),
                          ),
                        if (selected)
                          const Align(
                            alignment: Alignment.topRight,
                            child: Padding(
                              padding: EdgeInsets.all(8),
                              child: Icon(Icons.check_circle),
                            ),
                          ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8),
                    child: Text(
                      file.name,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      );
    },
  );
}
