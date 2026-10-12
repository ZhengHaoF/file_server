//! Admin API under `/api/admin` (admin identity only, `Cache-Control: no-store`).

pub mod cache;
pub mod logs;
pub mod settings;
pub mod status;

use crate::auth::{Identity, Role};
use crate::error::{ApiError, ApiResult};
use crate::http::{content_disposition, JsonBody};
use crate::state::SharedState;
use axum::extract::{Path, Query, Request, State};
use axum::http::{header, HeaderMap, HeaderValue, StatusCode};
use axum::middleware::Next;
use axum::response::{IntoResponse, Response};
use axum::routing::{delete, get, post};
use axum::{Extension, Json, Router};
use serde_json::{json, Value};
use std::collections::HashMap;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Mutex;
use std::time::Instant;

#[derive(Default)]
pub struct Runtime {
    pub config_lock: tokio::sync::Mutex<()>,
    pub job_running: AtomicBool,
    pub active_job: Mutex<Option<Value>>,
    pub recent_jobs: Mutex<HashMap<String, Value>>,
    pub stats_cache: Mutex<Option<(u64, Instant, Value)>>,
    pub stats_scan: tokio::sync::Mutex<()>,
    pub last_cleanup_at: Mutex<Option<i64>>,
    pub sampler: Mutex<status::Sampler>,
}

pub async fn require_admin(State(state): State<SharedState>, mut request: Request, next: Next) -> Response {
    let identity = state.identify(request.headers());
    match identity {
        Some(identity) if identity.role == Role::Admin => {
            request.extensions_mut().insert(identity);
            let mut response = next.run(request).await;
            response
                .headers_mut()
                .insert(header::CACHE_CONTROL, HeaderValue::from_static("no-store"));
            response
        }
        _ => ApiError::new(401, "需要管理员认证").code("AUTH_REQUIRED").into_response(),
    }
}

pub fn router(state: SharedState) -> Router<SharedState> {
    Router::new()
        .route("/status", get(status_handler))
        .route("/cache/stats", get(cache_stats))
        .route("/cache/jobs", post(cache_job))
        .route("/cache/clean", post(cache_clean))
        .route("/jobs", get(jobs))
        .route("/jobs/{id}", get(job))
        .route("/audit", get(audit))
        .route("/logs", get(logs_query))
        .route("/logs/export", get(logs_export))
        .route("/logs/stream", get(logs::stream))
        .route("/config", get(config_get).put(config_put))
        .route("/config/validate", post(config_validate))
        .route("/config/rollback", post(config_rollback))
        .route("/config/export", get(config_export))
        .route("/restart", post(restart))
        .route("/sessions", get(sessions))
        .route("/sessions/{id}", delete(revoke_session))
        .route("/database/status", get(database_status))
        .layer(axum::middleware::from_fn_with_state(state, require_admin))
}

type Q = Query<HashMap<String, String>>;

async fn status_handler(State(state): State<SharedState>) -> Json<Value> {
    status::ensure_sample(&state).await;
    Json(status::status(&state))
}

async fn cache_stats(State(state): State<SharedState>, Query(q): Q) -> ApiResult<Json<Value>> {
    Ok(Json(cache::stats(&state, q.get("refresh").is_some_and(|v| v == "true")).await?))
}

async fn cache_job(
    State(state): State<SharedState>,
    Extension(id): Extension<Identity>,
    JsonBody(body): JsonBody<Value>,
) -> ApiResult<Response> {
    let mode = cache::Mode::parse(&body)?;
    let (job, _handle) = cache::start_cleanup(&state, mode, id.actor())?;
    Ok((StatusCode::ACCEPTED, Json(json!({ "job": job }))).into_response())
}

/// Legacy synchronous endpoint: `{days}` or `{all:true}`.
async fn cache_clean(
    State(state): State<SharedState>,
    Extension(id): Extension<Identity>,
    JsonBody(body): JsonBody<Value>,
) -> ApiResult<Json<Value>> {
    let mode = if body.get("all") == Some(&Value::Bool(true)) {
        cache::Mode::All
    } else {
        cache::Mode::parse(&json!({ "mode": "expired", "days": body.get("days") }))?
    };
    let (_, handle) = cache::start_cleanup(&state, mode, id.actor())?;
    let job = handle.await.map_err(|e| ApiError::internal("cache.clean", e))?;
    if job["status"] != "succeeded" {
        return Err(ApiError::new(500, "缓存维护未全部成功，请查看操作记录"));
    }
    let r = &job["result"];
    Ok(Json(
        json!({ "msg": "缓存清理成功", "cleaned": r["cleaned"], "freedBytes": r["freedBytes"], "failed": r["failed"] }),
    ))
}

fn page_args(q: &HashMap<String, String>, default: i64) -> ApiResult<(i64, i64)> {
    let limit = match q.get("limit").filter(|s| !s.is_empty()) {
        Some(v) => v.parse::<i64>().ok(),
        None => Some(default),
    };
    let before = match q.get("before").filter(|s| !s.is_empty()) {
        Some(v) => v.parse::<i64>().ok().filter(|b| *b >= 1),
        None => Some(i64::MAX),
    };
    match (limit, before) {
        (Some(l), Some(b)) if (1..=100).contains(&l) => Ok((l, b)),
        _ => Err(ApiError::bad_request("分页参数无效")),
    }
}

fn overlay_job(state: &SharedState, job: Value) -> Value {
    let id = job["id"].as_str().unwrap_or("");
    if let Some(active) = state.admin.active_job.lock().unwrap().as_ref() {
        if active["id"] == id {
            return active.clone();
        }
    }
    state.admin.recent_jobs.lock().unwrap().get(id).cloned().unwrap_or(job)
}

async fn jobs(State(state): State<SharedState>, Query(q): Q) -> ApiResult<Json<Value>> {
    let (limit, before) = page_args(&q, 25)?;
    let (rows, next) = state.db.jobs_page(before, limit)?;
    let rows: Vec<Value> = rows.into_iter().map(|j| overlay_job(&state, j)).collect();
    Ok(Json(json!({ "jobs": rows, "nextBefore": next })))
}

async fn job(State(state): State<SharedState>, Path(id): Path<String>) -> ApiResult<Json<Value>> {
    let job = state.db.job(&id)?.ok_or_else(|| ApiError::new(404, "未找到任务"))?;
    Ok(Json(json!({ "job": overlay_job(&state, job) })))
}

async fn audit(State(state): State<SharedState>, Query(q): Q) -> ApiResult<Json<Value>> {
    let (limit, before) = page_args(&q, 50)?;
    let (entries, next) = state.db.audit_page(before, limit)?;
    Ok(Json(json!({ "entries": entries, "nextBefore": next })))
}

async fn logs_query(State(state): State<SharedState>, Query(q): Q) -> ApiResult<Json<Value>> {
    let query = logs::Query::parse(&q, 1000, 100)?;
    let dir = state.startup.logs_dir.clone();
    let page = tokio::task::spawn_blocking(move || logs::query(&dir, &query))
        .await
        .map_err(|e| ApiError::internal("logs.query", e))??;
    Ok(Json(logs::page_json(&page)))
}

async fn logs_export(State(state): State<SharedState>, Query(mut q): Q) -> ApiResult<Response> {
    let format = q.get("format").filter(|s| !s.is_empty()).cloned().unwrap_or_else(|| "csv".into());
    if format != "csv" && format != "json" {
        return Err(ApiError::bad_request("仅支持 CSV 或 JSON 导出"));
    }
    q.insert("limit".into(), "10000".into());
    let query = logs::Query::parse(&q, 10_000, 10_000)?;
    let dir = state.startup.logs_dir.clone();
    let page = tokio::task::spawn_blocking(move || logs::query(&dir, &query))
        .await
        .map_err(|e| ApiError::internal("logs.export", e))??;
    let truncated = page.next.is_some();
    let (body, kind) = if format == "csv" {
        (logs::csv(&page.logs), "text/csv; charset=utf-8")
    } else {
        (json!({ "logs": page.logs, "truncated": truncated }).to_string(), "application/json")
    };
    Ok((
        [
            (header::CONTENT_TYPE, HeaderValue::from_static(kind)),
            (
                header::CONTENT_DISPOSITION,
                content_disposition("attachment", &format!("file-server-logs.{format}")),
            ),
            (
                header::HeaderName::from_static("x-export-truncated"),
                HeaderValue::from_static(if truncated { "true" } else { "false" }),
            ),
        ],
        body,
    )
        .into_response())
}

async fn config_get(State(state): State<SharedState>) -> ApiResult<Json<Value>> {
    Ok(Json(settings::render(&state)?))
}

async fn config_validate(State(state): State<SharedState>, JsonBody(body): JsonBody<Value>) -> ApiResult<Json<Value>> {
    let checked = settings::validate(&state, body.get("revision"), body.get("values"))?;
    Ok(Json(
        json!({ "valid": true, "changes": checked.changes, "warnings": checked.warnings }),
    ))
}

async fn config_put(
    State(state): State<SharedState>,
    Extension(id): Extension<Identity>,
    JsonBody(body): JsonBody<Value>,
) -> ApiResult<Json<Value>> {
    Ok(Json(settings::save(&state, &body, &id.actor(), false).await?))
}

async fn config_rollback(
    State(state): State<SharedState>,
    Extension(id): Extension<Identity>,
    JsonBody(body): JsonBody<Value>,
) -> ApiResult<Json<Value>> {
    Ok(Json(settings::save(&state, &body, &id.actor(), true).await?))
}

async fn config_export(State(state): State<SharedState>) -> ApiResult<Response> {
    let values = settings::export(&state)?;
    Ok((
        [(
            header::CONTENT_DISPOSITION,
            content_disposition("attachment", "file-server-settings.json"),
        )],
        Json(values),
    )
        .into_response())
}

pub fn restart_now(state: &SharedState, actor: &str) -> ApiResult<Value> {
    if !state.options.managed {
        return Err(ApiError::new(
            409,
            "当前没有重启监督，请使用 file-server supervise、Docker 重启策略或 systemd 启动",
        )
        .code("RESTART_UNSUPPORTED"));
    }
    if state.admin.job_running.load(Ordering::SeqCst) {
        return Err(ApiError::new(409, "缓存维护尚未完成，请稍后重启").code("MAINTENANCE"));
    }
    if state.shutdown.is_triggered() {
        return Err(ApiError::new(409, "服务正在关闭"));
    }
    state.audit("server.restart", actor, &state.options.deployment, "accepted", json!({}));
    crate::logging::info("admin", "已接受重启请求，服务将优雅退出并由监督程序重新拉起");
    let shutdown = state.shutdown.clone();
    let code = state.options.restart_exit_code;
    tokio::spawn(async move {
        tokio::time::sleep(std::time::Duration::from_millis(150)).await;
        shutdown.trigger(code);
    });
    Ok(json!({ "msg": "重启请求已接受，请等待恢复后重新登录", "bootId": state.boot_id }))
}

async fn restart(State(state): State<SharedState>, Extension(id): Extension<Identity>) -> ApiResult<Response> {
    Ok((StatusCode::ACCEPTED, Json(restart_now(&state, &id.actor())?)).into_response())
}

async fn sessions(State(state): State<SharedState>, Extension(id): Extension<Identity>) -> Json<Value> {
    Json(json!({ "sessions": state.auth.list(id.session_id.as_deref()) }))
}

async fn revoke_session(
    State(state): State<SharedState>,
    Extension(id): Extension<Identity>,
    Path(target): Path<String>,
    _headers: HeaderMap,
) -> ApiResult<Response> {
    let role = state.auth.role_of(&target);
    if !state.auth.revoke(&target) {
        return Err(ApiError::new(404, "会话不存在或已失效"));
    }
    let current = id.session_id.as_deref() == Some(target.as_str());
    state.audit("session.revoke", &id.actor(), &target, "succeeded", json!({}));
    let mut response = Json(json!({ "msg": "会话已撤销", "current": current })).into_response();
    if current {
        if let Some(role) = role {
            response.headers_mut().insert(header::SET_COOKIE, crate::app::clear_cookie(role));
        }
    }
    Ok(response)
}

async fn database_status(State(state): State<SharedState>) -> ApiResult<Json<Value>> {
    let data = cache::stats(&state, true).await?;
    let mut db = data["database"].clone();
    db["dbSize"] = db["total"].clone();
    db["tables"] = json!(["image", "admin_jobs", "admin_audit"]);
    db["schemaVersion"] = json!(crate::db::SCHEMA_VERSION);
    Ok(Json(db))
}
