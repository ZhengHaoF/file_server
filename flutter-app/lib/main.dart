import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:media_kit/media_kit.dart';

import 'router/app_router.dart';
import 'services/api_service.dart';
import 'services/download_service.dart';
import 'services/storage_service.dart';
import 'services/upload_service.dart';
import 'services/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  MediaKit.ensureInitialized();
  await StorageService().init();
  restoreAppTheme();
  // A remembered token re-authenticates in the background; the first directory
  // load still recovers on its own if it races this call.
  unawaited(ApiService().restoreSession());
  if (!kIsWeb) {
    await DownloadService().init();
    await UploadService().init();
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([appThemeMode, appThemeRevision]),
      builder: (context, _) => MaterialApp.router(
        title: 'Z-Files',
        debugShowCheckedModeBanner: false,
        theme: buildAppTheme(Brightness.light),
        darkTheme: buildAppTheme(Brightness.dark),
        themeMode: appThemeMode.value,
        routerConfig: appRouter,
      ),
    );
  }
}
