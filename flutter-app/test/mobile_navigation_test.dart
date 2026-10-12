import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:z_files/widgets/mobile_navigation_shell.dart';

void main() {
  testWidgets(
    'mobile bottom navigation changes routes and hides on media pages',
    (tester) async {
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
                builder: (_, _) => const Scaffold(body: Text('file-page')),
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
      router.go('/audio-play');
      await tester.pumpAndSettle();
      expect(find.byType(NavigationBar), findsNothing);
      expect(tester.takeException(), isNull);
      debugDefaultTargetPlatformOverride = null;
    },
  );
}
