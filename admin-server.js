import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3008;

// 有构建好的 dist 就托管，没有就不启动服务
if (fs.existsSync('admin/dist')) {
    app.use(express.static('admin/dist'));
    app.listen(PORT, () => {
        console.log(`Admin 后台运行在: http://localhost:${PORT}`);
    });
}
