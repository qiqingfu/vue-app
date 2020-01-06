/**
 * @author qiqingfu
 * @date 2020-01-06 20:20
 */
const cookie = require('js-cookie');

// https 环境, cookie设置为安全模式
if (window.location.protocol === 'https:') {
  cookie.defaults.secure = true;
}

cookie.install = (Vue) => {
  Vue.prototype.$cookie = cookie;
};

export default cookie;
