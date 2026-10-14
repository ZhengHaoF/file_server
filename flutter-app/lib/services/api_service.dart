import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import '../models/file_info.dart';
import 'network_log_service.dart';
import 'storage_service.dart';
import 'token_store.dart';
import '../utils/server_address.dart';
import '../utils/file_urls.dart';

class ApiService extends ChangeNotifier {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;

  late final Dio _dio;
  late String _serverBaseUrl;
  String? _sessionToken;
  String? _rawToken;
  String? _readTicket;
  int _ticketExpiresAt = 0;
  final TokenStore _tokenStore = TokenStore();
  bool _tokenRemembered = false;
  Future<bool>? _pendingRestore;
  bool get isLoggedIn => _rawToken != null || _sessionToken != null;

  /// The long-lived token survives restarts in the platform secure store.
  bool get tokenRemembered => _tokenRemembered;

  ApiService._internal() {
    _serverBaseUrl = StorageService().serverBaseUrl;
    _dio = Dio(
      BaseOptions(
        followRedirects: false,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
      ),
    );
    _dio.interceptors.add(NetworkLogInterceptor(NetworkLogService()));
  }

  void setServerUrl(String url) {
    url = normalizeServerAddress(url);
    final changed = url != _serverBaseUrl;
    if (changed) {
      _clearSession();
    }
    _serverBaseUrl = url;
    StorageService().serverBaseUrl = url;
    if (changed) {
      notifyListeners();
    }
  }

  String get serverBaseUrl => _serverBaseUrl;

  /// Server origin used to scope the remembered token; a token is only ever
  /// replayed to the server it was entered for.
  String get _origin {
    try {
      return Uri.parse(_serverBaseUrl).origin;
    } catch (_) {
      return _serverBaseUrl;
    }
  }

  bool _writeEnabled = false;
  bool _uploadEnabled = false;

  bool get writeEnabled => _writeEnabled;
  bool get uploadEnabled => _uploadEnabled;

  void _clearSession() {
    _sessionToken = null;
    _rawToken = null;
    _readTicket = null;
    _ticketExpiresAt = 0;
    _tokenRemembered = false;
    _writeEnabled = false;
    _uploadEnabled = false;
    _dio.options.headers.remove('Authorization');
  }

  /// Separate cookie-authenticated management UI. Never include a session or ticket.
  Uri get adminUri => Uri.parse('$_serverBaseUrl/admin/');

  Future<void> verifyConnection() async {
    final server = _serverBaseUrl;
    final response = await _dio.get(
      '$server/api/v2/files',
      queryParameters: {'path': '', 'sta': 0, 'end': 1},
    );
    if (server != _serverBaseUrl) throw StateError('服务器已切换');
    _checkResponse(response);
    if (response.data is! Map || response.data['list'] is! List) {
      throw StateError('该地址不是兼容的文件服务器');
    }
  }

  /// Exchanges the long-lived access token for a session. Returns whether the
  /// token was remembered; a requested remember that the platform refused is
  /// reported so the UI can say the session is still memory-only.
  Future<bool> login(String token, {bool remember = false}) {
    return _login(token, remember: remember, persistDecision: true);
  }

  Future<bool> _login(
    String token, {
    required bool remember,
    required bool persistDecision,
  }) async {
    final server = _serverBaseUrl;
    final response = await _dio.post(
      '$_serverBaseUrl/api/auth/login',
      data: {'token': token},
    );
    _checkResponse(response);
    if (server != _serverBaseUrl) {
      throw StateError('登录期间服务器已切换，请重新登录');
    }
    if (persistDecision) {
      if (remember) {
        _rawToken = token;
        _tokenRemembered = await _tokenStore.save(_origin, token);
      } else {
        // An explicit opt-out must not leave an older token to be resurrected.
        await _tokenStore.clear(_origin);
        _tokenRemembered = false;
        _rawToken = null;
      }
    } else {
      _rawToken = token;
      _tokenRemembered = remember;
    }
    _applySession(response.data);
    notifyListeners();
    return _tokenRemembered;
  }

  void _applySession(dynamic data) {
    _sessionToken = data['sessionToken'] as String?;
    _readTicket = data['readTicket'] as String?;
    if (data['ticketExpiresAt'] is num) {
      _ticketExpiresAt = (data['ticketExpiresAt'] as num).toInt();
    }
    if (data is Map<String, dynamic>) {
      _writeEnabled = data['writeEnabled'] != false;
      _uploadEnabled = data['uploadEnabled'] != false;
    }
    final activeToken = _sessionToken ?? _rawToken;
    if (activeToken != null) {
      _dio.options.headers['Authorization'] = 'Bearer $activeToken';
    } else {
      _dio.options.headers.remove('Authorization');
    }
  }

  /// Silent auto-login from the remembered token. Never throws; a rejected
  /// token is dropped while unreachable/rate-limited servers keep theirs.
  Future<bool> restoreSession() {
    final pending = _pendingRestore ??= _restoreSession().whenComplete(() {
      _pendingRestore = null;
    });
    return pending;
  }

  /// Resolves once a startup restore has settled. Cheap when nothing is being
  /// restored; the first directory load awaits it so a remembered token that
  /// is still exchanging for a session is not mistaken for "not logged in".
  Future<bool> ensureSessionRestored() {
    return _pendingRestore ?? Future.value(false);
  }

  Future<bool> _restoreSession() async {
    final origin = _origin;
    final storedToken = await _tokenStore.read(origin);
    final token = storedToken ?? _rawToken;
    if (token == null) return false;
    try {
      await _login(
        token,
        remember: storedToken != null,
        persistDecision: false,
      );
      return true;
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        await _tokenStore.clear(origin);
        _clearSession();
        notifyListeners();
      }
      return false;
    } catch (_) {
      return false;
    }
  }

  /// Revokes the server session when possible and always drops local state.
  Future<void> logout() async {
    final server = _serverBaseUrl;
    if (_sessionToken != null || _rawToken != null) {
      try {
        await _dio.post('$server/api/auth/logout');
      } catch (_) {
        // Server-side revocation is best effort; local state goes regardless.
      }
    }
    _clearSession();
    await _tokenStore.clear(_origin);
    notifyListeners();
  }

  Map<String, String> authHeadersFor(String url) {
    final activeToken = _sessionToken ?? _rawToken;
    if (activeToken == null ||
        Uri.parse(url).origin != Uri.parse(_serverBaseUrl).origin) {
      return {};
    }
    return {'Authorization': 'Bearer $activeToken'};
  }

  Future<void> _ensureTicket({CancelToken? cancelToken}) async {
    if ((_sessionToken == null && _rawToken == null) ||
        _ticketExpiresAt > DateTime.now().millisecondsSinceEpoch + 60000) {
      return;
    }
    final server = _serverBaseUrl;
    final response = await _dio.post(
      '$_serverBaseUrl/api/auth/ticket',
      cancelToken: cancelToken,
    );
    if (server != _serverBaseUrl) throw StateError('服务器已切换');
    _readTicket = response.data['readTicket'] as String?;
    if (response.data['ticketExpiresAt'] is num) {
      _ticketExpiresAt = (response.data['ticketExpiresAt'] as num).toInt();
    }
  }

  static String imagePreviewUrl(String url, int size) {
    return imagePreviewUri(Uri.parse(url), size).toString();
  }

  String getFileUrl(String filePath, String fileName) {
    final path = filePath.isEmpty ? fileName : '$filePath/$fileName';
    return contentUri(_serverBaseUrl, path, readTicket: _readTicket).toString();
  }

  String getVideoPreviewUrl(String filePath) {
    return videoPreviewUri(
      _serverBaseUrl,
      filePath,
      readTicket: _readTicket,
    ).toString();
  }

  /// 统一检查响应状态码，非 2xx 时从 response body 提取 msg 抛出异常
  void _checkResponse(Response response) {
    if (response.statusCode != null &&
        response.statusCode! >= 200 &&
        response.statusCode! < 300) {
      return;
    }
    String msg = '请求失败 (${response.statusCode})';
    final data = response.data;
    if (data is Map<String, dynamic> && data.containsKey('msg')) {
      msg = data['msg'].toString();
    }
    throw Exception(msg);
  }

  Future<List<FileInfo>> getFileList(
    String currentPath, {
    CancelToken? cancelToken,
  }) {
    return _getFileList(currentPath, cancelToken, allowRelogin: true);
  }

  Future<List<FileInfo>> _getFileList(
    String currentPath,
    CancelToken? cancelToken, {
    required bool allowRelogin,
  }) async {
    final server = _serverBaseUrl;
    try {
      await _ensureTicket(cancelToken: cancelToken);
      if (server != _serverBaseUrl) throw StateError('服务器已切换');
      final list = <dynamic>[];
      var start = 0;
      while (true) {
        final response = await _dio.get(
          '$server/api/v2/files',
          queryParameters: {
            'path': currentPath,
            'sta': start,
            'end': start + 500,
          },
          cancelToken: cancelToken,
        );
        if (server != _serverBaseUrl) throw StateError('服务器已切换');
        _checkResponse(response);
        list.addAll(response.data['list'] as List<dynamic>);
        final next = response.data['nextStart'];
        if (next == null) break;
        if (next is! int || next <= start) throw Exception('分页响应无效');
        start = next;
      }
      return list.map((item) {
        return FileInfo.fromJson(
          item as Map<String, dynamic>,
          currentPath,
          server,
          readTicket: _readTicket,
        );
      }).toList();
    } on DioException catch (e) {
      if (CancelToken.isCancel(e)) rethrow;
      if (e.response?.statusCode == 401) {
        final sameServer = server == _serverBaseUrl;
        final hadSession = sameServer && _sessionToken != null;
        if (sameServer) _clearSession();
        // An 8h session can expire while the remembered long-lived token is
        // still valid: silently re-login once and replay the request.
        if (hadSession && allowRelogin && await restoreSession()) {
          return _getFileList(currentPath, cancelToken, allowRelogin: false);
        }
        if (sameServer && hadSession) notifyListeners();
        throw Exception(hadSession ? '会话已失效，请连接并登录文件服务' : '请连接并登录文件服务');
      }
      if (e.response?.statusCode == 404) {
        rethrow;
      }
      String msg = e.response == null
          ? '无法连接文件服务，请检查地址、局域网权限和网络'
          : '文件服务暂不可用，请稍后重试 (${e.response?.statusCode})';
      final data = e.response?.data;
      if (data is Map<String, dynamic> && data.containsKey('msg')) {
        msg = data['msg'].toString();
      }
      throw Exception(msg);
    }
  }

  Future<bool> deleteFile(String filePath) async {
    final response = await _dio.post(
      '$_serverBaseUrl/delFile',
      data: {'filePath': filePath},
    );

    _checkResponse(response);
    return true;
  }

  Future<bool> renameFile(String oldPath, String newPath) async {
    try {
      final response = await _dio.post(
        '$_serverBaseUrl/renameFile',
        data: {'oldPath': oldPath, 'newPath': newPath},
      );

      _checkResponse(response);
      return true;
    } on DioException catch (e) {
      String msg = '重命名失败 (${e.response?.statusCode})';
      final data = e.response?.data;
      if (data is Map<String, dynamic> && data.containsKey('msg')) {
        msg = data['msg'].toString();
      }
      throw Exception(msg);
    }
  }
}

class NetworkLogInterceptor extends Interceptor {
  final NetworkLogService _logService;

  NetworkLogInterceptor(this._logService);

  static const _startKey = '_networkLogStart';

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    options.extra[_startKey] = DateTime.now();
    handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    _record(
      response.requestOptions,
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
      responseHeaders: response.headers.map,
      responseBody: response.data,
    );
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    _record(
      err.requestOptions,
      statusCode: err.response?.statusCode,
      statusMessage: err.response?.statusMessage ?? err.message,
      responseHeaders: err.response?.headers.map,
      responseBody: err.response?.data,
      error: err.message ?? err.error?.toString(),
    );
    handler.next(err);
  }

  void _record(
    RequestOptions options, {
    int? statusCode,
    String? statusMessage,
    Map<String, List<dynamic>>? responseHeaders,
    dynamic responseBody,
    String? error,
  }) {
    final start = options.extra[_startKey] as DateTime?;
    final duration = start == null
        ? 0
        : DateTime.now().difference(start).inMilliseconds;

    _logService.addLog(
      NetworkLogEntry(
        timestamp: start ?? DateTime.now(),
        method: options.method,
        url: options.uri
            .replace(
              queryParameters: {
                for (final entry in options.uri.queryParameters.entries)
                  entry.key: entry.key == 'ticket' ? '******' : entry.value,
              },
            )
            .toString(),
        requestHeaders: _redact(options.headers),
        requestBody: _redact(options.data),
        statusCode: statusCode,
        statusMessage: statusMessage,
        responseHeaders:
            _redact(responseHeaders?.map((k, v) => MapEntry(k, v.join(','))))
                as Map<String, dynamic>?,
        responseBody: _redact(responseBody),
        error: error,
        durationMs: duration,
        isRequestError: error != null,
      ),
    );
  }

  static dynamic _redact(dynamic value) {
    if (value is Map) {
      return <String, dynamic>{
        for (final entry in value.entries)
          entry.key.toString():
              RegExp(
                r'authorization|cookie|token|ticket|pwd|password',
                caseSensitive: false,
              ).hasMatch(entry.key.toString())
              ? '******'
              : _redact(entry.value),
      };
    }
    if (value is List) return value.map(_redact).toList();
    return value;
  }
}
