import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { normalizeConfig } from '../configuration.js';
import { Sql } from '../sqllite.js';
import { createAdminRuntime } from '../services/adminRuntime.js';
import { mapLimit } from '../utils/fileSafety.js';

// Synthetic, disposable fixtures only. Never point this benchmark at user data.
const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'file-server-benchmark-'));
let sql;
let runtime;
try {
    await fs.promises.mkdir(path.join(directory, 'files'));
    const config = normalizeConfig(
        {
            rootPath: path.join(directory, 'files'),
            dataPath: path.join(directory, 'data'),
            imgCache: path.join(directory, 'cache'),
        },
        directory,
        {},
    );
    sql = new Sql(config.imgCache, config.dbPath);
    const logsDir = path.join(directory, 'logs');
    await fs.promises.mkdir(logsDir);
    runtime = createAdminRuntime(
        config,
        sql,
        { info() {}, warn() {}, error() {} },
        {
            stats: () => ({}),
            beginMaintenance: async () => {},
            endMaintenance() {},
        },
        { cwd: directory, logsDir, env: {} },
    );
    const keys = Array.from({ length: 10000 }, (_, index) => index.toString(16).padStart(64, '0'));
    await mapLimit(keys, 16, (key) =>
        fs.promises.writeFile(path.join(config.imgCache, key + '.jpg'), 'fixture'),
    );
    sql.db.transaction(() => {
        for (const key of keys) sql.insertInfo(key, '.jpg', 'image');
    })();
    const lstat = fs.promises.lstat;
    let calls = 0;
    fs.promises.lstat = async (...args) => {
        if (String(args[0]).startsWith(config.imgCache + path.sep)) calls++;
        return lstat(...args);
    };
    let cache;
    try {
        const started = performance.now();
        await Promise.all(Array.from({ length: 4 }, () => runtime.stats(true)));
        cache = {
            files: keys.length,
            concurrentRequests: 4,
            lstatCalls: calls,
            wallTimeMs: Math.round(performance.now() - started),
        };
    } finally {
        fs.promises.lstat = lstat;
    }
    const logFile = path.join(logsDir, 'app.log');
    const rows = Array.from(
        { length: 100000 },
        (_, index) =>
            `[${new Date(1760000000000 + index).toISOString()}] [INFO] [default] fixture ${index}\n`,
    );
    await fs.promises.writeFile(logFile, rows.join(''));
    const logs = [];
    for (const order of ['time', 'append']) {
        const elapsedMs = [];
        for (let index = 0; index < 3; index++) {
            const started = performance.now();
            const result = await runtime.logs.query({ limit: 100, order });
            if (result.logs.length !== 100) throw new Error('Unexpected result count');
            elapsedMs.push(Math.round(performance.now() - started));
        }
        logs.push({
            order,
            lines: rows.length,
            bytes: (await fs.promises.stat(logFile)).size,
            elapsedMs,
        });
    }
    console.log(
        JSON.stringify(
            {
                environment: {
                    node: process.version,
                    cpuCount: os.cpus().length,
                    fixture: 'isolated local filesystem, warm metadata; not a NAS capacity test',
                },
                cache,
                logs,
            },
            null,
            2,
        ),
    );
} finally {
    await runtime?.close();
    sql?.close();
    await fs.promises.rm(directory, { recursive: true, force: true });
}
