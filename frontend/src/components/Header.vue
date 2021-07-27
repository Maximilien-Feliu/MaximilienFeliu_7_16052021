<template>
    <header>
      <router-link to="/"><img class="logo" alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white-modif.png"></router-link>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
header {
  background-color: rgba(8, 8, 58, 0.699);
  height: 70px;
  width: 100%;
}
.logo {
  width: 23%;
  height: 60px;
  padding: 0px;
  margin-left: 15px;
  margin-top: 5px;
}
</style>