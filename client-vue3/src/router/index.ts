/*
 * @Author: master
 * @Date: 2022-03-29 17:16:05
 * @LastEditTime: 2022-09-30
 * @Description: 路由入口
 */
import { createRouter, createWebHistory } from 'vue-router';
import TheLandLords from '@/views/the-landlords.vue';
import TheLogin from '@/views/the-login.vue';

const routes = [
  {
    path: '/Landlords/:id',
    component: TheLandLords,
  },
  {
    path: '/',
    component: TheLogin,
  },
];

const router = createRouter({
  // 可以自定义路由history状态
  // @ts-ignore
  history: createWebHistory(),
  routes: [
    // 没有找到资源
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'notFound',
    //   component: () => import('@path/views/not-found.vue'),
    // },
    ...routes,
  ],
});

export default router;
