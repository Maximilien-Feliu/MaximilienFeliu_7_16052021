<template>
  <div class="home">
    <LoginHeader class="responsive_login" />

    <div id="body">

      <h1>Bienvenue sur le réseau social interne de Groupomania !</h1>

      <section>
        <article id="hello">

          <h2>Quel est le but de ce réseau social ?</h2>

          <p>
            Ce réseau social a pour but d'améliorer la communication entre collègues et de permettre à chacun de se connaître dans un cadre plus informel.
            <br/>Vous pouvez poster, commenter, liker et être à jour des dernières nouvelles de vos collègues de travail.
            <br/>Respect et bienveillance sont évidemment la règle d'or de ce réseau social. 
          </p>
        </article>

        <Signup />
      </section>
    </div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginHeader from '@/components/LoginHeader.vue'
import Signup from '@/components/Signup.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    LoginHeader,
    Signup,
    Footer
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/');
    }
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
#body {
  height: 100%;
  background-color: rgba(8, 8, 58, 0.699);
  width: 97%;
  margin-top: 2em;
  color: white;
}
h1{
  color: white;
  text-align: center;
  margin-bottom: 1em;
}
h2 {
  text-decoration: underline;
  margin-left: 2em;
  margin-top: 1em;
}
section {
  display: flex;
  justify-content: space-around;
}
#hello {
  width: 50%;
  position: relative;
  border-radius: 30px;
}
#hello:after {
  content: '';
  position: absolute;
  width: 73%;
  height: 70%;
  border-top-right-radius: 30px;
  border-top-left-radius: 20px;
  bottom: 30%;
  left: 27%;
  right: -20;
  border-top: 10px solid rgb(255, 57, 57);
  border-right: 10px solid rgb(255, 57, 57);
}
#hello p {
  font-size: 20px;
  line-height: 2em;
}
@media screen and (max-width: 768px) {
  section {
    flex-direction: column-reverse;
  }
  #hello {
    width: 100%;
  }
}
</style>
