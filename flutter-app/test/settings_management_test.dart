import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/pages/settings_page.dart';
import 'package:z_files/services/api_service.dart';
import 'package:z_files/services/storage_service.dart';

void main() {
  testWidgets(
    'management entry replaces password-based restart on small screens',
    (tester) async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      final api = ApiService()..setServerUrl('http://127.0.0.1:3000');
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
}
