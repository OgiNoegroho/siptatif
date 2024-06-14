<template>
  <div class="profile-container">
    <h2>User Profile</h2>
    <div v-if="profile" class="profile-content">
      <div class="profile-pic-container">
        <img :src="profile.profile_pic" alt="Profile Picture" class="profile-pic" />
      </div>
      <input type="file" ref="fileInput" @change="updateProfilePicture" accept="image/*" class="file-input" />

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
        <button class="edit-button" @click="triggerFileInput">Change Profile Picture</button>
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
</template>

<script>
import axios from 'axios';

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
        this.fetchProfilePicture();
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        this.showMessage('Error fetching profile.', false);
      });
    },
    fetchProfilePicture() {
      axios.get('https://express-mysql-virid.vercel.app/api/user/profile/picture', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.profile.profile_pic = response.data.profile_pic;
      })
      .catch(error => {
        console.error('Error fetching profile picture:', error);
        this.showMessage('Error fetching profile picture.', false);
      });
    },
    updateProfilePicture(event) {
      const file = event.target.files[0];
      if (!file) {
        this.showMessage('No file selected.', false);
        return;
      }
      const formData = new FormData();
      formData.append('profile_pic', file);

      axios.post('https://express-mysql-virid.vercel.app/api/user/profile/picture', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.profile.profile_pic = response.data.profile_pic;
        this.showMessage('Profile picture updated successfully.', true);
      })
      .catch(error => {
        console.error('Error updating profile picture:', error);
        let errorMessage = 'Error updating profile picture.';
        if (error.response) {
          errorMessage += ` Server responded with status code ${error.response.status}.`;
          if (error.response.data && error.response.data.message) {
            errorMessage += ` Message: ${error.response.data.message}`;
          }
        } else if (error.request) {
          errorMessage += ' No response received from server.';
        } else {
          errorMessage += ` ${error.message}`;
        }
        this.showMessage(errorMessage, false);
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.file-input {
  display: none;
}

.profile-details {
  text-align: left;
  margin-bottom: 20px;
}

.profile-details div {
  margin-bottom: 10px;
}

.profile-details label {
  font-weight: bold;
  margin-right: 10px;
}

.profile-details input,
.profile-details select {
  margin-left: 10px;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.edit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.edit-button:hover:not(:disabled) {
  background-color: #0056b3;
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
