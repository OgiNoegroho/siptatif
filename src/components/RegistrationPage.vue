<template>
  <div class="container">
    <div class="form-container">
      <h1>Sign Up</h1>
      <h2>Untuk Membuat Akun, Silahkan Isi Data berikut</h2>
      <form @submit.prevent="register">
        <!-- Form fields -->
        <label for="name">Masukkan Nama Anda</label>
        <input type="text" v-model="name" id="name" required>
        <br>
        <label for="nim">NIM/NIS</label>
        <input type="text" v-model="nim" id="nim" required>
        <br>
        <label for="umur">Umur</label>
        <input type="number" v-model="umur" id="umur" required>
        <br>
        <label for="tempatTanggalLahir">Tempat/Tanggal Lahir</label>
        <input type="text" v-model="tempatTanggalLahir" id="tempatTanggalLahir" required>
        <br>
        <label for="alamat">Alamat</label>
        <input type="text" v-model="alamat" id="alamat" required>
        <br>
        <label for="jenisKelamin">Jenis Kelamin</label>
        <select v-model="jenisKelamin" id="jenisKelamin" required>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        <br>
        <label for="email">Masukkan Email Anda</label>
        <input type="email" v-model="email" id="email" required>
        <br>
        <label for="password">Password Anda</label>
        <input 
          type="password" 
          v-model="password" 
          id="password" 
          :class="{ 'error-input': isPasswordMismatch }"
          required
        >
        <br>
        <label for="confirm-password">Konfirmasi Ulang Password Anda</label>
        <input 
          type="password" 
          v-model="confirmPassword" 
          id="confirm-password" 
          :class="{ 'error-input': isPasswordMismatch }"
          required
        >
        <br>
        <button :disabled="isLoading" type="submit">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Buat Akun</span>
        </button>
      </form>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="isPasswordMismatch" class="error-message">Password dan konfirmasi password tidak cocok</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: '',
      nim: '',
      umur: '',
      tempatTanggalLahir: '',
      alamat: '',
      jenisKelamin: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      successMessage: '',
      errorMessage: '',
      isPasswordMismatch: false
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.isPasswordMismatch = true;
        this.errorMessage = 'Password dan konfirmasi password tidak cocok';
        return;
      }

      this.isLoading = true;

      const userData = {
        name: this.name,
        nim: this.nim,
        umur: this.umur,
        tempatTanggalLahir: this.tempatTanggalLahir,
        alamat: this.alamat,
        jenisKelamin: this.jenisKelamin,
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch('registerUser', userData);
        
        this.successMessage = 'Akun berhasil dibuat! Anda akan diarahkan ke halaman login...';

        setTimeout(() => {
          this.$router.push({ name: 'Login' });
        }, 3000);
      } catch (error) {
        this.errorMessage = 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #234D20;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.form-container {
  /* background-color: #0A2244; */
  padding: 20px;
  width: 40%;
  border-radius: 25px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

h1 {
  font-size: 50px;
  text-align: center;
  margin-bottom: 10px;
  color: #0A2244;
}

h2 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
  color: #0A2244;
}

label {
  color: #000000;
  display: block;
  margin-bottom: 1px;
  margin-top: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #2F3F7A;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
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

button {
  background-color: #0A2244;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  color: #28a745; /* Green color for success */
  background-color: #d4edda; /* Light green background */
  border: 1px solid #c3e6cb; /* Green border */
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}

.success-message-icon {
  margin-right: 5px;
}


.error-input {
  border-color: red;
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

.error-message-icon {
  margin-right: 5px;
}
</style>

