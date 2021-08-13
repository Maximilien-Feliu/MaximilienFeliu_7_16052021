<template>
    <div id="header">
      <img class="logo" alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white-modif.png">

      <LoginComponent />

      <button class="btn_login btn_login_responsive" @click="goToLogin">Se connecter</button>
    </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'

export default {
    name: 'LoginHeader',
    components: {
      LoginComponent
    },
    methods: {
      goToLogin () {
        this.$router.push('/login');
      }
    }
}
</script>

<style>
#header {
  display: flex;
  justify-content: space-between;
  background-color: rgba(8, 8, 58, 0.699);
  height: 70px;
  width: 97%;
  flex-wrap: wrap;
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
.input_error {
  position: absolute;
  bottom: -5;
  left: 0;
  width: 350px;
  color: rgb(255, 57, 57);
}
.btn_login {
  border: none; 
  background-color: transparent;
  color: rgb(255, 255, 255);
  text-decoration: underline;
  transition: .3s;
  font-size: 16px;
}
.btn_login:hover {
  cursor: pointer;
  color: rgb(255, 57, 57);
  transition: .3s;
}
.btn_login_responsive {
  display: none;
}
@media screen and (max-width: 1100px) {
  #login {
    display: none;
  }
  .btn_login_responsive {
    display: block;
  }
  .logo {
    width: 300px;
  }
}
@media screen and (max-width: 768px) {
  .btn_login_responsive {
    position: absolute;
    top: 10em;
    right: 5px;
    font-weight: bold;
    font-size: larger;
  }
}
@media screen and (max-width: 538px) {
  .btn_login_responsive {
    top: 12em
  }
}
</style>