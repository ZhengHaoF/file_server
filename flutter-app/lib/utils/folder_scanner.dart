import 'dart:io';
import 'package:path/path.dart' as p;

/// Blocked extensions aligned with server-rust security policy.
const blockedUploadExtensions = <String>{
  '.html',
  '.htm',
  '.xhtml',
  '.shtml',
  '.js',
  '.mjs',
  '.mhtml',
  '.svg',
  '.xml',
};

bool isBlockedUploadExtension(String fileName) {
  final ext = p.extension(fileName).toLowerCase();
  return blockedUploadExtensions.contains(ext);
}

class ScannedUploadItem {
  final String fileName;
  final String localPath;
  final int fileSize;
  final String destPath;

  const ScannedUploadItem({
    required this.fileName,
    required this.localPath,
    required this.fileSize,
    required this.destPath,
  });

  ({String fileName, String localPath, int fileSize, String? destPath})
      toPayload() => (
            fileName: fileName,
            localPath: localPath,
            fileSize: fileSize,
            destPath: destPath,
          );
}

class FolderScanResult {
  final List<ScannedUploadItem> items;
  final int skippedBlockedCount;
  final int skippedHiddenCount;
  final int totalFiles;
  final int totalBytes;

  const FolderScanResult({
    required this.items,
    this.skippedBlockedCount = 0,
    this.skippedHiddenCount = 0,
    this.totalFiles = 0,
    this.totalBytes = 0,
  });
}

/// Recursively scans a local folder, skipping symlinks and hidden entries,
/// and maps each file's relative hierarchy onto [currentRemotePath].
Future<FolderScanResult> scanDirectoryForUpload(
  String rootDirPath,
  String currentRemotePath,
) async {
  final dir = Directory(rootDirPath);
  if (!await dir.exists()) {
    return const FolderScanResult(items: []);
  }

  final items = <ScannedUploadItem>[];
  var skippedBlocked = 0;
  var skippedHidden = 0;
  var totalBytes = 0;

  final baseFolderName = p.basename(rootDirPath);
  final targetBase = currentRemotePath.isEmpty
      ? baseFolderName
      : '$currentRemotePath/$baseFolderName';

  try {
    final entities = await dir.list(recursive: true, followLinks: false).toList();
    for (final entity in entities) {
      if (entity is Link) continue;
      if (entity is! File) continue;

      final relPath = p.relative(entity.path, from: rootDirPath);
      final segments = p.split(relPath);

      // Skip hidden files or files inside hidden folders
      if (segments.any((seg) => seg.startsWith('.'))) {
        skippedHidden++;
        continue;
      }

      final fileName = p.basename(entity.path);
      if (isBlockedUploadExtension(fileName)) {
        skippedBlocked++;
        continue;
      }

      final size = await entity.length();
      final parentDir = p.dirname(relPath);
      final String itemDestPath;
      if (parentDir == '.' || parentDir.isEmpty) {
        itemDestPath = targetBase;
      } else {
        final relDir = p.split(parentDir).join('/');
        itemDestPath = '$targetBase/$relDir';
      }

      items.add(
        ScannedUploadItem(
          fileName: fileName,
          localPath: entity.path,
          fileSize: size,
          destPath: itemDestPath,
        ),
      );
      totalBytes += size;
    }
  } catch (_) {
    // Return whatever was successfully collected
  }

  return FolderScanResult(
    items: items,
    skippedBlockedCount: skippedBlocked,
    skippedHiddenCount: skippedHidden,
    totalFiles: items.length,
    totalBytes: totalBytes,
  );
}

/// Scans a mix of dropped files and directories.
Future<FolderScanResult> scanDroppedPathsForUpload(
  List<String> paths,
  String currentRemotePath,
) async {
  final items = <ScannedUploadItem>[];
  var skippedBlocked = 0;
  var skippedHidden = 0;
  var totalBytes = 0;

  for (final path in paths) {
    try {
      if (await FileSystemEntity.isDirectory(path)) {
        final res = await scanDirectoryForUpload(path, currentRemotePath);
        items.addAll(res.items);
        skippedBlocked += res.skippedBlockedCount;
        skippedHidden += res.skippedHiddenCount;
        totalBytes += res.totalBytes;
      } else if (await FileSystemEntity.isFile(path)) {
        final fileName = p.basename(path);
        if (fileName.startsWith('.')) {
          skippedHidden++;
          continue;
        }
        if (isBlockedUploadExtension(fileName)) {
          skippedBlocked++;
          continue;
        }
        final size = await File(path).length();
        items.add(
          ScannedUploadItem(
            fileName: fileName,
            localPath: path,
            fileSize: size,
            destPath: currentRemotePath,
          ),
        );
        totalBytes += size;
      }
    } catch (_) {
      // Ignore unreadable items
    }
  }

  return FolderScanResult(
    items: items,
    skippedBlockedCount: skippedBlocked,
    skippedHiddenCount: skippedHidden,
    totalFiles: items.length,
    totalBytes: totalBytes,
  );
}
