<template>
  <div class="app" :class="{ 'sidebar-visible': isSidebarVisible }">
    <Header />
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

.content-wrapper {
  display: flex;
  flex: 1;
}

.sidebar-visible .main-content {
  margin-left: 250px; /* Adjust this value based on the width of your sidebar */
  transition: margin-left 0.4s ease;
}

.main-content {
  flex: 1;
  padding: 20px; /* Add padding for main content */
  transition: margin-left 0.4s ease;
}
</style>
