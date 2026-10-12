# Admin rewrite contract

This is the implementation contract for the rewritten Vue 3 admin and Express services. Keep legacy file APIs and the Web/Flutter file clients unchanged. All admin calls use HttpOnly cookies in production; optionally attach the temporary Bearer session returned at login in memory. Never persist tokens in browser storage or put credentials in URLs.

## Auth

- `POST /api/auth/login {token}` → existing `{role,sessionToken,readTicket,expiresAt,ticketExpiresAt,...}`. Require role `admin` for the admin app.
- `GET /api/auth/session` → `{role,expiresAt,sessionId}`. 401 means signed out; network errors must NOT be treated as signed out.
- `POST /api/auth/logout {}` → `{msg}`; revoke server session and tickets, clear cookie.
- `GET /api/admin/sessions` → `{sessions:[{id,role,createdAt,lastSeenAt,expiresAt,current,ip}]}`. IDs are public management IDs, never credentials.
- `DELETE /api/admin/sessions/:id` → `{msg,current}`. Confirm revocation; current session revocation returns to login.

## Overview

- `GET /api/admin/status` →
  `{sampledAt,bootId,cpu:{usage:null|number,cores,warmingUp},memory:{total,free,used,usage,scope:"host"},disk:{total,used,free,usage,available,scope:"shared-filesystem"},process:{rss,heapUsed,heapTotal},server:{uptime,nodeVersion,httpPort,httpsPort,httpStatus,httpsStatus,restartSupported,deployment},queues:{image:{active,pending,limit},video:{active,pending,limit},upload:{active,pending,limit},maintenance},history:[{time,cpu:null|number,memory,processRss}],alerts:[{level,message}]}`.
- Memory in MB; disk in GB; process bytes. `httpStatus/httpsStatus`: `running|disabled|stopped|error`. Unknown/offline is a CLIENT state, never inferred as stopped. Retain stale successful data and show last sample time.
- `POST /api/admin/restart {}` → 202 `{msg,bootId}` if managed, 409 if unsupported. Confirm and poll `GET /api/auth/session`: unreachable means restarting, 401 means restored but needs sign-in. Do not claim success until reachable; timeout offers retry. Restart resets in-memory sessions.

## Cache

- `GET /api/admin/cache/stats?refresh=true` →
  `{sampledAt,totalFiles,totalSize,imageCache:{count,size},videoCache:{count,size},legacyCache:{count,size},dbSize,database:{main,wal,shm,total,recordCount},policy:{cacheMaxSizeMB,cacheRetentionDays,autoCleanupEnabled},maintenance,lastCleanupAt}`.
- `POST /api/admin/cache/jobs {mode:"expired"|"all"|"policy",days?:integer}` → 202 `{job}`. Single maintenance job; duplicates 409. Confirm all-clearing. Files are derived cache only, never original files. Pause new previews, drain existing work, clean, then resume.
- Legacy `POST /api/admin/cache/clean` remains synchronous-compatible, 200 `{msg,cleaned,freedBytes,failed}`.

## Operations and audit

- `GET /api/admin/jobs?limit=25&before=<integer>` → `{jobs:[{id,type,status,createdAt,startedAt,finishedAt,progress:{processed,total},result:{cleaned,freedBytes,failed},error}],nextBefore}`. Status `queued|running|succeeded|failed|interrupted`.
- `GET /api/admin/jobs/:id` → `{job}`.
- `GET /api/admin/audit?limit=50&before=<integer>` → `{entries:[{id,createdAt,action,actor,target,result,details}],nextBefore}`.
- These are real persisted server records, not mock chart values. UI can show jobs and audit on one Operations page with tabs. No fake cancel/retry controls.

## Logs

- `GET /api/admin/logs?level=&keyword=&limit=100&before=<cursor>&start=<ISO>&end=<ISO>&source=application|supervisor` →
  `{logs:[{id,timestamp,level,category,message,source}],nextCursor,total}`. Latest first; total is returned-page count, not all-time total.
- `GET /api/admin/logs/export?...&format=csv|json` returns downloadable filtered file, capped at 10,000 lines. Use authenticated XHR Blob then download; no token in URL.
- `/api/admin/logs/stream` WebSocket uses cookie; same-origin wss on TLS. Existing messages get stable `id` and `source` added. Production live toggle defaults off until enabled; filter client-side and deduplicate snapshot/live by ID. Close/cancel reconnect on unmount/logout, show connection state, pause updates explicitly.
- Preview builds may use polling instead of WebSocket if a proxy prevents cookies; label this as polling. Production does not fall back silently.
- “Clear display” empties UI only, and must be labelled as such. Searching and pagination ignore stale requests.

## Configuration

- `GET /api/admin/config` returns legacy masked top-level properties PLUS
  `{revision,values,fields:[{key,label,type:"boolean"|"number"|"string"|"origins",group,help,restartRequired,readonly,source,min?,max?}],pendingRestart:[keys],backupAvailable}`.
- Editable keys: `rootPath,host,port,httpsEnabled,httpsPort,publicRead,writeEnabled,uploadEnabled,uploadMaxSizeMB,allowedOrigins,secureCookies,cacheMaxSizeMB,cacheRetentionDays,autoCleanupEnabled`. Runtime database/cache paths and credentials are NOT editable here.
- Root/listen/TLS changes need restart. File switches, allowed origins, upload limit (rebuild multer per upload) and cache policy apply immediately. Environment-controlled fields are readonly.
- `POST /api/admin/config/validate {revision,values}` → `{valid:true,changes:[{key,before,after,restartRequired}],warnings:[string]}`. Invalid 400 `{msg,errors:{key:message}}`; stale revision 409.
- `PUT /api/admin/config {revision,values}` → `{msg,config:<same as GET>,changes}`. Validate before atomic private file save; confirm diff before sending; preserve noneditable/secret existing fields, never serialize masked secrets. Overrides live in dataPath/admin-config.local.json (loaded after config.local.json, before env); keep one rollback file beside it outside share root, mode 0600.
- `POST /api/admin/config/rollback {revision}` → `{msg,config}`. Confirmation required; validate backup and revision.
- `GET /api/admin/config/export` → safe JSON with editable non-secret values, never session/access/admin credentials. Explain export contains local directory settings.
- UI groups Basic/Access/Cache settings; dynamic form or hand-designed groups. Keep dirty state, show per-field errors and warnings, protect against accidental navigation with unsaved changes. Copy buttons must actually copy with error feedback.

## UI and QA requirements

Chinese interface, coherent restrained NAS/developer-tool aesthetic. Dense but readable, light/dark toggle, responsive sidebar/mobile drawer, 44px targets, keyboard accessible confirmation dialogs with focus handling, inline errors and durable outcomes. No alert/confirm(), no generic purple glowing gradients. Use Vue 3 and existing Vite toolchain; do not migrate to React. Prefer plain CSS tokens and Lucide icons, not decorative SVG icons (custom SVG logo is fine).

Pages: Overview, Cache, Logs, Configuration, Operations, Sessions, Login, Not Found. `/admin/` history routing remains supported. Remove obsolete stores/helpers/views that are replaced. Add admin unit/component tests and npm scripts. No unconnected buttons, fabricated metrics, or silent zero placeholders. Add data-testid where useful.

Parent implements server and performs browser QA. Frontend implementation belongs to the Claude Opus agent under `admin/` only; no edits to server, Web/Flutter, git commit/push, deploy or outgoing email. Coordinate API questions in a concise final result. No new server dependency needed.
