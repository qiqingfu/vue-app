/**
 * @author qiqingfu
 * @date 2020-01-05 01:52
 */

/**
 * Vuex 入口文件
 */

import Vue from 'vue';
import Vuex from 'vuex';
import project from './modules/project';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    project,
  },
});
