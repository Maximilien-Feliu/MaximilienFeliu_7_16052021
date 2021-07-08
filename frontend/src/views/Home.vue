<template>

  <div class="home">
    <div id="header">
      <img class="logo" alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white-modif.png">
      <div id="login">
        <form action="#" id="login_form">
          <label for="login_email">Votre Email : </label>
          <input type="email" id="login_email" maxlength="255" required>
          <div id="login_error_email"></div>

          <label for="login_password">Votre Mot de passe :</label>
          <input type="password" id="login_password" maxlength="255" required>
          <div id="login_error_password"></div>

          <router-link to="/login">Se connecter</router-link>

        </form>
      </div>
    </div>
    <Bienvenue />
    <Footer />   
  </div>
  
</template>

<script>
// @ is an alias to /src
import Bienvenue from '@/components/Bienvenue.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Bienvenue,
    Footer
  }
}
</script>

<style scoped>
.home {
  background: url('../assets/building_background.jpg') fixed no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#header {
  display: flex;
  justify-content: space-between;
  background-color: rgba(8, 8, 58, 0.699);
  height: 70px;
  width: 97%;
}
.logo{
  width: 23%;
  height: 60px;
  padding: 0px;
  margin-left: 15px;
  margin-top: 5px;
}
#login{
  width: 50%;
  margin-right: 15px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
}
#login_form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
a {
  color: white;
}
a:hover {
  color: rgb(255, 57, 57);
  transition: .3s;
}
</style>
