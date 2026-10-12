import 'package:flutter_test/flutter_test.dart';
import 'package:z_files/models/file_info.dart';
import 'package:z_files/utils/file_urls.dart';
import 'package:z_files/services/network_log_service.dart';

void main() {
  test(
    'image log filter uses explicit preview kind, not a literal filename suffix',
    () {
      final logs = NetworkLogService()..clear();
      logs.showImageRequests = false;
      addTearDown(() {
        logs.showImageRequests = true;
        logs.clear();
      });
      final raw = contentUri('https://files.example.com', 'foo.jpg!320x240');
      for (final uri in [raw, imagePreviewUri(raw, 320)]) {
        logs.addLog(
          NetworkLogEntry(
            timestamp: DateTime.now(),
            method: 'GET',
            url: uri.toString(),
            durationMs: 1,
          ),
        );
      }
      expect(logs.logs.length, 1);
      expect(Uri.parse(logs.logs.single.url).path, '/api/v2/content');
    },
  );
  test(
    'v2 raw content preserves literal dollar, bang suffix, percent and Unicode',
    () {
      const ticket = '临时票据?&+%';
      for (final folder in [r'$', r'$$', '图片 #100%/字面%2F']) {
        const name = 'foo.jpg!320x240';
        final file = FileInfo.fromJson(
          {'name': name, 'size': 1, 'isFile': true, 'isDirectory': false},
          folder,
          'https://files.example.com/nas',
          readTicket: ticket,
        );
        final content = Uri.parse(file.url!);
        expect(content.path, '/nas/api/v2/content');
        expect(content.queryParameters['path'], '$folder/$name');
        expect(content.queryParameters['ticket'], ticket);
        expect(content.queryParameters.containsKey('kind'), false);

        final image = imagePreviewUri(content, 320);
        expect(image.path, '/nas/api/v2/preview');
        expect(image.queryParameters['path'], '$folder/$name');
        expect(image.queryParameters['ticket'], ticket);
        expect(image.queryParameters['kind'], 'image');
        expect(image.queryParameters['width'], '320');
        expect(image.queryParameters['height'], '320');
        expect(image.queryParametersAll['path']!.length, 1);
        expect(image.queryParametersAll['ticket']!.length, 1);
      }
    },
  );

  test(
    'v2 previews bound dimensions, preserve path and never interpret old URLs',
    () {
      final raw = contentUri('https://files.example.com', r'$$/literal%2F.png');
      expect(imagePreviewUri(raw, 9000).queryParameters['width'], '4000');
      expect(imagePreviewUri(raw, 0).queryParameters['height'], '1');
      expect(
        () => imagePreviewUri(
          Uri.parse('https://files.example.com/getFile/foo.jpg!320x240'),
          320,
        ),
        throwsArgumentError,
      );
      final video = videoPreviewUri(
        'https://files.example.com',
        r'$/视频 #100%.mp4',
        readTicket: 'ticket',
      );
      expect(video.path, '/api/v2/preview');
      expect(video.queryParameters['path'], r'$/视频 #100%.mp4');
      expect(video.queryParameters['kind'], 'video');
      expect(video.queryParameters['ticket'], 'ticket');
      expect(video.queryParameters.containsKey('width'), false);
    },
  );
}
