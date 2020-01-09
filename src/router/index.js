/**
 * @author qiqingfu
 * @date 2019-12-05 21:25
 */

import Router from 'vue-router';
import rules from '@/config/routes';
import { locales } from '@/config/site';
import hooks from './localeHook';

const routes = [];

/**
 * 注册多语言路由
 */
locales.forEach((locale) => {
  rules.forEach((rule) => {
    routes.push({
      ...rule,
      path: `/${locale}/${rule.path.replace(/\/+/, '')}`,
    });
  });
});

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


/**
 * 挂载钩子函数
 *
 * @param context {Array|Object}
 */
const installEach = (context) => {
  if (Array.isArray(context)) {
    context.forEach(hook => router.beforeEach(hook));
  } else {
    if (Array.isArray(context.beforeEach)) {
      context.beforeEach.forEach(hook => router.beforeEach(hook));
    }

    if (Array.isArray(context.afterEach)) {
      context.afterEach.forEach(hook => router.afterEach(hook));
    }
  }
};
installEach(hooks);

// 注册路由
const install = Vue => Vue.use(Router);

export {
  install,
  router,
};
