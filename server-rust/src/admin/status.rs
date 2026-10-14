//! Real host/process sampling every 5 s. Unknown values are `null`, never 0.

use crate::db::now_ms;
use crate::state::SharedState;
use serde_json::{json, Value};
use std::collections::VecDeque;
use std::path::{Path, PathBuf};
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

#[cfg(any(unix, windows))]
const GB: f64 = 1024.0 * 1024.0 * 1024.0;

/// Pick the value whose mount point is the deepest one containing `path`, matched by
/// whole path components. Never a string prefix: `D:\datax` must not match `D:\data`.
#[cfg_attr(not(windows), allow(dead_code))]
fn deepest_mount<'a, T>(path: &Path, mounts: impl IntoIterator<Item = (&'a Path, T)>) -> Option<T> {
    let mut best: Option<T> = None;
    let mut best_depth = 0usize;
    for (mount, value) in mounts {
        if path.starts_with(mount) {
            let depth = mount.components().count();
            if best.is_none() || depth > best_depth {
                best = Some(value);
                best_depth = depth;
            }
        }
    }
    best
}

#[cfg(windows)]
fn disk_windows(path: &Path) -> Option<Value> {
    let disks = sysinfo::Disks::new_with_refreshed_list();
    // `path` is canonicalized at startup, i.e. the `\\?\` verbatim form on Windows.
    // Normalize mount points the same way so component-wise starts_with matches.
    let mounts: Vec<(PathBuf, &sysinfo::Disk)> = disks
        .list()
        .iter()
        .map(|d| (d.mount_point().canonicalize().unwrap_or_else(|_| d.mount_point().to_path_buf()), d))
        .collect();
    let disk = deepest_mount(path, mounts.iter().map(|(m, d)| (m.as_path(), *d)))?;
    let total = disk.total_space() as f64;
    if total <= 0.0 {
        return None;
    }
    // available_space is TotalNumberOfFreeBytes, so `used` keeps the same conservative
    // meaning as the unix path (total - blocks_free, reserved blocks counted as used).
    let available = disk.available_space() as f64;
    let used = total - available;
    Some(json!({
        "total": round1(total / GB), "used": round1(used / GB), "free": round1(available / GB),
        "usage": round1(used / total * 100.0), "available": true, "sampledAt": now_ms(),
    }))
}

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
    #[cfg(windows)]
    {
        if let Some(value) = disk_windows(path) {
            return value;
        }
    }
    #[cfg(not(any(unix, windows)))]
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn deepest_mount_matches_whole_components_only() {
        let mounts = [Path::new("D:\\"), Path::new("D:\\data"), Path::new("E:\\backup")];
        let pick = |p: &str| deepest_mount(Path::new(p), mounts.iter().copied().map(|m| (m, m)));
        // deepest containing mount wins over its parent
        assert_eq!(pick("D:\\data\\share\\a.bin"), Some(Path::new("D:\\data")));
        // a sibling sharing only a string prefix is not a match
        assert_eq!(pick("D:\\datax"), Some(Path::new("D:\\")));
        // path on another volume picks that volume's mount
        assert_eq!(pick("E:\\backup\\share"), Some(Path::new("E:\\backup")));
        // no mount contains the path
        assert_eq!(pick("F:\\x"), None);
        // canonicalized `\\?\` verbatim forms match each other once normalized (see disk_windows)
        let verbatim = [Path::new(r"\\?\D:\"), Path::new(r"\\?\D:\data")];
        let pick_v = |p: &str| deepest_mount(Path::new(p), verbatim.iter().copied().map(|m| (m, m)));
        assert_eq!(pick_v(r"\\?\D:\data\share"), Some(Path::new(r"\\?\D:\data")));
        assert_eq!(pick_v(r"\\?\D:\datax"), Some(Path::new(r"\\?\D:\")));
        // empty mount list
        assert_eq!(deepest_mount(Path::new("D:\\data"), std::iter::empty::<(&Path, &Path)>()), None);
    }

    #[test]
    fn disk_samples_real_volume_on_every_platform() {
        // The temp dir always exists on a real volume; sampling must not silently
        // degrade to available:false on any supported platform (unix or windows).
        // root_path is canonicalized at startup, so use the same form here.
        let root = std::env::temp_dir().canonicalize().expect("temp dir must canonicalize");
        let value = disk(&root);
        assert_eq!(value["available"], json!(true), "disk sample degraded: {value}");
        let total = value["total"].as_f64().expect("total must be a number");
        assert!(total > 0.0, "total must be positive: {value}");
        assert!(value["used"].as_f64().is_some_and(|v| v >= 0.0 && v <= total));
        assert!(value["free"].as_f64().is_some_and(|v| v >= 0.0 && v <= total));
        let usage = value["usage"].as_f64().expect("usage must be a number");
        assert!((0.0..=100.0).contains(&usage), "usage out of range: {value}");
    }
}
