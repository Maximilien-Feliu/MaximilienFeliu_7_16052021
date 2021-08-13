<template>
  <div class="login_page">

    <Header />

    <div class="login_main_container">
      <div class="login_main">    
        <div class="login_form_warning">
          <h1>Connexion à votre compte</h1>
          <p class="warning" v-if="status == 'user_not_found'">
            Email et/ou mot de passe invalide.
            <br />Attention ! Vous n'avez le droit qu'à 5 tentatives...
          </p>

          <LoginComponent id="login_page_form" />

        </div>
        <p>Vous n'avez pas encore de compte ? <router-link to="/">S'inscrire</router-link></p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Login',
    components: {
      Header,
      Footer,
      LoginComponent
    },
    mounted: function () { 
      if (this.$store.state.user.userId != -1) {
        this.$router.push('/');
        return;
      }
    },
    computed: {
        ...mapState({
            status: 'status',
            user: 'user',
            userInfos: 'userInfos'
        })
    },
}
</script>

<style>
.login_page {
  background: url('../assets/building_background.jpg') fixed no-repeat center;
  background-size: cover;
}
.login_main_container {
  display: flex;
  justify-content: center;
}
.login_form_warning {
  background-color: rgba(147, 147, 189, 0.349);
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}
.warning {
  margin-top: 1em;
  color: rgb(255, 57, 57);
  font-weight: bold;
}
.login_main {
  background-color: rgba(8, 8, 58, 0.699);
  color: white;
  width: 65%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}
#login_page_form #login_form{
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#login_page_form input {
  margin-bottom: 1em;
  margin-top: 0.5em;
  width: 30em;
  height: 30px;
  border-radius: 10px;
}
#login_page_form .input_error_container {
    display: flex;
    align-items: center;
}
#login_page_form .input_error {
    margin-bottom: .5em;
    margin-left: 27em;
}
#login_page_form .btn_login {
  background-color: white;
  color: black;
  text-decoration: inherit;
  width: 150px;
  border-radius: 5px;
  margin-top: 1em;
}
#login_page_form .button--disabled {
  pointer-events: none;
  background-color: rgba(194, 194, 194, 0.589);
  color: rgba(0, 0, 0, 0.589);
}
#login_page_form .btn_login:hover {
  cursor: pointer;
  color: grey;
  transition: .3s;
}
a {
  color: rgb(255, 255, 255);
  text-decoration: underline;
  transition: .3s;
}
a:hover {
  cursor: pointer;
  color: rgb(255, 57, 57);
  transition: .3s;
}
@media screen and (max-width: 1100px) {
  .login_main {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  #login_page_form input {
    width: 15em;
  }
}
</style>