<template>
  <div class="profile-container">
    <div v-if="profile" class="profile-content">
      <div class="profile-details">
        <div class="profile-header">
          <h2>User Profile</h2>
        </div>
        <div class="profile-pic-container">
          <img :src="profilePicture" alt="Profile Picture" class="profile-pic" />
        </div>
        <div><label>Nama:</label><span>{{ profile.name }}</span></div>
        <div><label>NIP:</label><span>{{ profile.nip }}</span></div>
        <div><label>Tempat Lahir:</label><span>{{ profile.birthplace }}</span></div>
        <div><label>Tanggal Lahir:</label><span>{{ formattedBirthdate }}</span></div>
        <div><label>Umur:</label><span>{{ profile.age }}</span></div>
        <div><label>Alamat:</label><span>{{ profile.address }}</span></div>
        <div><label>Jenis Kelamin:</label><span>{{ translatedGender }}</span></div>
        <div class="button-container">
          <button class="edit-button" @click="enterEditMode">Edit Profile</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <div v-if="editMode" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="exitEditMode">&times;</span>
        <h3>Edit Profile</h3>
        <div class="modal-details">
          <label>Name:</label>
          <input v-model="form.name" />
        </div>
        <div class="modal-details">
          <label>NIP:</label>
          <input v-model="form.nip" />
        </div>
        <div class="modal-details">
          <label>Birthplace:</label>
          <input v-model="form.birthplace" />
        </div>
        <div class="modal-details">
          <label>Birthdate:</label>
          <input v-model="form.birthdate" @input="updateAge" type="date" />
        </div>
        <div class="modal-details">
          <label>Age:</label>
          <input :value="calculatedAge" type="number" readonly />
        </div>
        <div class="modal-details">
          <label>Address:</label>
          <input v-model="form.address" />
        </div>
        <div class="modal-details">
          <label>Gender:</label>
          <select v-model="form.gender">
            <option value="Male">Laki-Laki</option>
            <option value="Female">Perempuan</option>
          </select>
        </div>
        <div class="button-container centered">
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
import manImage from '@/assets/images/man.jpeg';
import womanImage from '@/assets/images/woman.jpeg';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      profile: null,
      form: {},
      showEditPicture: false,
      editMode: false,
      isLoading: false, // New loading state
      message: null, // Define message property
      success: false // Define success property
    };
  },
  created() {
    this.fetchProfile();
  },
  computed: {
    formattedBirthdate() {
      if (!this.profile || !this.profile.birthdate) return '';
      const date = new Date(this.profile.birthdate);
      return date.toLocaleDateString(); // Formats date to 'MM/DD/YYYY' or 'DD/MM/YYYY' depending on locale
    },
    calculatedAge() {
      if (!this.form.birthdate) return '';
      const birthDate = new Date(this.form.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    profilePicture() {
      if (!this.profile) return '';
      if (this.profile.gender === 'Male') {
        return manImage;
      } else if (this.profile.gender === 'Female') {
        return womanImage;
      }
      return null;
    },
    translatedGender() {
      if (!this.profile) return '';
      return this.profile.gender === 'Male' ? 'Laki-Laki' : 'Perempuan';
    }
  },
  watch: {
    'form.birthdate': function() {
      this.form.age = this.calculatedAge;
    }
  },
  methods: {
    fetchProfile() {
      const toast = useToast();
      axios.get('https://express-mysql-virid.vercel.app/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.profile = response.data;
        this.form = { ...this.profile, birthdate: this.profile.birthdate.split('T')[0] }; // Ensuring the birthdate is properly formatted for the input
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        toast.error('Error fetching profile.');
      });
    },
    enterEditMode() {
      this.form = { ...this.profile, birthdate: this.profile.birthdate.split('T')[0] }; // Clone the profile data into the form
      this.editMode = true;
    },
    exitEditMode() {
      this.editMode = false;
    },
    saveProfile() {
      const toast = useToast();
      this.isLoading = true; // Set loading state to true
      this.form.age = this.calculatedAge; // Update age before sending the data
      axios.put('https://express-mysql-virid.vercel.app/api/user/profile', this.form, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => { // No need to use 'response' variable
        toast.success('Profile updated successfully.');
        this.editMode = false;
        this.fetchProfile(); // Fetch the updated profile data
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile.');
      })
      .finally(() => {
        this.isLoading = false; // Reset loading state
      });
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

.profile-header {
  text-align: center;
  margin-left: 130px;
}

.profile-pic-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-pic {
  width: 150px;
  margin-left: 120px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-details {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  margin: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: left;
  position: relative; /* Add position relative */
}

.profile-details div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.profile-details label {
  font-weight: bold;
  display: inline-block;
  width: 120px;
}

.profile-details input,
.profile-details select {
  flex: 1;
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
  margin-left: 145px;
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
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.modal-details label {
  font-weight: bold;
  flex: 0 0 100px;
  text-align: left;
}

.modal-details input,
.modal-details select {
  flex: 1;
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

@media (max-width: 600px) {
  .profile-pic {
    margin-left: 110px;
    height: 120px;
  }

  .profile-details {
    margin-top: 30px;
    width: 90%;
  }

  .profile-header {
  text-align: center;
  margin-left: 110px;
}

.edit-button {
  background-color: #240750;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 140px;
}

}
</style>