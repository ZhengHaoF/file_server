// JavaScript
const path_1 = require("path");
const fs = require("fs");
const webdav_server_1 = require("webdav-server");
class WebdavCli {
    constructor(config) {
        this.config = this.getConfig(config);
    }
    getConfig(config) {
        // console.log(config);
        const selfSignedKey = path_1.join(__dirname, '/cert/self-signed.key.pem');
        const selfSignedCert = path_1.join(__dirname, '/cert/self-signed.cert.pem');
        const path = config.path || process.cwd();
        const host = config.host || '127.0.0.1';
        const port = config.port || 1900;
        const digest = Boolean(config.digest);
        let username = config.username;
        let password = config.password;
        const ssl = Boolean(config.ssl);
        const sslKey = ssl ? fs.readFileSync(config.sslKey || selfSignedKey).toString() : '';
        const sslCert = ssl ? fs.readFileSync(config.sslCert || selfSignedCert).toString() : '';
        const disableAuthentication = Boolean(config.disableAuthentication);
        if (disableAuthentication) {
            config.rights = config.rights || ['canRead'];
            username = '';
            password = '';
        }
        const rights = (config.rights || ['all']);
        const url = `${ssl ? 'https' : 'http'}://${host}:${port}`;
        const directory = Boolean(config.directory);
        const autoIndex = Boolean(config.autoIndex);
        return {
            host, path, port, username, digest, password, ssl, sslCert,
            sslKey, rights, url, disableAuthentication, directory, autoIndex,
        };
    }
    async start() {
        const config = this.config;
        const userManager = new webdav_server_1.v2.SimpleUserManager();
        const user = userManager.addUser(config.username, config.password, false);
        const privilegeManager = new webdav_server_1.v2.SimplePathPrivilegeManager();
        privilegeManager.setRights(user, '/', config.rights);
        const authentication = config.digest ? 'HTTPDigestAuthentication' : 'HTTPBasicAuthentication';
        const server = new webdav_server_1.v2.WebDAVServer({
            httpAuthentication: config.disableAuthentication ? {
                askForAuthentication: () => ({}),
                getUser: (ctx, gotUserCallback) => {
                    userManager.getDefaultUser((defaultUser) => {
                        privilegeManager.setRights(defaultUser, '/', config.rights);
                        gotUserCallback(null, defaultUser);
                    });
                }
            } : new webdav_server_1.v2[authentication](userManager, 'Default realm'),
            privilegeManager: privilegeManager,
            https: config.ssl ? { cert: config.sslCert, key: config.sslKey } : null,
            port: config.port,
            hostname: config.host,
        });
        server.config = config;
        server.beforeRequest(async (ctx, next) => {
            if (config.directory) {
                const isBrowser = ctx.request.headers['user-agent'].search('Mozilla/5.0') !== -1;
                if (isBrowser) {
                    try {
                        const resource = await server.getResourceAsync(ctx, ctx.requested.uri);
                        const list = await resource.readDirAsync();
                        const uri = ctx.requested.uri.slice(-1) === '/' ? ctx.requested.uri : ctx.requested.uri + '/';
                        if (config.autoIndex && list.includes('index.html')) {
                            ctx.requested.path = `${uri}index.html`;
                        }
                        else {
                            const up = `<a href="${uri.split('/').slice(0, -2).join('/') || '/'}">..</a><br/>`;
                            const html = up + list.map(item => `<a href="${uri + item}">${item}</a><br/>`).join('');
                            ctx.response.end(`<html><head><meta charset="UTF-8"></head><body>${html}</body></html>`);
                        }
                    }
                    catch (_a) { }
                }
            }
            next();
        });
        server.afterRequest((arg, next) => {
            const log = `>> ${arg.request.method} ${arg.requested.uri} > ${arg.response.statusCode} ${arg.response.statusMessage}`;
            server.emit('log', null, null, '/', log);
            next();
        });
        await server.setFileSystemAsync('/', new webdav_server_1.v2.PhysicalFileSystem(config.path));
        await server.startAsync(config.port);
        const logs = [
            `WebDav 运行在： ${config.url}`,
            // `[rights]: ${config.rights}`,
            // `[digest]: ${config.digest}`,
            // `username: ${config.username}`,
            // `password: ${config.password}`,
        ];
        console.log(logs.join('\n'));
        return server;
    }
}
exports.WebdavCli = WebdavCli;
