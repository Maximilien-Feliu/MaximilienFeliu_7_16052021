import { createStore } from 'vuex'

const axios = require('axios');

let instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
    isAdmin: '',
  };
} else {
    try {
      user = JSON.parse(user);
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } catch (ex) {
      user = {
        userId: -1,
        token: '',
        isAdmin: '',
      }
    }
}

export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {},
    users: []
  },
  mutations: {
    setStatus (state, status) {
      state.status = status;
    },
    logUser (state, user) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos (state, userInfos) {
      state.userInfos = userInfos;
    },
    allUsers (state, users) {
      state.users = users;
    }
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos) 
        .then((response) => {
          commit('setStatus', 'userCreated');
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
          commit('logUser', response.data);
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
    },
    getUserInfos: ({commit}) => {
      commit('setStatus', 'loading');
      instance.get(`/auth/${user.userId}`)
      .then((response) => {
        commit('userInfos', response.data);
      })
      .catch(() => {
        commit('setStatus', 'error_user');
      })
    },
    updateProfile: ({commit}, updateInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.put(`/auth/${user.userId}`, updateInfos) 
        .then((response) => {
          commit('setStatus', 'user_updated');
          commit('userInfos', response.data);
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            commit('setStatus', 'not_allowed_to_update');
            reject(error);

          } else if (error.response.status === 401) {
            commit('setStatus', 'error_update_regex');
            reject(error);

          } else {
            commit('setStatus', 'error_update');
            reject(error);
          }
        });
      });  
    },
    getAllUsers: ({commit}) => {
      commit('setStatus', 'loading');
      instance.get('/auth/')
      .then((response) => {
        commit('setStatus', 'succeed');
        commit('allUsers', response.data);
      })
      .catch(() => {
        commit('setStatus', 'error_users');
      })
    },
    createPost: ({commit}, postInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/post/', postInfos)
        .then((response) => {
          commit('setStatus', 'postCreated');
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            commit('setStatus', 'error_regex');
            reject(error);

          }  else {
            commit('setStatus', 'error_create');
            reject(error);
          } 
        })
      })
    }
  }
})
