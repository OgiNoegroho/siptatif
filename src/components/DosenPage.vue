<template>
  <div>
    <h2>Data Dosen</h2>

    <!-- Display Success/Error Message -->
    <div v-if="message" :class="messageType">{{ message }}</div>

    <!-- Modal for Tambah Data Dosen -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
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
      <i class="pi pi-plus-circle icon"></i> Tambah Data Dosen
    </button>

    <!-- Table to display dosen -->
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
          <td>{{ dosen.Nama }}</td> <!-- Display nama of the dosen -->
          <td>{{ dosen.NIP }}</td> <!-- Display NIP of the dosen -->
          <td>{{ dosen.JenisKelamin }}</td> <!-- Display JenisKelamin of the dosen -->
          <td>
            <!-- Buttons for edit, delete, and detail actions -->
            <button class="btttn tombol-edit" @click="editDosen(index)">Edit</button>
            <button class="btttn tombol-delete" @click="confirmDelete(dosen.NIP, index)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      editingIndex: null,
      inputNama: '',
      inputNIP: '',
      inputJenisKelamin: '',
      dosenList: [],
      message: '',
      messageType: ''
    };
  },
  created() {
    this.fetchDosenList();
  },
  methods: {
    fetchDosenList() {
      fetch('https://express-mysql-virid.vercel.app/api/dosen')
        .then(response => response.json())
        .then(data => {
          this.dosenList = data;
        })
        .catch(error => {
          console.error('Error fetching dosen list:', error);
          this.displayMessage('Error fetching dosen list', 'error');
        });
    },
    confirmDelete(nip, index) {
      if (confirm("Apakah Anda yakin ingin menghapus data dosen ini?")) {
        fetch(`https://express-mysql-virid.vercel.app/api/dosen/${nip}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
          if (!result.error) {
            this.dosenList.splice(index, 1);
            this.displayMessage('Data dosen berhasil dihapus', 'success');
          } else {
            this.displayMessage(result.error, 'error');
          }
        })
        .catch(error => {
          console.error('Error deleting dosen:', error);
          this.displayMessage('Error deleting dosen', 'error');
        });
      }
    },
    submitForm() {
      if (this.editingIndex === null) {
        this.tambahData();
      } else {
        this.updateData();
      }
    },
    tambahData() {
      fetch('https://express-mysql-virid.vercel.app/api/dosen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          NIP: this.inputNIP,
          Nama: this.inputNama,
          JenisKelamin: this.inputJenisKelamin
        })
      })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          this.dosenList.push({
            Nama: this.inputNama,
            NIP: this.inputNIP,
            JenisKelamin: this.inputJenisKelamin
          });
          this.resetForm();
          this.closeModal();
          this.displayMessage('Data dosen berhasil ditambahkan', 'success');
        } else {
          this.displayMessage(data.error, 'error');
        }
      })
      .catch(error => {
        console.error('Error adding dosen:', error);
        this.displayMessage('Error adding dosen', 'error');
      });
    },
    updateData() {
      fetch(`https://express-mysql-virid.vercel.app/api/dosen/${this.inputNIP}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Nama: this.inputNama,
          JenisKelamin: this.inputJenisKelamin
        })
      })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          this.dosenList[this.editingIndex] = {
            Nama: this.inputNama,
            NIP: this.inputNIP,
            JenisKelamin: this.inputJenisKelamin
          };
          this.resetForm();
          this.closeModal();
          this.displayMessage('Data dosen berhasil diupdate', 'success');
        } else {
          this.displayMessage(data.error, 'error');
        }
      })
      .catch(error => {
        console.error('Error updating dosen:', error);
        this.displayMessage('Error updating dosen', 'error');
      });
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
    },
    displayMessage(message, type) {
      this.message = message;
      this.messageType = type;
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
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

table {
  width: 96.5%;
  max-width: 1500px;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
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

.btttn {
  padding: 8px 12px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
}

.tambah-button {
  background-color: #36802D;
  color: white;
  float: left;
  margin-bottom: 20px;
  margin-top: 10px;
}

.icon {
  margin-right: 5px;
  font-size: 14px;
  color: white;
}

.tombol-edit {
  background-color: #FFC107;
  color: white;
}

.tombol-detail {
  background-color: #2196F3;
  color: white;
}

.tombol-delete {
  background-color: #f44336;
  color: white;
}

/* Modal Styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal-content {
  position: relative;
  padding: 20px;
  background-color: #fefefe;
  border-radius: 5px;
  width: 60%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 10px;
  width: 100%;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.tambah-button {
  background-color: #36802D;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

.message {
  margin: 20px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.success {
  background-color: #4CAF50;
  color: white;
}

.error {
  background-color: #f44336;
  color: white;
}
</style>
