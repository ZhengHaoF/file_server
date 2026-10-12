//! Uniform API errors: `{msg, code, requestId, errors?}`. Internal causes are logged, never exposed.

use axum::http::{HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use serde_json::{json, Map, Value};
use std::collections::BTreeMap;

tokio::task_local! {
    pub static REQUEST_ID: String;
}

pub fn current_request_id() -> Option<String> {
    REQUEST_ID.try_with(|id| id.clone()).ok()
}

#[derive(Debug, Clone)]
pub struct ApiError {
    pub status: StatusCode,
    pub msg: String,
    pub code: &'static str,
    pub errors: Option<BTreeMap<String, String>>,
}

pub type ApiResult<T> = Result<T, ApiError>;

impl ApiError {
    pub fn new(status: u16, msg: impl Into<String>) -> Self {
        let status = StatusCode::from_u16(status).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);
        let code = default_code(status);
        Self {
            status,
            msg: msg.into(),
            code,
            errors: None,
        }
    }
    pub fn code(mut self, code: &'static str) -> Self {
        self.code = code;
        self
    }
    pub fn with_errors(mut self, errors: BTreeMap<String, String>) -> Self {
        self.errors = Some(errors);
        self
    }
    pub fn bad_request(msg: impl Into<String>) -> Self {
        Self::new(400, msg)
    }
    pub fn internal(context: &str, cause: impl std::fmt::Display) -> Self {
        crate::logging::error("request", &format!("{context}: {cause}"));
        Self::new(500, "服务器处理失败")
    }
    pub fn database(cause: impl std::fmt::Display) -> Self {
        crate::logging::error("database", &format!("数据库操作失败: {cause}"));
        Self::new(503, "数据库暂不可用").code("DATABASE_UNAVAILABLE")
    }
    /// Map a filesystem error to a client-safe status.
    pub fn io(context: &str, error: &std::io::Error) -> Self {
        use std::io::ErrorKind::*;
        match error.kind() {
            NotFound => Self::new(404, "文件或文件夹不存在"),
            AlreadyExists => Self::new(409, "目标名称已存在"),
            PermissionDenied => Self::new(403, "没有权限访问该文件"),
            _ => Self::internal(context, error),
        }
    }
}

fn default_code(status: StatusCode) -> &'static str {
    match status.as_u16() {
        401 => "AUTH_REQUIRED",
        403 => "FORBIDDEN",
        404 => "NOT_FOUND",
        405 => "METHOD_NOT_ALLOWED",
        408 => "REQUEST_TIMEOUT",
        409 => "CONFLICT",
        413 => "PAYLOAD_TOO_LARGE",
        416 => "RANGE_NOT_SATISFIABLE",
        429 => "TOO_MANY_REQUESTS",
        503 => "SERVICE_UNAVAILABLE",
        s if s >= 500 => "INTERNAL_ERROR",
        _ => "REQUEST_INVALID",
    }
}

impl std::fmt::Display for ApiError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{} {}", self.status.as_u16(), self.msg)
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let mut body = Map::new();
        body.insert("msg".into(), Value::String(self.msg));
        body.insert("code".into(), Value::String(self.code.into()));
        if let Some(id) = current_request_id() {
            body.insert("requestId".into(), Value::String(id));
        }
        if let Some(errors) = self.errors {
            body.insert("errors".into(), json!(errors));
        }
        let mut response = (self.status, axum::Json(Value::Object(body))).into_response();
        response.headers_mut().insert("cache-control", HeaderValue::from_static("no-store"));
        response
    }
}

impl From<rusqlite::Error> for ApiError {
    fn from(error: rusqlite::Error) -> Self {
        Self::database(error)
    }
}
