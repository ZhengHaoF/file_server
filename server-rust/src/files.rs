//! Legacy-compatible file endpoints: list, download/thumbnail, video preview, delete, rename, upload.

use crate::auth::Identity;
use crate::error::{ApiError, ApiResult};
use crate::http::{inline_safe, mime_for, serve_file, JsonBody, ServeOptions};
use crate::paths::{self, fix_upload_filename, publish_file, resolve_dir_or_create, resolve_safe, EXISTING, EXISTING_ITEM, NEW_ITEM};
use crate::state::{SharedState, UPLOAD_LIMIT};
use axum::extract::{Multipart, Path as UrlPath, Query, State};
use axum::http::{HeaderMap, Method};
use axum::response::{IntoResponse, Response};
use axum::Json;
use futures::StreamExt;
use serde::Deserialize;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::atomic::Ordering;
use std::time::Duration;
use tokio::io::AsyncWriteExt;

pub type QueryMap = Query<HashMap<String, String>>;

/// Read permission: publicRead, any credential, or a valid read-only ticket.
pub fn require_read(state: &SharedState, headers: &HeaderMap, query: &HashMap<String, String>) -> ApiResult<()> {
    if state.cfg().public_read || state.identify(headers).is_some() {
        return Ok(());
    }
    let cfg = state.cfg();
    if query.get("ticket").is_some_and(|t| state.auth.ticket_valid(t, &cfg.access_token, &cfg.admin_token)) {
        return Ok(());
    }
    Err(ApiError::new(401, "请先登录文件服务").code("AUTH_REQUIRED"))
}

/// Write permission: a credential (never a ticket or anonymous publicRead) plus `writeEnabled`.
pub fn require_write(state: &SharedState, headers: &HeaderMap) -> ApiResult<Identity> {
    let identity = state.identify(headers).ok_or_else(|| ApiError::new(401, "请先登录文件服务"))?;
    if !state.cfg().write_enabled {
        return Err(ApiError::new(403, "文件写入功能未启用（writeEnabled）").code("WRITE_DISABLED"));
    }
    Ok(identity)
}

fn utf16_cmp(a: &str, b: &str) -> std::cmp::Ordering {
    a.encode_utf16().cmp(b.encode_utf16())
}

fn parse_index(value: Option<&String>, default: i64) -> Option<i64> {
    match value {
        None => Some(default),
        Some(v) => {
            let v = v.trim();
            if v.is_empty() {
                return Some(0);
            }
            let n: f64 = v.parse().ok()?;
            (n.is_finite() && n.fract() == 0.0 && n.abs() < 9e15).then_some(n as i64)
        }
    }
}

fn iso(time: std::io::Result<std::time::SystemTime>) -> Value {
    match time {
        Ok(t) => {
            let dt: chrono::DateTime<chrono::Utc> = t.into();
            Value::String(dt.to_rfc3339_opts(chrono::SecondsFormat::Millis, true))
        }
        Err(_) => Value::Null,
    }
}

pub async fn list(
    State(state): State<SharedState>,
    path: Option<UrlPath<String>>,
    headers: HeaderMap,
    Query(query): QueryMap,
) -> ApiResult<Response> {
    require_read(&state, &headers, &query)?;
    let raw = path.map(|p| p.0).unwrap_or_default();
    // Legacy alias: only "$"/"$$" denote the root here (v2 has no alias).
    let input = if raw == "$" || raw == "$$" { String::new() } else { raw };
    list_inner(&state, &input, &query).await
}

/// v2: `GET /api/v2/files?path=<raw relative path>&sta=&end=`.
pub async fn list_v2(State(state): State<SharedState>, headers: HeaderMap, Query(query): QueryMap) -> ApiResult<Response> {
    require_read(&state, &headers, &query)?;
    let input = query.get("path").cloned().unwrap_or_default();
    list_inner(&state, &input, &query).await
}

/// v2: `GET /api/v2/content?path=` — never interprets `!WxH`.
pub async fn content_v2(
    State(state): State<SharedState>,
    method: Method,
    headers: HeaderMap,
    Query(query): QueryMap,
) -> ApiResult<Response> {
    require_read(&state, &headers, &query)?;
    let input = query.get("path").ok_or_else(|| ApiError::bad_request("缺少 path 参数"))?;
    let file = resolve_safe(&state.cfg().root_path, input, EXISTING_ITEM).await?;
    serve_original(&file, &method, &headers).await
}

/// v2: `GET /api/v2/preview?path=&kind=image|video&width=&height=`.
pub async fn preview_v2(
    State(state): State<SharedState>,
    method: Method,
    headers: HeaderMap,
    Query(query): QueryMap,
) -> ApiResult<Response> {
    require_read(&state, &headers, &query)?;
    let input = query.get("path").ok_or_else(|| ApiError::bad_request("缺少 path 参数"))?;
    let file = resolve_safe(&state.cfg().root_path, input, EXISTING_ITEM).await?;
    let cached = match query.get("kind").map(String::as_str) {
        Some("image") => {
            let size = format!(
                "{}x{}",
                query.get("width").map(String::as_str).unwrap_or(""),
                query.get("height").map(String::as_str).unwrap_or("")
            );
            state.previews.image(&file, &size).await?
        }
        Some("video") => state.previews.video(&file).await?,
        _ => return Err(ApiError::bad_request("kind 必须为 image 或 video")),
    };
    serve_cached(&cached, &method, &headers).await
}

async fn serve_original(file: &Path, method: &Method, headers: &HeaderMap) -> ApiResult<Response> {
    let name = file.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
    let inline = inline_safe(&name);
    serve_file(
        file,
        method,
        headers,
        ServeOptions {
            content_type: mime_for(&name),
            attachment: if inline { None } else { Some(&name) },
            sandbox: true,
        },
    )
    .await
}

async fn list_inner(state: &SharedState, input: &str, query: &HashMap<String, String>) -> ApiResult<Response> {
    let input = input.to_string();
    let root = state.cfg().root_path;
    let directory = resolve_safe(&root, &input, EXISTING).await?;
    let meta = tokio::fs::metadata(&directory).await.map_err(|e| ApiError::io("list.stat", &e))?;
    if !meta.is_dir() {
        return Err(ApiError::bad_request("目标不是目录"));
    }
    let start = parse_index(query.get("sta"), 0);
    let end = start.and_then(|s| parse_index(query.get("end"), s + 200));
    let (start, end) = match (start, end) {
        (Some(s), Some(e)) if s >= 0 && e > s && e - s <= 2000 => (s as usize, e as usize),
        _ => return Err(ApiError::bad_request("分页参数必须为非负整数，且每页最多 2000 项")),
    };
    let mut reader = tokio::fs::read_dir(&directory).await.map_err(|e| ApiError::io("list.read", &e))?;
    let mut names: Vec<String> = Vec::new();
    loop {
        match reader.next_entry().await {
            Ok(Some(entry)) => {
                let Ok(name) = entry.file_name().into_string() else {
                    crate::logging::warn("files", "忽略非 UTF-8 名称的目录项");
                    continue;
                };
                if name.starts_with('.') {
                    continue;
                }
                match entry.file_type().await {
                    Ok(t) if t.is_symlink() => continue,
                    Ok(_) => names.push(name),
                    Err(_) => continue,
                }
            }
            Ok(None) => break,
            Err(e) => {
                crate::logging::warn("files", &format!("目录读取中断: {e}"));
                break;
            }
        }
    }
    names.sort_by(|a, b| utf16_cmp(a, b));
    let total = names.len();
    let selected: Vec<String> = names.into_iter().skip(start).take(end - start).collect();
    // Metadata only for the selected page, bounded concurrency, per-item failure isolation.
    let list: Vec<Value> = futures::stream::iter(selected)
        .map(|name| {
            let path = directory.join(&name);
            async move {
                let meta = tokio::fs::symlink_metadata(&path).await.ok()?;
                if meta.file_type().is_symlink() || !(meta.is_file() || meta.is_dir()) {
                    return None;
                }
                Some(json!({
                    "name": name,
                    "size": meta.len(),
                    "isDirectory": meta.is_dir(),
                    "isFile": meta.is_file(),
                    "suffix": paths::extname(&name),
                    "mtime": iso(meta.modified()),
                }))
            }
        })
        .buffered(16)
        .filter_map(|v| async move { v })
        .collect()
        .await;
    let body = json!({
        "listNum": total,
        "list": list,
        "nextStart": if end < total { Value::from(end) } else { Value::Null },
    });
    Ok(([("cache-control", "no-store")], Json(body)).into_response())
}

/// Split `photo.jpg!320x240` thumbnail requests.
fn thumbnail_request(input: &str) -> Option<(&str, &str)> {
    let (file, size) = input.rsplit_once('!')?;
    if size.contains('/') {
        return None;
    }
    let ext = paths::extname(file).to_lowercase();
    matches!(ext.as_str(), ".jpg" | ".jpeg" | ".png" | ".gif" | ".svg" | ".webp").then_some((file, size))
}

pub async fn get_file(
    State(state): State<SharedState>,
    UrlPath(input): UrlPath<String>,
    method: Method,
    headers: HeaderMap,
    Query(query): QueryMap,
) -> ApiResult<Response> {
    require_read(&state, &headers, &query)?;
    let root = state.cfg().root_path;
    if let Some((file, size)) = thumbnail_request(&input) {
        let file = resolve_safe(&root, file, EXISTING_ITEM).await?;
        let cached = state.previews.image(&file, size).await?;
        return serve_cached(&cached, &method, &headers).await;
    }
    let file = resolve_safe(&root, &input, EXISTING_ITEM).await?;
    serve_original(&file, &method, &headers).await
}

async fn serve_cached(path: &Path, method: &Method, headers: &HeaderMap) -> ApiResult<Response> {
    serve_file(
        path,
        method,
        headers,
        ServeOptions {
            content_type: "image/jpeg".into(),
            attachment: None,
            sandbox: true,
        },
    )
    .await
}

pub async fn video_preview(
    State(state): State<SharedState>,
    UrlPath(input): UrlPath<String>,
    method: Method,
    headers: HeaderMap,
    Query(query): QueryMap,
) -> ApiResult<Response> {
    require_read(&state, &headers, &query)?;
    let file = resolve_safe(&state.cfg().root_path, &input, EXISTING_ITEM).await?;
    let cached = state.previews.video(&file).await?;
    serve_cached(&cached, &method, &headers).await
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DeleteBody {
    file_path: Option<Value>,
}

fn path_string(value: Option<Value>) -> ApiResult<String> {
    match value {
        Some(Value::String(s)) => Ok(s),
        _ => Err(ApiError::bad_request("非法文件路径")),
    }
}

pub async fn delete(State(state): State<SharedState>, headers: HeaderMap, JsonBody(body): JsonBody<DeleteBody>) -> ApiResult<Response> {
    let identity = require_write(&state, &headers)?;
    let root = state.cfg().root_path;
    let file = resolve_safe(&root, &path_string(body.file_path)?, EXISTING_ITEM).await?;
    let _lock = paths::LOCKS.lock(&file).await;
    let meta = tokio::fs::symlink_metadata(&file)
        .await
        .map_err(|e| ApiError::io("delete.stat", &e))?;
    if meta.file_type().is_symlink() {
        return Err(ApiError::new(403, "不允许访问软链接或目录联接"));
    }
    // remove_dir_all never follows symlinks inside the tree.
    let result = if meta.is_dir() {
        tokio::fs::remove_dir_all(&file).await
    } else {
        tokio::fs::remove_file(&file).await
    };
    result.map_err(|e| ApiError::io("delete", &e))?;
    let target = paths::relative(&root, &file);
    crate::logging::info("files", "文件删除成功");
    state.audit(
        "file.delete",
        &identity.actor(),
        &target,
        "succeeded",
        json!({ "requestId": crate::error::current_request_id() }),
    );
    Ok(Json(json!({ "msg": "删除成功" })).into_response())
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RenameBody {
    old_path: Option<Value>,
    new_path: Option<Value>,
}

pub async fn rename(State(state): State<SharedState>, headers: HeaderMap, JsonBody(body): JsonBody<RenameBody>) -> ApiResult<Response> {
    let identity = require_write(&state, &headers)?;
    let root = state.cfg().root_path;
    let (old_input, new_input) = (path_string(body.old_path)?, path_string(body.new_path)?);
    let old = resolve_safe(&root, &old_input, EXISTING_ITEM).await?;
    let new = resolve_safe(&root, &new_input, NEW_ITEM).await?;
    let base = new.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
    if fix_upload_filename(&base)? != base {
        return Err(ApiError::bad_request("目标文件名无效"));
    }
    {
        let _lock = paths::LOCKS.lock(&new).await;
        // Re-check after waiting for the destination lock.
        resolve_safe(&root, &old_input, EXISTING_ITEM).await?;
        resolve_safe(&root, &new_input, NEW_ITEM).await?;
        match tokio::fs::symlink_metadata(&new).await {
            Ok(_) => return Err(ApiError::new(409, "目标名称已存在")),
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => {}
            Err(e) => return Err(ApiError::io("rename.stat", &e)),
        }
        let meta = tokio::fs::symlink_metadata(&old)
            .await
            .map_err(|e| ApiError::io("rename.stat", &e))?;
        if meta.is_dir() {
            if paths::is_within(&new, &old) {
                return Err(ApiError::bad_request("不能把目录移动到自身内部"));
            }
            tokio::fs::rename(&old, &new).await.map_err(|e| ApiError::io("rename.dir", &e))?;
        } else {
            publish_file(&old, &new).await?;
        }
    }
    crate::logging::info("files", "文件重命名成功");
    state.audit(
        "file.rename",
        &identity.actor(),
        &paths::relative(&root, &old),
        "succeeded",
        json!({ "destination": paths::relative(&root, &new), "requestId": crate::error::current_request_id() }),
    );
    Ok(Json(json!({ "msg": "重命名成功" })).into_response())
}

/// Upload slot; released on drop (including client disconnect / future cancellation).
struct Slot(SharedState);
impl Drop for Slot {
    fn drop(&mut self) {
        self.0.uploads_active.fetch_sub(1, Ordering::SeqCst);
    }
}

/// Temporary upload file; removed on every exit path, including cancellation.
struct TempUpload(Option<PathBuf>);
impl Drop for TempUpload {
    fn drop(&mut self) {
        if let Some(path) = self.0.take() {
            if let Err(e) = std::fs::remove_file(&path) {
                if e.kind() != std::io::ErrorKind::NotFound {
                    crate::logging::warn("files", &format!("上传临时文件清理失败: {:?}", e.kind()));
                }
            }
        }
    }
}

async fn idle<T, E>(duration: Duration, future: impl std::future::Future<Output = Result<T, E>>) -> ApiResult<T>
where
    E: std::fmt::Display,
{
    match tokio::time::timeout(duration, future).await {
        Err(_) => Err(ApiError::new(408, "请求超时，请检查网络后重试").code("REQUEST_TIMEOUT")),
        Ok(Err(e)) => Err(ApiError::bad_request(format!("上传数据无效或连接中断: {e}"))),
        Ok(Ok(v)) => Ok(v),
    }
}

pub async fn upload(
    State(state): State<SharedState>,
    headers: HeaderMap,
    multipart: Result<Multipart, axum::extract::multipart::MultipartRejection>,
) -> ApiResult<Response> {
    crate::logging::info("files", "收到 /upload 请求");
    let identity = match require_write(&state, &headers) {
        Ok(id) => id,
        Err(e) => {
            crate::logging::warn("files", &format!("上传被拒绝: 权限校验未通过 ({e})"));
            return Err(e);
        }
    };
    let config = state.cfg();
    if !config.upload_enabled {
        crate::logging::warn("files", "上传被拒绝: 服务端 uploadEnabled 为 false (未启用上传功能)");
        return Err(ApiError::new(403, "上传功能未启用").code("UPLOAD_DISABLED"));
    }
    if state.uploads_active.fetch_add(1, Ordering::SeqCst) >= UPLOAD_LIMIT {
        state.uploads_active.fetch_sub(1, Ordering::SeqCst);
        crate::logging::warn("files", "上传被拒绝: 任务过多达到并发限制");
        return Err(ApiError::new(429, "上传任务过多，请稍后重试"));
    }
    let _slot = Slot(state.clone());
    let multipart = multipart.map_err(|_| ApiError::bad_request("请使用 multipart/form-data 上传"))?;
    let total = Duration::from_secs(config.upload_timeout_seconds.max(1));
    match tokio::time::timeout(total, receive(&state, &config, identity, multipart)).await {
        Ok(result) => result,
        Err(_) => Err(ApiError::new(408, "请求超时，请检查网络后重试").code("REQUEST_TIMEOUT")),
    }
}

async fn receive(state: &SharedState, config: &crate::config::Config, identity: Identity, mut multipart: Multipart) -> ApiResult<Response> {
    let idle_limit = Duration::from_secs(config.upload_idle_timeout_seconds.max(1));
    let max = config.upload_max_bytes();
    let root = &config.root_path;
    let mut dest: Option<String> = None;
    let mut received: Option<(PathBuf, String, u64)> = None;
    let mut temp = TempUpload(None);
    let mut parts = 0;
    while let Some(mut field) = idle(idle_limit, multipart.next_field()).await? {
        parts += 1;
        if parts > 3 {
            return Err(ApiError::bad_request("上传字段过多"));
        }
        let name = field.name().unwrap_or("").to_string();
        match name.as_str() {
            "destPath" if field.file_name().is_none() => {
                if dest.is_some() || received.is_some() {
                    return Err(ApiError::bad_request("destPath 只能出现一次并且必须排在 file 字段之前"));
                }
                let mut value = Vec::new();
                while let Some(chunk) = idle(idle_limit, field.chunk()).await? {
                    value.extend_from_slice(&chunk);
                    if value.len() > 4096 {
                        return Err(ApiError::bad_request("destPath 过长"));
                    }
                }
                dest = Some(String::from_utf8(value).map_err(|_| ApiError::bad_request("非法文件路径"))?);
            }
            "file" => {
                if received.is_some() {
                    return Err(ApiError::bad_request("每次只能上传一个文件"));
                }
                let Some(dest_input) = dest.clone() else {
                    return Err(ApiError::bad_request("destPath 必须排在 file 字段之前"));
                };
                let original = field.file_name().ok_or_else(|| ApiError::bad_request("缺少文件名"))?.to_string();
                let safe_name = fix_upload_filename(&original)?;
                let dir = resolve_dir_or_create(root, &dest_input).await?;
                let temp_path = dir.join(format!(".fsupload-{}", uuid::Uuid::new_v4()));
                let mut file = tokio::fs::OpenOptions::new()
                    .write(true)
                    .create_new(true)
                    .open(&temp_path)
                    .await
                    .map_err(|e| ApiError::io("upload.create", &e))?;
                temp.0 = Some(temp_path.clone());
                let mut size: u64 = 0;
                while let Some(chunk) = idle(idle_limit, field.chunk()).await? {
                    size += chunk.len() as u64;
                    if size > max {
                        return Err(ApiError::new(413, "文件大小超过上传上限"));
                    }
                    file.write_all(&chunk).await.map_err(|e| ApiError::io("upload.write", &e))?;
                }
                file.sync_all().await.map_err(|e| ApiError::io("upload.sync", &e))?;
                drop(file);
                received = Some((dir.join(&safe_name), dest_input, size));
            }
            _ => return Err(ApiError::bad_request("未知上传字段")),
        }
    }
    let Some((target, dest_input, size)) = received else {
        return Err(ApiError::bad_request("缺少文件"));
    };
    let temp_path = temp.0.clone().expect("temp exists with received file");
    {
        let _lock = paths::LOCKS.lock(&target).await;
        resolve_safe(root, &dest_input, EXISTING).await?;
        publish_file(&temp_path, &target).await?;
    }
    let name = target.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
    state.audit(
        "file.upload",
        &identity.actor(),
        &paths::relative(root, &target),
        "succeeded",
        json!({ "size": size, "requestId": crate::error::current_request_id() }),
    );
    crate::logging::info("files", "文件上传成功");
    Ok(Json(json!({ "msg": "上传成功", "name": name, "size": size })).into_response())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn thumbnails_and_indexes() {
        assert_eq!(thumbnail_request("a/b.JPG!320x240"), Some(("a/b.JPG", "320x240")));
        assert_eq!(thumbnail_request("a/b.txt!320x240"), None);
        assert_eq!(thumbnail_request("a!b/c.jpg"), None);
        assert_eq!(parse_index(None, 7), Some(7));
        assert_eq!(parse_index(Some(&"3".into()), 0), Some(3));
        assert_eq!(parse_index(Some(&"1.5".into()), 0), None);
        assert_eq!(parse_index(Some(&"x".into()), 0), None);
        assert_eq!(utf16_cmp("a", "b"), std::cmp::Ordering::Less);
    }
}
