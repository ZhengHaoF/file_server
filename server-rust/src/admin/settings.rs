//! Admin-editable configuration: whitelist, validation, revisioned atomic save and rollback.

use crate::config::{self, numeric_errors, numeric_rule, valid_origins, ADMIN_BACKUP, ADMIN_OVERRIDES, ENV_KEYS};
use crate::error::{ApiError, ApiResult};
use crate::state::AppState;
use serde_json::{json, Map, Value};
use sha2::{Digest, Sha256};
use std::collections::BTreeMap;
use std::path::{Path, PathBuf};

pub struct Field {
    pub key: &'static str,
    pub label: &'static str,
    pub kind: &'static str,
    pub group: &'static str,
    pub help: &'static str,
    pub restart: bool,
}

const fn f(key: &'static str, label: &'static str, kind: &'static str, group: &'static str, help: &'static str, restart: bool) -> Field {
    Field {
        key,
        label,
        kind,
        group,
        help,
        restart,
    }
}

pub const FIELDS: &[Field] = &[
    f(
        "rootPath",
        "共享目录",
        "string",
        "basic",
        "必须已经存在，不能包含服务程序、配置、数据或前端目录。",
        true,
    ),
    f(
        "host",
        "监听地址",
        "string",
        "basic",
        "127.0.0.1 仅本机；0.0.0.0 允许内网，需防火墙和 HTTPS。",
        true,
    ),
    f("port", "HTTP 端口", "number", "basic", "更改后访问地址会变化。", true),
    f(
        "httpsEnabled",
        "直接 HTTPS",
        "boolean",
        "basic",
        "必须预先安装自己的证书；TLS 反代不需要打开此项。",
        true,
    ),
    f("httpsPort", "HTTPS 端口", "number", "basic", "仅直接 HTTPS 启用时使用。", true),
    f(
        "publicRead",
        "匿名读取",
        "boolean",
        "access",
        "开启后，能连到服务的人无需登录即可读取文件。",
        false,
    ),
    f(
        "writeEnabled",
        "允许文件写入",
        "boolean",
        "access",
        "允许已认证访问者删除、重命名与上传。",
        false,
    ),
    f(
        "uploadEnabled",
        "允许上传",
        "boolean",
        "access",
        "同时需要打开允许文件写入。",
        false,
    ),
    f(
        "uploadMaxSizeMB",
        "上传上限（MB）",
        "number",
        "access",
        "每个新上传请求立即使用新上限。",
        false,
    ),
    f(
        "uploadTimeoutSeconds",
        "上传总期限（秒）",
        "number",
        "access",
        "默认 1800 秒；新上传请求立即生效。",
        false,
    ),
    f(
        "uploadIdleTimeoutSeconds",
        "上传空闲期限（秒）",
        "number",
        "access",
        "无数据传输超过此时间会中断；不能大于总期限。",
        false,
    ),
    f(
        "allowedOrigins",
        "允许来源",
        "origins",
        "access",
        "每行一个完整来源，例如 https://files.example.com；不允许通配符。",
        false,
    ),
    f(
        "secureCookies",
        "仅 HTTPS 发送会话",
        "boolean",
        "access",
        "TLS 反向代理后建议打开；纯 HTTP 下只能使用临时 Bearer。",
        false,
    ),
    f(
        "cacheMaxSizeMB",
        "缓存容量上限（MB）",
        "number",
        "cache",
        "0 表示不按容量清理；自动维护按最近访问淘汰。",
        false,
    ),
    f(
        "cacheRetentionDays",
        "缓存保留天数",
        "number",
        "cache",
        "自动维护时删除超过此天数未访问的缓存。",
        false,
    ),
    f(
        "autoCleanupEnabled",
        "自动维护",
        "boolean",
        "cache",
        "每分钟检查策略；只删除派生缓存，不删除原始文件。",
        false,
    ),
];

fn field(key: &str) -> Option<&'static Field> {
    FIELDS.iter().find(|f| f.key == key)
}

fn env_var(key: &str) -> Option<&'static str> {
    ENV_KEYS.iter().find(|(k, _)| *k == key).map(|(_, v)| *v)
}

pub struct Snapshot {
    pub revision: String,
    pub values: Map<String, Value>,
    pub file_values: Map<String, Value>,
    pub saved: Map<String, Value>,
    pub local: Map<String, Value>,
}

fn overrides_path(state: &AppState) -> PathBuf {
    state.startup.data_path.join(ADMIN_OVERRIDES)
}
fn backup_path(state: &AppState) -> PathBuf {
    state.startup.data_path.join(ADMIN_BACKUP)
}

fn api(e: String) -> ApiError {
    crate::logging::error("config", &e);
    ApiError::new(500, "配置文件无法读取，请检查私有配置").code("CONFIG_UNREADABLE")
}

fn only_editable(map: &Map<String, Value>) -> Map<String, Value> {
    map.iter()
        .filter(|(k, _)| field(k).is_some())
        .map(|(k, v)| (k.clone(), v.clone()))
        .collect()
}

fn resolve_root(base: &Path, value: &Value) -> Value {
    match value.as_str() {
        Some(s) => {
            let p = PathBuf::from(s);
            let p = if p.is_absolute() { p } else { base.join(p) };
            Value::String(config::normalize_lexical(&p).to_string_lossy().into_owned())
        }
        None => value.clone(),
    }
}

pub fn snapshot(state: &AppState) -> ApiResult<Snapshot> {
    let startup = &state.startup;
    let base = &startup.config_dir;
    let main = match &startup.config_file {
        Some(file) => config::read_object(file).map_err(api)?,
        None => Map::new(),
    };
    let local = config::read_object(&base.join("config.local.json")).map_err(api)?;
    let saved = config::read_object(&overrides_path(state)).map_err(api)?;
    let revision = hex::encode(Sha256::digest(json!([main, local, saved]).to_string().as_bytes()));
    let mut file_values = only_editable(&config::defaults());
    file_values.extend(only_editable(&main));
    file_values.extend(only_editable(&local));
    let mut values = file_values.clone();
    values.extend(only_editable(&saved));
    for map in [&mut values, &mut file_values] {
        if let Some(root) = map.get("rootPath").cloned() {
            map.insert("rootPath".into(), resolve_root(base, &root));
        }
        for item in FIELDS {
            if let Some(var) = env_var(item.key) {
                if state.options.env.get(var).is_some() {
                    map.insert(item.key.into(), startup_value(startup, item.key));
                }
            }
        }
    }
    Ok(Snapshot {
        revision,
        values,
        file_values,
        saved,
        local,
    })
}

fn startup_value(config: &config::Config, key: &str) -> Value {
    let all = serde_json::to_value(config).unwrap_or(Value::Null);
    match key {
        "rootPath" => Value::String(config.root_path.to_string_lossy().into_owned()),
        _ => all.get(key).cloned().unwrap_or(Value::Null),
    }
}

fn mask_root(path: &Path) -> String {
    let text = path.to_string_lossy().replace('\\', "/");
    let parts: Vec<&str> = text.split('/').collect();
    if parts.len() > 2 {
        format!("***/{}", parts[parts.len() - 2..].join("/"))
    } else {
        text
    }
}

pub fn render(state: &AppState) -> ApiResult<Value> {
    let snap = snapshot(state)?;
    let live = state.cfg();
    let mut out = Map::new();
    // Legacy masked top-level properties (no credentials, no private paths).
    out.insert("rootPath".into(), mask_root(&live.root_path).into());
    for key in [
        "host",
        "port",
        "httpsEnabled",
        "httpsPort",
        "publicRead",
        "writeEnabled",
        "uploadEnabled",
        "uploadMaxSizeMB",
        "uploadTimeoutSeconds",
        "uploadIdleTimeoutSeconds",
        "allowedOrigins",
        "secureCookies",
        "cacheMaxSizeMB",
        "cacheRetentionDays",
        "autoCleanupEnabled",
    ] {
        out.insert(key.into(), startup_value(&live, key));
    }
    out.insert("accessToken".into(), "******".into());
    out.insert("restartPwd".into(), "******".into());
    let fields: Vec<Value> = FIELDS
        .iter()
        .map(|item| {
            let env = env_var(item.key).is_some_and(|v| state.options.env.get(v).is_some());
            let source = if env {
                "environment"
            } else if snap.saved.contains_key(item.key) || snap.local.contains_key(item.key) {
                "local"
            } else {
                "default"
            };
            let mut v = json!({
                "key": item.key, "label": item.label, "type": item.kind, "group": item.group, "help": item.help,
                "restartRequired": item.restart, "readonly": env, "source": source,
            });
            if let Some((min, max, integer)) = numeric_rule(item.key) {
                v["min"] = json!(min);
                v["max"] = json!(max);
                v["integer"] = json!(integer);
            }
            v
        })
        .collect();
    let pending: Vec<&str> = FIELDS
        .iter()
        .filter(|item| item.restart && snap.values.get(item.key) != Some(&startup_value(&state.startup, item.key)))
        .map(|item| item.key)
        .collect();
    out.insert("revision".into(), snap.revision.into());
    out.insert("values".into(), Value::Object(snap.values));
    out.insert("fields".into(), Value::Array(fields));
    out.insert("pendingRestart".into(), json!(pending));
    out.insert("backupAvailable".into(), backup_path(state).is_file().into());
    Ok(Value::Object(out))
}

pub struct Checked {
    pub changes: Vec<Value>,
    pub warnings: Vec<String>,
    pub next: Map<String, Value>,
}

fn valid_host(host: &str) -> bool {
    host == "localhost" || host.parse::<std::net::IpAddr>().is_ok()
}

pub fn validate(state: &AppState, revision: Option<&Value>, values: Option<&Value>) -> ApiResult<Checked> {
    let current = snapshot(state)?;
    if revision.and_then(Value::as_str) != Some(current.revision.as_str()) {
        return Err(ApiError::new(409, "配置已变化，请刷新后重新确认").code("STALE_REVISION"));
    }
    let Some(Value::Object(values)) = values else {
        return Err(ApiError::bad_request("values 必须为配置对象"));
    };
    let mut errors: BTreeMap<String, String> = BTreeMap::new();
    let mut next = current.values.clone();
    for (key, value) in values {
        let Some(item) = field(key) else {
            errors.insert(key.clone(), "此字段不允许通过后台修改".into());
            continue;
        };
        let readonly = env_var(key).is_some_and(|v| state.options.env.get(v).is_some());
        if readonly && current.values.get(key) != Some(value) {
            errors.insert(key.clone(), "环境变量覆盖的字段只读".into());
            continue;
        }
        let ok = match item.kind {
            "boolean" => value.is_boolean(),
            "number" => value.is_number(),
            "string" => value
                .as_str()
                .is_some_and(|s| !s.trim().is_empty() && s.len() <= 4096 && !s.contains('\0')),
            "origins" => valid_origins(value),
            _ => false,
        };
        if !ok {
            let msg = match item.kind {
                "boolean" => "必须为布尔值",
                "number" => "必须为数值",
                "origins" => "只允许最多 16 个完整 HTTP/HTTPS 来源，不允许通配符",
                _ => "请输入有效文本",
            };
            errors.insert(key.clone(), msg.into());
        }
        next.insert(key.clone(), value.clone());
    }
    let startup = &state.startup;
    if !errors.contains_key("host") && !next.get("host").and_then(Value::as_str).is_some_and(valid_host) {
        errors.insert("host".into(), "请填写 IP 地址或 localhost".into());
    }
    if !errors.contains_key("rootPath") {
        let raw = next.get("rootPath").and_then(Value::as_str).unwrap_or("");
        let candidate = {
            let p = PathBuf::from(raw);
            if p.is_absolute() {
                p
            } else {
                startup.config_dir.join(p)
            }
        };
        match candidate.canonicalize() {
            Ok(root) if root.is_dir() => {
                // Same isolation rules as startup, so a saved root is always bootable.
                let layout = config::Layout {
                    root: &root,
                    data: &startup.data_path,
                    cache: &startup.img_cache,
                    static_dir: &startup.static_dir,
                    base: &startup.config_dir,
                    cert: &startup.cert_path,
                    key: &startup.key_path,
                };
                match config::check_layout(&layout) {
                    Ok(()) => {
                        next.insert("rootPath".into(), Value::String(root.to_string_lossy().into_owned()));
                    }
                    Err(message) => {
                        errors.insert("rootPath".into(), message);
                    }
                }
            }
            Ok(_) => {
                errors.insert("rootPath".into(), "共享路径必须为目录".into());
            }
            Err(_) => {
                errors.insert("rootPath".into(), "共享目录必须存在且可读取".into());
            }
        }
    }
    let https = next.get("httpsEnabled").and_then(Value::as_bool).unwrap_or(false);
    if https && next.get("port") == next.get("httpsPort") {
        errors.insert("httpsPort".into(), "HTTP 和 HTTPS 端口不能相同".into());
    }
    if https && !startup.https_enabled && !(startup.cert_path.is_file() && startup.key_path.is_file()) {
        errors.insert("httpsEnabled".into(), "请先安装自己的 HTTPS 证书和私钥，再启用".into());
    }
    for (key, message) in numeric_errors(&next, false) {
        // Values accepted at startup (e.g. an ephemeral port 0) stay valid while unchanged.
        let unchanged = next.get(&key) == current.values.get(&key);
        if !(unchanged && (key == "port" || key == "httpsPort")) {
            errors.entry(key).or_insert(message);
        }
    }
    if !errors.is_empty() {
        return Err(ApiError::bad_request("配置校验未通过").with_errors(errors));
    }
    let changes: Vec<Value> = FIELDS
        .iter()
        .filter(|item| next.get(item.key) != current.values.get(item.key))
        .map(|item| {
            json!({ "key": item.key, "before": current.values.get(item.key), "after": next.get(item.key), "restartRequired": item.restart })
        })
        .collect();
    let mut warnings = Vec::new();
    let flag = |k: &str| next.get(k).and_then(Value::as_bool).unwrap_or(false);
    if flag("publicRead") {
        warnings.push("匿名读取已开启：所有能连接服务的人都能读取文件。".to_string());
    }
    if matches!(next.get("host").and_then(Value::as_str), Some("0.0.0.0") | Some("::")) {
        warnings.push("将监听所有网卡，请确认防火墙和 HTTPS。".into());
    }
    if flag("uploadEnabled") && !flag("writeEnabled") {
        warnings.push("上传已开启但写入关闭，实际仍不能上传。".into());
    }
    if flag("secureCookies") && !startup.https_enabled {
        warnings.push("Secure cookie 需要 HTTPS；请确认 TLS 反向代理已配置，否则无法刷新恢复会话或连接实时日志。".into());
    }
    Ok(Checked { changes, warnings, next })
}

/// Apply settings that take effect without restart.
fn apply_live(state: &AppState, next: &Map<String, Value>) {
    let mut live = state.config.write().unwrap_or_else(|p| p.into_inner());
    let b = |k: &str| next.get(k).and_then(Value::as_bool).unwrap_or(false);
    let n = |k: &str| next.get(k).and_then(Value::as_f64).unwrap_or(0.0);
    live.public_read = b("publicRead");
    live.write_enabled = b("writeEnabled");
    live.upload_enabled = b("uploadEnabled");
    live.secure_cookies = b("secureCookies");
    live.auto_cleanup_enabled = b("autoCleanupEnabled");
    live.upload_max_size_mb = n("uploadMaxSizeMB");
    live.upload_timeout_seconds = n("uploadTimeoutSeconds") as u64;
    live.upload_idle_timeout_seconds = n("uploadIdleTimeoutSeconds") as u64;
    live.cache_max_size_mb = n("cacheMaxSizeMB") as u64;
    live.cache_retention_days = n("cacheRetentionDays") as u64;
    live.allowed_origins = next
        .get("allowedOrigins")
        .and_then(Value::as_array)
        .map(|a| a.iter().filter_map(|v| v.as_str().map(str::to_string)).collect())
        .unwrap_or_default();
}

pub async fn save(state: &AppState, body: &Value, actor: &str, rollback: bool) -> ApiResult<Value> {
    let Ok(_guard) = state.admin.config_lock.try_lock() else {
        return Err(ApiError::new(409, "另一配置操作正在保存，请稍后重试"));
    };
    let current = snapshot(state)?;
    let revision = body.get("revision");
    let checked = if rollback {
        let backup = backup_path(state);
        if !backup.is_file() {
            return Err(ApiError::new(404, "尚无可回滚配置"));
        }
        let stored = config::read_object(&backup).map_err(|_| ApiError::bad_request("回滚备份无效"))?;
        // A backup is a complete snapshot; missing keys restore file/default values.
        let mut restored = current.file_values.clone();
        restored.extend(only_editable(&stored));
        for item in FIELDS {
            if env_var(item.key).is_some_and(|v| state.options.env.get(v).is_some()) {
                restored.remove(item.key);
            }
        }
        validate(state, revision, Some(&Value::Object(restored)))?
    } else {
        validate(state, revision, body.get("values"))?
    };
    let stored: Map<String, Value> = only_editable(&checked.next);
    let write = |path: PathBuf, value: &Map<String, Value>| {
        let text = serde_json::to_string_pretty(value).unwrap() + "\n";
        config::write_private(&path, &text).map_err(|e| ApiError::internal("config.write", e))
    };
    write(backup_path(state), &current.values)?;
    // Recheck external edits after backup I/O, before publishing.
    if snapshot(state)?.revision != current.revision {
        return Err(ApiError::new(409, "配置已被其他操作修改，请刷新").code("STALE_REVISION"));
    }
    write(overrides_path(state), &stored)?;
    apply_live(state, &checked.next);
    let keys: Vec<Value> = checked.changes.iter().map(|c| c["key"].clone()).collect();
    state.audit(
        if rollback { "config.rollback" } else { "config.save" },
        actor,
        "admin-config",
        "succeeded",
        json!({ "keys": keys }),
    );
    crate::logging::info(
        "config",
        if rollback {
            "后台配置已回滚"
        } else {
            "后台配置已保存"
        },
    );
    Ok(json!({
        "msg": if rollback { "配置已回滚" } else { "配置已保存" },
        "config": render(state)?,
        "changes": checked.changes,
    }))
}

pub fn export(state: &AppState) -> ApiResult<Value> {
    Ok(Value::Object(snapshot(state)?.values))
}
