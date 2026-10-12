import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/models/upload_task.dart';
import 'package:z_files/models/download_task.dart';
import 'package:z_files/services/api_service.dart';
import 'package:z_files/services/storage_service.dart';
import 'package:z_files/services/upload_service.dart';
import 'package:z_files/services/text_preview_service.dart';
import 'package:z_files/utils/server_address.dart';

class RealHttp extends HttpOverrides {}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test(
    'connection probe requests only one item; 503 keeps session, 401 clears it',
    () async {
      await HttpOverrides.runWithHttpOverrides(() async {
        SharedPreferences.setMockInitialValues({});
        await StorageService().init();
        final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
        addTearDown(() => server.close(force: true));
        var code = 200;
        var end = '';
        server.listen((req) async {
          await req.drain<void>();
          req.response.headers.contentType = ContentType.json;
          if (req.uri.path == '/api/auth/login') {
            req.response.write(
              jsonEncode({
                'sessionToken': 'session',
                'readTicket': 'ticket',
                'ticketExpiresAt':
                    DateTime.now().millisecondsSinceEpoch + 3600000,
              }),
            );
          } else {
            end = req.uri.queryParameters['end'] ?? '';
            req.response.statusCode = code;
            req.response.write(
              jsonEncode({'list': [], 'nextStart': null, 'msg': 'unavailable'}),
            );
          }
          await req.response.close();
        });
        final api = ApiService()
          ..setServerUrl('http://127.0.0.1:${server.port}');
        await api.login('access');
        await api.verifyConnection();
        expect(end, '1');
        code = 503;
        await expectLater(api.getFileList(''), throwsException);
        expect(api.isLoggedIn, true);
        code = 401;
        await expectLater(
          api.getFileList(''),
          throwsA(
            isA<Exception>().having(
              (e) => e.toString(),
              'message',
              contains('会话已失效'),
            ),
          ),
        );
        expect(api.isLoggedIn, false);
        await expectLater(
          api.getFileList(''),
          throwsA(
            isA<Exception>().having(
              (e) => e.toString(),
              'message',
              contains('请连接并登录'),
            ),
          ),
        );
      }, RealHttp());
    },
  );
  test('addresses are normalized; unsafe URLs rejected', () {
    expect(
      normalizeServerAddress(' nas.example.com:3000/ '),
      'http://nas.example.com:3000',
    );
    for (final input in [
      '',
      'file:///tmp/a',
      'https://u:p@nas/',
      'https://nas/?ticket=a',
      'https://nas/#a',
    ]) {
      expect(() => normalizeServerAddress(input), throwsFormatException);
    }
  });

  test('display reset preserves server and transfer records', () async {
    SharedPreferences.setMockInitialValues({
      'serverBaseUrl': 'https://nas.example.com',
      'upload_tasks': '[1]',
      'download_tasks': '[2]',
      'appearance': 'dark',
      'columns': 6,
    });
    await StorageService().init();
    await StorageService().clear();
    final prefs = await SharedPreferences.getInstance();
    expect(StorageService().serverBaseUrl, 'https://nas.example.com');
    expect(StorageService().columns, 3);
    expect(StorageService().appearance, 'system');
    expect(prefs.getString('upload_tasks'), '[1]');
    expect(prefs.getString('download_tasks'), '[2]');
  });

  test(
    'task formats preserve server and persistent URI, legacy server remains unknown',
    () {
      final upload = AppUploadTask(
        id: '1',
        fileName: 'a',
        destPath: '',
        localPath: '/tmp/a',
        serverUrl: 'https://nas.example.com',
      );
      expect(
        AppUploadTask.fromJson(upload.toJson()).serverUrl,
        'https://nas.example.com',
      );
      expect(AppUploadTask.fromJson({'id': 'old'}).serverUrl, '');
      final download = AppDownloadTask(
        id: '2',
        url: 'https://nas/a',
        fileName: 'a',
        filePath: '',
        savedUri: 'content://media/1',
        errorMsg: '保存失败',
      );
      final restored = AppDownloadTask.fromJson(download.toJson());
      expect(restored.savedUri, 'content://media/1');
      expect(restored.errorMsg, '保存失败');
    },
  );

  test(
    'upload FIFO and server switch never sends remaining tasks to new server',
    () async {
      await HttpOverrides.runWithHttpOverrides(() async {
        SharedPreferences.setMockInitialValues({});
        await StorageService().init();
        final a = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
        final b = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
        final dir = await Directory.systemTemp.createTemp(
          'mobile-upload-test-',
        );
        addTearDown(() async {
          await a.close(force: true);
          await b.close(force: true);
          await dir.delete(recursive: true);
        });
        final api = ApiService()..setServerUrl('http://127.0.0.1:${a.port}');
        final started = Completer<void>();
        final release = Completer<void>();
        var requestsA = 0;
        var requestsB = 0;
        a.listen((req) async {
          requestsA++;
          await req.drain<void>();
          started.complete();
          await release.future;
          req.response.headers.contentType = ContentType.json;
          req.response.write('{}');
          await req.response.close();
        });
        b.listen((req) async {
          requestsB++;
          await req.drain<void>();
          await req.response.close();
        });
        final local = await File('${dir.path}/a.txt').writeAsString('fixture');
        final service = UploadService();
        await service.init();
        service.startUploads([
          (fileName: 'first.txt', localPath: local.path, fileSize: 7),
          (fileName: 'second.txt', localPath: local.path, fileSize: 7),
        ], '');
        await started.future.timeout(const Duration(seconds: 5));
        expect(service.tasks.first.fileName, 'first.txt');
        api.setServerUrl('http://127.0.0.1:${b.port}');
        final completed = Completer<void>();
        void listener() {
          if (!service.hasActiveTasks && !completed.isCompleted) {
            completed.complete();
          }
        }

        service.addListener(listener);
        addTearDown(() => service.removeListener(listener));
        release.complete();
        await completed.future.timeout(const Duration(seconds: 5));
        expect(requestsA, 1);
        expect(requestsB, 0);
        expect(service.tasks[1].status, AppUploadStatus.failed);
        expect(service.tasks[1].errorMsg, contains('原服务器'));
        service.clearCompleted();
      }, RealHttp());
    },
  );

  test('local text previews are bounded and support UTF-8 files', () async {
    final dir = await Directory.systemTemp.createTemp('text-preview-');
    addTearDown(() => dir.delete(recursive: true));
    final text = await File('${dir.path}/a.txt').writeAsString('中文预览');
    expect(await loadTextPreview(text.path, CancelToken()), '中文预览');
    final large = await File(
      '${dir.path}/large.txt',
    ).writeAsBytes(List.filled(maxTextPreviewBytes + 1, 65));
    await expectLater(
      loadTextPreview(large.path, CancelToken()),
      throwsStateError,
    );
    final cancel = CancelToken()..cancel();
    await expectLater(
      loadTextPreview(text.path, cancel),
      throwsA(isA<DioException>()),
    );
  });

  test('stale login cannot authenticate another server', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
      addTearDown(() => server.close(force: true));
      final started = Completer<void>();
      final release = Completer<void>();
      server.listen((req) async {
        await req.drain<void>();
        started.complete();
        await release.future;
        req.response.headers.contentType = ContentType.json;
        req.response.write(
          jsonEncode({
            'sessionToken': 'old',
            'readTicket': 'old',
            'ticketExpiresAt': 0,
          }),
        );
        await req.response.close();
      });
      final api = ApiService()..setServerUrl('http://127.0.0.1:${server.port}');
      final pending = api.login('secret');
      final check = expectLater(pending, throwsStateError);
      await started.future;
      api.setServerUrl('https://new.example.com');
      release.complete();
      await check;
      expect(api.isLoggedIn, false);
    }, RealHttp());
  });
}
