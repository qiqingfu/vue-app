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
        redirect: '/project/projectList',
        children: [
          {
            path: 'projectList',
            name: 'projectList',
            component: () => import(/* webpackChunkName: "project-list" */'@/pages/project/ProjectList.vue'),
          },
          {
            path: 'projectAdd',
            name: 'projectAdd',
            component: () => import(/* webpackChunkName: "project-add" */'@/pages/project/ProjectAdd.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];

export default routes;
