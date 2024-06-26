<template>
  <div class="app">
    <!-- Navbar component -->
    <Navbar />

    <!-- Main content area -->
    <div class="main-content">
      <!-- This slot will be filled with the child route components -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './NavBar.vue'; // Adjust the path based on your actual Navbar component location

export default {
  components: {
    Navbar
  }
}
</script>

<style>

/* Add any additional styles for the layout here */
.main-content {
  margin-top: 20px; /* Adjust this value based on your navbar's height */
}

</style>
