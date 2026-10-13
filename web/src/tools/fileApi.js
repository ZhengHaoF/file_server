import axios from 'axios';

// Passwords are never persisted. HttpOnly cookies support reloads on the same origin.
const sessions = new Map();
export const fileApi = axios.create({ withCredentials: true, timeout: 15000 });
fileApi.interceptors.request.use(config => {
  const origin = new URL(config.url, window.location.href).origin;
  const session = sessions.get(origin);
  config._fileSession = session;
  if (session?.sessionToken) config.headers.Authorization = `Bearer ${session.sessionToken}`;
  return config;
});
fileApi.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401 && error.config?.url) {
    const origin = new URL(error.config.url, window.location.href).origin;
    if (sessions.get(origin) === error.config._fileSession) sessions.delete(origin);
  }
  return Promise.reject(error);
});

export async function authenticate(baseUrl, token) {
  const response = await fileApi.post(`${baseUrl}/api/auth/login`, { token });
  sessions.set(new URL(baseUrl).origin, response.data);
  return response.data;
}

export async function ensureTicket(baseUrl) {
  const origin = new URL(baseUrl).origin;
  const previous = sessions.get(origin);
  const session = previous || {};
  if (session.ticketExpiresAt > Date.now() + 60000) return;
  try {
    const response = await fileApi.post(`${baseUrl}/api/auth/ticket`);
    if (sessions.get(origin) === previous) sessions.set(origin, { ...session, ...response.data });
  } catch (error) {
    // Anonymous publicRead may browse without a ticket. An expired authenticated
    // session must instead reach the normal login flow, never reuse a stale ticket.
    if (error.response?.status !== 401 || session.sessionToken) throw error;
  }
}

/** Management is a separate authenticated app; never pass credentials to its URL. */
export function adminUrl(baseUrl) {
  return `${baseUrl.replace(/\/+$/, '')}/admin/`;
}

export function fileUrl(baseUrl, filePath, fileName) {
  const path = filePath ? `${filePath}/${fileName}` : fileName;
  return withTicket(v2Url(baseUrl, 'content', { path }), baseUrl);
}

function v2Url(baseUrl, endpoint, query) {
  const parsed = new URL(`${baseUrl.replace(/\/+$/, '')}/api/v2/${endpoint}`);
  for (const [key, value] of Object.entries(query)) parsed.searchParams.set(key, String(value));
  return parsed.toString();
}

export function listUrl(baseUrl, path, start = 0, end = start + 500) {
  return v2Url(baseUrl, 'files', { path, sta: start, end });
}

export function videoPreviewUrl(baseUrl, path) {
  return withTicket(v2Url(baseUrl, 'preview', { path, kind: 'video' }), baseUrl);
}

export function withTicket(url, baseUrl) {
  const parsed = new URL(url);
  const ticket = sessions.get(new URL(baseUrl).origin)?.readTicket;
  if (ticket) parsed.searchParams.set('ticket', ticket);
  return parsed.toString();
}

export function previewUrl(url, size) {
  const parsed = new URL(url);
  if (!parsed.pathname.endsWith('/api/v2/content') || !parsed.searchParams.has('path')) {
    throw new Error('图片预览需要 v2 原文件 URL');
  }
  const bounded = Math.max(1, Math.min(4000, Math.floor(Number(size) || 1)));
  parsed.pathname = parsed.pathname.replace(/\/content$/, '/preview');
  parsed.searchParams.set('kind', 'image');
  parsed.searchParams.set('width', String(bounded));
  parsed.searchParams.set('height', String(bounded));
  return parsed.toString();
}
