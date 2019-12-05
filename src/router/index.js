/**
 * @author qiqingfu
 * @date 2019-12-05 21:25
 */

import Router from 'vue-router';
import routes from '@/config/routes';

const router = new Router({
  mode: 'history',
  routes,
  fallback: false,
  scrollBehavior(to, form, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }

    return savedPosition || { x: 0, y: 0 };
  },
});

// 注册路由
const install = Vue => Vue.use(Router);

export {
  install,
  router,
};
