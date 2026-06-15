import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将组件库的代码打包
          'icon': ['@icon-park/vue-next'],
          'pick-colors': ['vue-pick-colors']
        },
      },
    }
  },
  css:{
    preprocessorOptions:{
      scss:{api:"modern-compiler"}
    }
  }
})
