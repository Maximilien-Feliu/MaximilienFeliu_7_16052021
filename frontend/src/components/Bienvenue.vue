<template>
  <div id="body">
    <h1>Bienvenue sur le réseau social interne de Groupomania !</h1>
    <section>
      <article id="hello">

        <h2>Quel est le but de ce réseau social ?</h2>
        <p>Ce réseau social a pour but d'améliorer la communication entre collègues et de permettre à chacun de se connaître dans un cadre plus informel.
        <br/>Vous pouvez poster, commenter, liker et être à jour des dernières nouvelles de vos collègues de travail.
        <br/>Respect et bienveillance sont évidemment la règle d'or de ce réseau social. 
        </p>
      </article>
      <article id="signup">

        <h2>S'inscrire</h2>

        <form action="#" id="signup_form">

          <label for="signup_email">Votre <span class="bold">Email</span>* : </label>
          <input type="email" id="signup_email" maxlength="255" required>
          <div id="signup_error_email"></div>

          <label for="signup_password">Votre <span class="bold">mot de passe</span>* :</label>
          <input type="password" id="signup_password" maxlength="255" required>
          <div id="signup_error_password"></div>

          <label for="signup_password_confirm">Confirmez votre <span class="bold">mot de passe</span>* :</label>
          <input type="password" id="signup_password_confirm" maxlength="255" required>
          <div id="signup_error_password_confirm"></div>

          <label for="signup_firstName">Votre <span class="bold">Prénom</span>* :</label>
          <input type="text" id="signup_firstName" maxlength="75" required>
          <div id="signup_error_firstName"></div>

          <label for="signup_lastName">Votre <span class="bold">Nom</span>* :</label>
          <input type="text" id="signup_lastName" maxlength="75" required>
          <div id="signup_error_lastName"></div>

          <label for="signup_department">Le <span class="bold">département</span> dans lequel vous travaillez * :</label>
          <input type="text" id="signup_department" maxlength="255" required>
          <div id="signup_error_department"></div>

          <router-link to="/signup"><button type="submit"><span class="bold">S'inscrire</span></button></router-link> 

        </form>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
#signup {
  width: 45%;
  position: relative;
  border-radius: 30px;
  padding-left: 2em;
  padding-bottom: 2em;
  margin-bottom: 1em;
}
#signup:before {
  content: '';
  position: absolute;
  height: 70%;
  width: 73%;
  bottom: 0;
  left: 0;
  border-left: 10px solid rgb(255, 57, 57);
  border-bottom: 10px solid rgb(255, 57, 57);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 20px;
  z-index: 0;
}
#signup_form {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 5em;
  z-index: 100;
}
input {
  margin-bottom: 1em;
  margin-top: 0.5em;
  width: 30%;
}
button {
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin-top: 1em;
}
button:hover {
  background-color: rgb(255, 57, 57);
  transition: .3s;
  cursor: pointer;
}
</style>
