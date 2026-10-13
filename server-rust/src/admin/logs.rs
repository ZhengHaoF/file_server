//! Log query (time or append order, stable cursors), CSV/JSON export and the live WebSocket.

use crate::error::{ApiError, ApiResult};
use crate::logging::{parse_line, parse_time, LogEntry};
use crate::state::SharedState;
use axum::extract::ws::{CloseFrame, Message, WebSocket, WebSocketUpgrade};
use axum::extract::State;
use axum::http::HeaderMap;
use axum::response::{IntoResponse, Response};
use base64::Engine;
use serde_json::{json, Value};
use std::collections::{HashMap, HashSet};
use std::io::{Read, Seek, SeekFrom};
use std::path::{Path, PathBuf};
use std::time::Duration;

const MAX_FILE_BYTES: u64 = 64 * 1024 * 1024;
const MAX_LINE_BYTES: usize = 64 * 1024;
const BLOCK: u64 = 64 * 1024;
const LEVELS: &[&str] = &["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"];

#[derive(Debug, Clone, PartialEq)]
struct Position {
    identity: String,
    offset: u64,
}

#[derive(Debug, Clone)]
struct Cursor {
    time: Option<String>,
    id: String,
    position: Option<Position>,
}

fn encode_cursor(entry: &LogEntry, position: Option<&Position>) -> String {
    let value = json!({
        "time": entry.timestamp, "id": entry.id,
        "position": position.map(|p| json!({ "identity": p.identity, "offset": p.offset })),
    });
    base64::engine::general_purpose::URL_SAFE_NO_PAD.encode(value.to_string())
}

fn decode_cursor(cursor: &str) -> ApiResult<Cursor> {
    let invalid = || ApiError::bad_request("无效日志分页游标");
    if cursor.len() > 512 {
        return Err(invalid());
    }
    let bytes = base64::engine::general_purpose::URL_SAFE_NO_PAD
        .decode(cursor.trim_end_matches('='))
        .map_err(|_| invalid())?;
    let value: Value = serde_json::from_slice(&bytes).map_err(|_| invalid())?;
    let id = value["id"]
        .as_str()
        .filter(|s| s.len() == 24 && s.bytes().all(|b| b.is_ascii_hexdigit()))
        .ok_or_else(invalid)?;
    let time = match &value["time"] {
        Value::Null => None,
        Value::String(t) if parse_time(t).is_some() => Some(t.clone()),
        _ => return Err(invalid()),
    };
    let position = match &value["position"] {
        Value::Null => None,
        p => {
            let identity = p["identity"]
                .as_str()
                .filter(|s| !s.is_empty() && s.len() <= 100 && s.bytes().all(|b| b.is_ascii_digit() || b == b':' || b == b'.'))
                .ok_or_else(invalid)?;
            Some(Position {
                identity: identity.into(),
                offset: p["offset"].as_u64().ok_or_else(invalid)?,
            })
        }
    };
    Ok(Cursor {
        time,
        id: id.into(),
        position,
    })
}

pub fn file_identity(meta: &std::fs::Metadata) -> String {
    #[cfg(unix)]
    {
        use std::os::unix::fs::MetadataExt;
        let birth = meta
            .created()
            .ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_millis())
            .unwrap_or(0);
        format!("{}:{}:{}", meta.dev(), meta.ino(), birth)
    }
    #[cfg(not(unix))]
    {
        let birth = meta
            .created()
            .ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_millis())
            .unwrap_or(0);
        format!("0:0:{birth}")
    }
}

fn rank(name: &str) -> u32 {
    name.trim_end_matches(".gz")
        .rsplit('.')
        .next()
        .and_then(|n| n.parse().ok())
        .unwrap_or(0)
}

fn log_files(dir: &Path, source: &str) -> Vec<PathBuf> {
    let Ok(reader) = std::fs::read_dir(dir) else { return Vec::new() };
    let mut names: Vec<String> = reader
        .filter_map(|e| e.ok())
        .filter(|e| e.file_type().map(|t| t.is_file()).unwrap_or(false))
        .filter_map(|e| e.file_name().into_string().ok())
        .filter(|n| match source {
            "supervisor" => n == "restart.log",
            _ => {
                n == "app.log"
                    || ["1", "2", "3"]
                        .iter()
                        .any(|i| *n == format!("app.log.{i}") || *n == format!("app.log.{i}.gz"))
            }
        })
        .collect();
    names.sort_by_key(|n| rank(n));
    names.into_iter().map(|n| dir.join(n)).collect()
}

fn too_large() -> ApiError {
    ApiError::new(413, "日志文件过大，请先在服务器归档")
}

fn split_records(data: &[u8]) -> Vec<(u64, String)> {
    let mut out = Vec::new();
    let mut start = 0usize;
    for (i, b) in data.iter().enumerate() {
        if *b == b'\n' {
            if i > start {
                out.push((start as u64, line_text(&data[start..i])));
            }
            start = i + 1;
        }
    }
    if start < data.len() {
        out.push((start as u64, line_text(&data[start..])));
    }
    out
}

fn line_text(bytes: &[u8]) -> String {
    let bytes = &bytes[..bytes.len().min(MAX_LINE_BYTES)];
    String::from_utf8_lossy(bytes).trim_end_matches('\r').to_string()
}

fn read_gz(path: &Path) -> ApiResult<Vec<u8>> {
    let file = std::fs::File::open(path).map_err(|e| ApiError::io("logs.open", &e))?;
    let mut data = Vec::new();
    flate2::read::MultiGzDecoder::new(file)
        .take(MAX_FILE_BYTES + 1)
        .read_to_end(&mut data)
        .map_err(|_| ApiError::new(500, "日志归档无法解压"))?;
    if data.len() as u64 > MAX_FILE_BYTES {
        return Err(too_large());
    }
    Ok(data)
}

/// Newest-first scan of physical records with offsets `< before`. The callback returns false to stop.
fn reverse_scan(path: &Path, before: u64, active: bool, f: &mut dyn FnMut(u64, &str) -> bool) -> ApiResult<()> {
    if path.extension().is_some_and(|e| e == "gz") {
        for (offset, line) in split_records(&read_gz(path)?).into_iter().rev() {
            if offset < before && !f(offset, &line) {
                return Ok(());
            }
        }
        return Ok(());
    }
    let mut file = std::fs::File::open(path).map_err(|e| ApiError::io("logs.open", &e))?;
    let size = file.metadata().map_err(|e| ApiError::io("logs.stat", &e))?.len();
    let mut position = size.min(before);
    let mut pending: Vec<u8> = Vec::new();
    let mut first = true;
    while position > 0 {
        let start = position.saturating_sub(BLOCK);
        let mut buffer = vec![0u8; (position - start) as usize];
        file.seek(SeekFrom::Start(start)).map_err(|e| ApiError::io("logs.seek", &e))?;
        file.read_exact(&mut buffer)
            .map_err(|_| ApiError::new(409, "日志读取期间发生变化，请刷新"))?;
        buffer.extend_from_slice(&pending);
        pending = buffer;
        if first {
            // Drop an incomplete trailing record of the file being written.
            if active && before >= size && pending.last() != Some(&b'\n') {
                match pending.iter().rposition(|b| *b == b'\n') {
                    Some(i) => pending.truncate(i + 1),
                    None if start > 0 => {}
                    None => pending.clear(),
                }
            }
            first = false;
        }
        let mut right = pending.len();
        while let Some(i) = pending[..right].iter().rposition(|b| *b == b'\n') {
            if right > i + 1 && !f(start + i as u64 + 1, &line_text(&pending[i + 1..right])) {
                return Ok(());
            }
            right = i;
        }
        pending.truncate(right);
        if pending.len() > MAX_LINE_BYTES * 16 {
            // Pathological record without newlines: skip it rather than grow memory.
            pending.clear();
        }
        position = start;
    }
    if !pending.is_empty() {
        f(0, &line_text(&pending));
    }
    Ok(())
}

fn forward_scan(path: &Path, f: &mut dyn FnMut(u64, &str)) -> ApiResult<()> {
    let data = if path.extension().is_some_and(|e| e == "gz") {
        read_gz(path)?
    } else {
        let file = std::fs::File::open(path).map_err(|e| ApiError::io("logs.open", &e))?;
        let mut data = Vec::new();
        file.take(MAX_FILE_BYTES + 1)
            .read_to_end(&mut data)
            .map_err(|e| ApiError::io("logs.read", &e))?;
        if data.len() as u64 > MAX_FILE_BYTES {
            return Err(too_large());
        }
        data
    };
    for (offset, line) in split_records(&data) {
        f(offset, &line);
    }
    Ok(())
}

pub struct Query {
    pub limit: usize,
    pub source: String,
    pub level: Option<String>,
    pub keyword: String,
    pub start: Option<i64>,
    pub end: Option<i64>,
    pub before: Option<String>,
    pub append: bool,
}

impl Query {
    pub fn parse(q: &HashMap<String, String>, max: usize, default_limit: usize) -> ApiResult<Self> {
        let limit = match q.get("limit").filter(|s| !s.is_empty()) {
            Some(v) => v.parse::<usize>().ok().filter(|n| *n >= 1 && *n <= max),
            None => Some(default_limit.min(max)),
        }
        .ok_or_else(|| ApiError::bad_request(format!("日志条数须为 1 到 {max}")))?;
        let source = q
            .get("source")
            .filter(|s| !s.is_empty())
            .cloned()
            .unwrap_or_else(|| "application".into());
        if source != "application" && source != "supervisor" {
            return Err(ApiError::bad_request("无效日志来源"));
        }
        let level = q.get("level").filter(|s| !s.is_empty()).map(|s| s.to_uppercase());
        if level.as_deref().is_some_and(|l| !LEVELS.contains(&l)) {
            return Err(ApiError::bad_request("无效日志级别"));
        }
        let keyword = q.get("keyword").cloned().unwrap_or_default();
        if keyword.chars().count() > 200 {
            return Err(ApiError::bad_request("关键词过长"));
        }
        let time = |key: &str| -> ApiResult<Option<i64>> {
            match q.get(key).filter(|s| !s.is_empty()) {
                None => Ok(None),
                Some(v) => parse_time(v).map(Some).ok_or_else(|| ApiError::bad_request("时间参数无效")),
            }
        };
        let (start, end) = (time("start")?, time("end")?);
        if let (Some(s), Some(e)) = (start, end) {
            if s > e {
                return Err(ApiError::bad_request("开始时间不能晚于结束时间"));
            }
        }
        let append = match q.get("order").map(String::as_str) {
            None | Some("") | Some("time") => false,
            Some("append") => true,
            _ => return Err(ApiError::bad_request("无效日志排序")),
        };
        Ok(Self {
            limit,
            source,
            level,
            keyword,
            start,
            end,
            before: q.get("before").filter(|s| !s.is_empty()).cloned(),
            append,
        })
    }

    fn matches(&self, log: &LogEntry) -> bool {
        if self.level.as_deref().is_some_and(|l| log.level != l) {
            return false;
        }
        if !self.keyword.is_empty() && !log.message.contains(&self.keyword) {
            return false;
        }
        let t = log.timestamp.as_deref().and_then(parse_time).unwrap_or(0);
        !(self.start.is_some_and(|s| t < s) || self.end.is_some_and(|e| t > e))
    }
}

fn order_key(log: &LogEntry) -> (i64, String) {
    (log.timestamp.as_deref().and_then(parse_time).unwrap_or(0), log.id.clone())
}

pub struct Page {
    pub logs: Vec<LogEntry>,
    pub next: Option<String>,
    pub append: bool,
}

pub fn query(dir: &Path, q: &Query) -> ApiResult<Page> {
    let boundary = q.before.as_deref().map(decode_cursor).transpose()?;
    if let Some(b) = &boundary {
        if b.position.is_some() != q.append {
            return Err(ApiError::bad_request("日志游标与排序不匹配"));
        }
    }
    let files = log_files(dir, &q.source);
    let mut results: Vec<LogEntry> = Vec::new();
    let mut seen: HashSet<String> = HashSet::new();
    if q.append {
        let mut boundary_found = boundary.as_ref().and_then(|b| b.position.as_ref()).is_none();
        let mut last_position: Option<Position> = None;
        for (index, file) in files.iter().enumerate() {
            let Ok(meta) = std::fs::metadata(file) else { continue };
            let identity = file_identity(&meta);
            let mut before = u64::MAX;
            if !boundary_found {
                let position = boundary.as_ref().and_then(|b| b.position.as_ref()).unwrap();
                if position.identity != identity {
                    continue;
                }
                boundary_found = true;
                before = position.offset;
                if !file.extension().is_some_and(|e| e == "gz") && before >= meta.len() {
                    return Err(ApiError::new(409, "日志游标对应的文件已截断，请刷新"));
                }
            }
            let mut stop = false;
            reverse_scan(file, before, index == 0, &mut |offset, line| {
                let Some(log) = parse_line(line, &q.source, &format!("{identity}:{offset}")) else {
                    return true;
                };
                if !q.matches(&log) || !seen.insert(log.id.clone()) {
                    return true;
                }
                results.push(log);
                if results.len() <= q.limit {
                    last_position = Some(Position {
                        identity: identity.clone(),
                        offset,
                    });
                    true
                } else {
                    stop = true;
                    false
                }
            })?;
            if stop {
                break;
            }
        }
        if !boundary_found {
            return Err(ApiError::new(409, "日志游标对应的文件已轮转或归档，请刷新"));
        }
        let more = results.len() > q.limit;
        results.truncate(q.limit);
        let next = if more {
            results.last().map(|l| encode_cursor(l, last_position.as_ref()))
        } else {
            None
        };
        return Ok(Page {
            logs: results,
            next,
            append: true,
        });
    }
    let boundary_key = boundary
        .as_ref()
        .map(|b| (b.time.as_deref().and_then(parse_time).unwrap_or(0), b.id.clone()));
    for file in &files {
        let Ok(meta) = std::fs::metadata(file) else { continue };
        let identity = file_identity(&meta);
        forward_scan(file, &mut |offset, line| {
            let Some(log) = parse_line(line, &q.source, &format!("{identity}:{offset}")) else {
                return;
            };
            if !q.matches(&log) {
                return;
            }
            if boundary_key.as_ref().is_some_and(|b| order_key(&log) >= *b) {
                return;
            }
            if !seen.insert(log.id.clone()) {
                return;
            }
            results.push(log);
            if results.len() > (q.limit + 1) * 2 {
                results.sort_by_key(|l| std::cmp::Reverse(order_key(l)));
                results.truncate(q.limit + 1);
                seen = results.iter().map(|l| l.id.clone()).collect();
            }
        })?;
    }
    results.sort_by_key(|l| std::cmp::Reverse(order_key(l)));
    let more = results.len() > q.limit;
    results.truncate(q.limit);
    let next = if more {
        results.last().map(|l| encode_cursor(l, None))
    } else {
        None
    };
    Ok(Page {
        logs: results,
        next,
        append: false,
    })
}

pub fn csv(logs: &[LogEntry]) -> String {
    let cell = |value: &str| {
        let mut text = value.to_string();
        if text.trim_start().starts_with(['=', '+', '-', '@']) || text.starts_with(['\t', '\r']) {
            text = format!("'{text}");
        }
        format!("\"{}\"", text.replace('"', "\"\""))
    };
    let mut out = String::from("\u{feff}timestamp,level,category,message,source\n");
    let rows: Vec<String> = logs
        .iter()
        .map(|l| {
            [l.timestamp.as_deref().unwrap_or(""), &l.level, &l.category, &l.message, &l.source]
                .iter()
                .map(|v| cell(v))
                .collect::<Vec<_>>()
                .join(",")
        })
        .collect();
    out.push_str(&rows.join("\n"));
    out
}

pub fn page_json(page: &Page) -> Value {
    json!({
        "logs": page.logs, "total": page.logs.len(), "order": if page.append { "append" } else { "time" },
        "nextCursor": page.next,
    })
}

fn origin_allowed(state: &SharedState, headers: &HeaderMap, tls: bool) -> bool {
    let Some(origin) = headers.get("origin").and_then(|v| v.to_str().ok()) else {
        return true;
    };
    let host = headers.get("host").and_then(|v| v.to_str().ok()).unwrap_or("");
    origin == format!("{}://{host}", if tls { "https" } else { "http" }) || state.cfg().allowed_origins.iter().any(|o| o == origin)
}

pub async fn stream(
    State(state): State<SharedState>,
    headers: HeaderMap,
    scheme: Option<axum::Extension<crate::server::Scheme>>,
    upgrade: Result<WebSocketUpgrade, axum::extract::ws::rejection::WebSocketUpgradeRejection>,
) -> Response {
    let tls = scheme.is_some_and(|s| s.0 == crate::server::Scheme::Https);
    if !origin_allowed(&state, &headers, tls) {
        return ApiError::new(403, "不允许该来源连接日志流").into_response();
    }
    if state.identify(&headers).map(|i| i.role) != Some(crate::auth::Role::Admin) {
        return ApiError::new(401, "需要管理员认证").into_response();
    }
    let upgrade = match upgrade {
        Ok(u) => u,
        Err(_) => return ApiError::bad_request("需要 WebSocket 升级请求").into_response(),
    };
    upgrade
        .max_message_size(4096)
        .on_upgrade(move |socket| live(state, headers, socket))
}

async fn close(socket: &mut WebSocket, code: u16, reason: &str) {
    let _ = socket
        .send(Message::Close(Some(CloseFrame {
            code,
            reason: reason.into(),
        })))
        .await;
}

async fn live(state: SharedState, headers: HeaderMap, mut socket: WebSocket) {
    let Some(mut receiver) = crate::logging::subscribe() else {
        close(&mut socket, 1011, "日志未初始化").await;
        return;
    };
    let mut level: Option<String> = None;
    let mut check = tokio::time::interval(Duration::from_secs(1));
    loop {
        tokio::select! {
            _ = state.shutdown.wait() => { close(&mut socket, 1001, "服务正在关闭").await; return; }
            _ = check.tick() => {
                if state.identify(&headers).map(|i| i.role) != Some(crate::auth::Role::Admin) {
                    close(&mut socket, 1008, "管理会话已失效").await;
                    return;
                }
            }
            entry = receiver.recv() => match entry {
                Ok(entry) => {
                    if level.as_deref().is_some_and(|l| !entry.level.eq_ignore_ascii_case(l)) { continue; }
                    let text = serde_json::to_string(&entry).unwrap_or_default();
                    match tokio::time::timeout(Duration::from_secs(5), socket.send(Message::Text(text.into()))).await {
                        Ok(Ok(())) => {}
                        _ => { close(&mut socket, 1013, "客户端处理过慢").await; return; }
                    }
                }
                Err(tokio::sync::broadcast::error::RecvError::Lagged(_)) => {
                    close(&mut socket, 1013, "客户端处理过慢").await;
                    return;
                }
                Err(_) => return,
            },
            message = socket.recv() => match message {
                Some(Ok(Message::Text(text))) => {
                    if let Ok(data) = serde_json::from_str::<Value>(&text) {
                        if data["action"] == "filter" {
                            level = data["level"].as_str().filter(|s| !s.is_empty()).map(str::to_lowercase);
                        }
                    }
                }
                Some(Ok(Message::Close(_))) | None | Some(Err(_)) => return,
                _ => {}
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn line(i: usize) -> String {
        format!("[2024-01-15T12:00:{:02}.000Z] [INFO] [default] 消息{i}\n", i % 60)
    }

    #[test]
    fn append_pages_are_stable_and_distinct() {
        let dir = tempfile::tempdir().unwrap();
        // Identical physical lines keep distinct IDs.
        let mut text = String::new();
        for i in 0..5 {
            text.push_str(&line(i));
        }
        text.push_str(&line(4));
        std::fs::write(dir.path().join("app.log"), &text).unwrap();
        let mut map = HashMap::new();
        map.insert("order".to_string(), "append".to_string());
        map.insert("limit".to_string(), "4".to_string());
        let q = Query::parse(&map, 1000, 100).unwrap();
        let first = query(dir.path(), &q).unwrap();
        assert_eq!(first.logs.len(), 4);
        assert_eq!(first.logs[0].message, "消息4");
        assert_eq!(first.logs[1].message, "消息4");
        assert_ne!(first.logs[0].id, first.logs[1].id);
        map.insert("before".into(), first.next.clone().unwrap());
        let q = Query::parse(&map, 1000, 100).unwrap();
        let second = query(dir.path(), &q).unwrap();
        assert_eq!(
            second.logs.iter().map(|l| l.message.as_str()).collect::<Vec<_>>(),
            vec!["消息1", "消息0"]
        );
        assert!(second.next.is_none());
        // Rotation keeps the cursor valid (same inode moved to app.log.1).
        std::fs::rename(dir.path().join("app.log"), dir.path().join("app.log.1")).unwrap();
        std::fs::write(dir.path().join("app.log"), line(9)).unwrap();
        let again = query(dir.path(), &q).unwrap();
        assert_eq!(again.logs.len(), 2);
        // Truncation is reported.
        std::fs::write(dir.path().join("app.log.1"), "").unwrap();
        assert!(query(dir.path(), &q).is_err());
    }

    #[test]
    fn time_order_filters_and_csv() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::write(
            dir.path().join("app.log"),
            "[2024-01-15T12:00:00.000Z] [INFO] [default] a\n[2024-01-15T12:00:02.000Z] [ERROR] [default] =cmd token=abcdefgh\n[2024-01-15T12:00:01.000Z] [INFO] [default] b\n",
        )
        .unwrap();
        let mut map = HashMap::new();
        let q = Query::parse(&map, 1000, 100).unwrap();
        let page = query(dir.path(), &q).unwrap();
        assert_eq!(page.logs[0].level, "ERROR");
        assert!(!page.logs[0].message.contains("abcdefgh"));
        assert!(csv(&page.logs).contains("\"'=cmd"));
        map.insert("level".into(), "info".into());
        map.insert("limit".into(), "1".into());
        let q = Query::parse(&map, 1000, 100).unwrap();
        let page = query(dir.path(), &q).unwrap();
        assert_eq!(page.logs[0].message, "b");
        map.insert("before".into(), page.next.unwrap());
        let page = query(dir.path(), &Query::parse(&map, 1000, 100).unwrap()).unwrap();
        assert_eq!(page.logs[0].message, "a");
        map.insert("order".into(), "append".into());
        assert!(query(dir.path(), &Query::parse(&map, 1000, 100).unwrap()).is_err());
        let mut bad = HashMap::new();
        bad.insert("limit".to_string(), "0".to_string());
        assert!(Query::parse(&bad, 1000, 100).is_err());
    }

    #[test]
    fn gzip_archives_and_long_tail() {
        use std::io::Write;
        let dir = tempfile::tempdir().unwrap();
        let mut gz = flate2::write::GzEncoder::new(Vec::new(), flate2::Compression::default());
        gz.write_all(line(1).as_bytes()).unwrap();
        std::fs::write(dir.path().join("app.log.1.gz"), gz.finish().unwrap()).unwrap();
        // Chinese text across a 64 KiB block boundary.
        let mut text = String::new();
        while text.len() < 200 * 1024 {
            text.push_str("[2024-01-15T12:00:05.000Z] [INFO] [default] 中文日志跨块边界测试\n");
        }
        std::fs::write(dir.path().join("app.log"), &text).unwrap();
        let mut map = HashMap::new();
        map.insert("order".to_string(), "append".to_string());
        map.insert("limit".to_string(), "1000".to_string());
        let page = query(dir.path(), &Query::parse(&map, 1000, 100).unwrap()).unwrap();
        assert!(page.logs.iter().all(|l| l.message == "中文日志跨块边界测试"));
        map.insert("keyword".into(), "消息1".into());
        let page = query(dir.path(), &Query::parse(&map, 1000, 100).unwrap()).unwrap();
        assert_eq!(page.logs.len(), 1);
    }
}
