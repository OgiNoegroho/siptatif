<template>
  <div class="container">
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
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="age" required>
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
      <button type="submit">Register</button>
    </form>
    <p v-if="registerMessage" class="message">{{ registerMessage }}</p>
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
      age: '',
      birthplace: '',
      birthdate: '',
      address: '',
      gender: '',
      registerMessage: ''
    };
  },
  methods: {
    register() {
      const registerData = {
        email: this.email,
        password: this.password,
        name: this.name,
        nip: this.nip,
        age: this.age,
        birthplace: this.birthplace,
        birthdate: this.birthdate,
        address: this.address,
        gender: this.gender
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
input[type="number"],
input[type="date"],
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
</style>
