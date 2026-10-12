import { afterEach, expect, test } from 'vitest';
import { AxiosError } from 'axios';
import { fileApi, authenticate, ensureTicket, fileUrl, previewUrl, adminUrl, listUrl, videoPreviewUrl } from '../src/tools/fileApi.js';

const originalAdapter = fileApi.defaults.adapter;
afterEach(() => { fileApi.defaults.adapter = originalAdapter; });

test('v2 query paths are encoded once; image preview is separate from raw content', () => {
  const url = fileUrl('https://files.example.com', '图片 #100%/a__b', 'cost$2026.png');
  const parsed = new URL(url);
  expect(parsed.pathname).toBe('/api/v2/content');
  expect(parsed.searchParams.get('path')).toBe('图片 #100%/a__b/cost$2026.png');
  expect(url).not.toContain('%25E5');
  parsed.searchParams.set('ticket', 'temporary票据?&+%');
  const preview = new URL(previewUrl(parsed.toString(), 500));
  expect(preview.pathname).toBe('/api/v2/preview');
  expect(preview.searchParams.get('path')).toBe(parsed.searchParams.get('path'));
  expect(preview.searchParams.get('ticket')).toBe('temporary票据?&+%');
  expect(preview.searchParams.get('kind')).toBe('image');
  expect(preview.searchParams.get('width')).toBe('500');
  expect(preview.searchParams.get('height')).toBe('500');
});

test('login keeps credentials transient and media ticket is read-scoped', async () => {
  globalThis.window = { location: { href: 'https://files.example.com/' } };
  fileApi.defaults.adapter = async config => ({
    data: { sessionToken: 'session', readTicket: 'read-only', ticketExpiresAt: Date.now() + 3600000 },
    status: 200, statusText: 'OK', headers: {}, config,
  });
  await authenticate('https://files.example.com', 'secret-input');
  expect(fileUrl('https://files.example.com', '', 'image.png')).toContain('ticket=read-only');
  const preview = new URL(previewUrl(fileUrl('https://files.example.com', '', 'image.png'), 9000));
  expect(preview.searchParams.get('width')).toBe('4000');
  expect(preview.searchParams.get('height')).toBe('4000');
  expect(preview.searchParams.get('ticket')).toBe('read-only');
  const response = await fileApi.get(listUrl('https://files.example.com', ''));
  expect(response.config.headers.Authorization).toBe('Bearer session');
});

test('management entry carries no credentials and preserves the server prefix', () => {
  expect(adminUrl('https://files.example.com/')).toBe('https://files.example.com/admin/');
  expect(adminUrl('https://files.example.com/nas')).toBe('https://files.example.com/nas/admin/');
});

test('expired authenticated ticket refresh clears the matching session and requests login', async () => {
  globalThis.window = { location: { href: 'https://expired.example.com/' } };
  fileApi.defaults.adapter = async config => ({
    data: { sessionToken: 'expired-session', readTicket: 'expired-ticket', ticketExpiresAt: 0 },
    status: 200, statusText: 'OK', headers: {}, config,
  });
  await authenticate('https://expired.example.com', 'transient');
  fileApi.defaults.adapter = async config => {
    const response = { status: 401, data: { msg: '会话已失效' }, config };
    throw new AxiosError('unauthorized', 'ERR_BAD_REQUEST', config, null, response);
  };
  await expect(ensureTicket('https://expired.example.com')).rejects.toMatchObject({ response: { status: 401 } });
  expect(fileUrl('https://expired.example.com', '', 'image.png')).not.toContain('ticket=');
  // Anonymous publicRead clients can still continue without a ticket.
  await expect(ensureTicket('https://expired.example.com')).resolves.toBeUndefined();
});

test('late 401 from an old session cannot clear a newer login', async () => {
  const base = 'https://racing.example.com';
  globalThis.window = { location: { href: `${base}/` } };
  let rejectOld;
  fileApi.defaults.adapter = async config => {
    if (config.url.endsWith('/api/auth/login')) {
      const token = JSON.parse(config.data).token;
      return { data: { sessionToken: token, readTicket: `${token}-ticket`, ticketExpiresAt: 0 }, status: 200, headers: {}, config };
    }
    return new Promise((_, reject) => { rejectOld = () => reject(new AxiosError('unauthorized', 'ERR_BAD_REQUEST', config, null, { status: 401, config })); });
  };
  await authenticate(base, 'old-session');
  const old = fileApi.get(listUrl(base, '$'));
  const failed = expect(old).rejects.toMatchObject({ response: { status: 401 } });
  await authenticate(base, 'new-session');
  rejectOld();
  await failed;
  expect(fileUrl(base, '', 'image.png')).toContain('ticket=new-session-ticket');
});

test('root, literal $ and $$ folders remain distinct without legacy fallback', () => {
  for (const path of ['', '$', '$$', '$/$$', '图片 #100%/a__b']) {
    const url = new URL(listUrl('https://files.example.com/nas', path, 500, 1000));
    expect(url.pathname).toBe('/nas/api/v2/files');
    expect(url.searchParams.get('path')).toBe(path);
    expect(url.searchParams.get('sta')).toBe('500');
    expect(url.searchParams.get('end')).toBe('1000');
  }
});

test('literal preview-like file names and percent text are raw v2 content', () => {
  for (const name of ['foo.jpg!320x240', '字面%2F.jpg!320x240', 'image #100%$.png']) {
    const content = new URL(fileUrl('https://files.example.com', '$$', name));
    expect(content.pathname).toBe('/api/v2/content');
    expect(content.searchParams.get('path')).toBe(`$$/${name}`);
    expect(content.searchParams.has('kind')).toBe(false);
    const preview = new URL(previewUrl(content.toString(), 320));
    expect(preview.searchParams.get('path')).toBe(`$$/${name}`);
    expect(preview.searchParams.get('width')).toBe('320');
    expect(preview.searchParams.get('kind')).toBe('image');
  }
  expect(() => previewUrl('https://files.example.com/getFile/foo.jpg!320x240', 320)).toThrow('v2');
});

test('video thumbnails use the separate preview endpoint with a literal query path', () => {
  const preview = new URL(videoPreviewUrl('https://files.example.com/nas', '$/视频 #100%.mp4'));
  expect(preview.pathname).toBe('/nas/api/v2/preview');
  expect(preview.searchParams.get('path')).toBe('$/视频 #100%.mp4');
  expect(preview.searchParams.get('kind')).toBe('video');
  expect(preview.searchParams.has('width')).toBe(false);
});
