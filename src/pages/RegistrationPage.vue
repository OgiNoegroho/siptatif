<template>
  <div class="container">
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <div class="password-container">
            <input :type="passwordFieldType" id="password" v-model="password" required>
            <span class="toggle-password" @click="togglePasswordVisibility">
              <i :class="passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </span>
          </div>
        </div>
        <div>
          <label for="name">Nama:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div>
          <label for="nip">NIP:</label>
          <input type="text" id="nip" v-model="nip" required @input="validateNip">
        </div>
        <div>
          <label for="birthplace">Tempat Lahir:</label>
          <select id="birthplace" v-model="birthplace" required>
            <option value="" disabled></option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div>
          <label for="birthdate">Tanggal Lahir:</label>
          <input type="date" id="birthdate" v-model="birthdate" required>
        </div>
        <div>
          <label for="age">Umur:</label>
          <input type="number" id="age" :value="calculatedAge" readonly>
        </div>
        <div>
          <label for="address">Alamat:</label>
          <input type="text" id="address" v-model="address" required>
          <small class="address-note">Format: JL. Taman Karya No.10</small>
        </div>
        <div>
          <label for="gender">Jenis Kelamin:</label>
          <select id="gender" v-model="gender" required>
            <option value="Male">Laki-Laki</option>
            <option value="Female">Perempuan</option>
          </select>
        </div>
      
        <div class="button-container">
          <span class="login-link" @click="redirectToLogin">Kembali ke login page</span>
          <button type="submit" class="register-button">Register</button>
        </div>
      </form>
      <p ref="registerMessage" v-if="registerMessage" :class="registerMessage.includes('error') ? 'error-message' : 'success-message'">
        {{ registerMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      nip: '',
      birthplace: '',
      birthdate: '',
      address: '',
      gender: '',
      registerMessage: '',
      cities: [
        'Jakarta', 'Surabaya', 'Bandung', 'Bekasi', 'Medan', 'Depok', 'Tangerang', 'Semarang', 'Palembang', 
        'South Tangerang', 'Makassar', 'Batam', 'Pekanbaru', 'Bogor', 'Bandar Lampung', 'Padang', 'Malang', 
        'Denpasar', 'Samarinda', 'Tasikmalaya', 'Pontianak', 'Banjarmasin', 'Balikpapan', 'Jambi', 
        'Surakarta', 'Mataram', 'Manado', 'Yogyakarta', 'Kupang', 'Cilegon', 'Ambon', 'Jayapura'
      ],
      passwordVisible: false
    };
  },
  computed: {
    calculatedAge() {
      if (!this.birthdate) return '';
      const birthDate = new Date(this.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    passwordFieldType() {
      return this.passwordVisible ? 'text' : 'password';
    }
  },
  methods: {
    validateNip() {
      this.nip = this.nip.replace(/\D/g, '');
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    redirectToLogin() {
      this.$router.push('/'); // Redirect to login page
    },
    register() {
      const age = this.calculatedAge; // Calculate the age

      const registerData = {
        email: this.email,
        password: this.password,
        name: this.name,
        nip: this.nip,
        birthplace: this.birthplace,
        birthdate: this.birthdate,
        address: this.address,
        gender: this.gender,
        age: age // Include age in the data sent to the server
      };

      fetch('https://express-mysql-virid.vercel.app/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      })
      .then(response => response.json())
      .then(data => {
        this.registerMessage = data.message;
        nextTick(() => {
          this.scrollToMessage();
        });
        if (data.success) {
          setTimeout(() => {
            this.$router.push('/'); // Redirect to login page after delay
          }, 3000); // 3-second delay
        }
      })
      .catch(error => {
        console.error('Error registering:', error);
        this.registerMessage = 'An error occurred while registering.';
        nextTick(() => {
          this.scrollToMessage();
        });
      });
    },
    scrollToMessage() {
      const messageElement = this.$refs.registerMessage;
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: #234D20;
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 95%;
  padding: 10px;
}

.form-container {
  padding: 10px;
  width: 95%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border: 1px solid #ccc;
}

h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #0A2244;
}

label {
  color: #000000;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="date"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #2F3F7A;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.password-container {
  display: flex;
  align-items: center;
  position: relative; /* Added to position icon properly */
}

input[type="password"],
input[type="text"] {
  padding-right: 33px; 
}

.toggle-password {
  position: absolute;
  right: 10px; /* Adjusted right position for better alignment */
  top: 50%; /* Center vertically */
  transform: translateY(-50%);
  color: #0A2244;
  cursor: pointer;
}

.toggle-password {
  position: absolute;
  right: 10px; /* Adjusted right position for better alignment */
  top: calc(50% - 4px); /* Center vertically with a 2px upward adjustment */
  transform: translateY(-50%);
  color: #0A2244;
  cursor: pointer;
}


.address-note {
  font-size: 0.8em;
  color: #888;
  margin-top: -5px; /* Reduced margin-top */
  margin-bottom: 10px; /* Adjusted bottom margin */
  display: block;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

button.register-button {
  width: auto; 
  padding: 10px 100px; 
  margin-left: 20px; /* Added margin-right to space out the buttons */
}

.login-link {
  margin-left: 10px;
  margin-top: 12px;
  font-size: 16px; /* Same size as the register button */
  color: #0A2244;
  text-decoration: underline;
  cursor: pointer;
  align-self: center; /* Center align with button */
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
  color: #28a745; /* ijo untuk sukses */
  background-color: #d4edda; 
  border: 1px solid #c3e6cb; /* border */
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}

.error-message {
  color: #dc3545; /* merah kalau error */
  background-color: #f8d7da; 
  border: 1px solid #f5c6cb; /* border */
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}
</style>
