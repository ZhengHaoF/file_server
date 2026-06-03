// Range 请求测试脚本
// 用法: node test-range.js [base_url]

const baseUrl = process.argv[2] || 'http://192.168.8.185:3000';
const filePath = '/getFile/%E8%A7%86%E9%A2%91%20(8).mp4';
const url = baseUrl + filePath;

let passed = 0;
let failed = 0;

function log(msg) {
    console.log(`  ${msg}`);
}

async function request(rangeHeader) {
    const headers = {};
    if (rangeHeader) headers['Range'] = rangeHeader;
    const res = await fetch(url, { headers });
    return res;
}

async function testNormalGet() {
    console.log('\n[测试1] 普通GET请求（无Range头）');
    const res = await request(null);
    log(`状态码: ${res.status} (期望: 200)`);
    log(`Accept-Ranges: ${res.headers.get('accept-ranges')}`);
    const size = parseInt(res.headers.get('content-length'), 10);
    log(`Content-Length: ${size}`);

    if (res.status === 200) {
        log('✅ 通过');
        passed++;
    } else {
        log('❌ 失败');
        failed++;
    }
    return size;
}

async function testRangeRequest(fileSize) {
    console.log('\n[测试2] Range请求 - 前1024字节');
    const res = await request('bytes=0-1023');
    log(`状态码: ${res.status} (期望: 206)`);
    log(`Content-Range: ${res.headers.get('content-range')}`);
    log(`Content-Length: ${res.headers.get('content-length')}`);
    log(`Content-Type: ${res.headers.get('content-type')}`);

    const body = Buffer.from(await res.arrayBuffer());
    log(`实际接收字节: ${body.length}`);

    if (res.status === 206 && body.length === 1024) {
        log('✅ 通过');
        passed++;
    } else {
        log('❌ 失败');
        failed++;
    }
}

async function testRangeMiddle(fileSize) {
    console.log('\n[测试3] Range请求 - 中间区间');
    const start = Math.floor(fileSize / 2);
    const end = start + 1023;
    const res = await request(`bytes=${start}-${end}`);
    log(`请求: bytes=${start}-${end}`);
    log(`状态码: ${res.status} (期望: 206)`);
    log(`Content-Range: ${res.headers.get('content-range')}`);

    const body = Buffer.from(await res.arrayBuffer());
    log(`实际接收字节: ${body.length}`);

    if (res.status === 206 && body.length === 1024) {
        log('✅ 通过');
        passed++;
    } else {
        log('❌ 失败');
        failed++;
    }
}

async function testRangeNoEnd(fileSize) {
    console.log('\n[测试4] Range请求 - 最后1024字节（无end）');
    const start = fileSize - 1024;
    const res = await request(`bytes=${start}-`);
    log(`请求: bytes=${start}-`);
    log(`状态码: ${res.status} (期望: 206)`);
    log(`Content-Range: ${res.headers.get('content-range')}`);

    const body = Buffer.from(await res.arrayBuffer());
    log(`实际接收字节: ${body.length}`);

    if (res.status === 206 && body.length === 1024) {
        log('✅ 通过');
        passed++;
    } else {
        log('❌ 失败');
        failed++;
    }
}

async function testRangeInvalid(fileSize) {
    console.log('\n[测试5] Range请求 - 超出文件大小');
    const start = fileSize + 1000;
    const res = await request(`bytes=${start}-`);
    log(`状态码: ${res.status} (期望: 416)`);
    log(`Content-Range: ${res.headers.get('content-range')}`);

    if (res.status === 416) {
        log('✅ 通过');
        passed++;
    } else {
        log('❌ 失败');
        failed++;
    }
}

async function testRangeReversed() {
    console.log('\n[测试6] Range请求 - start > end');
    const res = await request('bytes=1000-500');
    log(`状态码: ${res.status} (期望: 416)`);

    if (res.status === 416) {
        log('✅ 通过');
        passed++;
    } else {
        log('❌ 失败');
        failed++;
    }
}

async function testVideoPlaybackSeek(fileSize) {
    console.log('\n[测试7] 模拟视频播放 - 多段Range请求（拖动进度条）');
    const positions = [
        0,
        Math.floor(fileSize * 0.25),
        Math.floor(fileSize * 0.5),
        Math.floor(fileSize * 0.75),
        fileSize - 1024
    ];

    let allOk = true;
    for (const pos of positions) {
        const res = await request(`bytes=${pos}-${pos + 8191}`);
        if (res.status !== 206) {
            log(`  ❌ position=${pos}, status=${res.status}`);
            allOk = false;
            continue;
        }
        const body = Buffer.from(await res.arrayBuffer());
        const expected = Math.min(8192, fileSize - pos);
        if (body.length !== expected) {
            log(`  ❌ position=${pos}, expected=${expected}, got=${body.length}`);
            allOk = false;
        }
    }

    if (allOk) {
        log('✅ 通过（5个位置均返回206 + 正确字节数）');
        passed++;
    } else {
        log('❌ 失败');
        failed++;
    }
}

(async () => {
    console.log('='.repeat(50));
    console.log('Range 请求功能测试');
    console.log(`目标: ${url}`);
    console.log('='.repeat(50));

    try {
        const fileSize = await testNormalGet();
        if (!fileSize) {
            console.log('\n无法获取文件大小，请检查URL是否正确。');
            process.exit(1);
        }

        await testRangeRequest(fileSize);
        await testRangeMiddle(fileSize);
        await testRangeNoEnd(fileSize);
        await testRangeInvalid(fileSize);
        await testRangeReversed();
        await testVideoPlaybackSeek(fileSize);
    } catch (e) {
        console.error(`\n请求失败: ${e.message}`);
        console.error('请确保服务器已启动且URL可达。');
        process.exit(1);
    }

    console.log('\n' + '='.repeat(50));
    console.log(`结果: ${passed} 通过, ${failed} 失败`);
    console.log('='.repeat(50));

    process.exit(failed > 0 ? 1 : 0);
})();
