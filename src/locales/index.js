/**
 * @author qiqingfu
 * @date 2020-01-06 20:17
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import cookie from '@/utils/cookies';
import { locales } from '@/config/site';
import { COOKIE_LANG_KEY } from '@/utils/constance';

Vue.use(VueI18n);


/**
 * 国际化实例
 *
 * @type {VueI18n}
 */
const i18n = new VueI18n({
  silentTranslationWarn: true,
});

/**
 * 缓存已经加载的语言
 *
 * @type {Array}
 */
i18n.loadedLanguages = [];

/**
 * 当前支持的语言列表
 *
 * @type {Array}
 */
i18n.locales = locales;

/**
 * 获取浏览器支持的语言
 *
 * @returns {null|string}
 */
const getBrowserLanguage = () => {
  const language = navigator.appName === 'Netscape'
    ? navigator.language
    : navigator.browserLanguage;
  const index = locales.findIndex(locale => language.indexOf(locale.split('-')[0] > -1));

  return index > -1 ? locales[index] : null;
};

/**
 * 获取 cookie中的语言标识
 */
const getCookieLanguage = () => cookie.get(COOKIE_LANG_KEY);

/**
 * 判断语言是否支持
 *
 * @param locale
 * @returns {*|boolean}
 */
const isSupport = locale => locale && locales.includes(locale);

/**
 * 替换链接中的语言标识
 *
 * @param path - 路径链接
 * @param lang - 追加语言, 默认为当前语言
 */
const replace = (path, lang = i18n.locale) => {
  const paths = path
    .replace(/^[\\/]+/, '')
    .split(/\/+/);

  // paths - ['zh-en', 'login']
  if (isSupport(paths[0])) {
    paths.splice(0, 1);
  }

  return lang ? `/${lang}/${paths.join('/')}` : `/${paths.join('/')}`;
};

/**
 * 修正语言, 如果用户恶意在 url中修改当前系统不支持的语言, 则进行一遍查询并修正
 *
 * @type {string} lang - 目标语言
 * @type {null|string} result - 修正后的语言
 */
const find = (lang = '') => {
  let result = null;

  locales.some((locale) => {
    // 目标完全一致
    if (locale === lang) {
      result = lang;
      return true; // 结束遍历
    }
    if (locale.toUpperCase() === lang.toUpperCase()) {
      result = lang;
      return true;
    }
    return false;
  });

  return result;
};

/**
 * 获取完整路径替换语言
 *
 * @param {string} locale - 目标语言
 * @returns {string}
 */
const getFullPath = (locale = i18n.locale) => {
  const url = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  return replace(url, locale);
};

/**
 * 异步加载语言包
 *
 * @param {string} locale - 目标语言
 */
const setAsyncLocale = (locale = '') => {
  // 优先设置语言包, 让其他地方可以使用
  i18n.locale = locale;

  // 设置 Cookie 语言
  cookie.set(COOKIE_LANG_KEY, locale);

  // 目标语言没有在 loadedLanguages 缓存中
  if (!i18n.loadedLanguages.includes(locale)) {
    import(/* webpackChunkName: lang-[request] */`@/locales/${locale}/index.js`)
      .then((data) => {
        // 设置语言环境的 locale信息
        i18n.setLocaleMessage(locale, data);
        i18n.locale = locale;
        i18n.loadedLanguages.push(locale);
      });
  }
};

/**
 * 重定向语言链接
 *
 * @param locale
 */
const redirecTo = (locale) => {
  cookie.set(COOKIE_LANG_KEY, locale);

  // 跳转链接
  window.location.href = getFullPath(locale);
};

/**
 * 设置语言
 */
i18n.setLocale = ({ locale = '', redirect = true } = {}) => {
  // 如果目标语言不支持, 则忽略
  if (!locales.includes(locale)) {
    return false;
  }

  if (redirect) {
    redirecTo(locale);
  } else {
    window.history.pushState(null, '', getFullPath(locale));
    setAsyncLocale(locale);
  }

  return true;
};

export {
  i18n,
  isSupport,
  setAsyncLocale,
  getCookieLanguage,
  getBrowserLanguage,
  replace,
  find,
};
