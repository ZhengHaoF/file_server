import 'package:flutter_test/flutter_test.dart';
import 'package:z_files/models/download_task.dart';

void main() {
  test('download records never persist tickets or URL credentials', () {
    final uri = Uri(
      scheme: 'https',
      host: 'files.example.com',
      userInfo: 'user:secret',
      path: '/api/v2/content',
      queryParameters: {
        'path': r'$$/图片%2F.jpg!320x240',
        'ticket': '临时票据?&+%',
        'sessionToken': 'secret-session',
      },
      fragment: 'secret',
    );
    final task = AppDownloadTask(
      id: '1',
      url: uri.toString(),
      fileName: '图片.jpg!320x240',
      filePath: r'$$',
    );
    final saved = AppDownloadTask.listToJson([task]);
    final restored = AppDownloadTask.listFromJson(saved).single;
    final safe = Uri.parse(restored.url);
    expect(safe.queryParameters, {'path': r'$$/图片%2F.jpg!320x240'});
    expect(safe.userInfo, '');
    expect(safe.fragment, '');
    expect(saved, isNot(contains('secret')));
    expect(saved, isNot(contains('ticket')));
  });

  test('old queue tickets and credential-bearing errors are discarded', () {
    final restored = AppDownloadTask.fromJson({
      'url': 'https://files.example.com/api/v2/content?path=%24&ticket=old',
      'errorMsg': 'request failed: ticket=old',
    });
    expect(Uri.parse(restored.url).queryParameters, {'path': r'$'});
    expect(restored.errorMsg, '下载失败，请检查连接与授权后重试');
    expect(restored.toJson().toString(), isNot(contains('old')));
  });
}
