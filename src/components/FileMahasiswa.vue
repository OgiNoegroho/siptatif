<template>
  <div class="container">
    <h2>Berkas Mahasiswa</h2>
    <div v-if="selectedmahasiswa" class="detail-item">
      <div class="mahasiswa-detail">
        <!-- Basic Details in Line -->
        <div class="basic-details">
          <div class="inline-item">
            <p class="detail-info">
              <strong>Nama:</strong>
              <span>{{ selectedmahasiswa.nama }}</span>
            </p>
          </div>
          <div class="inline-item">
            <p class="detail-info">
              <strong>NIM:</strong>
              <span>{{ selectedmahasiswa.nim }}</span>
            </p>
          </div>
          <div class="inline-item">
            <p class="detail-info">
              <strong>Email:</strong>
              <span>{{ selectedmahasiswa.email }}</span>
            </p>
          </div>
        </div>
        <!-- Additional Details -->
        <p class="detail-info">
          <strong>Tanggal:</strong>
          <span>{{ selectedmahasiswa.tanggal }}</span>
        </p>
        <p class="detail-info">
          <strong>Judul:</strong>
          <span>{{ selectedmahasiswa.judul }}</span>
        </p>
        <p class="detail-info">
          <strong>Kategori TA:</strong>
          <span>{{ selectedmahasiswa.kategoriTA }}</span>
        </p>
        <!-- Calon Dosen Pembimbing -->
        <div class="calon-pembimbing">
          <div class="inline-item">
            <p class="detail-info">
              <strong>Calon Dosen Pembimbing 1:</strong>
              <span>{{ selectedmahasiswa.calonPembimbing1 }}</span>
            </p>
          </div>
          <div class="inline-item">
            <p class="detail-info">
              <strong>Calon Dosen Pembimbing 2:</strong>
              <span>{{ selectedmahasiswa.calonPembimbing2 }}</span>
            </p>
          </div>
        </div>
        <!-- Berkas -->
        <div class="berkas-catatan">
          <div class="inline-item">
            <p class="detail-info">
              <strong>Berkas:</strong>
              <span>
                <a :href="getFileUrl(selectedmahasiswa.berkas)" target="_blank">{{ getFileName(selectedmahasiswa.berkas) }}</a>
              </span>
            </p>
          </div>
          <!-- Catatan -->
          <div class="inline-item">
            <p class="detail-info">
              <strong>Catatan:</strong>
              <span>
                <textarea v-model="selectedmahasiswa.catatan" placeholder="Masukkan catatan"></textarea>
              </span>
            </p>
          </div>
        </div>
        <!-- Status Dropdown for Editing -->
        <div class="form-group">
          <select v-model="selectedStatus">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <button class="simpan-button" @click="updateStatus">Simpan</button>
        </div>
      </div>
    </div>
    <button class="btttn back-button" @click="goBack">
      <i class="pi pi-arrow-left icon"></i> Kembali
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedmahasiswa: null,
      selectedStatus: '',
    };
  },
  computed: {
    statusOptions() {
      return ['Diterima', 'Ditolak'];
    }
  },
  methods: {
    async fetchMahasiswaDetails() {
      const nim = this.$route.params.nim;
      if (!nim) {
        console.error('NIM parameter is undefined');
        return;
      }
      try {
        const response = await axios.get(`/api/pendaftaran/${nim}`);
        this.selectedmahasiswa = response.data;
        this.selectedStatus = this.selectedmahasiswa.status; // Set selectedStatus to the current status
      } catch (error) {
        console.error('Error fetching mahasiswa details:', error);
      }
    },
    async updateStatus() {
      if (window.confirm('Are you sure that you want to change the status?')) {
        try {
          const nim = this.selectedmahasiswa.nim;
          await axios.put(`/api/pendaftaran/${nim}/status`, { status: this.selectedStatus });
          this.selectedmahasiswa.status = this.selectedStatus; // Update the status locally
          // Optionally, you can reload the mahasiswa details after updating the status
          // this.fetchMahasiswaDetails();
        } catch (error) {
          console.error('Error updating mahasiswa status:', error);
        }
      }
    },
    getFileUrl(file) {
      if (file) {
        return URL.createObjectURL(file);
      }
      return '#';
    },
    getFileName(file) {
      if (file) {
        return file.name;
      }
      return 'Tidak Ada Berkas';
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.fetchMahasiswaDetails(); // Fetch data when the component is mounted
  }
};
</script>

<style scoped>
.container {
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.detail-item {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mahasiswa-detail {
  margin-bottom: 20px;
}

.detail-nama {
  font-weight: bold;
  text-align: left;
  font-size: 25px;
  margin-bottom: 5px;
}

.detail-info {
  display: block;
  margin-bottom: 15px;
  text-align: left;
}

.detail-info strong {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.detail-info span {
  display: block;
  padding: 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
}

.basic-details, .calon-pembimbing, .berkas-catatan {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.inline-item {
  flex: 1;
  margin-right: 20px;
  margin-bottom: 20px;
}

.inline-item:last-child {
  margin-right: 0;
}

.inline-item p.detail-info {
  margin: 0;
  text-align: left;
}

.inline-item p.detail-info strong {
  margin-right: 10px;
}

textarea {
  flex: 1;
  font-size: 16px;
  height: 80px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-group select {
  flex: 1;
  margin-right: 10px;
  font-size: 16px;
  padding: 10px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.simpan-button {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  height: 50px;
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.simpan-button:hover {
  background-color: #0056b3;
}

.back-button {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
  margin-bottom: 50px;
  display: block;
  width: fit-content;
  margin: 20px auto 0;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
