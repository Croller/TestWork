import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Table from './components/Test_1/Table.vue';
import Info from './components/Test_1/Info.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/table',
      name: 'table',
      component: Table,
    },
    {
      path: '/info/ship/:id',
      name: 'info',
      component: Info,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
