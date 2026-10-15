import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../pages/home_page.dart';
import '../pages/audio_player_page.dart';
import '../pages/text_viewer_page.dart';
import '../pages/video_player_page.dart';
import '../pages/settings_page.dart';
import '../pages/download_manager_page.dart';
import '../widgets/mobile_navigation_shell.dart';
import '../services/api_service.dart';

/// 底部 tab（文件 / 传输 / 设置）共用的渐显页面过渡：
/// 新页面淡入，被替换的旧页面同时淡出（交叉渐隐），与桌面端侧边栏 section
/// 切换同一套 fade 语言；系统开启“减少动画”时直接切换，不播动画。
CustomTransitionPage<void> tabFadePage({
  required BuildContext context,
  required LocalKey? key,
  required Widget child,
}) {
  final reduceMotion = MediaQuery.disableAnimationsOf(context);
  return CustomTransitionPage<void>(
    key: key,
    child: child,
    transitionDuration: reduceMotion
        ? Duration.zero
        : const Duration(milliseconds: 210),
    reverseTransitionDuration: reduceMotion
        ? Duration.zero
        : const Duration(milliseconds: 210),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      if (MediaQuery.disableAnimationsOf(context)) return child;
      return FadeTransition(
        // 本页被新页面替换时：随 secondaryAnimation 淡出，并在 210ms 窗口的
        // 前 43%（约 90ms）内结束，与桌面端 fade-through 的时序一致。
        opacity: Tween<double>(begin: 1.0, end: 0.0).animate(
          CurvedAnimation(
            parent: secondaryAnimation,
            curve: const Interval(0.0, 0.43, curve: Curves.easeInOut),
          ),
        ),
        child: FadeTransition(
          // 本页作为新页面入场时：淡入。
          opacity: CurvedAnimation(parent: animation, curve: Curves.easeInOut),
          child: child,
        ),
      );
    },
  );
}

final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (context, state, child) =>
          MobileNavigationShell(location: state.uri.path, child: child),
      routes: [
        GoRoute(
          path: '/downloads',
          pageBuilder: (context, state) {
            final tab = int.tryParse(state.uri.queryParameters['tab'] ?? '');
            return tabFadePage(
              context: context,
              key: state.pageKey,
              child: DownloadManagerPage(initialTab: (tab ?? 0).clamp(0, 1)),
            );
          },
        ),
        GoRoute(
          path: '/settings',
          pageBuilder: (context, state) => tabFadePage(
            context: context,
            key: state.pageKey,
            child: const SettingsPage(),
          ),
        ),
        GoRoute(
          path: '/audio-play',
          builder: (context, state) {
            final url = state.uri.queryParameters['url'] ?? '';
            return AudioPlayerPage(url: url);
          },
        ),
        GoRoute(
          path: '/text-view',
          builder: (context, state) {
            final extra = state.extra as Map<String, dynamic>? ?? {};
            return TextViewerPage(
              url: extra['url'] ?? '',
              fileName: extra['fileName'] ?? '',
            );
          },
        ),
        GoRoute(
          path: '/video-play',
          builder: (context, state) {
            final extra = state.extra as Map<String, dynamic>? ?? {};
            return VideoPlayerPage(
              url: extra['url'] ?? '',
              videoList: (extra['videoList'] as List<dynamic>?)?.cast() ?? [],
              currentIndex: extra['currentIndex'] ?? 0,
            );
          },
        ),
        GoRoute(
          path: '/',
          pageBuilder: (context, state) => tabFadePage(
            context: context,
            key: state.pageKey,
            child: HomePage(key: ValueKey(ApiService().serverBaseUrl)),
          ),
        ),
        GoRoute(
          path: '/browse',
          // 进入子目录是层级推进而非 tab 平级切换，保持右侧滑入，不用渐显。
          pageBuilder: (context, state) {
            final path = state.extra as String? ?? '';
            return CustomTransitionPage(
              key: state.pageKey,
              child: HomePage(
                key: ValueKey('${ApiService().serverBaseUrl}:$path'),
                path: path,
              ),
              transitionsBuilder:
                  (context, animation, secondaryAnimation, child) {
                    return SlideTransition(
                      position:
                          Tween<Offset>(
                            begin: const Offset(1.0, 0.0),
                            end: Offset.zero,
                          ).animate(
                            CurvedAnimation(
                              parent: animation,
                              curve: Curves.easeInOut,
                            ),
                          ),
                      child: child,
                    );
                  },
            );
          },
        ),
      ],
    ),
  ],
);
