<template>
  <div class="container">
    <div v-if="!isResettingPassword" class="reset-password-container">
      <h1>Lupa Password</h1>
      <h5>Anda Lupa dengan Password Anda?</h5>
      <input type="email" v-model="email" class="input-field" placeholder="Masukkan Email">
      <button @click="sendRecoveryLink" class="button">Kirimkan Link Pemulihan</button>
      <p><router-link to="/" class="back-to-login-link">Login Kembali</router-link></p>
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>
    
    <div v-else class="reset-password-container">
      <h1>Reset Password</h1>
      <input type="password" v-model="newPassword" class="input-field" placeholder="Masukkan Password Baru">
      <button @click="resetPassword" class="button">Reset Password</button>
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      newPassword: '',
      message: '',
      messageClass: '',
      isResettingPassword: false,
      token: ''
    };
  },
  methods: {
    async sendRecoveryLink() {
      if (!this.email) {
        this.message = 'Please enter a valid email address.';
        this.messageClass = 'error-message';
        return;
      }

      try {
        const response = await fetch('https://express-mysql-virid.vercel.app/api/user/request-password-reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email })
        });

        const data = await response.json();

        if (data.success) {
          this.token = data.token;
          this.isResettingPassword = true;
          this.message = 'Please enter your new password.';
          this.messageClass = 'success-message';
        } else {
          this.message = data.message || 'An error occurred while sending the recovery link.';
          this.messageClass = 'error-message';
        }
      } catch (error) {
        console.error('Error sending recovery link:', error);
        this.message = 'An error occurred while sending the recovery link.';
        this.messageClass = 'error-message';
      }
    },
    async resetPassword() {
      if (!this.newPassword) {
        this.message = 'Please enter a new password.';
        this.messageClass = 'error-message';
        return;
      }

      try {
        const response = await fetch('https://express-mysql-virid.vercel.app/api/user/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: this.token, newPassword: this.newPassword })
        });

        const data = await response.json();

        if (data.success) {
          this.message = 'Password has been reset successfully!';
          this.messageClass = 'success-message';
          
          // Redirect to the login page after a short delay
          setTimeout(() => {
            this.$router.push('/');
          }, 2000); // 2 second delay before redirecting
        } else {
          this.message = data.message || 'An error occurred while resetting the password.';
          this.messageClass = 'error-message';
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        this.message = 'An error occurred while resetting the password.';
        this.messageClass = 'error-message';
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 95%;
  padding: 10px;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border: 1px solid #ccc;
  margin-top: 150px;
  margin-bottom: 150px;
}

.reset-password-container h1 {
  text-align: center;
  margin-bottom: 18px;
}

.reset-password-container h5 {
  text-align: center;
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #2F3F7A;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #0A2244;
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
  color: #0A2244;
}

.success-message {
  color: #28a745;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}
</style>
