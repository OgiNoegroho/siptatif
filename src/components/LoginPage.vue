<template>
  <div class="container">
    <div class="logo-container">
      <img src="@/assets/images/logouin.png" alt="SIPTATIF Logo" class="logo-img">
      <h1>SIPTATIF</h1>
      <h2>Sistem Informasi Pendaftaran Tugas Akhir Mahasiswa Teknik Informatika</h2>
    </div>
    <div class="form-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label for="email">Masukkan Email Anda</label>
        <input type="email" v-model="loginData.email" id="email" required>
        <br>
        <label for="password">Password</label>
        <input type="password" v-model="loginData.password" id="password" required>
        <router-link to="/forgot-password" class="forgot-password">Forgot Password?</router-link>
        <div class="button-container">
          <button :disabled="isLoading" type="submit">
            <span v-if="isLoading">Loading...</span>
            <span v-else>Login</span>
          </button>
          <router-link to="/registration" class="register-button">Buat Akun</router-link>
        </div>
      </form>
      <p v-if="loginMessage" class="error-message">{{ loginMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const loginData = ref({ email: '', password: '' });
    const isLoading = ref(false);
    const loginMessage = ref('');
    const router = useRouter();
    const store = useStore();

    const login = async () => {
      isLoading.value = true;
      loginMessage.value = '';
      try {
        await store.dispatch('auth/login', loginData.value);
        router.push('/Home'); // Redirect to home page
      } catch (error) {
        loginMessage.value = 'An error occurred during login.';
        console.error('Error logging in:', error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      loginData,
      isLoading,
      loginMessage,
      login,
    };
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #234D20 !important;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh; 
}

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;

  }
}

@media only screen and (max-width: 768px) {
  .logo-container {
    margin-top: 50px;
    
    /* Menyembunyikan logo pada tampilan mobile */

  }
}

.logo-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  margin-right: 50px;
  order: -1;
  margin-bottom: 20px
}

.logo-img {
  width: 130px;
  margin-bottom: 20px;
}


h1, h2 {
  color: black;
}

h1 {
  font-size: 50px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

h2 {
  font-size: 14px;
  text-align: center;
  margin-bottom: 50px;
}

.form-container {
  background-color: #0A2244;
  padding: 40px;
  width: 40%; /* Adjust width */
  max-width: 500px; /* Add max-width */
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
  margin-right: 50px; /* Add some margin to the left */
}
@media only screen and (max-width: 768px) {
  .form-container {
    width: 70%; /* Adjust width for mobile */
    padding: 30px; /* Adjust padding for mobile */
    height: 70%;
    margin-bottom: 600px;
  }
}


.form-container h1 {
  color: white;
  font-size: 50px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
}

label {
  color: #ffffff;
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  background-color: #E6B861;
  color: #000000;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s; /* Add smooth transition */
}

a:hover {
  color: #ffffff; 
  transform: scale(1.20); 
}

.forgot-password {
  display: block;
  text-align: center;
  font-size: small;
  margin-top: 5px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-top: 5px;
}

button.register-button {
  width: auto; 
  padding: 10px 20px; 
}

.register-button {
  margin-left: 10px;
  display: block;
  text-align: center;
  font-size: small;
  margin-top: 15px;
}

.success-message {
  color: #28a745; /* Green color for success */
  background-color: #d4edda; /* Light green background */
  border: 1px solid #c3e6cb; /* Green border */
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}

.error-message {
  color: #dc3545; /* Red color for error */
  background-color: #f8d7da; /* Light red background */
  border: 1px solid #f5c6cb; /* Red border */
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}
</style>
