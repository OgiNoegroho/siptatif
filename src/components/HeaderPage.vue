<template>
  <nav class="navbar">
    <div class="koordinator-text">
      Koordinator TA
    </div>
    <div class="dropdown">
      <img :src="profilePicture" alt="Profile" class="profile-pic" @click="toggleProfileDropdown" />
      <i :class="showProfileDropdown ? 'pi pi-sort-up-fill' : 'pi pi-sort-down-fill'" class="profile-icon" @click="toggleProfileDropdown"></i>
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
      if (this.showProfileDropdown) {
        document.addEventListener('click', this.handleClickOutside);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      if (this.$el.contains(event.target)) {
        return;
      }
      this.showProfileDropdown = false;
      document.removeEventListener('click', this.handleClickOutside);
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
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: linear-gradient(to right, rgb(10, 34, 68), rgb(29, 53, 87), rgb(69, 123, 157));
  padding: 8px 0.1px;
  height: 57.5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed; /* Fix the header */
  top: 0;
  left: 0;
  right: 0;
  z-index: 99; /* Adjusted z-index for header */
}

.koordinator-text {
  color: white;
  font-size: 16px;
  margin-right: 15px;
  margin-top: 5px;
}

.profile-pic {
  margin-top: 8px;
  margin-right: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: pointer;
}

.dropdown {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  position: relative;
}

.profile-icon {
  margin-top: 10px;
  cursor: pointer;
}

.dropdown-content {
  margin-top: 18px;
  position: absolute;
  background-color: white;
  border: 1px solid black;
  width: 150px; /* Adjust width to make it box-like */
  z-index: 1;
  top: 45px;
  right: -8px;
  border-radius: 5px; /* Adjust radius for a box shape */
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content .profile-option {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  text-align: left; /* Align text to the left */
  display: block;
}

.dropdown-content .profile-option:hover {
  background-color: #ddd;
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

@media (max-width: 768px) {
  .koordinator-text {
    display: none;
  }
}
</style>
