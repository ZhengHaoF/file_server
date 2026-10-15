import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:photo_view/photo_view.dart';
import 'package:photo_view/photo_view_gallery.dart';
import 'package:z_files/utils/file_browser_utils.dart';
import 'package:z_files/utils/platform_utils.dart';
import 'package:z_files/widgets/image_preview_dialog.dart';

/// Stands in for NetworkImage without touching the network: photo_view swaps in
/// its error placeholder, which keeps the viewer chrome testable.
class _BrokenImageProvider extends ImageProvider<_BrokenImageProvider> {
  const _BrokenImageProvider();

  @override
  Future<_BrokenImageProvider> obtainKey(ImageConfiguration configuration) async =>
      this;

  @override
  ImageStreamCompleter loadImage(
    _BrokenImageProvider key,
    ImageDecoderCallback decode,
  ) {
    return OneFrameImageStreamCompleter(
      Future<ImageInfo>.delayed(
        Duration.zero,
        () => throw const FormatException('test image'),
      ),
    );
  }
}

List<ImagePreviewItem> _items(List<String> names) => names
    .map(
      (name) => ImagePreviewItem(
        image: const _BrokenImageProvider(),
        fileName: name,
        heroTag: 'grid_image_$name',
      ),
    )
    .toList();

/// Decodes a real image of a known size: photo_view only computes its
/// contained/covered boundaries once the image has dimensions, and the broken
/// provider above never yields any (so pinch would have nothing to scale).
class _SizedImageProvider extends ImageProvider<_SizedImageProvider> {
  const _SizedImageProvider(this.width, this.height);

  final int width;
  final int height;

  @override
  Future<_SizedImageProvider> obtainKey(ImageConfiguration configuration) async =>
      this;

  @override
  ImageStreamCompleter loadImage(
    _SizedImageProvider key,
    ImageDecoderCallback decode,
  ) {
    return OneFrameImageStreamCompleter(_paint());
  }

  Future<ImageInfo> _paint() async {
    final recorder = ui.PictureRecorder();
    Canvas(recorder).drawRect(
      Rect.fromLTWH(0, 0, width.toDouble(), height.toDouble()),
      Paint()..color = const Color(0xFF3355AA),
    );
    final image = await recorder.endRecording().toImage(width, height);
    return ImageInfo(image: image);
  }
}

List<ImagePreviewItem> _sizedItems(List<String> names) => names
    .map(
      (name) => ImagePreviewItem(
        image: const _SizedImageProvider(1200, 800),
        fileName: name,
        heroTag: 'grid_image_$name',
      ),
    )
    .toList();

Future<void> _openDialog(
  WidgetTester tester, {
  List<ImagePreviewItem>? items,
  int initialIndex = 0,
}) async {
  addTearDown(() => debugDefaultTargetPlatformOverride = null);
  final dialogItems = items ?? _items(['a.jpg', 'b.jpg', 'c.jpg']);
  await tester.pumpWidget(
    MaterialApp(
      home: Builder(
        builder: (context) => ElevatedButton(
          onPressed: () => showDialog(
            context: context,
            builder: (_) => ImagePreviewDialog(
              items: dialogItems,
              initialIndex: initialIndex,
            ),
          ),
          child: const Text('open'),
        ),
      ),
    ),
  );
  await tester.tap(find.text('open'));
  await tester.pump();
  await tester.pump(const Duration(milliseconds: 100));
}

void main() {
  group('stepIndex', () {
    test('clamps at both ends instead of wrapping', () {
      expect(stepIndex(0, 3, -1), 0);
      expect(stepIndex(1, 3, -1), 0);
      expect(stepIndex(1, 3, 1), 2);
      expect(stepIndex(2, 3, 1), 2);
    });

    test('recovers from an out-of-range current index', () {
      expect(stepIndex(-5, 3, 1), 1);
      expect(stepIndex(9, 3, -1), 1);
      expect(stepIndex(4, 0, 1), 0);
    });
  });

  group('nextWheelScale', () {
    test('one notch zooms 15% and stops at the fit floor', () {
      expect(nextWheelScale(1, zoomIn: true, minScale: 1, maxScale: 5),
          closeTo(1.15, 1e-9));
      expect(nextWheelScale(1.15, zoomIn: false, minScale: 1, maxScale: 5),
          closeTo(1, 1e-9));
      expect(nextWheelScale(1, zoomIn: false, minScale: 1, maxScale: 5), 1);
    });

    test('stops at max zoom and tolerates inverted bounds', () {
      expect(nextWheelScale(5, zoomIn: true, minScale: 1, maxScale: 5), 5);
      expect(nextWheelScale(1, zoomIn: true, minScale: 3, maxScale: 1), 3);
    });
  });

  group('platform predicates', () {
    test('desktop covers windows, linux and macOS', () {
      addTearDown(() => debugDefaultTargetPlatformOverride = null);
      for (final platform in [
        TargetPlatform.windows,
        TargetPlatform.linux,
        TargetPlatform.macOS,
      ]) {
        debugDefaultTargetPlatformOverride = platform;
        expect(isDesktopPlatform, isTrue, reason: '$platform is desktop');
        expect(isMobilePlatform, isFalse, reason: '$platform is not mobile');
      }
    });

    test('mobile covers android and ios', () {
      addTearDown(() => debugDefaultTargetPlatformOverride = null);
      for (final platform in [TargetPlatform.android, TargetPlatform.iOS]) {
        debugDefaultTargetPlatformOverride = platform;
        expect(isMobilePlatform, isTrue, reason: '$platform is mobile');
        expect(isDesktopPlatform, isFalse, reason: '$platform is not desktop');
      }
    });
  });

  group('ImagePreviewDialog', () {
    testWidgets('shows the file name and position of the initial image',
        (tester) async {
      debugDefaultTargetPlatformOverride = TargetPlatform.windows;
      try {
        await _openDialog(tester, initialIndex: 1);

        expect(find.text('b.jpg'), findsOneWidget);
        expect(find.text('2 / 3'), findsOneWidget);
      } finally {
        debugDefaultTargetPlatformOverride = null;
      }
    });

    testWidgets('arrow buttons page forward and back, clamping at the ends',
        (tester) async {
      debugDefaultTargetPlatformOverride = TargetPlatform.windows;
      try {
        await _openDialog(tester);

        // First image: no way back yet.
        expect(find.byTooltip('上一个 (←)'), findsNothing);
        expect(find.byTooltip('下一个 (→)'), findsOneWidget);

        await tester.tap(find.byTooltip('下一个 (→)'));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        expect(find.text('b.jpg'), findsOneWidget);
        expect(find.text('2 / 3'), findsOneWidget);

        await tester.tap(find.byTooltip('上一个 (←)'));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        expect(find.text('a.jpg'), findsOneWidget);
        expect(find.text('1 / 3'), findsOneWidget);

        await tester.tap(find.byTooltip('下一个 (→)'));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        await tester.tap(find.byTooltip('下一个 (→)'));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        expect(find.text('c.jpg'), findsOneWidget);
        // Last image: the forward arrow is gone.
        expect(find.byTooltip('下一个 (→)'), findsNothing);
        expect(find.byTooltip('上一个 (←)'), findsOneWidget);
      } finally {
        debugDefaultTargetPlatformOverride = null;
      }
    });

    testWidgets('arrow keys page and escape closes the dialog',
        (tester) async {
      debugDefaultTargetPlatformOverride = TargetPlatform.windows;
      try {
        await _openDialog(tester);
        final state = tester.state<ImagePreviewDialogState>(
          find.byType(ImagePreviewDialog),
        );

        await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        expect(find.text('2 / 3'), findsOneWidget);
        expect(state.currentIndex, 1);

        await tester.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        expect(find.text('1 / 3'), findsOneWidget);
        expect(state.currentIndex, 0);

        // Clamped: staying on the first image does nothing.
        await tester.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        expect(find.text('1 / 3'), findsOneWidget);

        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 350));
        expect(find.byType(ImagePreviewDialog), findsNothing);
      } finally {
        debugDefaultTargetPlatformOverride = null;
      }
    });

    testWidgets('touch platforms keep drag only: no arrow buttons',
        (tester) async {
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      try {
        await _openDialog(tester);

        expect(find.byTooltip('下一个 (→)'), findsNothing);
        expect(find.byTooltip('上一个 (←)'), findsNothing);
        // The rest of the chrome stays.
        expect(find.text('a.jpg'), findsOneWidget);
        expect(find.text('1 / 3'), findsOneWidget);
      } finally {
        debugDefaultTargetPlatformOverride = null;
      }
    });

    testWidgets('pinch zooms in and is capped by the same fit-based ceiling '
        'as the wheel', (tester) async {
      debugDefaultTargetPlatformOverride = TargetPlatform.android;
      try {
        tester.view.physicalSize = const Size(1080, 2400);
        tester.view.devicePixelRatio = 3;
        addTearDown(tester.view.resetPhysicalSize);
        addTearDown(tester.view.resetDevicePixelRatio);

        await _openDialog(
          tester,
          items: _sizedItems(['a.jpg', 'b.jpg', 'c.jpg']),
        );
        // The real 1200×800 image has to decode before photo_view can compute
        // its contained/covered boundaries.
        await tester.pump(const Duration(milliseconds: 100));

        final state = tester.state<ImagePreviewDialogState>(
          find.byType(ImagePreviewDialog),
        );
        double liveScale() => tester
            .widget<PhotoView>(find.byType(PhotoView).first)
            .controller!
            .scale!;

        // 1200×800 inside a 360×800pt viewport: contained(fit) = 360/1200.
        final fit = liveScale();
        expect(fit, closeTo(0.3, 0.01));

        final center = tester.getCenter(find.byType(PhotoViewGallery));
        final first = await tester.startGesture(
          center + const Offset(-40, 0),
          pointer: 71,
        );
        final second = await tester.startGesture(
          center + const Offset(40, 0),
          pointer: 72,
        );
        for (var i = 0; i < 40; i++) {
          await first.moveBy(const Offset(-30, 0));
          await second.moveBy(const Offset(30, 0));
          await tester.pump(const Duration(milliseconds: 16));
        }
        // Spreading two fingers really does zoom in.
        expect(liveScale(), greaterThan(fit * 2));

        await first.up();
        await second.up();
        await tester.pumpAndSettle();

        // Overshoot snaps back to fit × _maxZoomFactor — the wheel's ceiling,
        // not covered × _maxZoomFactor (which used to allow ~17× fit and blur
        // landscape photos on portrait phones).
        expect(liveScale(), closeTo(fit * 5, fit * 0.2));
        // Pinching must not swipe the gallery to another image.
        expect(state.currentIndex, 0);
      } finally {
        debugDefaultTargetPlatformOverride = null;
      }
    });
  });
}
