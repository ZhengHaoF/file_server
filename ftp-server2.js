//被动模式FTP
const {networkInterfaces} = require('os');
const {Netmask} = require('netmask');
const FtpSrv = require('ftp-srv');
const GeneralError = require('ftp-srv');
const {Errors} = require("webdav-server");
const nets = networkInterfaces();

class FtpServer {
    constructor(config) {
        this.ftpConfig = {
            anonymous: Boolean(config.anonymous),
            port: config.port,
            root: config.root || "./"
        }
        console.log(this.ftpConfig, 123456)
    }

    getNetworks() {
        let networks = {};
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                    networks[net.address + "/24"] = net.address
                }
            }
        }
        return networks;
    }

    resolverFunction(address) {
        // const networks = {
        //     '$GATEWAY_IP/32': `${public_ip}`,
        //     '10.0.0.0/8'    : `${lan_ip}`
        // }
        const networks = this.getNetworks();
        for (const network in networks) {
            if (new Netmask(network).contains(address)) {
                return networks[network];
            }
        }
        return "127.0.0.1";
    }


    ftpRun() {
        const ftpServer = new FtpSrv({
            url: "ftp://0.0.0.0:" + this.ftpConfig.port,
            anonymous: true,
            pasv_url: this.resolverFunction,
        });
        ftpServer.listen().then(() => {
            console.log("FPT服务 运行在：ftp://0.0.0.0:" + this.ftpConfig.port)
        });
        ftpServer.on('login', ({connection, username, password}, resolve, reject) => {
            // console.log(connection.id,"用户")
            if (this.ftpConfig.anonymous === false) {
                if (username === this.ftpConfig.username && password === this.ftpConfig.password) {
                    return resolve({root: this.ftpConfig.root});
                } else {
                    reject(new GeneralError("Invalid username or password", 401));
                    return ftpServer.disconnectClient(connection.id).then();
                }
            } else {
                return resolve({root: this.ftpConfig.root});
            }
        });


    }

}

exports.FtpServer = FtpServer;