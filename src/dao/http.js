/**
 * 统一封装请求方法, 设置请求和响应拦截器
 * 并对外提供插件注册的方式
 */

import axios from 'axios';
import { transformLang } from '@/utils/tools';
import { i18n } from '@/locales';
import {
  config as api,
  options,
  error,
  transformResponse,
} from './api';

// axios 实例
const Http = axios.create(options);

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
        ? { url: api[key], key }
        : { ...api[key], key };

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
    config.url = config.url.replace(matched.keepAlive, matched.url);

    // 处理headers
    config.headers = mergeObject(matched.headers, config.headers, config);

    // 处理params
    config.params = mergeObject(matched.params, config.params, config);
  }

  return config;
});
