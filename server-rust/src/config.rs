//! Configuration discovery, layering, validation and private credential initialisation.

use crate::paths::is_within;
use rand::RngCore;
use serde::Serialize;
use serde_json::{Map, Value};
use std::collections::{BTreeMap, HashMap};
use std::path::{Path, PathBuf};

pub const ADMIN_OVERRIDES: &str = "admin-config.local.json";
pub const ADMIN_BACKUP: &str = "admin-config.backup.local.json";
pub const AUTH_FILE: &str = "auth.local.json";

/// Snapshot of the environment so that tests can inject values.
#[derive(Debug, Clone, Default)]
pub struct Env(pub HashMap<String, String>);

impl Env {
    pub fn from_process() -> Self {
        Self(std::env::vars().filter(|(k, _)| k.starts_with("FILE_SERVER_")).collect())
    }
    pub fn get(&self, key: &str) -> Option<&str> {
        self.0.get(key).map(String::as_str).filter(|v| !v.is_empty())
    }
    pub fn with(mut self, key: &str, value: impl Into<String>) -> Self {
        self.0.insert(key.into(), value.into());
        self
    }
}

/// Environment variables that pin an editable field (shown readonly in admin).
pub const ENV_KEYS: &[(&str, &str)] = &[
    ("rootPath", "FILE_SERVER_ROOT"),
    ("host", "FILE_SERVER_HOST"),
    ("port", "FILE_SERVER_PORT"),
    ("httpsPort", "FILE_SERVER_HTTPS_PORT"),
];

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    pub root_path: PathBuf,
    pub data_path: PathBuf,
    pub img_cache: PathBuf,
    pub static_dir: PathBuf,
    pub config_dir: PathBuf,
    pub config_file: Option<PathBuf>,
    pub db_path: PathBuf,
    pub logs_dir: PathBuf,
    pub host: String,
    pub port: u16,
    pub https_enabled: bool,
    pub https_port: u16,
    pub cert_path: PathBuf,
    pub key_path: PathBuf,
    pub public_read: bool,
    pub write_enabled: bool,
    pub upload_enabled: bool,
    #[serde(rename = "uploadMaxSizeMB")]
    pub upload_max_size_mb: f64,
    pub upload_timeout_seconds: u64,
    pub upload_idle_timeout_seconds: u64,
    pub allowed_origins: Vec<String>,
    pub secure_cookies: bool,
    #[serde(rename = "cacheMaxSizeMB")]
    pub cache_max_size_mb: u64,
    pub cache_retention_days: u64,
    pub auto_cleanup_enabled: bool,
    #[serde(skip)]
    pub access_token: String,
    #[serde(skip)]
    pub admin_token: String,
}

impl Config {
    pub fn upload_max_bytes(&self) -> u64 {
        ((self.upload_max_size_mb * 1024.0 * 1024.0).floor() as u64).max(1)
    }
}

pub fn defaults() -> Map<String, Value> {
    serde_json::from_str(
        r#"{"rootPath":"./files","dataPath":"./data","staticDir":"./static","host":"127.0.0.1",
        "port":3000,"httpsEnabled":false,"httpsPort":3001,"certPath":"./cert/file.crt",
        "keyPath":"./cert/private.pem","publicRead":false,"writeEnabled":false,"uploadEnabled":false,
        "uploadMaxSizeMB":4096,"uploadTimeoutSeconds":1800,"uploadIdleTimeoutSeconds":120,
        "allowedOrigins":[],"secureCookies":false,"cacheMaxSizeMB":0,"cacheRetentionDays":30,
        "autoCleanupEnabled":false}"#,
    )
    .expect("valid defaults")
}

/// Numeric rule: (min, max, integer).
pub const NUMERIC_RULES: &[(&str, f64, f64, bool)] = &[
    ("port", 1.0, 65535.0, true),
    ("httpsPort", 1.0, 65535.0, true),
    ("uploadMaxSizeMB", 0.001, 1_048_576.0, false),
    ("uploadTimeoutSeconds", 1.0, 86400.0, true),
    ("uploadIdleTimeoutSeconds", 1.0, 86400.0, true),
    ("cacheMaxSizeMB", 0.0, 1_048_576.0, true),
    ("cacheRetentionDays", 1.0, 3650.0, true),
];

pub fn numeric_rule(key: &str) -> Option<(f64, f64, bool)> {
    NUMERIC_RULES.iter().find(|r| r.0 == key).map(|r| (r.1, r.2, r.3))
}

/// Shared numeric and cross-field validation. Startup alone allows port 0 (ephemeral).
pub fn numeric_errors(values: &Map<String, Value>, allow_ephemeral: bool) -> BTreeMap<String, String> {
    let mut errors = BTreeMap::new();
    for (key, min, max, integer) in NUMERIC_RULES {
        let Some(value) = values.get(*key) else { continue };
        let min = if allow_ephemeral && (*key == "port" || *key == "httpsPort") {
            0.0
        } else {
            *min
        };
        let ok = value
            .as_f64()
            .map(|n| n.is_finite() && n >= min && n <= *max && (!integer || n.fract() == 0.0))
            .unwrap_or(false);
        if !ok {
            errors.insert(
                key.to_string(),
                format!("请输入 {min} 到 {max} 的有效{}", if *integer { "整数" } else { "数值" }),
            );
        }
    }
    if let (Some(idle), Some(total)) = (
        values.get("uploadIdleTimeoutSeconds").and_then(Value::as_f64),
        values.get("uploadTimeoutSeconds").and_then(Value::as_f64),
    ) {
        if idle > total && !errors.contains_key("uploadIdleTimeoutSeconds") {
            errors.insert("uploadIdleTimeoutSeconds".into(), "上传空闲期限不能超过总期限".into());
        }
    }
    errors
}

/// Exact `http(s)://host[:port]` origins only; no wildcard, path or credentials.
pub fn valid_origin(origin: &str) -> bool {
    let rest = if let Some(r) = origin.strip_prefix("http://") {
        r
    } else if let Some(r) = origin.strip_prefix("https://") {
        r
    } else {
        return false;
    };
    if rest.is_empty() || rest != rest.to_lowercase() || rest.chars().any(|c| "/?#*@ \\%".contains(c) || c.is_control()) {
        return false;
    }
    let (host, port) = if let Some(stripped) = rest.strip_prefix('[') {
        match stripped.split_once(']') {
            Some((h, "")) if !h.is_empty() => (h, None),
            Some((h, p)) if !h.is_empty() && p.starts_with(':') => (h, Some(&p[1..])),
            _ => return false,
        }
    } else {
        match rest.rsplit_once(':') {
            Some((h, p)) => (h, Some(p)),
            None => (rest, None),
        }
    };
    if host.is_empty() || host.contains(':') && !rest.starts_with('[') {
        return false;
    }
    match port {
        Some(p) => {
            !p.is_empty() && p.len() <= 5 && p.chars().all(|c| c.is_ascii_digit()) && p.parse::<u32>().map(|n| n <= 65535).unwrap_or(false)
        }
        None => true,
    }
}

pub fn valid_origins(value: &Value) -> bool {
    match value.as_array() {
        Some(list) => list.len() <= 16 && list.iter().all(|o| o.as_str().map(valid_origin).unwrap_or(false)),
        None => false,
    }
}

fn read_json_object(path: &Path) -> Result<Map<String, Value>, String> {
    match std::fs::symlink_metadata(path) {
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(Map::new()),
        Err(e) => return Err(format!("无法读取 {}: {e}", path.display())),
        Ok(m) if m.file_type().is_symlink() => return Err(format!("配置文件不能是软链接: {}", path.display())),
        Ok(_) => {}
    }
    let text = std::fs::read_to_string(path).map_err(|e| format!("无法读取 {}: {e}", path.display()))?;
    let text = text.trim_start_matches('\u{feff}');
    match serde_json::from_str::<Value>(text) {
        Ok(Value::Object(map)) => Ok(map),
        Ok(_) => Err(format!("配置必须为 JSON 对象: {}", path.display())),
        Err(e) => Err(format!("配置 JSON 无效 {}: {e}", path.display())),
    }
}

pub fn read_object(path: &Path) -> Result<Map<String, Value>, String> {
    read_json_object(path)
}

/// Locate the configuration file and base directory (see shared/RUST_API.md).
pub fn discover(explicit: Option<PathBuf>, env: &Env) -> Result<(Option<PathBuf>, PathBuf), String> {
    let absolute = |p: PathBuf| -> PathBuf {
        if p.is_absolute() {
            p
        } else {
            std::env::current_dir().unwrap_or_default().join(p)
        }
    };
    if let Some(path) = explicit.or_else(|| env.get("FILE_SERVER_CONFIG").map(PathBuf::from)) {
        let path = absolute(path);
        if !path.is_file() {
            return Err(format!("配置文件不存在: {}", path.display()));
        }
        let path = path.canonicalize().map_err(|e| e.to_string())?;
        let base = path.parent().map(Path::to_path_buf).unwrap_or_default();
        return Ok((Some(path), base));
    }
    let exe_dir = std::env::current_exe()
        .ok()
        .and_then(|p| p.canonicalize().ok())
        .and_then(|p| p.parent().map(Path::to_path_buf));
    let mut candidates = vec![absolute(PathBuf::from("config.json"))];
    if let Some(dir) = &exe_dir {
        candidates.push(dir.join("config.json"));
    }
    if cfg!(debug_assertions) {
        candidates.push(PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("config.json"));
    }
    for candidate in candidates {
        if candidate.is_file() {
            let path = candidate.canonicalize().map_err(|e| e.to_string())?;
            let base = path.parent().map(Path::to_path_buf).unwrap_or_default();
            return Ok((Some(path), base));
        }
    }
    let base = exe_dir.unwrap_or_else(|| absolute(PathBuf::from(".")));
    Ok((None, base))
}

fn resolve(base: &Path, value: &str) -> PathBuf {
    let p = PathBuf::from(value);
    if p.is_absolute() {
        p
    } else {
        normalize_lexical(&base.join(p))
    }
}

/// Remove `.`/`..` components lexically (used before the path exists).
pub fn normalize_lexical(path: &Path) -> PathBuf {
    let mut out = PathBuf::new();
    for component in path.components() {
        match component {
            std::path::Component::CurDir => {}
            std::path::Component::ParentDir => {
                out.pop();
            }
            other => out.push(other.as_os_str()),
        }
    }
    out
}

/// Real path of `path`: canonicalize the nearest existing ancestor (following any
/// symlink/junction there) and append the not-yet-existing suffix.
pub fn canonical_existing(path: &Path) -> PathBuf {
    let mut suffix: Vec<std::ffi::OsString> = Vec::new();
    let mut current = path.to_path_buf();
    loop {
        if let Ok(real) = current.canonicalize() {
            let mut out = real;
            for part in suffix.iter().rev() {
                if part == ".." {
                    out.pop();
                } else if part != "." {
                    out.push(part);
                }
            }
            return out;
        }
        match (current.file_name().map(|n| n.to_os_string()), current.parent()) {
            (Some(name), Some(parent)) => {
                suffix.push(name);
                current = parent.to_path_buf();
            }
            _ => {
                // `..` or root components: fall back to lexical form of what remains.
                if let Some(component) = current.components().next_back() {
                    if matches!(component, std::path::Component::ParentDir) {
                        suffix.push("..".into());
                        current.pop();
                        if current.as_os_str().is_empty() {
                            return normalize_lexical(path);
                        }
                        continue;
                    }
                }
                return normalize_lexical(path);
            }
        }
    }
}

fn canonical_or_lexical(path: &Path) -> PathBuf {
    canonical_existing(path)
}

/// Private files inside dataPath must be real files, never links that could redirect
/// logs, credentials or the database into served directories.
pub fn check_private_entries(data: &Path, logs: &Path) -> Result<(), String> {
    let mut entries: Vec<PathBuf> = [
        "imgCache.db",
        "imgCache.db-wal",
        "imgCache.db-shm",
        "imgCache.db-journal",
        AUTH_FILE,
        ADMIN_OVERRIDES,
        ADMIN_BACKUP,
        "logs",
        "cache",
    ]
    .iter()
    .map(|n| data.join(n))
    .collect();
    for name in ["app.log", "app.log.1", "app.log.2", "app.log.3", "restart.log"] {
        entries.push(logs.join(name));
    }
    for entry in entries {
        match std::fs::symlink_metadata(&entry) {
            Ok(meta) if meta.file_type().is_symlink() || crate::paths::is_reparse_point(&meta) => {
                return Err(format!("私有数据路径不能是软链接或目录联接: {}", entry.display()));
            }
            _ => {}
        }
    }
    Ok(())
}

/// Raw layered values before environment overrides: defaults ← config.json ← config.local.json.
pub fn layered_files(config_file: Option<&Path>, base: &Path) -> Result<Map<String, Value>, String> {
    let mut raw = defaults();
    if let Some(file) = config_file {
        raw.extend(read_json_object(file)?);
    }
    raw.extend(read_json_object(&base.join("config.local.json"))?);
    Ok(raw)
}

fn data_path_of(raw: &Map<String, Value>, base: &Path, env: &Env) -> PathBuf {
    let value = env
        .get("FILE_SERVER_DATA_DIR")
        .map(str::to_string)
        .or_else(|| raw.get("dataPath").and_then(Value::as_str).map(str::to_string))
        .unwrap_or_else(|| "./data".into());
    resolve(base, &value)
}

/// Apply environment overrides that are not credentials.
pub fn apply_env(raw: &mut Map<String, Value>, env: &Env) -> Result<(), String> {
    for (key, var) in [
        ("rootPath", "FILE_SERVER_ROOT"),
        ("dataPath", "FILE_SERVER_DATA_DIR"),
        ("imgCache", "FILE_SERVER_CACHE_DIR"),
        ("staticDir", "FILE_SERVER_STATIC_DIR"),
        ("host", "FILE_SERVER_HOST"),
    ] {
        if let Some(v) = env.get(var) {
            raw.insert(key.into(), Value::String(v.into()));
        }
    }
    for (key, var) in [("port", "FILE_SERVER_PORT"), ("httpsPort", "FILE_SERVER_HTTPS_PORT")] {
        if let Some(v) = env.get(var) {
            let n: u16 = v.parse().map_err(|_| format!("{var} 必须是 0-65535 的整数"))?;
            raw.insert(key.into(), Value::from(n));
        }
    }
    Ok(())
}

/// Full startup load: discovery, layering, credentials and validation.
pub fn load(explicit: Option<PathBuf>, env: &Env) -> Result<Config, String> {
    let (file, base) = discover(explicit, env)?;
    let mut raw = layered_files(file.as_deref(), &base)?;
    apply_env(&mut raw, env)?;
    let data = data_path_of(&raw, &base, env);
    // Isolate before writing anything: the private directory must not be served.
    let base = canonical_existing(&base);
    let root = raw
        .get("rootPath")
        .and_then(Value::as_str)
        .map(|r| canonical_or_lexical(&resolve(&base, r)));
    let static_dir = raw
        .get("staticDir")
        .and_then(Value::as_str)
        .map(|r| canonical_or_lexical(&resolve(&base, r)));
    let data_check = canonical_or_lexical(&data);
    if root.as_deref().is_some_and(|r| is_within(&data_check, r)) {
        return Err("运行数据目录不能位于共享目录内".into());
    }
    if static_dir.as_deref().is_some_and(|s| is_within(&data_check, s)) {
        return Err("运行数据目录不能位于静态前端目录内".into());
    }
    let data = data_check;
    check_private_entries(&data, &data.join("logs"))?;
    // Only read admin overrides here; directory creation and chmod happen after all checks.
    raw.extend(read_json_object(&data.join(ADMIN_OVERRIDES))?);
    apply_env(&mut raw, env)?;
    let mut config = normalize(&raw, &base, file)?;
    load_credentials(&mut config, &raw, env)?;
    Ok(config)
}

fn bool_of(raw: &Map<String, Value>, key: &str) -> bool {
    raw.get(key).and_then(Value::as_bool).unwrap_or(false)
}

/// Resolved locations that must stay mutually isolated.
pub struct Layout<'a> {
    pub root: &'a Path,
    pub data: &'a Path,
    pub cache: &'a Path,
    pub static_dir: &'a Path,
    pub base: &'a Path,
    pub cert: &'a Path,
    pub key: &'a Path,
}

/// The single isolation rule set shared by startup and admin validation.
pub fn check_layout(l: &Layout<'_>) -> Result<(), String> {
    if l.root.parent().is_none() {
        return Err("不能将系统根目录设为共享目录".into());
    }
    if is_within(l.data, l.root) {
        return Err("运行数据目录不能位于共享目录内".into());
    }
    if is_within(l.root, l.data) {
        return Err("共享目录不能位于运行数据目录内".into());
    }
    if is_within(l.cache, l.root) {
        return Err("缓存目录不能位于共享目录内".into());
    }
    for (name, private) in [("运行数据目录", l.data), ("缓存目录", l.cache), ("配置目录", l.base)] {
        if is_within(private, l.root) {
            return Err(format!("{name}不能位于共享目录内"));
        }
        if is_within(private, l.static_dir) {
            return Err(format!("{name}不能位于静态前端目录内"));
        }
    }
    if is_within(l.root, l.cache) {
        return Err("共享目录不能位于缓存目录内".into());
    }
    if is_within(l.root, l.static_dir) || is_within(l.static_dir, l.root) {
        return Err("共享目录与静态前端目录不能互相包含".into());
    }
    for (name, file) in [("TLS 私钥", l.key), ("TLS 证书", l.cert)] {
        if is_within(file, l.root) || is_within(file, l.static_dir) || is_within(file, l.cache) {
            return Err(format!("{name}不能位于共享目录、静态前端目录或缓存目录内"));
        }
    }
    // Reciprocal isolation before any mkdir/chmod: restricting a private directory to 0700
    // must never lock out the filesystem root, the share, the UI or the configuration.
    for (name, private) in [("运行数据目录", l.data), ("缓存目录", l.cache)] {
        if private.parent().is_none() {
            return Err(format!("{name}不能是文件系统根目录"));
        }
        if is_within(l.root, private) {
            return Err(format!("{name}不能包含共享目录（例如 dataPath 不能设为共享目录的上级）"));
        }
        if is_within(l.static_dir, private) {
            return Err(format!("{name}不能包含静态前端目录"));
        }
        if is_within(l.base, private) {
            return Err(format!("{name}不能是配置目录或其上级目录"));
        }
    }
    if is_within(l.data, l.cache) && l.data != l.cache {
        return Err("缓存目录不能包含运行数据目录".into());
    }
    if l.data == l.cache {
        return Err("缓存目录必须与运行数据目录分开".into());
    }
    Ok(())
}

/// Validate and resolve layered raw values (no credentials).
pub fn normalize(raw: &Map<String, Value>, base: &Path, file: Option<PathBuf>) -> Result<Config, String> {
    let str_of = |key: &str, default: &str| -> String {
        raw.get(key)
            .and_then(Value::as_str)
            .filter(|s| !s.is_empty())
            .unwrap_or(default)
            .to_string()
    };
    let base = canonical_or_lexical(base);
    let root = resolve(&base, &str_of("rootPath", "./files"));
    let root = root
        .canonicalize()
        .map_err(|_| format!("共享目录不存在或不可读取: {}（请先创建）", root.display()))?;
    if !root.is_dir() {
        return Err("共享路径必须为目录".into());
    }
    if root.parent().is_none() {
        return Err("不能将系统根目录设为共享目录".into());
    }
    let static_dir = canonical_or_lexical(&resolve(&base, &str_of("staticDir", "./static")));
    let data = canonical_existing(&resolve(&base, &str_of("dataPath", "./data")));
    if is_within(&data, &root) {
        return Err("运行数据目录不能位于共享目录内".into());
    }
    let cache = match raw.get("imgCache").and_then(Value::as_str).filter(|s| !s.is_empty()) {
        Some(v) => canonical_existing(&resolve(&base, v)),
        None => data.join("cache"),
    };
    let cert_path = canonical_existing(&resolve(&base, &str_of("certPath", "./cert/file.crt")));
    let key_path = canonical_existing(&resolve(&base, &str_of("keyPath", "./cert/private.pem")));
    check_layout(&Layout {
        root: &root,
        data: &data,
        cache: &cache,
        static_dir: &static_dir,
        base: &base,
        cert: &cert_path,
        key: &key_path,
    })?;
    check_private_entries(&data, &data.join("logs"))?;
    // All isolation checks passed: now create private directories and restrict them.
    create_private_dir(&data)?;
    create_private_dir(&cache)?;
    create_private_dir(&data.join("logs"))?;
    for (dir, expected) in [(&data, &data), (&cache, &cache)] {
        if dir.canonicalize().map_err(|e| e.to_string())? != *expected {
            return Err(format!("私有目录在校验期间发生变化: {}", dir.display()));
        }
    }
    let mut numeric = Map::new();
    for (key, ..) in NUMERIC_RULES {
        if let Some(v) = raw.get(*key) {
            numeric.insert(key.to_string(), v.clone());
        }
    }
    let errors = numeric_errors(&numeric, true);
    if !errors.is_empty() {
        return Err(format!("配置数值无效: {}", errors.keys().cloned().collect::<Vec<_>>().join(", ")));
    }
    let origins = raw.get("allowedOrigins").cloned().unwrap_or(Value::Array(vec![]));
    if !valid_origins(&origins) {
        return Err("allowedOrigins 只能填写明确的 http/https 来源，不能使用通配符".into());
    }
    let num = |key: &str| raw.get(key).and_then(Value::as_f64).unwrap_or(0.0);
    Ok(Config {
        root_path: root,
        db_path: data.join("imgCache.db"),
        logs_dir: data.join("logs"),
        data_path: data,
        img_cache: cache,
        static_dir,
        config_dir: base.clone(),
        config_file: file,
        host: str_of("host", "127.0.0.1"),
        port: num("port") as u16,
        https_enabled: bool_of(raw, "httpsEnabled"),
        https_port: num("httpsPort") as u16,
        cert_path,
        key_path,
        public_read: bool_of(raw, "publicRead"),
        write_enabled: bool_of(raw, "writeEnabled"),
        upload_enabled: bool_of(raw, "uploadEnabled"),
        upload_max_size_mb: num("uploadMaxSizeMB"),
        upload_timeout_seconds: num("uploadTimeoutSeconds") as u64,
        upload_idle_timeout_seconds: num("uploadIdleTimeoutSeconds") as u64,
        allowed_origins: origins
            .as_array()
            .map(|a| a.iter().filter_map(|v| v.as_str().map(str::to_string)).collect())
            .unwrap_or_default(),
        secure_cookies: bool_of(raw, "secureCookies"),
        cache_max_size_mb: num("cacheMaxSizeMB") as u64,
        cache_retention_days: num("cacheRetentionDays") as u64,
        auto_cleanup_enabled: bool_of(raw, "autoCleanupEnabled"),
        access_token: String::new(),
        admin_token: String::new(),
    })
}

/// Create (if needed) a directory readable only by the service user (0700 on Unix).
pub fn create_private_dir(path: &Path) -> Result<(), String> {
    if let Ok(meta) = std::fs::symlink_metadata(path) {
        if meta.file_type().is_symlink() || crate::paths::is_reparse_point(&meta) {
            return Err(format!("私有目录不能是软链接: {}", path.display()));
        }
    }
    std::fs::create_dir_all(path).map_err(|e| format!("无法创建目录 {}: {e}", path.display()))?;
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(path, std::fs::Permissions::from_mode(0o700))
            .map_err(|e| format!("无法设置目录权限 {}: {e}", path.display()))?;
    }
    Ok(())
}

pub fn random_token() -> String {
    let mut bytes = [0u8; 32];
    rand::rng().fill_bytes(&mut bytes);
    hex::encode(bytes)
}

/// Credentials: env > private config value > data/auth.local.json > generated random.
/// Never stores the historical demonstration password `123456`.
pub fn load_credentials(config: &mut Config, raw: &Map<String, Value>, env: &Env) -> Result<(), String> {
    let path = config.data_path.join(AUTH_FILE);
    let saved = read_json_object(&path)?;
    #[cfg(unix)]
    if path.exists() {
        use std::os::unix::fs::PermissionsExt;
        let _ = std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o600));
    }
    let saved_value = |key: &str| saved.get(key).and_then(Value::as_str).filter(|s| !s.is_empty()).map(str::to_string);
    let raw_value = |key: &str| {
        raw.get(key)
            .and_then(Value::as_str)
            .filter(|s| !s.is_empty() && *s != "123456")
            .map(str::to_string)
    };
    let access_generated = saved_value("accessToken").is_none();
    let admin_generated = saved_value("restartPwd").is_none();
    let stored_access = saved_value("accessToken").unwrap_or_else(random_token);
    let stored_admin = saved_value("restartPwd").unwrap_or_else(random_token);
    config.access_token = env
        .get("FILE_SERVER_ACCESS_TOKEN")
        .map(str::to_string)
        .or_else(|| raw_value("accessToken"))
        .unwrap_or_else(|| stored_access.clone());
    config.admin_token = env
        .get("FILE_SERVER_ADMIN_TOKEN")
        .map(str::to_string)
        .or_else(|| raw_value("restartPwd"))
        .unwrap_or_else(|| stored_admin.clone());
    if config.access_token.chars().count() < 16 || config.admin_token.chars().count() < 16 || config.access_token == config.admin_token {
        return Err("访问令牌和管理令牌必须不同，且各至少 16 个字符；请修改私有配置或环境变量".into());
    }
    if access_generated || admin_generated {
        let body = serde_json::json!({ "accessToken": stored_access, "restartPwd": stored_admin });
        write_private(&path, &(serde_json::to_string_pretty(&body).unwrap() + "\n"))
            .map_err(|e| format!("无法写入凭据文件 {}: {e}", path.display()))?;
    }
    Ok(())
}

/// Atomically write a private (0600) file next to its destination.
pub fn write_private(path: &Path, content: &str) -> std::io::Result<()> {
    use std::io::Write;
    let dir = path.parent().unwrap_or(Path::new("."));
    let temp = dir.join(format!(".write-{}.tmp", uuid::Uuid::new_v4()));
    let result = (|| {
        let mut options = std::fs::OpenOptions::new();
        options.write(true).create_new(true);
        #[cfg(unix)]
        {
            use std::os::unix::fs::OpenOptionsExt;
            options.mode(0o600);
        }
        let mut file = options.open(&temp)?;
        file.write_all(content.as_bytes())?;
        file.sync_all()?;
        drop(file);
        std::fs::rename(&temp, path)
    })();
    if result.is_err() {
        let _ = std::fs::remove_file(&temp);
    }
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn origins() {
        assert!(valid_origin("https://files.example.com"));
        assert!(valid_origin("http://127.0.0.1:3000"));
        assert!(valid_origin("http://[::1]:8080"));
        assert!(!valid_origin("https://*.example.com"));
        assert!(!valid_origin("https://a.com/"));
        assert!(!valid_origin("ftp://a.com"));
        assert!(!valid_origin("https://A.com"));
        assert!(!valid_origin("https://a.com:99999"));
        assert!(!valid_origin("https://u@a.com"));
        assert!(!valid_origin("https://[::1]evil"));
        assert!(!valid_origin("https://[::1]:"));
        assert!(!valid_origin("https://[]"));
    }

    #[test]
    fn numeric_rules() {
        let values: Map<String, Value> = serde_json::from_str(
            r#"{"port":0,"cacheRetentionDays":0,"uploadMaxSizeMB":0.5,"uploadTimeoutSeconds":10,"uploadIdleTimeoutSeconds":20}"#,
        )
        .unwrap();
        let errors = numeric_errors(&values, false);
        assert!(errors.contains_key("port"));
        assert!(errors.contains_key("cacheRetentionDays"));
        assert!(!errors.contains_key("uploadMaxSizeMB"));
        assert!(errors.contains_key("uploadIdleTimeoutSeconds"));
        assert!(!numeric_errors(&values, true).contains_key("port"));
    }

    fn setup() -> (tempfile::TempDir, PathBuf) {
        let dir = tempfile::tempdir().unwrap();
        let base = dir.path().canonicalize().unwrap();
        std::fs::create_dir(base.join("files")).unwrap();
        (dir, base)
    }

    #[test]
    fn generates_distinct_private_credentials_once() {
        let (_dir, base) = setup();
        std::fs::write(base.join("config.json"), "{}").unwrap();
        let env = Env::default();
        let first = load(Some(base.join("config.json")), &env).unwrap();
        assert_ne!(first.access_token, first.admin_token);
        assert_eq!(first.access_token.len(), 64);
        let second = load(Some(base.join("config.json")), &env).unwrap();
        assert_eq!(first.admin_token, second.admin_token);
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            let mode = std::fs::metadata(base.join("data/auth.local.json")).unwrap().permissions().mode();
            assert_eq!(mode & 0o777, 0o600);
        }
        let env = env.with("FILE_SERVER_ADMIN_TOKEN", "short");
        assert!(load(Some(base.join("config.json")), &env).is_err());
    }

    #[test]
    fn rejects_private_data_in_share_or_static() {
        let (_dir, base) = setup();
        std::fs::write(base.join("config.json"), r#"{"dataPath":"./files/data"}"#).unwrap();
        assert!(load(Some(base.join("config.json")), &Env::default()).is_err());
        std::fs::write(base.join("config.json"), r#"{"staticDir":"."}"#).unwrap();
        assert!(load(Some(base.join("config.json")), &Env::default()).is_err());
        std::fs::write(base.join("config.json"), r#"{"rootPath":"/"}"#).unwrap();
        assert!(load(Some(base.join("config.json")), &Env::default()).is_err());
        std::fs::write(base.join("config.json"), r#"{"rootPath":"."}"#).unwrap();
        assert!(load(Some(base.join("config.json")), &Env::default()).is_err());
        std::fs::write(base.join("config.json"), r#"{"allowedOrigins":["*"]}"#).unwrap();
        assert!(load(Some(base.join("config.json")), &Env::default()).is_err());
    }

    #[cfg(unix)]
    #[test]
    fn rejects_symlinked_private_paths_and_keys() {
        use std::os::unix::fs::{symlink, PermissionsExt};
        let (_dir, base) = setup();
        let cfg = base.join("config.json");
        std::fs::create_dir_all(base.join("static/web")).unwrap();
        std::fs::create_dir_all(base.join("data")).unwrap();
        symlink(base.join("static/web"), base.join("data/logs")).unwrap();
        std::fs::write(&cfg, "{}").unwrap();
        assert!(load(Some(cfg.clone()), &Env::default()).is_err());
        std::fs::remove_file(base.join("data/logs")).unwrap();
        symlink(base.join("static/web/leak.db"), base.join("data/imgCache.db")).unwrap();
        assert!(load(Some(cfg.clone()), &Env::default()).is_err());
        std::fs::remove_file(base.join("data/imgCache.db")).unwrap();
        std::fs::write(base.join("files/key.pem"), "k").unwrap();
        std::fs::write(&cfg, r#"{"httpsEnabled":true,"keyPath":"./files/key.pem"}"#).unwrap();
        assert!(load(Some(cfg.clone()), &Env::default()).is_err());
        // Cache alias into the share is refused without touching the share's mode.
        std::fs::set_permissions(base.join("files"), std::fs::Permissions::from_mode(0o755)).unwrap();
        symlink(base.join("files"), base.join("cache-alias")).unwrap();
        std::fs::write(&cfg, r#"{"imgCache":"./cache-alias"}"#).unwrap();
        assert!(load(Some(cfg.clone()), &Env::default()).is_err());
        let mode = std::fs::metadata(base.join("files")).unwrap().permissions().mode();
        assert_eq!(mode & 0o777, 0o755);
        // Missing static dir behind an alias into the share is resolved through the alias.
        symlink(base.join("files"), base.join("alias")).unwrap();
        std::fs::write(&cfg, r#"{"staticDir":"./alias/web"}"#).unwrap();
        assert!(load(Some(cfg.clone()), &Env::default()).is_err());
        std::fs::write(&cfg, "{}").unwrap();
        let config = load(Some(cfg), &Env::default()).unwrap();
        let mode = std::fs::metadata(&config.data_path).unwrap().permissions().mode();
        assert_eq!(mode & 0o777, 0o700);
    }

    #[test]
    fn layering_and_env() {
        let (_dir, base) = setup();
        std::fs::write(base.join("config.json"), r#"{"port":3100,"publicRead":true}"#).unwrap();
        std::fs::write(base.join("config.local.json"), r#"{"port":3200}"#).unwrap();
        std::fs::create_dir_all(base.join("data")).unwrap();
        std::fs::write(
            base.join("data").join(ADMIN_OVERRIDES),
            r#"{"publicRead":false,"writeEnabled":true}"#,
        )
        .unwrap();
        let env = Env::default().with("FILE_SERVER_HOST", "0.0.0.0");
        let config = load(Some(base.join("config.json")), &env).unwrap();
        assert_eq!(config.port, 3200);
        assert!(!config.public_read);
        assert!(config.write_enabled);
        assert_eq!(config.host, "0.0.0.0");
        assert_eq!(config.img_cache, base.join("data/cache"));
    }

    #[cfg(unix)]
    #[test]
    fn data_path_cannot_contain_share_or_config() {
        use std::os::unix::fs::PermissionsExt;
        let dir = tempfile::tempdir().unwrap();
        let base = dir.path().join("base");
        std::fs::create_dir_all(base.join("files")).unwrap();
        std::fs::set_permissions(&base, std::fs::Permissions::from_mode(0o755)).unwrap();
        for data in [".", "..", "/"] {
            let mut raw = defaults();
            raw.insert("dataPath".into(), Value::String(data.into()));
            raw.insert("imgCache".into(), Value::String("./cache-x".into()));
            assert!(normalize(&raw, &base, None).is_err(), "dataPath {data}");
        }
        let mode = std::fs::metadata(&base).unwrap().permissions().mode() & 0o777;
        assert_eq!(mode, 0o755, "base must not be chmodded");
        assert!(!base.join("cache-x").exists(), "nothing created on rejection");
    }
}
