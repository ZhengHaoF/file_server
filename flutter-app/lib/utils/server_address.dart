String normalizeServerAddress(String input) {
  var value = input.trim();
  if (value.isEmpty) throw const FormatException('请输入服务器地址');
  if (!value.contains('://')) value = 'http://$value';
  final uri = Uri.tryParse(value);
  if (uri == null ||
      !['http', 'https'].contains(uri.scheme) ||
      uri.host.isEmpty ||
      uri.userInfo.isNotEmpty ||
      uri.hasQuery ||
      uri.hasFragment) {
    throw const FormatException('请使用不含密码、查询参数或片段的 HTTP/HTTPS 地址');
  }
  if (uri.hasPort && (uri.port < 1 || uri.port > 65535)) {
    throw const FormatException('端口应为 1–65535');
  }
  return uri.toString().replaceFirst(RegExp(r'/+$'), '');
}
