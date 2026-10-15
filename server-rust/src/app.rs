//! Router assembly and cross-cutting middleware.

use crate::auth::{cookie_name, LoginError, Role, TokenSource, SESSION_MS};
use crate::error::{ApiError, ApiResult, REQUEST_ID};
use crate::http::JsonBody;
use crate::server::Scheme;
use crate::state::SharedState;
use axum::extract::{ConnectInfo, DefaultBodyLimit, Request, State};
use axum::http::{header, HeaderMap, HeaderValue, Method, StatusCode};
use axum::middleware::{self, Next};
use axum::response::{IntoResponse, Response};
use axum::routing::{any, get, post};
use axum::{Extension, Json, Router};
use serde_json::{json, Value};
use std::net::SocketAddr;
use std::time::Duration;

pub const CLEAR_COOKIE: &str = "fs_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0";
pub const CLEAR_ADMIN_COOKIE: &str = "fs_admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0";
pub const REQUEST_TIMEOUT: Duration = Duration::from_secs(120);

pub fn clear_cookie(role: Role) -> HeaderValue {
    HeaderValue::from_static(match role {
        Role::File => CLEAR_COOKIE,
        Role::Admin => CLEAR_ADMIN_COOKIE,
    })
}

fn scheme_of(request_scheme: Option<&Scheme>) -> Scheme {
    request_scheme.copied().unwrap_or(Scheme::Http)
}

pub fn same_origin(headers: &HeaderMap, scheme: Scheme, origin: &str) -> bool {
    let host = headers.get(header::HOST).and_then(|v| v.to_str().ok()).unwrap_or("");
    let proto = if scheme == Scheme::Https { "https" } else { "http" };
    !host.is_empty() && origin == format!("{proto}://{host}")
}

async fn request_context(State(state): State<SharedState>, request: Request, next: Next) -> Response {
    let id = uuid::Uuid::new_v4().to_string();
    let method = request.method().clone();
    let path = request.uri().path().to_string();
    let scheme = scheme_of(request.extensions().get::<Scheme>());
    let origin = request
        .headers()
        .get(header::ORIGIN)
        .and_then(|v| v.to_str().ok())
        .map(str::to_string);
    let allowed = origin
        .as_deref()
        .map(|o| state.cfg().allowed_origins.iter().any(|a| a == o))
        .unwrap_or(false);
    let same = origin.as_deref().is_some_and(|o| same_origin(request.headers(), scheme, o));
    let run = async {
        // CORS preflight for explicitly allowed origins only.
        if method == Method::OPTIONS {
            let mut response = StatusCode::NO_CONTENT.into_response();
            if allowed && request.headers().contains_key(header::ACCESS_CONTROL_REQUEST_METHOD) {
                let h = response.headers_mut();
                h.insert(
                    header::ACCESS_CONTROL_ALLOW_METHODS,
                    HeaderValue::from_static("GET, HEAD, PUT, POST, DELETE, PATCH"),
                );
                if let Some(req) = request.headers().get(header::ACCESS_CONTROL_REQUEST_HEADERS) {
                    h.insert(header::ACCESS_CONTROL_ALLOW_HEADERS, req.clone());
                }
                h.insert(header::ACCESS_CONTROL_MAX_AGE, HeaderValue::from_static("600"));
            }
            return response;
        }
        // Reject cross-site state changes even with an authenticated cookie.
        if !matches!(method, Method::GET | Method::HEAD) && origin.is_some() && !same && !allowed {
            return ApiError::new(403, "不允许该来源修改服务").code("ORIGIN_REJECTED").into_response();
        }
        if path == "/upload" {
            next.run(request).await
        } else {
            match tokio::time::timeout(REQUEST_TIMEOUT, next.run(request)).await {
                Ok(response) => response,
                Err(_) => ApiError::new(408, "请求超时，请检查网络后重试").into_response(),
            }
        }
    };
    let mut response = REQUEST_ID.scope(id.clone(), run).await;
    let h = response.headers_mut();
    if let Ok(v) = HeaderValue::from_str(&id) {
        h.insert("x-request-id", v);
    }
    h.insert(header::X_CONTENT_TYPE_OPTIONS, HeaderValue::from_static("nosniff"));
    h.insert(header::REFERRER_POLICY, HeaderValue::from_static("no-referrer"));
    h.insert(header::X_FRAME_OPTIONS, HeaderValue::from_static("DENY"));
    if allowed {
        if let Some(o) = origin.as_deref().and_then(|o| HeaderValue::from_str(o).ok()) {
            h.insert(header::ACCESS_CONTROL_ALLOW_ORIGIN, o);
            h.insert(header::ACCESS_CONTROL_ALLOW_CREDENTIALS, HeaderValue::from_static("true"));
            h.insert(
                header::ACCESS_CONTROL_EXPOSE_HEADERS,
                HeaderValue::from_static("Content-Range, Accept-Ranges, Content-Disposition, X-Export-Truncated, X-Request-Id"),
            );
            h.append(header::VARY, HeaderValue::from_static("Origin"));
        }
    }
    response
}

async fn login(
    State(state): State<SharedState>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    scheme: Option<Extension<Scheme>>,
    JsonBody(body): JsonBody<Value>,
) -> ApiResult<Response> {
    let token = body.get("token").and_then(Value::as_str).unwrap_or("");
    let config = state.cfg();
    let ip = addr.ip();
    let outcome = state.auth.login(token, ip, &config.access_token, &config.admin_token);
    let ok = match outcome {
        Err(LoginError::RateLimited { first }) => {
            if first {
                state.audit("auth.rate_limit", "anonymous", &ip.to_string(), "rejected", json!({}));
            }
            return Err(ApiError::new(429, "登录尝试过多，请 15 分钟后再试").code("RATE_LIMITED"));
        }
        Err(LoginError::Invalid) => {
            state.audit("auth.login", "anonymous", "", "failed", json!({ "ip": ip.to_string() }));
            return Err(ApiError::new(401, "令牌错误").code("INVALID_TOKEN"));
        }
        Ok(ok) => ok,
    };
    state.audit(
        "auth.login",
        &format!("{}:{}", ok.role.as_str(), ok.session_id),
        &ok.session_id,
        "succeeded",
        json!({ "ip": ip.to_string() }),
    );
    let secure = scheme.is_some_and(|s| s.0 == Scheme::Https) || config.secure_cookies;
    let cookie = format!(
        "{}={}; HttpOnly; SameSite=Strict; Path=/; Max-Age={}{}",
        cookie_name(ok.role),
        ok.session_token,
        SESSION_MS / 1000,
        if secure { "; Secure" } else { "" }
    );
    let body = json!({
        "sessionToken": ok.session_token, "readTicket": ok.read_ticket, "expiresAt": ok.expires_at,
        "ticketExpiresAt": ok.ticket_expires_at, "role": ok.role.as_str(), "sessionId": ok.session_id,
        "writeEnabled": config.write_enabled, "uploadEnabled": config.upload_enabled,
    });
    let mut response = Json(body).into_response();
    response.headers_mut().insert(
        header::SET_COOKIE,
        HeaderValue::from_str(&cookie).map_err(|e| ApiError::internal("cookie", e))?,
    );
    response
        .headers_mut()
        .insert(header::CACHE_CONTROL, HeaderValue::from_static("no-store"));
    Ok(response)
}

async fn session_info(State(state): State<SharedState>, headers: HeaderMap) -> ApiResult<Response> {
    let id = state.identify(&headers).ok_or_else(|| ApiError::new(401, "请重新登录"))?;
    Ok((
        [(header::CACHE_CONTROL, "no-store")],
        Json(json!({ "role": id.role.as_str(), "expiresAt": id.expires_at, "sessionId": id.session_id })),
    )
        .into_response())
}

/// `POST /api/auth/logout {role?}`: revokes the Bearer session, otherwise the cookie session of
/// `role` (default: highest-priority presented session). Other role cookies stay valid.
async fn logout(State(state): State<SharedState>, headers: HeaderMap, body: axum::body::Bytes) -> ApiResult<Response> {
    let body: Value = if body.iter().all(u8::is_ascii_whitespace) {
        Value::Null
    } else {
        serde_json::from_slice(&body).map_err(|_| ApiError::bad_request("请求体必须为 JSON"))?
    };
    let wanted = body.get("role").and_then(Value::as_str).map(str::to_string);
    let identity = match wanted.as_deref() {
        None => state.identify(&headers).ok_or_else(|| ApiError::new(401, "请先登录文件服务"))?,
        Some(role) => {
            let role = match role {
                "admin" => Role::Admin,
                "file" => Role::File,
                _ => return Err(ApiError::bad_request("role 必须为 file 或 admin")),
            };
            crate::auth::session_tokens(&headers)
                .into_iter()
                .find_map(|(source, token)| {
                    let mut h = HeaderMap::new();
                    h.insert(header::AUTHORIZATION, HeaderValue::from_str(&format!("Bearer {token}")).ok()?);
                    state.identify(&h).filter(|i| i.role == role).map(|mut i| {
                        i.source = Some(source);
                        i
                    })
                })
                .ok_or_else(|| ApiError::new(401, "该角色没有有效会话"))?
        }
    };
    state.auth.logout(&identity);
    state.audit(
        "auth.logout",
        &identity.actor(),
        identity.session_id.as_deref().unwrap_or(identity.role.as_str()),
        "succeeded",
        json!({}),
    );
    let mut response = Json(json!({ "msg": "已退出" })).into_response();
    if let Some(TokenSource::Cookie(role)) = identity.source {
        response.headers_mut().append(header::SET_COOKIE, clear_cookie(role));
    }
    Ok(response)
}

async fn renew_ticket(State(state): State<SharedState>, headers: HeaderMap) -> ApiResult<Response> {
    let id = state.identify(&headers).ok_or_else(|| ApiError::new(401, "请重新登录"))?;
    let (ticket, expires) = state
        .auth
        .renew(&id)
        .ok_or_else(|| ApiError::bad_request("长期令牌请求头无需只读票据，请改用登录会话").code("TICKET_REQUIRES_SESSION"))?;
    Ok((
        [(header::CACHE_CONTROL, "no-store")],
        Json(json!({ "readTicket": ticket, "ticketExpiresAt": expires })),
    )
        .into_response())
}

async fn live() -> Response {
    ([(header::CACHE_CONTROL, "no-store")], Json(json!({ "status": "ok" }))).into_response()
}

async fn ready(State(state): State<SharedState>) -> Response {
    match state.db.ping() {
        Ok(()) if !state.shutdown.is_triggered() => {
            ([(header::CACHE_CONTROL, "no-store")], Json(json!({ "status": "ready" }))).into_response()
        }
        _ => (
            StatusCode::SERVICE_UNAVAILABLE,
            [(header::CACHE_CONTROL, "no-store")],
            Json(json!({ "status": "unavailable" })),
        )
            .into_response(),
    }
}

async fn gone_restart() -> ApiError {
    ApiError::new(410, "旧重启接口已移除，请登录 /admin/ 使用 POST /api/admin/restart").code("ENDPOINT_REMOVED")
}

async fn gone_clean() -> ApiError {
    ApiError::new(405, "缓存清理请改用 POST /api/admin/cache/jobs")
}

async fn api_not_found() -> ApiError {
    ApiError::new(404, "接口不存在")
}

pub fn build(state: SharedState) -> Router {
    use crate::files;
    use crate::search;
    let upload = post(files::upload).layer(DefaultBodyLimit::disable());
    Router::new()
        .route("/api/auth/login", post(login))
        .route("/api/auth/session", get(session_info))
        .route("/api/auth/logout", post(logout))
        .route("/api/auth/ticket", post(renew_ticket))
        .route("/health/live", get(live))
        .route("/health/ready", get(ready))
        .route("/api/v2/files", get(files::list_v2))
        .route("/api/v2/content", get(files::content_v2))
        .route("/api/v2/preview", get(files::preview_v2))
        .route("/api/v2/search", get(search::search_v2))
        .route("/list", get(files::list))
        .route("/list/", get(files::list))
        .route("/list/{*path}", get(files::list))
        .route("/getFile/{*path}", get(files::get_file))
        .route("/getVideoPreview/{*path}", get(files::video_preview))
        .route("/delFile", post(files::delete))
        .route("/renameFile", post(files::rename))
        .route("/upload", upload)
        .route("/restartServer", any(gone_restart))
        .route("/cleanOldData/{day}", any(gone_clean))
        .nest("/api/admin", crate::admin::router(state.clone()))
        .route("/api", any(api_not_found))
        .route("/api/{*rest}", any(api_not_found))
        .route("/admin", get(crate::web::admin_redirect))
        .route("/admin/", get(crate::web::admin))
        .route("/admin/{*path}", get(crate::web::admin))
        .fallback(crate::web::web)
        .layer(DefaultBodyLimit::max(crate::http::JSON_LIMIT))
        .layer(middleware::from_fn_with_state(state.clone(), request_context))
        .with_state(state)
}
