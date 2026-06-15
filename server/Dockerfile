# ========== 阶段 1：安装依赖 ==========
FROM node:18-alpine AS deps

WORKDIR /usr/src/app

# 配置镜像源加速
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --update --no-cache \
    python3 python3-dev py3-pip py3-setuptools \
    build-base sharp

# 先复制 package.json 以利用 Docker 缓存层
COPY package*.json ./

RUN npm config set -g registry https://registry.npmmirror.com/
RUN npm install --omit=dev

# ========== 阶段 2：运行镜像 ==========
FROM node:18-alpine

WORKDIR /usr/src/app

# 安装运行时必要的原生模块依赖
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --update --no-cache sharp

# 从 deps 阶段复制 node_modules
COPY --from=deps /usr/src/app/node_modules ./node_modules

# 复制应用源码
COPY index.js clean.js init.js start.js sqllite.js config.json ./
COPY utils ./utils/
COPY middleware ./middleware/
COPY routes ./routes/
COPY cert ./cert/
COPY web ./web/

# 初始化缓存目录
RUN mkdir -p imgCache logs

# 运行初始化脚本（清空旧缓存、建立数据库表）
RUN node init.js

EXPOSE 3000 3001

CMD ["sh", "-c", "node clean.js && node start.js"]
