<template>
  <div>
    <h2>Data Mahasiswa</h2>

    <!-- Modal for Tambah Data Mahasiswa -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h3>Tambah Data Mahasiswa</h3>
        <form id="formTambahDataModal" class="form-container" @submit.prevent="tambahData">
          <div class="form-group">
            <!-- Combined field for Nama dan NIM -->
            <select v-model="selectedMahasiswa" required>
              <option value="" disabled>Pilih Mahasiswa</option>
              <option v-for="mahasiswa in mahasiswaOptions" :key="mahasiswa.NIM" :value="mahasiswa.NIM">
                {{ mahasiswa.Nama }} - {{ mahasiswa.NIM }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <input type="email" v-model="inputEmail" placeholder="Email" required>
          </div>
          <div class="form-group">
            <input type="text" v-model="inputJudul" placeholder="Judul" required>
          </div>
          <div class="form-group">
            <label for="calonPembimbing1">Calon Pembimbing 1:</label>
            <select v-model="inputCalonPembimbing1" id="calonPembimbing1" @change="handlePembimbing1Change" required>
              <option value="" disabled>Pilih Pembimbing 1</option>
              <option v-for="dosen in dosenList" :key="dosen.NIP" :value="dosen.NIP">
                {{ dosen.Nama }} - {{ dosen.NIP }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="calonPembimbing2">Calon Pembimbing 2:</label>
            <select v-model="inputCalonPembimbing2" id="calonPembimbing2" required>
              <option value="" disabled>Pilih Pembimbing 2</option>
              <option v-for="dosen in filteredDosenList2" :key="dosen.NIP" :value="dosen.NIP">
                {{ dosen.Nama }} - {{ dosen.NIP }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <select v-model="inputKategoriTA" required>
              <option value="" disabled>Pilih Kategori TA</option>
              <option value="Penelitian">Penelitian</option>
              <option value="Proyek Desain">Proyek Desain</option>
              <option value="Pengembangan Produk">Pengembangan Produk</option>
            </select>
          </div>
          <div class="form-group">
            <select v-model="inputJenisTA" required>
              <option value="" disabled>Pilih Jenis TA</option>
              <option value="Laporan">Laporan</option>
              <option value="Paper">Paper</option>
            </select>
          </div>
          <div class="form-group">
            <button class="btttn tambah-button">Tambah Data Mahasiswa</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Button to open modal -->
    <button class="btttn tambah-button" @click="openModal">
      <i class="pi pi-plus-circle icon"></i> Tambah Data Mahasiswa
    </button>

    <!-- Success/Error Message -->
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <table class="mahasiswa-table">
      <!-- Table headers -->
      <thead>
        <tr>
          <th>No</th>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>NIM</th>
          <th>Email</th>
          <th>Judul</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <!-- Loop through mahasiswaList array -->
        <tr v-for="(mahasiswa, index) in mahasiswaList" :key="mahasiswa.nim">
          <!-- Display data for each mahasiswa -->
          <td>{{ index + 1 }}</td>
          <td>{{ mahasiswa.tanggal }}</td>
          <td>{{ mahasiswa.nama }}</td>
          <td>{{ mahasiswa.nim }}</td>
          <td>{{ mahasiswa.email }}</td>
          <td>{{ mahasiswa.judul }}</td>
          <td>{{ mahasiswa.status }}</td>
          <!-- Action buttons -->
          <td>
            <div class="aksi-buttons">
              <!-- Button to show details -->
              <button class="btttn tombol-detail" @click="showDetail(mahasiswa)">Detail</button>
              <!-- Button to delete -->
              <button class="btttn tombol-delete" @click="confirmDelete(mahasiswa)">Hapus</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mahasiswaList: [],
      mahasiswaOptions: [],
      showModal: false,
      selectedMahasiswa: '',
      inputEmail: '',
      inputJudul: '',
      inputCalonPembimbing1: '',
      inputCalonPembimbing2: '',
      inputKategoriTA: '',
      inputJenisTA: '',
      dosenList: [],
      filteredDosenList2: [], // To store the filtered list for Pembimbing 2
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://express-mysql-virid.vercel.app/api/pendaftaran', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.mahasiswaList = response.data;
        // Format the date
        this.mahasiswaList.forEach(mahasiswa => {
          mahasiswa.tanggal = new Date(mahasiswa.tanggal).toISOString().split('T')[0];
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchMahasiswaOptions() {
      try {
        const response = await axios.get('https://express-mysql-virid.vercel.app/api/mahasiswa', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.mahasiswaOptions = response.data;
      } catch (error) {
        console.error('Error fetching mahasiswa options:', error);
      }
    },
    async fetchDosen() {
      try {
        const response = await axios.get('https://express-mysql-virid.vercel.app/api/dosen', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.dosenList = response.data || [];
      } catch (error) {
        console.error('Error fetching dosen data:', error);
      }
    },
    async fetchDosenWithoutNIP(nip) {
      try {
        const response = await axios.get(`https://express-mysql-virid.vercel.app/api/dosen/without/${nip}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.filteredDosenList2 = response.data;
      } catch (error) {
        console.error('Error fetching filtered dosen list:', error);
      }
    },
    showDetail(mahasiswa) {
      this.$router.push({ name: 'FileMahasiswa', params: { nim: mahasiswa.nim } });
    },
    async confirmDelete(mahasiswa) {
      if (confirm("Apakah Anda yakin ingin menghapus data mahasiswa ini?")) {
        try {
          await axios.delete(`https://express-mysql-virid.vercel.app/api/pendaftaran/${mahasiswa.nim}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const index = this.mahasiswaList.findIndex(item => item.nim === mahasiswa.nim);
          if (index !== -1) {
            this.mahasiswaList.splice(index, 1);
          }
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      } else {
        console.log("Penghapusan data dibatalkan");
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.selectedMahasiswa = '';
      this.inputEmail = '';
      this.inputJudul = '';
      this.inputCalonPembimbing1 = '';
      this.inputCalonPembimbing2 = '';
      this.inputKategoriTA = '';
      this.inputJenisTA = '';
      this.successMessage = '';
      this.errorMessage = '';
    },
    async tambahData() {
      try {
        const NIM = this.selectedMahasiswa;
        const data = {
          NIM,
          Judul_TA: this.inputJudul,
          KategoriTA: this.inputKategoriTA,
          JenisTA: this.inputJenisTA,
          nip_pembimbing1: this.inputCalonPembimbing1,
          nip_pembimbing2: this.inputCalonPembimbing2,
          nip_penguji1: null,
          nip_penguji2: null,
          status: 'menunggu'
        };

        await axios.post('https://express-mysql-virid.vercel.app/api/pendaftaran', data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        this.successMessage = 'Data mahasiswa berhasil ditambahkan';
        this.closeModal();
        this.fetchData();
      } catch (error) {
        this.errorMessage = 'Terjadi kesalahan saat menambahkan data mahasiswa';
        console.error('Error adding data:', error);
      }
    },
    handlePembimbing1Change() {
      this.fetchDosenWithoutNIP(this.inputCalonPembimbing1);
    }
  },
  mounted() {
    this.fetchData();
    this.fetchDosen();
    this.fetchMahasiswaOptions();
  }
};
</script>

<style scoped>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

h2 {
  margin-top: 20px;
  margin-left: 20px;
}

.mahasiswa-table {
  width: 96.5%;
  max-width: 2000px;
  border-collapse: collapse;
  margin: 20px auto; /* Center the table */
}

.mahasiswa-table th,
.mahasiswa-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.mahasiswa-table th {
  background-color: #f2f2f2;
}

.mahasiswa-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.mahasiswa-table tr:hover {
  background-color: #ddd;
}

table tbody tr td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.aksi-buttons {
  display: flex;
}

.btttn {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
}

.tombol-detail {
  background-color: #2196F3;
  color: white;
  margin-right: 5px;
}

.tombol-delete {
  background-color: #f44336;
  color: white;
}

.tambah-button {
  background-color: #4CAF50;
  color: white;
  margin-left: 20px;
  margin-top: 20px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 15px;
  border: 1px solid #888;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
}

.close-btn {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-btn:hover,
.close-btn:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #45a049;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
