import axios from 'axios';

// Set Axios default base URL
axios.defaults.baseURL = 'https://express-mysql-virid.vercel.app/api';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || null,
    user: null
  },
  getters: {
    isLoggedIn: state => !!state.token,
    getUser: state => state.user
  },
  actions: {
    login({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios.post('/user/login', userData)
          .then(response => {
            const token = response.data.token;
            commit('setToken', token);
            commit('setUser', response.data.user);
            resolve();
          })
          .catch(error => {
            reject(error.response ? error.response.data : error.message);
          });
      });
    },
    register(_, userData) {
      return new Promise((resolve, reject) => {
        axios.post('/user/register', userData)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error.response ? error.response.data : error.message);
          });
      });
    },
    async fetchUser({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error fetching user:', error.response ? error.response.data : error.message);
      }
    },
    updateUser({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearAuthData');
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};
