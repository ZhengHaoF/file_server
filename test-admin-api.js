/**
 * 管理后台 API 测试用例
 * 运行方式: node test-admin-api.js
 * 注意: 需要先启动服务器 node index.js
 */

const BASE_URL = 'http://localhost:3000';
const ADMIN_TOKEN = '123456'; // 与 config.json 中的 restartPwd 一致

// 测试结果统计
let passed = 0;
let failed = 0;

/**
 * 发送 HTTP 请求
 */
async function request(method, path, body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Admin-Token': ADMIN_TOKEN
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();

    return {
        status: response.status,
        data
    };
}

/**
 * 断言函数
 */
function assert(condition, testName) {
    if (condition) {
        console.log(`✅ ${testName}`);
        passed++;
    } else {
        console.log(`❌ ${testName}`);
        failed++;
    }
}

/**
 * 测试服务器状态接口
 */
async function testStatus() {
    console.log('\n📊 测试服务器状态接口 (GET /api/admin/status)');

    const { status, data } = await request('GET', '/api/admin/status');

    assert(status === 200, '状态码应为 200');
    assert(data.cpu !== undefined, '应包含 cpu 字段');
    assert(data.cpu.usage !== undefined, 'cpu 应包含 usage 字段');
    assert(data.cpu.cores !== undefined, 'cpu 应包含 cores 字段');
    assert(data.memory !== undefined, '应包含 memory 字段');
    assert(data.memory.total !== undefined, 'memory 应包含 total 字段');
    assert(data.memory.used !== undefined, 'memory 应包含 used 字段');
    assert(data.memory.free !== undefined, 'memory 应包含 free 字段');
    assert(data.memory.usage !== undefined, 'memory 应包含 usage 字段');
    assert(data.disk !== undefined, '应包含 disk 字段');
    assert(data.disk.total !== undefined, 'disk 应包含 total 字段');
    assert(data.disk.used !== undefined, 'disk 应包含 used 字段');
    assert(data.disk.free !== undefined, 'disk 应包含 free 字段');
    assert(data.disk.usage !== undefined, 'disk 应包含 usage 字段');
    assert(data.server !== undefined, '应包含 server 字段');
    assert(data.server.uptime !== undefined, 'server 应包含 uptime 字段');
    assert(data.server.nodeVersion !== undefined, 'server 应包含 nodeVersion 字段');
    assert(data.server.httpPort !== undefined, 'server 应包含 httpPort 字段');
    assert(data.server.httpsPort !== undefined, 'server 应包含 httpsPort 字段');
    assert(data.server.httpStatus !== undefined, 'server 应包含 httpStatus 字段');
    assert(data.server.httpsStatus !== undefined, 'server 应包含 httpsStatus 字段');
}

/**
 * 测试缓存统计接口
 */
async function testCacheStats() {
    console.log('\n📦 测试缓存统计接口 (GET /api/admin/cache/stats)');

    const { status, data } = await request('GET', '/api/admin/cache/stats');

    assert(status === 200, '状态码应为 200');
    assert(data.totalFiles !== undefined, '应包含 totalFiles 字段');
    assert(data.totalSize !== undefined, '应包含 totalSize 字段');
    assert(data.imageCache !== undefined, '应包含 imageCache 字段');
    assert(data.imageCache.count !== undefined, 'imageCache 应包含 count 字段');
    assert(data.imageCache.size !== undefined, 'imageCache 应包含 size 字段');
    assert(data.videoCache !== undefined, '应包含 videoCache 字段');
    assert(data.videoCache.count !== undefined, 'videoCache 应包含 count 字段');
    assert(data.videoCache.size !== undefined, 'videoCache 应包含 size 字段');
    assert(data.dbSize !== undefined, '应包含 dbSize 字段');
}

/**
 * 测试缓存清理接口
 */
async function testCacheClean() {
    console.log('\n🧹 测试缓存清理接口 (POST /api/admin/cache/clean)');

    // 测试缺少参数
    const { status: status1, data: data1 } = await request('POST', '/api/admin/cache/clean', {});
    assert(status1 === 400, '缺少参数时应返回 400');

    // 测试按天数清理
    const { status: status2, data: data2 } = await request('POST', '/api/admin/cache/clean', { days: 365 });
    assert(status2 === 200, '按天数清理应返回 200');
    assert(data2.cleaned !== undefined, '应返回 cleaned 字段');

    // 测试清空全部缓存
    const { status: status3, data: data3 } = await request('POST', '/api/admin/cache/clean', { all: true });
    assert(status3 === 200, '清空全部缓存应返回 200');
    assert(data3.cleaned !== undefined, '应返回 cleaned 字段');
}

/**
 * 测试日志查询接口
 */
async function testLogs() {
    console.log('\n📝 测试日志查询接口 (GET /api/admin/logs)');

    // 测试默认查询
    const { status: status1, data: data1 } = await request('GET', '/api/admin/logs');
    assert(status1 === 200, '状态码应为 200');
    assert(data1.total !== undefined, '应包含 total 字段');
    assert(data1.logs !== undefined, '应包含 logs 字段');
    assert(Array.isArray(data1.logs), 'logs 应为数组');

    // 测试按级别筛选
    const { status: status2, data: data2 } = await request('GET', '/api/admin/logs?level=info');
    assert(status2 === 200, '按级别筛选应返回 200');

    // 测试按关键词筛选
    const { status: status3, data: data3 } = await request('GET', '/api/admin/logs?keyword=request');
    assert(status3 === 200, '按关键词筛选应返回 200');

    // 测试限制数量
    const { status: status4, data: data4 } = await request('GET', '/api/admin/logs?limit=10');
    assert(status4 === 200, '限制数量应返回 200');
    assert(data4.logs.length <= 10, '日志数量应不超过限制');
}

/**
 * 测试配置查看接口
 */
async function testConfig() {
    console.log('\n⚙️ 测试配置查看接口 (GET /api/admin/config)');

    const { status, data } = await request('GET', '/api/admin/config');

    assert(status === 200, '状态码应为 200');
    assert(data.rootPath !== undefined, '应包含 rootPath 字段');
    assert(data.imgCache !== undefined, '应包含 imgCache 字段');
    assert(data.restartPwd !== undefined, '应包含 restartPwd 字段');
    assert(data.restartPwd === '******', 'restartPwd 应被脱敏');
    assert(!data.rootPath.includes('C:\\Users'), 'rootPath 应被脱敏');
}

/**
 * 测试数据库状态接口
 */
async function testDatabaseStatus() {
    console.log('\n💾 测试数据库状态接口 (GET /api/admin/database/status)');

    const { status, data } = await request('GET', '/api/admin/database/status');

    assert(status === 200, '状态码应为 200');
    assert(data.dbPath !== undefined, '应包含 dbPath 字段');
    assert(data.dbSize !== undefined, '应包含 dbSize 字段');
    assert(data.recordCount !== undefined, '应包含 recordCount 字段');
    assert(data.tables !== undefined, '应包含 tables 字段');
    assert(Array.isArray(data.tables), 'tables 应为数组');
    assert(data.tables.includes('image'), 'tables 应包含 image 表');
}

/**
 * 测试认证失败情况
 */
async function testAuthFailure() {
    console.log('\n🔒 测试认证失败情况');

    // 测试缺少 token
    const response1 = await fetch(`${BASE_URL}/api/admin/status`);
    assert(response1.status === 401, '缺少 token 应返回 401');

    // 测试错误的 token
    const response2 = await fetch(`${BASE_URL}/api/admin/status`, {
        headers: { 'X-Admin-Token': 'wrong-token' }
    });
    assert(response2.status === 401, '错误的 token 应返回 401');
}

/**
 * 运行所有测试
 */
async function runTests() {
    console.log('🚀 开始测试管理后台 API...\n');
    console.log('⚠️  请确保服务器已启动: node index.js\n');

    try {
        await testAuthFailure();
        await testStatus();
        await testCacheStats();
        await testCacheClean();
        await testLogs();
        await testConfig();
        await testDatabaseStatus();

        console.log('\n' + '='.repeat(50));
        console.log(`📊 测试结果: ${passed} 通过, ${failed} 失败`);
        console.log('='.repeat(50));

        if (failed > 0) {
            process.exit(1);
        }
    } catch (err) {
        console.error('\n❌ 测试执行失败:', err.message);
        process.exit(1);
    }
}

runTests();
