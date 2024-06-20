<template>
  <div class="app" :class="{ 'sidebar-visible': isSidebarVisible }">
    <Header/>
    <div class="content-wrapper">
      <Sidebar @toggleSidebar="toggleSidebar" :isSidebarVisible="isSidebarVisible" />
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/SidebarPage.vue';
import Header from '@/components/HeaderPage.vue';

export default {
  data() {
    return {
      isSidebarVisible: false
    };
  },
  components: {
    Sidebar,
    Header
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  height: 60px; /* Adjust this value based on the height of your header */
  width: 100%;
  background-color: #fff; /* Adjust the background color as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for the header */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure the header is above other content */
}

.content-wrapper {
  display: flex;
  flex: 1;
  margin-top: 80px; /* Adjust this value based on the height of your header */
  width: 100%;
}

.sidebar-visible .main-content {
  margin-left: 200px; /* Adjust this value based on the width of your sidebar */
  transition: margin-left 0.4s ease;
}

.sidebar-visible .sidebar {
  left: 0;
  transition: left 0.4s ease;
}

.main-content {
  flex: 1;
  padding: 5px; /* Add padding for main content */
  transition: margin-left 0.4s ease;
  overflow-y: auto; /* Ensure the main content can scroll if it overflows */
}

.sidebar {
  top: 0;
  left: -250px; /* Hide the sidebar by default */
  width: 25px; /* Adjust this value based on the width of your sidebar */
  background-color: #333; /* Adjust the background color as needed */
  z-index: 2000; /* Ensure the sidebar is above the header */
  transition: left 0.4s ease;
}

@media (max-width: 768px) {
  .sidebar-visible .main-content {
  margin-left: 70px; /* Adjust this value based on the width of your sidebar */
  transition: margin-left 0.4s ease;
}
}
</style>
