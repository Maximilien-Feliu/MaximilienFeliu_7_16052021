<template>
    <div id="header">
      <img class="logo" alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white-modif.png">
      <div id="login">
        <form action="#" id="login_form">
          <label for="login_email">Votre Email : </label>
          <div class="input_error_container">
            <input type="email" v-model="state.email" id="login_email" maxlength="255" required>
            <div class="input_error" v-if="v$.email.$error" id="login_error_email">{{ v$.email.$errors[0].$message }}</div>
          </div>

          <label for="login_password">Votre Mot de passe :</label>
          <div class="input_error_container">
            <input type="password" v-model="state.password" id="login_password" maxlength="255" required>
            <div class="input_error" v-if="v$.password.$error" id="login_error_password">{{ v$.password.$errors[0].$message }}</div>
          </div>

          <a @click="login" >
            <span class="bold" v-if="status == 'loading'">Connection ...</span>
            <span class="bold" v-else>Se connecter</span>
          </a>

        </form>
      </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { mapState } from 'vuex'

export default {
    name: 'LoginHeader',
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
        ...mapState(['status'])
    }, 
    methods: {
      login () {
        this.v$.$validate();
        if (!this.v$.$error) {
          this.$store.dispatch('login', {
              email: this.state.email,
              password: this.state.password
          }).then((response) => {
            console.log(response);

          }).catch(() => {
            if (this.status == 'user_not_found') {
              this.$router.push('/login');
              return false;

            } else if (this.status == 'error_login_regex') {
              alert('Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !');

            } else if (this.status == 'error_blocked') {
              alert('Le nombre d\'essais autorisés a été dépassé, veuillez réessayer ultérieurement.')

            } else {
              this.$router.push('/:pathMatch(.*)');
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
.input_error_container {
  position: relative;
}
.input_error {
  position: absolute;
  bottom: -5;
  left: 0;
  width: 350px;
  color: rgb(255, 57, 57);
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