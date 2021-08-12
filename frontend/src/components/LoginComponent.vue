<template>  
    <div id="login">
        <form action="#" id="login_form" >
          <label for="login_email">Votre Email : </label>
          <div class="input_error_container">
            <input type="email" v-model="state.email" id="login_email" maxlength="255" required>
            <div class="input_error" v-if="v$.email.$error" id="login_error_email">{{ v$.email.$errors[0].$message }}</div>
          </div>

          <label for="login_password">Votre Mot de passe :</label>
          <div class="input_error_container">
            <input type="password" v-model="state.password" id="login_password" maxlength="255" autocomplete="on" required>
            <div class="input_error" v-if="v$.password.$error" id="login_error_password">{{ v$.password.$errors[0].$message }}</div>
          </div>

          <button class="btn_login" :class="{'button--disabled' : !validatedFields}" type="submit" @click.prevent="login" >
            <span class="bold" v-if="status == 'loading'">Connection ...</span>
            <span class="bold" v-else>Se connecter</span>
          </button>

        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { mapState } from 'vuex'

export default {
    name: 'LoginComponent',
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
          this.$store.dispatch('login', {
              email: this.state.email,
              password: this.state.password
              
          }).then(() => {
            window.location.reload();
            this.$router.push('/');

          }).catch(() => {
            if (this.status == 'user_not_found') {
              this.$router.push('/login');

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

<style>
#login_form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.input_error_container {
  position: relative;
}
.input_error {
  color: rgb(255, 57, 57);
}
.button--disabled {
  pointer-events: none;
  background-color: rgba(194, 194, 194, 0.589);
  color: rgba(0, 0, 0, 0.589);
}
.btn_login {
  transition: .3s;
  font-size: 16px;
}
.btn_login:hover {
  cursor: pointer;
  color: grey;
  transition: .3s;
}
</style>
