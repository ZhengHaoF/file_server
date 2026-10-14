mod common;

use common::*;
use futures::StreamExt;
use reqwest::multipart::{Form, Part};
use serde_json::{json, Value};
use std::time::Duration;

#[tokio::test]
async fn secure_defaults_and_auth() {
    let s = start(json!({})).await;
    write(&s.files().join("a.txt"), b"hello");
    assert_eq!(s.client.get(s.u("/health/live")).send().await.unwrap().status(), 200);
    assert_eq!(s.client.get(s.u("/health/ready")).send().await.unwrap().status(), 200);
    // Anonymous reads rejected by default.
    let res = s.client.get(s.u("/list/")).send().await.unwrap();
    assert_eq!(res.status(), 401);
    assert!(!header(res.headers(), "x-request-id").is_empty());
    assert_eq!(s.client.get(s.u("/getFile/a.txt")).send().await.unwrap().status(), 401);
    // Wrong token.
    let res = s
        .client
        .post(s.u("/api/auth/login"))
        .json(&json!({ "token": "nope" }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 401);
    let body: Value = res.json().await.unwrap();
    assert_eq!(body["code"], "INVALID_TOKEN");
    // JSON content type required.
    let res = s.client.post(s.u("/api/auth/login")).body(r#"{"token":"x"}"#).send().await.unwrap();
    assert!(res.status() == 415 || res.status() == 400);
    // Cross-origin state change rejected.
    let res = s
        .client
        .post(s.u("/api/auth/login"))
        .header("origin", "http://evil.example")
        .json(&json!({ "token": ACCESS }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 403);
    // File login: fs_session cookie, ticket, writes off by default.
    let (login, cookie) = s.login(ACCESS).await;
    assert!(cookie.starts_with("fs_session="));
    assert_eq!(login["role"], "file");
    assert_eq!(login["writeEnabled"], false);
    let token = login["sessionToken"].as_str().unwrap();
    let list: Value = s.get("/list/", token).send().await.unwrap().json().await.unwrap();
    assert_eq!(list["listNum"], 1);
    let ticket = login["readTicket"].as_str().unwrap();
    let res = s.client.get(s.u(&format!("/getFile/a.txt?ticket={ticket}"))).send().await.unwrap();
    assert_eq!(res.status(), 200);
    assert_eq!(res.text().await.unwrap(), "hello");
    let res = s.client.get(s.u("/list/")).header("cookie", &cookie).send().await.unwrap();
    assert_eq!(res.status(), 200);
    let res = s
        .post("/delFile", token)
        .json(&json!({ "filePath": "a.txt" }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 403);
    let form = Form::new()
        .text("destPath", "")
        .part("file", Part::bytes(b"x".to_vec()).file_name("b.txt"));
    assert_eq!(s.post("/upload", token).multipart(form).send().await.unwrap().status(), 403);
    // File role cannot use admin API.
    assert_eq!(s.get("/api/admin/status", token).send().await.unwrap().status(), 401);
    // Ticket renewal and logout.
    let res = s.post("/api/auth/ticket", token).send().await.unwrap();
    assert_eq!(res.status(), 200);
    assert_eq!(s.post("/api/auth/logout", token).send().await.unwrap().status(), 200);
    assert_eq!(s.get("/list/", token).send().await.unwrap().status(), 401);
    // Removed legacy endpoints.
    assert_eq!(
        s.client
            .post(s.u("/restartServer"))
            .json(&json!({ "pwd": "x" }))
            .send()
            .await
            .unwrap()
            .status(),
        410
    );
    assert_eq!(s.client.get(s.u("/api/nope")).send().await.unwrap().status(), 404);
    s.stop().await;
}

#[tokio::test]
async fn public_read_never_grants_write() {
    let s = start(json!({ "publicRead": true, "writeEnabled": true })).await;
    write(&s.files().join("a.txt"), b"hello");
    assert_eq!(s.client.get(s.u("/getFile/a.txt")).send().await.unwrap().status(), 200);
    let res = s
        .client
        .post(s.u("/delFile"))
        .json(&json!({ "filePath": "a.txt" }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 401);
    assert!(s.files().join("a.txt").exists());
    s.stop().await;
}

#[tokio::test]
async fn login_rate_limit() {
    let s = start(json!({})).await;
    let mut last = 0;
    for _ in 0..11 {
        last = s
            .client
            .post(s.u("/api/auth/login"))
            .json(&json!({ "token": "wrong" }))
            .send()
            .await
            .unwrap()
            .status()
            .as_u16();
    }
    assert_eq!(last, 429);
    s.stop().await;
}

#[tokio::test]
async fn separate_role_cookies_keep_admin_websocket() {
    let s = start(json!({})).await;
    let (_, admin_cookie) = s.login(ADMIN).await;
    let (_, file_cookie) = s.login(ACCESS).await;
    assert!(admin_cookie.starts_with("fs_admin_session="));
    assert!(file_cookie.starts_with("fs_session="));
    let jar = format!("{admin_cookie}; {file_cookie}");
    // The later file login did not displace the admin session.
    let res = s.client.get(s.u("/api/admin/status")).header("cookie", &jar).send().await.unwrap();
    assert_eq!(res.status(), 200);
    // WebSocket authenticates from the admin cookie.
    let ws_url = s.url.replace("http://", "ws://") + "/api/admin/logs/stream";
    let mut request = tokio_tungstenite::tungstenite::client::IntoClientRequest::into_client_request(ws_url.as_str()).unwrap();
    request.headers_mut().insert("cookie", jar.parse().unwrap());
    let (mut socket, _) = tokio_tungstenite::connect_async(request).await.expect("ws connect");
    tokio::time::sleep(Duration::from_millis(200)).await;
    file_server::logging::info("test", "websocket-probe-message");
    let mut seen = false;
    let deadline = tokio::time::Instant::now() + Duration::from_secs(5);
    while tokio::time::Instant::now() < deadline {
        match tokio::time::timeout(Duration::from_secs(5), socket.next()).await {
            Ok(Some(Ok(tokio_tungstenite::tungstenite::Message::Text(text)))) => {
                let entry: Value = serde_json::from_str(&text).unwrap();
                assert!(entry["id"].as_str().is_some_and(|i| i.len() == 24));
                if entry["message"].as_str().is_some_and(|m| m.contains("websocket-probe-message")) {
                    seen = true;
                    break;
                }
            }
            _ => break,
        }
    }
    assert!(seen, "live log entry received");
    // Admin logout clears only the admin cookie; the file session survives.
    let res = s
        .client
        .post(s.u("/api/auth/logout"))
        .header("cookie", &jar)
        .json(&json!({ "role": "admin" }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 200);
    assert!(header(res.headers(), "set-cookie").starts_with("fs_admin_session=;"));
    let res = s.client.get(s.u("/api/auth/session")).header("cookie", &jar).send().await.unwrap();
    let body: Value = res.json().await.unwrap();
    assert_eq!(body["role"], "file");
    assert_eq!(
        s.client
            .get(s.u("/api/admin/status"))
            .header("cookie", &jar)
            .send()
            .await
            .unwrap()
            .status(),
        401
    );
    // The open socket is closed with policy violation after revocation.
    let mut closed = None;
    while let Ok(Some(message)) = tokio::time::timeout(Duration::from_secs(4), socket.next()).await {
        if let Ok(tokio_tungstenite::tungstenite::Message::Close(frame)) = message {
            closed = frame.map(|f| u16::from(f.code));
            break;
        }
    }
    assert_eq!(closed, Some(1008));
    // Without admin credentials the upgrade is refused.
    let mut request = tokio_tungstenite::tungstenite::client::IntoClientRequest::into_client_request(ws_url.as_str()).unwrap();
    request.headers_mut().insert("cookie", file_cookie.parse().unwrap());
    assert!(tokio_tungstenite::connect_async(request).await.is_err());
    let _ = socket.close(None).await;
    s.stop().await;
}

#[tokio::test]
async fn write_operations_are_safe() {
    let s = start(json!({ "writeEnabled": true, "uploadEnabled": true, "uploadMaxSizeMB": 1 })).await;
    let token = s.bearer(ACCESS).await;
    std::fs::create_dir_all(s.files().join("docs")).unwrap();
    let upload = |dest: &str, name: &str, data: Vec<u8>| {
        Form::new()
            .text("destPath", dest.to_string())
            .part("file", Part::bytes(data).file_name(name.to_string()))
    };
    let res = s
        .post("/upload", &token)
        .multipart(upload("docs", "报告.txt", b"v1".to_vec()))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 200);
    assert_eq!(std::fs::read(s.files().join("docs/报告.txt")).unwrap(), b"v1");
    // Auto-creates missing nested directories safely.
    let res = s
        .post("/upload", &token)
        .multipart(upload("nested/sub/folder", "nested.txt", b"nest".to_vec()))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 200);
    assert_eq!(std::fs::read(s.files().join("nested/sub/folder/nested.txt")).unwrap(), b"nest");
    // Never overwrites.
    let res = s
        .post("/upload", &token)
        .multipart(upload("docs", "报告.txt", b"v2".to_vec()))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 409);
    assert_eq!(std::fs::read(s.files().join("docs/报告.txt")).unwrap(), b"v1");
    // destPath must precede the file.
    let form = Form::new()
        .part("file", Part::bytes(b"x".to_vec()).file_name("late.txt"))
        .text("destPath", "docs");
    assert_eq!(s.post("/upload", &token).multipart(form).send().await.unwrap().status(), 400);
    // Size limit, blocked extension, traversal.
    let res = s
        .post("/upload", &token)
        .multipart(upload("docs", "big.bin", vec![0u8; 1024 * 1024 + 10]))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 413);
    assert_eq!(
        s.post("/upload", &token)
            .multipart(upload("docs", "page.html", b"x".to_vec()))
            .send()
            .await
            .unwrap()
            .status(),
        400
    );
    assert_eq!(
        s.post("/upload", &token)
            .multipart(upload("../", "x.txt", b"x".to_vec()))
            .send()
            .await
            .unwrap()
            .status(),
        403
    );
    // No temp files left behind.
    let leftovers: Vec<_> = std::fs::read_dir(s.files().join("docs"))
        .unwrap()
        .filter_map(|e| e.ok())
        .filter(|e| e.file_name().to_string_lossy().starts_with('.'))
        .collect();
    assert!(leftovers.is_empty());
    // Rename: conflict, blocked extension, success.
    write(&s.files().join("docs/b.txt"), b"b");
    let rename = |old: &str, new: &str| json!({ "oldPath": old, "newPath": new });
    assert_eq!(
        s.post("/renameFile", &token)
            .json(&rename("docs/报告.txt", "docs/b.txt"))
            .send()
            .await
            .unwrap()
            .status(),
        409
    );
    assert_eq!(
        s.post("/renameFile", &token)
            .json(&rename("docs/b.txt", "docs/b.html"))
            .send()
            .await
            .unwrap()
            .status(),
        400
    );
    assert_eq!(
        s.post("/renameFile", &token)
            .json(&rename("docs/b.txt", "../b.txt"))
            .send()
            .await
            .unwrap()
            .status(),
        403
    );
    assert_eq!(
        s.post("/renameFile", &token)
            .json(&rename("docs/b.txt", "docs/c.txt"))
            .send()
            .await
            .unwrap()
            .status(),
        200
    );
    assert!(s.files().join("docs/c.txt").exists());
    // Delete: root refused, symlink refused, file ok.
    assert_eq!(
        s.post("/delFile", &token)
            .json(&json!({ "filePath": "" }))
            .send()
            .await
            .unwrap()
            .status(),
        403
    );
    #[cfg(unix)]
    {
        let outside = s.base.join("outside.txt");
        std::fs::write(&outside, b"secret").unwrap();
        std::os::unix::fs::symlink(&outside, s.files().join("link.txt")).unwrap();
        assert_eq!(
            s.post("/delFile", &token)
                .json(&json!({ "filePath": "link.txt" }))
                .send()
                .await
                .unwrap()
                .status(),
            403
        );
        assert_eq!(s.get("/getFile/link.txt", &token).send().await.unwrap().status(), 403);
        assert!(outside.exists());
    }
    assert_eq!(
        s.post("/delFile", &token)
            .json(&json!({ "filePath": "docs/c.txt" }))
            .send()
            .await
            .unwrap()
            .status(),
        200
    );
    assert!(!s.files().join("docs/c.txt").exists());
    assert_eq!(
        s.post("/delFile", &token)
            .json(&json!({ "filePath": "docs/c.txt" }))
            .send()
            .await
            .unwrap()
            .status(),
        404
    );
    s.stop().await;
}

#[tokio::test]
async fn ranges_and_conditional_requests() {
    let s = start(json!({})).await;
    let token = s.bearer(ACCESS).await;
    let data: Vec<u8> = (0..1000u32).map(|i| (i % 251) as u8).collect();
    write(&s.files().join("data.bin"), &data);
    let res = s.get("/getFile/data.bin", &token).send().await.unwrap();
    assert_eq!(res.status(), 200);
    assert_eq!(header(res.headers(), "accept-ranges"), "bytes");
    let etag = header(res.headers(), "etag");
    assert_eq!(res.bytes().await.unwrap().as_ref(), data.as_slice());
    let res = s
        .get("/getFile/data.bin", &token)
        .header("range", "bytes=10-19")
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 206);
    assert_eq!(header(res.headers(), "content-range"), "bytes 10-19/1000");
    assert_eq!(res.bytes().await.unwrap().as_ref(), &data[10..20]);
    let res = s.get("/getFile/data.bin", &token).header("range", "bytes=-5").send().await.unwrap();
    assert_eq!(res.bytes().await.unwrap().as_ref(), &data[995..]);
    let res = s
        .get("/getFile/data.bin", &token)
        .header("range", "bytes=5000-")
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 416);
    assert_eq!(header(res.headers(), "content-range"), "bytes */1000");
    let res = s
        .get("/getFile/data.bin", &token)
        .header("range", "bytes=0-1")
        .header("if-range", "\"stale\"")
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 200);
    let res = s
        .get("/getFile/data.bin", &token)
        .header("range", "bytes=0-1")
        .header("if-range", &etag)
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 206);
    let res = s
        .get("/getFile/data.bin", &token)
        .header("if-none-match", &etag)
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 304);
    let res = s.client.head(s.u("/getFile/data.bin")).bearer_auth(&token).send().await.unwrap();
    assert_eq!(header(res.headers(), "content-length"), "1000");
    s.stop().await;
}

#[tokio::test]
async fn v2_handles_literal_special_names() {
    let s = start(json!({})).await;
    let token = s.bearer(ACCESS).await;
    write(&s.files().join("$/inner.txt"), b"dollar");
    write(&s.files().join("x.jpg!320x240"), b"literal");
    for i in 0..5 {
        write(&s.files().join(format!("page/{i}.txt")), b"p");
    }
    let res: Value = s.get("/api/v2/files?path=%24", &token).send().await.unwrap().json().await.unwrap();
    assert_eq!(res["list"][0]["name"], "inner.txt");
    let res = s.get("/api/v2/content?path=x.jpg%21320x240", &token).send().await.unwrap();
    assert_eq!(res.status(), 200);
    assert_eq!(res.text().await.unwrap(), "literal");
    let res: Value = s
        .get("/api/v2/files?path=page&sta=1&end=3", &token)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    assert_eq!(res["listNum"], 5);
    assert_eq!(res["list"].as_array().unwrap().len(), 2);
    assert_eq!(res["nextStart"], 3);
    assert_eq!(s.get("/api/v2/files?path=page&sta=-1", &token).send().await.unwrap().status(), 400);
    assert_eq!(
        s.get("/api/v2/content?path=..%2Fconfig.json", &token)
            .send()
            .await
            .unwrap()
            .status(),
        403
    );
    // Legacy listing still works.
    let res: Value = s.get("/list/page", &token).send().await.unwrap().json().await.unwrap();
    assert_eq!(res["listNum"], 5);
    s.stop().await;
}

#[tokio::test]
async fn image_and_video_previews() {
    let s = start(json!({})).await;
    let token = s.bearer(ACCESS).await;
    let png = s.files().join("pic.png");
    if !ffmpeg(&[
        "-f",
        "lavfi",
        "-i",
        "color=c=red:s=400x200",
        "-frames:v",
        "1",
        png.to_str().unwrap(),
    ]) {
        eprintln!("ffmpeg unavailable, skipping preview test");
        return;
    }
    let res = s.get("/getFile/pic.png!64x64", &token).send().await.unwrap();
    assert_eq!(res.status(), 200);
    assert_eq!(header(res.headers(), "content-type"), "image/jpeg");
    let first = res.bytes().await.unwrap();
    assert_eq!(&first[..2], &[0xff, 0xd8]);
    let res = s
        .get("/api/v2/preview?path=pic.png&kind=image&width=64&height=64", &token)
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 200);
    // Cache invalidation: a changed source produces a new preview.
    std::thread::sleep(Duration::from_millis(20));
    assert!(ffmpeg(&[
        "-f",
        "lavfi",
        "-i",
        "color=c=blue:s=300x300",
        "-frames:v",
        "1",
        png.to_str().unwrap()
    ]));
    let second = s.get("/getFile/pic.png!64x64", &token).send().await.unwrap().bytes().await.unwrap();
    assert_ne!(first, second);
    // Bad size and corrupt input.
    assert_eq!(s.get("/getFile/pic.png!0x64", &token).send().await.unwrap().status(), 400);
    write(&s.files().join("bad.jpg"), b"not an image");
    let res = s
        .get("/api/v2/preview?path=bad.jpg&kind=image&width=64&height=64", &token)
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 422);
    // Video.
    let mp4 = s.files().join("clip.mp4");
    if ffmpeg(&[
        "-f",
        "lavfi",
        "-i",
        "testsrc=duration=2:size=160x120:rate=10",
        "-pix_fmt",
        "yuv420p",
        mp4.to_str().unwrap(),
    ]) {
        let res = s.get("/getVideoPreview/clip.mp4", &token).send().await.unwrap();
        assert_eq!(res.status(), 200);
        assert_eq!(&res.bytes().await.unwrap()[..2], &[0xff, 0xd8]);
        let res = s.get("/api/v2/preview?path=clip.mp4&kind=video", &token).send().await.unwrap();
        assert_eq!(res.status(), 200);
    }
    // Admin cache stats see the managed preview files.
    let admin = s.bearer(ADMIN).await;
    let stats: Value = s
        .get("/api/admin/cache/stats?refresh=true", &admin)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    assert!(stats["totalFiles"].as_u64().unwrap() >= 2);
    assert!(stats["imageCache"]["count"].as_u64().unwrap() >= 1);
    s.stop().await;
}

#[tokio::test]
async fn admin_status_and_restart_semantics() {
    let s = start(json!({})).await;
    let admin = s.bearer(ADMIN).await;
    let status: Value = s.get("/api/admin/status", &admin).send().await.unwrap().json().await.unwrap();
    assert_eq!(status["server"]["runtime"], "rust");
    assert_eq!(status["server"]["restartSupported"], false);
    assert!(status["server"]["restartReason"].is_string());
    assert!(status["server"]["nodeVersion"].is_null());
    assert!(status["process"]["heapUsed"].is_null());
    assert_eq!(status["server"]["httpStatus"], "running");
    assert_eq!(status["server"]["httpsStatus"], "disabled");
    // First sample has no CPU delta: unknown is null, not 0.
    assert!(status["cpu"]["usage"].is_null() || status["cpu"]["usage"].is_number());
    if status["cpu"]["usage"].is_null() {
        assert_eq!(status["cpu"]["warmingUp"], true);
    }
    assert!(status["memory"]["total"].as_u64().unwrap() > 0);
    // Disk metrics must work on every supported platform (unix statvfs / windows sysinfo),
    // otherwise the admin overview silently degrades to "未知".
    assert_eq!(status["disk"]["available"], true, "disk metrics unavailable on this platform");
    assert!(status["disk"]["total"].as_f64().is_some_and(|t| t > 0.0));
    assert!(status["disk"]["usage"].as_f64().is_some_and(|u| (0.0..=100.0).contains(&u)));
    assert_eq!(status["queues"]["upload"]["limit"], 4);
    let res = s.post("/api/admin/restart", &admin).send().await.unwrap();
    assert_eq!(res.status(), 409);
    let body: Value = res.json().await.unwrap();
    assert_eq!(body["code"], "RESTART_UNSUPPORTED");
    let res = s.get("/api/admin/sessions", &admin).send().await.unwrap();
    assert_eq!(header(res.headers(), "cache-control"), "no-store");
    let sessions: Value = res.json().await.unwrap();
    assert!(sessions["sessions"].as_array().unwrap().iter().any(|x| x["current"] == true));
    let db: Value = s
        .get("/api/admin/database/status", &admin)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    assert!(db["main"].as_u64().unwrap() > 0);
    s.stop().await;
}

#[tokio::test]
async fn managed_restart_exits_with_75() {
    let s = start_in(layout(json!({})), true).await;
    let admin = s.bearer(ADMIN).await;
    let res = s.post("/api/admin/restart", &admin).send().await.unwrap();
    assert_eq!(res.status(), 202);
    let code = tokio::time::timeout(Duration::from_secs(15), s.running.task)
        .await
        .unwrap()
        .unwrap();
    assert_eq!(code, file_server::RESTART_EXIT_CODE);
}

#[tokio::test]
async fn config_revision_save_and_rollback() {
    let s = start(json!({})).await;
    let admin = s.bearer(ADMIN).await;
    let config: Value = s.get("/api/admin/config", &admin).send().await.unwrap().json().await.unwrap();
    let revision = config["revision"].as_str().unwrap().to_string();
    assert!(config.to_string().find(ACCESS).is_none(), "credentials never rendered");
    let res = s
        .post("/api/admin/config/validate", &admin)
        .json(&json!({ "revision": revision, "values": { "cacheRetentionDays": 0 } }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 400);
    let res = s
        .client
        .put(s.u("/api/admin/config"))
        .bearer_auth(&admin)
        .json(&json!({ "revision": revision, "values": { "cacheRetentionDays": 7, "publicRead": true } }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 200, "{}", res.text().await.unwrap());
    // publicRead applies live.
    write(&s.files().join("p.txt"), b"p");
    assert_eq!(s.client.get(s.u("/getFile/p.txt")).send().await.unwrap().status(), 200);
    // Stale revision rejected.
    let res = s
        .client
        .put(s.u("/api/admin/config"))
        .bearer_auth(&admin)
        .json(&json!({ "revision": revision, "values": { "cacheRetentionDays": 9 } }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 409);
    let now: Value = s.get("/api/admin/config", &admin).send().await.unwrap().json().await.unwrap();
    assert_eq!(now["values"]["cacheRetentionDays"], 7);
    assert_eq!(now["backupAvailable"], true);
    let res = s
        .post("/api/admin/config/rollback", &admin)
        .json(&json!({ "revision": now["revision"] }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 200, "{}", res.text().await.unwrap());
    let back: Value = s.get("/api/admin/config", &admin).send().await.unwrap().json().await.unwrap();
    assert_eq!(back["values"]["cacheRetentionDays"], 30);
    assert_eq!(s.client.get(s.u("/getFile/p.txt")).send().await.unwrap().status(), 401);
    let audit: Value = s.get("/api/admin/audit", &admin).send().await.unwrap().json().await.unwrap();
    assert!(audit["entries"].as_array().unwrap().iter().any(|e| e["action"] == "config.save"));
    s.stop().await;
}

#[tokio::test]
async fn cache_jobs_persist_last_cleanup() {
    let s = start(json!({})).await;
    let admin = s.bearer(ADMIN).await;
    let cache = s.base.join("data/cache");
    write(&cache.join(format!("{}.jpg", "a".repeat(64))), b"jpeg");
    write(&cache.join("unrelated.txt"), b"keep");
    let stats: Value = s.get("/api/admin/cache/stats", &admin).send().await.unwrap().json().await.unwrap();
    assert!(stats["lastCleanupAt"].is_null());
    let res = s
        .post("/api/admin/cache/jobs", &admin)
        .json(&json!({ "mode": "all" }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 202);
    let job: Value = res.json().await.unwrap();
    let id = job["job"]["id"].as_str().unwrap().to_string();
    let mut finished = Value::Null;
    for _ in 0..50 {
        let j: Value = s
            .get(&format!("/api/admin/jobs/{id}"), &admin)
            .send()
            .await
            .unwrap()
            .json()
            .await
            .unwrap();
        if j["job"]["status"] == "succeeded" || j["job"]["status"] == "failed" {
            finished = j["job"].clone();
            break;
        }
        tokio::time::sleep(Duration::from_millis(100)).await;
    }
    assert_eq!(finished["status"], "succeeded", "{finished}");
    assert_eq!(finished["result"]["cleaned"], 1);
    assert!(cache.join("unrelated.txt").exists(), "unmanaged files are never deleted");
    let res = s
        .post("/api/admin/cache/jobs", &admin)
        .json(&json!({ "mode": "expired", "days": 0 }))
        .send()
        .await
        .unwrap();
    assert_eq!(res.status(), 400);
    let (dir, _) = s.stop().await;
    // Restart keeps lastCleanupAt from the persisted job.
    let s = start_in(dir, false).await;
    let admin = s.bearer(ADMIN).await;
    let stats: Value = s.get("/api/admin/cache/stats", &admin).send().await.unwrap().json().await.unwrap();
    assert!(stats["lastCleanupAt"].is_number(), "{stats}");
    let jobs: Value = s.get("/api/admin/jobs", &admin).send().await.unwrap().json().await.unwrap();
    assert_eq!(jobs["jobs"][0]["id"], id.as_str());
    s.stop().await;
}

#[tokio::test]
async fn logs_query_export_and_cursor() {
    let s = start(json!({})).await;
    let admin = s.bearer(ADMIN).await;
    let logs = s.base.join("data/logs");
    let mut text = String::new();
    for i in 0..30 {
        text.push_str(&format!(
            "[2024-01-15T12:00:{i:02}.000Z] [INFO] [default] entry-{i} token=supersecretvalue\n"
        ));
    }
    std::fs::write(logs.join("app.log.1"), &text).unwrap();
    let page: Value = s
        .get("/api/admin/logs?order=append&limit=10&keyword=entry-", &admin)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    assert_eq!(page["logs"].as_array().unwrap().len(), 10);
    assert_eq!(page["logs"][0]["message"].as_str().unwrap().split(' ').next().unwrap(), "entry-29");
    assert!(!page.to_string().contains("supersecretvalue"));
    let cursor = page["nextCursor"].as_str().unwrap();
    let next: Value = s
        .get(
            &format!("/api/admin/logs?order=append&limit=10&keyword=entry-&before={cursor}"),
            &admin,
        )
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    assert_eq!(next["logs"][0]["message"].as_str().unwrap().split(' ').next().unwrap(), "entry-19");
    let res = s
        .get("/api/admin/logs/export?format=csv&keyword=entry-", &admin)
        .send()
        .await
        .unwrap();
    assert_eq!(header(res.headers(), "x-export-truncated"), "false");
    assert!(res.text().await.unwrap().starts_with('\u{feff}'));
    assert_eq!(s.get("/api/admin/logs?limit=5000", &admin).send().await.unwrap().status(), 400);
    s.stop().await;
}

#[tokio::test]
async fn static_hosting_and_history_fallback() {
    let s = start(json!({})).await;
    let res = s.client.get(s.u("/")).send().await.unwrap();
    assert_eq!(res.status(), 200);
    assert!(res.text().await.unwrap().contains("<title>web</title>"));
    let res = s.client.get(s.u("/assets/app.js")).send().await.unwrap();
    assert!(header(res.headers(), "cache-control").contains("immutable"));
    let res = s.client.get(s.u("/admin")).send().await.unwrap();
    assert!(res.url().path().ends_with("/admin/"));
    let res = s.client.get(s.u("/admin/logs/live")).send().await.unwrap();
    assert!(res.text().await.unwrap().contains("<title>admin</title>"));
    assert_eq!(s.client.get(s.u("/admin/missing.js")).send().await.unwrap().status(), 404);
    assert_eq!(s.client.get(s.u("/missing.css")).send().await.unwrap().status(), 404);
    s.stop().await;
}

#[cfg(unix)]
#[tokio::test]
async fn static_symlinks_never_expose_private_data() {
    let dir = layout(json!({}));
    let base = dir.path().to_path_buf();
    std::fs::create_dir_all(base.join("data")).unwrap();
    std::fs::write(base.join("data/secret.txt"), "private-data").unwrap();
    std::fs::write(base.join("outside.html"), "outside-index").unwrap();
    std::fs::remove_dir_all(base.join("static/web")).unwrap();
    std::os::unix::fs::symlink(base.join("data"), base.join("static/web")).unwrap();
    std::fs::remove_file(base.join("static/admin/index.html")).unwrap();
    std::os::unix::fs::symlink(base.join("outside.html"), base.join("static/admin/index.html")).unwrap();
    let s = start_in(dir, false).await;
    for path in [
        "/",
        "/secret.txt",
        "/auth.local.json",
        "/imgCache.db",
        "/admin/",
        "/admin/some/route",
        "/admin/index.html",
    ] {
        let res = s.client.get(s.u(path)).send().await.unwrap();
        let status = res.status();
        let text = res.text().await.unwrap();
        assert!(status == 403 || status == 404, "{path} -> {status}");
        assert!(
            !text.contains("private-data") && !text.contains("outside-index") && !text.contains("accessToken"),
            "{path}"
        );
    }
    s.stop().await;
}

#[cfg(unix)]
#[tokio::test]
async fn planted_cache_symlink_is_never_served() {
    let s = start(json!({})).await;
    let token = s.bearer(ACCESS).await;
    let png = s.files().join("picture.png");
    if !ffmpeg(&[
        "-f",
        "lavfi",
        "-i",
        "color=c=green:s=100x100",
        "-frames:v",
        "1",
        png.to_str().unwrap(),
    ]) {
        return;
    }
    let meta = std::fs::metadata(&png).unwrap();
    let canonical = png.canonicalize().unwrap();
    let key = file_server::previews::preview_key(&canonical, &meta, "image:32x32");
    let cache = s.running.state.startup.img_cache.clone();
    let secret = s.base.join("data/auth.local.json");
    std::fs::write(&secret, r#"{"accessToken":"planted-secret-value"}"#).unwrap();
    std::os::unix::fs::symlink(&secret, cache.join(format!("{key}.jpg"))).unwrap();
    for path in [
        "/api/v2/preview?path=picture.png&kind=image&width=32&height=32",
        "/getFile/picture.png!32x32",
    ] {
        let res = s.get(path, &token).send().await.unwrap();
        let body = res.bytes().await.unwrap();
        assert!(!String::from_utf8_lossy(&body).contains("planted-secret-value"), "{path}");
        assert_eq!(&body[..2], &[0xff, 0xd8], "{path} regenerated a real JPEG");
    }
    let link = std::fs::symlink_metadata(cache.join(format!("{key}.jpg"))).unwrap();
    assert!(!link.file_type().is_symlink());
    s.stop().await;
}

#[tokio::test]
async fn admin_root_change_uses_startup_isolation() {
    let dir = layout(json!({ "keyPath": "./other/private.pem", "certPath": "./other/file.crt" }));
    std::fs::create_dir_all(dir.path().join("other")).unwrap();
    std::fs::write(dir.path().join("other/private.pem"), "key").unwrap();
    let s = start_in(dir, false).await;
    let admin = s.bearer(ADMIN).await;
    let config: Value = s.get("/api/admin/config", &admin).send().await.unwrap().json().await.unwrap();
    let revision = config["revision"].clone();
    let cache = s.running.state.startup.img_cache.clone();
    std::fs::create_dir_all(cache.join("sub")).unwrap();
    for root in ["./other", cache.join("sub").to_str().unwrap(), "./data"] {
        let res = s
            .post("/api/admin/config/validate", &admin)
            .json(&json!({ "revision": revision, "values": { "rootPath": root } }))
            .send()
            .await
            .unwrap();
        assert_eq!(res.status(), 400, "{root}");
        let body: Value = res.json().await.unwrap();
        assert!(body["errors"]["rootPath"].is_string(), "{root}: {body}");
    }
    s.stop().await;
}

#[tokio::test]
async fn invalid_tls_fails_closed_before_listening() {
    let dir = layout(json!({ "httpsEnabled": true, "httpsPort": 0, "certPath": "./cert/file.crt", "keyPath": "./cert/private.pem" }));
    let base = dir.path().to_path_buf();
    write(&base.join("cert/file.crt"), b"not a certificate");
    write(&base.join("cert/private.pem"), b"not a key");
    // Reserve a port, release it, and make sure nothing starts listening there.
    let probe = std::net::TcpListener::bind("127.0.0.1:0").unwrap();
    let port = probe.local_addr().unwrap().port();
    drop(probe);
    let mut config_json: Value = serde_json::from_str(&std::fs::read_to_string(base.join("config.json")).unwrap()).unwrap();
    config_json["port"] = json!(port);
    std::fs::write(base.join("config.json"), config_json.to_string()).unwrap();
    let env = env(false);
    let config = file_server::config::load(Some(base.join("config.json")), &env).expect("config loads");
    let result = file_server::start(config, file_server::state::Options::from_env(env)).await;
    let err = result.err().expect("start must fail");
    assert!(err.contains("HTTPS"), "{err}");
    assert!(
        std::net::TcpStream::connect(("127.0.0.1", port)).is_err(),
        "no plaintext listener left behind"
    );
    assert!(!base.join("data/imgCache.db").exists(), "database not opened before TLS validation");
}
