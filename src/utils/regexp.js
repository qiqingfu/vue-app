/**
 * @author qiqingfu
 * @date 2020-01-10 16:43
 */

/**
 * 常用的一些正则匹配
 */

/**
 * 校验是否为 ip地址, 必须带端口号
 *
 * @type {RegExp}
 */
export const ipReg = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/;


/**
 * 校验是否为 域名地址
 *
 * @type {RegExp}
 * @example http://baidu.com
 * @example https://www.gogole.com
 */
export const domainReg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])?$/;


/**
 * Validate Function  =============================
 */

/**
 * 传输的是否为 ip 地址
 * @param ip
 * @returns {boolean}
 */
const isIp = ip => ipReg.test(ip);

/**
 * 传入的是否为域名
 * @param url
 * @returns {boolean}
 */
const isDomain = url => domainReg.test(url);


export default {
  constReg: {
    ipReg,
    domainReg,
  },
  verifyReg: {
    isIp,
    isDomain,
  },
};
