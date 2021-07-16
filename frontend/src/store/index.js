import { createStore } from 'vuex'

const axios = require('axios');

let instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      commit;
      instance.post('/auth/signup', userInfos) 
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  modules: {
  }
})
