mod common;

use common::*;
use futures::StreamExt;
use serde_json::{json, Value};

fn search_url(s: &Server, q: &str) -> String {
    reqwest::Url::parse_with_params(&format!("{}/api/v2/search", s.url), &[("q", q)])
        .unwrap()
        .to_string()
}

/// `Server::get` prepends `s.url` itself, so it only accepts a path. These
/// helpers take an already absolute URL and attach the bearer token directly.
fn get_search(s: &Server, url: &str, token: &str) -> reqwest::RequestBuilder {
    s.client.get(url).bearer_auth(token)
}

fn get_search_with_ticket(s: &Server, url: &str, ticket: &str) -> reqwest::RequestBuilder {
    s.client.get(format!("{url}&ticket={ticket}"))
}

use tokio::sync::Mutex;

/// Serializes the tests in this file: the server keeps a process-wide
/// `WALKS_ACTIVE` counter capped at `WALK_LIMIT`, and cargo runs the tests in
/// this binary on parallel threads. Must be async-aware: the guard is held
/// across `await` points, which clippy rejects for `std::sync::Mutex`.
static SEARCH_SLOTS: Mutex<()> = Mutex::const_new(());

async fn serial() -> tokio::sync::MutexGuard<'static, ()> {
    SEARCH_SLOTS.lock().await
}

/// Consume the NDJSON stream; returns (match lines, sentinel).
async fn search_lines(s: &Server, token: &str, q: &str) -> (Vec<Value>, Value) {
    let res = get_search(s, &search_url(s, q), token).send().await.unwrap();
    assert_eq!(res.status(), 200, "search {q}");
    assert!(res.headers()["content-type"].to_str().unwrap().starts_with("application/x-ndjson"));
    let mut bytes: Vec<u8> = Vec::new();
    let mut stream = res.bytes_stream();
    while let Some(chunk) = stream.next().await {
        bytes.extend_from_slice(&chunk.unwrap());
    }
    let text = String::from_utf8(bytes).unwrap();
    let mut lines = Vec::new();
    let mut sentinel = Value::Null;
    for line in text.lines() {
        if line.trim().is_empty() {
            continue;
        }
        let value: Value = serde_json::from_str(line).unwrap();
        if value.get("done").is_some() {
            sentinel = value;
        } else if value.get("tick").is_none() {
            lines.push(value);
        }
    }
    (lines, sentinel)
}

#[tokio::test]
async fn search_streams_matches_over_whole_share() {
    // `WALKS_ACTIVE` is process wide and `WALK_LIMIT` is 2, so search tests must
    // not overlap; without this lock cargo's parallel test threads make this flaky.
    let _serial = serial().await;
    let s = start(json!({})).await;
    let token = s.bearer(ACCESS).await;
    write(&s.files().join("docs/readme.txt"), b"hello");
    write(&s.files().join("docs/deep/nested/报告.pdf"), b"pdf");
    write(&s.files().join("music/song.mp3"), b"m");
    write(&s.files().join("$/literal.txt"), b"dollar");
    write(&s.files().join(".hidden/secret.txt"), b"s");
    for i in 0..5 {
        write(&s.files().join(format!("page/{i}.txt")), b"p");
    }
    let (lines, sentinel) = search_lines(&s, &token, "readme").await;
    assert_eq!(lines.len(), 1);
    assert_eq!(lines[0]["path"], "docs/readme.txt");
    assert_eq!(lines[0]["suffix"], ".txt");
    assert_eq!(sentinel["status"], "complete");
    assert_eq!(sentinel["count"], 1);
    let (lines, _) = search_lines(&s, &token, "报告").await;
    assert_eq!(lines.len(), 1);
    assert_eq!(lines[0]["path"], "docs/deep/nested/报告.pdf");
    let (lines, _) = search_lines(&s, &token, "literal").await;
    assert_eq!(lines.len(), 1);
    assert_eq!(lines[0]["path"], "$/literal.txt");
    let (lines, _) = search_lines(&s, &token, "secret").await;
    assert_eq!(lines.len(), 0, "hidden entries stay invisible");
    let (lines, sentinel) = search_lines(&s, &token, "txt").await;
    assert_eq!(lines.len(), 7); // readme + $/literal + page/0..4
    assert_eq!(sentinel["status"], "complete");
    for line in &lines {
        assert!(line["name"].is_string());
        assert!(line["path"].is_string());
        assert!(line["mtime"].is_string());
    }
    s.stop().await;
}

#[tokio::test]
async fn search_authentication_and_validation() {
    let _serial = serial().await;
    let s = start(json!({})).await;
    let (login, _cookie) = s.login(ACCESS).await;
    let token = login["sessionToken"].as_str().unwrap();
    let ticket = login["readTicket"].as_str().unwrap();
    // Anonymous rejected with a JSON error before the stream starts.
    let res = s.client.get(search_url(&s, "a")).send().await.unwrap();
    assert_eq!(res.status(), 401);
    assert_eq!(res.json::<Value>().await.unwrap()["code"], "AUTH_REQUIRED");
    // Read-only ticket works, like /api/v2/files.
    let res = get_search_with_ticket(&s, &search_url(&s, "a"), ticket).send().await.unwrap();
    assert_eq!(res.status(), 200);
    // Parameter validation (these two carry no query match, so no walk slot).
    assert_eq!(s.get("/api/v2/search", token).send().await.unwrap().status(), 400);
    assert_eq!(s.get("/api/v2/search?q=", token).send().await.unwrap().status(), 400);
    let long = "x".repeat(101);
    assert_eq!(
        s.get(&format!("/api/v2/search?q={long}"), token).send().await.unwrap().status(),
        400
    );
    s.stop().await;
}

#[tokio::test]
async fn search_caps_at_100_matches() {
    let _serial = serial().await;
    let s = start(json!({})).await;
    let token = s.bearer(ACCESS).await;
    for i in 0..150 {
        write(&s.files().join(format!("cap/f{i}.txt")), b"x");
    }
    let (lines, sentinel) = search_lines(&s, &token, "f").await;
    assert_eq!(lines.len(), 100);
    assert_eq!(sentinel["status"], "capped");
    assert_eq!(sentinel["count"], 100);
    s.stop().await;
}

#[cfg(unix)]
#[tokio::test]
async fn search_skips_symlinks_and_hidden_entries() {
    let _serial = serial().await;
    let s = start(json!({})).await;
    let token = s.bearer(ACCESS).await;
    let base = s.files();
    std::fs::create_dir_all(base.join("real")).unwrap();
    write(&base.join("real/target.txt"), b"t");
    let outside = s.base.join("outside");
    std::fs::create_dir_all(&outside).unwrap();
    write(&outside.join("secret.txt"), b"s");
    std::os::unix::fs::symlink(&outside, base.join("link")).unwrap();
    std::os::unix::fs::symlink(base.join("real/target.txt"), base.join("alias.txt")).unwrap();
    write(&base.join(".hidden.txt"), b"h");
    let (lines, _) = search_lines(&s, &token, "secret").await;
    assert_eq!(lines.len(), 0, "symlinked directories must not be traversed");
    let (lines, _) = search_lines(&s, &token, "target").await;
    assert_eq!(lines.len(), 1, "a symlinked file must not duplicate the real entry");
    assert_eq!(lines[0]["path"], "real/target.txt");
    let (lines, _) = search_lines(&s, &token, "hidden").await;
    assert_eq!(lines.len(), 0);
    s.stop().await;
}
