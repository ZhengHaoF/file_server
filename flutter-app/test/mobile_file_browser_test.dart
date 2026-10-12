import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:z_files/models/file_info.dart';
import 'package:z_files/widgets/mobile_file_browser.dart';

FileInfo item(String name, {bool folder = false}) => FileInfo(
  name: name,
  path: name,
  sizeRow: 10,
  size: '10 B',
  mtime: '',
  isFile: !folder,
  isDirectory: folder,
);

void main() {
  final events = <String>[];
  Widget browser({
    bool grid = false,
    String path = '',
    String? error,
    List<FileInfo>? files,
    double scale = 1,
  }) => MaterialApp(
    theme: ThemeData(useMaterial3: true),
    home: MediaQuery(
      data: MediaQueryData(
        size: const Size(320, 640),
        textScaler: TextScaler.linear(scale),
      ),
      child: MobileFileBrowser(
        files:
            files ?? [item('旅行', folder: true), item('a.txt'), item('b.txt')],
        path: path,
        server: 'https://nas.example.com',
        error: error,
        loading: false,
        grid: grid,
        preferredColumns: 6,
        onRefresh: () async => events.add('retry'),
        onConnect: () => events.add('connect'),
        onBack: () => events.add('back'),
        onUpload: () => events.add('upload'),
        onToggleView: () => events.add('view'),
        onSort: (s) => events.add('sort:$s'),
        onOpen: (f) => events.add('open:${f.name}'),
        onMore: (f) => events.add('more:${f.name}'),
        onDownload: (f) => events.add('download:${f.name}'),
        thumbnail: (_) => null,
      ),
    ),
  );
  setUp(events.clear);

  testWidgets(
    'grid names retain tile width and menu works without opening file',
    (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(browser(grid: true, files: [item('照片_00.jpg')]));
      await tester.pumpAndSettle();
      final nameWidth = tester.getSize(find.text('照片_00.jpg')).width;
      expect(nameWidth, greaterThan(80));
      await tester.tap(find.byTooltip('文件操作').first);
      await tester.pump();
      expect(events, ['more:照片_00.jpg']);
      expect(tester.takeException(), isNull);
    },
  );

  testWidgets('back clears selection before invoking root back', (
    tester,
  ) async {
    await tester.pumpWidget(browser());
    await tester.longPress(find.text('a.txt'));
    await tester.pump();
    await tester.binding.handlePopRoute();
    await tester.pump();
    expect(find.text('已选 1 项'), findsNothing);
    expect(events, isEmpty);
    await tester.binding.handlePopRoute();
    await tester.pump();
    expect(events, ['back']);
  });

  testWidgets(
    'tap opens, long press selects, selection download targets files only',
    (tester) async {
      await tester.pumpWidget(browser());
      await tester.tap(find.text('a.txt'));
      await tester.pump();
      expect(events, ['open:a.txt']);
      await tester.longPress(find.text('a.txt'));
      await tester.pump();
      await tester.tap(find.text('旅行'));
      await tester.pump();
      expect(find.text('已选 2 项'), findsOneWidget);
      await tester.tap(find.byTooltip('下载选中文件'));
      await tester.pump();
      expect(events, ['open:a.txt', 'download:a.txt']);
      expect(find.text('已选 2 项'), findsNothing);
    },
  );

  testWidgets(
    'search filters current directory without losing path selection',
    (tester) async {
      await tester.pumpWidget(browser());
      await tester.tap(find.byTooltip('搜索当前目录'));
      await tester.pump();
      await tester.enterText(find.byType(TextField), 'b.txt');
      await tester.pump();
      expect(find.text('a.txt'), findsNothing);
      await tester.longPress(find.byKey(const ValueKey('b.txt')));
      await tester.pump();
      await tester.pumpWidget(browser(files: [item('b.txt'), item('a.txt')]));
      await tester.tap(find.byTooltip('下载选中文件'));
      await tester.pump();
      expect(events, ['download:b.txt']);
    },
  );

  testWidgets('directory change clears selection and search', (tester) async {
    await tester.pumpWidget(browser());
    await tester.longPress(find.text('a.txt'));
    await tester.pump();
    await tester.pumpWidget(browser(path: 'new'));
    expect(find.text('已选 1 项'), findsNothing);
  });

  testWidgets(
    'stale data remains, initial failure offers connection and retry',
    (tester) async {
      await tester.pumpWidget(browser(error: '离线'));
      expect(find.text('a.txt'), findsOneWidget);
      expect(find.textContaining('显示上次数据'), findsOneWidget);
      await tester.tap(find.text('重试'));
      await tester.pump();
      await tester.pumpWidget(browser(files: [], error: '未登录'));
      await tester.tap(find.text('连接并登录'));
      await tester.pump();
      expect(events, ['retry', 'connect']);
    },
  );

  testWidgets('320px grid with large text is bounded and lazy', (tester) async {
    tester.view.physicalSize = const Size(320, 640);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(
      browser(
        grid: true,
        scale: 1.5,
        files: List.generate(1000, (i) => item('非常长的文件名称_$i.txt')),
      ),
    );
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
    expect(find.byType(InkWell).evaluate().length, lessThan(40));
    await tester.tap(find.byTooltip('目录选项'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('列表视图'));
    await tester.pumpAndSettle();
    expect(events, ['view']);
  });
}
