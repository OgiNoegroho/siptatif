<template>
  <div>
    <div class="navbar">
      <!-- Navbar content -->
    </div>
    <div class="profile-container">
      <h2>User Profile</h2>
      <div v-if="profile" class="profile-content">
        <div class="profile-pic-container">
          <img :src="profilePicture" alt="Profile Picture" class="profile-pic" />
        </div>
        <div class="profile-details">
          <div><label>Name:</label><span>{{ profile.name }}</span></div>
          <div><label>NIP:</label><span>{{ profile.nip }}</span></div>
          <div><label>Age:</label><span>{{ profile.age }}</span></div>
          <div><label>Birthplace:</label><span>{{ profile.birthplace }}</span></div>
          <div><label>Birthdate:</label><span>{{ formattedBirthdate }}</span></div>
          <div><label>Address:</label><span>{{ profile.address }}</span></div>
          <div><label>Gender:</label><span>{{ profile.gender }}</span></div>
        </div>
        <div class="button-container">
          <button class="edit-button" @click="enterEditMode">Edit Profile</button>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <div v-if="editMode" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="exitEditMode">&times;</span>
          <h3>Edit Profile</h3>
          <div>
            <label>Name:</label>
            <input v-model="form.name" />
          </div>
          <div>
            <label>NIP:</label>
            <input v-model="form.nip" />
          </div>
          <div>
            <label>Age:</label>
            <input v-model="form.age" type="number" />
          </div>
          <div>
            <label>Birthplace:</label>
            <input v-model="form.birthplace" />
          </div>
          <div>
            <label>Birthdate:</label>
            <input v-model="form.birthdate" type="date" />
          </div>
          <div>
            <label>Address:</label>
            <input v-model="form.address" />
          </div>
          <div>
            <label>Gender:</label>
            <select v-model="form.gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="button-container">
            <button class="edit-button" @click="saveProfile" :disabled="isLoading">
              <span v-if="isLoading">Saving...</span>
              <span v-else>Save</span>
            </button>
            <button class="edit-button" @click="exitEditMode" :disabled="isLoading">Cancel</button>
          </div>
        </div>
      </div>
      <div v-if="message" class="message" :class="{ 'success': success, 'error': !success }">
        {{ message }}
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import manImage from '@/assets/images/man.jpeg';
import womanImage from '@/assets/images/woman.jpeg';

export default {
  data() {
    return {
      profile: null,
      form: {},
      editMode: false,
      message: '',
      success: false,
      isLoading: false
    };
  },
  created() {
    this.fetchProfile();
  },
  computed: {
    formattedBirthdate() {
      if (!this.profile || !this.profile.birthdate) return '';
      const date = new Date(this.profile.birthdate);
      return date.toLocaleDateString();
    },
    profilePicture() {
      if (!this.profile) return '';
      if (this.profile.gender === 'Male') {
        return manImage;
      } else if (this.profile.gender === 'Female') {
        return womanImage;
      }
      return null;
    }
  },
  methods: {
    fetchProfile() {
      axios.get('https://express-mysql-virid.vercel.app/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.profile = response.data;
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        this.showMessage('Error fetching profile.', false);
      });
    },
    enterEditMode() {
      this.form = { ...this.profile }; // Clone the profile data into the form
      this.editMode = true;
    },
    exitEditMode() {
      this.editMode = false;
    },
    saveProfile() {
      this.isLoading = true; // Set loading state to true
      axios.put('https://express-mysql-virid.vercel.app/api/user/profile', this.form, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        this.showMessage('Profile updated successfully.', true);
        this.editMode = false;
        this.fetchProfile(); // Fetch the updated profile data
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        this.showMessage('Error updating profile.', false);
      })
      .finally(() => {
        this.isLoading = false; // Reset loading state
      });
    },
    showMessage(message, success) {
      this.message = message;
      this.success = success;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
};
</script>


<style scoped>
.profile-container {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-pic-container {
  position: relative;
  margin-bottom: 20px;
  width: 150px; /* Set width of container */
  height: 150px; /* Set height of container */
  border-radius: 50%; /* Ensure container is a circle */
  overflow: hidden; /* Hide overflow from profile picture */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Add shadow */
}

.profile-pic {
  width: 100%; /* Ensure profile picture covers the whole container */
  height: 100%; /* Ensure profile picture covers the whole container */
  object-fit: cover;
  cursor: pointer;
}

/* Add emboss effect on profile picture */
.profile-pic-container:before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 50%; /* Ensure emboss effect is circular */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  z-index: 1;
}


.file-input {
  display: none; /* Hide file input */
}

.profile-details {
  border: 1px solid #ccc; /* Menetapkan border dengan ketebalan 1px */
  padding: 10px;
  border-radius: 8px;
  width: 500px; /* Menetapkan lebar profile detail */
  margin: center; /* Mengatur agar profile detail berada di tengah */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Menambahkan shadow */
  background-color: #ffffff; /* Memberi warna latar belakang untuk efek emboss */
}

.profile-details div {
  display: flex; /* Menggunakan flexbox untuk mengatur posisi label dan nilai */
  justify-content: left; /* Memastikan label dan nilai sejajar rata kanan */
  margin-bottom: 10px;
}

.profile-details label {
  font-weight: bold;
}

.profile-details input,
.profile-details select {
  flex: 1; /* Membuat input dan select memenuhi ruang yang tersedia */
  margin-left: 10px;
}

/* Efek emboss pada border */
.profile-details:before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 5px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0)
  );
  z-index: -1;
}


.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px; /* Add margin-top for spacing */
}

.edit-button {
  background-color: #240750;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:disabled {
  background-color: #A1DD70;
  cursor: not-allowed;
}

.edit-button:hover:not(:disabled) {
  background-color: #A1DD70;
  transition: transform 0.8s ease;
  transform: scale(1.1);
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.modal-details {
  display: flex; /* Use flex to align items */
  align-items: center; /* Center vertically */
  margin-bottom: 10px; /* Space between rows */
}

.modal-details label {
  font-weight: bold;
  flex: 0 0 100px; /* Set a fixed width for labels */
  text-align: left; /* Left align label text */
}

.modal-details input,
.modal-details select {
  flex: 1; /* Inputs take up the remaining space */
}

.button-container.centered {
  display: flex;
  justify-content: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.message {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
