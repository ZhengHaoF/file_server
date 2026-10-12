import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:z_files/widgets/mobile_navigation_shell.dart';
import 'package:z_files/widgets/server_connection_sheet.dart';
import 'package:z_files/services/storage_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  testWidgets(
    'mobile bottom navigation changes routes and hides on media pages',
    (tester) async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      addTearDown(() => debugDefaultTargetPlatformOverride = null);
      final router = GoRouter(
        routes: [
          ShellRoute(
            builder: (context, state, child) =>
                MobileNavigationShell(location: state.uri.path, child: child),
            routes: [
              GoRoute(
                path: '/',
                builder: (context, _) => Scaffold(
                  body: Column(
                    children: [
                      const Text('file-page'),
                      TextButton(
                        onPressed: () => showServerConnection(context),
                        child: const Text('connect-sheet'),
                      ),
                    ],
                  ),
                ),
              ),
              GoRoute(
                path: '/downloads',
                builder: (_, _) => const Scaffold(body: Text('transfer-page')),
              ),
              GoRoute(
                path: '/settings',
                builder: (_, _) => const Scaffold(body: Text('settings-page')),
              ),
              GoRoute(
                path: '/audio-play',
                builder: (_, _) => const Scaffold(body: Text('media-page')),
              ),
            ],
          ),
        ],
      );
      addTearDown(router.dispose);
      await tester.pumpWidget(MaterialApp.router(routerConfig: router));
      await tester.pumpAndSettle();
      expect(find.byType(NavigationBar), findsOneWidget);
      await tester.tap(find.text('传输'));
      await tester.pumpAndSettle();
      expect(find.text('transfer-page'), findsOneWidget);
      await tester.tap(find.text('设置'));
      await tester.pumpAndSettle();
      expect(find.text('settings-page'), findsOneWidget);
      await tester.tap(find.text('文件'));
      await tester.pumpAndSettle();
      expect(find.text('file-page'), findsOneWidget);
      await tester.tap(find.text('connect-sheet'));
      await tester.pumpAndSettle();
      final shellBottom = tester.getBottomLeft(find.byType(NavigationBar)).dy;
      final sheetBottom = tester
          .getBottomLeft(find.byType(ServerConnectionSheet))
          .dy;
      expect(sheetBottom, closeTo(shellBottom, 1));
      await tester.binding.handlePopRoute();
      await tester.pumpAndSettle();
      expect(find.byType(ServerConnectionSheet), findsNothing);
      router.go('/audio-play');
      await tester.pumpAndSettle();
      expect(find.byType(NavigationBar), findsNothing);
      expect(tester.takeException(), isNull);
      debugDefaultTargetPlatformOverride = null;
    },
  );
}
