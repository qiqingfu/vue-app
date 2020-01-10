/**
 * @author qiqingfu
 * @date 2020-01-09 17:47
 */
import service from '@/service/';

const mode = process.env.NODE_ENV;
const key = 'ip';

/**
 * 获取 service 下不同环境的服务器地址
 *
 * @type {*|null}
 */
const server = service[mode] || null;

if (!server) {
  throw new Error(`
    server is ${server}
  `);
}

/**
 * 接口配置, 结合 service
 *
 * @type {Object}
 */
export const config = {
  '@httpbin': server.httpbin[key],

  '@httpbin-headers': {
    url: server.httpbin[key],

    // 自定义统一的 headers
    headers(headers) {
      return {
        customizing: 'qqf-header',
        ...headers,
      };
    },
  },

  '@httpbin-params': {
    url: server.httpbin[key],

    // 自定义统一参数
    params(params) {
      return {
        customizing: 'qqf-params',
        ...params,
      };
    },
  },

  '@httpbin-response': {
    url: server.httpbin[key],

    // 自定义统一返回值
    response(res) {
      return {
        customizing: 'qqf-response',
        ...res,
      };
    },
  },
};

/**
 * axios 实例化参数
 *
 * @type {Object}
 */
export const options = {
  timeout: 10000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
  emulateJSON: true,
};

/**
 * 错误处理方法
 *
 * @param err
 * @returns {{trace: (*), code: number, data: null, success: boolean, message: string}}
 */
export const error = err => ({
  success: false,
  code: 500,
  message: '访问出错, 请稍后重试',
  data: null,
  trace: err.stack ? err.stack : err,
});

/**
 *
 * @param {Object} res
 */
export const transformResponse = (res) => {
  const data = res.request && res.config ? res.data : res;

  // 判断 JSON 数据格式的正确性
  if (typeof data !== 'object' || Array.isArray(data)) {
    return error('数据响应格式不正确');
  }

  // 封装后端 Response Schema
  // 具体需要根据后端而定
  return {
    success: data.success || data.status === 'ok' || data.code === 200 || data.errcode === 0 || !!data,
    data,
    code: data.code,
    message: data.message,
    _source: data,
  };
};
