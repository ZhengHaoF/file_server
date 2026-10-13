//! Real host/process sampling every 5 s. Unknown values are `null`, never 0.

use crate::db::now_ms;
use crate::state::SharedState;
use serde_json::{json, Value};
use std::collections::VecDeque;
use std::path::Path;
use std::sync::atomic::Ordering;
use std::time::Duration;
use sysinfo::{Pid, ProcessRefreshKind, ProcessesToUpdate, System};

pub const HISTORY: usize = 120;

#[derive(Default)]
pub struct Sampler {
    pub sample: Option<Value>,
    pub history: VecDeque<Value>,
}

fn round1(v: f64) -> f64 {
    (v * 10.0).round() / 10.0
}

#[cfg(unix)]
const GB: f64 = 1024.0 * 1024.0 * 1024.0;

pub fn disk(path: &Path) -> Value {
    #[cfg(unix)]
    {
        if let Ok(stat) = nix::sys::statvfs::statvfs(path) {
            let frsize = stat.fragment_size() as f64;
            let total = stat.blocks() as f64 * frsize;
            if total > 0.0 {
                let free_all = stat.blocks_free() as f64 * frsize;
                let available = stat.blocks_available() as f64 * frsize;
                let used = total - free_all;
                return json!({
                    "total": round1(total / GB), "used": round1(used / GB), "free": round1(available / GB),
                    "usage": round1(used / total * 100.0), "available": true, "sampledAt": now_ms(),
                });
            }
        }
    }
    let _ = path;
    json!({ "total": null, "used": null, "free": null, "usage": null, "available": false, "sampledAt": now_ms() })
}

/// Sampling loop; holds sysinfo state across ticks so CPU deltas are real.
pub async fn sample_loop(state: SharedState) {
    let mut system = System::new();
    let pid = sysinfo::get_current_pid().ok();
    let mut first = true;
    let mut interval = tokio::time::interval(Duration::from_secs(5));
    loop {
        tokio::select! {
            _ = interval.tick() => {}
            _ = state.shutdown.wait() => return,
        }
        take(&state, &mut system, pid, first).await;
        first = false;
    }
}

async fn take(state: &SharedState, system: &mut System, pid: Option<Pid>, first: bool) {
    system.refresh_cpu_usage();
    system.refresh_memory();
    if let Some(pid) = pid {
        system.refresh_processes_specifics(ProcessesToUpdate::Some(&[pid]), false, ProcessRefreshKind::nothing().with_memory());
    }
    let cores = system.cpus().len();
    let usage = if first || cores == 0 {
        None
    } else {
        Some(round1(system.global_cpu_usage() as f64).clamp(0.0, 100.0))
    };
    let total = system.total_memory();
    let memory = if total > 0 {
        let available = system.available_memory();
        let used = total.saturating_sub(available);
        json!({
            "total": total / 1024 / 1024, "free": available / 1024 / 1024, "used": used / 1024 / 1024,
            "usage": round1(used as f64 / total as f64 * 100.0), "scope": "host",
        })
    } else {
        json!({ "total": null, "free": null, "used": null, "usage": null, "scope": "host" })
    };
    let rss = pid.and_then(|p| system.process(p)).map(|p| p.memory());
    let root = state.startup.root_path.clone();
    let mut disk_value = tokio::task::spawn_blocking(move || disk(&root)).await.unwrap_or(Value::Null);
    disk_value["scope"] = "shared-filesystem".into();
    let now = now_ms();
    let sample = json!({
        "sampledAt": now,
        "bootId": state.boot_id,
        "cpu": { "usage": usage, "cores": if cores > 0 { json!(cores) } else { Value::Null }, "warmingUp": usage.is_none() },
        "memory": memory,
        "disk": disk_value,
        "process": { "rss": rss, "heapUsed": null, "heapTotal": null },
    });
    let mut sampler = state.admin.sampler.lock().unwrap();
    sampler
        .history
        .push_back(json!({ "time": now, "cpu": usage, "memory": sample["memory"]["usage"], "processRss": rss }));
    while sampler.history.len() > HISTORY {
        sampler.history.pop_front();
    }
    sampler.sample = Some(sample);
}

pub async fn ensure_sample(state: &SharedState) {
    if state.admin.sampler.lock().unwrap().sample.is_some() {
        return;
    }
    let mut system = System::new();
    take(state, &mut system, sysinfo::get_current_pid().ok(), true).await;
}

pub fn status(state: &SharedState) -> Value {
    let (mut sample, history) = {
        let sampler = state.admin.sampler.lock().unwrap();
        (
            sampler
                .sample
                .clone()
                .unwrap_or_else(|| json!({ "sampledAt": null, "bootId": state.boot_id })),
            sampler.history.clone(),
        )
    };
    let config = state.cfg();
    let mut alerts = Vec::new();
    let disk_ok = sample["disk"]["available"].as_bool().unwrap_or(false);
    if !disk_ok {
        alerts.push(json!({ "level": "warning", "message": "磁盘指标不可用，请检查共享目录挂载。" }));
    }
    if sample["disk"]["usage"].as_f64().is_some_and(|u| u >= 90.0) {
        alerts.push(json!({ "level": "warning", "message": "共享文件系统使用率达到 90%，请检查剩余空间。" }));
    }
    if sample["memory"]["usage"].as_f64().is_some_and(|u| u >= 90.0) {
        alerts.push(json!({ "level": "warning", "message": "主机内存使用率达到 90%。" }));
    }
    if config.public_read {
        alerts.push(json!({ "level": "warning", "message": "当前允许匿名读取，请确认这是你的预期。" }));
    }
    let failures = state.audit_failures.load(Ordering::SeqCst);
    if failures > 0 {
        alerts.push(json!({ "level": "warning", "message": format!("本次启动有 {failures} 次审计写入失败，请检查数据库与日志。") }));
    }
    let (image, video, maintenance) = state.previews.stats();
    let listeners = *state.listeners.lock().unwrap();
    let managed = state.options.managed;
    sample["history"] = Value::Array(history.into_iter().collect());
    sample["alerts"] = Value::Array(alerts);
    sample["queues"] = json!({
        "image": image, "video": video,
        "upload": { "active": state.uploads_active.load(Ordering::SeqCst), "pending": 0, "limit": crate::state::UPLOAD_LIMIT },
        "maintenance": maintenance,
    });
    let mut server = json!({
        "uptime": state.started.elapsed().as_secs(),
        "runtime": "rust",
        "version": env!("CARGO_PKG_VERSION"),
        "nodeVersion": null,
        "httpPort": state.startup.port,
        "httpsPort": state.startup.https_port,
        "httpStatus": listeners.http.as_str(),
        "httpsStatus": if state.startup.https_enabled { listeners.https.as_str() } else { "disabled" },
        "restartSupported": managed,
        "deployment": state.options.deployment,
    });
    if !managed {
        server["restartReason"] =
            "当前没有重启监督（未设置 FILE_SERVER_MANAGED=1）；请使用 file-server supervise、Docker 重启策略或 systemd 启动。".into();
    }
    sample["server"] = server;
    sample
}
