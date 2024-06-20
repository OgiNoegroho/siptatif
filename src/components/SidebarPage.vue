<template>
  <div>
    <div class="btn" :class="{ 'click': isSidebarVisible }" @click="toggleSidebar">
      <i :class="isSidebarVisible ? 'pi pi-times' : 'pi pi-bars'"></i>
    </div>
    <nav class="sidebar" :class="{ 'show': isSidebarVisible }">
      <div class="header">
        <img src="@/assets/images/logouin.png" alt="SIPTATIF Logo" class="siptatif-logo" />
        <div class="text">SIPTATIF</div>
      </div>
      <br>
      <ul>
        <li @click="handleMainMenuItemClick('/home')" :class="{ 'active': currentRoute === '/home' && activeDropdown !== 'dosen' }">
          <div class="menu-item">
            <i class='bx bx-home'></i>
            <router-link to="/home">Beranda</router-link>
          </div>
        </li>
        <li @click="handleMainMenuItemClick('/mahasiswa')" :class="{ 'active': currentRoute === '/mahasiswa' && activeDropdown !== 'dosen' }">
          <div class="menu-item">
            <i class='bx bx-user-circle'></i>
            <router-link to="/mahasiswa">Mahasiswa</router-link>
          </div>
        </li>
        <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/' }">
          <div class="menu-item" @click="toggleDropdown('dosen')">
            <i class='bx bxs-user-rectangle'></i>
            <a>Dosen</a>
          </div>
          <ul class="feat-show" v-if="activeDropdown === 'dosen'">
            <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen' }">
              <div class="menu-item dropdown-item">
                <i class='bx bxs-user-detail'></i>
                <router-link to="/dosen">Semua Dosen</router-link>
              </div>
            </li>
            <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen-pembimbing' }">
              <div class="menu-item dropdown-item">
                <i class='bx bx-user-check'></i>
                <router-link to="/dosen-pembimbing">Pembimbing</router-link>
              </div>
            </li>
            <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen-penguji' }">
              <div class="menu-item dropdown-item">
                <i class='bx bx-user-voice' ></i>
                <router-link to="/dosen-penguji">Penguji</router-link>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    isSidebarVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      activeDropdown: null,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar');
    },
    toggleDropdown(dropdown) {
      this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
    },
    handleMainMenuItemClick(route) {
      this.activeDropdown = null;
      this.$router.push(route);
    },
    handleDosenDropdownClick() {
      // Do nothing here, so the dropdown only closes when another main menu item is clicked
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Poppins', sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000 !important;
  overflow: hidden; /* Ensure no scrolling */
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.siptatif-logo {
  height: 50px;
  margin-right: 10px;
  margin-top: 20px;
}

.btn {
  color: white;
  position: fixed; /* Changed from absolute to fixed */
  size: 120%;
  top: 20px;
  left: 40px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  transition: left 0.4s ease;
  z-index: 101; /* Adjusted z-index for button */
}

.btn.click {
  left: 230px; /*Tombol X */
}

.btn span {
  color: white;
  font-size: 28px;
  line-height: 45px;
}

.btn.click span:before {
  content: '\f00d';
}

.sidebar {
  position: fixed;
  width: 200px;
  height: 100%;
  left: -200px;
  background: #0A2244;
  transition: left 0.4s ease;
  z-index: 100; /* Adjusted z-index for sidebar */
  margin-top: -80px; /*tulisan siptatif*/
}

.show {
  left: 0;
}

.sidebar .text {
  color: white;
  font-size: 25px;
  font-weight: 600;
  line-height: 65px;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 30px;
}

nav ul {
  background: linear-gradient(to bottom, rgb(10, 34, 68), rgb(69, 123, 157));
  height: 100%;
  width: 100%;
  list-style: none;
}

nav ul li {
  line-height: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

nav ul li:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

nav ul li a {
  position: relative;
  color: rgb(249, 249, 249);
  text-decoration: none;
  font-size: 15px;
  padding-left: 20px;
  font-weight: 500;
  display: block;
  width: 100%;
  border-left: 3px solid transparent;
}

nav ul li.active a {
  color: #ffffff;
  border-left-color: #ffffff;
}

nav ul li.active-dropdown a {
  color: #dbd8d1;
  border-left-color: #ffffff;
}

.menu-item {
  display: flex;
  align-items: center;
  cursor: pointer; /* untuk tampilan cursor tangan */
  color: rgb(255, 255, 255);
}

.menu-item i {
  margin-right: 5px; /* Add margin to the right of the icons */
  margin-left: 20px;  /* Add margin to the left of the icons */
}

.dropdown-item {
  padding-left: 20px; /* Adjust padding for dropdown items */
  font-size: 15px; /* Adjust font size for dropdown items */
}

nav ul li i {
  margin-right: 10px;
}

nav ul li.active i,
nav ul li.active a {
  color: rgb(244, 244, 244);
}

nav ul li.active-dropdown i,
nav ul li.active-dropdown a {
  color: #080808;
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
    left: -70px;
    
  }

  .sidebar.show {
    left: 0;
  }

  .siptatif-logo {
    height: 50px;
    margin-right: 10px;
    margin-top: 20px;
  }

  .header .text,
  nav ul li a {
    display: none;
  }

  .menu-item {
    justify-content: center;
    padding: 20px 0; /* Decrease padding for better spacing */
  }

  .menu-item i {
    margin: 0;
  }

  .dropdown-item {
    padding-left: 10px; /* Adjust padding for dropdown items */
    font-size: 12px; /* Adjust font size for dropdown items */
  }

  .btn {
    left: 10px;
  }

  .btn.click {
    left: 80px;
  }
}
</style>