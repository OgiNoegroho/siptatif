<template>
  <div class="container">
    <div class="tabs">
      <h2 :class="{ active: currentPage === 'berkas' }" @click="navigateTo('berkas')">Berkas Mahasiswa</h2>
      <h2 :class="{ active: currentPage === 'dosen' }" @click="navigateTo('dosen')">Input Dosen Penguji</h2>
    </div>

    <div v-if="currentPage === 'berkas'">
      <div v-if="selectedMahasiswa" class="detail-item">
        <div class="mahasiswa-detail">
          <div class="basic-details">
            <div class="inline-item">
              <p class="detail-info">
                <strong>Nama:</strong>
                <span>{{ selectedMahasiswa.nama }}</span>
              </p>
            </div>
            <div class="inline-item">
              <p class="detail-info">
                <strong>NIM:</strong>
                <span>{{ selectedMahasiswa.nim }}</span>
              </p>
            </div>
            <div class="inline-item">
              <p class="detail-info">
                <strong>Email:</strong>
                <span>{{ selectedMahasiswa.email }}</span>
              </p>
            </div>
          </div>
          <p class="detail-info">
            <strong>Tanggal:</strong>
            <span>{{ selectedMahasiswa.tanggal }}</span>
          </p>
          <p class="detail-info">
            <strong>Judul:</strong>
            <span>{{ selectedMahasiswa.judul }}</span>
          </p>
          <p class="detail-info">
            <strong>Kategori TA:</strong>
            <span>{{ selectedMahasiswa.kategoriTA }}</span>
          </p>
          <div class="calon-pembimbing">
            <div class="inline-item">
              <p class="detail-info">
                <strong>Calon Dosen Pembimbing 1:</strong>
                <span>{{ selectedMahasiswa.calonPembimbing1 }}</span>
              </p>
            </div>
            <div class="inline-item">
              <p class="detail-info">
                <strong>Calon Dosen Pembimbing 2:</strong>
                <span>{{ selectedMahasiswa.calonPembimbing2 }}</span>
              </p>
            </div>
          </div>
          <div class="berkas-catatan">
            <div class="inline-item">
              <p class="detail-info">
                <strong>Berkas:</strong>
                <span>
                  <a :href="getFileUrl(selectedMahasiswa.berkas)" target="_blank">{{ getFileName(selectedMahasiswa.berkas) }}</a>
                </span>
              </p>
            </div>
            <div class="inline-item">
              <p class="detail-info">
                <strong>Catatan:</strong>
                <span>
                  <textarea v-model="selectedMahasiswa.catatan" placeholder="Masukkan catatan"></textarea>
                </span>
              </p>
            </div>
          </div>
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
    
    <div v-if="currentPage === 'dosen'">
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>Nama Dosen</th>
            <th>NIP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dosen, index) in dosenList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ dosen.Nama }}</td>
            <td>{{ dosen.NIP }}</td>
          </tr>
        </tbody>
      </table>
      <div class="form-group">
        <label for="dosenPenguji1">Dosen Penguji 1:</label>
        <select v-model="dosenPenguji1">
          <option v-for="dosen in dosenList" :key="dosen.NIP" :value="dosen.NIP">{{ dosen.Nama }} ({{ dosen.NIP }})</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dosenPenguji2">Dosen Penguji 2:</label>
        <select v-model="dosenPenguji2">
          <option v-for="dosen in dosenList" :key="dosen.NIP" :value="dosen.NIP">{{ dosen.Nama }} ({{ dosen.NIP }})</option>
        </select>
      </div>
      <button class="btttn simpan-button" @click="submitDosenPenguji">
        Kirim
      </button>
    </div>

    <div v-if="alertMessage" class="alert" :class="{'alert-success': alertType === 'success', 'alert-error': alertType === 'error'}">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPage: 'berkas',
      selectedMahasiswa: null,
      selectedStatus: '',
      dosenList: [],
      dosenPenguji1: '',
      dosenPenguji2: '',
      alertMessage: '',
      alertType: '',
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
        const response = await axios.get(`https://express-mysql-virid.vercel.app/api/pendaftaran/${nim}`);
        this.selectedMahasiswa = response.data;
      } catch (error) {
        console.error('Error fetching mahasiswa details:', error);
      }
    },
    async fetchDosenList() {
      try {
        const response = await axios.get('https://express-mysql-virid.vercel.app/api/dosen');
        this.dosenList = response.data;
        console.log('Dosen list:', this.dosenList); // Debugging: Log dosenList to ensure data is fetched
      } catch (error) {
        console.error('Error fetching dosen list:', error);
      }
    },
    async updateStatus() {
      if (window.confirm('Are you sure that you want to change the status?')) {
        try {
          const nim = this.selectedMahasiswa.nim;
          await axios.put(`https://express-mysql-virid.vercel.app/api/pendaftaran/${nim}/status`, { status: this.selectedStatus });
          this.selectedMahasiswa.status = this.selectedStatus;
          this.alertMessage = 'Status updated successfully';
          this.alertType = 'success';
        } catch (error) {
          console.error('Error updating mahasiswa status:', error);
          this.alertMessage = 'Error updating status';
          this.alertType = 'error';
        }
      }
    },
    navigateTo(page) {
      this.currentPage = page;
    },
    async submitDosenPenguji() {
      console.log('Selected Dosen Penguji 1:', this.dosenPenguji1);
      console.log('Selected Dosen Penguji 2:', this.dosenPenguji2);

      if (window.confirm('Do you want to save changes for dosen penguji?')) {
        try {
          const nim = this.selectedMahasiswa.nim;
          await axios.post(`https://express-mysql-virid.vercel.app/api/pendaftaran/${nim}`, {
            nip_penguji1: this.dosenPenguji1,
            nip_penguji2: this.dosenPenguji2,
          });
          this.alertMessage = 'Penguji updated successfully';
          this.alertType = 'success';
          this.navigateTo('berkas');
        } catch (error) {
          console.error('Error updating dosen penguji:', error);
          this.alertMessage = 'Error updating dosen penguji';
          this.alertType = 'error';
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
  async mounted() {
    await this.fetchMahasiswaDetails(); // Fetch data when the component is mounted
    await this.fetchDosenList(); // Fetch dosen list when the component is mounted
  }
};
</script>

<style>
/* Your existing styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.tabs h2 {
  cursor: pointer;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.tabs h2:hover {
  background-color: #e0e0e0;
}

.tabs h2.active {
  background-color: #007bff;
  color: white;
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

.back-button, .select-dosen-button {
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
  margin-left: 0;
}

.back-button:hover, .select-dosen-button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

label {
  font-size: 16px;
  margin-right: 10px;
}

.alert {
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
  font-size: 16px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
