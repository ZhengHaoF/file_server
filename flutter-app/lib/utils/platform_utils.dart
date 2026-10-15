import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';

/// True when the app runs on a desktop OS (Windows, Linux, macOS), including
/// Flutter Web served to a desktop browser.
///
/// Viewers use this to gate pointer/keyboard affordances that only make sense
/// with a mouse and a physical keyboard, keeping touch layouts untouched.
bool get isDesktopPlatform =>
    defaultTargetPlatform == TargetPlatform.windows ||
    defaultTargetPlatform == TargetPlatform.linux ||
    defaultTargetPlatform == TargetPlatform.macOS;

/// True for touch-first phone/tablet targets, including Flutter Web on them.
bool get isMobilePlatform =>
    defaultTargetPlatform == TargetPlatform.android ||
    defaultTargetPlatform == TargetPlatform.iOS;

/// True when the workspace shows the desktop layout: native desktop apps, or
/// Flutter Web in a window at least 700 logical pixels wide. Narrower Flutter
/// Web windows keep the touch layout.
///
/// Settings that only affect the mobile touch layout (e.g. grid column count,
/// which the desktop browser derives from window width) gate on this.
bool isDesktopLayout(BuildContext context) =>
    isDesktopPlatform ||
    (kIsWeb &&
        MediaQuery.sizeOf(context).width >= 700 &&
        !isMobilePlatform);

/// True when the management SPA (`/admin/`) can be shown in an embedded
/// WebView instead of the external browser.
///
/// `webview_flutter` only ships Android/iOS implementations (instantiating its
/// controller elsewhere throws at runtime), and a real browser stays the better
/// admin tool on desktop — so Web and desktop keep opening the admin URI
/// externally.
bool get canEmbedAdminWebView {
  final override = debugCanEmbedAdminWebView;
  if (override != null) return override;
  return !kIsWeb && isMobilePlatform;
}

/// Test-only override for [canEmbedAdminWebView]; `null` uses real detection.
@visibleForTesting
bool? debugCanEmbedAdminWebView;
