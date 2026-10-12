import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { HttpError } from './fileSafety.js';

ffmpeg.setFfmpegPath(ffmpegStatic);

export class WorkQueue {
    constructor(concurrency, maxPending = 64) {
        this.concurrency = concurrency;
        this.maxPending = maxPending;
        this.active = 0;
        this.pending = [];
    }
    run(action) {
        if (this.pending.length >= this.maxPending) return Promise.reject(new HttpError(429, '缩略图任务过多，请稍后重试'));
        return new Promise((resolve, reject) => {
            this.pending.push({ action, resolve, reject });
            this.drain();
        });
    }
    drain() {
        while (this.active < this.concurrency && this.pending.length) {
            const { action, resolve, reject } = this.pending.shift();
            this.active++;
            Promise.resolve().then(action).then(resolve, reject).finally(() => {
                this.active--;
                this.drain();
            });
        }
    }
}

export function parseImageSize(size) {
    const match = /^(\d{1,4})x(\d{1,4})$/.exec(size);
    if (!match || +match[1] < 1 || +match[2] < 1 || +match[1] > 5000 || +match[2] > 5000
        || +match[1] * +match[2] > 16000000) throw new HttpError(400, '缩略图尺寸无效或过大');
    return { width: +match[1], height: +match[2] };
}

export function previewKey(filePath, stat, variant) {
    return crypto.createHash('sha256').update(JSON.stringify([
        'preview-v2', filePath, stat.size, stat.mtimeMs, stat.ctimeMs, variant,
    ])).digest('hex');
}

export function createPreviewService(config, sql, logger) {
    const images = new WorkQueue(4);
    const videos = new WorkQueue(2, 16);
    const inFlight = new Map();
    async function get(filePath, variant, producer, queue) {
        const stat = await fs.promises.stat(filePath);
        if (!stat.isFile()) throw new HttpError(400, '目标不是文件');
        const key = previewKey(filePath, stat, variant);
        const output = path.join(config.imgCache, `${key}.jpg`);
        try {
            await fs.promises.access(output);
            sql.updateInfo(key);
            return output;
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }
        if (!inFlight.has(key)) {
            const work = queue.run(async () => {
                const temp = path.join(config.imgCache, `.preview-${crypto.randomUUID()}.jpg`);
                try {
                    await producer(temp);
                    await fs.promises.rename(temp, output);
                    sql.insertInfo(key, '.jpg');
                    return output;
                } finally {
                    await fs.promises.unlink(temp).catch(() => {});
                }
            }).finally(() => inFlight.delete(key));
            inFlight.set(key, work);
        }
        return inFlight.get(key);
    }
    return {
        image(filePath, size) {
            const dimensions = parseImageSize(size);
            return get(filePath, `image:${size}`, temp => sharp(filePath, { limitInputPixels: 64000000 })
                .rotate().resize({ ...dimensions, fit: 'inside', withoutEnlargement: true })
                .jpeg({ progressive: true }).toFile(temp), images);
        },
        video(filePath) {
            return get(filePath, 'video:1s:320x240', temp => new Promise((resolve, reject) => {
                const command = ffmpeg(filePath).seekInput(1).frames(1)
                    .outputOptions('-vf', 'scale=320:240:force_original_aspect_ratio=decrease')
                    .output(temp);
                const timeout = setTimeout(() => command.kill('SIGKILL'), 30000);
                command.on('end', () => { clearTimeout(timeout); resolve(); })
                    .on('error', error => { clearTimeout(timeout); logger.warn(`视频截图失败: ${error.message}`); reject(error); })
                    .run();
            }), videos);
        },
    };
}
