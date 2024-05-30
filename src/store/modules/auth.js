// store/modules/auth.js
import axios from 'axios';

export default {
  state: {
    token: null
  },
  getters: {
    isLoggedIn: state => !!state.token
  },
  actions: {
    login({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios.post('/api/user/login', userData)
          .then(response => {
            const token = response.data.token;
            commit('setToken', token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    register(_, userData) { // <-- Removed unused 'commit' parameter
      return new Promise((resolve, reject) => {
        axios.post('/api/user/register', userData)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      // You may want to store the token in localStorage or sessionStorage for persistence
      localStorage.setItem('token', token);
    }
  }
};
