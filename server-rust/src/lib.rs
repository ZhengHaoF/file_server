//! Rust file server: shared-folder HTTP API, previews, admin console API and static UI hosting.

pub mod admin;
pub mod app;
pub mod auth;
pub mod config;
pub mod db;
pub mod error;
pub mod files;
pub mod http;
pub mod logging;
pub mod paths;
pub mod previews;
pub mod search;
pub mod server;
pub mod state;
pub mod web;

use state::{ListenerStatus, Options, SharedState};
use std::net::SocketAddr;

/// Exit code asking the supervisor to start a fresh process.
pub const RESTART_EXIT_CODE: i32 = 75;

pub struct Running {
    pub state: SharedState,
    pub http_addr: SocketAddr,
    pub https_addr: Option<SocketAddr>,
    pub task: tokio::task::JoinHandle<i32>,
}

fn bind_addr(host: &str, port: u16) -> String {
    if host.contains(':') && !host.starts_with('[') {
        format!("[{host}]:{port}")
    } else {
        format!("{host}:{port}")
    }
}

/// Open the database, bind listeners and spawn background work. Resolves to the exit code.
pub async fn start(config: config::Config, options: Options) -> Result<Running, String> {
    // Fail closed: validate TLS and bind every listener before anything accepts a connection.
    let tls = if config.https_enabled {
        Some(server::load_tls(&config.cert_path, &config.key_path).map_err(|e| format!("HTTPS 已启用但无法启动，服务未启动: {e}"))?)
    } else {
        None
    };
    let listener = tokio::net::TcpListener::bind(bind_addr(&config.host, config.port))
        .await
        .map_err(|e| format!("HTTP 端口 {}:{} 无法监听: {e}", config.host, config.port))?;
    let http_addr = listener.local_addr().map_err(|e| e.to_string())?;
    let https = match tls {
        Some(acceptor) => {
            let l = tokio::net::TcpListener::bind(bind_addr(&config.host, config.https_port))
                .await
                .map_err(|e| format!("HTTPS 已启用但端口 {}:{} 无法监听，服务未启动: {e}", config.host, config.https_port))?;
            Some((l, acceptor))
        }
        None => None,
    };
    let https_addr = match &https {
        Some((l, _)) => Some(l.local_addr().map_err(|e| e.to_string())?),
        None => None,
    };
    let db = db::Db::open(&config.db_path).map_err(|e| format!("数据库无法打开 {}: {e}", config.db_path.display()))?;
    let state = state::AppState::new(config.clone(), db, options);
    let router = app::build(state.clone());
    let mut tasks = Vec::new();
    state.set_listener(false, ListenerStatus::Running);
    logging::info("server", &format!("HTTP 服务已启动: http://{http_addr}"));
    tasks.push(tokio::spawn(server::serve(
        listener,
        router.clone(),
        server::Scheme::Http,
        None,
        state.shutdown.clone(),
    )));
    if let Some((listener, acceptor)) = https {
        state.set_listener(true, ListenerStatus::Running);
        logging::info("server", &format!("HTTPS 服务已启动: https://{}", https_addr.unwrap()));
        tasks.push(tokio::spawn(server::serve(
            listener,
            router,
            server::Scheme::Https,
            Some(acceptor),
            state.shutdown.clone(),
        )));
    }
    tokio::spawn(admin::status::sample_loop(state.clone()));
    tokio::spawn(admin::cache::policy_loop(state.clone()));
    let waiting = state.clone();
    let task = tokio::spawn(async move {
        waiting.shutdown.wait().await;
        for task in tasks {
            let _ = task.await;
        }
        waiting.set_listener(false, ListenerStatus::Stopped);
        if waiting.startup.https_enabled {
            waiting.set_listener(true, ListenerStatus::Stopped);
        }
        let code = waiting.shutdown.exit_code.load(std::sync::atomic::Ordering::SeqCst);
        logging::info("server", &format!("服务已停止 (exit {code})"));
        code
    });
    Ok(Running {
        state,
        http_addr,
        https_addr,
        task,
    })
}
