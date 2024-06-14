import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import 'primeicons/primeicons.css';

const app = createApp(App);

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app
  .use(router)
  .use(store)
  .mount('#app');
