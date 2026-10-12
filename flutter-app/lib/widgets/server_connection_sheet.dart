import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import '../services/api_service.dart';
import '../utils/server_address.dart';

Future<bool?> showServerConnection(BuildContext context) =>
    showModalBottomSheet<bool>(
      context: context,
      useRootNavigator: true,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (_) => const ServerConnectionSheet(),
    );

class ServerConnectionSheet extends StatefulWidget {
  const ServerConnectionSheet({super.key});
  @override
  State<ServerConnectionSheet> createState() => _ServerConnectionSheetState();
}

class _ServerConnectionSheetState extends State<ServerConnectionSheet> {
  final _address = TextEditingController(text: ApiService().serverBaseUrl);
  final _token = TextEditingController();
  bool _busy = false;
  String? _error;

  @override
  void dispose() {
    _address.dispose();
    _token.clear();
    _token.dispose();
    super.dispose();
  }

  Future<void> _connect() async {
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final address = normalizeServerAddress(_address.text);
      final api = ApiService()..setServerUrl(address);
      if (_token.text.trim().isNotEmpty) {
        await api.login(_token.text.trim());
      }
      await api.verifyConnection();
      if (mounted) {
        _token.clear();
        Navigator.pop(context, true);
      }
    } catch (e) {
      if (mounted) {
        setState(
          () => _error = e is FormatException
              ? e.message
              : e is DioException && e.response?.statusCode == 401
              ? '认证失败，请检查访问令牌'
              : e is DioException && e.response?.statusCode == 403
              ? '服务器拒绝访问，请检查权限'
              : '无法连接，请检查地址、网络权限和服务状态',
        );
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) => PopScope(
    canPop: !_busy,
    child: Padding(
      padding: EdgeInsets.fromLTRB(
        24,
        20,
        24,
        24 + MediaQuery.viewInsetsOf(context).bottom,
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('连接文件服务器', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            const Text('输入 NAS 或电脑的地址。localhost 指当前手机，不是你的 NAS。令牌只保存在本次会话。'),
            const SizedBox(height: 20),
            TextField(
              controller: _address,
              enabled: !_busy,
              keyboardType: TextInputType.url,
              autocorrect: false,
              decoration: const InputDecoration(
                labelText: '服务器地址',
                hintText: 'http://192.168.1.10:3000',
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _token,
              enabled: !_busy,
              obscureText: true,
              autocorrect: false,
              enableSuggestions: false,
              decoration: const InputDecoration(
                labelText: '访问令牌',
                helperText: '公开只读服务器可留空',
              ),
            ),
            if (_error != null)
              Padding(
                padding: const EdgeInsets.only(top: 12),
                child: Text(
                  _error!,
                  style: TextStyle(color: Theme.of(context).colorScheme.error),
                ),
              ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: _busy ? null : _connect,
              child: Text(_busy ? '正在验证连接…' : '连接并验证'),
            ),
          ],
        ),
      ),
    ),
  );
}
