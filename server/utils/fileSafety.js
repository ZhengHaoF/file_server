import fs from 'node:fs';
import path from 'node:path';

export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export function validatePath(target, root, pathApi = path) {
    const relative = pathApi.relative(pathApi.resolve(root), pathApi.resolve(target));
    return (
        relative === '' ||
        (!pathApi.isAbsolute(relative) &&
            relative !== '..' &&
            !relative.startsWith(`..${pathApi.sep}`))
    );
}

// Do not follow any user-selected symlink/junction, including intermediate components.
// This assumes other local processes cannot replace directories during an operation.
function pathPlan(root, input, allowRoot) {
    if (
        typeof input !== 'string' ||
        input.includes('\0') ||
        /^[a-z]:/i.test(input) ||
        input.startsWith('\\\\') ||
        input.includes('\\')
    ) {
        throw new HttpError(400, '非法文件路径');
    }
    const segments = input.replace(/^\/+/, '').split('/').filter(Boolean);
    if (segments.some((segment) => segment === '..' || segment.startsWith('.'))) {
        throw new HttpError(403, '不允许访问隐藏文件、临时文件或上级目录');
    }
    const fullPath = path.resolve(root, ...segments);
    if (!validatePath(fullPath, root) || (!allowRoot && fullPath === root)) {
        throw new HttpError(403, '不允许操作共享根目录或访问目录外的文件');
    }
    return { fullPath, segments };
}

export function resolveSafePath(root, input, { allowRoot = true, mustExist = true } = {}) {
    const { fullPath, segments } = pathPlan(root, input, allowRoot);
    let current = root;
    for (let index = 0; index < segments.length; index++) {
        current = path.join(current, segments[index]);
        try {
            const info = fs.lstatSync(current);
            if (info.isSymbolicLink()) throw new HttpError(403, '不允许访问软链接或目录联接');
            if (index < segments.length - 1 && !info.isDirectory()) {
                throw new HttpError(400, '父路径不是目录');
            }
        } catch (error) {
            if (error.code === 'ENOENT' && !mustExist && index === segments.length - 1) break;
            if (error.code === 'ENOENT') throw new HttpError(404, '文件或文件夹不存在');
            throw error;
        }
    }
    return fullPath;
}

export async function resolveSafePathAsync(
    root,
    input,
    { allowRoot = true, mustExist = true } = {},
) {
    const { fullPath, segments } = pathPlan(root, input, allowRoot);
    let current = root;
    for (let index = 0; index < segments.length; index++) {
        current = path.join(current, segments[index]);
        try {
            const info = await fs.promises.lstat(current);
            if (info.isSymbolicLink()) throw new HttpError(403, '不允许访问软链接或目录联接');
            if (index < segments.length - 1 && !info.isDirectory())
                throw new HttpError(400, '父路径不是目录');
        } catch (error) {
            if (error.code === 'ENOENT' && !mustExist && index === segments.length - 1) break;
            if (error.code === 'ENOENT') throw new HttpError(404, '文件或文件夹不存在');
            throw error;
        }
    }
    return fullPath;
}

export const BLOCKED_EXTENSIONS = new Set([
    '.html',
    '.htm',
    '.xhtml',
    '.shtml',
    '.js',
    '.mjs',
    '.mhtml',
    '.svg',
    '.xml',
]);

export function fixUploadFilename(name) {
    if (typeof name !== 'string' || !name) throw new HttpError(400, '缺少文件名');
    let fixed = name;
    if (!/[^\u0000-\u00ff]/.test(fixed) && /[\u0080-\u00ff]/.test(fixed)) {
        const converted = Buffer.from(fixed, 'latin1').toString('utf8');
        if (/[^\u0000-\u00ff]/.test(converted) && !converted.includes('\ufffd')) fixed = converted;
    }
    fixed = path.win32
        .basename(fixed)
        .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
        .replace(/[. ]+$/, '');
    if (
        !fixed ||
        fixed.startsWith('.') ||
        /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(fixed) ||
        Buffer.byteLength(fixed) > 240
    ) {
        throw new HttpError(400, '不支持该文件名');
    }
    if (BLOCKED_EXTENSIONS.has(path.extname(fixed).toLowerCase())) {
        throw new HttpError(400, '该类型文件不允许上传或重命名为此类型');
    }
    return fixed;
}

// Atomic no-replace publication of a regular file on the same filesystem.
export async function publishFile(tempPath, finalPath) {
    try {
        await fs.promises.link(tempPath, finalPath);
    } catch (error) {
        if (error.code === 'EEXIST') throw new HttpError(409, '目标文件已存在');
        throw error; // Never fall back to a rename which could overwrite another file.
    }
    await fs.promises.unlink(tempPath);
}

export async function mapLimit(items, limit, action) {
    const output = new Array(items.length);
    let cursor = 0;
    await Promise.all(
        Array.from({ length: Math.min(limit, items.length) }, async () => {
            while (cursor < items.length) {
                const index = cursor++;
                output[index] = await action(items[index], index);
            }
        }),
    );
    return output;
}
