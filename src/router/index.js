import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Import Vuex store

import MasterPage from '@/pages/layout/MasterPage.vue';
import HomePage from '@/pages/HomePage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import DosenPembimbing from '@/pages/DosenPembimbing.vue';
import DetailPembimbing from '@/pages/DetailPembimbing.vue';
import DosenPenguji from '@/pages/DosenPenguji.vue';
import DetailPenguji from '@/pages/DetailPenguji.vue';
import FileMahasiswa from '@/pages/FileMahasiswa.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ForgotPassword from '@/pages/ForgotPassword.vue';
import MahasiswaPage from '@/pages/MahasiswaPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import DosenPage from '@/pages/DosenPage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationPage
  },
  {
    path: '/layout',
    name: 'Layout',
    component: MasterPage,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage 
      },
      {
        path: '/dosen',
        name: 'DosenPage',
        component: DosenPage 
      },
      {
        path: '/dosen-pembimbing',
        name: 'DosenPembimbing',
        component: DosenPembimbing
      },
      {
        path: '/detail-pembimbing/:nip_pembimbing',
        name: 'DetailPembimbing',
        component: DetailPembimbing,
        props: true
      },
      {
        path: '/dosen-penguji',
        name: 'DosenPenguji',
        component: DosenPenguji
      },
      {
        path: '/detail-penguji/:nip_penguji',
        name: 'DetailPenguji',
        component: DetailPenguji,
        props: true
      },
      {
        path: '/file-mahasiswa/:nim',
        name: 'FileMahasiswa',
        component: FileMahasiswa,
        props: true
      },
      {
        path: '/mahasiswa',
        name: 'Mahasiswa',
        component: MahasiswaPage
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Define public pages that do not require authentication
const publicPages = ['Login', 'ForgotPassword', 'Registration'];

// Add navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn'];
  const authRequired = !publicPages.includes(to.name);

  if (authRequired && !isLoggedIn) {
    return next({ name: 'Login' });
  }

  next();
});

export default router;
