import 'dart:convert';

enum AppUploadStatus {
  enqueued,
  uploading,
  completed,
  failed,
  canceled,
}

class AppUploadTask {
  String id;
  String fileName;
  final String destPath;
  final String localPath;
  double progress;
  AppUploadStatus status;
  String? errorMsg;
  final int fileSize;
  final DateTime createdAt;
  DateTime? completedAt;

  AppUploadTask({
    required this.id,
    required this.fileName,
    required this.destPath,
    required this.localPath,
    this.progress = 0.0,
    this.status = AppUploadStatus.enqueued,
    this.errorMsg,
    this.fileSize = 0,
    DateTime? createdAt,
    this.completedAt,
  }) : createdAt = createdAt ?? DateTime.now();

  Map<String, dynamic> toJson() => {
        'id': id,
        'fileName': fileName,
        'destPath': destPath,
        'localPath': localPath,
        'progress': progress,
        'status': status.index,
        'errorMsg': errorMsg,
        'fileSize': fileSize,
        'createdAt': createdAt.toIso8601String(),
        'completedAt': completedAt?.toIso8601String(),
      };

  factory AppUploadTask.fromJson(Map<String, dynamic> json) {
    return AppUploadTask(
      id: json['id'] ?? '',
      fileName: json['fileName'] ?? '',
      destPath: json['destPath'] ?? '',
      localPath: json['localPath'] ?? '',
      progress: (json['progress'] as num?)?.toDouble() ?? 0.0,
      status: AppUploadStatus.values[json['status'] ?? 0],
      errorMsg: json['errorMsg'] as String?,
      fileSize: json['fileSize'] ?? 0,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'])
          : DateTime.now(),
      completedAt: json['completedAt'] != null
          ? DateTime.parse(json['completedAt'])
          : null,
    );
  }

  static List<AppUploadTask> listFromJson(String jsonString) {
    if (jsonString.isEmpty) return [];
    final list = jsonDecode(jsonString) as List<dynamic>;
    return list
        .map((item) => AppUploadTask.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  static String listToJson(List<AppUploadTask> tasks) {
    return jsonEncode(tasks.map((t) => t.toJson()).toList());
  }
}

extension UploadTaskStatusExt on AppUploadStatus {
  bool get isTerminal =>
      this == AppUploadStatus.completed ||
      this == AppUploadStatus.failed ||
      this == AppUploadStatus.canceled;
}