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

  test('特殊目录名只编码一次，缩略图参数在只读票据之前', () {
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
    expect(
      Uri.decodeComponent(uri.path),
      '/getFile/图片 #100%/a__b/cost\$2026.png',
    );
    expect(uri.path.contains('%25E5'), false);
    expect(uri.queryParameters['ticket'], 'read-ticket');
    final preview = Uri.parse(ApiService.imagePreviewUrl(file.url!, 9000));
    expect(preview.path.endsWith('.png!4000x4000'), true);
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
      expect(
        api.authHeadersFor('$baseUrl/upload')['Authorization'],
        'Bearer temporary-session',
      );
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
}
