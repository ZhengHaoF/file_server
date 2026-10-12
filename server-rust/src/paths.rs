//! Path boundary, symlink policy, filename normalisation and no-overwrite publication.

use crate::error::{ApiError, ApiResult};
use std::hash::{Hash, Hasher};
use std::path::{Component, Path, PathBuf};
use std::sync::{Arc, LazyLock};

/// Component-wise containment (`parent` itself counts). Never a string prefix test.
pub fn is_within(child: &Path, parent: &Path) -> bool {
    let child = crate::config::normalize_lexical(child);
    let parent = crate::config::normalize_lexical(parent);
    child.starts_with(&parent)
}

/// Split a client path (raw, already URL-decoded) into validated segments.
pub fn plan(input: &str) -> ApiResult<Vec<String>> {
    let b = input.as_bytes();
    if input.contains('\0') || input.contains('\\') || (b.len() >= 2 && b[0].is_ascii_alphabetic() && b[1] == b':') {
        return Err(ApiError::bad_request("非法文件路径"));
    }
    let segments: Vec<String> = input.split('/').filter(|s| !s.is_empty()).map(str::to_string).collect();
    for segment in &segments {
        if segment == ".." || segment.starts_with('.') {
            return Err(ApiError::new(403, "不允许访问隐藏文件、临时文件或上级目录"));
        }
        if cfg!(windows) && segment.contains(':') {
            return Err(ApiError::bad_request("非法文件路径"));
        }
    }
    Ok(segments)
}

#[derive(Debug, Clone, Copy)]
pub struct Resolve {
    pub allow_root: bool,
    pub must_exist: bool,
}

pub const EXISTING: Resolve = Resolve {
    allow_root: true,
    must_exist: true,
};
pub const EXISTING_ITEM: Resolve = Resolve {
    allow_root: false,
    must_exist: true,
};
pub const NEW_ITEM: Resolve = Resolve {
    allow_root: false,
    must_exist: false,
};

/// Resolve inside `root`, refusing symlinks/junctions at every component.
/// Assumes other local processes do not swap directories during an operation.
pub async fn resolve_safe(root: &Path, input: &str, opts: Resolve) -> ApiResult<PathBuf> {
    let segments = plan(input)?;
    if segments.is_empty() && !opts.allow_root {
        return Err(ApiError::new(403, "不允许操作共享根目录或访问目录外的文件"));
    }
    let mut current = root.to_path_buf();
    let last = segments.len().saturating_sub(1);
    for (index, segment) in segments.iter().enumerate() {
        current.push(segment);
        // A pushed segment must remain a single normal component.
        if !matches!(Path::new(segment).components().next(), Some(Component::Normal(_))) || Path::new(segment).components().count() != 1 {
            return Err(ApiError::bad_request("非法文件路径"));
        }
        match tokio::fs::symlink_metadata(&current).await {
            Ok(meta) => {
                if meta.file_type().is_symlink() || is_reparse_point(&meta) {
                    return Err(ApiError::new(403, "不允许访问软链接或目录联接"));
                }
                if index < last && !meta.is_dir() {
                    return Err(ApiError::bad_request("父路径不是目录"));
                }
            }
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => {
                if !opts.must_exist && index == last {
                    break;
                }
                return Err(ApiError::new(404, "文件或文件夹不存在"));
            }
            Err(e) if e.kind() == std::io::ErrorKind::NotADirectory => {
                return Err(ApiError::bad_request("父路径不是目录"));
            }
            Err(e) => return Err(ApiError::io("path.resolve", &e)),
        }
    }
    if !is_within(&current, root) {
        return Err(ApiError::new(403, "不允许操作共享根目录或访问目录外的文件"));
    }
    Ok(current)
}

#[cfg(windows)]
pub fn is_reparse_point(meta: &std::fs::Metadata) -> bool {
    use std::os::windows::fs::MetadataExt;
    meta.file_attributes() & 0x400 != 0
}
#[cfg(not(windows))]
pub fn is_reparse_point(_: &std::fs::Metadata) -> bool {
    false
}

pub const BLOCKED_EXTENSIONS: &[&str] = &[".html", ".htm", ".xhtml", ".shtml", ".js", ".mjs", ".mhtml", ".svg", ".xml"];

/// Node `path.extname` semantics: last dot, not leading.
pub fn extname(name: &str) -> &str {
    match name.rfind('.') {
        Some(0) | None => "",
        Some(i) => &name[i..],
    }
}

pub fn blocked_extension(name: &str) -> bool {
    let ext = extname(name).to_lowercase();
    BLOCKED_EXTENSIONS.contains(&ext.as_str())
}

/// Recover UTF-8 names that arrived as latin1-decoded bytes, keep only the basename,
/// replace reserved characters and refuse reserved/hidden/active-content names.
pub fn fix_upload_filename(name: &str) -> ApiResult<String> {
    if name.is_empty() {
        return Err(ApiError::bad_request("缺少文件名"));
    }
    let mut fixed = name.to_string();
    if fixed.chars().all(|c| (c as u32) <= 0xff) && fixed.chars().any(|c| (c as u32) >= 0x80) {
        let bytes: Vec<u8> = fixed.chars().map(|c| c as u32 as u8).collect();
        if let Ok(converted) = String::from_utf8(bytes) {
            if converted.chars().any(|c| (c as u32) > 0xff) {
                fixed = converted;
            }
        }
    }
    let base = fixed.rsplit(['/', '\\']).next().unwrap_or("").to_string();
    let replaced: String = base
        .chars()
        .map(|c| if "<>:\"/\\|?*".contains(c) || (c as u32) < 0x20 { '_' } else { c })
        .collect();
    let trimmed = replaced.trim_end_matches(['.', ' ']).to_string();
    let lower = trimmed.to_lowercase();
    let stem = lower.split('.').next().unwrap_or("");
    let reserved = matches!(stem, "con" | "prn" | "aux" | "nul")
        || (stem.len() == 4 && (stem.starts_with("com") || stem.starts_with("lpt")) && matches!(stem.as_bytes()[3], b'1'..=b'9'));
    if trimmed.is_empty() || trimmed.starts_with('.') || reserved || trimmed.len() > 240 {
        return Err(ApiError::bad_request("不支持该文件名"));
    }
    if blocked_extension(&trimmed) {
        return Err(ApiError::bad_request("该类型文件不允许上传或重命名为此类型"));
    }
    Ok(trimmed)
}

/// Atomic no-replace publication on the same filesystem: link then unlink.
/// Never falls back to `rename`, which could overwrite a concurrently created file.
pub async fn publish_file(temp: &Path, target: &Path) -> ApiResult<()> {
    match tokio::fs::hard_link(temp, target).await {
        Ok(()) => {}
        Err(e) if e.kind() == std::io::ErrorKind::AlreadyExists => {
            return Err(ApiError::new(409, "目标文件已存在"));
        }
        Err(e) => {
            crate::logging::error("files", &format!("安全发布失败（文件系统可能不支持硬链接）: {e}"));
            return Err(ApiError::new(500, "目标文件系统不支持安全发布").code("PUBLISH_UNSUPPORTED"));
        }
    }
    if let Err(e) = tokio::fs::remove_file(temp).await {
        crate::logging::warn("files", &format!("发布后临时名称移除失败: {e}"));
    }
    Ok(())
}

/// Striped in-process destination locks (bounded, never leak entries).
pub struct DestinationLocks {
    stripes: Vec<Arc<tokio::sync::Mutex<()>>>,
}

impl Default for DestinationLocks {
    fn default() -> Self {
        Self {
            stripes: (0..64).map(|_| Arc::new(tokio::sync::Mutex::new(()))).collect(),
        }
    }
}

impl DestinationLocks {
    pub async fn lock(&self, path: &Path) -> tokio::sync::OwnedMutexGuard<()> {
        let mut hasher = std::collections::hash_map::DefaultHasher::new();
        path.hash(&mut hasher);
        let stripe = (hasher.finish() % self.stripes.len() as u64) as usize;
        self.stripes[stripe].clone().lock_owned().await
    }
}

pub static LOCKS: LazyLock<DestinationLocks> = LazyLock::new(DestinationLocks::default);

/// Relative display path for audit/log records.
pub fn relative(root: &Path, path: &Path) -> String {
    path.strip_prefix(root)
        .map(|p| p.to_string_lossy().replace('\\', "/"))
        .unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn boundaries_and_symlinks() {
        let dir = tempfile::tempdir().unwrap();
        let base = dir.path().canonicalize().unwrap();
        let root = base.join("share");
        std::fs::create_dir_all(root.join("a")).unwrap();
        std::fs::create_dir_all(base.join("share-sibling")).unwrap();
        std::fs::write(root.join("a/f.txt"), "x").unwrap();
        assert!(resolve_safe(&root, "a/f.txt", EXISTING).await.is_ok());
        assert_eq!(resolve_safe(&root, "../share-sibling", EXISTING).await.unwrap_err().status, 403);
        assert_eq!(resolve_safe(&root, "a/../../x", EXISTING).await.unwrap_err().status, 403);
        assert_eq!(resolve_safe(&root, "C:/Windows", EXISTING).await.unwrap_err().status, 400);
        assert_eq!(resolve_safe(&root, "a\\f.txt", EXISTING).await.unwrap_err().status, 400);
        assert_eq!(resolve_safe(&root, ".hidden", EXISTING).await.unwrap_err().status, 403);
        assert_eq!(resolve_safe(&root, "", EXISTING_ITEM).await.unwrap_err().status, 403);
        assert_eq!(resolve_safe(&root, "missing", EXISTING).await.unwrap_err().status, 404);
        assert!(resolve_safe(&root, "a/new", NEW_ITEM).await.is_ok());
        assert_eq!(resolve_safe(&root, "a/f.txt/x", NEW_ITEM).await.unwrap_err().status, 400);
        assert_eq!(resolve_safe(&root, "missing/x", NEW_ITEM).await.unwrap_err().status, 404);
        #[cfg(unix)]
        {
            std::os::unix::fs::symlink(base.join("share-sibling"), root.join("link")).unwrap();
            assert_eq!(resolve_safe(&root, "link", EXISTING).await.unwrap_err().status, 403);
            assert_eq!(resolve_safe(&root, "link/x", NEW_ITEM).await.unwrap_err().status, 403);
        }
        assert!(!is_within(&base.join("share-sibling"), &root));
        assert!(is_within(&root.join("a"), &root));
    }

    #[test]
    fn filenames() {
        assert_eq!(fix_upload_filename("a:b?.txt").unwrap(), "a_b_.txt");
        assert_eq!(fix_upload_filename("dir\\evil.txt").unwrap(), "evil.txt");
        assert_eq!(fix_upload_filename("../x.txt").unwrap(), "x.txt");
        // "中文.txt" decoded as latin1 by a legacy client
        let mangled: String = "中文.txt".as_bytes().iter().map(|b| *b as char).collect();
        assert_eq!(fix_upload_filename(&mangled).unwrap(), "中文.txt");
        assert_eq!(fix_upload_filename("café.txt").unwrap(), "café.txt");
        for bad in ["page.html", "x.SVG", "a.js.", "CON", "com1.txt", ".env", "...", "a.html  "] {
            assert!(fix_upload_filename(bad).is_err(), "{bad}");
        }
        assert!(fix_upload_filename(&"a".repeat(241)).is_err());
        assert_eq!(extname(".bashrc"), "");
        assert_eq!(extname("a.tar.gz"), ".gz");
    }

    #[tokio::test]
    async fn publish_never_overwrites() {
        let dir = tempfile::tempdir().unwrap();
        let temp = dir.path().join(".fsupload-1");
        std::fs::write(&temp, "new").unwrap();
        std::fs::write(dir.path().join("t.txt"), "old").unwrap();
        assert_eq!(publish_file(&temp, &dir.path().join("t.txt")).await.unwrap_err().status, 409);
        assert_eq!(std::fs::read_to_string(dir.path().join("t.txt")).unwrap(), "old");
        publish_file(&temp, &dir.path().join("u.txt")).await.unwrap();
        assert!(!temp.exists());
    }
}
