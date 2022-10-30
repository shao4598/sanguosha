import Landlords from '@/views/the-landlords.vue';
import Login from '@/views/the-login.vue';

export default [
  {
    path: '/Landlords/:id',
    component: Landlords,
  },
  {
    path: '/',
    component: Login,
  },
];
