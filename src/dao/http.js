/**
 * 统一封装请求方法, 设置请求和响应拦截器
 * 并对外提供插件注册的方式
 */

import axios from 'axios';
import { transformLang } from '@/utils/tools';
import regexp from '@/utils/regexp';
import { i18n } from '@/locales';
import {
  config as api,
  options,
  error,
  transformResponse,
} from './api';

const { isIp, isDomain } = regexp.verifyReg;

console.log('api', api);

// axios 实例
const Http = axios.create(options);

/**
 * 更新服务器ip地址
 *
 * @param {string} url
 * @return {string}
 *
 * @example
 * url: https://baidu.com
 * res: https://baidu.com
 *
 * @example
 * url: 34.193.212.251:443
 * res: https://34.193.212.251:443
 *
 * @example
 * url: 34.193.212.251:80
 * res: http://34.193.212.251:80
 */
const updateServer = (url) => {
  if (isDomain(url) && !isIp(url)) {
    return url;
  }
  const port = url.split(':')[1] || 80;
  return port === '443'
    ? `https://${url}/`
    : `http://${url}`;
};

/**
 * 匹配接口配置, 返回预期对象
 * @param {string} url - 请求的url
 * @return {null|Object} 预期对象
 *
 * @example
 * url - @httpbin/active
 * result - {
 *   url: '服务器ip地址或域名',
 *   key: ''@httpbin',
 *   headers?: Function
 *   params?: Function
 *   response?: Function
 * }
 */
const match = (url) => {
  let result = null;

  Object.keys(api).some((key) => {
    if (url.indexOf(key) === 0) {
      result = typeof api[key] === 'string'
        ? { url: updateServer(api[key]), key }
        : Object.assign({}, api[key], { key }, { url: updateServer(api[key].url) });

      return true;
    }
    return false;
  });

  return result;
};

/**
 *
 * @param target {Object} 目标数据
 * @param data   {Object} 原始数据
 * @param args   {Object} 方法参数
 * @return {Object}
 */
const mergeObject = (target, data, args) => {
  if (typeof target === 'undefined') {
    return { ...data };
  }

  if (typeof target === 'object') {
    return {
      ...target,
      ...data,
    };
  }

  if (typeof target === 'function') {
    return target(data, args);
  }

  return {};
};

/**
 * 请求拦截器
 */
Http.interceptors.request.use((config) => {
  const matched = match(config.url);

  // 添加国际化
  config.headers = {
    'Accept-Language': transformLang(i18n.locale),
    ...config.headers,
  };

  // 处理链接替换, 保留一个链接原名
  if (matched) {
    config.urlalias = config.url;
    config.url = config.url.replace(matched.key, matched.url);

    // 处理headers
    config.headers = mergeObject(matched.headers, config.headers, config);

    // 处理params
    config.params = mergeObject(matched.params, config.params, config);
  }

  return config;
});

/**
 * 响应拦截器
 * 触发自定义的 response 钩子函数
 */
Http.interceptors.response.use((res) => {
  const data = transformResponse(res);

  // 解析url链接别名
  const matched = res && res.config && res.config.urlalias ? match(res.config.urlalias) : null;
  if (matched && typeof matched.response === 'function') {
    return matched.response(data, res);
  }

  return data;
}, err => error(err));

/**
 * 将 http 请求方法挂载到原型对象, 所有组件通过 this.$http
 *
 * @param Vue {Object} - Vue构造器
 */
const install = (Vue) => {
  Vue.prototype.$http = Http;
};

/**
 * get 请求方法
 * @param args
 * @return {Promise}
 */
const get = (...args) => Http.get(...args);

/**
 * post 请求方法
 * @param args
 */
const post = (...args) => Http.post(...args);

export {
  Http,
  install,
  get,
  post,
};
