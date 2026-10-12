import fs from 'node:fs';
import { createGunzip } from 'node:zlib';
import { HttpError } from './fileSafety.js';

const MAX_FILE_BYTES = 64 * 1024 * 1024;
const MAX_LINE_BYTES = 65536;
const BLOCK_BYTES = 65536;

export const logFileIdentity = (stat) => `${stat.dev}:${stat.ino}:${stat.birthtimeMs}`;

function record(buffer, offset) {
    if (buffer.length > MAX_LINE_BYTES) throw new HttpError(413, '日志单行过长');
    return { line: buffer.toString('utf8').replace(/\r$/, ''), offset };
}

/** Stream decoded records with byte offsets (decoded offsets for gzip archives). */
export async function* forwardLogRecords(file) {
    const original = fs.createReadStream(file);
    const input = file.endsWith('.gz') ? original.pipe(createGunzip()) : original;
    if (input !== original) original.on('error', (error) => input.destroy(error));
    let pending = Buffer.alloc(0);
    let offset = 0;
    let bytes = 0;
    try {
        for await (const chunk of input) {
            bytes += chunk.length;
            if (bytes > MAX_FILE_BYTES) throw new HttpError(413, '日志文件过大，请先在服务器归档');
            pending = Buffer.concat([pending, chunk]);
            let newline;
            while ((newline = pending.indexOf(10)) !== -1) {
                yield record(pending.subarray(0, newline), offset);
                offset += newline + 1;
                pending = pending.subarray(newline + 1);
            }
            if (pending.length > MAX_LINE_BYTES) throw new HttpError(413, '日志单行过长');
        }
        if (pending.length) yield record(pending, offset);
    } finally {
        input.destroy();
        original.destroy();
    }
}

/** Read the newest physical records without loading the entire active log. */
export async function* reverseLogRecords(file, before = Infinity) {
    if (file.endsWith('.gz')) {
        // Gzip is not seekable. Decompression remains bounded by the archive limit.
        const rows = [];
        for await (const row of forwardLogRecords(file)) if (row.offset < before) rows.push(row);
        for (let index = rows.length - 1; index >= 0; index--) yield rows[index];
        return;
    }
    const handle = await fs.promises.open(file, 'r');
    try {
        let position = Math.min((await handle.stat()).size, before);
        let pending = Buffer.alloc(0);
        while (position > 0) {
            const start = Math.max(0, position - BLOCK_BYTES);
            const buffer = Buffer.alloc(position - start);
            const { bytesRead } = await handle.read(buffer, 0, buffer.length, start);
            // Rotation/truncation during reading must not expose zero-filled data.
            if (bytesRead !== buffer.length)
                throw new HttpError(409, '日志读取期间发生变化，请刷新');
            pending = Buffer.concat([buffer, pending]);
            let right = pending.length;
            let newline;
            while ((newline = pending.lastIndexOf(10, right - 1)) !== -1) {
                const part = pending.subarray(newline + 1, right);
                if (part.length) yield record(part, start + newline + 1);
                right = newline;
                if (right === 0) break;
            }
            pending = pending.subarray(0, right);
            if (pending.length > MAX_LINE_BYTES) throw new HttpError(413, '日志单行过长');
            position = start;
        }
        if (pending.length) yield record(pending, 0);
    } finally {
        await handle.close();
    }
}
