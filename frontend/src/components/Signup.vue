<template>
    <article id="signup">

        <h2>S'inscrire</h2>

        <form action="#" id="signup_form">

          <label for="signup_email">Votre <span class="bold">Email</span>* : </label>
          <div class="input_error_container">
            <input v-model="state.email" type="email" id="signup_email" maxlength="255" required>
            <div class="input_error" v-if="v$.email.$error" >{{ v$.email.$errors[0].$message }}</div>
            <div class="input_error" v-else-if="status == 'error_email'" >Cet email existe déjà.</div>
          </div>

          <label for="signup_password">Votre <span class="bold">mot de passe</span> (6 caractères minimum)* :</label>
          <div class="input_error_container">
            <input v-model="state.password.password" type="password" id="signup_password" minlength="6" maxlength="255" required>
            <div class="input_error" v-if="v$.password.password.$error" >{{ v$.password.password.$errors[0].$message }}</div>
          </div>

          <label for="signup_password_confirm">Confirmez votre <span class="bold">mot de passe</span>* :</label> 
          <div class="input_error_container">
            <input v-model="state.password.confirm" type="password" id="signup_password_confirm" maxlength="255" required>
            <div class="input_error" v-if="v$.password.confirm.$error" >{{ v$.password.confirm.$errors[0].$message }}</div>
          </div>

          <label for="signup_firstName">Votre <span class="bold">Prénom</span>* :</label>
          <div class="input_error_container">
            <input v-model="state.firstName" type="text" id="signup_firstName" maxlength="75" required>
            <div class="input_error" v-if="v$.firstName.$error" >{{ v$.firstName.$errors[0].$message }}</div>
          </div>

          <label for="signup_lastName">Votre <span class="bold">Nom</span>* :</label>
          <div class="input_error_container">
            <input v-model="state.lastName" type="text" id="signup_lastName" maxlength="75" required>
            <div class="input_error" v-if="v$.lastName.$error" >{{ v$.lastName.$errors[0].$message }}</div>
          </div>

          <label for="signup_department">Le <span class="bold">département</span> dans lequel vous travaillez* :</label>
          <div class="input_error_container">
            <input v-model="state.department" type="text" id="signup_department" maxlength="255" required>
            <div class="input_error" v-if="v$.department.$error" >{{ v$.department.$errors[0].$message }}</div>
          </div>

          <div class="input_error" v-if="status == 'error_regex'" >Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !</div>
          <div class="button_info">
            <button @click="createAccount" type="button" :class="{'button--disabled' : !validatedFields}" >
              <span class="bold" v-if="status == 'loading'">Inscription...</span>
              <span class="bold" v-else>S'inscrire</span>
            </button> 
            <p class="inputs_info">* tous les éléments sont obligatoires</p>
          </div>
          
        </form>
    </article>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength, maxLength } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { mapState } from 'vuex'

export default {
    name: 'Signup',
    setup () { 
        const state = reactive({
            email: '',
            password: {
                password: '',
                confirm: ''
            }, 
            firstName: '',
            lastName: '',
            department: '',
        })
        const rules = computed (() => {
            return {
                email: {
                    required,
                    email
                },
                password: {
                    password: { 
                        required,
                        minLength: minLength(6),
                        maxLength: maxLength(255)
                    },
                    confirm: {
                        required,
                        sameAsPassword: sameAs(state.password.password)
                    }
                },
                firstName: {
                    required,
                    maxLength: maxLength(75)
                },
                lastName: {
                    required,
                    maxLength: maxLength(75)
                },
                department: {
                    required,
                    maxLength: maxLength(255)
                }
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
            if (this.state.email != "" && this.state.password.password != "" && this.state.password.confirm != "" && this.state.firstName != "" && this.state.lastName != "" && this.state.department != "") {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['status'])
    }, 
    methods: {
        createAccount () {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.$store.dispatch('createAccount', {
                    email: this.state.email,
                    password: this.state.password.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    department: this.state.department
                }).then(() => {
                  this.$store.dispatch('login', {
                    email: this.state.email,
                    password: this.state.password.password

                  }).then(async() => {
                    await this.$router.push('/completeProfile');

                  }).catch(() => {
                    this.$router.push('/:pathMatch(.*)');
                  })
                }).catch(() => {
                  if (this.status == 'error_email') {
                    alert('Cet email existe déjà.');

                  } else if (this.status == 'error_too_many') {
                    alert('Désolé, vous avez créé trop de comptes. Veuillez réessayer dans 24h.')
                    
                  } else if (this.status == 'error_regex') {
                    alert('Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !')

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
h2 {
    text-decoration: underline;
    margin-left: 2em;
    margin-top: 1em;
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
</style>
