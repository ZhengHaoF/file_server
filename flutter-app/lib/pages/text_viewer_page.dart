import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import '../services/text_preview_service.dart';

class TextViewerPage extends StatefulWidget {
  final String url;
  final String fileName;

  const TextViewerPage({super.key, required this.url, required this.fileName});

  @override
  State<TextViewerPage> createState() => _TextViewerPageState();
}

class _TextViewerPageState extends State<TextViewerPage> {
  String? _content;
  bool _isLoading = true;
  String? _error;
  CancelToken? _cancel;
  int _generation = 0;

  @override
  void dispose() {
    _cancel?.cancel('预览已关闭');
    _generation++;
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _loadContent();
  }

  Future<void> _loadContent() async {
    _cancel?.cancel('重新加载');
    final cancel = _cancel = CancelToken();
    final generation = ++_generation;
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final content = await loadTextPreview(widget.url, cancel);

      if (mounted && generation == _generation) {
        setState(() {
          _content = content;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted && generation == _generation && !cancel.isCancelled) {
        final msg = e is Exception
            ? e.toString().replaceFirst('Exception: ', '')
            : e.toString();
        setState(() {
          _error = '加载失败: $msg';
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.fileName,
          style: const TextStyle(fontSize: 16),
          overflow: TextOverflow.ellipsis,
        ),
        centerTitle: true,
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 48, color: Colors.red),
            const SizedBox(height: 16),
            Text(_error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 16),
            TextButton(onPressed: _loadContent, child: const Text('重试')),
          ],
        ),
      );
    }

    if (_content == null || _content!.isEmpty) {
      return const Center(child: Text('文件内容为空'));
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: SelectableText(
        _content!,
        style: const TextStyle(
          fontFamily: 'monospace',
          fontSize: 14,
          height: 1.5,
        ),
      ),
    );
  }
}
