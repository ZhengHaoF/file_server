import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'storage_service.dart';

final appThemeMode = ValueNotifier<ThemeMode>(ThemeMode.system);
final appThemeRevision = ValueNotifier<int>(0);

ThemeData buildAppTheme(Brightness brightness) {
  var seed = const Color(0xFFf6823b);
  try {
    seed = Color(
      int.parse(
        'FF${StorageService().themeColor.replaceAll('#', '')}',
        radix: 16,
      ),
    );
  } catch (_) {
    // Retain the brand accent if an old preference is malformed.
  }
  final dark = brightness == Brightness.dark;
  final colors = ColorScheme.fromSeed(seedColor: seed, brightness: brightness)
      .copyWith(
        onSurface: dark ? const Color(0xFFE7E9EF) : const Color(0xFF23262C),
        onSurfaceVariant: dark
            ? const Color(0xFFAEB4C0)
            : const Color(0xFF646B78),
        surface: dark ? const Color(0xFF181A1F) : const Color(0xFFFFFFFF),
        surfaceContainerLow: dark
            ? const Color(0xFF202229)
            : const Color(0xFFF5F6F8),
        outlineVariant: dark
            ? const Color(0xFF363942)
            : const Color(0xFFE5E7EB),
      );
  return ThemeData(
    useMaterial3: true,
    colorScheme: colors,
    fontFamily: !kIsWeb && defaultTargetPlatform == TargetPlatform.windows
        ? 'Segoe UI'
        : null,
    appBarTheme: const AppBarTheme(centerTitle: false, elevation: 0),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: colors.surfaceContainerLow,
      enabledBorder: OutlineInputBorder(
        borderSide: BorderSide(color: colors.outlineVariant),
        borderRadius: BorderRadius.circular(8),
      ),
    ),
  );
}

void restoreAppTheme() {
  appThemeMode.value = ThemeMode.values.firstWhere(
    (mode) => mode.name == StorageService().appearance,
    orElse: () => ThemeMode.system,
  );
}

void cycleAppTheme() {
  final next = ThemeMode
      .values[(appThemeMode.value.index + 1) % ThemeMode.values.length];
  appThemeMode.value = next;
  StorageService().appearance = next.name;
}
