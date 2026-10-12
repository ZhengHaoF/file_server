//! TCP/TLS accept loops on hyper-util with header timeouts and bounded graceful shutdown.

use crate::state::Shutdown;
use axum::body::Body;
use axum::extract::ConnectInfo;
use axum::Router;
use hyper::body::Incoming;
use hyper_util::rt::{TokioExecutor, TokioIo, TokioTimer};
use hyper_util::server::conn::auto;
use hyper_util::server::graceful::GracefulShutdown;
use std::path::Path;
use std::sync::Arc;
use std::time::Duration;
use tokio::net::TcpListener;
use tokio_rustls::TlsAcceptor;
use tower::ServiceExt;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Scheme {
    Http,
    Https,
}

pub const HEADER_TIMEOUT: Duration = Duration::from_secs(15);
pub const DRAIN_TIMEOUT: Duration = Duration::from_secs(10);
/// Maximum concurrently served connections per listener; excess connections are closed.
pub const MAX_CONNECTIONS: usize = 256;

pub fn load_tls(cert: &Path, key: &Path) -> Result<TlsAcceptor, String> {
    let certs = rustls_pemfile::certs(&mut std::io::BufReader::new(
        std::fs::File::open(cert).map_err(|e| format!("证书无法读取: {e}"))?,
    ))
    .collect::<Result<Vec<_>, _>>()
    .map_err(|e| format!("证书格式错误: {e}"))?;
    if certs.is_empty() {
        return Err("证书文件中没有证书".into());
    }
    let key = rustls_pemfile::private_key(&mut std::io::BufReader::new(
        std::fs::File::open(key).map_err(|e| format!("私钥无法读取: {e}"))?,
    ))
    .map_err(|e| format!("私钥格式错误: {e}"))?
    .ok_or("私钥文件中没有私钥")?;
    let provider = Arc::new(tokio_rustls::rustls::crypto::ring::default_provider());
    let mut config = tokio_rustls::rustls::ServerConfig::builder_with_provider(provider)
        .with_safe_default_protocol_versions()
        .map_err(|e| e.to_string())?
        .with_no_client_auth()
        .with_single_cert(certs, key)
        .map_err(|e| format!("证书与私钥不匹配: {e}"))?;
    config.alpn_protocols = vec![b"h2".to_vec(), b"http/1.1".to_vec()];
    Ok(TlsAcceptor::from(Arc::new(config)))
}

pub async fn serve(listener: TcpListener, router: Router, scheme: Scheme, tls: Option<TlsAcceptor>, shutdown: Shutdown) {
    let graceful = GracefulShutdown::new();
    let slots = Arc::new(tokio::sync::Semaphore::new(MAX_CONNECTIONS));
    let mut warned = false;
    loop {
        let (stream, addr) = tokio::select! {
            accepted = listener.accept() => match accepted {
                Ok(pair) => pair,
                Err(e) => {
                    crate::logging::warn("server", &format!("接受连接失败: {e}"));
                    tokio::time::sleep(Duration::from_millis(50)).await;
                    continue;
                }
            },
            _ = shutdown.wait() => break,
        };
        let Ok(permit) = slots.clone().try_acquire_owned() else {
            if !warned {
                crate::logging::warn("server", &format!("活跃连接已达上限 {MAX_CONNECTIONS}，新连接将被关闭"));
                warned = true;
            }
            drop(stream);
            continue;
        };
        warned = false;
        let _ = stream.set_nodelay(true);
        let router = router.clone();
        let watcher = graceful.watcher();
        let tls = tls.clone();
        tokio::spawn(async move {
            let _permit = permit;
            let service = hyper::service::service_fn(move |mut request: hyper::Request<Incoming>| {
                request.extensions_mut().insert(ConnectInfo(addr));
                request.extensions_mut().insert(scheme);
                router.clone().oneshot(request.map(Body::new))
            });
            let mut builder = auto::Builder::new(TokioExecutor::new());
            builder.http1().timer(TokioTimer::new()).header_read_timeout(HEADER_TIMEOUT);
            builder.http2().timer(TokioTimer::new());
            match tls {
                Some(acceptor) => {
                    let Ok(Ok(stream)) = tokio::time::timeout(HEADER_TIMEOUT, acceptor.accept(stream)).await else {
                        return;
                    };
                    let conn = builder.serve_connection_with_upgrades(TokioIo::new(stream), service).into_owned();
                    let _ = watcher.watch(conn).await;
                }
                None => {
                    let conn = builder.serve_connection_with_upgrades(TokioIo::new(stream), service).into_owned();
                    let _ = watcher.watch(conn).await;
                }
            }
        });
    }
    drop(listener);
    if tokio::time::timeout(DRAIN_TIMEOUT, graceful.shutdown()).await.is_err() {
        crate::logging::warn("server", "部分连接未在 10 秒内结束，已强制关闭");
    }
}
