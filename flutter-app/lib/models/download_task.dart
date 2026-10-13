import 'dart:convert';

// Native downloads use the current same-origin Authorization header. Tickets
// must not survive in the persisted queue, including records from old releases.
String credentialFreeDownloadUrl(String value) {
  final uri = Uri.tryParse(value);
  if (uri == null) return '';
  const credentials = {
    'ticket',
    'readticket',
    'token',
    'sessiontoken',
    'authorization',
    'password',
    'accesstoken',
  };
  final query = Map<String, List<String>>.from(uri.queryParametersAll)
    ..removeWhere((key, _) => credentials.contains(key.toLowerCase()));
  return uri
      .replace(userInfo: '', fragment: '', queryParameters: query)
      .toString();
}

String? safeDownloadError(String? value) {
  if (value != null &&
      RegExp(
        r'bearer\s|(?:ticket|token|password|authorization)=',
        caseSensitive: false,
      ).hasMatch(value)) {
    return '下载失败，请检查连接与授权后重试';
  }
  return value;
}

enum AppDownloadStatus {
  enqueued,
  downloading,
  paused,
  completed,
  failed,
  canceled,
}

class AppDownloadTask {
  String id;
  final String url;
  final String fileName;
  final String filePath;
  String savePath;
  String? savedUri;
  String? errorMsg;
  double progress;
  AppDownloadStatus status;
  final int fileSize;
  final DateTime createdAt;
  DateTime? completedAt;

  AppDownloadTask({
    required this.id,
    required String url,
    required this.fileName,
    required this.filePath,
    this.savePath = '',
    this.savedUri,
    this.errorMsg,
    this.progress = 0.0,
    this.status = AppDownloadStatus.enqueued,
    this.fileSize = 0,
    DateTime? createdAt,
    this.completedAt,
  }) : url = credentialFreeDownloadUrl(url),
       createdAt = createdAt ?? DateTime.now();

  Map<String, dynamic> toJson() => {
    'id': id,
    'url': url,
    'fileName': fileName,
    'filePath': filePath,
    'savePath': savePath,
    'savedUri': savedUri,
    'errorMsg': safeDownloadError(errorMsg),
    'progress': progress,
    'status': status.index,
    'fileSize': fileSize,
    'createdAt': createdAt.toIso8601String(),
    'completedAt': completedAt?.toIso8601String(),
  };

  factory AppDownloadTask.fromJson(Map<String, dynamic> json) {
    return AppDownloadTask(
      id: json['id'] ?? '',
      url: json['url'] ?? '',
      fileName: json['fileName'] ?? '',
      filePath: json['filePath'] ?? '',
      savePath: json['savePath'] ?? '',
      savedUri: json['savedUri'],
      errorMsg: safeDownloadError(json['errorMsg']),
      progress: (json['progress'] as num?)?.toDouble() ?? 0.0,
      status: AppDownloadStatus.values[json['status'] ?? 0],
      fileSize: json['fileSize'] ?? 0,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'])
          : DateTime.now(),
      completedAt: json['completedAt'] != null
          ? DateTime.parse(json['completedAt'])
          : null,
    );
  }

  static List<AppDownloadTask> listFromJson(String jsonString) {
    if (jsonString.isEmpty) return [];
    final list = jsonDecode(jsonString) as List<dynamic>;
    return list
        .map((item) => AppDownloadTask.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  static String listToJson(List<AppDownloadTask> tasks) {
    return jsonEncode(tasks.map((t) => t.toJson()).toList());
  }
}
