import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: '/', // 自动在浏览器中打开项目
    proxy: {
      '/api': {
        target: '', // 接口地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
});
