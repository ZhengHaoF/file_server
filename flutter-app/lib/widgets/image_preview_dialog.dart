import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:photo_view/photo_view.dart';
import 'package:photo_view/photo_view_gallery.dart';

import '../utils/file_browser_utils.dart';
import '../utils/platform_utils.dart';

/// One page of the image preview: the image itself plus the metadata the
/// viewer chrome (footer, hero animation) needs.
class ImagePreviewItem {
  const ImagePreviewItem({
    required this.image,
    required this.fileName,
    required this.heroTag,
  });

  final ImageProvider image;
  final String fileName;

  /// Shared with the grid thumbnail so opening the dialog flies the image from
  /// its cell. Must be unique among the thumbnails on screen.
  final String heroTag;
}

/// Fullscreen image viewer used by both file browsers.
///
/// Images can be switched three ways: drag (touch or mouse, handled by
/// photo_view), the arrow buttons and the arrow keys (desktop). Switching is
/// clamped at both ends. Escape closes the dialog and the mouse wheel zooms
/// the current image between fit and max zoom.
class ImagePreviewDialog extends StatefulWidget {
  const ImagePreviewDialog({
    super.key,
    required this.items,
    required this.initialIndex,
  });

  final List<ImagePreviewItem> items;
  final int initialIndex;

  @override
  State<ImagePreviewDialog> createState() => ImagePreviewDialogState();
}

class ImagePreviewDialogState extends State<ImagePreviewDialog> {
  static const double _maxZoomFactor = 5;
  static const Duration _pageDuration = Duration(milliseconds: 300);

  // photo_view computes the scale per page; owning the controllers here lets
  // the wheel zoom the active page and survives paging back and forth.
  final Map<int, PhotoViewController> _controllers = {};
  final Map<int, double> _fitScale = {};
  late final PageController _pageController;
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.items.isEmpty
        ? 0
        : widget.initialIndex.clamp(0, widget.items.length - 1).toInt();
    _pageController = PageController(initialPage: _currentIndex);
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    _pageController.dispose();
    super.dispose();
  }

  @visibleForTesting
  int get currentIndex => _currentIndex;

  PhotoViewController _controllerFor(int index) {
    final existing = _controllers[index];
    if (existing != null) return existing;
    final controller = PhotoViewController();
    _controllers[index] = controller;
    return controller;
  }

  void _page(int delta) {
    final next = stepIndex(_currentIndex, widget.items.length, delta);
    if (next == _currentIndex || !_pageController.hasClients) return;
    _pageController.animateToPage(
      next,
      duration: _pageDuration,
      curve: Curves.easeOut,
    );
  }

  void _onPointerSignal(PointerSignalEvent event) {
    if (event is! PointerScrollEvent) return;
    final controller = _controllers[_currentIndex];
    final current = controller?.scale;
    if (controller == null || current == null || current <= 0) return;
    // The contained ("fit") scale is the smallest scale a page rests at, so
    // remember the smallest scale seen: it is the wheel-out floor and it
    // self-corrects whenever a gesture brings the image below it.
    final knownFit = _fitScale[_currentIndex];
    final fitScale = knownFit == null || current < knownFit ? current : knownFit;
    _fitScale[_currentIndex] = fitScale;
    final next = nextWheelScale(
      current,
      zoomIn: event.scrollDelta.dy < 0,
      minScale: fitScale,
      maxScale: fitScale * _maxZoomFactor,
    );
    if (next == current) return;
    controller.scale = next;
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    switch (event.logicalKey) {
      case LogicalKeyboardKey.escape:
        Navigator.pop(context);
        return KeyEventResult.handled;
      case LogicalKeyboardKey.arrowLeft:
        _page(-1);
        return KeyEventResult.handled;
      case LogicalKeyboardKey.arrowRight:
        _page(1);
        return KeyEventResult.handled;
      default:
        return KeyEventResult.ignored;
    }
  }

  @override
  Widget build(BuildContext context) {
    final padding = MediaQuery.of(context).padding;
    return Dialog.fullscreen(
      child: Focus(
        autofocus: true,
        onKeyEvent: _onKey,
        child: Listener(
          // Wrapping the whole overlay keeps the wheel working above the
          // arrows and the footer, not just over the image.
          onPointerSignal: _onPointerSignal,
          child: Stack(
            children: [
              Positioned.fill(
                child: PhotoViewGallery.builder(
                  pageController: _pageController,
                  itemCount: widget.items.length,
                  onPageChanged: (index) =>
                      setState(() => _currentIndex = index),
                  builder: (context, index) {
                    final item = widget.items[index];
                    return PhotoViewGalleryPageOptions(
                      imageProvider: item.image,
                      controller: _controllerFor(index),
                      heroAttributes: PhotoViewHeroAttributes(
                        tag: item.heroTag,
                      ),
                      minScale: PhotoViewComputedScale.contained,
                      maxScale:
                          PhotoViewComputedScale.covered * _maxZoomFactor,
                      errorBuilder: (context, error, stackTrace) => const Icon(
                        Icons.broken_image,
                        color: Colors.white,
                        size: 64,
                      ),
                    );
                  },
                  backgroundDecoration:
                      const BoxDecoration(color: Colors.black),
                  loadingBuilder: (context, event) => const Center(
                    child: CircularProgressIndicator(color: Colors.white),
                  ),
                ),
              ),
              Positioned(
                top: padding.top + 8,
                left: 8,
                child: IconButton(
                  icon: const Icon(Icons.close, color: Colors.white, size: 28),
                  tooltip: '关闭 (Esc)',
                  onPressed: () => Navigator.pop(context),
                ),
              ),
              // Arrows are a mouse affordance; touch users already have drag.
              if (isDesktopPlatform && widget.items.length > 1) ...[
                if (_currentIndex > 0)
                  Positioned(
                    left: 12,
                    top: 0,
                    bottom: 0,
                    child: Center(
                      child: _arrowButton(
                        icon: Icons.chevron_left,
                        tooltip: '上一个 (←)',
                        onPressed: () => _page(-1),
                      ),
                    ),
                  ),
                if (_currentIndex < widget.items.length - 1)
                  Positioned(
                    right: 12,
                    top: 0,
                    bottom: 0,
                    child: Center(
                      child: _arrowButton(
                        icon: Icons.chevron_right,
                        tooltip: '下一个 (→)',
                        onPressed: () => _page(1),
                      ),
                    ),
                  ),
              ],
              if (widget.items.isNotEmpty)
                Positioned(
                  left: 0,
                  right: 0,
                  bottom: padding.bottom + 16,
                  child: _buildFooter(),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _arrowButton({
    required IconData icon,
    required String tooltip,
    required VoidCallback onPressed,
  }) {
    return Material(
      color: Colors.black.withValues(alpha: 0.45),
      shape: const CircleBorder(),
      child: IconButton(
        icon: Icon(icon, color: Colors.white, size: 28),
        tooltip: tooltip,
        onPressed: onPressed,
        padding: const EdgeInsets.all(12),
        constraints: const BoxConstraints(minWidth: 44, minHeight: 44),
      ),
    );
  }

  Widget _buildFooter() {
    final item = widget.items[_currentIndex];
    final maxWidth = MediaQuery.of(context).size.width * 0.8;
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ConstrainedBox(
          constraints: BoxConstraints(maxWidth: maxWidth),
          child: Text(
            item.fileName,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontSize: 14),
          ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: Colors.black54,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Text(
            '${_currentIndex + 1} / ${widget.items.length}',
            style: const TextStyle(color: Colors.white, fontSize: 14),
          ),
        ),
      ],
    );
  }
}
