import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/services/api_service.dart';
import 'package:z_files/services/network_log_service.dart';
import 'package:z_files/services/storage_service.dart';
import 'package:z_files/services/token_store.dart';

// Inherit the real client factory instead of the widget binding's fake client.
class _LocalHttpOverrides extends HttpOverrides {}

class _FakeBackend implements SecureStorageBackend {
  final Map<String, String> values = <String, String>{};
  bool failReads = false;
  bool failWrites = false;
  int reads = 0;
  int writes = 0;
  int deletes = 0;

  @override
  Future<String?> read({required String key}) async {
    reads++;
    if (failReads) throw Exception('no secret service');
    return values[key];
  }

  @override
  Future<void> write({required String key, required String value}) async {
    writes++;
    if (failWrites) throw Exception('keystore locked');
    values[key] = value;
  }

  @override
  Future<void> delete({required String key}) async {
    deletes++;
    values.remove(key);
  }
}

class _FakeAuthServer {
  _FakeAuthServer(this.server);

  final HttpServer server;
  int logins = 0;
  int logoutRequests = 0;
  bool rejectLogin = false;
  bool revokeSession = false;
  String? lastAuthorization;

  Uri get base => Uri.parse('http://127.0.0.1:${server.port}');

  String get key => TokenStore.keyFor(base.origin);

  void listen() {
    server.listen((request) async {
      request.response.headers.contentType = ContentType.json;
      switch (request.uri.path) {
        case '/api/auth/login':
          logins++;
          await request.drain<void>();
          if (rejectLogin) {
            request.response.statusCode = HttpStatus.unauthorized;
            request.response.write(jsonEncode({'msg': '令牌错误'}));
            break;
          }
          revokeSession = false;
          request.response.write(
            jsonEncode({
              'sessionToken': 'session-$logins',
              'readTicket': 'ticket-$logins',
              'ticketExpiresAt':
                  DateTime.now().millisecondsSinceEpoch + 3600000,
            }),
          );
        case '/api/auth/logout':
          logoutRequests++;
          revokeSession = true;
          await request.drain<void>();
          request.response.write(jsonEncode({'msg': '已退出'}));
        case '/api/v2/files':
          lastAuthorization = request.headers.value('Authorization');
          await request.drain<void>();
          if (revokeSession) {
            request.response.statusCode = HttpStatus.unauthorized;
            request.response.write(jsonEncode({'msg': '请重新登录'}));
            break;
          }
          request.response.write(jsonEncode({'list': [], 'nextStart': null}));
        default:
          await request.drain<void>();
          request.response.statusCode = HttpStatus.notFound;
      }
      await request.response.close();
    });
  }
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    TokenStore().debugReset();
  });

  test('令牌按服务器 origin 隔离存取', () async {
    final backend = _FakeBackend();
    TokenStore().debugOverride(backend: backend);
    addTearDown(() => TokenStore().debugReset());
    const originA = 'http://nas-a.example.com:3000';
    const originB = 'http://nas-b.example.com:3000';

    expect(await TokenStore().save(originA, 'token-a'), true);
    expect(await TokenStore().save(originB, 'token-b'), true);
    expect(await TokenStore().read(originA), 'token-a');
    expect(await TokenStore().read(originB), 'token-b');
    expect(await TokenStore().read('http://other.example.com'), isNull);
    expect(
      TokenStore.keyFor(originA),
      'zfiles.accessToken.http://nas-a.example.com:3000',
    );

    await TokenStore().clear(originA);
    expect(await TokenStore().read(originA), isNull);
    expect(await TokenStore().read(originB), 'token-b');
  });

  test('安全存储不可用时降级为仅内存会话', () async {
    final backend = _FakeBackend();
    TokenStore().debugOverride(backend: backend);
    addTearDown(() => TokenStore().debugReset());

    // A read failure is not latched: a keystore locked at boot must not
    // disable remembering for the rest of the session.
    backend.failReads = true;
    expect(await TokenStore().read('http://a.example.com'), isNull);
    expect(backend.reads, 1);
    backend.failReads = false;
    expect(await TokenStore().save('http://a.example.com', 'token'), true);
    expect(await TokenStore().read('http://a.example.com'), 'token');

    // A failed write is latched instead of retried forever.
    backend.failWrites = true;
    expect(await TokenStore().save('http://a.example.com', 'token'), false);
    backend.failWrites = false;
    expect(await TokenStore().read('http://a.example.com'), isNull);
    expect(backend.reads, 2);

    await TokenStore().clear('http://a.example.com');
    expect(backend.deletes, 1);
  });

  test('被禁用的存储完全不访问后端', () async {
    final backend = _FakeBackend();
    TokenStore().debugOverride(backend: backend, disabled: true);
    addTearDown(() => TokenStore().debugReset());

    expect(await TokenStore().save('http://a.example.com', 'token'), false);
    expect(await TokenStore().read('http://a.example.com'), isNull);
    await TokenStore().clear('http://a.example.com');
    expect(backend.writes, 0);
    expect(backend.reads, 0);
    expect(backend.deletes, 0);
  });

  test('记住的令牌在重启后恢复，并只发回原服务器', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final backend = _FakeBackend();
      TokenStore().debugOverride(backend: backend);
      addTearDown(() => TokenStore().debugReset());
      final fake = _FakeAuthServer(
        await HttpServer.bind(InternetAddress.loopbackIPv4, 0),
      )..listen();
      addTearDown(() => fake.server.close(force: true));

      final api = ApiService()..setServerUrl(fake.base.toString());
      expect(await api.login('long-lived-token', remember: true), true);
      expect(api.tokenRemembered, true);
      expect(backend.values[fake.key], 'long-lived-token');

      // A cold start drops the in-memory session; switching away and back
      // reproduces that without leaving the process.
      api.setServerUrl('http://other.example.com');
      expect(api.isLoggedIn, false);
      api.setServerUrl(fake.base.toString());
      expect(api.isLoggedIn, false);

      expect(await api.restoreSession(), true);
      expect(api.isLoggedIn, true);
      expect(api.tokenRemembered, true);
      expect(fake.logins, 2);
    }, _LocalHttpOverrides());
  });

  test('首次目录加载前会等待在途的静默登录', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final backend = _FakeBackend();
      TokenStore().debugOverride(backend: backend);
      addTearDown(() => TokenStore().debugReset());
      final fake = _FakeAuthServer(
        await HttpServer.bind(InternetAddress.loopbackIPv4, 0),
      )..listen();
      addTearDown(() => fake.server.close(force: true));

      final api = ApiService()..setServerUrl(fake.base.toString());
      await api.login('long-lived-token', remember: true);
      api.setServerUrl('http://other.example.com');
      api.setServerUrl(fake.base.toString());

      final restore = api.restoreSession();
      expect(api.isLoggedIn, false); // session still being exchanged
      await api.ensureSessionRestored();
      expect(api.isLoggedIn, true);
      await restore;
      expect(await api.ensureSessionRestored(), false);
    }, _LocalHttpOverrides());
  });

  test('不勾选记住会清除此前保存的令牌', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final backend = _FakeBackend();
      TokenStore().debugOverride(backend: backend);
      addTearDown(() => TokenStore().debugReset());
      final fake = _FakeAuthServer(
        await HttpServer.bind(InternetAddress.loopbackIPv4, 0),
      )..listen();
      addTearDown(() => fake.server.close(force: true));

      final api = ApiService()..setServerUrl(fake.base.toString());
      await api.login('long-lived-token', remember: true);
      expect(await api.login('long-lived-token'), false);
      expect(api.tokenRemembered, false);
      expect(backend.values.containsKey(fake.key), false);
      expect(await api.restoreSession(), false);
    }, _LocalHttpOverrides());
  });

  test('退出登录吊销服务端会话并清除本地令牌', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final backend = _FakeBackend();
      TokenStore().debugOverride(backend: backend);
      addTearDown(() => TokenStore().debugReset());
      final fake = _FakeAuthServer(
        await HttpServer.bind(InternetAddress.loopbackIPv4, 0),
      )..listen();
      addTearDown(() => fake.server.close(force: true));

      final api = ApiService()..setServerUrl(fake.base.toString());
      await api.login('long-lived-token', remember: true);
      await api.logout();
      expect(api.isLoggedIn, false);
      expect(api.tokenRemembered, false);
      expect(fake.logoutRequests, 1);
      expect(backend.values.containsKey(fake.key), false);
      expect(await api.restoreSession(), false);
    }, _LocalHttpOverrides());
  });

  test('会话失效时用记住的令牌静默重登并重试请求', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final backend = _FakeBackend();
      TokenStore().debugOverride(backend: backend);
      addTearDown(() => TokenStore().debugReset());
      final fake = _FakeAuthServer(
        await HttpServer.bind(InternetAddress.loopbackIPv4, 0),
      )..listen();
      addTearDown(() => fake.server.close(force: true));

      final api = ApiService()..setServerUrl(fake.base.toString());
      await api.login('long-lived-token', remember: true);
      fake.revokeSession = true; // server-side session expiry / revocation

      final files = await api.getFileList('');
      expect(files, isEmpty);
      expect(fake.logins, 2);
      expect(fake.lastAuthorization, 'Bearer session-2');
      expect(api.isLoggedIn, true);
    }, _LocalHttpOverrides());
  });

  test('被拒的令牌删除，不可达的服务器保留', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final backend = _FakeBackend();
      TokenStore().debugOverride(backend: backend);
      addTearDown(() => TokenStore().debugReset());
      final fake = _FakeAuthServer(
        await HttpServer.bind(InternetAddress.loopbackIPv4, 0),
      )..listen();
      addTearDown(() => fake.server.close(force: true));

      final api = ApiService()..setServerUrl(fake.base.toString());
      await api.login('long-lived-token', remember: true);

      fake.rejectLogin = true;
      expect(await api.restoreSession(), false);
      expect(api.isLoggedIn, false);
      expect(backend.values.containsKey(fake.key), false);

      await api.login('long-lived-token', remember: true);
      fake.rejectLogin = false;
      api.setServerUrl('http://127.0.0.1:1'); // nothing listens there
      await TokenStore().save('http://127.0.0.1:1', 'still-good');
      expect(await api.restoreSession(), false);
      expect(
        backend.values['zfiles.accessToken.http://127.0.0.1:1'],
        'still-good',
      );
    }, _LocalHttpOverrides());
  });

  test('令牌不会进入网络日志', () async {
    await HttpOverrides.runWithHttpOverrides(() async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      NetworkLogService().clear();
      final backend = _FakeBackend();
      TokenStore().debugOverride(backend: backend);
      addTearDown(() => TokenStore().debugReset());
      final fake = _FakeAuthServer(
        await HttpServer.bind(InternetAddress.loopbackIPv4, 0),
      )..listen();
      addTearDown(() => fake.server.close(force: true));

      final api = ApiService()..setServerUrl(fake.base.toString());
      await api.login('never-persist-this-secret', remember: true);
      expect(backend.values[fake.key], 'never-persist-this-secret');

      final logs = NetworkLogService().logs;
      final loginLog = logs.firstWhere(
        (entry) => Uri.parse(entry.url).path == '/api/auth/login',
      );
      expect(
        loginLog.formattedRequestBody.contains('never-persist-this-secret'),
        false,
      );
      expect(
        loginLog.formattedResponseBody.contains('session-1'),
        false,
      );
    }, _LocalHttpOverrides());
  });
}
