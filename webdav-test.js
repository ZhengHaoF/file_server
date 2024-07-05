const WebdavCli = require("./webdav-server");
const config = {
    // 设置WebDAV服务器的根文件夹路径
    path:  "./webdav-root",
    // 设置WebDAV服务器要监听的主机地址，留空则使用系统默认或配置文件中指定的
    host:  "",
    // 设置WebDAV服务器要监听的端口
    port:  1900,
    // 是否启用摘要认证，false表示不启用
    digest:  false,
    // 设置基本/摘要认证的用户名
    username: "root",
    // 设置基本/摘要认证的密码
    password:  "root",
    // 目录
    directory: "",
    //显示自动索引
    autoIndex:  false,
    // 是否启用HTTPS
    ssl: false,
    // SSL密钥文件路径，留空则表示不使用自定义密钥
    sslKey: "",
    // SSL证书文件路径，留空则表示不使用自定义证书
    sslCert:  "",
    // 禁用认证，true表示禁用所有形式的认证
    disableAuthentication:  true,
    // 设置访问权限，这里指定为['all']，表示允许所有权限（具体实现可能依赖于服务器配置）
    /* 具体配置
        | 'all' | 所有权限 |
        | 'canCreate' | 可以创建文件或目录 |
        | 'canDelete' | 可以删除文件或目录 |
        | 'canMove' | 可以移动文件或目录 |
        | 'canRename' | 可以重命名文件或目录 |
        | 'canAppend' | 可以向文件追加内容 |
        | 'canWrite' | 可以写入文件 |
        | 'canRead' | 可以读取文件或目录内容 |
        | 'canSource' | 可以作为源（例如，用于复制或下载） |
        | 'canGetMimeType' | 可以获取文件的MIME类型 |
        | 'canGetSize' | 可以获取文件或目录的大小 |
        | 'canListLocks' | 可以列出文件或目录上的锁 |
        | 'canSetLock' | 可以设置文件或目录上的锁 |
        | 'canRemoveLock' | 可以移除文件或目录上的锁 |
        | 'canGetAvailableLocks' | 可以获取可用的锁类型或状态 |
        | 'canGetLock' | 可以获取文件或目录上的当前锁信息 |
        | 'canAddChild' | 可以向目录添加子项（文件或子目录） |
        | 'canRemoveChild' | 可以从目录中移除子项 |
        | 'canGetChildren' | 可以获取目录的子项列表 |
        | 'canSetProperty' | 可以设置文件或目录的属性 |
        | 'canGetProperty' | 可以获取文件或目录的特定属性 |
        | 'canGetProperties' | 可以获取文件或目录的所有属性 |
        | 'canRemoveProperty' | 可以移除文件或目录的特定属性 |
        | 'canGetCreationDate' | 可以获取文件或目录的创建日期 |
        | 'canGetLastModifiedDate' | 可以获取文件或目录的最后修改日期 |
        | 'canGetWebName' | 可以获取文件或目录的网络名称（例如，URL路径） |
        | 'canGetType' | 可以获取文件或目录的类型（例如，文件、目录） |
    */
    rights: ['all']
};
const run = async () => {
    const webdavCli = new WebdavCli.WebdavCli(config);
    const webdavCliServer = await webdavCli.start();
    webdavCliServer.on('log', (ctx, fs, path, log) => console.log(log));
};
run();
