/// v2 treats relative paths as literal query values, never legacy `$`/`!WxH` syntax.
Uri contentUri(String baseUrl, String path, {String? readTicket}) {
  return Uri.parse('$baseUrl/api/v2/content').replace(
    queryParameters: {
      'path': path,
      if (readTicket != null && readTicket.isNotEmpty) 'ticket': readTicket,
    },
  );
}

Uri videoPreviewUri(String baseUrl, String path, {String? readTicket}) {
  return Uri.parse('$baseUrl/api/v2/preview').replace(
    queryParameters: {
      'path': path,
      'kind': 'video',
      if (readTicket != null && readTicket.isNotEmpty) 'ticket': readTicket,
    },
  );
}

Uri imagePreviewUri(Uri content, int size) {
  if (!content.path.endsWith('/api/v2/content') ||
      !content.queryParameters.containsKey('path')) {
    throw ArgumentError('图片预览需要 v2 原文件 URL');
  }
  final bounded = size.clamp(1, 4000);
  return content.replace(
    path: content.path.replaceFirst(RegExp(r'/content$'), '/preview'),
    queryParameters: {
      ...content.queryParameters,
      'kind': 'image',
      'width': '$bounded',
      'height': '$bounded',
    },
  );
}
