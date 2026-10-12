import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'api_service.dart';

const maxTextPreviewBytes = 2 * 1024 * 1024;

Future<String> loadTextPreview(String source, CancelToken cancel) async {
  final uri = Uri.tryParse(source);
  final remote = uri?.scheme == 'http' || uri?.scheme == 'https';
  if (!remote) {
    if (kIsWeb) throw StateError('网页端不支持本地路径');
    final file = uri?.scheme == 'file' ? File.fromUri(uri!) : File(source);
    final stream = file.openRead();
    return _readText(stream, cancel);
  }
  final dio = Dio(
    BaseOptions(
      followRedirects: false,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
    ),
  );
  try {
    final response = await dio.get<ResponseBody>(
      source,
      cancelToken: cancel,
      options: Options(
        responseType: ResponseType.stream,
        headers: ApiService().authHeadersFor(source),
      ),
    );
    return await _readText(response.data!.stream, cancel);
  } finally {
    dio.close(force: true);
  }
}

Future<String> _readText(Stream<List<int>> stream, CancelToken cancel) async {
  final bytes = <int>[];
  await for (final chunk in stream.timeout(const Duration(seconds: 15))) {
    if (cancel.isCancelled) throw cancel.cancelError!;
    if (bytes.length + chunk.length > maxTextPreviewBytes) {
      throw StateError('文件超过 2 MB 预览上限，请下载后打开');
    }
    bytes.addAll(chunk);
  }
  if (cancel.isCancelled) throw cancel.cancelError!;
  return utf8.decode(bytes);
}
