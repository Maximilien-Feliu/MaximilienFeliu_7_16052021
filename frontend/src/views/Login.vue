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
          <form id="login_page_form">
            <div class="input_error_container">
              <input type="email" v-model="state.email" id="login_page_email" maxlength="255" placeholder="Adresse mail" required>
              <div class="input_error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>
            </div>

            <div class="input_error_container">
              <input type="password" v-model="state.password" id="login_page_password" maxlength="255" placeholder="Mot de passe" required>
              <div class="input_error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</div>
            </div>

            <button type="button" @click="login" :class="{'button--disabled' : !validatedFields}">
              <span class="bold" v-if="status == 'loading'">Connection ...</span>
              <span class="bold" v-else>Se connecter</span>
            </button>

          </form>
        </div>
        <p>Vous n'avez pas encore de compte ? <router-link to="/">S'inscrire</router-link></p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Login',
    components: {
      Header,
      Footer,
    },
    setup () { 
        const state = reactive({
            email: '',
            password: '',
        })
        const rules = computed (() => {
            return {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                },
            }
        })
        const v$ = useVuelidate(rules, state);
        return {
            state,
            v$
        }
    },
    computed: {
        validatedFields () {
            if (this.state.email != "" && this.state.password != "") {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['status'])
    }, 
    methods: {
        login () {
            this.v$.$validate();
            if (!this.v$.$error) {
              const self = this;
                this.$store.dispatch('login', {
                    email: this.state.email,
                    password: this.state.password

                }).then((response) => {
                  console.log(response);

                }).catch((error) => {
                  if (self.status == 'user_not_found') {
                    console.log(error)
                    alert('Email et/ou mot de passe invalide');
                  
                  } else if (self.status == 'error_login_regex') {
                    alert('Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !');

                  } else if (self.status == 'error_blocked') {
                    alert('Le nombre d\'essais autorisés a été dépassé, veuillez réessayer ultérieurement.');

                  } else {
                    return self.$router.push('/:pathMatch(.*)');
                  }
                })
            } else {
                alert('veuillez renseigner les champs correctement.')
            }
        }
    }
}
</script>

<style scoped>
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
#login_page_form {
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
input {
  margin-bottom: 1em;
  margin-top: 0.5em;
  width: 30em;
  height: 30px;
  border-radius: 10px;
}
.input_error_container {
    display: flex;
    align-items: center;
}
.input_error {
    margin-left: 1em;
    margin-bottom: .5em;
    color: rgb(255, 57, 57);
}
.button_info {
  display: flex;
} 
.inputs_info {
  margin-left: 1em;
  font-size: 14px;
}
.button--disabled {
  pointer-events: none;
  background-color: rgba(194, 194, 194, 0.589);
  color: rgba(0, 0, 0, 0.589);
}
button {
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin-top: 1em;
  transition: .5s;
}
button:hover {
  background-color: rgb(255, 57, 57);
  transition: .3s;
  cursor: pointer;
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
</style>