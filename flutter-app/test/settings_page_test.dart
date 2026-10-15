import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/pages/settings_page.dart';
import 'package:z_files/services/storage_service.dart';

void main() {
  Future<void> pumpSettings(
    WidgetTester tester, {
    required TargetPlatform platform,
    required Size size,
  }) async {
    SharedPreferences.setMockInitialValues({});
    await StorageService().init();
    debugDefaultTargetPlatformOverride = platform;
    addTearDown(() => debugDefaultTargetPlatformOverride = null);
    tester.view.physicalSize = size;
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(const MaterialApp(home: SettingsPage()));
    await tester.pumpAndSettle();
  }

  testWidgets('touch layout shows the display columns stepper', (tester) async {
    await pumpSettings(
      tester,
      platform: TargetPlatform.android,
      size: const Size(400, 800),
    );
    expect(find.text('显示列数'), findsOneWidget);
    // 旧的带括号说明文案不再出现。
    expect(find.text('手机图片模式列数（桌面自动调整）'), findsNothing);
    // 同一区块的其他显示设置不受影响。
    expect(find.text('预览图像素'), findsOneWidget);
  });

  testWidgets('desktop layout hides the display columns stepper', (
    tester,
  ) async {
    await pumpSettings(
      tester,
      platform: TargetPlatform.windows,
      size: const Size(1280, 800),
    );
    expect(find.text('显示列数'), findsNothing);
    expect(find.text('预览图像素'), findsOneWidget);
  });
}
