//! Identities: file/admin long-lived credentials, in-memory HttpOnly sessions,
//! read-only media tickets and per-IP login throttling. Restart clears sessions.

use crate::db::now_ms;
use axum::http::HeaderMap;
use sha2::{Digest, Sha256};
use std::collections::HashMap;
use std::net::IpAddr;
use std::sync::Mutex;

pub const SESSION_MS: i64 = 8 * 60 * 60 * 1000;
pub const TICKET_MS: i64 = 60 * 60 * 1000;
pub const ATTEMPT_WINDOW_MS: i64 = 15 * 60 * 1000;
pub const MAX_ATTEMPTS: u32 = 10;
const MAX_ENTRIES: usize = 2048;
/// File-role session cookie (legacy name).
pub const FILE_COOKIE: &str = "fs_session";
/// Admin-role session cookie, separate so a later file login cannot displace it.
pub const ADMIN_COOKIE: &str = "fs_admin_session";

pub fn cookie_name(role: Role) -> &'static str {
    match role {
        Role::File => FILE_COOKIE,
        Role::Admin => ADMIN_COOKIE,
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Role {
    File,
    Admin,
}

impl Role {
    pub fn as_str(self) -> &'static str {
        match self {
            Role::File => "file",
            Role::Admin => "admin",
        }
    }
}

#[derive(Debug, Clone)]
pub struct Session {
    pub role: Role,
    pub created_at: i64,
    pub last_seen_at: i64,
    pub expires_at: i64,
    pub session_id: String,
    pub ip: String,
}

#[derive(Debug, Clone)]
pub struct Identity {
    pub role: Role,
    /// Public, non-credential identifier (None for header tokens).
    pub session_id: Option<String>,
    pub expires_at: Option<i64>,
    /// Raw bearer/cookie token, internal only.
    pub(crate) token: Option<String>,
    pub source: Option<TokenSource>,
}

impl Identity {
    pub fn actor(&self) -> String {
        format!("{}:{}", self.role.as_str(), self.session_id.as_deref().unwrap_or("token"))
    }
}

struct Ticket {
    session_token: String,
    expires_at: i64,
}

#[derive(Default)]
struct Inner {
    sessions: HashMap<String, Session>,
    tickets: HashMap<String, Ticket>,
    attempts: HashMap<IpAddr, (u32, i64)>,
}

pub struct Auth {
    inner: Mutex<Inner>,
}

pub enum LoginError {
    RateLimited { first: bool },
    Invalid,
}

pub struct LoginOk {
    pub session_token: String,
    pub read_ticket: String,
    pub role: Role,
    pub expires_at: i64,
    pub ticket_expires_at: i64,
    pub session_id: String,
}

/// Constant-time comparison of SHA-256 digests; short expected values never match.
pub fn equal_token(provided: &str, expected: &str) -> bool {
    if expected.chars().count() < 16 {
        return false;
    }
    let a = Sha256::digest(provided.as_bytes());
    let b = Sha256::digest(expected.as_bytes());
    a.iter().zip(b.iter()).fold(0u8, |acc, (x, y)| acc | (x ^ y)) == 0
}

pub fn random_hex(bytes: usize) -> String {
    use rand::RngCore;
    let mut buf = vec![0u8; bytes];
    rand::rng().fill_bytes(&mut buf);
    hex::encode(buf)
}

fn header<'a>(headers: &'a HeaderMap, name: &str) -> Option<&'a str> {
    headers.get(name).and_then(|v| v.to_str().ok())
}

/// Where a session token was presented.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TokenSource {
    Bearer,
    Cookie(Role),
}

fn cookie_value(headers: &HeaderMap, name: &str) -> Option<String> {
    for value in headers.get_all("cookie") {
        let Ok(text) = value.to_str() else { continue };
        for part in text.split(';') {
            if let Some((k, v)) = part.trim().split_once('=') {
                if k == name && !v.is_empty() {
                    return Some(v.to_string());
                }
            }
        }
    }
    None
}

/// Candidate session tokens in priority order: Bearer, admin cookie, file cookie.
pub fn session_tokens(headers: &HeaderMap) -> Vec<(TokenSource, String)> {
    let mut out = Vec::new();
    if let Some(bearer) = header(headers, "authorization").and_then(|h| h.strip_prefix("Bearer ")) {
        if !bearer.trim().is_empty() {
            out.push((TokenSource::Bearer, bearer.trim().to_string()));
        }
    }
    if let Some(v) = cookie_value(headers, ADMIN_COOKIE) {
        out.push((TokenSource::Cookie(Role::Admin), v));
    }
    if let Some(v) = cookie_value(headers, FILE_COOKIE) {
        out.push((TokenSource::Cookie(Role::File), v));
    }
    out
}

fn prune<V>(map: &mut HashMap<String, V>, expiry: impl Fn(&V) -> i64) {
    let now = now_ms();
    map.retain(|_, v| expiry(v) > now);
    if map.len() > MAX_ENTRIES {
        let mut keys: Vec<(String, i64)> = map.iter().map(|(k, v)| (k.clone(), expiry(v))).collect();
        keys.sort_by_key(|k| k.1);
        for (k, _) in keys.into_iter().take(map.len() - MAX_ENTRIES) {
            map.remove(&k);
        }
    }
}

impl Default for Auth {
    fn default() -> Self {
        Self::new()
    }
}

impl Auth {
    pub fn new() -> Self {
        Self {
            inner: Mutex::new(Inner::default()),
        }
    }

    fn lock(&self) -> std::sync::MutexGuard<'_, Inner> {
        self.inner.lock().unwrap_or_else(|p| p.into_inner())
    }

    /// Resolve the caller's credentials (tickets are not credentials).
    pub fn identify(&self, headers: &HeaderMap, access_token: &str, admin_token: &str) -> Option<Identity> {
        for (source, token) in session_tokens(headers) {
            let mut inner = self.lock();
            if let Some(session) = inner.sessions.get_mut(&token) {
                // A role cookie only carries a session of that role.
                let role_ok = match source {
                    TokenSource::Cookie(role) => role == session.role,
                    TokenSource::Bearer => true,
                };
                if session.expires_at > now_ms() && role_ok {
                    session.last_seen_at = now_ms();
                    return Some(Identity {
                        role: session.role,
                        session_id: Some(session.session_id.clone()),
                        expires_at: Some(session.expires_at),
                        token: Some(token),
                        source: Some(source),
                    });
                }
            }
            if matches!(source, TokenSource::Bearer) {
                if equal_token(&token, admin_token) {
                    return Some(Identity {
                        role: Role::Admin,
                        session_id: None,
                        expires_at: None,
                        token: Some(token),
                        source: Some(TokenSource::Bearer),
                    });
                }
                if equal_token(&token, access_token) {
                    return Some(Identity {
                        role: Role::File,
                        session_id: None,
                        expires_at: None,
                        token: Some(token),
                        source: Some(TokenSource::Bearer),
                    });
                }
            }
        }
        if header(headers, "x-admin-token").is_some_and(|t| equal_token(t, admin_token)) {
            return Some(Identity {
                role: Role::Admin,
                session_id: None,
                expires_at: None,
                token: None,
                source: None,
            });
        }
        if header(headers, "x-file-token").is_some_and(|t| equal_token(t, access_token)) {
            return Some(Identity {
                role: Role::File,
                session_id: None,
                expires_at: None,
                token: None,
                source: None,
            });
        }
        None
    }

    /// Whether a still-valid ticket bound to a still-valid session or long-lived token is presented.
    pub fn ticket_valid(&self, ticket: &str, access_token: &str, admin_token: &str) -> bool {
        let inner = self.lock();
        let now = now_ms();
        match inner.tickets.get(ticket) {
            Some(t) if t.expires_at > now => {
                equal_token(&t.session_token, access_token)
                    || equal_token(&t.session_token, admin_token)
                    || inner.sessions.get(&t.session_token).is_some_and(|s| s.expires_at > now)
            }
            _ => false,
        }
    }

    pub fn login(&self, token: &str, ip: IpAddr, access_token: &str, admin_token: &str) -> Result<LoginOk, LoginError> {
        let mut inner = self.lock();
        let now = now_ms();
        inner.attempts.retain(|_, (_, exp)| *exp > now);
        let entry = inner.attempts.entry(ip).or_insert((0, now + ATTEMPT_WINDOW_MS));
        entry.0 += 1;
        if entry.0 > MAX_ATTEMPTS {
            return Err(LoginError::RateLimited {
                first: entry.0 == MAX_ATTEMPTS + 1,
            });
        }
        let role = if equal_token(token, admin_token) {
            Role::Admin
        } else if equal_token(token, access_token) {
            Role::File
        } else {
            return Err(LoginError::Invalid);
        };
        inner.attempts.remove(&ip);
        if inner.attempts.len() > MAX_ENTRIES {
            inner.attempts.clear();
        }
        prune(&mut inner.sessions, |s| s.expires_at);
        prune(&mut inner.tickets, |t| t.expires_at);
        let session_token = random_hex(32);
        let read_ticket = random_hex(32);
        let session_id = random_hex(12);
        inner.sessions.insert(
            session_token.clone(),
            Session {
                role,
                created_at: now,
                last_seen_at: now,
                expires_at: now + SESSION_MS,
                session_id: session_id.clone(),
                ip: ip.to_string(),
            },
        );
        inner.tickets.insert(
            read_ticket.clone(),
            Ticket {
                session_token: session_token.clone(),
                expires_at: now + TICKET_MS,
            },
        );
        Ok(LoginOk {
            session_token,
            read_ticket,
            role,
            expires_at: now + SESSION_MS,
            ticket_expires_at: now + TICKET_MS,
            session_id,
        })
    }

    /// Issue a new read ticket bound to the caller's session. Header-token callers
    /// receive no ticket (they have no revocable session).
    pub fn renew(&self, identity: &Identity) -> Option<(String, i64)> {
        let token = identity.token.clone()?;
        let mut inner = self.lock();
        prune(&mut inner.tickets, |t| t.expires_at);
        let ticket = random_hex(32);
        let expires_at = now_ms() + TICKET_MS;
        inner.tickets.insert(
            ticket.clone(),
            Ticket {
                session_token: token,
                expires_at,
            },
        );
        Some((ticket, expires_at))
    }

    fn remove_session(inner: &mut Inner, token: &str) {
        inner.sessions.remove(token);
        inner.tickets.retain(|_, t| t.session_token != token);
    }

    pub fn logout(&self, identity: &Identity) {
        if let Some(token) = &identity.token {
            Self::remove_session(&mut self.lock(), token);
        }
    }

    pub fn list(&self, current: Option<&str>) -> Vec<serde_json::Value> {
        let mut inner = self.lock();
        prune(&mut inner.sessions, |s| s.expires_at);
        let mut list: Vec<&Session> = inner.sessions.values().collect();
        list.sort_by_key(|s| std::cmp::Reverse(s.created_at));
        list.into_iter()
            .map(|s| {
                serde_json::json!({
                    "id": s.session_id, "role": s.role.as_str(), "createdAt": s.created_at,
                    "lastSeenAt": s.last_seen_at, "expiresAt": s.expires_at,
                    "current": Some(s.session_id.as_str()) == current, "ip": s.ip,
                })
            })
            .collect()
    }

    /// Role of a live session by public ID.
    pub fn role_of(&self, id: &str) -> Option<Role> {
        self.lock().sessions.values().find(|s| s.session_id == id).map(|s| s.role)
    }

    /// Revoke by public ID. Returns true when found.
    pub fn revoke(&self, id: &str) -> bool {
        let mut inner = self.lock();
        let token = inner.sessions.iter().find(|(_, s)| s.session_id == id).map(|(k, _)| k.clone());
        match token {
            Some(token) => {
                Self::remove_session(&mut inner, &token);
                true
            }
            None => false,
        }
    }

    pub fn clear(&self) {
        let mut inner = self.lock();
        inner.sessions.clear();
        inner.tickets.clear();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::http::HeaderValue;

    const A: &str = "file-token-0123456789";
    const B: &str = "admin-token-0123456789";

    #[test]
    fn sessions_tickets_and_throttle() {
        let auth = Auth::new();
        let ip: IpAddr = "127.0.0.1".parse().unwrap();
        let ok = auth.login(A, ip, A, B).ok().unwrap();
        assert_eq!(ok.role, Role::File);
        let mut headers = HeaderMap::new();
        headers.insert(
            "cookie",
            HeaderValue::from_str(&format!("x=1; fs_session={}", ok.session_token)).unwrap(),
        );
        // A file session presented in the admin cookie slot is not accepted.
        let mut wrong = HeaderMap::new();
        wrong.insert(
            "cookie",
            HeaderValue::from_str(&format!("fs_admin_session={}", ok.session_token)).unwrap(),
        );
        assert!(auth.identify(&wrong, A, B).is_none());
        let id = auth.identify(&headers, A, B).unwrap();
        assert_eq!(id.role, Role::File);
        assert!(auth.ticket_valid(&ok.read_ticket, A, B));
        assert!(!auth.ticket_valid("nope", A, B));
        let (renewed, _) = auth.renew(&id).unwrap();
        auth.logout(&id);
        assert!(!auth.ticket_valid(&ok.read_ticket, A, B));
        assert!(!auth.ticket_valid(&renewed, A, B));
        assert!(auth.identify(&headers, A, B).is_none());
        for _ in 0..10 {
            assert!(matches!(auth.login("bad", ip, A, B), Err(LoginError::Invalid)));
        }
        assert!(matches!(auth.login(B, ip, A, B), Err(LoginError::RateLimited { first: true })));
    }

    #[test]
    fn separate_role_cookies_coexist() {
        let auth = Auth::new();
        let ip: IpAddr = "127.0.0.2".parse().unwrap();
        let admin = auth.login(B, ip, A, B).ok().unwrap();
        let file = auth.login(A, ip, A, B).ok().unwrap();
        let mut headers = HeaderMap::new();
        headers.insert(
            "cookie",
            HeaderValue::from_str(&format!(
                "fs_session={}; fs_admin_session={}",
                file.session_token, admin.session_token
            ))
            .unwrap(),
        );
        let id = auth.identify(&headers, A, B).unwrap();
        assert_eq!(id.role, Role::Admin);
        auth.logout(&id);
        assert_eq!(auth.identify(&headers, A, B).unwrap().role, Role::File);
    }

    #[test]
    fn header_tokens_and_weak_expected() {
        let auth = Auth::new();
        let mut headers = HeaderMap::new();
        headers.insert("x-admin-token", HeaderValue::from_static("admin-token-0123456789"));
        assert_eq!(auth.identify(&headers, A, B).unwrap().role, Role::Admin);
        assert!(!equal_token("short", "short"));
        let mut headers = HeaderMap::new();
        headers.insert("x-admin-token", HeaderValue::from_static("file-token-0123456789"));
        assert!(auth.identify(&headers, A, B).is_none());
    }

    #[test]
    fn bearer_long_lived_tokens() {
        let auth = Auth::new();

        // Bearer with file access token
        let mut headers = HeaderMap::new();
        headers.insert("authorization", HeaderValue::from_str(&format!("Bearer {A}")).unwrap());
        let id = auth.identify(&headers, A, B).unwrap();
        assert_eq!(id.role, Role::File);
        assert_eq!(id.token.as_deref(), Some(A));

        // Able to renew ticket with permanent Bearer token
        let (ticket, _) = auth.renew(&id).unwrap();
        assert!(auth.ticket_valid(&ticket, A, B));

        // Bearer with admin token
        let mut headers = HeaderMap::new();
        headers.insert("authorization", HeaderValue::from_str(&format!("Bearer {B}")).unwrap());
        assert_eq!(auth.identify(&headers, A, B).unwrap().role, Role::Admin);

        // Bearer with invalid token
        let mut headers = HeaderMap::new();
        headers.insert("authorization", HeaderValue::from_static("Bearer wrong-token-123456789"));
        assert!(auth.identify(&headers, A, B).is_none());
    }
}
