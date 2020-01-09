/**
 * @author qiqingfu
 * @date 2020-01-09 11:02
 */
import Vue from 'vue';
import {
  GET_USER_INFO,
  SAVE_USER_INFO,
} from '@/utils/constance';

const state = {
  info: null,
};

const mutations = {
  [SAVE_USER_INFO](st, data) {
    Vue.set(st, 'info', data);
  },
};

const actions = {
  [GET_USER_INFO]({ commit }) {
    commit(SAVE_USER_INFO, {
      name: 'qiqf',
      github: 'https://github.com/qiqingfu',
    });
  },
};

const getters = {

};

export default {
  namespaces: true,
  state,
  mutations,
  actions,
  getters,
};
