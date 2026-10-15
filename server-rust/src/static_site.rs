//! Same-origin static hosting: the admin console at `/admin/` with history fallback.
//! Static paths use the same hidden-file and symlink policy as shared files.
//! The file client is the native Flutter app, so the Rust service no longer serves a
//! browser file UI; `/` only redirects to the admin console.

use crate::error::{ApiError, ApiResult};
use crate::http::{mime_for, serve_file, ServeOptions};
use crate::paths::{extname, resolve_safe, EXISTING_ITEM};
use crate::state::SharedState;
use axum::extract::{Path, State};
use axum::http::{header, HeaderMap, HeaderValue, Method, StatusCode};
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

/// Every static path is resolved from the validated `static_dir` root, so the `admin`
/// component, `index.html` and each asset path pass the symlink/hidden-file checks.
async fn serve_admin(state: &SharedState, relative: &str, method: &Method, headers: &HeaderMap) -> Response {
    let root = state.startup.static_dir.clone();
    let index = || async {
        match resolve_safe(&root, "admin/index.html", EXISTING_ITEM).await {
            Ok(file) if file.is_file() => send(&file, method, headers, false).await,
            Ok(_) => Err(ApiError::new(404, "管理后台未安装：请先运行 npm run assemble").code("UI_NOT_INSTALLED")),
            Err(e) if e.status == StatusCode::NOT_FOUND => {
                Err(ApiError::new(404, "管理后台未安装：请先运行 npm run assemble").code("UI_NOT_INSTALLED"))
            }
            Err(e) => Err(e),
        }
    };
    let relative = relative.trim_start_matches('/');
    let result = if relative.is_empty() || relative == "index.html" {
        index().await
    } else {
        match resolve_safe(&root, &format!("admin/{relative}"), EXISTING_ITEM).await {
            Ok(file) if file.is_file() => send(&file, method, headers, relative.starts_with("assets/")).await,
            // Only a genuinely missing extensionless route falls back to index.html;
            // forbidden paths (symlinks, dotfiles, traversal) are never disguised as the app.
            Err(e) if e.status == StatusCode::NOT_FOUND && extname(relative.rsplit('/').next().unwrap_or("")).is_empty() => {
                index().await
            }
            Err(e) if e.status == StatusCode::NOT_FOUND => Err(ApiError::new(404, "页面不存在")),
            Err(e) => Err(e),
            Ok(_) if extname(relative.rsplit('/').next().unwrap_or("")).is_empty() => index().await,
            Ok(_) => Err(ApiError::new(404, "页面不存在")),
        }
    };
    result.unwrap_or_else(|e| e.into_response())
}

fn permanent(target: &str) -> Response {
    let mut response = Redirect::permanent(target).into_response();
    *response.status_mut() = StatusCode::PERMANENT_REDIRECT;
    response
}

pub async fn admin(State(state): State<SharedState>, method: Method, path: Option<Path<String>>, headers: HeaderMap) -> Response {
    let relative = path.map(|p| p.0).unwrap_or_default();
    serve_admin(&state, &relative, &method, &headers).await
}

pub async fn admin_redirect() -> Response {
    permanent("/admin/")
}

/// The only web UI left is the admin console, so `/` points there.
pub async fn root_redirect() -> Response {
    permanent("/admin/")
}

pub async fn not_found() -> Response {
    ApiError::new(404, "页面不存在").into_response()
}
