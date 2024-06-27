<template>
  <div class="dosen-penguji-container">
    <h2>Detail Dosen Penguji:</h2>
    <div v-if="dosen" class="dosen-detail">
      <p><strong>Nama:</strong> {{ dosen.nama }}</p>
      <p><strong>NIP:</strong> {{ dosen.nip }}</p>
      <p><strong>Jenis Kelamin:</strong> {{ dosen.jk }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <h3>Mahasiswa yang Diuji:</h3>
    <ul class="mahasiswa-list">
      <li v-for="(mahasiswa, index) in mahasiswaList" :key="index" class="mahasiswa-item">
        <p><strong>Nama Mahasiswa:</strong> {{ mahasiswa.nama }}</p>
        <p><strong>NIM Mahasiswa:</strong> {{ mahasiswa.nim }}</p>
        <!-- Add other mahasiswa details here -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dosen: null,
      mahasiswaList: []
    };
  },

  created() {
    this.fetchDosenDetail();
  },

  methods: {
    async fetchDosenDetail() {
      try {
        const nippenguji = this.$route.params.nip_penguji;
        const response = await axios.get(`https://express-mysql-virid.vercel.app/api/dosen/penguji/${nippenguji}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.dosen = response.data.dosen || null;
        this.mahasiswaList = response.data.mahasiswaList || [];
      } catch (error) {
        console.error('Error fetching dosen detail:', error);
      }
    }
  }
};
</script>

<style scoped>
.dosen-penguji-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.dosen-detail {
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.mahasiswa-list {
  list-style: none;
  padding: 0;
}

.mahasiswa-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.mahasiswa-item p {
  margin: 5px 0;
}

/* Add any additional styling you want here */
</style>
