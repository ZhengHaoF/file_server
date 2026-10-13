//! JPEG thumbnails via the libvips CLI and FFmpeg subprocesses.
//!
//! Tool lookup order: `FILE_SERVER_VIPS`/`FILE_SERVER_VIPSHEADER`/
//! `FILE_SERVER_FFMPEG` overrides, then `tools/` next to the executable
//! (distribution packages may bundle the CLI tools), then PATH.
//!
//! * bounded concurrency and bounded pending queue per kind (429 when full)
//! * per-process timeout; children are killed on timeout or drop
//! * same-key requests share one generation, which runs in its own task so a
//!   cancelled HTTP request neither aborts the work nor releases a slot early
//! * output is written to a temporary name, renamed into place, then indexed

use crate::db::Db;
use crate::error::{ApiError, ApiResult};
use futures::future::{BoxFuture, FutureExt, Shared};
use serde_json::{json, Value};
use sha2::{Digest, Sha256};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::process::Stdio;
use std::sync::atomic::{AtomicBool, AtomicUsize, Ordering};
use std::sync::{Arc, Mutex};
use std::time::{Duration, UNIX_EPOCH};
use tokio::process::Command;
use tokio::sync::Semaphore;

pub const CACHE_KEY_VERSION: &str = "preview-rust-v1";
pub const PROCESS_TIMEOUT: Duration = Duration::from_secs(30);
/// Decoded input pixel ceiling (matches the previous Sharp `limitInputPixels`).
pub const MAX_INPUT_PIXELS: u64 = 64_000_000;
const STDERR_TAIL: usize = 4096;
/// Demuxers allowed for video previews; script/playlist demuxers (HLS, concat, image2...) are excluded.
pub const FFMPEG_FORMATS: &str = "mov,mp4,m4a,3gp,3g2,mj2,matroska,webm,avi,flv,mpegts,mpeg,mpegvideo,asf,ogg,mxf,rm,h264,hevc,m4v";

#[derive(Debug, Clone)]
pub struct Tools {
    pub vips: String,
    pub vipsheader: String,
    pub ffmpeg: String,
}

/// Locate a media tool shipped next to the executable (`<exe_dir>/tools/`).
/// Distribution packages may bundle the CLI tools there so target machines
/// need no separate install; `None` when the package ships without tools.
fn bundled_tool(base: &Path, name: &str) -> Option<PathBuf> {
    let suffix = if cfg!(windows) { ".exe" } else { "" };
    let candidate = base.join("tools").join(format!("{name}{suffix}"));
    candidate.is_file().then_some(candidate)
}

/// Resolve one media tool: explicit env override wins, then the `tools/`
/// directory next to the executable, then whatever the OS finds on PATH.
fn resolve_tool(env: &crate::config::Env, key: &str, name: &str) -> String {
    if let Some(value) = env.get(key) {
        return value.to_string();
    }
    if let Ok(exe) = std::env::current_exe() {
        if let Some(dir) = exe.parent() {
            if let Some(found) = bundled_tool(dir, name) {
                return found.display().to_string();
            }
        }
    }
    name.to_string()
}

impl Tools {
    pub fn from_env(env: &crate::config::Env) -> Self {
        Self {
            vips: resolve_tool(env, "FILE_SERVER_VIPS", "vips"),
            vipsheader: resolve_tool(env, "FILE_SERVER_VIPSHEADER", "vipsheader"),
            ffmpeg: resolve_tool(env, "FILE_SERVER_FFMPEG", "ffmpeg"),
        }
    }
}

/// Concurrency limiter with a bounded wait queue.
pub struct WorkQueue {
    semaphore: Arc<Semaphore>,
    pub limit: usize,
    max_pending: usize,
    active: Arc<AtomicUsize>,
    pending: Arc<AtomicUsize>,
}

struct CountGuard(Arc<AtomicUsize>);
impl Drop for CountGuard {
    fn drop(&mut self) {
        self.0.fetch_sub(1, Ordering::SeqCst);
    }
}

impl WorkQueue {
    pub fn new(limit: usize, max_pending: usize) -> Self {
        Self {
            semaphore: Arc::new(Semaphore::new(limit)),
            limit,
            max_pending,
            active: Arc::new(AtomicUsize::new(0)),
            pending: Arc::new(AtomicUsize::new(0)),
        }
    }
    pub fn active(&self) -> usize {
        self.active.load(Ordering::SeqCst)
    }
    pub fn pending(&self) -> usize {
        self.pending.load(Ordering::SeqCst)
    }
    pub fn stats(&self) -> Value {
        json!({ "active": self.active(), "pending": self.pending(), "limit": self.limit })
    }

    /// Reserve a queue position synchronously (so overload is reported immediately).
    pub fn reserve(&self) -> ApiResult<Reservation> {
        let previous = self.pending.fetch_add(1, Ordering::SeqCst);
        if previous >= self.max_pending {
            self.pending.fetch_sub(1, Ordering::SeqCst);
            return Err(ApiError::new(429, "缩略图任务过多，请稍后重试"));
        }
        Ok(Reservation {
            semaphore: self.semaphore.clone(),
            active: self.active.clone(),
            pending: Some(CountGuard(self.pending.clone())),
        })
    }

    pub async fn run<T>(&self, work: impl std::future::Future<Output = T>) -> ApiResult<T> {
        let reservation = self.reserve()?;
        Ok(reservation.run(work).await)
    }
}

impl std::fmt::Debug for Reservation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Reservation")
    }
}

pub struct Reservation {
    semaphore: Arc<Semaphore>,
    active: Arc<AtomicUsize>,
    pending: Option<CountGuard>,
}

impl Reservation {
    pub async fn run<T>(mut self, work: impl std::future::Future<Output = T>) -> T {
        let _permit = self.semaphore.clone().acquire_owned().await.expect("semaphore never closed");
        drop(self.pending.take());
        self.active.fetch_add(1, Ordering::SeqCst);
        let _active = CountGuard(self.active.clone());
        work.await
    }
}

pub fn parse_size(size: &str) -> ApiResult<(u32, u32)> {
    let invalid = || ApiError::bad_request("缩略图尺寸无效或过大");
    let (w, h) = size.split_once('x').ok_or_else(invalid)?;
    let ok = |s: &str| !s.is_empty() && s.len() <= 4 && s.bytes().all(|b| b.is_ascii_digit());
    if !ok(w) || !ok(h) {
        return Err(invalid());
    }
    let (w, h): (u32, u32) = (w.parse().map_err(|_| invalid())?, h.parse().map_err(|_| invalid())?);
    if w < 1 || h < 1 || w > 5000 || h > 5000 || (w as u64) * (h as u64) > 16_000_000 {
        return Err(invalid());
    }
    Ok((w, h))
}

fn millis(time: std::io::Result<std::time::SystemTime>) -> i128 {
    time.ok()
        .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_nanos() as i128)
        .unwrap_or(0)
}

#[cfg(unix)]
fn change_time(meta: &std::fs::Metadata) -> i128 {
    use std::os::unix::fs::MetadataExt;
    meta.ctime() as i128 * 1_000_000_000 + meta.ctime_nsec() as i128
}
#[cfg(not(unix))]
fn change_time(meta: &std::fs::Metadata) -> i128 {
    millis(meta.created())
}

/// Cache key: version, full path, size, mtime, ctime and transform.
pub fn preview_key(path: &Path, meta: &std::fs::Metadata, variant: &str) -> String {
    let material = json!([
        CACHE_KEY_VERSION,
        path.to_string_lossy(),
        meta.len(),
        millis(meta.modified()).to_string(),
        change_time(meta).to_string(),
        variant
    ]);
    hex::encode(Sha256::digest(material.to_string().as_bytes()))
}

type Generation = Shared<BoxFuture<'static, Result<PathBuf, ApiError>>>;

pub struct Previews {
    cache_dir: PathBuf,
    db: Arc<Db>,
    pub images: WorkQueue,
    pub videos: WorkQueue,
    inflight: Mutex<HashMap<String, Generation>>,
    maintenance: AtomicBool,
    tools: Tools,
}

/// Removes a temporary output on every exit path, including task cancellation.
struct TempFile(PathBuf);
impl Drop for TempFile {
    fn drop(&mut self) {
        let _ = std::fs::remove_file(&self.0);
    }
}

#[derive(Clone, Copy, PartialEq)]
enum Kind {
    Image,
    Video,
}

impl Previews {
    pub fn new(cache_dir: PathBuf, db: Arc<Db>, tools: Tools) -> Arc<Self> {
        Arc::new(Self {
            cache_dir,
            db,
            images: WorkQueue::new(4, 64),
            videos: WorkQueue::new(2, 16),
            inflight: Mutex::new(HashMap::new()),
            maintenance: AtomicBool::new(false),
            tools,
        })
    }

    pub fn stats(&self) -> (Value, Value, bool) {
        (self.images.stats(), self.videos.stats(), self.maintenance.load(Ordering::SeqCst))
    }

    fn check_open(&self) -> ApiResult<()> {
        if self.maintenance.load(Ordering::SeqCst) {
            return Err(ApiError::new(503, "缓存维护中，请稍后重试预览").code("MAINTENANCE"));
        }
        Ok(())
    }

    /// Block new previews and wait for in-flight generations.
    pub async fn begin_maintenance(&self) -> ApiResult<()> {
        if self
            .maintenance
            .compare_exchange(false, true, Ordering::SeqCst, Ordering::SeqCst)
            .is_err()
        {
            return Err(ApiError::new(409, "已有缓存维护任务正在执行"));
        }
        loop {
            let pending: Vec<Generation> = self.inflight.lock().unwrap().values().cloned().collect();
            if pending.is_empty() {
                break;
            }
            for work in pending {
                let _ = work.await;
            }
        }
        Ok(())
    }

    /// Used by the single maintenance job owner: set the flag and drain in-flight work.
    pub async fn begin_maintenance_forced(&self) {
        self.maintenance.store(true, Ordering::SeqCst);
        loop {
            let pending: Vec<Generation> = self.inflight.lock().unwrap().values().cloned().collect();
            if pending.is_empty() {
                break;
            }
            for work in pending {
                let _ = work.await;
            }
        }
    }

    /// A cache hit must be a regular, non-link file directly inside the cache directory.
    /// Anything else under a managed name (e.g. a planted symlink) is removed and regenerated.
    async fn cached_regular(&self, output: &Path) -> bool {
        match tokio::fs::symlink_metadata(output).await {
            Ok(meta) if meta.is_file() && !meta.file_type().is_symlink() && !crate::paths::is_reparse_point(&meta) => {
                output.parent() == Some(self.cache_dir.as_path())
            }
            Ok(_) => {
                crate::logging::warn("preview", "缓存目录中发现非常规缓存文件（链接或特殊文件），已移除并重新生成");
                let _ = tokio::fs::remove_file(output).await;
                false
            }
            Err(_) => false,
        }
    }

    pub fn end_maintenance(&self) {
        self.maintenance.store(false, Ordering::SeqCst);
    }

    pub fn in_maintenance(&self) -> bool {
        self.maintenance.load(Ordering::SeqCst)
    }

    pub async fn image(self: &Arc<Self>, file: &Path, size: &str) -> ApiResult<PathBuf> {
        let (w, h) = parse_size(size)?;
        self.get(file, &format!("image:{w}x{h}"), Kind::Image, (w, h)).await
    }

    pub async fn video(self: &Arc<Self>, file: &Path) -> ApiResult<PathBuf> {
        self.get(file, "video:1s:320x240", Kind::Video, (320, 240)).await
    }

    async fn get(self: &Arc<Self>, file: &Path, variant: &str, kind: Kind, size: (u32, u32)) -> ApiResult<PathBuf> {
        self.check_open()?;
        let meta = tokio::fs::metadata(file).await.map_err(|e| ApiError::io("preview.stat", &e))?;
        if !meta.is_file() {
            return Err(ApiError::bad_request("目标不是文件"));
        }
        let key = preview_key(file, &meta, variant);
        let output = self.cache_dir.join(format!("{key}.jpg"));
        let kind_name = if kind == Kind::Video { "video" } else { "image" };
        if self.cached_regular(&output).await {
            self.check_open()?;
            if !self.db.touch_cache(&key, kind_name)? {
                self.db.insert_cache(&key, ".jpg", kind_name)?;
            }
            return Ok(output);
        }
        let work = {
            let mut inflight = self.inflight.lock().unwrap();
            // Re-check under the lock so maintenance cannot miss a new generation.
            self.check_open()?;
            match inflight.get(&key) {
                Some(work) => work.clone(),
                None => {
                    let queue = if kind == Kind::Video { &self.videos } else { &self.images };
                    let reservation = queue.reserve()?;
                    let this = self.clone();
                    let (file, output, key2) = (file.to_path_buf(), output.clone(), key.clone());
                    let handle = tokio::spawn(async move {
                        let result = reservation.run(this.generate(&file, &output, &key2, kind, size)).await;
                        this.inflight.lock().unwrap().remove(&key2);
                        result
                    });
                    let shared = async move { handle.await.unwrap_or_else(|e| Err(ApiError::internal("preview.task", e))) }
                        .boxed()
                        .shared();
                    inflight.insert(key.clone(), shared.clone());
                    shared
                }
            }
        };
        work.await
    }

    async fn generate(&self, file: &Path, output: &Path, key: &str, kind: Kind, (w, h): (u32, u32)) -> ApiResult<PathBuf> {
        let temp = TempFile(self.cache_dir.join(format!(".preview-{}.jpg", uuid::Uuid::new_v4())));
        match kind {
            Kind::Image => {
                let open = || std::fs::File::open(file).map_err(|e| ApiError::io("preview.open", &e));
                let mut probe = Command::new(&self.tools.vipsheader);
                probe.arg("-a").arg("stdin").stdin(Stdio::from(open()?));
                vips_env(&mut probe);
                let header = run_tool(probe, PROCESS_TIMEOUT, "vipsheader", true).await?;
                let field = |name: &str| -> Option<u64> {
                    header
                        .lines()
                        .find_map(|l| l.strip_prefix(name).and_then(|v| v.trim().parse().ok()))
                };
                match (field("width:"), field("height:")) {
                    (Some(pw), Some(ph)) if pw.saturating_mul(ph) <= MAX_INPUT_PIXELS => {}
                    (Some(_), Some(_)) => return Err(ApiError::new(413, "图片像素过多，无法生成缩略图").code("PREVIEW_TOO_LARGE")),
                    _ => return Err(ApiError::new(422, "无法为该文件生成预览").code("PREVIEW_FAILED")),
                }
                let input = open()?;
                let mut command = Command::new(&self.tools.vips);
                vips_env(&mut command);
                // Feed the source on stdin so file names are never parsed as vips options.
                command
                    .arg("thumbnail_source")
                    .arg("[descriptor=0]")
                    .arg(format!("{}[Q=82,strip,interlace]", temp.0.display()))
                    .arg(w.to_string())
                    .arg("--height")
                    .arg(h.to_string())
                    .arg("--size")
                    .arg("down")
                    .stdin(Stdio::from(input));
                run_tool(command, PROCESS_TIMEOUT, "vips", false).await?;
            }
            Kind::Video => {
                let started = tokio::time::Instant::now();
                for seek in ["1", "0"] {
                    let remaining = PROCESS_TIMEOUT.saturating_sub(started.elapsed());
                    if remaining.is_zero() {
                        return Err(ApiError::new(504, "视频截图超时").code("PREVIEW_TIMEOUT"));
                    }
                    let mut command = Command::new(&self.tools.ffmpeg);
                    command
                        .args(["-nostdin", "-hide_banner", "-loglevel", "error", "-threads", "2"])
                        .args(["-protocol_whitelist", "file", "-format_whitelist", FFMPEG_FORMATS])
                        .args(["-ss", seek, "-i"])
                        .arg(format!("file:{}", file.display()))
                        .args(["-frames:v", "1", "-an", "-sn", "-dn", "-vf"])
                        .arg(format!("scale={w}:{h}:force_original_aspect_ratio=decrease,format=yuvj420p"))
                        .args(["-f", "image2", "-c:v", "mjpeg", "-y"])
                        .arg(&temp.0)
                        .stdin(Stdio::null());
                    run_tool(command, remaining, "ffmpeg", false).await?;
                    // Clips shorter than 1s produce no frame at 1s; retry from the start.
                    if tokio::fs::metadata(&temp.0).await.map(|m| m.len() > 0).unwrap_or(false) {
                        break;
                    }
                }
            }
        }
        match tokio::fs::metadata(&temp.0).await {
            Ok(m) if m.len() > 0 => {}
            _ => return Err(ApiError::new(422, "无法为该文件生成预览").code("PREVIEW_FAILED")),
        }
        tokio::fs::rename(&temp.0, output)
            .await
            .map_err(|e| ApiError::internal("preview.publish", e))?;
        // Only index after the file is durable at its final name.
        self.db
            .insert_cache(key, ".jpg", if kind == Kind::Video { "video" } else { "image" })?;
        Ok(output.to_path_buf())
    }
}

fn vips_env(command: &mut Command) {
    command.env("VIPS_CONCURRENCY", "2");
}

/// Read at most `limit` trailing bytes so hostile media cannot grow parent memory.
async fn read_tail(mut reader: impl tokio::io::AsyncRead + Unpin, limit: usize) -> Vec<u8> {
    use tokio::io::AsyncReadExt;
    let mut tail = Vec::new();
    let mut buf = [0u8; 4096];
    while let Ok(n) = reader.read(&mut buf).await {
        if n == 0 {
            break;
        }
        tail.extend_from_slice(&buf[..n]);
        if tail.len() > limit {
            tail.drain(..tail.len() - limit);
        }
    }
    tail
}

/// Run a tool with a deadline; stdout is captured (bounded) only when requested.
async fn run_tool(mut command: Command, timeout: Duration, name: &str, capture: bool) -> ApiResult<String> {
    command
        .stdout(if capture { Stdio::piped() } else { Stdio::null() })
        .stderr(Stdio::piped())
        .kill_on_drop(true);
    let mut child = command.spawn().map_err(|e| {
        if e.kind() == std::io::ErrorKind::NotFound {
            crate::logging::error("preview", &format!("未找到预览程序 {name}"));
            ApiError::new(503, "服务器未安装预览程序").code("PREVIEW_UNAVAILABLE")
        } else {
            ApiError::internal("preview.spawn", e)
        }
    })?;
    let stderr = child.stderr.take().map(|s| tokio::spawn(read_tail(s, STDERR_TAIL)));
    let stdout = child.stdout.take().map(|s| tokio::spawn(read_tail(s, 64 * 1024)));
    let status = match tokio::time::timeout(timeout, child.wait()).await {
        Err(_) => {
            let _ = child.kill().await;
            crate::logging::warn("preview", &format!("{name} 处理超时，已终止"));
            return Err(ApiError::new(504, "预览生成超时").code("PREVIEW_TIMEOUT"));
        }
        Ok(Err(e)) => return Err(ApiError::internal("preview.wait", e)),
        Ok(Ok(status)) => status,
    };
    let err = match stderr {
        Some(task) => task.await.unwrap_or_default(),
        None => Vec::new(),
    };
    let out = match stdout {
        Some(task) => task.await.unwrap_or_default(),
        None => Vec::new(),
    };
    if !status.success() {
        let text = String::from_utf8_lossy(&err);
        let tail: String = text.chars().rev().take(300).collect::<Vec<_>>().into_iter().rev().collect();
        crate::logging::warn("preview", &format!("{name} 失败: {}", tail.trim()));
        return Err(ApiError::new(422, "无法为该文件生成预览").code("PREVIEW_FAILED"));
    }
    Ok(String::from_utf8_lossy(&out).into_owned())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sizes() {
        assert_eq!(parse_size("320x240").unwrap(), (320, 240));
        for bad in ["0x10", "5001x1", "4000x4001", "abc", "10x", "+1x1", "10000x1"] {
            assert!(parse_size(bad).is_err(), "{bad}");
        }
    }

    #[tokio::test]
    async fn queue_limits() {
        let queue = Arc::new(WorkQueue::new(1, 2));
        let (tx, rx) = tokio::sync::oneshot::channel::<()>();
        let rx = Arc::new(tokio::sync::Mutex::new(Some(rx)));
        let q = queue.clone();
        let r = rx.clone();
        let first = tokio::spawn(async move {
            q.run(async move {
                let rx = r.lock().await.take().unwrap();
                let _ = rx.await;
            })
            .await
        });
        tokio::time::sleep(Duration::from_millis(20)).await;
        assert_eq!(queue.active(), 1);
        let a = queue.reserve().unwrap();
        let b = queue.reserve().unwrap();
        assert_eq!(queue.reserve().unwrap_err().status, 429);
        drop(a);
        assert_eq!(queue.pending(), 1);
        drop(b);
        tx.send(()).unwrap();
        first.await.unwrap().unwrap();
        assert_eq!(queue.active(), 0);
    }

    #[test]
    fn key_changes_with_metadata() {
        let dir = tempfile::tempdir().unwrap();
        let file = dir.path().join("a.jpg");
        std::fs::write(&file, "1").unwrap();
        let k1 = preview_key(&file, &std::fs::metadata(&file).unwrap(), "image:1x1");
        let k2 = preview_key(&file, &std::fs::metadata(&file).unwrap(), "image:2x2");
        std::fs::write(&file, "22").unwrap();
        let k3 = preview_key(&file, &std::fs::metadata(&file).unwrap(), "image:1x1");
        assert_ne!(k1, k2);
        assert_ne!(k1, k3);
    }

    #[test]
    fn bundled_tools_directory_is_optional() {
        let dir = tempfile::tempdir().unwrap();
        // Packages without a tools/ directory fall back to PATH resolution.
        assert_eq!(bundled_tool(dir.path(), "vips"), None);
        // A staged tool next to the executable wins over PATH lookup.
        let suffix = if cfg!(windows) { ".exe" } else { "" };
        let tools = dir.path().join("tools");
        std::fs::create_dir_all(&tools).unwrap();
        let vips = tools.join(format!("vips{suffix}"));
        std::fs::write(&vips, "tool").unwrap();
        assert_eq!(bundled_tool(dir.path(), "vips"), Some(vips));
        assert_eq!(bundled_tool(dir.path(), "ffmpeg"), None);
    }

    #[test]
    fn env_override_beats_bundled_tools() {
        let env = crate::config::Env::default();
        assert_eq!(resolve_tool(&env, "FILE_SERVER_VIPS", "vips"), "vips");
        let env = env.with("FILE_SERVER_VIPS", "/custom/vips");
        assert_eq!(resolve_tool(&env, "FILE_SERVER_VIPS", "vips"), "/custom/vips");
        assert_eq!(resolve_tool(&env, "FILE_SERVER_FFMPEG", "ffmpeg"), "ffmpeg");
    }
}
