const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home.title',
      keywords: 'home.keywords',
      description: 'home.description',
    },
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
    children: [
      {
        path: 'project',
        name: 'project',
        component: () => import(/* webpackChunkName: "project" */'@/pages/project/Index.vue'),
        redirect: '/project/projectList',
        children: [
          {
            path: 'list',
            name: 'projectList',
            meta: {
              title: 'projectList.title',
              keywords: 'projectList.keywords',
              description: 'projectList.description',
            },
            component: () => import(/* webpackChunkName: "project-list" */'@/pages/project/ProjectList.vue'),
          },
          {
            path: 'add',
            name: 'projectAdd',
            meta: {
              title: 'projectAdd.title',
              keywords: 'projectAdd.keywords',
              description: 'projectAdd.description',
            },
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
