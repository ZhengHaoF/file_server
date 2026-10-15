import '../models/file_info.dart';
import '../models/search_hit.dart';

String formatFileBytes(int bytes) {
  if (bytes < 1024) return '$bytes B';
  const units = ['KB', 'MB', 'GB', 'TB'];
  var value = bytes / 1024;
  var unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return '${value.toStringAsFixed(value < 10 ? 2 : 1)} ${units[unit]}';
}

List<FileInfo> sortBrowserFiles(
  List<FileInfo> files,
  String order, {
  bool foldersFirst = true,
}) {
  final result = List<FileInfo>.of(files);
  result.sort((a, b) {
    if (a.isDirectory != b.isDirectory) {
      return a.isDirectory == foldersFirst ? -1 : 1;
    }
    final comparison = switch (order) {
      'sizeStoB' || 'sizeBtoS' => a.sizeRow.compareTo(b.sizeRow),
      'timeStoB' || 'timeBtoS' => a.mtime.compareTo(b.mtime),
      _ => a.name.toLowerCase().compareTo(b.name.toLowerCase()),
    };
    final directed = order.endsWith('BtoS') ? -comparison : comparison;
    return directed != 0 ? directed : a.name.compareTo(b.name);
  });
  return result;
}

/// Selection is keyed by path, not visible index, so sorting cannot retarget an
/// operation. Filtering prunes hidden selection to keep bulk actions explicit.
class FileSelection {
  final Set<String> keys = {};
  String? anchor;
  String? focused;

  static String keyOf(FileInfo file) => file.path ?? file.name;

  void reconcile(List<FileInfo> files) {
    final available = files.map(keyOf).toSet();
    keys.removeWhere((key) => !available.contains(key));
    if (!available.contains(anchor)) anchor = null;
    if (!available.contains(focused)) focused = null;
  }

  void select(
    List<FileInfo> files,
    int index, {
    bool toggle = false,
    bool range = false,
  }) {
    final key = keyOf(files[index]);
    if (range && anchor != null) {
      final start = files.indexWhere((f) => keyOf(f) == anchor);
      if (!toggle) keys.clear();
      if (start >= 0) {
        final low = start < index ? start : index;
        final high = start > index ? start : index;
        keys.addAll(files.sublist(low, high + 1).map(keyOf));
      } else {
        keys.add(key);
      }
    } else if (toggle) {
      if (!keys.remove(key)) keys.add(key);
      anchor = key;
    } else {
      keys
        ..clear()
        ..add(key);
      anchor = key;
    }
    focused = key;
  }

  void clear() {
    keys.clear();
    anchor = null;
    focused = null;
  }
}

/// Steps [current] by [delta] inside `[0, count)`, clamping at both ends so
/// viewers never wrap around or step out of range.
int stepIndex(int current, int count, int delta) {
  if (count <= 0) return 0;
  final bounded = current.clamp(0, count - 1) + delta;
  return bounded.clamp(0, count - 1).toInt();
}

/// One mouse-wheel notch scales the current zoom by 15%, clamped to
/// `[minScale, maxScale]` so the image stays between fit and max zoom.
double nextWheelScale(
  double current, {
  required bool zoomIn,
  required double minScale,
  required double maxScale,
}) {
  final upper = maxScale > minScale ? maxScale : minScale;
  final stepped = current * (zoomIn ? 1.15 : 1 / 1.15);
  return stepped.clamp(minScale, upper).toDouble();
}

/// 搜索命中排序：目录优先，随后名称（大小写不敏感），与列表默认排序一致。
List<SearchHit> sortSearchHits(List<SearchHit> hits) {
  final result = List<SearchHit>.of(hits);
  result.sort((a, b) {
    if (a.isDirectory != b.isDirectory) return a.isDirectory ? -1 : 1;
    final comparison = a.name.toLowerCase().compareTo(b.name.toLowerCase());
    return comparison != 0 ? comparison : a.name.compareTo(b.name);
  });
  return result;
}

/// 服务端 `SEARCH_LIMIT` 的镜像。改动服务端上限时必须同步这里，
/// 否则 capped 文案会和服务端行为对不上。
const int kSearchResultLimit = 100;

/// 搜索状态行文案。status: idle|searching|complete|capped|timeout|error。
String searchStatusLabel(String status, int count, {String? error}) {
  switch (status) {
    case 'searching':
      return '正在搜索整个共享目录… 已找到 $count 条';
    case 'capped':
      return '仅显示前 $kSearchResultLimit 条，请输入更精确的关键词';
    case 'timeout':
      return '搜索超时，结果可能不完整（已找到 $count 条）';
    case 'error':
      return error ?? '搜索失败';
    case 'complete':
      return count == 0 ? '未找到匹配项' : '共 $count 条结果';
    default:
      return '输入关键词开始搜索';
  }
}
