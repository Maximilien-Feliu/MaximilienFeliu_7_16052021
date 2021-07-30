<template>
    <div class="complete_profile_page">
        <Header />
        <div class="main_container">
            <div class="main">
                <h1 class="title_appear">Bienvenue, {{ userInfos.firstName }} !</h1>
                <p>
                    Afin de compléter votre profil, nous vous invitons à modifier votre photo de profil pour que vos collègues puissent vous reconnaître plus aisément.
                    <br />Vous pouvez aussi ajouter une biographie si vous le souhaitez !
                    <br />Sinon, vous pouvez passer cette page et modifier votre profil quand vous le souhaitez.
                </p>

                <div class="img_update">
                    <div class="img_border">
                        <img :src="previewImage || userInfos.attachment" :alt="'photo de profil de ' + `${userInfos.firstName}`">
                    </div>
                    <br />
                    <label for="file_upload"><div class="btn_file">Modifier</div></label>
                    <input id="file_upload" name="file_upload" class="input_file" type="file" accept="image/*" @change="uploadImage">
                </div>

                <br />
                <label for="profile_bio" class="label_bio">Rédigez une biographie pour que l'on vous connaisse d'avantage.</label>
                <textarea id="profile_bio" v-model="bio" name="profile_bio" maxlength="255"></textarea>
                
                <div class="submit_choice">
                    <button class="btn_complete" type="button" @click="completeProfile">Valider les changements</button>
                    <router-link to="/">Plus tard</router-link>
                </div>
    
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'CompleteProfile',
    components: {
        Header,
        Footer,
    },
    data () {
        return {
            previewImage: null,
            attachment: 'http://localhost:3000/images/profile_default.jpg',
            bio: null
        }
    },
    mounted: function () { 
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/home');
            return;
        }
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            status: 'status',
            user: 'user',
            userInfos: 'userInfos'
        })
    },
    methods: {
        uploadImage(e){
            this.files = e.target.files[0];
            this.previewImage = URL.createObjectURL(this.files);
        },
        completeProfile () {
            const formData = new FormData();

            if(this.files != undefined) {
                formData.append('attachment', this.files);
            }
            if(this.bio != null) {
                formData.append('bio', this.bio.match(/^[\w-.,\s\n\(\)!'"\?éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,300}$/));
            }

            this.$store.dispatch('updateProfile', formData) 
            .then(() => {
                this.$router.push('/'); 
            })
            .catch(() => {
                if (this.status == 'not_allowed_to_update') {
                    alert('Vous n\'êtes pas autorisé à modifier ce profil.');

                } else if (this.status == 'error_update_regex') {
                    alert('Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !')
                
                } else {
                    this.$router.push('/:pathMatch(.*)');
                }
            })
        }
    }
}
</script>

<style scoped>
.complete_profile_page {
    background: url('../assets/building_background.jpg') fixed no-repeat center;
    background-size: cover;
}
.main_container {
    display: flex;
    justify-content: center;
    margin-top: 1em;
}
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: white;
    width: 70%;
    border-radius: 10px;
}
.title_appear {
    animation: title 1s ease-in-out;
}
.img_update {
    position: relative;
    margin-top: 1.5em;
}
.img_border {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid rgb(8, 8, 58);
}
img {
    width: 148px;
    height: 148px;
    border-radius: 50%;
    object-fit: cover;
}
input {
    margin-bottom: 2em;
}
.btn_file {
    position: absolute;
    bottom: 20px;
    right: -50px;
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 130px;
    height: 30px;
    transition: .3s;
}
.btn_file:hover {
    background-color: rgba(8, 8, 58, 0.589);
}
.input_file {
    display: none;
}
.label_bio {
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: .5em;
}
#profile_bio {
    width: 40em;
    height: 10em;
    margin-bottom: 1.5em;
}
.submit_choice {
    position: relative;
    margin-bottom: 1em;
    width: 100%;
}
.btn_complete {
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    font-weight: bold;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    transition: .5s;
    margin-left: 3em;
}
.btn_complete:hover {
    background-color: rgba(8, 8, 58, 0.589);
}
a {
    position: absolute;
    right: 2em;
    bottom: 5px;
    color: rgba(8, 8, 58, 0.856);
}
a:hover {
  cursor: pointer;
  color: rgb(255, 57, 57);
  transition: .3s;
}
@keyframes title {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
</style>