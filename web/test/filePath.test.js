import { beforeEach, expect, test, vi } from 'vitest';
const route = vi.hoisted(() => ({ params: {} }));
const router = vi.hoisted(() => ({ push: vi.fn(), back: vi.fn() }));
vi.mock('vue-router', () => ({ useRoute: () => route, useRouter: () => router }));
import { useFilePath } from '../src/composables/useFilePath.js';

beforeEach(() => { route.params = {}; vi.clearAllMocks(); });

test('literal dollar folders are not root and their back navigation reaches the real root', () => {
  for (const name of ['$', '$$']) {
    route.params.path = [name];
    const path = useFilePath();
    path.initializePath();
    expect(path.isRoot.value).toBe(false);
    expect(path.breadcrumbs.value.at(-1).path).toBe(name);
    path.goBack();
    expect(path.currentPath.value).toBe('');
    expect(path.isRoot.value).toBe(true);
    expect(router.push).toHaveBeenLastCalledWith('/');
  }
});

test('router-decoded literal percent and Unicode segments are not decoded again', () => {
  route.params.path = ['图片 #100%', '字面%2F'];
  const path = useFilePath();
  path.initializePath();
  expect(path.currentPath.value).toBe('图片 #100%/字面%2F');
  path.enterDirectory('$$');
  expect(router.push).toHaveBeenCalledWith('/%E5%9B%BE%E7%89%87%20%23100%25/%E5%AD%97%E9%9D%A2%252F/%24%24');
});
