/**
 * @author qiqingfu
 * @date 2019-11-17 22:37
 */
module.exports = {
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
