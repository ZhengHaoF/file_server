import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:z_files/router/app_router.dart';
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

  testWidgets('tab pages crossfade: new page fades in, old fades out', (
    tester,
  ) async {
    final primary = AnimationController(
      vsync: tester,
      duration: const Duration(milliseconds: 210),
    );
    final secondary = AnimationController(
      vsync: tester,
      duration: const Duration(milliseconds: 210),
    );
    addTearDown(primary.dispose);
    addTearDown(secondary.dispose);

    await tester.pumpWidget(
      MaterialApp(
        home: Builder(
          builder: (context) {
            final page = tabFadePage(
              context: context,
              key: const ValueKey('tab-page'),
              child: const Text('tab-page'),
            );
            return page.transitionsBuilder(
              context,
              primary,
              secondary,
              page.child,
            );
          },
        ),
      ),
    );
    // 外层负责退场淡出，内层负责入场淡入。
    FadeTransition outer() =>
        tester.widget<FadeTransition>(find.byType(FadeTransition).first);
    FadeTransition inner() =>
        tester.widget<FadeTransition>(find.byType(FadeTransition).last);

    // 入场半程：新页面半透明，外层（退场）不衰减。
    primary.value = 0.5;
    await tester.pump();
    expect(inner().opacity.value, closeTo(0.5, 0.001));
    expect(outer().opacity.value, 1.0);

    // 退场：本页被新 tab 替换时，前 43%（约 90ms）内淡出完毕。
    primary.value = 1.0;
    secondary.value = 0.2;
    await tester.pump();
    expect(inner().opacity.value, 1.0);
    expect(outer().opacity.value, inInclusiveRange(0.01, 0.99));

    secondary.value = 0.5;
    await tester.pump();
    expect(outer().opacity.value, 0.0);
  });

  testWidgets('tab fade honors reduced motion by skipping the animation', (
    tester,
  ) async {
    late CustomTransitionPage<void> page;
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(disableAnimations: true),
        child: MaterialApp(
          home: Builder(
            builder: (context) {
              page = tabFadePage(
                context: context,
                key: const ValueKey('tab-page'),
                child: const Text('tab-page'),
              );
              return page.transitionsBuilder(
                context,
                kAlwaysCompleteAnimation,
                kAlwaysDismissedAnimation,
                page.child,
              );
            },
          ),
        ),
      ),
    );
    expect(page.transitionDuration, Duration.zero);
    expect(page.reverseTransitionDuration, Duration.zero);
    expect(find.byType(FadeTransition), findsNothing);
    expect(find.text('tab-page'), findsOneWidget);
  });
}
