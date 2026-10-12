import 'package:dio/dio.dart';
import '../models/file_info.dart';
import 'network_log_service.dart';
import 'storage_service.dart';
import '../utils/server_address.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;

  late final Dio _dio;
  late String _serverBaseUrl;
  String? _sessionToken;
  String? _readTicket;
  int _ticketExpiresAt = 0;
  bool get isLoggedIn => _sessionToken != null;

  ApiService._internal() {
    _serverBaseUrl = StorageService().serverBaseUrl;
    _dio = Dio(
      BaseOptions(
        followRedirects: false,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
      ),
    );
    _dio.interceptors.add(_NetworkLogInterceptor(NetworkLogService()));
  }

  void setServerUrl(String url) {
    url = normalizeServerAddress(url);
    if (url != _serverBaseUrl) {
      _sessionToken = null;
      _readTicket = null;
      _ticketExpiresAt = 0;
      _dio.options.headers.remove('Authorization');
    }
    _serverBaseUrl = url;
    StorageService().serverBaseUrl = url;
  }

  String get serverBaseUrl => _serverBaseUrl;

  Future<void> verifyConnection() async {
    final server = _serverBaseUrl;
    final response = await _dio.get(
      '$server/list/${Uri.encodeComponent(r'$')}',
      queryParameters: {'sta': 0, 'end': 1},
    );
    if (server != _serverBaseUrl) throw StateError('服务器已切换');
    _checkResponse(response);
    if (response.data is! Map || response.data['list'] is! List) {
      throw StateError('该地址不是兼容的文件服务器');
    }
  }

  Future<void> login(String token) async {
    final server = _serverBaseUrl;
    final response = await _dio.post(
      '$_serverBaseUrl/api/auth/login',
      data: {'token': token},
    );
    _checkResponse(response);
    if (server != _serverBaseUrl) {
      throw StateError('登录期间服务器已切换，请重新登录');
    }
    _sessionToken = response.data['sessionToken'] as String;
    _readTicket = response.data['readTicket'] as String;
    _ticketExpiresAt = (response.data['ticketExpiresAt'] as num).toInt();
    _dio.options.headers['Authorization'] = 'Bearer $_sessionToken';
  }

  Map<String, String> authHeadersFor(String url) {
    if (_sessionToken == null ||
        Uri.parse(url).origin != Uri.parse(_serverBaseUrl).origin) {
      return {};
    }
    return {'Authorization': 'Bearer $_sessionToken'};
  }

  Future<void> _ensureTicket({CancelToken? cancelToken}) async {
    if (_sessionToken == null ||
        _ticketExpiresAt > DateTime.now().millisecondsSinceEpoch + 60000) {
      return;
    }
    final server = _serverBaseUrl;
    final response = await _dio.post(
      '$_serverBaseUrl/api/auth/ticket',
      cancelToken: cancelToken,
    );
    if (server != _serverBaseUrl) throw StateError('服务器已切换');
    _readTicket = response.data['readTicket'] as String;
    _ticketExpiresAt = (response.data['ticketExpiresAt'] as num).toInt();
  }

  String _withTicket(String url) {
    if (_readTicket == null) return url;
    return Uri.parse(
      url,
    ).replace(queryParameters: {'ticket': _readTicket!}).toString();
  }

  static String imagePreviewUrl(String url, int size) {
    final uri = Uri.parse(url);
    final bounded = size.clamp(1, 4000);
    return uri.replace(path: '${uri.path}!${bounded}x$bounded').toString();
  }

  String getFileUrl(String filePath, String fileName) {
    final encoded = [
      ...filePath.split('/').where((s) => s.isNotEmpty),
      fileName,
    ].map(Uri.encodeComponent).join('/');
    return _withTicket('$_serverBaseUrl/getFile/$encoded');
  }

  String getVideoPreviewUrl(String filePath) {
    final encoded = filePath.split('/').map(Uri.encodeComponent).join('/');
    return _withTicket('$_serverBaseUrl/getVideoPreview/$encoded');
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
  }) async {
    final server = _serverBaseUrl;
    try {
      await _ensureTicket(cancelToken: cancelToken);
      if (server != _serverBaseUrl) throw StateError('服务器已切换');
      final list = <dynamic>[];
      var start = 0;
      while (true) {
        final response = await _dio.get(
          '$server/list/${Uri.encodeComponent(currentPath.isEmpty ? r'$' : currentPath)}',
          queryParameters: {'sta': start, 'end': start + 500},
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
        if (server == _serverBaseUrl) {
          _sessionToken = null;
          _readTicket = null;
          _ticketExpiresAt = 0;
          _dio.options.headers.remove('Authorization');
        }
        throw Exception('会话已失效，请连接并登录文件服务');
      }
      if (e.response?.statusCode == 404) {
        rethrow;
      }
      String msg = '获取文件列表失败: ${e.message}';
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

  Future<Map<String, dynamic>> restartServer(String pwd) async {
    final response = await _dio.post(
      '$_serverBaseUrl/restartServer',
      data: {'pwd': pwd},
    );

    _checkResponse(response);
    return response.data as Map<String, dynamic>;
  }
}

class _NetworkLogInterceptor extends Interceptor {
  final NetworkLogService _logService;

  _NetworkLogInterceptor(this._logService);

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
      error: err.message,
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
