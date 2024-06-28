<template>
  <div>
    <h2>Data Dosen</h2>

    <!-- Modal for Tambah Data Dosen -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <br>
        <br>
        <h3>{{ editingIndex === null ? 'Tambah' : 'Edit' }} Data Dosen</h3>
        <form id="formTambahDosenModal" @submit.prevent="submitForm" class="form-container">
          <div class="form-group">
            <input type="text" v-model="inputNama" placeholder="Nama Dosen" required>
          </div>
          <div class="form-group">
            <input type="text" v-model="inputNIP" placeholder="NIP" required>
          </div>
          <div class="form-group">
            <select v-model="inputJenisKelamin" required>
              <option value="" disabled selected>Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btttn tambah-button">
              {{ editingIndex === null ? 'Tambah' : 'Update' }} Data Dosen
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Button to open modal -->
    <button class="btttn tambah-button" @click="openModal">
      Tambah Data Dosen
    </button>

    <!-- Table to display dosen -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Dosen</th>
            <th>NIP</th>
            <th>Jenis Kelamin</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dosen, index) in dosenList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ dosen.Nama }}</td>
            <td>{{ dosen.NIP }}</td>
            <td>{{ dosen.JenisKelamin }}</td>
            <td>
              <button class="btttn tombol-edit" @click="editDosen(index)">Edit</button>
              <button class="btttn tombol-delete" @click="confirmDelete(dosen.NIP, index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card layout for mobile -->
    <div class="card-layout">
      <div v-for="(dosen, index) in dosenList" :key="index" class="card">
        <div class="card-content">
          <p><strong>Nama:</strong> {{ dosen.Nama }}</p>
          <p><strong>NIP:</strong> {{ dosen.NIP }}</p>
          <p><strong>Jenis Kelamin:</strong> {{ dosen.JenisKelamin }}</p>
          <div class="card-actions">
            <button class="btttn tombol-edit" @click="editDosen(index)">Edit</button>
            <button class="btttn tombol-delete" @click="confirmDelete(dosen.NIP, index)">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      showModal: false,
      editingIndex: null,
      inputNama: '',
      inputNIP: '',
      inputJenisKelamin: '',
      dosenList: []
    };
  },
  created() {
    this.fetchDosenList();
  },
  methods: {
    async fetchDosenList() {
      const toast = useToast();
      try {
        const response = await axios.get('https://express-mysql-virid.vercel.app/api/dosen', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.dosenList = response.data;
      } catch (error) {
        console.error('Error fetching dosen list:', error);
        toast.error('Error fetching dosen list');
      }
    },
    async confirmDelete(nip, index) {
      const toast = useToast();
      if (confirm("Apakah Anda yakin ingin menghapus data dosen ini?")) {
        try {
          const response = await axios.delete(`https://express-mysql-virid.vercel.app/api/dosen/${nip}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.data.error) {
            this.dosenList.splice(index, 1);
            toast.success('Data dosen berhasil dihapus');
          } else {
            toast.error(response.data.error);
          }
        } catch (error) {
          console.error('Error deleting dosen:', error);
          toast.error('Error deleting dosen');
        }
      }
    },
    async submitForm() {
      if (this.editingIndex === null) {
        await this.tambahData();
      } else {
        await this.updateData();
      }
    },
    async tambahData() {
      const toast = useToast();
      try {
        const response = await axios.post('https://express-mysql-virid.vercel.app/api/dosen', {
          NIP: this.inputNIP,
          Nama: this.inputNama,
          JenisKelamin: this.inputJenisKelamin
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.data.error) {
          this.dosenList.push({
            Nama: this.inputNama,
            NIP: this.inputNIP,
            JenisKelamin: this.inputJenisKelamin
          });
          this.resetForm();
          this.closeModal();
          toast.success('Data dosen berhasil ditambahkan');
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.error('Error adding dosen:', error);
        toast.error('Error adding dosen');
      }
    },
    async updateData() {
      const toast = useToast();
      try {
        const response = await axios.put(`https://express-mysql-virid.vercel.app/api/dosen/${this.inputNIP}`, {
          Nama: this.inputNama,
          JenisKelamin: this.inputJenisKelamin
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.data.error) {
          this.dosenList[this.editingIndex] = {
            Nama: this.inputNama,
            NIP: this.inputNIP,
            JenisKelamin: this.inputJenisKelamin
          };
          this.resetForm();
          this.closeModal();
          toast.success('Data dosen berhasil diupdate');
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.error('Error updating dosen:', error);
        toast.error('Error updating dosen');
      }
    },
    editDosen(index) {
      this.editingIndex = index;
      const dosen = this.dosenList[index];
      this.inputNama = dosen.Nama;
      this.inputNIP = dosen.NIP;
      this.inputJenisKelamin = dosen.JenisKelamin;
      this.openModal();
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingIndex = null;
    },
    resetForm() {
      this.inputNama = '';
      this.inputNIP = '';
      this.inputJenisKelamin = '';
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

h2 {
  margin-top: 20px;
  margin-left: 20px;
}

h3{
text-align: center;
}

.table-wrapper {
  display: none;
}

table {
  width: 96.5%;
  max-width: 2000px;
  border-collapse: collapse;
  margin: 20px auto;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table tbody tr td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btttn {
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
}

.tambah-button {
  background-color: #4CAF50;
  color: white;
  margin-left: 20px;
  margin-top: 20px;
}

.icon {
  margin-right: 5px;
  font-size: 14px;
  color: white;
}

/* Modal Styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1002;
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
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
}

.close-btn {
  color: #030303;
  float: right;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 28px;
  font-weight: bold;
}

.close-btn:hover,
.close-btn:focus {
  color: rgb(241, 4, 4);
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
  width: 88%;
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

.card-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.card {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  flex-grow: 1;
}

.card-content h3 {
  margin-bottom: 10px;
}

.card-content p {
  margin: 5px 0;
}

.card-actions {
  display: flex;
  justify-content: space-between; /* Mengatur jarak antara tombol */
}

.card-actions button {
  flex-grow: 1; /* Tombol akan memenuhi ruang yang tersedia */
  margin: 1px; /* Menghilangkan margin agar tombol berdekatan */
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 14px; /* Ukuran teks tombol */
  text-align: center; /* Teks di tengah tombol */
}

.tombol-edit {
  background-color: #FFC107;
  color: white;
}

.tombol-delete {
  background-color: #f44336;
  color: white;
}

@media screen and (min-width: 769px) {
  .card-layout {
    display: none;
  }
  
  .table-wrapper {
    display: block;
  }

  .btttn .tombol-delete {
    display: block;
  }
}
</style>
