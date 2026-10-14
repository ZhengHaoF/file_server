import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../services/network_log_service.dart';

/// Full-page network diagnostics log. Rendered inside the desktop workspace
/// shell as its own section (like transfers / settings); the modal
/// `NetworkLogDialog` remains the entry used by mobile and the settings page.
class NetworkLogPage extends StatefulWidget {
  const NetworkLogPage({super.key});

  @override
  State<NetworkLogPage> createState() => _NetworkLogPageState();
}

class _NetworkLogPageState extends State<NetworkLogPage> {
  final NetworkLogService _service = NetworkLogService();

  @override
  void initState() {
    super.initState();
    _service.addListener(_onChanged);
  }

  @override
  void dispose() {
    _service.removeListener(_onChanged);
    super.dispose();
  }

  void _onChanged() {
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final logs = _service.logs;

    return Scaffold(
      appBar: AppBar(
        title: Text('网络日志 (${logs.length})'),
        centerTitle: MediaQuery.sizeOf(context).width < 700,
        actions: [
          Row(
            children: [
              const Text('记录', style: TextStyle(fontSize: 12)),
              Switch(
                value: _service.enabled,
                onChanged: (v) => _service.enabled = v,
                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
            ],
          ),
          IconButton(
            tooltip: '清空',
            icon: const Icon(Icons.delete_outline, size: 20),
            onPressed: logs.isEmpty ? null : _service.clear,
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: logs.isEmpty
          ? const Center(
              child: Text('暂无网络请求', style: TextStyle(color: Colors.grey)),
            )
          : ListView.separated(
              itemCount: logs.length,
              separatorBuilder: (_, _) => const Divider(height: 1),
              itemBuilder: (context, index) => _LogTile(entry: logs[index]),
            ),
    );
  }
}

class _LogTile extends StatelessWidget {
  final NetworkLogEntry entry;

  const _LogTile({required this.entry});

  Color get _statusColor {
    if (entry.isRequestError) return Colors.red;
    final code = entry.statusCode ?? 0;
    if (code >= 200 && code < 300) return Colors.green;
    if (code >= 300 && code < 400) return Colors.orange;
    if (code >= 400) return Colors.red;
    return Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
      child: ExpansionTile(
        tilePadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        childrenPadding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: _statusColor.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                entry.method,
                style: TextStyle(color: _statusColor, fontSize: 11, fontWeight: FontWeight.w600),
              ),
            ),
            const SizedBox(width: 8),
            Text(
              entry.statusCode?.toString() ?? 'ERR',
              style: TextStyle(color: _statusColor, fontSize: 12, fontWeight: FontWeight.w600),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: SelectableText(
                entry.url,
                style: const TextStyle(fontSize: 12),
              ),
            ),
            const SizedBox(width: 8),
            Text('${entry.durationMs}ms', style: const TextStyle(fontSize: 11, color: Colors.grey)),
          ],
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 2),
          child: Text(
            entry.timestamp.toIso8601String().substring(11, 23),
            style: const TextStyle(fontSize: 11, color: Colors.grey),
          ),
        ),
        children: [
          _DetailSection(
            title: '请求头',
            content: entry.formattedRequestHeaders,
            copyText: entry.formattedRequestHeaders,
          ),
          _DetailSection(
            title: '请求体',
            content: entry.formattedRequestBody,
            copyText: entry.formattedRequestBody,
          ),
          _DetailSection(
            title: '响应头',
            content: entry.formattedResponseHeaders,
            copyText: entry.formattedResponseHeaders,
          ),
          _DetailSection(
            title: '响应体',
            content: entry.formattedResponseBody,
            copyText: entry.formattedResponseBody,
          ),
          if (entry.error != null)
            _DetailSection(
              title: '错误',
              content: entry.error!,
              copyText: entry.error,
              highlight: true,
            ),
        ],
      ),
    );
  }
}

class _DetailSection extends StatelessWidget {
  final String title;
  final String content;
  final String? copyText;
  final bool highlight;

  const _DetailSection({
    required this.title,
    required this.content,
    this.copyText,
    this.highlight = false,
  });

  @override
  Widget build(BuildContext context) {
    if (content.isEmpty) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.grey)),
              const Spacer(),
              InkWell(
                onTap: () {
                  if (copyText == null) return;
                  Clipboard.setData(ClipboardData(text: copyText!));
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('已复制'), duration: Duration(milliseconds: 800)),
                  );
                },
                child: const Padding(
                  padding: EdgeInsets.all(4),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.copy, size: 12, color: Colors.grey),
                      SizedBox(width: 2),
                      Text('复制', style: TextStyle(fontSize: 11, color: Colors.grey)),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: highlight ? Colors.red.shade50 : Colors.grey.shade100,
              borderRadius: BorderRadius.circular(6),
              border: Border.all(
                color: highlight ? Colors.red.shade200 : Colors.grey.shade300,
                width: 0.5,
              ),
            ),
            child: SelectableText(
              content,
              style: TextStyle(
                fontSize: 11,
                fontFamily: 'monospace',
                color: highlight ? Colors.red.shade700 : Colors.black87,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
