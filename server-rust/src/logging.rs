//! Application log: log4js-compatible line format, size rotation, redaction and live broadcast.
//!
//! Line format: `[2026-01-02T03:04:05.678Z] [INFO] [category] [eventId=<uuid>] message`.

use chrono::{DateTime, Local, NaiveDateTime, SecondsFormat, TimeZone, Utc};
use regex::Regex;
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::path::{Path, PathBuf};
use std::sync::{LazyLock, Mutex, OnceLock};
use tokio::sync::broadcast;

pub const MAX_LOG_BYTES: u64 = 10 * 1024 * 1024;
pub const LOG_BACKUPS: usize = 3;

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct LogEntry {
    pub id: String,
    pub timestamp: Option<String>,
    pub level: String,
    pub category: String,
    pub message: String,
    pub source: String,
}

struct Sink {
    path: PathBuf,
    file: Option<File>,
    size: u64,
}

pub struct Logger {
    sink: Mutex<Sink>,
    sender: broadcast::Sender<LogEntry>,
    pub dir: PathBuf,
    stdout: bool,
}

static LOGGER: OnceLock<Logger> = OnceLock::new();

/// Initialise the global logger once. Later calls are ignored (tests share a process).
pub fn init(dir: &Path, stdout: bool) -> std::io::Result<()> {
    if LOGGER.get().is_some() {
        return Ok(());
    }
    std::fs::create_dir_all(dir)?;
    let path = dir.join("app.log");
    let file = open_append(&path)?;
    let size = file.metadata().map(|m| m.len()).unwrap_or(0);
    let (sender, _) = broadcast::channel(1024);
    let _ = LOGGER.set(Logger {
        sink: Mutex::new(Sink {
            path,
            file: Some(file),
            size,
        }),
        sender,
        dir: dir.to_path_buf(),
        stdout,
    });
    Ok(())
}

/// Append-open refusing symlinks (O_NOFOLLOW) so logs cannot be redirected; mode 0600.
pub fn open_append(path: &Path) -> std::io::Result<File> {
    let mut options = OpenOptions::new();
    options.create(true).append(true);
    #[cfg(unix)]
    {
        use std::os::unix::fs::OpenOptionsExt;
        options.custom_flags(nix::libc::O_NOFOLLOW).mode(0o600);
    }
    #[cfg(not(unix))]
    if std::fs::symlink_metadata(path).is_ok_and(|m| m.file_type().is_symlink()) {
        return Err(std::io::Error::new(std::io::ErrorKind::PermissionDenied, "log file is a symlink"));
    }
    options.open(path)
}

pub fn logger() -> Option<&'static Logger> {
    LOGGER.get()
}

pub fn subscribe() -> Option<broadcast::Receiver<LogEntry>> {
    LOGGER.get().map(|l| l.sender.subscribe())
}

pub fn now_iso() -> String {
    Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true)
}

pub fn format_line(level: &str, category: &str, message: &str) -> (String, String, String) {
    let event = uuid::Uuid::new_v4().to_string();
    let ts = now_iso();
    // Never let a message forge additional lines.
    let message = redact(&message.replace(['\r', '\n'], " "));
    (format!("[{ts}] [{level}] [{category}] [eventId={event}] {message}"), event, ts)
}

pub fn log(level: &str, category: &str, message: &str) {
    let (line, event, ts) = format_line(level, category, message);
    let Some(logger) = LOGGER.get() else {
        eprintln!("{line}");
        return;
    };
    if logger.stdout {
        println!("{line}");
    }
    {
        let mut sink = logger.sink.lock().unwrap_or_else(|p| p.into_inner());
        let bytes = line.len() as u64 + 1;
        if sink.size + bytes > MAX_LOG_BYTES && sink.size > 0 {
            rotate(&mut sink);
        }
        if let Some(file) = sink.file.as_mut() {
            if writeln!(file, "{line}").is_ok() {
                sink.size += bytes;
            }
        }
    }
    let entry = LogEntry {
        id: event_id_hash("application", &event),
        timestamp: Some(ts),
        level: level.to_string(),
        category: category.to_string(),
        message: redact(&message.replace(['\r', '\n'], " ")),
        source: "application".into(),
    };
    let _ = logger.sender.send(entry);
}

fn rotate(sink: &mut Sink) {
    sink.file = None;
    let base = sink.path.clone();
    let name = |n: usize| PathBuf::from(format!("{}.{n}", base.display()));
    let _ = std::fs::remove_file(name(LOG_BACKUPS));
    for n in (1..LOG_BACKUPS).rev() {
        let _ = std::fs::rename(name(n), name(n + 1));
    }
    let _ = std::fs::rename(&base, name(1));
    sink.file = open_append(&base).ok();
    sink.size = 0;
}

pub fn info(category: &str, message: &str) {
    log("INFO", category, message)
}
pub fn warn(category: &str, message: &str) {
    log("WARN", category, message)
}
pub fn error(category: &str, message: &str) {
    log("ERROR", category, message)
}

pub fn event_id_hash(source: &str, event: &str) -> String {
    let digest = Sha256::digest(format!("{source}:{event}").as_bytes());
    hex::encode(digest)[..24].to_string()
}

static REDACTIONS: LazyLock<Vec<(Regex, &'static str)>> = LazyLock::new(|| {
    let keys = "authorization|cookie|accessToken|restartPwd|sessionToken|readTicket|password|passwd|pwd|token|ticket|secret|x-admin-token|x-file-token";
    let string = r#""(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'"#;
    vec![
        (
            Regex::new(&format!(r#"(?i)(["'](?:{keys})["']\s*:\s*)(?:{string})"#)).unwrap(),
            "${1}\"******\"",
        ),
        (Regex::new(r"(?i)\b(cookie\s*[:=]\s*)[^\r\n]*").unwrap(), "${1}******"),
        (
            Regex::new(r"(?i)([?&](?:ticket|token|pwd|password)=)[^\s&#]+").unwrap(),
            "${1}******",
        ),
        (
            Regex::new(r"(?i)\b((?:proxy-)?authorization\s*[:=]\s*)[^\r\n,;]+").unwrap(),
            "${1}******",
        ),
        (Regex::new(r"(?i)\b(Bearer|Basic)\s+[A-Za-z0-9._~+/=-]{8,}").unwrap(), "${1} ******"),
        (
            Regex::new(&format!(r#"(?i)\b({keys})\s*[:=]\s*({string}|[^\s,;]+)"#)).unwrap(),
            "${1}=******",
        ),
    ]
});

pub fn redact(value: &str) -> String {
    let mut text = value.to_string();
    for (pattern, replacement) in REDACTIONS.iter() {
        text = pattern.replace_all(&text, *replacement).into_owned();
    }
    text
}

static EVENT_RE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(
        r"(?i)^(\[[^\]]+\]\s*\[[^\]]+\]\s*\[[^\]]+\]\s*)\[eventId=([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\]\s*",
    )
    .unwrap()
});
static FULL_RE: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"^\[([^\]]+)\]\s*\[([^\]]+)\]\s*(?:\[([^\]]+)\]\s*)?(.+)$").unwrap());
static SIMPLE_RE: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"^\[([^\]]+)\]\s*(.*)$").unwrap());

/// Parse RFC 3339 or log4js local `yyyy-MM-ddThh:mm:ss.SSS` timestamps to epoch milliseconds.
pub fn parse_time(value: &str) -> Option<i64> {
    if let Ok(t) = DateTime::parse_from_rfc3339(value) {
        return Some(t.timestamp_millis());
    }
    for format in ["%Y-%m-%dT%H:%M:%S%.f", "%Y-%m-%d %H:%M:%S%.f", "%Y-%m-%dT%H:%M:%S"] {
        if let Ok(naive) = NaiveDateTime::parse_from_str(value, format) {
            return Local.from_local_datetime(&naive).earliest().map(|t| t.timestamp_millis());
        }
    }
    if let Ok(date) = chrono::NaiveDate::parse_from_str(value, "%Y-%m-%d") {
        let naive = date.and_hms_opt(0, 0, 0)?;
        return Local.from_local_datetime(&naive).earliest().map(|t| t.timestamp_millis());
    }
    None
}

pub fn iso_from_millis(ms: i64) -> String {
    Utc.timestamp_millis_opt(ms)
        .single()
        .map(|t| t.to_rfc3339_opts(SecondsFormat::Millis, true))
        .unwrap_or_default()
}

/// Parse a stored line. `location` keeps duplicate physical lines without event IDs distinct.
pub fn parse_line(line: &str, source: &str, location: &str) -> Option<LogEntry> {
    if line.trim().is_empty() {
        return None;
    }
    let (clean, event) = match EVENT_RE.captures(line) {
        Some(c) => {
            let whole = c.get(0)?.end();
            (format!("{}{}", &c[1], &line[whole..]), Some(c[2].to_lowercase()))
        }
        None => (line.to_string(), None),
    };
    let simple = SIMPLE_RE.captures(&clean);
    let millis = simple.as_ref().and_then(|c| parse_time(&c[1]));
    let (level, category, message) = match FULL_RE.captures(&clean) {
        Some(c) if millis.is_some() => (
            c[2].to_uppercase(),
            c.get(3).map(|m| m.as_str().to_string()).unwrap_or_else(|| "default".into()),
            c[4].to_string(),
        ),
        _ => (
            "INFO".to_string(),
            "default".to_string(),
            match (&simple, millis) {
                (Some(c), Some(_)) => c[2].to_string(),
                _ => clean.clone(),
            },
        ),
    };
    let id = match &event {
        Some(e) => event_id_hash(source, e),
        None => {
            let digest = Sha256::digest(format!("{source}:{location}:{line}").as_bytes());
            hex::encode(digest)[..24].to_string()
        }
    };
    Some(LogEntry {
        id,
        timestamp: millis.map(iso_from_millis),
        level,
        category,
        message: redact(&message),
        source: source.into(),
    })
}

/// Append a supervisor record (used by `file-server supervise`).
pub fn append_supervisor(dir: &Path, message: &str) {
    let _ = std::fs::create_dir_all(dir);
    let (line, _, _) = format_line("INFO", "supervisor", message);
    eprintln!("{line}");
    if let Ok(mut file) = open_append(&dir.join("restart.log")) {
        let _ = writeln!(file, "{line}");
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn redacts_credentials() {
        let text = redact(r#"{"token":"abc","restartPwd":"x"} Authorization: Bearer zzz ?ticket=t1&a=1 pwd=secret"#);
        assert!(!text.contains("abc") && !text.contains("zzz") && !text.contains("t1") && !text.contains("secret"));
        assert!(redact("cookie: fs_session=abc").ends_with("******"));
        for leak in [
            "token=long-login-secret-credential",
            "Authorization: Basic dXNlcjpzdXBlci1zZWNyZXQ=",
            r#"{"accessToken":"prefix\"secret-suffix-credential"}"#,
            "sent Bearer abcdefghijklmnop to upstream",
        ] {
            let out = redact(leak);
            for secret in [
                "long-login-secret-credential",
                "dXNlcjpzdXBlci1zZWNyZXQ",
                "secret-suffix-credential",
                "abcdefghijklmnop",
            ] {
                assert!(!out.contains(secret), "{leak} -> {out}");
            }
        }
    }

    #[test]
    fn parses_event_and_legacy_lines() {
        let e = parse_line(
            "[2024-01-15T12:00:00.000Z] [INFO] [default] [eventId=0b5e0c3e-5d4b-4c55-9c4f-6b7a5d0c1e2f] 启动",
            "application",
            "x",
        )
        .unwrap();
        assert_eq!(e.message, "启动");
        assert_eq!(e.timestamp.as_deref(), Some("2024-01-15T12:00:00.000Z"));
        let again = parse_line(
            "[2024-01-15T12:00:00.000Z] [INFO] [default] [eventId=0b5e0c3e-5d4b-4c55-9c4f-6b7a5d0c1e2f] 启动",
            "application",
            "elsewhere",
        )
        .unwrap();
        assert_eq!(e.id, again.id);
        let legacy = parse_line("[2024-01-15T12:00:00.000] [WARN] [default] 旧日志", "application", "1").unwrap();
        assert_eq!(legacy.level, "WARN");
        assert!(legacy.timestamp.is_some());
        let supervisor = parse_line("[2024-01-15T12:00:00.000Z] 子进程退出", "supervisor", "1").unwrap();
        assert_eq!(supervisor.message, "子进程退出");
        let raw = parse_line("plain text", "application", "1").unwrap();
        assert_eq!(raw.timestamp, None);
        let a = parse_line("plain text", "application", "1").unwrap();
        let b = parse_line("plain text", "application", "2").unwrap();
        assert_ne!(a.id, b.id);
    }
}
