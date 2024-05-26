import { createRouter, createWebHistory } from 'vue-router';
import LayoutPage from '@/components/LayoutPage.vue';
import HomePage from '@/components/HomePage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import DosenPembimbing from '@/components/DosenPembimbing.vue';
import DetailPembimbing from '@/components/DetailPembimbing.vue';
import DosenPenguji from '@/components/DosenPenguji.vue';
import DetailPenguji from '@/components/DetailPenguji.vue';
import FileMahasiswa from '@/components/FileMahasiswa.vue';
import LoginPage from '@/components/LoginPage.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import MahasiswaPage from '@/components/MahasiswaPage.vue';
import RegistrationPage from '@/components/RegistrationPage.vue';
import DosenPage from '@/components/DosenPage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/Forgot-password',
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
    name: 'layout',
    component: LayoutPage,
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfilePage 
      },
      {
        path: '/dosen',
        name: 'DosenPagee',
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

export default router;
