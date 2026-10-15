//! Recursive filename search over the whole share, streamed as NDJSON.

use crate::error::{ApiError, ApiResult};
use crate::files::{iso, require_read, QueryMap};
use crate::paths;
use crate::state::SharedState;
use axum::body::{Body, Bytes};
use axum::extract::{Query, State};
use axum::http::{header, HeaderMap};
use axum::response::Response;
use futures::channel::mpsc;
use futures::future::BoxFuture;
use futures::{FutureExt, SinkExt, StreamExt};
use serde_json::{json, Value};
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
use std::time::Duration;
use tokio_util::sync::CancellationToken;

/// Matches streamed per search; the walk stops once this many are sent.
pub const SEARCH_LIMIT: usize = 100;
/// Wall-clock budget for one walk before partial results are returned.
pub const SEARCH_DEADLINE: Duration = Duration::from_secs(60);
/// Heartbeat cadence during silent stretches so clients see "still searching".
pub const HEARTBEAT: Duration = Duration::from_secs(5);
/// Concurrent whole-share walks across the process; extra requests fail fast.
const WALK_LIMIT: usize = 2;
/// Bounded concurrency while scanning directories inside one walk.
const DIR_CONCURRENCY: usize = 16;
/// Bounded buffering between the walk and the HTTP body (backpressure).
const CHANNEL_BOUND: usize = 8;
/// How long the final sentinel waits on a slow/stuck client before giving up.
const SENTINEL_GRACE: Duration = Duration::from_secs(5);
/// Longest accepted keyword (characters).
const MAX_QUERY_CHARS: usize = 100;

static WALKS_ACTIVE: AtomicUsize = AtomicUsize::new(0);

/// Held for the lifetime of one walk; mirrors the upload slot pattern in `files.rs`.
#[derive(Debug)]
struct WalkGuard;

impl Drop for WalkGuard {
    fn drop(&mut self) {
        WALKS_ACTIVE.fetch_sub(1, Ordering::SeqCst);
    }
}

fn acquire_walk_slot() -> ApiResult<WalkGuard> {
    if WALKS_ACTIVE.fetch_add(1, Ordering::SeqCst) >= WALK_LIMIT {
        WALKS_ACTIVE.fetch_sub(1, Ordering::SeqCst);
        return Err(ApiError::new(429, "搜索任务过多，请稍后重试").code("SEARCH_BUSY"));
    }
    Ok(WalkGuard)
}

#[derive(Default)]
struct Counters {
    matched: AtomicUsize,
    skipped: AtomicUsize,
}

struct Walk {
    tx: mpsc::Sender<Value>,
    needle: Arc<str>,
    dir_concurrency: usize,
    limit: usize,
    stop: CancellationToken,
    counters: Arc<Counters>,
}

impl Walk {
    async fn run(self: Arc<Self>, root: PathBuf) {
        let tx = self.tx.clone();
        self.scan(tx, root, String::new()).await;
    }

    /// Re-stat one entry, turn it into a match line and hand it to the body
    /// stream. Returns `false` when the walk must stop (cap reached, receiver
    /// gone, or cancellation). Directory and file entries share this path so
    /// both are reported and both reject symlink/reparse.
    ///
    /// The `send` is raced against cancellation: a bounded channel plus a client
    /// that stops reading would otherwise park this future forever, and since
    /// `run_search` awaits the walk, the sentinel would never be sent and the
    /// walk slot would leak.
    async fn emit_hit(&self, tx: &mpsc::Sender<Value>, name: &str, rel: &str, child: &Path) -> bool {
        if self.counters.matched.load(Ordering::SeqCst) >= self.limit {
            self.stop.cancel();
            return false;
        }
        let Ok(meta) = tokio::fs::symlink_metadata(child).await else {
            return true;
        };
        if meta.file_type().is_symlink() || paths::is_reparse_point(&meta) || !(meta.is_file() || meta.is_dir()) {
            return true;
        }
        let line = json!({
            "name": name,
            "path": rel,
            "size": meta.len(),
            "isDirectory": meta.is_dir(),
            "isFile": meta.is_file(),
            "suffix": paths::extname(name),
            "mtime": iso(meta.modified()),
        });
        let mut sink = tx.clone();
        tokio::select! {
            biased;
            _ = self.stop.cancelled() => false,
            result = sink.send(line) => {
                if result.is_err() {
                    // Receiver gone: the client disconnected.
                    self.stop.cancel();
                    return false;
                }
                self.counters.matched.fetch_add(1, Ordering::SeqCst);
                true
            }
        }
    }

    /// Scan one directory, then fan out into subdirectories with bounded
    /// concurrency. Recursion goes through a boxed future; every directory is
    /// re-validated (symlink/reparse) before it is entered.
    #[allow(clippy::type_complexity)]
    fn scan(self: Arc<Self>, tx: mpsc::Sender<Value>, dir: PathBuf, rel: String) -> BoxFuture<'static, ()> {
        async move {
            if self.stop.is_cancelled() {
                return;
            }
            let mut reader = match tokio::fs::read_dir(&dir).await {
                Ok(reader) => reader,
                Err(e) => {
                    self.counters.skipped.fetch_add(1, Ordering::SeqCst);
                    crate::logging::warn("search", &format!("目录读取失败: {e}"));
                    return;
                }
            };
            let mut subdirs: Vec<(PathBuf, String)> = Vec::new();
            loop {
                if self.stop.is_cancelled() {
                    return;
                }
                match reader.next_entry().await {
                    Ok(Some(entry)) => {
                        let Ok(name) = entry.file_name().into_string() else {
                            continue;
                        };
                        if name.starts_with('.') {
                            continue;
                        }
                        let file_type = match entry.file_type().await {
                            Ok(t) => t,
                            Err(_) => continue,
                        };
                        if file_type.is_symlink() {
                            continue;
                        }
                        let child_rel = if rel.is_empty() { name.clone() } else { format!("{rel}/{name}") };
                        let child = dir.join(&name);
                        // 目录与文件都参与匹配（Q 决策），所以 needle 判断必须在
                        // is_dir() 分支之前；目录命中发出后仍继续递归。
                        let matches = name.to_lowercase().contains(self.needle.as_ref());
                        if file_type.is_dir() {
                            // `read_dir` does not promise the entry is still a real
                            // directory: re-stat before recursing.
                            match tokio::fs::symlink_metadata(&child).await {
                                Ok(meta) if meta.is_dir() && !meta.file_type().is_symlink() && !paths::is_reparse_point(&meta) => {
                                    if matches && !self.emit_hit(&tx, &name, &child_rel, &child).await {
                                        return;
                                    }
                                    subdirs.push((child, child_rel));
                                }
                                _ => {
                                    self.counters.skipped.fetch_add(1, Ordering::SeqCst);
                                }
                            }
                        } else if matches && !self.emit_hit(&tx, &name, &child_rel, &child).await {
                            return;
                        }
                    }
                    Ok(None) => break,
                    Err(_) => {
                        self.counters.skipped.fetch_add(1, Ordering::SeqCst);
                        break;
                    }
                }
            }
            let this = self.clone();
            futures::stream::iter(subdirs)
                .map(move |(child, child_rel)| this.clone().scan(tx.clone(), child, child_rel))
                .buffer_unordered(self.dir_concurrency)
                .for_each(|()| futures::future::ready(()))
                .await;
        }
        .boxed()
    }
}

struct SearchStats {
    matched: usize,
    skipped: usize,
    timed_out: bool,
}

/// Drive one walk to completion or its limits, streaming lines into `tx`.
/// Heartbeats are interleaved while the walk is silent; the deadline and the
/// match cap both unwind the walk. Does not send the final sentinel.
async fn run_search(
    tx: mpsc::Sender<Value>,
    root: PathBuf,
    needle: &str,
    limit: usize,
    deadline: Duration,
    dir_concurrency: usize,
) -> SearchStats {
    let stop = CancellationToken::new();
    let counters = Arc::new(Counters::default());
    let walk = Arc::new(Walk {
        tx: tx.clone(),
        needle: Arc::from(needle),
        dir_concurrency,
        limit,
        stop: stop.clone(),
        counters: counters.clone(),
    });
    let deadline_at = tokio::time::Instant::now() + deadline;
    let mut ticker = tokio::time::interval_at(tokio::time::Instant::now() + HEARTBEAT, HEARTBEAT);
    ticker.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Delay);
    let mut scanning = std::pin::pin!(walk.run(root));
    let mut timed_out = false;
    loop {
        tokio::select! {
            _ = &mut scanning => break,
            _ = ticker.tick(), if !stop.is_cancelled() => {
                let mut tx = tx.clone();
                if tx.send(json!({"tick": true})).await.is_err() {
                    stop.cancel();
                    break;
                }
            }
            _ = tokio::time::sleep_until(deadline_at), if !stop.is_cancelled() => {
                stop.cancel();
                timed_out = true;
            }
        }
    }
    SearchStats {
        matched: counters.matched.load(Ordering::SeqCst),
        skipped: counters.skipped.load(Ordering::SeqCst),
        timed_out,
    }
}

fn status_of(stats: &SearchStats, limit: usize) -> &'static str {
    if stats.timed_out {
        "timeout"
    } else if stats.matched >= limit {
        "capped"
    } else {
        "complete"
    }
}

/// v2: `GET /api/v2/search?q=<keyword>` — recursive filename search over the
/// whole share, streamed as NDJSON (one match per line, `{"tick":true}`
/// heartbeats, final `{"done":true,...}` sentinel).
pub async fn search_v2(State(state): State<SharedState>, headers: HeaderMap, Query(query): QueryMap) -> ApiResult<Response> {
    require_read(&state, &headers, &query)?;
    let q = query.get("q").map(String::as_str).unwrap_or("").trim();
    if q.is_empty() {
        return Err(ApiError::bad_request("缺少 q 参数"));
    }
    if q.chars().count() > MAX_QUERY_CHARS {
        return Err(ApiError::bad_request("关键词过长"));
    }
    let guard = acquire_walk_slot()?;
    // 根目录同样要过真实边界校验：共享根被换成软链接/reparse 或已不存在时直接拒绝，
    // 不能带着一个越界根去遍历。
    let root = state.cfg().root_path;
    match tokio::fs::symlink_metadata(&root).await {
        Ok(meta) if meta.is_dir() && !meta.file_type().is_symlink() && !paths::is_reparse_point(&meta) => {}
        Ok(_) => return Err(ApiError::bad_request("共享根不可用")),
        Err(e) => {
            crate::logging::warn("search", &format!("共享根不可访问: {e}"));
            return Err(ApiError::internal("search.root", e));
        }
    }
    let needle = q.to_lowercase();
    let (tx, rx) = mpsc::channel::<Value>(CHANNEL_BOUND);
    tokio::spawn(async move {
        let _guard = guard;
        let stats = run_search(tx.clone(), root, &needle, SEARCH_LIMIT, SEARCH_DEADLINE, DIR_CONCURRENCY).await;
        let sentinel = json!({
            "done": true,
            "status": status_of(&stats, SEARCH_LIMIT),
            "count": stats.matched,
            "skipped": stats.skipped,
        });
        // 有界通道 + 慢客户端：send 可能被背压住，所以给它一个宽限期，
        // 超时就放弃——响应体随后关闭，遍历名额随之释放。不能无限 send，
        // 否则本 task 永不结束、guard 永不 drop。
        let mut sink = tx.clone();
        let _ = tokio::time::timeout(SENTINEL_GRACE, sink.send(sentinel)).await;
    });
    let stream = rx.map(|line| {
        let mut bytes = serde_json::to_vec(&line).unwrap_or_default();
        bytes.push(b'\n');
        Ok::<Bytes, std::io::Error>(Bytes::from(bytes))
    });
    Ok(Response::builder()
        .header(header::CONTENT_TYPE, "application/x-ndjson; charset=utf-8")
        .header(header::CACHE_CONTROL, "no-store")
        .body(Body::from_stream(stream))
        .unwrap())
}

#[cfg(test)]
mod tests {
    use super::*;

    async fn collect(root: &Path, needle: &str, limit: usize, deadline: Duration) -> (Vec<Value>, SearchStats) {
        let (tx, mut rx) = mpsc::channel::<Value>(256);
        let stats = run_search(tx, root.to_path_buf(), needle, limit, deadline, DIR_CONCURRENCY).await;
        let mut lines = Vec::new();
        while let Some(line) = rx.next().await {
            if line.get("tick").is_some() {
                continue;
            }
            lines.push(line);
        }
        (lines, stats)
    }

    #[tokio::test]
    async fn nested_matches_carry_relative_paths() {
        let dir = tempfile::tempdir().unwrap();
        let root = dir.path();
        std::fs::create_dir_all(root.join("a")).unwrap();
        std::fs::create_dir_all(root.join("b/c")).unwrap();
        std::fs::write(root.join("a/report.txt"), b"hello").unwrap();
        std::fs::write(root.join("b/c/报告.pdf"), b"pdf").unwrap();
        std::fs::write(root.join("b/skip.bin"), b"x").unwrap();
        let (lines, stats) = collect(root, "report", 100, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 1);
        assert_eq!(lines[0]["name"], "report.txt");
        assert_eq!(lines[0]["path"], "a/report.txt");
        assert_eq!(lines[0]["isFile"], true);
        assert_eq!(lines[0]["suffix"], ".txt");
        assert_eq!(lines[0]["size"], 5);
        assert!(lines[0]["mtime"].is_string());
        assert_eq!(stats.matched, 1);
        let (lines, _) = collect(root, "报", 100, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 1);
        assert_eq!(lines[0]["path"], "b/c/报告.pdf");
    }

    #[tokio::test]
    async fn matching_is_case_insensitive() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::write(dir.path().join("MixedCase.TXT"), b"x").unwrap();
        let (lines, _) = collect(dir.path(), "mixedcase", 100, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 1);
        assert_eq!(lines[0]["name"], "MixedCase.TXT");
    }

    #[tokio::test]
    async fn directories_match_too() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(dir.path().join("旅行/2024")).unwrap();
        std::fs::write(dir.path().join("旅行/2024/x.bin"), b"x").unwrap();
        let (lines, _) = collect(dir.path(), "旅行", 100, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 1);
        assert_eq!(lines[0]["isDirectory"], true);
        assert_eq!(lines[0]["isFile"], false);
    }

    #[tokio::test]
    async fn cap_stops_the_walk() {
        let dir = tempfile::tempdir().unwrap();
        for i in 0..10 {
            std::fs::write(dir.path().join(format!("f{i}.txt")), b"x").unwrap();
        }
        let (lines, stats) = collect(dir.path(), "f", 3, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 3);
        assert_eq!(stats.matched, 3);
        assert_eq!(status_of(&stats, 3), "capped");
    }

    #[tokio::test]
    async fn expired_deadline_reports_timeout() {
        // tokio 文件操作首次 poll 必然 Pending，已过的截止时间总是先于遍历完成被观察到。
        let dir = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(dir.path().join("a")).unwrap();
        std::fs::write(dir.path().join("a/x.txt"), b"x").unwrap();
        let (_, stats) = collect(dir.path(), "x", 100, Duration::ZERO).await;
        assert_eq!(status_of(&stats, 100), "timeout");
    }

    #[tokio::test]
    async fn hidden_and_symlink_entries_are_skipped() {
        let dir = tempfile::tempdir().unwrap();
        // `share` 是搜索根，`outside` 必须与它平级而不是在它里面，
        // 否则 “未遍历软链接目录” 这条断言会因为普通子目录命中而误报。
        let base = dir.path().join("share");
        std::fs::create_dir_all(&base).unwrap();
        std::fs::create_dir_all(base.join("real")).unwrap();
        std::fs::write(base.join("real/target.txt"), b"t").unwrap();
        std::fs::write(base.join(".hidden.txt"), b"h").unwrap();
        let outside = dir.path().join("outside");
        std::fs::create_dir_all(&outside).unwrap();
        std::fs::write(outside.join("secret.txt"), b"s").unwrap();
        #[cfg(unix)]
        {
            std::os::unix::fs::symlink(&outside, base.join("link")).unwrap();
            std::os::unix::fs::symlink(base.join("real/target.txt"), base.join("alias.txt")).unwrap();
        }
        let (lines, _) = collect(&base, "secret", 100, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 0, "symlinked directories must not be traversed");
        let (lines, _) = collect(&base, "target", 100, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 1, "a symlinked file must not duplicate the real entry");
        assert_eq!(lines[0]["path"], "real/target.txt");
        let (lines, _) = collect(&base, "hidden", 100, Duration::from_secs(5)).await;
        assert_eq!(lines.len(), 0, "hidden entries stay invisible");
    }

    #[tokio::test]
    async fn walk_slots_are_capped() {
        // 进程内同时只允许 WALK_LIMIT 个遍历，超出立刻 429 SEARCH_BUSY。
        let first = acquire_walk_slot().expect("first slot");
        let second = acquire_walk_slot().expect("second slot");
        let third = acquire_walk_slot().expect_err("WALK_LIMIT is 2");
        assert_eq!(third.status.as_u16(), 429);
        assert_eq!(third.code, "SEARCH_BUSY");
        drop(first);
        assert!(acquire_walk_slot().is_ok(), "slot is released on drop");
        drop(second);
    }
}
