import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../utils/platform_utils.dart';

/// Embedded browser for the management SPA served at `/admin/`.
///
/// Mobile only — desktop and Flutter Web keep the external-browser flow (the
/// caller gates on [canEmbedAdminWebView]).
///
/// Credential policy (see `shared/ADMIN_CONTRACT.md`): this page never
/// receives, stores or forwards credentials. The admin token is typed into the
/// SPA's own login page and exchanged there for an in-memory session; the
/// resulting `fs_admin_session` HttpOnly cookie lives in the WebView's native
/// cookie jar and survives app restarts until it expires. Signing out of the
/// app drops that cookie via [clearAdminWebViewCookies]. There is deliberately
/// no JavaScript bridge: the loaded content is the server's own first-party
/// SPA, and the cookie is HttpOnly so page scripts cannot read it.
class AdminWebViewPage extends StatefulWidget {
  const AdminWebViewPage({super.key, required this.url});

  final Uri url;

  @override
  State<AdminWebViewPage> createState() => _AdminWebViewPageState();
}

class _AdminWebViewPageState extends State<AdminWebViewPage> {
  late final WebViewController _controller;
  late final String _originAuthority;

  bool _pageLoading = true;
  int _progress = 0;
  String? _error;
  bool _leaving = false;

  @override
  void initState() {
    super.initState();
    _originAuthority = widget.url.authority;
    final originScheme = widget.url.scheme;
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            if (!mounted) return;
            setState(() => _progress = progress);
          },
          onPageStarted: (_) {
            if (!mounted) return;
            setState(() {
              _pageLoading = true;
              _error = null;
            });
          },
          onPageFinished: (_) {
            if (!mounted) return;
            setState(() => _pageLoading = false);
          },
          onWebResourceError: (WebResourceError error) {
            // Subresource failures (an icon, a poll) must not replace the page.
            // isForMainFrame is nullable on newer SDKs: only treat an explicit
            // `true` as a main-frame failure so subresources stay ignored.
            if (error.isForMainFrame != true || !mounted) return;
            setState(() {
              _pageLoading = false;
              _error = error.description.isNotEmpty
                  ? error.description
                  : '无法加载管理后台';
            });
          },
          onNavigationRequest: (NavigationRequest request) {
            final target = Uri.tryParse(request.url);
            // Anything that leaves the file-server origin is handed to the
            // external browser; only same-origin content renders in-app.
            if (target == null ||
                target.authority != _originAuthority ||
                target.scheme != originScheme) {
              _openInBrowser(request.url);
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(widget.url);
  }

  Future<void> _openInBrowser(String url) async {
    final uri = Uri.tryParse(url);
    if (uri == null) return;
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  void _handlePopInvoked(bool didPop) async {
    if (didPop || _leaving) return;
    // The system back gesture first walks the SPA's own history.
    if (await _controller.canGoBack()) {
      await _controller.goBack();
      return;
    }
    if (!mounted) return;
    _leaving = true;
    Navigator.of(context).pop();
  }

  void _retry() {
    setState(() {
      _pageLoading = true;
      _error = null;
    });
    _controller.reload();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (bool didPop, Object? result) =>
          _handlePopInvoked(didPop),
      child: Scaffold(
        appBar: AppBar(
          // The origin stays visible so the admin token is only ever typed
          // into a page the user can attribute to their own server.
          title: Text('服务管理 · $_originAuthority'),
          actions: [
            IconButton(
              tooltip: '刷新',
              icon: const Icon(Icons.refresh),
              onPressed: _retry,
            ),
            IconButton(
              tooltip: '在浏览器打开',
              icon: const Icon(Icons.open_in_new),
              onPressed: () => _openInBrowser(widget.url.toString()),
            ),
          ],
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(3),
            child: _pageLoading && _error == null
                ? LinearProgressIndicator(
                    value: _progress / 100,
                    minHeight: 3,
                    backgroundColor: Colors.transparent,
                  )
                : const SizedBox(height: 3),
          ),
        ),
        body: Stack(
          children: [
            WebViewWidget(controller: _controller),
            if (_error != null) _buildError(theme),
          ],
        ),
      ),
    );
  }

  Widget _buildError(ThemeData theme) {
    return ColoredBox(
      color: theme.scaffoldBackgroundColor,
      child: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.cloud_off, size: 48, color: theme.colorScheme.outline),
                const SizedBox(height: 16),
                Text('管理后台加载失败', style: theme.textTheme.titleMedium),
                const SizedBox(height: 8),
                Text(
                  _error!,
                  textAlign: TextAlign.center,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.outline,
                  ),
                ),
                const SizedBox(height: 24),
                FilledButton.icon(
                  onPressed: _retry,
                  icon: const Icon(Icons.refresh),
                  label: const Text('重试'),
                ),
                TextButton.icon(
                  onPressed: () => _openInBrowser(widget.url.toString()),
                  icon: const Icon(Icons.open_in_new),
                  label: const Text('在浏览器打开'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Drops every WebView cookie, including the admin SPA session, so the next
/// 服务管理 open asks for the admin token again. Called when the app signs
/// out. No-op off mobile, where the WebView is never used.
Future<void> clearAdminWebViewCookies() async {
  if (!canEmbedAdminWebView) return;
  try {
    await WebViewCookieManager().clearCookies();
  } catch (_) {
    // A failing cookie store must never block logout.
  }
}
