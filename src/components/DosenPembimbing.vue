<template>
  <div>
    <h2>Data Dosen Pembimbing</h2>

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
  </div>
</template>

<script>
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
    fetchDosenList() {
      fetch('https://express-mysql-virid.vercel.app/api/dosen/pembimbing')
        .then(response => response.json())
        .then(data => {
          this.dosenList = data;
        })
        .catch(error => {
          console.error('Error fetching dosen pembimbing list:', error);
        });
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

h3 {
  text-align: center;
  margin-bottom: 15px;
  text-transform: capitalize;
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
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
}

.icon {
  margin-right: 5px;
  font-size: 14px;
  color: white;
}

.tombol-detail {
  background-color: #2196F3;
  color: white;
}

table tbody tr td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tombol-detail {
  margin: 0 5px;
}
</style>