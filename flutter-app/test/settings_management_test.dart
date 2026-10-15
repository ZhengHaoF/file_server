import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/pages/settings_page.dart';
import 'package:z_files/services/api_service.dart';
import 'package:z_files/services/storage_service.dart';
import 'package:z_files/utils/platform_utils.dart';

void main() {
  testWidgets(
    'management entry replaces password-based restart on small screens',
    (tester) async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final api = ApiService()..setServerUrl('http://127.0.0.1:3000');
      // Force the external-browser branch: the embedded WebView cannot be
      // hosted in a widget test (the mobile branch is covered by device QA).
      debugCanEmbedAdminWebView = false;
      addTearDown(() => debugCanEmbedAdminWebView = null);
      const channel = MethodChannel('plugins.flutter.io/url_launcher');
      String? launchedUrl;
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(channel, (call) async {
            if (call.method == 'launch') {
              launchedUrl = call.arguments['url'] as String;
              return false;
            }
            return null;
          });
      addTearDown(() {
        TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
            .setMockMethodCallHandler(channel, null);
      });
      tester.view.physicalSize = const Size(375, 812);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(const MaterialApp(home: SettingsPage()));
      await tester.scrollUntilVisible(find.text('服务管理'), 400);
      expect(find.text('重启服务器'), findsNothing);
      expect(find.byType(TextField), findsNothing);
      expect(find.textContaining('需要管理会话'), findsOneWidget);
      expect(api.adminUri.toString(), 'http://127.0.0.1:3000/admin/');
      expect(tester.takeException(), isNull);

      // A platform without an external browser must give a usable, credential-free URL.
      await tester.tap(find.text('服务管理'));
      await tester.pumpAndSettle();
      expect(launchedUrl, api.adminUri.toString());
      expect(find.text('无法打开管理后台，请在浏览器中访问 ${api.adminUri}'), findsOneWidget);
      expect(tester.takeException(), isNull);
    },
  );

  test(
    'embedded admin WebView is mobile-only',
    () {
      TestWidgetsFlutterBinding.ensureInitialized();
      addTearDown(() {
        debugDefaultTargetPlatformOverride = null;
        debugCanEmbedAdminWebView = null;
      });

      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      expect(canEmbedAdminWebView, isTrue);
      debugDefaultTargetPlatformOverride = TargetPlatform.iOS;
      expect(canEmbedAdminWebView, isTrue);

      // No webview_flutter implementation on these; the external browser stays.
      debugDefaultTargetPlatformOverride = TargetPlatform.windows;
      expect(canEmbedAdminWebView, isFalse);
      debugDefaultTargetPlatformOverride = TargetPlatform.macOS;
      expect(canEmbedAdminWebView, isFalse);
      debugDefaultTargetPlatformOverride = TargetPlatform.linux;
      expect(canEmbedAdminWebView, isFalse);

      // An explicit override wins over platform detection.
      debugCanEmbedAdminWebView = false;
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      expect(canEmbedAdminWebView, isFalse);
    },
  );

  testWidgets(
    'login dialog has fixed width, validates empty token, and shows inline errors',
    (tester) async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      ApiService().setServerUrl('http://127.0.0.1:3000');

      tester.view.physicalSize = const Size(1024, 768);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(const MaterialApp(home: SettingsPage()));
      await tester.pumpAndSettle();

      // Open login dialog
      await tester.tap(find.text('登录文件服务'));
      await tester.pumpAndSettle();

      // Verify dialog is open
      expect(find.text('访问令牌'), findsOneWidget);
      expect(find.text('记住登录状态'), findsOneWidget);

      // Verify width is fixed to 400
      final sizedBoxFinder = find.byWidgetPredicate(
        (widget) => widget is SizedBox && widget.width == 400.0,
      );
      expect(sizedBoxFinder, findsOneWidget);

      // Click login with empty token -> shows validation error
      await tester.tap(find.widgetWithText(TextButton, '登录'));
      await tester.pumpAndSettle();
      expect(find.text('请输入访问令牌'), findsOneWidget);

      // Entering text clears the error
      await tester.enterText(find.byType(TextField), 'my_test_token_12345678901234567890');
      await tester.pumpAndSettle();
      expect(find.text('请输入访问令牌'), findsNothing);

      // Sized box width is still strictly 400 after entering long token
      expect(sizedBoxFinder, findsOneWidget);

      // Clicking login with server down -> fails gracefully and shows error inline
      await tester.tap(find.widgetWithText(TextButton, '登录'));
      await tester.pump(); // Start async call, enters loading state
      expect(find.byType(CircularProgressIndicator), findsOneWidget);

      await tester.pumpAndSettle(); // Complete failure handling
      expect(find.byType(CircularProgressIndicator), findsNothing);
      expect(find.textContaining('登录失败'), findsOneWidget);
      expect(find.byType(AlertDialog), findsOneWidget); // Dialog stays open with error
    },
  );
}
