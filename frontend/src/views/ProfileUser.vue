<template>
    <div class="profile_user">
        <div class="header_search_bar">
            <Header />
            <SearchBar class="main_search_bar"/>
        </div>
        <div class="main_container">
            <div class="main_user_infos">
                <div class="user_profile_picture" :class="{'user_profile_picture_update' : update}">
                    <img v-if="profileUser.attachment || previewImage" class="profile_picture" :src="profileUser.attachment" :alt="'photo de profil de ' + `${profileUser.firstName}`">
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
                <div v-else>
                    <label for="user_update_firstName"></label>
                    <input type="text" id="user_update_firstName" v-model="userName" autofocus>

                    <label for="user_update_lastName"></label>
                    <input type="text" id="user_update_lastName" v-model="userName" autofocus>

                    <label for="user_update_department"></label>
                    <input type="text" id="user_update_department" v-model="userName" autofocus>

                    <label for="user_update_bio"></label>
                    <input type="text" id="user_update_bio" v-model="userName" autofocus>
                </div>
            </div>
             <div class="main_timeline">
                <Timeline :postsArray="postsByUserId"/>
            </div>
        </div>
        <aside v-if="userInfos._id === profileUser._id || userInfos.isAdmin === 1" class="user_options">
            <button v-if="userInfos._id === profileUser._id" @click="update = !update">Modifier mon profil</button>
            <button v-if="userInfos._id === profileUser._id || userInfos.isAdmin === 1">Supprimer le compte</button>
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
        updateProfile () {
            const formData = new FormData();

            if(this.files != undefined) {
                formData.append('attachment', this.files);
            }
            if(this.bio != null) {
                formData.append('bio', this.bio);
            }

            this.$store.dispatch('updateProfile', formData) 
            .then(() => {
                this.firstLog();
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
.user_options button {
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
.user_options button:hover {
    background-color: rgba(8, 8, 58, 0.534)
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
.img_user_update i{ 
    color: rgb(255, 57, 57);
}
</style>