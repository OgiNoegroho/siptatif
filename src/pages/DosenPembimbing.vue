<template>
  <div>
    <h2>Data Dosen Pembimbing</h2>

    <div class="table-wrapper">
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
            <td>{{ dosen.nama_pembimbing }}</td>
            <td>{{ dosen.nip_pembimbing }}</td>
            <td>
              <button class="btttn tombol-detail" @click="showDetail(dosen)">Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="card-wrapper">
        <div class="card" v-for="(dosen, index) in dosenList" :key="index">
          <div class="card-header">
            <span>No: {{ index + 1 }}</span>
          </div>
          <div class="card-body">
            <p><strong>Nama Dosen:</strong> {{ dosen.nama_pembimbing }}</p>
            <p><strong>NIP:</strong> {{ dosen.nip_pembimbing }}</p>
          </div>
          <div class="card-footer">
            <button class="btttn tombol-detail" @click="showDetail(dosen)">Detail</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showModal: false,
      inputNama: '',
      inputNIP: '',
      dosenList: []
    };
  },
  created() {
    this.fetchDosenList();
  },
  methods: {
    async fetchDosenList() {
      try {
        const response = await axios.get('https://express-mysql-virid.vercel.app/api/dosen/pembimbing', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.dosenList = response.data;
      } catch (error) {
        console.error('Error fetching dosen pembimbing list:', error);
      }
    },
    showDetail(dosen) {
      this.$router.push({ name: 'DetailPembimbing', params: { nip_pembimbing: dosen.nip_pembimbing } });
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
  text-align: center;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.table-wrapper {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  align-items: center;
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

.card-wrapper {
  display: none;
}

.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px 0;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header,
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body p {
  margin: 10px 0;
}

@media screen and (max-width: 768px) {
  table {
    display: none;
  }
  .card-wrapper {
    display: block;
  }

  .btttn {
  margin: auto;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  display: block;
  flex-grow: 1;
}

}
</style>