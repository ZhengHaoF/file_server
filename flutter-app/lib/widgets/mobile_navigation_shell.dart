import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/download_service.dart';
import '../services/upload_service.dart';

class MobileNavigationShell extends StatelessWidget {
  final Widget child;
  final String location;
  const MobileNavigationShell({
    super.key,
    required this.child,
    required this.location,
  });

  @override
  Widget build(BuildContext context) {
    final mobile =
        [
          TargetPlatform.android,
          TargetPlatform.iOS,
        ].contains(defaultTargetPlatform) ||
        (kIsWeb && MediaQuery.sizeOf(context).width < 700);
    if (!mobile ||
        !['/', '/browse', '/downloads', '/settings'].contains(location)) {
      return child;
    }
    final index = location == '/downloads'
        ? 1
        : location == '/settings'
        ? 2
        : 0;
    return Scaffold(
      body: child,
      bottomNavigationBar: AnimatedBuilder(
        animation: Listenable.merge([DownloadService(), UploadService()]),
        builder: (context, _) {
          final count =
              DownloadService().activeCount + UploadService().activeCount;
          return NavigationBar(
            selectedIndex: index,
            onDestinationSelected: (next) {
              if (next != index) {
                context.go(['/', '/downloads', '/settings'][next]);
              }
            },
            destinations: [
              const NavigationDestination(
                icon: Icon(Icons.folder_outlined),
                selectedIcon: Icon(Icons.folder),
                label: '文件',
              ),
              NavigationDestination(
                icon: Badge(
                  isLabelVisible: count > 0,
                  label: Text('$count'),
                  child: const Icon(Icons.swap_vert),
                ),
                label: '传输',
              ),
              const NavigationDestination(icon: Icon(Icons.tune), label: '设置'),
            ],
          );
        },
      ),
    );
  }
}
