<template>
    <div class="profile_user">
        <div class="header_search_bar">
            <Header />
            <SearchBar class="main_search_bar"/>
        </div>
        <div class="main_container">
            <div class="main_user_infos">
                <div class="user_profile_picture" :class="{'user_profile_picture_update' : update}">
                    <img class="profile_picture" :src="previewImage || profileUser.attachment" :alt="'photo de profil de ' + `${profileUser.firstName}`">
                </div>
                <div v-if="update" class="img_user_option">         
                    <label for="'img_user_update" class="img_user_update"><i class="fas fa-images"></i>Modifier la photo</label>
                    <button type="button" class="btn_img_user_option" :class="{'hide' : !previewImage}" @click="previewImage = !previewImage">Retirer</button>
                    <input type="file" class="hide" name="img_user_update" id="'img_user_update" accept="image/*" @change="uploadImage">
                </div>
                <div v-if="!update" class="user_infos">
                    <h2 class="user_name">{{ profileUser.firstName }} {{ profileUser.lastName }}</h2>
                    <p class="user_department">Département: {{ profileUser.department }}</p>
                    <p class="user_bio">{{ profileUser.bio }}</p>
                </div>
                <div v-else class="user_update_infos">
                    <label for="user_update_firstName">Votre Prénom : </label>
                    <input type="text" id="user_update_firstName" v-model="firstName" autofocus>

                    <label for="user_update_lastName">Votre Nom :</label>
                    <input type="text" id="user_update_lastName" v-model="lastName" autofocus>

                    <label for="user_update_department">Le département où vous travaillez :</label>
                    <input type="text" id="user_update_department" v-model="department" autofocus>

                    <label for="user_update_bio">Votre bio :</label>
                    <textarea type="text" id="user_update_bio" v-model="bio" autofocus></textarea>

                    <button class="btn_update_user_infos" @click="updateProfile">Modifier mes informations</button>
                </div>
            </div>
             <div class="main_timeline">
                <Timeline :postsArray="postsByUserId"/>
            </div>
        </div>
        <aside v-if="userInfos._id === profileUser._id || userInfos.isAdmin === 1" class="user_options">
            <button v-if="userInfos._id === profileUser._id" @click="update = !update">Modifier mon profil</button>
            <button v-if="userInfos._id === profileUser._id || userInfos.isAdmin === 1" @click="deleteUser">Supprimer le compte</button>
        </aside>
        <Footer />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SearchBar from '@/components/SearchBar.vue'
import Timeline from '@/components/Timeline.vue'

export default {
    name: 'ProfileUser',
    components: {
        Header,
        Footer,
        SearchBar,
        Timeline
    },
    data () {
        return {
            update: false,
            delete: false,
            previewImage: '',
            firstName: '',
            lastName: '',
            department: '',
            bio: ''
        }
    },
    mounted: function () {
        this.$store.dispatch('getUserByItsId', {
            userId: this.$route.params.userId,
        });
        this.$store.dispatch('getUserInfos');
        this.$store.dispatch('getAllPostsByUserId', {
            id: this.$route.params.userId,
        })
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/home');
            return;
        }
    },
    computed: {
        ...mapState({
            status: 'status',
            profileUser: 'profileUser',
            userInfos: 'userInfos',
            postsByUserId: ['postsByUserId'],
        })
    },
    methods: {
        uploadImage(e){
            this.files = e.target.files[0];
            this.previewImage = URL.createObjectURL(this.files);
        },
        updateProfile () {
            const formData = new FormData();

            if(this.files != undefined) {
                formData.append('attachment', this.files);
            }
            if(this.firstName != null || this.firstName != '') {
                formData.append('firstName', this.firstName);
            }
            if(this.lastName != null || this.lastName != '') {
                formData.append('lastName', this.lastName);
            }
            if(this.department != null || this.department != '') {
                formData.append('department', this.department);
            }
            if(this.bio != null || this.bio != '') {
                formData.append('bio', this.bio);
            }

            this.$store.dispatch('updateProfile', formData) 
            .then(() => {
                window.location.reload();
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
        },
        deleteUser () {
            this.$store.dispatch('deleteUser');
            localStorage.removeItem('user');
            window.location.reload();
        }
    }
}
</script>

<style scoped>
Header {
    position: fixed;
}
.profile_user {
    background: url('../assets/building_background.jpg') fixed no-repeat center;
    background-size: cover;
}
.header_search_bar {
    position: fixed;
    z-index: 998;
}
.main_search_bar {
    right: 14em;
    top: 15px;
    position: fixed;
    z-index: 999;
}
.main_container {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.main_user_infos {
    background-color: white;
    border-radius: 15px;
    margin-top: 5em;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: inset 1px 1px 6px rgba(8, 8, 58, 0.856),
                inset -1px -1px 6px rgba(8, 8, 58, 0.856),
                -1px 1px rgb(206, 206, 206);
}
.user_profile_picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid rgb(8, 8, 58);
    margin-top: 1em;
    margin-bottom: 0px;
}
.profile_picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
}
.user_name {
    margin-top: 0px;
    margin-bottom: 0px;
}
.user_department {
    margin-top: 0px;
}
.user_bio {
    width: 90%;
}
.main_timeline {
    position: relative;
    z-index: 500;
    width: 50%;
}
.user_options {
    position: absolute;
    right: 7em;
    top: 5.1em;
    width: 15%;
    height: 30%;
    display: flex;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: inset 1px 1px 6px rgba(8, 8, 58, 0.856),
                inset -1px -1px 6px rgba(8, 8, 58, 0.856),
                -1px 1px rgb(206, 206, 206);
}
.user_options button, .btn_img_user_option {
    width: 70%;
    cursor: pointer;
    margin-top: 1em;
    width: 170px;
    height: 30px;
    border-radius: 5px;
    transform: .3s;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    margin-bottom: 1em;
    transition: .3s;
}
.user_options button:hover, .img_user_update:hover,  .btn_update_user_infos:hover, .btn_img_user_option:hover {
    background-color: rgba(8, 8, 58, 0.534);
}
.user_profile_picture_update {
    display: flex;
}
.img_user_update {
    position: relative;
    cursor: pointer;
    border: 1px solid grey; 
    width: 100%;
    margin-left: 2em;
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    transition: .3s;
}
.btn_img_user_option {
    width: 100px;
    position: absolute;
    top: 15em;
}
.img_user_update i{ 
    color: rgb(255, 57, 57);
}
.user_update_infos {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
}
.user_update_infos label{
    font-weight: bold;
}
.user_update_infos input{
    margin-bottom: .5em;
    border-radius: 5px;
    outline: none;
}
.user_update_infos textarea {
    border-radius: 5px;
    margin-bottom: 1em;
}
.btn_update_user_infos {
    position: relative;
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    width: 100%;
    height: 2em;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 2em;
    transition: .3s;
}
</style>