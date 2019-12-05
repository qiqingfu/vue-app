const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];

export default routes;
