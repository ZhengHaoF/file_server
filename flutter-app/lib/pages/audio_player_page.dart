import 'dart:async';

import 'package:flutter/material.dart';
import 'package:media_kit/media_kit.dart';
import '../services/api_service.dart';

class AudioPlayerPage extends StatefulWidget {
  final String url;

  const AudioPlayerPage({super.key, required this.url});

  @override
  State<AudioPlayerPage> createState() => _AudioPlayerPageState();
}

class _AudioPlayerPageState extends State<AudioPlayerPage> {
  late Player _player;
  final List<StreamSubscription> _subscriptions = [];
  bool _isPlaying = false;
  Duration _duration = Duration.zero;
  Duration _position = Duration.zero;
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _player = Player();
    _initPlayer();
  }

  Future<void> _initPlayer() async {
    _subscriptions.add(
      _player.stream.duration.listen((duration) {
        if (mounted) {
          setState(() => _duration = duration);
        }
      }),
    );
    _subscriptions.add(
      _player.stream.position.listen((position) {
        if (mounted) setState(() => _position = position);
      }),
    );
    _subscriptions.add(
      _player.stream.playing.listen((playing) {
        if (mounted) {
          setState(() => _isPlaying = playing);
        }
      }),
    );

    _subscriptions.add(
      _player.stream.error.listen((_) {
        if (mounted) setState(() => _error = '音频播放失败，请检查连接或文件格式');
      }),
    );
    await _openAudio();
  }

  Future<void> _openAudio() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final remote =
          widget.url.startsWith('http://') || widget.url.startsWith('https://');
      await _player.open(
        Media(
          widget.url,
          httpHeaders: remote ? ApiService().authHeadersFor(widget.url) : null,
        ),
        play: false,
      );
    } catch (_) {
      if (mounted) setState(() => _error = '无法打开音频，请检查连接或文件格式');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _togglePlayback() async {
    try {
      if (_position >= _duration && _duration > Duration.zero) {
        await _player.seek(Duration.zero);
      }
      await _player.playOrPause();
    } catch (_) {
      if (mounted) setState(() => _error = '播放失败，请重试');
    }
  }

  @override
  void dispose() {
    for (final sub in _subscriptions) {
      sub.cancel();
    }
    _player.dispose();
    super.dispose();
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));
    return '$minutes:$seconds';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('音频播放')),
      body: Center(
        child: SingleChildScrollView(
          child: SizedBox(
            width: 560,
            child: Padding(
              padding: const EdgeInsets.all(32),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 200,
                    height: 200,
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Icon(
                      Icons.music_note,
                      size: 80,
                      color: Colors.grey[400],
                    ),
                  ),
                  const SizedBox(height: 32),
                  if (_loading) const LinearProgressIndicator(),
                  if (_error != null) ...[
                    Text(
                      _error!,
                      style: TextStyle(
                        color: Theme.of(context).colorScheme.error,
                      ),
                    ),
                    TextButton(onPressed: _openAudio, child: const Text('重试')),
                  ],
                  Slider(
                    value: _position.inSeconds.toDouble().clamp(
                      0,
                      _duration.inSeconds > 0
                          ? _duration.inSeconds.toDouble()
                          : 1,
                    ),
                    max: _duration.inSeconds.toDouble() > 0
                        ? _duration.inSeconds.toDouble()
                        : 1,
                    onChanged: _loading || _error != null
                        ? null
                        : (value) async {
                            try {
                              await _player.seek(
                                Duration(seconds: value.toInt()),
                              );
                            } catch (_) {
                              if (mounted) setState(() => _error = '无法跳转，请重试');
                            }
                          },
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(_formatDuration(_position)),
                        Text(_formatDuration(_duration)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        iconSize: 48,
                        tooltip: _isPlaying ? '暂停' : '播放',
                        icon: Icon(
                          _isPlaying
                              ? Icons.pause_circle_filled
                              : Icons.play_circle_filled,
                          color: Theme.of(context).primaryColor,
                        ),
                        onPressed: _loading || _error != null
                            ? null
                            : _togglePlayback,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
