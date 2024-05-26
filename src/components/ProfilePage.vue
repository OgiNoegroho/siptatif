<template>
  <div class="container">
    <h1>Your Profile</h1>
    <div v-if="user" class="profile-info">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>NIM/NIS:</strong> {{ user.nim }}</p>
      <p><strong>Umur:</strong> {{ user.umur }}</p>
      <p><strong>Tempat/Tanggal Lahir:</strong> {{ user.tempatTanggalLahir }}</p>
      <p><strong>Alamat:</strong> {{ user.alamat }}</p>
      <p><strong>Jenis Kelamin:</strong> {{ user.jenisKelamin }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading{{ loadingDots }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingDots: '....'
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  created() {
    // Start the loading animation when the component is created
    this.startLoadingAnimation();
  },
  methods: {
    startLoadingAnimation() {
      // Create a simple loading animation by changing the dots dynamically
      setInterval(() => {
        switch (this.loadingDots) {
          case '': this.loadingDots = '.'; break;
          case '.': this.loadingDots = '..'; break;
          case '..': this.loadingDots = '...'; break;
          case '...': this.loadingDots = '....'; break;
          case '....': this.loadingDots = ''; break;
        }
      }, 500);
    }
  }
}
</script>

<style scoped>
*{
  font-family: 'Poppins', sans-serif;
}
.container {
  background-color: #fff;
  padding: 30px;
  width: 50%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  margin: 50px auto;
}

h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
}

.profile-info {
  font-size: 18px;
}

.profile-info p {
  margin-bottom: 10px;
}
</style>
