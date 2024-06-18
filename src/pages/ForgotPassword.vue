<template>
  <div class="login-container">
    <h1>Lupa Password</h1>
    <h5>Anda Lupa dengan Password Anda?</h5>
    <input type="email" v-model="email" class="email-input" placeholder="Masukkan Email">
    <button @click="sendRecoveryLink" class="forgot-password-link">Kirimkan Link Pemulihan</button>
    <p><router-link to="/" class="back-to-login-link">Login Kembali</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    };
  },
  methods: {
    sendRecoveryLink() {
      // Handle sending recovery link logic here, e.g., send email to the provided email
      console.log('Email:', this.email);
      // Redirect or handle recovery link logic
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}

.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 100px;
  border: 1px solid #ccc;
  border-radius: 35px;
  margin-top: 150px;
}

.login-container h1{
  text-align: center;
  margin-bottom: 18px;
  color:#0A2244;
}

.email-input {

  width: 90%;
  padding: 10px;
  border-radius: 10px;
  margin: 30px 0 30px 0;

}

.forgot-password-link {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #2F3F57;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-to-login-link {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: #5F7A2F;
}
</style>
