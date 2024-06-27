<template>
  <div class="dashboard-container">
    <div class="welcome-text">
      <h1>Selamat Datang di SIPTATIF</h1>
      <p>
        Sistem Informasi Pendaftaran Tugas Akhir Mahasiswa TIF dirancang untuk menyediakan platform terintegrasi yang efisien bagi mahasiswa, dosen pembimbing, dan koordinator tugas akhir. Menampilkan ringkasan menyeluruh tentang proses pendaftaran, mencakup grafik visual yang memvisualisasikan jumlah mahasiswa yang sedang mendaftar, status pendaftaran, dan kemajuan proyek tugas akhir.</p>
        <p>
        Mahasiswa dapat mengajukan judul tugas akhir, memilih dosen pembimbing, dan mengunggah proposal melalui formulir elektronik yang disediakan. Selain itu, sistem ini memungkinkan pengelolaan dosen pembimbing dan informasi terkait jadwal konsultasi mereka. Untuk memantau kemajuan tugas akhir, mahasiswa dapat mengunggah laporan kemajuan dan dokumentasi lainnya, dengan notifikasi otomatis yang mengingatkan mereka tentang batas waktu penting seperti pengajuan proposal dan presentasi akhir. Dengan menyediakan penyimpanan elektronik untuk semua dokumen terkait tugas akhir dan riwayatnya, aplikasi ini tidak hanya meningkatkan efisiensi administrasi tetapi juga memperkuat kolaborasi antara mahasiswa dan dosen pembimbing, serta memungkinkan analisis data untuk perbaikan proses pendidikan di universitas.
      </p>
    </div>
    
    <div class="purpose-container">
      <h2>Tujuan Project:</h2>
      <p>
        Tujuan dari project ini adalah untuk menyediakan platform  yang user-friendly bagi Koordinator TA. Melalui project ini, Koordinator TA dapat dengan mudah memeriksa, memvalidasi, dan mengupdate status pendaftaran mahasiswa. Hal ini akan mempercepat proses penerimaan mahasiswa, meningkatkan efisiensi, dan mengurangi kesalahan administrasi.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
*{
  font-family: 'Poppins', sans-serif;
}
.dashboard-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 100px rgba(17, 42, 154, 0.1);
}

.welcome-text h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #000000;
}

.welcome-text p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
  color: #000000;
}

.purpose-container h2 {
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: #000000;
}

.purpose-container p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
  color: #000000;
}

</style>
