/**
 * @author qiqingfu
 * @date 2020-01-05 01:53
 */
import store from 'storejs';
import {
  GET_PROJECTS,
  SAVE_PROJECTS,
  PROJECT_KEY,
} from '@/utils/constance';
import projectList from '@/mock/project/projectList';

const state = {
  projects: [],
};

const getters = {

};

const mutations = {
  [SAVE_PROJECTS](st, data) {
    st.projects = data;
  },
};

const actions = {
  [GET_PROJECTS]({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const res = projectList;
          commit(SAVE_PROJECTS, res);
          store(PROJECT_KEY, JSON.stringify(res));
          resolve();
        }, 1500);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default {
  namespaces: true,
  state,
  mutations,
  actions,
  getters,
};
