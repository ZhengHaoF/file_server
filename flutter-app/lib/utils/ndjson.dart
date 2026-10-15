import 'dart:convert';

/// 单个未终止行能缓冲的最大字符数。服务端被换掉或协议出错时不让内存无上限增长
/// （仓库约束：流式输入必须有界）。
const int kMaxLineChars = 64 * 1024;

/// 把字节流切成按行分隔的 JSON 对象。容忍两种断裂：跨 chunk 的 UTF-8 多字节
/// （由 utf8.decoder 处理）与跨 chunk 的半行（由行缓冲处理）。空行跳过。
///
/// 非 JSON 行、非对象行会被跳过；超过 [kMaxLineChars] 仍未换行则抛
/// [FormatException]，由调用方按“连接/协议异常”处理。
Stream<Map<String, dynamic>> ndjsonMaps(Stream<List<int>> bytes) async* {
  var buffer = '';
  // 用 `bind` 而不是 `Stream.transform`：`ResponseBody.stream` 的运行时类型参数
  // 是 Uint8List，`transform` 的泛型检查会要求 StreamTransformer<Uint8List,...>，
  // 而 Utf8Decoder 实现的是 Converter<List<int>, String>，类型对不上。
  // `bind` 同样能跨 chunk 缓冲未结束的多字节序列。
  await for (final chunk in utf8.decoder.bind(bytes)) {
    buffer += chunk;
    var index = buffer.indexOf('\n');
    while (index >= 0) {
      final line = buffer.substring(0, index).trim();
      buffer = buffer.substring(index + 1);
      if (line.isNotEmpty) {
        final decoded = jsonDecode(line);
        if (decoded is Map<String, dynamic>) yield decoded;
      }
      index = buffer.indexOf('\n');
    }
    if (buffer.length > kMaxLineChars) {
      throw const FormatException('NDJSON 行过长，连接可能已被劫持');
    }
  }
  final tail = buffer.trim();
  if (tail.isNotEmpty) {
    final decoded = jsonDecode(tail);
    if (decoded is Map<String, dynamic>) yield decoded;
  }
}
