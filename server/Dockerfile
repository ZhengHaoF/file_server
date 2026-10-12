FROM node:22-bookworm-slim AS deps
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-bookworm-slim
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY index.js app.js configuration.js clean.js start.js sqllite.js config.json mime.json ./
COPY utils ./utils/
COPY middleware ./middleware/
COPY routes ./routes/
COPY services ./services/
COPY web ./web/
COPY admin/dist ./admin/dist/
RUN mkdir -p files data/imgCache logs && chown -R node:node /usr/src/app
ENV NODE_ENV=production \
    FILE_SERVER_MANAGED=1 \
    FILE_SERVER_CONTAINER=1 \
    FILE_SERVER_ROOT=/usr/src/app/files \
    FILE_SERVER_DATA_DIR=/usr/src/app/data \
    FILE_SERVER_CACHE_DIR=/usr/src/app/data/imgCache
USER node
VOLUME ["/usr/src/app/data"]
EXPOSE 3000
CMD ["node", "index.js"]
