/**
 * @author qiqingfu
 * @date 2020-01-06 22:21
 */

import {
  isSupport,
  find,
  getCookieLanguage,
  getBrowserLanguage,
  setAsyncLocale,
} from '@/locales/';

import { locale } from '@/config/site';

export default [
  /**
   * 语言兼容大小写
   *
   * @param path
   * @param query
   * @param hash
   * @param from
   * @param next
   * @returns {boolean|*}
   */
  ({ path, query, hash }, from, next) => {
    const lang = path.split('/')[1];

    /**
     * @example
     * 当前支持的路由 /zh-cn/setting/user
     * 手动在浏览器输入的路由 /ZH-cn/setting/user
     * 兼容结果 - /zh/cn/setting/user
     */
    if (!isSupport(lang) && find(lang)) {
      return next({
        path: `/${find(lang)}/${path.slice('/')[2].join('/') || ''}`,
        query,
        hash,
        replace: true,
      });
    }

    next();
    return true;
  },

  /**
   * 初始化语言
   *
   * @param path
   * @param query
   * @param hash
   * @param from
   * @param next
   */
  ({ path, query, hash }, from, next) => {
    let lang = path.split('/')[1] || '';
    if (!isSupport(lang)) {
      if (isSupport(getCookieLanguage())) {
        lang = getCookieLanguage();
      } else {
        lang = getBrowserLanguage();
      }

      return next({
        path: `/${lang}/${path.replace(/\/+/g, '')}`,
        query,
        hash,
      });
    }

    setAsyncLocale(lang || locale);
    return next();
  },
];
