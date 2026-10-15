import '../utils/file_browser_utils.dart';

/// 一条递归搜索命中。`path` 是共享根相对路径（`/` 分隔），可能来自任意深度。
class SearchHit {
  final String name;
  final String path;
  final int sizeRow;
  final bool isFile;
  final bool isDirectory;
  final String? suffix;
  final String mtime;

  SearchHit({
    required this.name,
    required this.path,
    required this.sizeRow,
    required this.isFile,
    required this.isDirectory,
    required this.mtime,
    this.suffix,
  });

  factory SearchHit.fromJson(Map<String, dynamic> json) => SearchHit(
    name: json['name'] as String? ?? '',
    path: json['path'] as String? ?? '',
    sizeRow: (json['size'] as num?)?.toInt() ?? 0,
    isFile: json['isFile'] == true,
    isDirectory: json['isDirectory'] == true,
    mtime: json['mtime'] as String? ?? '',
    suffix: json['suffix'] as String?,
  );

  /// 所在目录（根目录为 ''）。
  String get parentPath {
    final index = path.lastIndexOf('/');
    return index < 0 ? '' : path.substring(0, index);
  }

  String get size => isDirectory ? '' : formatFileBytes(sizeRow);
}
