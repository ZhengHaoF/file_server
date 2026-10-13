//! SQLite storage: preview cache index, durable maintenance jobs and admin audit.
//! Startup migrations are additive only (`CREATE ... IF NOT EXISTS`, `ADD COLUMN`); never DROP.

use crate::error::{ApiError, ApiResult};
use rusqlite::{params, Connection, OptionalExtension};
use serde_json::Value;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Mutex;

pub const SCHEMA_VERSION: i64 = 2;

pub struct Db {
    conn: Mutex<Connection>,
    pub path: PathBuf,
    pub cache_version: AtomicU64,
}

#[derive(Debug, Clone)]
pub struct CacheRow {
    pub key: String,
    pub ext: String,
    pub access: i64,
    pub kind: String,
}

pub fn now_ms() -> i64 {
    chrono::Utc::now().timestamp_millis()
}

impl Db {
    pub fn open(path: &Path) -> Result<Self, rusqlite::Error> {
        for suffix in ["", "-wal", "-shm", "-journal"] {
            let file = PathBuf::from(format!("{}{suffix}", path.display()));
            if std::fs::symlink_metadata(&file).is_ok_and(|m| m.file_type().is_symlink()) {
                return Err(rusqlite::Error::InvalidPath(file));
            }
        }
        let conn = Connection::open(path)?;
        conn.busy_timeout(std::time::Duration::from_secs(5))?;
        conn.pragma_update(None, "journal_mode", "WAL")?;
        let db = Self {
            conn: Mutex::new(conn),
            path: path.to_path_buf(),
            cache_version: AtomicU64::new(0),
        };
        db.migrate()?;
        db.restrict_permissions();
        Ok(db)
    }

    fn restrict_permissions(&self) {
        #[cfg(unix)]
        for suffix in ["", "-wal", "-shm"] {
            use std::os::unix::fs::PermissionsExt;
            let file = PathBuf::from(format!("{}{suffix}", self.path.display()));
            if file.exists() {
                let _ = std::fs::set_permissions(&file, std::fs::Permissions::from_mode(0o600));
            }
        }
    }

    fn migrate(&self) -> Result<(), rusqlite::Error> {
        let conn = self.lock();
        conn.execute_batch("CREATE TABLE IF NOT EXISTS image (psha256 TEXT PRIMARY KEY, ext TEXT, ctime TEXT);")?;
        let has_kind = {
            let mut stmt = conn.prepare("PRAGMA table_info(image)")?;
            let names: Vec<String> = stmt.query_map([], |r| r.get::<_, String>(1))?.collect::<Result<_, _>>()?;
            names.iter().any(|n| n == "kind")
        };
        if !has_kind {
            conn.execute_batch("ALTER TABLE image ADD COLUMN kind TEXT NOT NULL DEFAULT 'legacy';")?;
        }
        conn.execute_batch(
            "CREATE INDEX IF NOT EXISTS image_access_time ON image(CAST(ctime AS INTEGER));
             CREATE TABLE IF NOT EXISTS admin_audit (
                id INTEGER PRIMARY KEY AUTOINCREMENT, created_at INTEGER NOT NULL,
                action TEXT NOT NULL, actor TEXT NOT NULL, target TEXT NOT NULL, result TEXT NOT NULL, details TEXT NOT NULL);
             CREATE TABLE IF NOT EXISTS admin_jobs (
                seq INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT NOT NULL UNIQUE, data TEXT NOT NULL);
             CREATE INDEX IF NOT EXISTS admin_audit_time ON admin_audit(created_at);",
        )?;
        let version: i64 = conn.query_row("PRAGMA user_version", [], |r| r.get(0))?;
        if version < SCHEMA_VERSION {
            conn.pragma_update(None, "user_version", SCHEMA_VERSION)?;
        }
        Ok(())
    }

    fn lock(&self) -> std::sync::MutexGuard<'_, Connection> {
        self.conn.lock().unwrap_or_else(|p| p.into_inner())
    }

    pub fn bump(&self) {
        self.cache_version.fetch_add(1, Ordering::SeqCst);
    }
    pub fn version(&self) -> u64 {
        self.cache_version.load(Ordering::SeqCst)
    }

    pub fn ping(&self) -> ApiResult<()> {
        self.lock().query_row("SELECT 1", [], |_| Ok(()))?;
        Ok(())
    }

    pub fn insert_cache(&self, key: &str, ext: &str, kind: &str) -> ApiResult<()> {
        let kind = if kind == "image" || kind == "video" { kind } else { "legacy" };
        self.lock().execute(
            "INSERT OR REPLACE INTO image (psha256, ext, ctime, kind) VALUES (?1, ?2, ?3, ?4)",
            params![key, ext, now_ms().to_string(), kind],
        )?;
        self.bump();
        Ok(())
    }

    /// Refresh last access at most once a minute.
    pub fn touch_cache(&self, key: &str, kind: &str) -> ApiResult<bool> {
        let conn = self.lock();
        let now = now_ms();
        let exists = conn
            .query_row("SELECT 1 FROM image WHERE psha256=?1", [key], |_| Ok(()))
            .optional()?
            .is_some();
        if !exists {
            return Ok(false);
        }
        conn.execute(
            "UPDATE image SET ctime=?1 WHERE psha256=?2 AND CAST(ctime AS INTEGER) < ?3",
            params![now.to_string(), key, now - 60_000],
        )?;
        let changed = conn.execute("UPDATE image SET kind=?1 WHERE psha256=?2 AND kind<>?1", params![kind, key])?;
        drop(conn);
        if changed > 0 {
            self.bump();
        }
        Ok(true)
    }

    pub fn cache_rows(&self) -> ApiResult<Vec<CacheRow>> {
        let conn = self.lock();
        let mut stmt = conn.prepare("SELECT psha256, ext, ctime, kind FROM image")?;
        let rows = stmt
            .query_map([], |r| {
                let ctime: Option<String> = r.get(2)?;
                Ok(CacheRow {
                    key: r.get(0)?,
                    ext: r.get::<_, Option<String>>(1)?.unwrap_or_default(),
                    access: ctime.and_then(|c| c.parse().ok()).unwrap_or(0),
                    kind: r.get(3)?,
                })
            })?
            .collect::<Result<Vec<_>, _>>()?;
        Ok(rows)
    }

    pub fn cache_count(&self) -> ApiResult<i64> {
        Ok(self.lock().query_row("SELECT COUNT(*) FROM image", [], |r| r.get(0))?)
    }

    pub fn delete_cache(&self, key: &str) -> ApiResult<()> {
        self.lock().execute("DELETE FROM image WHERE psha256=?1", [key])?;
        self.bump();
        Ok(())
    }

    /// Remove all cache records but keep tables and admin history.
    pub fn reset_cache(&self) -> ApiResult<()> {
        self.lock().execute("DELETE FROM image", [])?;
        self.bump();
        Ok(())
    }

    pub fn insert_audit(&self, action: &str, actor: &str, target: &str, result: &str, details: &Value) -> ApiResult<()> {
        let conn = self.lock();
        let target: String = target.chars().take(200).collect();
        conn.execute(
            "INSERT INTO admin_audit(created_at,action,actor,target,result,details) VALUES(?1,?2,?3,?4,?5,?6)",
            params![now_ms(), action, actor, target, result, details.to_string()],
        )?;
        conn.execute("DELETE FROM admin_audit WHERE id <= (SELECT MAX(id)-5000 FROM admin_audit)", [])?;
        Ok(())
    }

    pub fn persist_job(&self, id: &str, data: &Value) -> ApiResult<()> {
        let conn = self.lock();
        conn.execute(
            "INSERT INTO admin_jobs(id,data) VALUES(?1,?2) ON CONFLICT(id) DO UPDATE SET data=excluded.data",
            params![id, data.to_string()],
        )?;
        conn.execute(
            "DELETE FROM admin_jobs WHERE seq NOT IN (SELECT seq FROM admin_jobs ORDER BY seq DESC LIMIT 100)",
            [],
        )?;
        Ok(())
    }

    pub fn job(&self, id: &str) -> ApiResult<Option<Value>> {
        let data: Option<String> = self
            .lock()
            .query_row("SELECT data FROM admin_jobs WHERE id=?1", [id], |r| r.get(0))
            .optional()?;
        Ok(data.and_then(|d| serde_json::from_str(&d).ok()))
    }

    /// Finish time of the latest succeeded cache maintenance job (survives restarts).
    pub fn last_cleanup_at(&self) -> ApiResult<Option<i64>> {
        Ok(self.lock().query_row(
            "SELECT MAX(json_extract(data,'$.finishedAt')) FROM admin_jobs
             WHERE json_extract(data,'$.status')='succeeded' AND json_extract(data,'$.type') LIKE 'cache.%'",
            [],
            |r| r.get::<_, Option<i64>>(0),
        )?)
    }

    /// Mark jobs left queued/running by a previous process as interrupted.
    pub fn interrupt_unfinished(&self) -> ApiResult<usize> {
        let rows: Vec<(i64, String)> = {
            let conn = self.lock();
            let mut stmt = conn.prepare("SELECT seq, data FROM admin_jobs")?;
            let rows = stmt.query_map([], |r| Ok((r.get(0)?, r.get(1)?)))?.collect::<Result<Vec<_>, _>>()?;
            rows
        };
        let mut count = 0;
        for (seq, data) in rows {
            let Ok(mut job) = serde_json::from_str::<Value>(&data) else {
                continue;
            };
            let status = job.get("status").and_then(Value::as_str).unwrap_or("");
            if status == "queued" || status == "running" {
                job["status"] = "interrupted".into();
                job["finishedAt"] = now_ms().into();
                job["error"] = "服务器重启，任务中断；请检查缓存后重新维护".into();
                self.lock()
                    .execute("UPDATE admin_jobs SET data=?1 WHERE seq=?2", params![job.to_string(), seq])?;
                count += 1;
            }
        }
        Ok(count)
    }

    /// Keyset page, newest first. Returns (rows, nextBefore).
    pub fn jobs_page(&self, before: i64, limit: i64) -> ApiResult<(Vec<Value>, Option<i64>)> {
        let conn = self.lock();
        let mut stmt = conn.prepare("SELECT seq, data FROM admin_jobs WHERE seq < ?1 ORDER BY seq DESC LIMIT ?2")?;
        let rows: Vec<(i64, String)> = stmt
            .query_map(params![before, limit + 1], |r| Ok((r.get(0)?, r.get(1)?)))?
            .collect::<Result<_, _>>()?;
        let more = rows.len() as i64 > limit;
        let page: Vec<(i64, String)> = rows.into_iter().take(limit as usize).collect();
        let next = if more { page.last().map(|r| r.0) } else { None };
        Ok((page.into_iter().filter_map(|(_, d)| serde_json::from_str(&d).ok()).collect(), next))
    }

    pub fn audit_page(&self, before: i64, limit: i64) -> ApiResult<(Vec<Value>, Option<i64>)> {
        let conn = self.lock();
        let mut stmt = conn.prepare(
            "SELECT id, created_at, action, actor, target, result, details FROM admin_audit WHERE id < ?1 ORDER BY id DESC LIMIT ?2",
        )?;
        let rows: Vec<Value> = stmt
            .query_map(params![before, limit + 1], |r| {
                let details: String = r.get(6)?;
                Ok(serde_json::json!({
                    "id": r.get::<_, i64>(0)?,
                    "createdAt": r.get::<_, i64>(1)?,
                    "action": r.get::<_, String>(2)?,
                    "actor": r.get::<_, String>(3)?,
                    "target": r.get::<_, String>(4)?,
                    "result": r.get::<_, String>(5)?,
                    "details": serde_json::from_str::<Value>(&details).unwrap_or(Value::Null),
                }))
            })?
            .collect::<Result<_, _>>()?;
        let more = rows.len() as i64 > limit;
        let page: Vec<Value> = rows.into_iter().take(limit as usize).collect();
        let next = if more { page.last().and_then(|r| r["id"].as_i64()) } else { None };
        Ok((page, next))
    }

    pub fn file_sizes(&self) -> (u64, u64, u64) {
        let size = |suffix: &str| {
            std::fs::metadata(format!("{}{suffix}", self.path.display()))
                .map(|m| m.len())
                .unwrap_or(0)
        };
        (size(""), size("-wal"), size("-shm"))
    }
}

pub fn map_err(e: rusqlite::Error) -> ApiError {
    ApiError::database(e)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn migration_preserves_legacy_rows() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("imgCache.db");
        {
            let conn = Connection::open(&path).unwrap();
            conn.execute_batch(
                "CREATE TABLE image (psha256 TEXT PRIMARY KEY, ext TEXT, ctime TEXT);
                 INSERT INTO image VALUES ('aa', '.jpg', '1000');",
            )
            .unwrap();
        }
        let db = Db::open(&path).unwrap();
        let rows = db.cache_rows().unwrap();
        assert_eq!(rows.len(), 1);
        assert_eq!(rows[0].kind, "legacy");
        assert_eq!(rows[0].access, 1000);
        drop(db);
        // Reopening is idempotent.
        let db = Db::open(&path).unwrap();
        assert_eq!(db.cache_count().unwrap(), 1);
    }

    #[test]
    fn jobs_interrupt_and_page() {
        let dir = tempfile::tempdir().unwrap();
        let db = Db::open(&dir.path().join("x.db")).unwrap();
        for i in 0..3 {
            db.persist_job(&format!("j{i}"), &serde_json::json!({"id": format!("j{i}"), "status": "running"}))
                .unwrap();
        }
        assert_eq!(db.interrupt_unfinished().unwrap(), 3);
        let (jobs, next) = db.jobs_page(i64::MAX, 2).unwrap();
        assert_eq!(jobs.len(), 2);
        assert_eq!(jobs[0]["status"], "interrupted");
        let (rest, none) = db.jobs_page(next.unwrap(), 2).unwrap();
        assert_eq!(rest.len(), 1);
        assert!(none.is_none());
    }
}
