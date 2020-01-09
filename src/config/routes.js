const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: () => import(/* webpackChunkName: "page-index" */'@/pages/Index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard.title',
          keywords: 'dashboard.keywords',
          description: 'dashboard.description',
          preload: 'userinfo', // 预加载用户数据, 存储在 Vuex 中
        },
        component: () => import(/* webpackChunkName: "page-dashboard-index" */'@/pages/dashboard/Index.vue'),
      },
      {
        path: 'http',
        name: 'http',
        component: () => import(/* webpackChunkName: "http" */'@/pages/http/Index.vue'),
      },
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
    path: '/project',
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page-404" */'@/pages/404.vue'),
  },
];

export default routes;
