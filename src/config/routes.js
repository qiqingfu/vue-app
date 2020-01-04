const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
    children: [
      {
        path: '/project',
        name: 'project',
        component: () => import(/* webpackChunkName: "project" */'@/pages/project/Index.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];

export default routes;
