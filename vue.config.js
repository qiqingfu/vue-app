/**
 * @author qiqingfu
 * @date 2019-11-17 22:37
 */

const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StylelintPlugin({
        configFile: path.join(__dirname, '/.stylelintrc'),
        quiet: false,
        lintDirtyModulesOnly: true,
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/base/_variables.scss";
          @import "@/styles/base/_mixins.scss";
        `,
      },
    },
  },
};
