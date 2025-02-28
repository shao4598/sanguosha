import Vue from 'vue';
import App from './app.vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import VueRouterParam from './routers';
import VCalendar from 'v-calendar';
import 'element-ui/lib/theme-chalk/index.css';
import './style.css';

Vue.use(VCalendar);
Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({ routes: VueRouterParam });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
