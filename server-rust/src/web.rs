//! Same-origin static hosting: Web client at `/`, admin at `/admin/` with history fallback.
//! Static paths use the same hidden-file and symlink policy as shared files.

use crate::error::{ApiError, ApiResult};
use crate::http::{mime_for, serve_file, ServeOptions};
use crate::paths::{extname, resolve_safe, EXISTING_ITEM};
use crate::state::SharedState;
use axum::extract::{Path, State};
use axum::http::{header, HeaderMap, HeaderValue, Method, StatusCode, Uri};
use axum::response::{IntoResponse, Redirect, Response};

async fn send(path: &std::path::Path, method: &Method, headers: &HeaderMap, immutable: bool) -> ApiResult<Response> {
    let name = path.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
    let mut response = serve_file(
        path,
        method,
        headers,
        ServeOptions {
            content_type: mime_for(&name),
            attachment: None,
            sandbox: false,
        },
    )
    .await?;
    let cache = if immutable {
        "public, max-age=31536000, immutable"
    } else {
        "no-cache"
    };
    response
        .headers_mut()
        .insert(header::CACHE_CONTROL, HeaderValue::from_static(cache));
    Ok(response)
}

fn decode(path: &str) -> String {
    percent_encoding::percent_decode_str(path).decode_utf8_lossy().into_owned()
}

/// Every static path is resolved from the validated `static_dir` root, so the `web`/`admin`
/// component, `index.html` and each asset path pass the symlink/hidden-file checks.
async fn serve_app(state: &SharedState, app: &str, relative: &str, method: &Method, headers: &HeaderMap, history: bool) -> Response {
    let root = state.startup.static_dir.clone();
    let index = || async {
        match resolve_safe(&root, &format!("{app}/index.html"), EXISTING_ITEM).await {
            Ok(file) if file.is_file() => send(&file, method, headers, false).await,
            Ok(_) => Err(ApiError::new(404, "前端未安装：请先运行 npm run assemble").code("UI_NOT_INSTALLED")),
            Err(e) if e.status == StatusCode::NOT_FOUND => {
                Err(ApiError::new(404, "前端未安装：请先运行 npm run assemble").code("UI_NOT_INSTALLED"))
            }
            Err(e) => Err(e),
        }
    };
    let relative = relative.trim_start_matches('/');
    let result = if relative.is_empty() || relative == "index.html" {
        index().await
    } else {
        match resolve_safe(&root, &format!("{app}/{relative}"), EXISTING_ITEM).await {
            Ok(file) if file.is_file() => send(&file, method, headers, relative.starts_with("assets/")).await,
            // Only a genuinely missing extensionless route falls back to index.html;
            // forbidden paths (symlinks, dotfiles, traversal) are never disguised as the app.
            Err(e) if e.status == StatusCode::NOT_FOUND && history && extname(relative.rsplit('/').next().unwrap_or("")).is_empty() => {
                index().await
            }
            Err(e) if e.status == StatusCode::NOT_FOUND => Err(ApiError::new(404, "页面不存在")),
            Err(e) => Err(e),
            Ok(_) if history && extname(relative.rsplit('/').next().unwrap_or("")).is_empty() => index().await,
            Ok(_) => Err(ApiError::new(404, "页面不存在")),
        }
    };
    result.unwrap_or_else(|e| e.into_response())
}

pub async fn web(State(state): State<SharedState>, method: Method, uri: Uri, headers: HeaderMap) -> Response {
    if method != Method::GET && method != Method::HEAD {
        return ApiError::new(404, "接口不存在").into_response();
    }
    serve_app(&state, "web", &decode(uri.path()), &method, &headers, false).await
}

pub async fn admin(State(state): State<SharedState>, method: Method, path: Option<Path<String>>, headers: HeaderMap) -> Response {
    let relative = path.map(|p| p.0).unwrap_or_default();
    serve_app(&state, "admin", &relative, &method, &headers, true).await
}

pub async fn admin_redirect() -> Response {
    let mut response = Redirect::permanent("/admin/").into_response();
    *response.status_mut() = StatusCode::PERMANENT_REDIRECT;
    response
}
