import axios from 'axios';

// Passwords are never persisted. HttpOnly cookies support reloads on the same origin.
const sessions = new Map();
export const fileApi = axios.create({ withCredentials: true, timeout: 15000 });
fileApi.interceptors.request.use(config => {
  const origin = new URL(config.url, window.location.href).origin;
  const session = sessions.get(origin);
  if (session?.sessionToken) config.headers.Authorization = `Bearer ${session.sessionToken}`;
  return config;
});

export async function authenticate(baseUrl, token) {
  const response = await fileApi.post(`${baseUrl}/api/auth/login`, { token });
  sessions.set(new URL(baseUrl).origin, response.data);
  return response.data;
}

export async function ensureTicket(baseUrl) {
  const origin = new URL(baseUrl).origin;
  const session = sessions.get(origin) || {};
  if (session.ticketExpiresAt > Date.now() + 60000) return;
  try {
    const response = await fileApi.post(`${baseUrl}/api/auth/ticket`);
    sessions.set(origin, { ...session, ...response.data });
  } catch (error) {
    if (error.response?.status !== 401) throw error; // publicRead can browse without a ticket.
  }
}

export function fileUrl(baseUrl, filePath, fileName) {
  const encoded = [...filePath.split('/').filter(Boolean), fileName].map(encodeURIComponent).join('/');
  return withTicket(`${baseUrl}/getFile/${encoded}`, baseUrl);
}

export function withTicket(url, baseUrl) {
  const parsed = new URL(url);
  const ticket = sessions.get(new URL(baseUrl).origin)?.readTicket;
  if (ticket) parsed.searchParams.set('ticket', ticket);
  return parsed.toString();
}

export function previewUrl(url, size) {
  const parsed = new URL(url);
  parsed.pathname += `!${Math.min(size, 4000)}x${Math.min(size, 4000)}`;
  return parsed.toString();
}
