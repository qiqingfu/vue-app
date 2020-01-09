/**
 * @author qiqingfu
 * @date 2020-01-09 17:16
 */

const dev = require('./server/dev');
const prod = require('./server/prod');
const test = require('./server/test');

module.exports = {
  dev,
  prod,
  test,
};
