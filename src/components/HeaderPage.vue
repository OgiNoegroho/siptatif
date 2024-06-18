<template>
  <nav class="navbar">
    <div class="koordinator-text">
      Koordinator TA
    </div>
    <div class="dropdown" @mouseleave="hideDropdown">
      <img :src="profilePicture" alt="Profile" class="profile-pic" @click="toggleProfileDropdown" />
      <div class="dropdown-content" v-if="showProfileDropdown">
        <router-link to="/profile" class="profile-option">Profile</router-link>
        <a @click="logout" class="profile-option">Logout</a>
      </div>
    </div>
    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirmation" class="logout-modal">
      <div class="modal-content">
        <p>Apakah Anda yakin ingin logout?</p>
        <div class="modal-buttons">
          <button @click="confirmLogout">Ya</button>
          <button @click="cancelLogout">Tidak</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import manImage from '@/assets/images/man.jpeg';
import womanImage from '@/assets/images/woman.jpeg';

export default {
  data() {
    return {
      showProfileDropdown: false,
      showLogoutConfirmation: false,
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    profilePicture() {
      if (!this.user) {
        return null; // Default image
      }
      if (this.user.gender === 'Male') {
        return manImage;
      } else if (this.user.gender === 'Female') {
        return womanImage;
      }
      return null; // Default image for unexpected values
    },
  },
  methods: {
    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    },
    hideDropdown() {
      this.showProfileDropdown = false;
    },
    logout() {
      this.showLogoutConfirmation = true;
    },
    confirmLogout() {
      this.showLogoutConfirmation = false;
      this.$store.dispatch('auth/logout');
      this.$router.push({ path: '/' });
    },
    cancelLogout() {
      this.showLogoutConfirmation = false;
    },
  },
  created() {
  this.$store.dispatch('auth/fetchUser')
    .then(() => {
      const user = this.$store.getters['auth/getUser'];
      if (user) {
        console.log('User fetched successfully:', user);
      } else {
        console.warn('User fetched successfully but is null');
      }
    })
    .catch(error => {
      console.error('Failed to fetch user:', error);
    });
}};
</script>

<style scoped>
/* Add styles specific to the header component */
.navbar {
  width: 100%;
  background-color: #2F3F57;
  padding: 8px 20px;
  height: 65px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.koordinator-text {
  color: white;
  font-size: 16px;
  margin-right: 20px;
}

.profile-pic {
  margin-top: 8px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid black;
  min-width: 160px;
  z-index: 1;
  top: 45px;
  right: 0;
  border-radius: 5px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  text-align: center;
  display: block;
}

.dropdown-content a:hover {
  border-radius: 5px;
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.logout-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}

.modal-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
