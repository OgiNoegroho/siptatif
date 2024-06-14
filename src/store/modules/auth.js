import axios from 'axios';

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
        axios.post('https://express-mysql-virid.vercel.app/api/user/login', userData)
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
    register(_, userData) {
      return new Promise((resolve, reject) => {
        axios.post('https://express-mysql-virid.vercel.app/api/user/register', userData)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async fetchUser({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('https://express-mysql-virid.vercel.app/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data.success) {
          commit('setUser', data.user);
        } else {
          console.error('Failed to fetch user:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
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
