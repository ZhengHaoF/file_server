import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:z_files/utils/ndjson.dart';

void main() {
  test('ndjsonMaps 容忍跨 chunk 的半行与多字节断裂', () async {
    final full = utf8.encode('{"name":"报告","path":"b/报告"}\n');
    final cut = full.indexOf(0xE6) + 1; // 切断多字节序列
    final chunks = <List<int>>[
      [...utf8.encode('{"name":"a","path":"a"}\n'), ...full.sublist(0, 10)],
      full.sublist(10, cut),
      full.sublist(cut),
      utf8.encode('{"tick":true}\n{"done":true,"status":"complete"}\n'),
    ];
    final maps = await ndjsonMaps(Stream.fromIterable(chunks)).toList();
    expect(maps.length, 4);
    expect(maps[0]['name'], 'a');
    expect(maps[1]['name'], '报告');
    expect(maps[1]['path'], 'b/报告');
    expect(maps[2]['tick'], true);
    expect(maps[3]['done'], true);
    expect(maps[3]['status'], 'complete');
  });

  test('ndjsonMaps 处理空行与结尾无换行', () async {
    final chunks = <List<int>>[
      utf8.encode('\n{"name":"x","path":"x"}\n\n'),
      utf8.encode('{"done":true,"status":"capped"}'),
    ];
    final maps = await ndjsonMaps(Stream.fromIterable(chunks)).toList();
    expect(maps.length, 2);
    expect(maps[0]['name'], 'x');
    expect(maps[1]['status'], 'capped');
  });
}
