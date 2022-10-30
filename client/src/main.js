import Vue from 'vue';
import App from './app.vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import VueRouterParam from './routers';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import 'element-ui/lib/theme-chalk/index.css';

Vue.component('date-picker', DatePicker);

/* Vue.use(VCalendar, {
	componentPrefix: 'vc',
}) */

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({ routes: VueRouterParam });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
