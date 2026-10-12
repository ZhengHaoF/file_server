//! Derived-cache statistics and durable single-flight maintenance jobs.

use crate::db::now_ms;
use crate::error::{ApiError, ApiResult};
use crate::state::SharedState;
use regex::Regex;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::sync::atomic::Ordering;
use std::sync::LazyLock;
use std::time::{Duration, Instant};

static MANAGED: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"(?i)^[a-f0-9]{64}\.(?:jpg|jpeg|png|webp|gif|svg|bmp|tiff?|avif|heic|heif)$").unwrap());

#[derive(Debug, Clone)]
pub struct Item {
    pub name: String,
    pub size: u64,
    pub kind: String,
    pub key: Option<String>,
    pub access: i64,
    pub managed: bool,
}

pub async fn inventory(state: &SharedState) -> ApiResult<Vec<Item>> {
    let dir = state.startup.img_cache.clone();
    let rows: HashMap<String, crate::db::CacheRow> = state
        .db
        .cache_rows()?
        .into_iter()
        .map(|r| (format!("{}{}", r.key, r.ext), r))
        .collect();
    let mut reader = tokio::fs::read_dir(&dir)
        .await
        .map_err(|e| ApiError::internal("cache.inventory", e))?;
    let mut items = Vec::new();
    while let Some(entry) = reader.next_entry().await.map_err(|e| ApiError::internal("cache.inventory", e))? {
        let Ok(name) = entry.file_name().into_string() else { continue };
        if name.starts_with('.') {
            continue;
        }
        let Ok(meta) = tokio::fs::symlink_metadata(entry.path()).await else {
            continue;
        };
        if !meta.is_file() || meta.file_type().is_symlink() {
            continue;
        }
        let row = rows.get(&name);
        let mtime = meta
            .modified()
            .ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_millis() as i64)
            .unwrap_or(0);
        items.push(Item {
            managed: MANAGED.is_match(&name),
            size: meta.len(),
            kind: row.map(|r| r.kind.clone()).unwrap_or_else(|| "legacy".into()),
            key: row.map(|r| r.key.clone()),
            access: row.map(|r| r.access).unwrap_or(mtime),
            name,
        });
    }
    Ok(items)
}

pub fn policy(state: &SharedState) -> Value {
    let c = state.cfg();
    json!({
        "cacheMaxSizeMB": c.cache_max_size_mb,
        "cacheRetentionDays": c.cache_retention_days,
        "autoCleanupEnabled": c.auto_cleanup_enabled,
    })
}

const STATS_TTL: Duration = Duration::from_secs(15);

pub async fn stats(state: &SharedState, force: bool) -> ApiResult<Value> {
    let requested = Instant::now();
    let finish = |mut value: Value| {
        value["maintenance"] = state.admin.job_running.load(Ordering::SeqCst).into();
        value["policy"] = policy(state);
        value["lastCleanupAt"] = json!(*state.admin.last_cleanup_at.lock().unwrap());
        value
    };
    if !force {
        if let Some((version, at, value)) = state.admin.stats_cache.lock().unwrap().clone() {
            if version == state.db.version() && at.elapsed() < STATS_TTL {
                return Ok(finish(value));
            }
        }
    }
    // Single flight: concurrent (forced) refreshes share one scan.
    let _scan = state.admin.stats_scan.lock().await;
    if let Some((version, at, value)) = state.admin.stats_cache.lock().unwrap().clone() {
        if version == state.db.version() && at >= requested {
            return Ok(finish(value));
        }
    }
    let version = state.db.version();
    let items = inventory(state).await?;
    let mut buckets: HashMap<&str, (u64, u64)> = HashMap::new();
    let mut total = 0u64;
    for item in &items {
        let bucket = match item.kind.as_str() {
            "image" => "image",
            "video" => "video",
            _ => "legacy",
        };
        let entry = buckets.entry(bucket).or_default();
        entry.0 += 1;
        entry.1 += item.size;
        total += item.size;
    }
    let bucket = |name: &str| {
        let (count, size) = buckets.get(name).copied().unwrap_or_default();
        json!({ "count": count, "size": size })
    };
    let (main, wal, shm) = state.db.file_sizes();
    let records = state.db.cache_count()?;
    let value = json!({
        "sampledAt": now_ms(),
        "totalFiles": items.len(),
        "totalSize": total,
        "imageCache": bucket("image"),
        "videoCache": bucket("video"),
        "legacyCache": bucket("legacy"),
        "dbSize": main + wal + shm,
        "database": { "main": main, "wal": wal, "shm": shm, "total": main + wal + shm, "recordCount": records },
    });
    if state.db.version() == version && !state.admin.job_running.load(Ordering::SeqCst) {
        *state.admin.stats_cache.lock().unwrap() = Some((version, Instant::now(), value.clone()));
    }
    Ok(finish(value))
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Mode {
    Expired(u64),
    All,
    Policy,
}

impl Mode {
    pub fn name(self) -> &'static str {
        match self {
            Mode::Expired(_) => "expired",
            Mode::All => "all",
            Mode::Policy => "policy",
        }
    }
    pub fn parse(body: &Value) -> ApiResult<Self> {
        match body.get("mode").and_then(Value::as_str) {
            Some("all") => Ok(Mode::All),
            Some("policy") => Ok(Mode::Policy),
            Some("expired") => match body.get("days").and_then(Value::as_u64) {
                Some(d) if (1..=3650).contains(&d) && body["days"].is_u64() => Ok(Mode::Expired(d)),
                _ => Err(ApiError::bad_request("清理天数必须为 1 到 3650 的整数")),
            },
            _ => Err(ApiError::bad_request("无效清理模式")),
        }
    }
}

struct RunningFlag(SharedState);
impl Drop for RunningFlag {
    fn drop(&mut self) {
        self.0.previews.end_maintenance();
        *self.0.admin.stats_cache.lock().unwrap() = None;
        *self.0.admin.active_job.lock().unwrap() = None;
        self.0.admin.job_running.store(false, Ordering::SeqCst);
    }
}

fn persist(state: &SharedState, job: &Value) {
    if let Err(e) = state.db.persist_job(job["id"].as_str().unwrap_or(""), job) {
        crate::logging::error("admin", &format!("任务状态写入失败: {}", e.msg));
    }
    *state.admin.active_job.lock().unwrap() = Some(job.clone());
}

/// Start a maintenance job. Returns the queued job and a handle resolving to the final job.
pub fn start_cleanup(state: &SharedState, mode: Mode, actor: String) -> ApiResult<(Value, tokio::task::JoinHandle<Value>)> {
    if state.shutdown.is_triggered() {
        return Err(ApiError::new(503, "服务正在关闭"));
    }
    if state
        .admin
        .job_running
        .compare_exchange(false, true, Ordering::SeqCst, Ordering::SeqCst)
        .is_err()
    {
        return Err(ApiError::new(409, "已有缓存维护任务正在执行"));
    }
    let guard = RunningFlag(state.clone());
    let id = uuid::Uuid::new_v4().to_string();
    let mut job = json!({
        "id": id, "type": format!("cache.{}", mode.name()), "status": "queued", "createdAt": now_ms(),
        "startedAt": null, "finishedAt": null, "progress": { "processed": 0, "total": 0 },
        "result": { "cleaned": 0, "freedBytes": 0, "failed": 0 }, "error": null,
    });
    if let Err(e) = state.db.persist_job(&id, &job) {
        drop(guard);
        crate::logging::error("admin", &format!("维护任务入队失败: {}", e.msg));
        return Err(ApiError::new(503, "任务无法写入数据库，请检查磁盘与数据库后重试").code("DATABASE_UNAVAILABLE"));
    }
    *state.admin.active_job.lock().unwrap() = Some(job.clone());
    let queued = job.clone();
    let state = state.clone();
    let handle = tokio::spawn(async move {
        let _guard = guard;
        job["status"] = "running".into();
        job["startedAt"] = now_ms().into();
        persist(&state, &job);
        let outcome = run(&state, mode, &mut job).await;
        match outcome {
            Ok(()) => {
                let failed = job["result"]["failed"].as_u64().unwrap_or(0);
                job["status"] = if failed > 0 { "failed" } else { "succeeded" }.into();
                if failed > 0 {
                    job["error"] = format!("{failed} 个缓存删除失败，可在检查权限后重新维护").into();
                }
            }
            Err(e) => {
                job["status"] = "failed".into();
                job["error"] = "缓存维护失败，请检查缓存目录权限和日志".into();
                crate::logging::warn("admin", &format!("缓存维护失败: {}", e.msg));
            }
        }
        let finished = now_ms();
        job["finishedAt"] = finished.into();
        if job["status"] == "succeeded" {
            *state.admin.last_cleanup_at.lock().unwrap() = Some(finished);
        }
        persist(&state, &job);
        let mut details = job["result"].clone();
        details["jobId"] = job["id"].clone();
        state.audit(
            "cache.cleanup",
            &actor,
            mode.name(),
            job["status"].as_str().unwrap_or("failed"),
            details,
        );
        state
            .admin
            .recent_jobs
            .lock()
            .unwrap()
            .insert(job["id"].as_str().unwrap_or("").to_string(), job.clone());
        job
    });
    Ok((queued, handle))
}

async fn run(state: &SharedState, mode: Mode, job: &mut Value) -> ApiResult<()> {
    state.previews.begin_maintenance_forced().await;
    let mut items: Vec<Item> = inventory(state).await?.into_iter().filter(|i| i.managed).collect();
    items.sort_by_key(|i| i.access);
    let config = state.cfg();
    let days = match mode {
        Mode::Expired(d) => d,
        _ => config.cache_retention_days,
    };
    let cutoff = now_ms() - (days as i64) * 86_400_000;
    let max = config.cache_max_size_mb * 1024 * 1024;
    let mut remaining: u64 = items.iter().map(|i| i.size).sum();
    let candidates: Vec<Item> = items
        .into_iter()
        .filter(|item| {
            let selected = mode == Mode::All || item.access < cutoff || (mode == Mode::Policy && max > 0 && remaining > max);
            if selected {
                remaining = remaining.saturating_sub(item.size);
            }
            selected
        })
        .collect();
    job["progress"]["total"] = candidates.len().into();
    persist(state, job);
    let dir = state.startup.img_cache.clone();
    for (index, item) in candidates.iter().enumerate() {
        let target = dir.join(&item.name);
        match tokio::fs::symlink_metadata(&target).await {
            Ok(meta) if meta.is_file() && !meta.file_type().is_symlink() => match tokio::fs::remove_file(&target).await {
                Ok(()) => {
                    if let Some(key) = &item.key {
                        state.db.delete_cache(key)?;
                    }
                    let r = &mut job["result"];
                    r["cleaned"] = (r["cleaned"].as_u64().unwrap_or(0) + 1).into();
                    r["freedBytes"] = (r["freedBytes"].as_u64().unwrap_or(0) + meta.len()).into();
                    state.db.bump();
                }
                Err(e) if e.kind() == std::io::ErrorKind::NotFound => {}
                Err(_) => {
                    let r = &mut job["result"];
                    r["failed"] = (r["failed"].as_u64().unwrap_or(0) + 1).into();
                }
            },
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => {}
            _ => {
                let r = &mut job["result"];
                r["failed"] = (r["failed"].as_u64().unwrap_or(0) + 1).into();
            }
        }
        job["progress"]["processed"] = (index + 1).into();
        if (index + 1) % 25 == 0 {
            persist(state, job);
        }
    }
    if mode == Mode::All {
        state.db.reset_cache()?;
    }
    Ok(())
}

/// Background policy check every minute.
pub async fn policy_loop(state: SharedState) {
    let mut interval = tokio::time::interval(Duration::from_secs(60));
    interval.tick().await;
    loop {
        tokio::select! {
            _ = interval.tick() => {}
            _ = state.shutdown.wait() => return,
        }
        let config = state.cfg();
        if !config.auto_cleanup_enabled || state.admin.job_running.load(Ordering::SeqCst) {
            continue;
        }
        let items = match inventory(&state).await {
            Ok(items) => items,
            Err(e) => {
                crate::logging::warn("admin", &format!("自动缓存维护检查失败: {}", e.msg));
                continue;
            }
        };
        let cutoff = now_ms() - config.cache_retention_days as i64 * 86_400_000;
        let managed: Vec<&Item> = items.iter().filter(|i| i.managed).collect();
        let size: u64 = managed.iter().map(|i| i.size).sum();
        if managed.iter().any(|i| i.access < cutoff) || (config.cache_max_size_mb > 0 && size > config.cache_max_size_mb * 1024 * 1024) {
            let _ = start_cleanup(&state, Mode::Policy, "system".into());
        }
    }
}
