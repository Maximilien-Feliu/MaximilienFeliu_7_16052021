import { createStore } from 'vuex'

const axios = require('axios');

let instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      token:'',
      isAdmin: '',
    },
  },
  mutations: {
    setStatus (state, status) {
      state.status = status;
    },
    logUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/auth/signup', userInfos) 
        .then((response) => {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            commit('setStatus', 'error_email');
            reject(error);
          } else if (error.response.status === 401) {
            commit('setStatus', 'error_regex');
            reject(error);
          } else if (error.response.status === 429) {
            commit('setStatus', 'error_too_many');
            reject(error);
          } else {
            commit('setStatus', 'error_create');
            reject(error);
          }
        });
      })
    },
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos) 
        .then((response) => {
          commit('setStatus', 'loggedIn');
          commit('logUser', response.data)
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            commit('setStatus', 'user_not_found');
            reject(error);
          } else if (error.response.status === 401) {
            commit('setStatus', 'error_login_regex');
            reject(error);
          } else if (error.response.status === 429) {
            commit('setStatus', 'error_blocked');
            reject(error);
          } else {
            commit('setStatus', 'error_login');
            reject(error);
          }
        });
      })
    }
  },
  modules: {
  }
})
