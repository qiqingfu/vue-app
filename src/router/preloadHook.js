/**
 * @author qiqingfu
 * @date 2020-01-09 11:12
 */

/**
 * @file 根据路由配置提前加载加载数据，配合 vuex 处理，在组件页面中 watch 监听
 */

import Store from '@/store';
import { GET_USER_INFO } from '@/utils/constance';

export default [
  (to, from, next) => {
    // 如果路由中没有预加载标识
    if (!to.meta || !to.meta.preload) {
      return next();
    }

    const { preload } = to.meta;

    // 如果当前 Vuex中的数据为空
    if ((preload.userinfo || preload.includes('userinfo')) && Store.state.user.info === null) {
      Store.dispatch(GET_USER_INFO);
    }

    return next();
  },
];
