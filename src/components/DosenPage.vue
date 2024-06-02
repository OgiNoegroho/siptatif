<template>
  <div>
    <h2>Data Dosen</h2>

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
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dosen, index) in dosenList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ dosen.Nama }}</td> <!-- Display nama of the dosen -->
          <td>{{ dosen.NIP }}</td> <!-- Display NIP of the dosen -->
          <td>
            <!-- Buttons for edit, delete, and detail actions -->
            <button class="btttn tombol-edit" @click="editDosen(index)">Edit</button>
            <button class="btttn tombol-delete" @click="confirmDelete(dosen.NIP, index)">Hapus</button>
            <button class="btttn tombol-detail" @click="showDetail(dosen)">Detail</button>
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
      dosenList: []
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
        });
    },
    showDetail(dosen) {
      this.$router.push({ name: 'Detai', params: { nip: dosen.NIP } });
    },
    confirmDelete(nip, index) {
      if (confirm("Apakah Anda yakin ingin menghapus data dosen ini?")) {
        fetch(`https://express-mysql-virid.vercel.app/api/dosen/${nip}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            this.dosenList.splice(index, 1);
            this.updateNoValues();
            console.log("Data dosen dihapus");
          } else {
            alert(result.message);
          }
        })
        .catch(error => {
          console.error('Error deleting dosen:', error);
        });
      } else {
        console.log("Penghapusan data dibatalkan");
      }
    },
    updateNoValues() {
      this.dosenList.forEach((dosen, index) => {
        dosen.no = index + 1;
      });
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
          nama: this.inputNama,
          nip: this.inputNIP
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.dosenList.push({
            Nama: this.inputNama,
            NIP: this.inputNIP
          });
          this.updateNoValues();
          this.resetForm();
          this.closeModal();
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error adding dosen:', error);
      });
    },
    updateData() {
      fetch(`https://express-mysql-virid.vercel.app/api/dosen/${this.inputNIP}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nama: this.inputNama
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.dosenList[this.editingIndex] = {
            Nama: this.inputNama,
            NIP: this.inputNIP
          };
          this.updateNoValues();
          this.resetForm();
          this.closeModal();
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error updating dosen:', error);
      });
    },
    editDosen(index) {
      this.editingIndex = index;
      const dosen = this.dosenList[index];
      this.inputNama = dosen.Nama;
      this.inputNIP = dosen.NIP;
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
    }
  }
}
</script>

<style scoped>
/* Styles for the component */
</style>





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
  cursor: pointer;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 7px;
}

#formTambahDosenModal input,
#formTambahDosenModal select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-container > .form-group:last-child {
  margin-bottom: 0;
}

table tbody tr td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tombol-edit,
.tombol-detail,
.tombol-delete {
  margin: 0 5px;
}
</style>

