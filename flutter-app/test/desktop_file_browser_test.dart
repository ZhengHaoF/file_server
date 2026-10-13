import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:z_files/models/file_info.dart';
import 'package:z_files/pages/download_manager_page.dart';
import 'package:z_files/pages/settings_page.dart';
import 'package:z_files/services/storage_service.dart';
import 'package:z_files/utils/file_browser_utils.dart';
import 'package:z_files/widgets/desktop_file_browser.dart';

FileInfo file(String name, {int bytes = 100, bool folder = false}) => FileInfo(
  name: name,
  sizeRow: bytes,
  size: '$bytes',
  mtime: '2026-10-12T09:00:00',
  isFile: !folder,
  isDirectory: folder,
  suffix: folder ? '' : '.txt',
  path: name,
);

void main() {
  test('size sort directions and folders-last are explicit', () {
    final files = [
      file('large', bytes: 5000),
      file('small', bytes: 20),
      file('folder', folder: true),
    ];
    expect(sortBrowserFiles(files, 'sizeStoB').map((f) => f.name), [
      'folder',
      'small',
      'large',
    ]);
    expect(
      sortBrowserFiles(
        files,
        'sizeBtoS',
        foldersFirst: false,
      ).map((f) => f.name),
      ['large', 'small', 'folder'],
    );
    expect(formatFileBytes(512), '512 B');
    expect(formatFileBytes(1024), '1.00 KB');
    expect(formatFileBytes(1048576), '1.00 MB');
  });

  test(
    'selection survives sorting, ranges, and prunes hidden/deleted files',
    () {
      final files = [file('a'), file('b'), file('c'), file('d')];
      final selection = FileSelection();
      selection.select(files, 0);
      selection.select(files, 2, range: true);
      expect(selection.keys, {'a', 'b', 'c'});
      selection.select(files, 1, toggle: true);
      expect(selection.keys, {'a', 'c'});
      selection.reconcile(files.reversed.toList());
      expect(selection.keys, {'a', 'c'});
      selection.reconcile([files[2]]);
      expect(selection.keys, {'c'});
      selection.clear();
      expect(selection.focused, isNull);
    },
  );

  final events = <String>[];
  Widget browser({
    List<FileInfo>? files,
    String path = '',
    String view = 'list',
    String? error,
    bool loading = false,
  }) => MaterialApp(
    theme: ThemeData(useMaterial3: true),
    home: Scaffold(
      body: DesktopFileBrowser(
        files: files ?? [file('a.txt'), file('b.txt'), file('c.txt')],
        path: path,
        server: 'http://localhost:3000',
        viewMode: view,
        sort: 'nameStoB',
        error: error,
        loading: loading,
        canBack: true,
        onBack: () => events.add('back'),
        onForward: () => events.add('forward'),
        onNavigate: (p) => events.add('path:$p'),
        onRefresh: () => events.add('refresh'),
        onUpload: () => events.add('upload'),
        onTheme: () => events.add('theme'),
        onLogs: () => events.add('logs'),
        onToggleView: () => events.add('toggle'),
        onSort: (s) => events.add('sort:$s'),
        onOpen: (f) => events.add('open:${f.name}'),
        onRename: (f) => events.add('rename:${f.name}'),
        onDelete: (f) => events.add('delete:${f.name}'),
        onDownload: (f) => events.add('download:${f.name}'),
        onCopy: (f) => events.add('copy:${f.name}'),
      ),
    ),
  );

  setUp(events.clear);

  Future<void> mount(
    WidgetTester tester, {
    double width = 1280,
    Widget? child,
  }) async {
    tester.view.physicalSize = Size(width, 800);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(child ?? browser());
    await tester.pumpAndSettle();
  }

  testWidgets(
    'single click selects; double click opens; F2 targets selection',
    (tester) async {
      await mount(tester);
      final item = find.byKey(const ValueKey('file:a.txt'));
      await tester.tap(item);
      await tester.pumpAndSettle();
      expect(events, isEmpty);
      expect(find.text('已选择 1 项'), findsOneWidget);
      await tester.sendKeyEvent(LogicalKeyboardKey.f2);
      expect(events, ['rename:a.txt']);
      await tester.tap(item);
      await tester.pump(const Duration(milliseconds: 50));
      await tester.tap(item);
      await tester.pumpAndSettle();
      expect(events, contains('open:a.txt'));
    },
  );

  testWidgets(
    'Ctrl/Shift selection, Escape and single-item destructive restriction',
    (tester) async {
      await mount(tester);
      await tester.tap(find.byKey(const ValueKey('file:a.txt')));
      await tester.pumpAndSettle();
      await tester.sendKeyDownEvent(LogicalKeyboardKey.shiftLeft);
      await tester.tap(find.byKey(const ValueKey('file:c.txt')));
      await tester.sendKeyUpEvent(LogicalKeyboardKey.shiftLeft);
      await tester.pumpAndSettle();
      expect(find.text('已选择 3 项'), findsOneWidget);
      await tester.sendKeyEvent(LogicalKeyboardKey.delete);
      expect(events, isEmpty);
      await tester.sendKeyDownEvent(LogicalKeyboardKey.controlLeft);
      await tester.tap(find.byKey(const ValueKey('file:b.txt')));
      await tester.sendKeyUpEvent(LogicalKeyboardKey.controlLeft);
      await tester.pumpAndSettle();
      expect(find.text('已选择 2 项'), findsOneWidget);
      await tester.tap(find.byTooltip('下载选中文件'));
      expect(events, ['download:a.txt', 'download:c.txt']);
      await tester.tap(find.byKey(const ValueKey('file:a.txt')));
      await tester.pumpAndSettle();
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pumpAndSettle();
      expect(find.textContaining('已选择'), findsNothing);
    },
  );

  testWidgets('browser keyboard shortcuts do not steal search editing', (
    tester,
  ) async {
    await mount(tester);
    await tester.tap(find.byKey(const ValueKey('file:a.txt')));
    await tester.pumpAndSettle();
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    expect(events, ['open:b.txt']);
    await tester.sendKeyEvent(LogicalKeyboardKey.f5);
    expect(events, contains('refresh'));
    await tester.tap(find.byKey(const Key('file-search')));
    await tester.enterText(find.byKey(const Key('file-search')), 'c.');
    await tester.pumpAndSettle();
    await tester.sendKeyDownEvent(LogicalKeyboardKey.controlLeft);
    await tester.sendKeyEvent(LogicalKeyboardKey.keyA);
    await tester.sendKeyUpEvent(LogicalKeyboardKey.controlLeft);
    await tester.sendKeyEvent(LogicalKeyboardKey.f2);
    expect(events.where((e) => e.startsWith('rename:')), isEmpty);
    expect(find.byKey(const ValueKey('file:a.txt')), findsNothing);
    expect(find.byKey(const ValueKey('file:c.txt')), findsOneWidget);
    expect(find.textContaining('已选择'), findsNothing);
  });

  testWidgets('right-click menu is desktop popup, cancel has no side effect', (
    tester,
  ) async {
    await mount(tester);
    final pointer = await tester.createGesture(
      kind: PointerDeviceKind.mouse,
      buttons: kSecondaryMouseButton,
    );
    await pointer.down(
      tester.getCenter(find.byKey(const ValueKey('file:b.txt'))),
    );
    await pointer.up();
    await tester.pumpAndSettle();
    expect(find.text('重命名 · F2'), findsOneWidget);
    expect(find.byType(BottomSheet), findsNothing);
    await tester.sendKeyEvent(LogicalKeyboardKey.escape);
    await tester.pumpAndSettle();
    expect(events, isEmpty);
  });

  testWidgets(
    'breadcrumbs navigate; directory change resets search and selection',
    (tester) async {
      await mount(tester, child: browser(path: 'photos/travel'));
      await tester.tap(find.text('photos'));
      expect(events, ['path:photos']);
      await tester.tap(find.byKey(const ValueKey('file:a.txt')));
      await tester.pumpAndSettle();
      await tester.enterText(find.byKey(const Key('file-search')), 'a');
      await tester.pumpWidget(browser(path: 'photos'));
      await tester.pumpAndSettle();
      expect(find.textContaining('已选择'), findsNothing);
      expect(find.byKey(const ValueKey('file:b.txt')), findsOneWidget);
    },
  );

  testWidgets('selection never moves rows under a double-click', (
    tester,
  ) async {
    await mount(tester);
    final item = find.byKey(const ValueKey('file:b.txt'));
    final before = tester.getCenter(item);
    await tester.tapAt(before);
    await tester.pump(const Duration(milliseconds: 50));
    expect(tester.getCenter(item), before);
    await tester.tapAt(before);
    await tester.pumpAndSettle();
    expect(events, ['open:b.txt']);
  });

  testWidgets('Ctrl+A selects visible files only and Escape clears', (
    tester,
  ) async {
    await mount(tester);
    await tester.tap(find.byKey(const ValueKey('file:a.txt')));
    await tester.pumpAndSettle();
    await tester.sendKeyDownEvent(LogicalKeyboardKey.controlLeft);
    await tester.sendKeyEvent(LogicalKeyboardKey.keyA);
    await tester.sendKeyUpEvent(LogicalKeyboardKey.controlLeft);
    await tester.pumpAndSettle();
    expect(find.text('已选择 3 项'), findsOneWidget);
    await tester.sendKeyEvent(LogicalKeyboardKey.escape);
    await tester.pumpAndSettle();
    expect(find.textContaining('已选择'), findsNothing);
  });

  testWidgets('error is not empty; retry and stale data remain visible', (
    tester,
  ) async {
    await mount(
      tester,
      child: browser(files: [], error: '无法连接'),
    );
    expect(find.text('目录暂时无法加载'), findsOneWidget);
    expect(find.text('这个目录是空的'), findsNothing);
    await tester.tap(find.text('重试'));
    expect(events, ['refresh']);
    await tester.pumpWidget(browser(error: '无法连接'));
    await tester.pumpAndSettle();
    expect(find.textContaining('上次成功数据'), findsOneWidget);
    expect(find.byKey(const ValueKey('file:a.txt')), findsOneWidget);
  });

  testWidgets(
    'large directories render lazily; narrow grid has bounded tiles',
    (tester) async {
      await mount(
        tester,
        child: browser(
          files: List.generate(
            10000,
            (i) => file('file${i.toString().padLeft(5, '0')}'),
          ),
        ),
      );
      expect(find.byKey(const ValueKey('file:file09999')), findsNothing);
      expect(find.byType(InkWell).evaluate().length, lessThan(100));
      for (final width in [600.0, 800.0, 1280.0, 1920.0]) {
        tester.view.physicalSize = Size(width, 800);
        await tester.pumpWidget(browser(view: 'img'));
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull, reason: 'width $width');
        final size = tester.getSize(find.byKey(const ValueKey('file:a.txt')));
        expect(size.height, 176);
        expect(size.width, lessThan(360));
      }
    },
  );

  testWidgets(
    'workspace sections swap the main area without pushing routes',
    (tester) async {
      SharedPreferences.setMockInitialValues({});
      await StorageService().init();
      await mount(tester);
      expect(find.byKey(const ValueKey('file:a.txt')), findsOneWidget);

      // 传输任务 replaces the content region; the rail stays, no route push.
      await tester.tap(find.byKey(const ValueKey('nav-transfers')));
      await tester.pumpAndSettle();
      expect(find.byType(DownloadManagerPage), findsOneWidget);
      expect(find.byKey(const ValueKey('file:a.txt')), findsNothing);
      expect(events, isEmpty);

      // 设置与登录 swaps the same way and keeps the workspace chrome.
      await tester.tap(find.byKey(const ValueKey('nav-settings')));
      await tester.pumpAndSettle();
      expect(find.byType(SettingsPage), findsOneWidget);
      expect(find.byType(DownloadManagerPage), findsNothing);
      expect(events, isEmpty);

      // 全部文件 returns to the browser at the root.
      await tester.tap(find.byKey(const ValueKey('nav-files')));
      await tester.pumpAndSettle();
      expect(find.byKey(const ValueKey('file:a.txt')), findsOneWidget);
      expect(find.byType(SettingsPage), findsNothing);
      expect(events, ['path:']);
    },
  );
}
