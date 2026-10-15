import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static final StorageService _instance = StorageService._internal();
  late SharedPreferences _prefs;

  factory StorageService() {
    return _instance;
  }

  StorageService._internal();

  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  String get model => _prefs.getString('model') ?? 'list';
  set model(String value) => _prefs.setString('model', value);

  String get appearance => _prefs.getString('appearance') ?? 'system';
  set appearance(String value) => _prefs.setString('appearance', value);

  int get imgSize => _prefs.getInt('imgSize') ?? 500;
  set imgSize(int value) => _prefs.setInt('imgSize', value);

  int get columns => _prefs.getInt('columns') ?? 3;
  set columns(int value) => _prefs.setInt('columns', value);

  String get playMode {
    // 旧版本可能存过已移除的 'vlc'，统一回落到 'ask'。
    final value = _prefs.getString('playMode') ?? 'ask';
    return const ['ask', 'html'].contains(value) ? value : 'ask';
  }
  set playMode(String value) => _prefs.setString('playMode', value);

  String get fileSort => _prefs.getString('fileSort') ?? 'timeStoB';
  set fileSort(String value) => _prefs.setString('fileSort', value);

  String get folderSort => _prefs.getString('folderSort') ?? 'start';
  set folderSort(String value) => _prefs.setString('folderSort', value);

  String get themeColor => _prefs.getString('themeColor') ?? '#f6823b';
  set themeColor(String value) => _prefs.setString('themeColor', value);

  bool get onlyShowImages => _prefs.getBool('onlyShowImages') ?? false;
  set onlyShowImages(bool value) => _prefs.setBool('onlyShowImages', value);

  bool get viewOriginalImage => _prefs.getBool('viewOriginalImage') ?? false;
  set viewOriginalImage(bool value) =>
      _prefs.setBool('viewOriginalImage', value);

  bool get videoThumbnail => _prefs.getBool('videoThumbnail') ?? true;
  set videoThumbnail(bool value) => _prefs.setBool('videoThumbnail', value);

  String get serverBaseUrl =>
      _prefs.getString('serverBaseUrl') ?? 'http://localhost:3000';
  set serverBaseUrl(String value) => _prefs.setString('serverBaseUrl', value);

  Future<void> clear() async {
    // Reset display preferences only. Connection and transfer records survive.
    for (final key in [
      'model',
      'appearance',
      'imgSize',
      'columns',
      'playMode',
      'fileSort',
      'folderSort',
      'themeColor',
      'onlyShowImages',
      'viewOriginalImage',
      'videoThumbnail',
    ]) {
      await _prefs.remove(key);
    }
  }
}
