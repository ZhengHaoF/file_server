import 'dart:convert';
import 'dart:async';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/models/file_info.dart';
import 'package:z_files/services/api_service.dart';
import 'package:z_files/services/network_log_service.dart';
import 'package:z_files/services/storage_service.dart';

// Inherit the real client factory instead of the widget binding's fake client.
class _LocalHttpOverrides extends HttpOverrides {}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test(
    'cancelled directory request retains Dio cancellation semantics',
    () async {
      await HttpOverrides.runWithHttpOverrides(() async {
        SharedPreferences.setMockInitialValues({});
        await StorageService().init();
        final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
        addTearDown(() => server.close(force: true));
        final started = Completer<void>();
        final finish = Completer<void>();
        server.listen((request) async {
          expect(request.uri.path, '/api/v2/files');
          expect(request.uri.queryParameters['path'], '');
          started.complete();
          await finish.future;
          request.response.headers.contentType = ContentType.json;
          request.response.write(jsonEncode({'list': [], 'nextStart': null}));
          await request.response.close();
        });
        final api = ApiService()
          ..setServerUrl('http://127.0.0.1:${server.port}');
        final cancel = CancelToken();
        final pending = api.getFileList('', cancelToken: cancel);
        final expectation = expectLater(
          pending,
          throwsA(
            isA<DioException>().having(
              (e) => e.type,
              'type',
              DioExceptionType.cancel,
            ),
          ),
        );
        await started.future.timeout(const Duration(seconds: 5));
        cancel.cancel('directory changed');
        await expectation;
        finish.complete();
      }, _LocalHttpOverrides());
    },
  );

  test('v2 特殊目录名只编码一次，预览保留原路径与只读票据', () {
    final file = FileInfo.fromJson(
      {
        'name': 'cost\$2026.png',
        'size': 100,
        'isFile': true,
        'isDirectory': false,
      },
      '图片 #100%/a__b',
      'https://files.example.com',
      readTicket: 'read-ticket',
    );
    final uri = Uri.parse(file.url!);
    expect(uri.path, '/api/v2/content');
    expect(uri.queryParameters['path'], '图片 #100%/a__b/cost\$2026.png');
    expect(uri.path.contains('%25E5'), false);
    expect(uri.queryParameters['ticket'], 'read-ticket');
    final preview = Uri.parse(ApiService.imagePreviewUrl(file.url!, 9000));
    expect(preview.path, '/api/v2/preview');
    expect(preview.queryParameters['path'], uri.queryParameters['path']);
    expect(preview.queryParameters['kind'], 'image');
    expect(preview.queryParameters['width'], '4000');
    expect(preview.queryParameters['height'], '4000');
    expect(preview.queryParameters['ticket'], 'read-ticket');
  });

  test('登录会话、分页、来源隔离和日志脱敏', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
      addTearDown(() => server.close(force: true));
      final receivedStarts = <String>[];
      server.listen((request) async {
        request.response.headers.contentType = ContentType.json;
        if (request.uri.path == '/api/auth/login') {
          final body = jsonDecode(await utf8.decoder.bind(request).join());
          expect(body['token'], 'never-persist-this-secret');
          request.response.write(
            jsonEncode({
              'sessionToken': 'temporary-session',
              'readTicket': 'temporary-read-ticket',
              'ticketExpiresAt':
                  DateTime.now().millisecondsSinceEpoch + 3600000,
            }),
          );
        } else {
          expect(request.uri.path, '/api/v2/files');
          expect(request.uri.queryParameters['path'], 'a__b');
          expect(
            request.headers.value('Authorization'),
            'Bearer temporary-session',
          );
          receivedStarts.add(request.uri.queryParameters['sta']!);
          final firstPage = request.uri.queryParameters['sta'] == '0';
          request.response.write(
            jsonEncode({
              'list': [
                {
                  'name': firstPage ? '图片 #100%.png' : 'cost\$2026.txt',
                  'size': 1,
                  'isFile': true,
                  'isDirectory': false,
                },
              ],
              'nextStart': firstPage ? 500 : null,
            }),
          );
        }
        await request.response.close();
      });
      final baseUrl = 'http://127.0.0.1:${server.port}';
      final api = ApiService();
      api.setServerUrl(baseUrl);
      await api.login('never-persist-this-secret');
      final files = await api.getFileList('a__b');
      expect(files.length, 2);
      expect(receivedStarts, ['0', '500']);
      expect(
        Uri.parse(files.first.url!).queryParameters['ticket'],
        'temporary-read-ticket',
      );
      final content = Uri.parse(api.getFileUrl(r'$$', 'foo.jpg!320x240'));
      expect(content.path, '/api/v2/content');
      expect(content.queryParameters['path'], r'$$/foo.jpg!320x240');
      expect(content.queryParameters['ticket'], 'temporary-read-ticket');
      final video = Uri.parse(api.getVideoPreviewUrl(r'$/视频 #100%.mp4'));
      expect(video.path, '/api/v2/preview');
      expect(video.queryParameters['path'], r'$/视频 #100%.mp4');
      expect(video.queryParameters['kind'], 'video');
      expect(video.queryParameters['ticket'], 'temporary-read-ticket');
      expect(
        api.authHeadersFor('$baseUrl/upload')['Authorization'],
        'Bearer temporary-session',
      );
      expect(api.adminUri.toString(), '$baseUrl/admin/');
      expect(api.adminUri.query, isEmpty);
      expect(api.adminUri.userInfo, isEmpty);
      expect(api.authHeadersFor('https://another.example.com/upload'), isEmpty);
      final logs = NetworkLogService().logs;
      expect(
        logs.first.formattedRequestHeaders.contains('temporary-session'),
        false,
      );
      final loginLog = logs.firstWhere(
        (entry) => Uri.parse(entry.url).path == '/api/auth/login',
      );
      expect(
        loginLog.formattedRequestBody.contains('never-persist-this-secret'),
        false,
      );
      expect(
        loginLog.formattedResponseBody.contains('temporary-session'),
        false,
      );
      api.setServerUrl('http://127.0.0.1:12345');
      expect(api.isLoggedIn, false);
    }, _LocalHttpOverrides());
  });

  test(
    'v2 root and literal dollar directories are distinct HTTP query values',
    () async {
      await HttpOverrides.runWithHttpOverrides(() async {
        SharedPreferences.setMockInitialValues({});
        await StorageService().init();
        final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
        addTearDown(() => server.close(force: true));
        final received = <String>[];
        server.listen((request) async {
          expect(request.uri.path, '/api/v2/files');
          received.add(request.uri.queryParameters['path']!);
          request.response.headers.contentType = ContentType.json;
          request.response.write(
            jsonEncode({
              'list': [
                {
                  'name': 'foo.jpg!320x240',
                  'size': 1,
                  'isFile': true,
                  'isDirectory': false,
                },
              ],
              'nextStart': null,
            }),
          );
          await request.response.close();
        });
        final api = ApiService()
          ..setServerUrl('http://127.0.0.1:${server.port}');
        for (final path in ['', r'$', r'$$', r'$/$$', '图片 #100%/字面%2F']) {
          final files = await api.getFileList(path);
          final content = Uri.parse(files.single.url!);
          expect(content.path, '/api/v2/content');
          expect(
            content.queryParameters['path'],
            path.isEmpty ? 'foo.jpg!320x240' : '$path/foo.jpg!320x240',
          );
        }
        expect(received, ['', r'$', r'$$', r'$/$$', '图片 #100%/字面%2F']);
      }, _LocalHttpOverrides());
    },
  );

  test('ApiService 在登录、退出与切换服务器时通知监听器', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
      addTearDown(() => server.close(force: true));

      server.listen((request) async {
        if (request.uri.path == '/api/auth/login') {
          request.response.headers.contentType = ContentType.json;
          request.response.write(
            jsonEncode({
              'sessionToken': 'sess-123',
              'readTicket': 'ticket-123',
              'ticketExpiresAt':
                  DateTime.now().millisecondsSinceEpoch + 3600000,
            }),
          );
          await request.response.close();
        } else if (request.uri.path == '/api/auth/logout') {
          request.response.statusCode = 200;
          await request.response.close();
        }
      });

      final api = ApiService()
        ..setServerUrl('http://127.0.0.1:${server.port}');

      var notifications = 0;
      void listener() => notifications++;
      api.addListener(listener);
      addTearDown(() => api.removeListener(listener));

      expect(notifications, 0);

      // 1. 登录成功
      await api.login('token-abc');
      expect(api.isLoggedIn, true);
      expect(notifications, 1);

      // 2. 退出登录
      await api.logout();
      expect(api.isLoggedIn, false);
      expect(notifications, 2);

      // 3. 切换服务器地址
      api.setServerUrl('http://127.0.0.1:54321');
      expect(notifications, 3);
    }, _LocalHttpOverrides());
  });
}

