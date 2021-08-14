<template>
    <div id="header">
      <div>
      <img class="logo" alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white-modif.png">
      </div>

      <LoginComponent id="login_header_form"/>

      <button class="btn_login_responsive" @click="goToLogin">Se connecter</button>
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
}
.logo{
  width: 100%;
  height: 60px;
  margin-left: 15px;
  margin-top: 5px;
}
#login_header_form .login_form {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
}
#login_header_form label {
  color: white;
  font-weight: bold;
}
#login_header_form .input_container {
  margin-right: 1.5em;
}
#login_header_form .input_error {
  position: absolute;
  bottom: -5;
  left: 0;
  width: 350px;
  color: rgb(255, 57, 57);
}
#login_header_form .btn_login, .btn_login_responsive {
  border: none; 
  margin-top: 17px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  text-decoration: underline;
  transition: .3s;
  font-size: 16px;
}
#login_header_form .btn_login:hover, .btn_login_responsive:hover {
  cursor: pointer;
  color: rgb(255, 57, 57);
  transition: .3s;
}
#login_header_form .button--disabled {
  pointer-events: none;
}
.btn_login_responsive {
  display: none;
}
@media screen and (max-width: 1024px) {
  #login_header_form {
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
    top: 11em
  }
}
</style>