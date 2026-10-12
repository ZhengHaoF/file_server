# Build from the repository root: docker build -f server-rust/Dockerfile .
FROM node:22-bookworm-slim AS frontend
WORKDIR /src
COPY package.json assemble.js ./
COPY web/ ./web/
COPY admin/ ./admin/
RUN npm --prefix web ci && npm --prefix admin ci && npm run assemble

FROM rust:bookworm AS rust
WORKDIR /src/server-rust
COPY server-rust/Cargo.toml server-rust/Cargo.lock ./
COPY server-rust/src/ ./src/
RUN cargo build --release --locked

FROM debian:bookworm-slim AS runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends libvips-tools ffmpeg ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 10001 fileserve \
    && useradd --uid 10001 --gid fileserve --no-create-home --shell /usr/sbin/nologin fileserve \
    && mkdir -p /app/files /var/lib/file-serve/data /var/lib/file-serve/cache \
    && chown -R fileserve:fileserve /app/files /var/lib/file-serve
WORKDIR /app
COPY --from=rust /src/server-rust/target/release/file-server /app/file-server
COPY --from=frontend /src/server-rust/static /app/static
ENV FILE_SERVER_ROOT=/app/files \
    FILE_SERVER_DATA_DIR=/var/lib/file-serve/data \
    FILE_SERVER_CACHE_DIR=/var/lib/file-serve/cache \
    FILE_SERVER_STATIC_DIR=/app/static \
    FILE_SERVER_HOST=0.0.0.0 \
    FILE_SERVER_PORT=3000
USER 10001:10001
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail --silent http://127.0.0.1:3000/health/ready || exit 1
ENTRYPOINT ["/app/file-server"]
