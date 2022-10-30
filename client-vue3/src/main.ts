import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // 路由
import naive from 'naive-ui';

import VConsole from 'vconsole';

new VConsole({ theme: 'dark' });

console.log(router);

// 接下来即可照常使用 `console` 等方法
console.log('Hello world');

// 结束调试后，可移除掉
// vConsole.destroy();

const app = createApp(App);
app.use(router);
app.use(naive);
app.mount('#app');
