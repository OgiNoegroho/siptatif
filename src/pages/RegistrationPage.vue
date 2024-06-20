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
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div>
          <label for="nip">NIP:</label>
          <input type="text" id="nip" v-model="nip" required>
        </div>
        <div>
          <label for="birthplace">Birthplace:</label>
          <input type="text" id="birthplace" v-model="birthplace" required>
        </div>
        <div>
          <label for="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" v-model="birthdate" required>
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="address" required>
        </div>
        <div>
          <label for="gender">Gender:</label>
          <select id="gender" v-model="gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label for="age">Age:</label>
          <input type="number" id="age" :value="calculatedAge" readonly>
        </div>
        <div class="button-container">
          <button type="submit" class="register-button">Register</button>
        </div>
      </form>
      <p v-if="registerMessage" :class="registerMessage.includes('error') ? 'error-message' : 'success-message'">
        {{ registerMessage }}
      </p>
    </div>
  </div>
</template>

<script>
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
      registerMessage: ''
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
    }
  },
  methods: {
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
        if (data.success) {
          setTimeout(() => {
            this.$router.push('/'); // Redirect to login page after delay
          }, 3000); // 3-second delay
        }
      })
      .catch(error => {
        console.error('Error registering:', error);
        this.registerMessage = 'An error occurred while registering.';
      });
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

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

button.register-button {
  width: auto; 
  padding: 10px 100px; 
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
