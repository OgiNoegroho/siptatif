<template>
  <div class="dashboard-container">
    <div class="welcome-text">
      <h1>Selamat Datang di SIPTATIF</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac orci sit amet arcu tristique ornare at vitae enim. Nulla fermentum nec eros eu accumsan. In hac habitasse platea dictumst. Quisque facilisis leo ut augue egestas ultricies. Fusce tincidunt justo ut mi blandit, at vehicula odio tristique. In non tellus metus. Sed eu mi nec sem bibendum ultrices. Aliquam erat volutpat. Cras feugiat enim vel enim suscipit blandit. Curabitur finibus erat et odio efficitur, eget egestas dolor vehicula.
      </p>
      <p>
        Vivamus ullamcorper libero non justo aliquam, vitae tincidunt sem lobortis. Nam sed ex eget magna varius tristique. Integer nec sapien ipsum. In nec tristique purus. Quisque vitae turpis at nulla tincidunt fermentum. Aliquam eget mi ac ligula tincidunt luctus. Morbi ac elit sollicitudin, semper justo eget, ullamcorper leo. Nullam rutrum non metus id tincidunt. Donec sed tortor sed erat fringilla cursus. Sed non metus non ex venenatis volutpat.
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
  color: #333;
}

.welcome-text p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #666;
}

.purpose-container h2 {
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: #333;
}

.purpose-container p {
  font-size: 1em;
  line-height: 1.6;
  color: #666;
}

</style>
