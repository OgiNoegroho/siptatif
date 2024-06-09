// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Assuming you've named your router file 'router.js' or 'router.ts'
import store from './store';    // Assuming you've named your store file 'store.js' or 'store.ts'
import 'primeicons/primeicons.css';  // Import PrimeIcons styles

const app = createApp(App);

app
  .use(router)
  .use(store)
  .mount('#app');
