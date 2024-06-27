<template>
  <div class="container-gradient-background">
    <div class="form-container">
      <div class="logo-title-container">
        <img src="@/assets/images/logouin.png" alt="SIPTATIF Logo" class="logo-img">
        <br>
        <h2 class="animated-text">Sistem Informasi Pengajuan Tugas Akhir</h2>
        <h2 class="animated-text">Teknik Informatika</h2>
      </div>
      <br>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label for="email">Masukkan Email Anda</label>
        <input type="email" v-model="loginData.email" id="email" required>
        <br>
        <label for="password">Password</label>
        <div class="password-container">
          <input :type="passwordFieldType" v-model="loginData.password" id="password" required>
          <i :class="passwordToggleIcon" @click="togglePasswordVisibility"></i>
        </div>
        <router-link to="/forgot-password" class="forgot-password">Forgot Password?</router-link>
        <div class="button-container">
          <button :disabled="isLoading" type="submit">
            <span v-if="isLoading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </div>
        <div class="divider"><span>or</span></div>
        <div class="button-container">
          <router-link to="/registration" class="register-button">Create Account</router-link>
        </div>
      </form>
      <p v-if="loginMessage" class="error-message">{{ loginMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
    const successMessage = ref('');
    const passwordFieldType = ref('password');
    const passwordToggleIcon = ref('pi pi-eye-slash');
    const router = useRouter();
    const store = useStore();

    const togglePasswordVisibility = () => {
      if (passwordFieldType.value === 'password') {
        passwordFieldType.value = 'text';
        passwordToggleIcon.value = 'pi pi-eye';
      } else {
        passwordFieldType.value = 'password';
        passwordToggleIcon.value = 'pi pi-eye-slash';
      }
    };

    const login = async () => {
      isLoading.value = true;
      loginMessage.value = '';
      successMessage.value = '';
      try {
        await store.dispatch('auth/login', loginData.value);
        successMessage.value = 'Login successful! Redirecting...';
        setTimeout(() => {
          router.push('/Home'); // Redirect to home page
        }, 2000); // Delay of 2 seconds
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
      successMessage,
      login,
      passwordFieldType,
      passwordToggleIcon,
      togglePasswordVisibility
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Poppins', sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000 !important;
  overflow: hidden; /* Ensure no scrolling */
}

.container-gradient-background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(180deg, #0A2244, #1d3557, #457b9d, #f1faee);
  background-size: 100% 300%;
  animation: gradient-animation 5s ease infinite alternate-reverse;
  width: 100%;
  height: 100%;
  position:absolute;/* Use absolute positioning */
  top: 0;
  left: 0;
  right: 100px;
  z-index: -1;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}

@keyframes fadeInSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.animated-text {
  display: inline-block;
  font-size: 16px;
  animation: fadeInSlideUp 4s ease-in-out infinite;
}

.logo-title-container {
  text-align: center;
  margin-bottom: 20px; /* Reduced margin */
}

.logo-img {
  width: 80px; /* Adjusted size for smaller borders */
}

h2 {
  color: black;
  font-size: 12px; /* Adjusted size for smaller borders */
  margin: 0;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.3); /* More transparent background */
  backdrop-filter: blur(25px); /* Increased blur effect */
  border: 1px solid rgba(255, 255, 255, 0.5); /* Light border for glass effect */
  padding: 10px;
  width: 70%;
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  z-index: 1;
}

.form-container h1 {
  color: #000000;
  font-size: 20px; /* Adjusted size */
  margin-top: 5px;
  margin-bottom: 10px;
}

label {
  color: black;
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
}

input[type="email"], input[type="password"], input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #464646;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  font-size: 14px; /* Adjusted size */
}

.password-container {
  display: flex;
  align-items: center;
  position: relative;
}

.password-container input {
  padding-right: 33px; /* Padding to ensure space between text and icon */
}

.password-container i {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

button {
  background-color: #023047;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
  width: 70%;
  box-sizing: border-box;
  font-size: 14px; /* Adjusted size */
}

a {
  color: #000000;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s; /* Add smooth transition */
}

a:hover {
  color: #000000; 
  transform: scale(1.20); 
}

.forgot-password {
  display: block;
  text-align: center;
  font-size: small;
  margin-top: 5px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 8px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #b4b4b4;
}

.divider::before {
  margin-right: 10px;
}

.divider::after {
  margin-left: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-top: 5px;
}

.register-button {
  margin-left: 10px;
  display: block;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
  width: 100%; /* Adjusted width */
  padding: 10px 20px; /* Adjusted padding */
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

/* Media Query for Mobile Devices */
@media (max-width: 600px) {
  .form-container {
    width: 90%; /* Increased width for better use of space */
    padding: 15px; /* Adjusted padding for better mobile experience */
  }

  .form-container h1 {
    font-size: 18px; /* Adjusted size */
  }

  button {
    width: 100%; /* Full width for buttons */
    padding: 10px; /* Adjusted padding */
    font-size: 16px; /* Slightly increased size */
  }

  input[type="email"], input[type="password"], input[type="text"] {
    padding: 10px; /* Increased padding for better touch experience */
    font-size: 16px; /* Slightly increased size */
  }

  .animated-text {
    font-size: 14px; /* Adjusted size for better readability */
  }

  .divider {
    margin: 10px 0; /* Adjusted margin */
  }
}
</style>
