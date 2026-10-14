import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Key/value contract used by [TokenStore]. Lets tests drive platform failures
/// (Linux without a secret service, corrupt keystore entries) without a device.
abstract class SecureStorageBackend {
  Future<String?> read({required String key});

  Future<void> write({required String key, required String value});

  Future<void> delete({required String key});
}

class _FlutterSecureStorageBackend implements SecureStorageBackend {
  final FlutterSecureStorage _storage = FlutterSecureStorage();

  @override
  Future<String?> read({required String key}) => _storage.read(key: key);

  @override
  Future<void> write({required String key, required String value}) =>
      _storage.write(key: key, value: value);

  @override
  Future<void> delete({required String key}) => _storage.delete(key: key);
}

/// Persists the long-lived access token in the platform secure store, scoped
/// per server origin. Flutter Web has no secure store, so persistence is
/// disabled there and the token stays in memory only.
class TokenStore {
  static final TokenStore _instance = TokenStore._internal();

  factory TokenStore() => _instance;

  TokenStore._internal();

  SecureStorageBackend _backend = _FlutterSecureStorageBackend();
  bool _disabled = kIsWeb;
  bool _unavailable = false;

  /// Test hook: swap the backend and re-enable a store disabled by `kIsWeb`.
  @visibleForTesting
  void debugOverride({SecureStorageBackend? backend, bool? disabled}) {
    if (backend != null) _backend = backend;
    _disabled = disabled ?? kIsWeb;
    _unavailable = false;
  }

  /// Test hook: restore the production backend and platform gate.
  @visibleForTesting
  void debugReset() {
    _backend = _FlutterSecureStorageBackend();
    _disabled = kIsWeb;
    _unavailable = false;
  }

  /// The store can never hold a token on this platform.
  bool get isBlocked => _disabled;

  /// A previous write failed (missing secret service, locked keystore); stop
  /// paying for attempts that keep failing.
  bool get isUnavailable => _unavailable;

  /// Origin-scoped key so a token is only ever replayed to its own server.
  static String keyFor(String origin) => 'zfiles.accessToken.$origin';

  /// Returns the stored token, or null when nothing usable is stored. A read
  /// failure is not latched: a locked keystore at boot must not disable
  /// remembering for the rest of the session.
  Future<String?> read(String origin) async {
    if (_disabled || _unavailable) return null;
    try {
      final value = await _backend.read(key: keyFor(origin));
      return (value == null || value.isEmpty) ? null : value;
    } catch (_) {
      return null;
    }
  }

  /// Returns whether the token was stored; false means "remember" cannot be
  /// honoured on this device and the caller must say so. A failed write is
  /// latched so a permanently broken backend is not retried forever.
  Future<bool> save(String origin, String token) async {
    if (_disabled || _unavailable || token.isEmpty) return false;
    try {
      await _backend.write(key: keyFor(origin), value: token);
      return true;
    } catch (_) {
      _unavailable = true;
      return false;
    }
  }

  /// Best effort: a leftover blob never authenticates without the matching
  /// long-lived token, and a broken backend surfaces on the next save.
  Future<void> clear(String origin) async {
    if (_disabled) return;
    try {
      await _backend.delete(key: keyFor(origin));
    } catch (_) {
      // Ignored on purpose.
    }
  }
}
