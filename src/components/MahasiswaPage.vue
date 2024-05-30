<template>
  <div>
    <h2>Data Mahasiswa</h2>

    <!-- Modal for Tambah Data Mahasiswa -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h3>Tambah Data Mahasiswa</h3>
        <form id="formTambahDataModal" class="form-container">
          <div class="form-group">
            <input type="text" v-model="inputTanggal" placeholder="Tanggal">
          </div>
          <div class="form-group">
            <!-- Combined field for Nama dan NIM -->
            <select v-model="selectedMahasiswa" id="mahasiswa">
              <option v-for="mahasiswa in mahasiswaOptions" :key="mahasiswa.nim">{{ mahasiswa.nama_mahasiswa }} - {{ mahasiswa.nim_mahasiswa }}</option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" v-model="inputEmail" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="text" v-model="inputJudul" placeholder="Judul">
          </div>
          <div class="form-group">
            <label for="calonPembimbing1">Calon Pembimbing 1:</label>
            <select v-model="inputCalonPembimbing1" id="calonPembimbing1">
              <option v-for="dosen in availableDosenList1" :key="dosen.nip" :value="dosen.nip">{{ dosen.nama_dosen }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="calonPembimbing2">Calon Pembimbing 2:</label>
            <select v-model="inputCalonPembimbing2" id="calonPembimbing2">
              <option v-for="dosen in availableDosenList2" :key="dosen.nip" :value="dosen.nip">{{ dosen.nama_dosen }}</option>
            </select>
          </div>
          <div class="form-group">
            <input type="file" @change="onFileChange" placeholder="Berkas">
          </div>
          <div class="form-group">
            <select id="kategoriTA" v-model="inputKategoriTA">
              <option value="Penelitian">Penelitian</option>
              <option value="Proyek Desain">Proyek Desain</option>
              <option value="Pengembangan Produk">Pengembangan Produk</option>
            </select>
          </div>
          <div class="form-group">
            <select id="jenisTA" v-model="inputJenisTA">
              <option value="Laporan">Laporan</option>
              <option value="Paper">Paper</option>
            </select>
          </div>
          <div class="form-group">
            <button class="btttn tambah-button" @click.prevent="tambahData">Tambah Data Mahasiswa</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Button to open modal -->
    <button class="btttn tambah-button" @click="openModal">
      <i class="pi pi-plus-circle icon"></i> Tambah Data Mahasiswa
    </button>

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
      mahasiswaOptions: [], // Array to hold mahasiswa options
      showModal: false,
      inputTanggal: '',
      selectedMahasiswa: '', // Updated to hold selected mahasiswa
      inputEmail: '',
      inputJudul: '',
      inputCalonPembimbing1: '',
      inputCalonPembimbing2: '',
      inputKategoriTA: '',
      inputJenisTA: '',
      availableDosenList1: [],
      availableDosenList2: [],
      selectedFile: null
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/api/pendaftaran');
        this.mahasiswaList = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchMahasiswaOptions() { // Fetch mahasiswa options from endpoint
      try {
        const response = await axios.get('/api/mahasiswa/nim');
        this.mahasiswaOptions = response.data;
      } catch (error) {
        console.error('Error fetching mahasiswa options:', error);
      }
    },
    async fetchDosen() {
      try {
        const response = await axios.get('/api/dosen/mahasiswapdosen');
        const dosenList = response.data.dosenList;

        // Filter out the Dosen who are already chosen as Pembimbing 1 or Pembimbing 2
        this.availableDosenList1 = dosenList.filter(dosen => dosen.nip !== this.inputCalonPembimbing2);
        this.availableDosenList2 = dosenList.filter(dosen => dosen.nip !== this.inputCalonPembimbing1);
      } catch (error) {
        console.error('Error fetching dosen data:', error);
      }
    },
    showDetail(mahasiswa) {
      this.$router.push({ name: 'FileMahasiswa', params: { nim: mahasiswa.nim } });
    },
    async confirmDelete(mahasiswa) {
      if (confirm("Apakah Anda yakin ingin menghapus data mahasiswa ini?")) {
        try {
          // Send request to delete data
          await axios.delete(`/api/pendaftaran/${mahasiswa.nim}`);
          // Remove deleted mahasiswa from mahasiswaList
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
      this.inputTanggal = '';
      this.selectedMahasiswa = ''; // Reset selectedMahasiswa
      this.inputEmail = '';
      this.inputJudul = '';
      this.inputCalonPembimbing1 = '';
      this.inputCalonPembimbing2 = '';
      this.inputKategoriTA = '';
      this.inputJenisTA = '';
      this.selectedFile = null;
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    generateIdPendaftaran() {
      // Generate a unique ID for the pendaftaran. This is just a simple example.
      return 'P' + new Date().getTime();
    },
    async tambahData() {
      const selectedMahasiswaData = this.selectedMahasiswa.split(' - '); // Split selected mahasiswa to extract Nama and NIM
      const formData = new FormData();
      formData.append('id_pendaftaran', this.generateIdPendaftaran());
      formData.append('tanggal', this.inputTanggal);
      formData.append('nama', selectedMahasiswaData[0]); // Extracted Nama
      formData.append('nim', selectedMahasiswaData[1]); // Extracted NIM
      formData.append('email', this.inputEmail);
      formData.append('judul', this.inputJudul);
      formData.append('nip_pembimbing1', this.inputCalonPembimbing1);
      formData.append('nip_pembimbing2', this.inputCalonPembimbing2);
      formData.append('kategoriTA', this.inputKategoriTA);
      formData.append('jenisTA', this.inputJenisTA);
      formData.append('status', 'menunggu');
      if (this.selectedFile) {
        formData.append('berkas', this.selectedFile);
      }

      try {
        const response = await axios.post('/api/pendaftaran', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.mahasiswaList.push(response.data);
        this.closeModal();
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
    this.fetchDosen();
    this.fetchMahasiswaOptions(); // Call fetchMahasiswaOptions on mount
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
</style>
