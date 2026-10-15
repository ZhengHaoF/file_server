#![allow(dead_code)]
//! Black-box helpers: real TCP server on an ephemeral port with temporary directories.

use file_server::config::{self, Env};
use file_server::state::Options;
use reqwest::header::HeaderMap;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::path::{Path, PathBuf};

pub const ACCESS: &str = "file-access-token-0123456789";
pub const ADMIN: &str = "admin-console-token-9876543210";

pub struct Server {
    pub dir: tempfile::TempDir,
    pub base: PathBuf,
    pub url: String,
    pub running: file_server::Running,
    pub client: reqwest::Client,
}

pub fn layout(extra: Value) -> tempfile::TempDir {
    let dir = tempfile::tempdir().unwrap();
    let base = dir.path();
    for d in ["files", "static/admin/assets"] {
        std::fs::create_dir_all(base.join(d)).unwrap();
    }
    std::fs::write(base.join("static/admin/index.html"), "<!doctype html><title>admin</title>").unwrap();
    std::fs::write(base.join("static/admin/assets/app.js"), "console.log(1)").unwrap();
    let mut config = json!({
        "rootPath": "./files", "dataPath": "./data", "staticDir": "./static", "host": "127.0.0.1", "port": 0,
    });
    for (k, v) in extra.as_object().cloned().unwrap_or_default() {
        config[k] = v;
    }
    std::fs::write(base.join("config.json"), config.to_string()).unwrap();
    dir
}

pub fn env(managed: bool) -> Env {
    let mut map = HashMap::new();
    map.insert("FILE_SERVER_ACCESS_TOKEN".to_string(), ACCESS.to_string());
    map.insert("FILE_SERVER_ADMIN_TOKEN".to_string(), ADMIN.to_string());
    if managed {
        map.insert("FILE_SERVER_MANAGED".to_string(), "1".to_string());
    }
    Env(map)
}

pub async fn start_in(dir: tempfile::TempDir, managed: bool) -> Server {
    let base = dir.path().to_path_buf();
    let _ = file_server::logging::init(&base.join("data/logs"), false);
    let env = env(managed);
    let config = config::load(Some(base.join("config.json")), &env).expect("config");
    let running = file_server::start(config, Options::from_env(env)).await.expect("start");
    let url = format!("http://{}", running.http_addr);
    Server {
        dir,
        base,
        url,
        running,
        client: reqwest::Client::builder().no_proxy().build().unwrap(),
    }
}

pub async fn start(extra: Value) -> Server {
    start_in(layout(extra), false).await
}

impl Server {
    pub fn files(&self) -> PathBuf {
        self.base.join("files")
    }
    pub fn u(&self, path: &str) -> String {
        format!("{}{}", self.url, path)
    }
    pub async fn login(&self, token: &str) -> (Value, String) {
        let res = self
            .client
            .post(self.u("/api/auth/login"))
            .json(&json!({ "token": token }))
            .send()
            .await
            .unwrap();
        assert_eq!(res.status(), 200, "login");
        let cookie = res.headers()["set-cookie"].to_str().unwrap().split(';').next().unwrap().to_string();
        (res.json().await.unwrap(), cookie)
    }
    pub async fn bearer(&self, token: &str) -> String {
        self.login(token).await.0["sessionToken"].as_str().unwrap().to_string()
    }
    pub fn get(&self, path: &str, session: &str) -> reqwest::RequestBuilder {
        self.client.get(self.u(path)).bearer_auth(session)
    }
    pub fn post(&self, path: &str, session: &str) -> reqwest::RequestBuilder {
        self.client.post(self.u(path)).bearer_auth(session)
    }
    pub async fn stop(self) -> (tempfile::TempDir, i32) {
        self.running.state.shutdown.trigger(0);
        let code = self.running.task.await.unwrap();
        (self.dir, code)
    }
}

pub fn write(path: &Path, content: &[u8]) {
    if let Some(p) = path.parent() {
        std::fs::create_dir_all(p).unwrap();
    }
    std::fs::write(path, content).unwrap();
}

pub fn header(headers: &HeaderMap, name: &str) -> String {
    headers.get(name).map(|v| v.to_str().unwrap().to_string()).unwrap_or_default()
}

pub fn ffmpeg(args: &[&str]) -> bool {
    std::process::Command::new("ffmpeg")
        .args(["-nostdin", "-loglevel", "error", "-y"])
        .args(args)
        .stdin(std::process::Stdio::null())
        .status()
        .map(|s| s.success())
        .unwrap_or(false)
}
