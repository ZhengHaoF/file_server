import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Preview builds use a relative base so they can be served from any path.
const preview = process.env.VITE_ADMIN_PREVIEW === '1'

export default defineConfig({
  base: preview ? './' : '/admin/',
  plugins: [vue()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 600
  },
  server: {
    port: 3008,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        configure(proxy) {
          proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'))
        }
      }
    }
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.js'],
    restoreMocks: true
  }
})
