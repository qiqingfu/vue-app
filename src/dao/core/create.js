/**
 * @author qiqingfu
 * @date 2020-01-11 00:39
 */

/**
 * 根据 services 配置的服务器
 * 生成 api 中 config配置
 *
 * 默认支持
 * headers
 * params
 * response
 */

import extend from 'extend';
import service from '@/service/';

const mode = process.env.NODE_ENV;

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
 *
 * 默认初始化配置内容
 *
 * @type {{headers: {}, response: {}, params: {}}}
 */
const defaultOptions = {
  headers: {},
  params: {},
  response: {},
};


const cdef = () => {
  const conf = {};
  Reflect
    .ownKeys(server)
    .forEach((k) => {
      conf[k] = defaultOptions;
    });

  return conf;
};

/**
 * dev: {
 *   bin: {
 *     ip: xxxx,
 *     url: xxxx
 *   }
 * }
 *
 * res:
 * {
 *   '@bin': bin[type],
 *   '@bin-headers': {
 *     url: bin[type],
 *     headers() {
 *
 *     }
 *   }
 * }
 */
const generationMap = {
  headers(target, h) {
    return {
      url: target,
      headers(data) {
        return {
          ...h,
          ...data,
        };
      },
    };
  },
  params(target, p) {
    return {
      url: target,
      params(data) {
        return {
          ...p,
          ...data,
        };
      },
    };
  },
  response(target, r) {
    return {
      url: target,
      response(data) {
        return {
          ...r,
          ...data,
        };
      },
    };
  },
};

/**
 *
 * @param type {string} 连接服务器ip还是域名
 * @param opt
 *
 * @example
 * options: {
 *   bin: {
 *      headers: {
 *        key: '自定义bin请求头字段'
 *      },
 *      params: {
 *
 *      }
 *   }
 * }
 */
const gen = (type = 'ip', opt = {}) => {
  const conf = {};
  const options = extend(true, cdef(), opt);
  Object.keys(server).forEach((key) => {
    const target = server[key] && server[key][type];
    conf[`@${key}/`] = target;

    if (options[key]) {
      Object.keys(options[key]).forEach((field) => {
        const createFunc = generationMap[field];
        conf[`@${key}-${field}/`] = createFunc(target, options[key][field]);
      });
    }
  });

  return conf;
};

const createConf = (...args) => gen(...args);

export default createConf;
