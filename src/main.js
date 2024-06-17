import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import 'primeicons/primeicons.css';

const app = createApp(App);

// Set up Axios
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'https://express-mysql-virid.vercel.app/api';

// Set up Axios interceptors for Authorization
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle global Axios errors
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    // Token might have expired or be invalid
    store.dispatch('auth/logout');
    router.push('/login');
  }
  return Promise.reject(error);
});

app
  .use(router)
  .use(store)
  .mount('#app');
