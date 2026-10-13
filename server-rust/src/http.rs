//! HTTP helpers: JSON bodies with JSON errors, streamed file responses with Range/If-Range,
//! conditional requests and safe Content-Disposition.

use crate::error::{ApiError, ApiResult};
use axum::body::Body;
use axum::extract::{FromRequest, Request};
use axum::http::{header, HeaderMap, HeaderValue, Method, StatusCode};
use axum::response::Response;
use chrono::{DateTime, TimeZone, Utc};
use serde::de::DeserializeOwned;
use std::path::Path;
use std::time::UNIX_EPOCH;
use tokio::io::{AsyncReadExt, AsyncSeekExt};

pub const JSON_LIMIT: usize = 16 * 1024;

/// JSON request body (`application/json` required, 16 KiB limit, JSON error responses).
pub struct JsonBody<T>(pub T);

impl<S: Send + Sync, T: DeserializeOwned> FromRequest<S> for JsonBody<T> {
    type Rejection = ApiError;
    async fn from_request(req: Request, state: &S) -> Result<Self, Self::Rejection> {
        let is_json = req
            .headers()
            .get(header::CONTENT_TYPE)
            .and_then(|v| v.to_str().ok())
            .map(|v| v.to_ascii_lowercase().split(';').next().unwrap_or("").trim().ends_with("json"))
            .unwrap_or(false);
        let bytes = axum::body::Bytes::from_request(req, state)
            .await
            .map_err(|_| ApiError::new(413, "请求体过大"))?;
        if bytes.len() > JSON_LIMIT {
            return Err(ApiError::new(413, "请求体过大"));
        }
        if !is_json {
            return Err(ApiError::bad_request("请求体必须为 JSON（Content-Type: application/json）"));
        }
        serde_json::from_slice(&bytes)
            .map(JsonBody)
            .map_err(|_| ApiError::bad_request("请求体 JSON 无效"))
    }
}

pub fn http_date(time: DateTime<Utc>) -> String {
    time.format("%a, %d %b %Y %H:%M:%S GMT").to_string()
}

fn parse_http_date(value: &str) -> Option<i64> {
    DateTime::parse_from_rfc2822(value.trim()).ok().map(|t| t.timestamp())
}

#[derive(Debug, PartialEq, Eq)]
pub enum RangeSpec {
    Full,
    Partial(u64, u64),
    Unsatisfiable,
}

/// Single byte range (including suffix ranges). Multiple or malformed ranges are ignored (200).
pub fn parse_range(value: &str, size: u64) -> RangeSpec {
    let Some(spec) = value.trim().strip_prefix("bytes=") else {
        return RangeSpec::Full;
    };
    if spec.contains(',') {
        return RangeSpec::Full;
    }
    let Some((start, end)) = spec.trim().split_once('-') else {
        return RangeSpec::Full;
    };
    let num = |s: &str| -> Option<u64> {
        if s.is_empty() || !s.bytes().all(|b| b.is_ascii_digit()) {
            None
        } else {
            s.parse().ok()
        }
    };
    match (start.trim(), end.trim()) {
        ("", suffix) => match num(suffix) {
            Some(0) => RangeSpec::Unsatisfiable,
            Some(_) if size == 0 => RangeSpec::Unsatisfiable,
            Some(n) => RangeSpec::Partial(size.saturating_sub(n), size - 1),
            None => RangeSpec::Full,
        },
        (s, "") => match num(s) {
            Some(a) if a >= size => RangeSpec::Unsatisfiable,
            Some(a) => RangeSpec::Partial(a, size - 1),
            None => RangeSpec::Full,
        },
        (s, e) => match (num(s), num(e)) {
            (Some(a), Some(b)) if a > b => RangeSpec::Full,
            (Some(a), Some(_)) if a >= size => RangeSpec::Unsatisfiable,
            (Some(a), Some(b)) => RangeSpec::Partial(a, b.min(size - 1)),
            _ => RangeSpec::Full,
        },
    }
}

/// RFC 6266 attachment header with ASCII fallback and UTF-8 `filename*`.
pub fn content_disposition(kind: &str, name: &str) -> HeaderValue {
    let fallback: String = name
        .chars()
        .map(|c| {
            if c.is_ascii_graphic() && c != '"' && c != '\\' || c == ' ' {
                c
            } else {
                '_'
            }
        })
        .collect();
    const SET: &percent_encoding::AsciiSet = &percent_encoding::NON_ALPHANUMERIC
        .remove(b'-')
        .remove(b'.')
        .remove(b'_')
        .remove(b'~');
    let encoded = percent_encoding::utf8_percent_encode(name, SET);
    HeaderValue::from_str(&format!("{kind}; filename=\"{fallback}\"; filename*=UTF-8''{encoded}"))
        .unwrap_or_else(|_| HeaderValue::from_static("attachment"))
}

pub struct ServeOptions<'a> {
    pub content_type: String,
    pub attachment: Option<&'a str>,
    pub sandbox: bool,
}

/// Open for reading without following a final-component symlink (all served paths are
/// already resolved; this closes check/use races and pre-planted cache links).
pub async fn open_no_follow(path: &Path) -> ApiResult<tokio::fs::File> {
    let mut options = tokio::fs::OpenOptions::new();
    options.read(true);
    #[cfg(unix)]
    options.custom_flags(nix::fcntl::OFlag::O_NOFOLLOW.bits());
    match options.open(path).await {
        Ok(file) => Ok(file),
        #[cfg(unix)]
        Err(e) if e.raw_os_error() == Some(nix::errno::Errno::ELOOP as i32) => Err(ApiError::new(403, "不允许访问软链接或目录联接")),
        Err(e) => Err(ApiError::io("file.open", &e)),
    }
}

/// Stream a regular file with ETag/Last-Modified, conditional GET, Range and If-Range.
pub async fn serve_file(path: &Path, method: &Method, headers: &HeaderMap, opts: ServeOptions<'_>) -> ApiResult<Response> {
    let mut file = open_no_follow(path).await?;
    let meta = file.metadata().await.map_err(|e| ApiError::io("file.stat", &e))?;
    if !meta.is_file() {
        return Err(ApiError::bad_request("目标不是文件"));
    }
    let size = meta.len();
    let modified_ms = meta
        .modified()
        .ok()
        .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_millis() as i64)
        .unwrap_or(0);
    let modified_s = modified_ms.div_euclid(1000);
    let etag = format!("\"{size:x}-{modified_ms:x}\"");
    let last_modified = Utc.timestamp_opt(modified_s, 0).single().map(http_date).unwrap_or_default();
    let get = |name: header::HeaderName| headers.get(name).and_then(|v| v.to_str().ok());

    let mut builder = Response::builder()
        .header(header::ACCEPT_RANGES, "bytes")
        .header(header::ETAG, &etag)
        .header(header::LAST_MODIFIED, &last_modified)
        .header(header::CACHE_CONTROL, "private, max-age=0, must-revalidate");
    if opts.sandbox {
        builder = builder.header(
            header::CONTENT_SECURITY_POLICY,
            "sandbox; default-src 'none'; frame-ancestors 'none'",
        );
    }
    if let Some(name) = opts.attachment {
        builder = builder.header(header::CONTENT_DISPOSITION, content_disposition("attachment", name));
    }

    let not_modified = match get(header::IF_NONE_MATCH) {
        Some(tags) => tags.split(',').any(|t| {
            let t = t.trim();
            t == "*" || t.trim_start_matches("W/") == etag
        }),
        None => get(header::IF_MODIFIED_SINCE)
            .and_then(parse_http_date)
            .is_some_and(|since| modified_s <= since),
    };
    if not_modified {
        return Ok(builder.status(StatusCode::NOT_MODIFIED).body(Body::empty()).unwrap());
    }

    let range_applies = match get(header::IF_RANGE) {
        None => true,
        Some(v) if v.trim_start().starts_with('"') => v.trim() == etag,
        Some(v) if v.trim_start().starts_with("W/") => false,
        Some(v) => parse_http_date(v) == Some(modified_s),
    };
    let range = match get(header::RANGE) {
        Some(r) if range_applies => parse_range(r, size),
        _ => RangeSpec::Full,
    };
    builder = builder.header(header::CONTENT_TYPE, opts.content_type);
    let (status, start, length) = match range {
        RangeSpec::Unsatisfiable => {
            let mut response = ApiError::new(416, "无法满足的 Range 请求").into_response_with_range(size);
            response
                .headers_mut()
                .insert(header::ACCEPT_RANGES, HeaderValue::from_static("bytes"));
            return Ok(response);
        }
        RangeSpec::Full => (StatusCode::OK, 0, size),
        RangeSpec::Partial(a, b) => {
            builder = builder.header(header::CONTENT_RANGE, format!("bytes {a}-{b}/{size}"));
            (StatusCode::PARTIAL_CONTENT, a, b - a + 1)
        }
    };
    builder = builder.header(header::CONTENT_LENGTH, length);
    if *method == Method::HEAD {
        return Ok(builder.status(status).body(Body::empty()).unwrap());
    }
    if start > 0 {
        file.seek(std::io::SeekFrom::Start(start))
            .await
            .map_err(|e| ApiError::io("file.seek", &e))?;
    }
    let stream = tokio_util::io::ReaderStream::with_capacity(file.take(length), 64 * 1024);
    Ok(builder.status(status).body(Body::from_stream(stream)).unwrap())
}

impl ApiError {
    fn into_response_with_range(self, size: u64) -> Response {
        use axum::response::IntoResponse;
        let mut response = self.into_response();
        if let Ok(v) = HeaderValue::from_str(&format!("bytes */{size}")) {
            response.headers_mut().insert(header::CONTENT_RANGE, v);
        }
        response
    }
}

/// MIME type for a file name; text gets an explicit charset.
pub fn mime_for(name: &str) -> String {
    let mime = mime_guess::from_path(name).first_or_octet_stream();
    let text = mime.essence_str().to_string();
    if text.starts_with("text/") {
        format!("{text}; charset=utf-8")
    } else {
        text
    }
}

/// Inline only passive media and plain text; everything else downloads.
pub fn inline_safe(name: &str) -> bool {
    if crate::paths::blocked_extension(name) {
        return false;
    }
    let mime = mime_guess::from_path(name).first_or_octet_stream();
    let essence = mime.essence_str();
    (essence.starts_with("image/") && !essence.starts_with("image/svg"))
        || essence.starts_with("audio/")
        || essence.starts_with("video/")
        || essence == "text/plain"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ranges() {
        assert_eq!(parse_range("bytes=0-9", 100), RangeSpec::Partial(0, 9));
        assert_eq!(parse_range("bytes=-10", 100), RangeSpec::Partial(90, 99));
        assert_eq!(parse_range("bytes=-200", 100), RangeSpec::Partial(0, 99));
        assert_eq!(parse_range("bytes=95-", 100), RangeSpec::Partial(95, 99));
        assert_eq!(parse_range("bytes=90-1000", 100), RangeSpec::Partial(90, 99));
        assert_eq!(parse_range("bytes=100-", 100), RangeSpec::Unsatisfiable);
        assert_eq!(parse_range("bytes=-0", 100), RangeSpec::Unsatisfiable);
        assert_eq!(parse_range("bytes=-5", 0), RangeSpec::Unsatisfiable);
        assert_eq!(parse_range("bytes=5-1", 100), RangeSpec::Full);
        assert_eq!(parse_range("bytes=0-1,5-6", 100), RangeSpec::Full);
        assert_eq!(parse_range("items=0-1", 100), RangeSpec::Full);
        assert_eq!(parse_range("bytes=a-b", 100), RangeSpec::Full);
    }

    #[test]
    fn dispositions() {
        let v = content_disposition("attachment", "报告 \"1\".html");
        let s = v.to_str().unwrap();
        assert!(s.starts_with("attachment; filename=\"__ _1_.html\""));
        assert!(s.contains("filename*=UTF-8''%E6%8A%A5%E5%91%8A%20%221%22.html"));
        assert!(inline_safe("a.jpg") && inline_safe("a.txt") && inline_safe("a.mp4"));
        assert!(!inline_safe("a.svg") && !inline_safe("a.html") && !inline_safe("a.pdf"));
    }
}
