import 'package:flutter/foundation.dart';

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
