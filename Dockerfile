# 使用官方的Node.js 18镜像作为基础镜像
FROM node:18

# 设置工作目录为/usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm config set -g registry https://registry.npmmirror.com/

# 安装项目依赖
RUN npm install

# 将当前目录下的所有文件复制到容器内的/usr/src/app目录下
COPY clean.js ./
COPY config.json ./
COPY ftp-server.js ./
COPY ftp-server2.js ./
COPY imgCache.db ./
COPY index.js ./
COPY init.js ./
COPY mime.json ./
COPY package-lock.json ./
COPY package.json ./
COPY README.md ./
COPY rollup.config.mjs ./
COPY sqllite.js ./
COPY webdav-server.js ./
COPY webdav-test.js ./

# 复制目录及其内容到镜像的根目录下
COPY cert ./cert/
COPY dist ./dist/
COPY img ./img/
COPY imgCache ./imgCache/
COPY logs ./logs/
COPY utils ./utils/
COPY web ./web/


# 设置容器启动时执行的命令
CMD ["node", "index.js"]