/**
 * @author qiqingfu
 * @date 2020-01-05 01:53
 */
import store from 'storejs';
import extend from 'extend';
import {
  GET_PROJECTS,
  SAVE_PROJECTS,
  SET_COMPLETE,
  UPDATE_PROJECTS,
  CREATE_PROJECT,
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
  [UPDATE_PROJECTS](st, data) {
    st.projects = data;
  },
};

const actions = {
  [GET_PROJECTS]({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          let res;
          const local = store.has(PROJECT_KEY);
          if (local) {
            res = JSON.parse(store(PROJECT_KEY));
          } else {
            res = projectList;
          }
          commit(SAVE_PROJECTS, res);
          store(PROJECT_KEY, JSON.stringify(res));
          resolve();
        }, 1500);
      } catch (e) {
        reject(e);
      }
    });
  },
  [SET_COMPLETE](st, { id }) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const projects = extend(true, st.state.projects);
          projects.forEach((project) => {
            if (project.id === id) {
              project.Completed = project.Completed ? 0 : 1;
            }
          });
          store(PROJECT_KEY, JSON.stringify(projects));
          st.commit(UPDATE_PROJECTS, projects);
          resolve();
        }, 200);
      } catch (e) {
        reject(e);
      }
    });
  },
  [CREATE_PROJECT](st, data) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const projects = extend(true, st.state.projects);
          const ids = st.state.projects.map(project => project.id);
          const maxId = Math.max.apply(null, ids) + 1;
          data.id = maxId;
          projects.push(data);
          store(PROJECT_KEY, JSON.stringify(projects));
          st.commit(UPDATE_PROJECTS, projects);
          resolve();
        }, 1000);
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
