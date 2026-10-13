//! Shared application state.

use crate::auth::{Auth, Identity};
use crate::config::{Config, Env};
use crate::db::Db;
use crate::previews::{Previews, Tools};
use serde_json::Value;
use std::sync::atomic::{AtomicI32, AtomicUsize, Ordering};
use std::sync::{Arc, Mutex, RwLock};
use tokio::sync::watch;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ListenerStatus {
    Running,
    Disabled,
    Stopped,
    Error,
}

impl ListenerStatus {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Running => "running",
            Self::Disabled => "disabled",
            Self::Stopped => "stopped",
            Self::Error => "error",
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Listeners {
    pub http: ListenerStatus,
    pub https: ListenerStatus,
}

/// Graceful shutdown signal shared by listeners, WebSockets and background tasks.
#[derive(Clone)]
pub struct Shutdown {
    sender: Arc<watch::Sender<bool>>,
    pub exit_code: Arc<AtomicI32>,
}

impl Default for Shutdown {
    fn default() -> Self {
        Self::new()
    }
}

impl Shutdown {
    pub fn new() -> Self {
        let (sender, _) = watch::channel(false);
        Self {
            sender: Arc::new(sender),
            exit_code: Arc::new(AtomicI32::new(0)),
        }
    }
    pub fn trigger(&self, code: i32) {
        self.exit_code.fetch_max(code, Ordering::SeqCst);
        self.sender.send_replace(true);
    }
    pub fn is_triggered(&self) -> bool {
        *self.sender.borrow()
    }
    pub async fn wait(&self) {
        let mut receiver = self.sender.subscribe();
        let _ = receiver.wait_for(|v| *v).await;
    }
}

pub struct Options {
    pub env: Env,
    pub managed: bool,
    pub deployment: String,
    pub tools: Tools,
    /// Exit code used for supervisor restarts.
    pub restart_exit_code: i32,
}

impl Options {
    pub fn from_env(env: Env) -> Self {
        let managed = env.get("FILE_SERVER_MANAGED") == Some("1");
        let deployment = env.get("FILE_SERVER_DEPLOYMENT").map(str::to_string).unwrap_or_else(|| {
            if managed {
                "supervisor".into()
            } else {
                "standalone".into()
            }
        });
        let tools = Tools::from_env(&env);
        Self {
            env,
            managed,
            deployment,
            tools,
            restart_exit_code: crate::RESTART_EXIT_CODE,
        }
    }
}

pub struct AppState {
    /// Live configuration (non-restart fields are updated by admin saves).
    pub config: RwLock<Config>,
    /// Configuration the listeners were started with.
    pub startup: Config,
    pub options: Options,
    pub auth: Auth,
    pub db: Arc<Db>,
    pub previews: Arc<Previews>,
    pub uploads_active: AtomicUsize,
    pub listeners: Mutex<Listeners>,
    pub shutdown: Shutdown,
    pub boot_id: String,
    pub started: std::time::Instant,
    pub audit_failures: AtomicUsize,
    pub admin: crate::admin::Runtime,
}

pub type SharedState = Arc<AppState>;

pub const UPLOAD_LIMIT: usize = 4;

impl AppState {
    pub fn new(config: Config, db: Db, options: Options) -> SharedState {
        let db = Arc::new(db);
        if let Err(e) = db.interrupt_unfinished() {
            crate::logging::error("admin", &format!("标记中断任务失败: {e}"));
        }
        let last_cleanup = db.last_cleanup_at().unwrap_or(None);
        let previews = Previews::new(config.img_cache.clone(), db.clone(), options.tools.clone());
        let https = if config.https_enabled {
            ListenerStatus::Stopped
        } else {
            ListenerStatus::Disabled
        };
        Arc::new(Self {
            startup: config.clone(),
            config: RwLock::new(config),
            options,
            auth: Auth::new(),
            db,
            previews,
            uploads_active: AtomicUsize::new(0),
            listeners: Mutex::new(Listeners {
                http: ListenerStatus::Stopped,
                https,
            }),
            shutdown: Shutdown::new(),
            boot_id: uuid::Uuid::new_v4().to_string(),
            started: std::time::Instant::now(),
            audit_failures: AtomicUsize::new(0),
            admin: crate::admin::Runtime {
                last_cleanup_at: Mutex::new(last_cleanup),
                ..Default::default()
            },
        })
    }

    pub fn cfg(&self) -> Config {
        self.config.read().unwrap_or_else(|p| p.into_inner()).clone()
    }

    pub fn identify(&self, headers: &axum::http::HeaderMap) -> Option<Identity> {
        let config = self.config.read().unwrap_or_else(|p| p.into_inner());
        self.auth.identify(headers, &config.access_token, &config.admin_token)
    }

    pub fn set_listener(&self, https: bool, status: ListenerStatus) {
        let mut listeners = self.listeners.lock().unwrap();
        if https {
            listeners.https = status;
        } else {
            listeners.http = status;
        }
    }

    /// Persist an audit record. Failures never undo the audited action but raise an alert.
    pub fn audit(&self, action: &str, actor: &str, target: &str, result: &str, details: Value) -> bool {
        match self.db.insert_audit(action, actor, target, result, &details) {
            Ok(()) => true,
            Err(_) => {
                self.audit_failures.fetch_add(1, Ordering::SeqCst);
                false
            }
        }
    }
}
