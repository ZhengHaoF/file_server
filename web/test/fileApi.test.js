import { afterEach, expect, test } from 'vitest';
import { fileApi, authenticate, fileUrl, previewUrl } from '../src/tools/fileApi.js';

const originalAdapter = fileApi.defaults.adapter;
afterEach(() => { fileApi.defaults.adapter = originalAdapter; });

test('literal path segments are encoded once and thumbnail suffix precedes ticket', () => {
  const url = fileUrl('https://files.example.com', '图片 #100%/a__b', 'cost$2026.png');
  expect(url).toContain('%E5%9B%BE%E7%89%87%20%23100%25/a__b/cost%242026.png');
  const preview = previewUrl(`${url}?ticket=temporary`, 500);
  expect(preview).toContain('.png!500x500?ticket=temporary');
});

test('login keeps credentials transient and media ticket is read-scoped', async () => {
  globalThis.window = { location: { href: 'https://files.example.com/' } };
  fileApi.defaults.adapter = async config => ({
    data: { sessionToken: 'session', readTicket: 'read-only', ticketExpiresAt: Date.now() + 3600000 },
    status: 200, statusText: 'OK', headers: {}, config,
  });
  await authenticate('https://files.example.com', 'secret-input');
  expect(fileUrl('https://files.example.com', '', 'image.png')).toContain('ticket=read-only');
  expect(previewUrl(fileUrl('https://files.example.com', '', 'image.png'), 9000))
    .toContain('!4000x4000?ticket=read-only');
  const response = await fileApi.get('https://files.example.com/list/$');
  expect(response.config.headers.Authorization).toBe('Bearer session');
});
