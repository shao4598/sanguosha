import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { resolve } from 'path';

export default defineConfig({
  build: {
    sourcemap: false,
  },
  plugins: [
    vue2(),
    vueJsx(), // require引入转换成import引入
  ],
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': resolve('src'),
      vue: 'vue/dist/vue.esm.js', // 指向完整版的 Vue
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
