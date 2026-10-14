import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/services/storage_service.dart';
import 'package:z_files/services/upload_service.dart';
import 'package:z_files/utils/folder_scanner.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({
      'server_base_url': 'http://localhost:3000',
    });
    await StorageService().init();
  });

  group('FolderScanner and upload security tests', () {
    test('isBlockedUploadExtension blocks active content and script files', () {
      expect(isBlockedUploadExtension('index.html'), isTrue);
      expect(isBlockedUploadExtension('test.HTM'), isTrue);
      expect(isBlockedUploadExtension('script.js'), isTrue);
      expect(isBlockedUploadExtension('module.mjs'), isTrue);
      expect(isBlockedUploadExtension('vector.svg'), isTrue);
      expect(isBlockedUploadExtension('data.xml'), isTrue);
      expect(isBlockedUploadExtension('doc.xhtml'), isTrue);
      expect(isBlockedUploadExtension('page.shtml'), isTrue);
      expect(isBlockedUploadExtension('archive.mhtml'), isTrue);

      expect(isBlockedUploadExtension('report.pdf'), isFalse);
      expect(isBlockedUploadExtension('photo.jpg'), isFalse);
      expect(isBlockedUploadExtension('image.png'), isFalse);
      expect(isBlockedUploadExtension('video.mp4'), isFalse);
      expect(isBlockedUploadExtension('notes.txt'), isFalse);
      expect(isBlockedUploadExtension('table.csv'), isFalse);
      expect(isBlockedUploadExtension('archive.zip'), isFalse);
    });

    test('scanDirectoryForUpload maps hierarchy and filters blocked/hidden items', () async {
      final tempDir = await Directory.systemTemp.createTemp('folder_scan_test_');
      addTearDown(() => tempDir.delete(recursive: true));

      // Structure:
      // tempDir/
      //   file_root.txt
      //   evil.html (blocked)
      //   sub1/
      //     nested.txt
      //     deep/
      //       deep.png
      //       bad.js (blocked)
      //   .hidden_dir/
      //     ignored.txt
      //   .dot_file.txt (hidden)

      await File('${tempDir.path}/file_root.txt').writeAsString('root');
      await File('${tempDir.path}/evil.html').writeAsString('<html>');
      await Directory('${tempDir.path}/sub1/deep').create(recursive: true);
      await File('${tempDir.path}/sub1/nested.txt').writeAsString('nested');
      await File('${tempDir.path}/sub1/deep/deep.png').writeAsString('png');
      await File('${tempDir.path}/sub1/deep/bad.js').writeAsString('alert(1)');
      await Directory('${tempDir.path}/.hidden_dir').create();
      await File('${tempDir.path}/.hidden_dir/ignored.txt').writeAsString('secret');
      await File('${tempDir.path}/.dot_file.txt').writeAsString('hidden');

      final baseName = tempDir.path.split(RegExp(r'[\\/]')).last;
      final result = await scanDirectoryForUpload(tempDir.path, 'documents');

      expect(result.skippedBlockedCount, 2); // evil.html, bad.js
      expect(result.skippedHiddenCount, 2); // .hidden_dir/ignored.txt, .dot_file.txt
      expect(result.items.length, 3); // file_root.txt, nested.txt, deep.png

      final rootItem = result.items.firstWhere((i) => i.fileName == 'file_root.txt');
      expect(rootItem.destPath, 'documents/$baseName');

      final nestedItem = result.items.firstWhere((i) => i.fileName == 'nested.txt');
      expect(nestedItem.destPath, 'documents/$baseName/sub1');

      final deepItem = result.items.firstWhere((i) => i.fileName == 'deep.png');
      expect(deepItem.destPath, 'documents/$baseName/sub1/deep');
    });

    test('UploadService.startUploadPayloads sets distinct destPaths for folder items', () async {
      final service = UploadService();
      final temp = await File('${Directory.systemTemp.path}/test_item.txt').writeAsString('x');
      addTearDown(() async {
        if (await temp.exists()) {
          await temp.delete();
        }
      });

      service.startUploadPayloads([
        (
          fileName: 'f1.txt',
          localPath: temp.path,
          fileSize: 1,
          destPath: 'target/folder1',
        ),
        (
          fileName: 'f2.txt',
          localPath: temp.path,
          fileSize: 1,
          destPath: 'target/folder2/sub',
        ),
      ], 'fallback');

      final tasks = service.tasks;
      final t1 = tasks.firstWhere((t) => t.fileName == 'f1.txt');
      final t2 = tasks.firstWhere((t) => t.fileName == 'f2.txt');

      expect(t1.destPath, 'target/folder1');
      expect(t2.destPath, 'target/folder2/sub');

      // Cancel tasks so queue doesn't keep running in test
      await service.cancelUpload(t1.id);
      await service.cancelUpload(t2.id);
    });
  });
}
