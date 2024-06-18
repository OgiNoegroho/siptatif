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
            <i class="pi pi-home"></i>
            <router-link to="/home">Beranda</router-link>
          </div>
        </li>
        <li @click="handleMainMenuItemClick('/mahasiswa')" :class="{ 'active': currentRoute === '/mahasiswa' && activeDropdown !== 'dosen' }">
          <div class="menu-item">
            <i class="pi pi-user"></i>
            <router-link to="/mahasiswa">Mahasiswa</router-link>
          </div>
        </li>
        <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen' }">
          <div class="menu-item" @click="toggleDropdown('dosen')">
            <i class="pi pi-users"></i>
            <router-link to="/dosen" :class="{ 'active': activeDropdown === 'dosen' }" class="feat-btn">
              Dosen
              <i :class="activeDropdown === 'dosen' ? 'pi pi-sort-up-fill' : 'pi pi-sort-down-fill'"></i>
            </router-link>
          </div>
          <ul class="feat-show" v-if="activeDropdown === 'dosen'">
            <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen-pembimbing' }">
              <router-link to="/dosen-pembimbing">Pembimbing</router-link>
            </li>
            <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen-penguji' }">
              <router-link to="/dosen-penguji">Penguji</router-link>
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
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  height: 40px;
}

.siptatif-logo {
  height: 50px;
  margin-right: 10px;
  margin-top: 20px;
}

.btn {
  color: white;
  position: absolute;
  top: 20px;
  left: 50px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  transition: left 0.4s ease;
}

.btn.click {
  left: 270px;
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
  width: 250px;
  height: 100%;
  left: -250px;
  background: #2F3F57;
  transition: left 0.4s ease;
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
  background: #2F3F57;
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
  color: white;
  text-decoration: none;
  font-size: 15px;
  padding-left: 20px;
  font-weight: 500;
  display: block;
  width: 100%;
  border-left: 3px solid transparent;
}

nav ul li.active a {
  color: #E6B861;
  border-left-color: #E6B861;
}

nav ul li a:hover {
  background: #E6B861;
}

nav ul li.active-dropdown a {
  color: #E6B861;
  border-left-color: #E6B861;
}

.menu-item {
  display: flex;
  align-items: center;
  color: white;
}

.menu-item i {
  margin-right: 20px; /* Add margin to the right of the icons */
  margin-left: 20px;  /* Add margin to the left of the icons */
}

nav ul li i {
  margin-right: 10px;
}

nav ul li.active i,
nav ul li.active a {
  color: rgb(211, 186, 26);
}

nav ul li.active-dropdown i,
nav ul li.active-dropdown a {
  color: #E6B861;
}
</style>
