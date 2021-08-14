<template>
    <div class="profile_miniature">
        <h1>Votre profil</h1>
        <div class="user_infos">
            <router-link :to="`/ProfileUser/${userInfos._id}`">
                <div class="img_border">
                        <img class="profile_picture" :src="userInfos.attachment" :alt="'photo de profil de ' + `${userInfos.firstName}`">
                </div>
            </router-link>
            <div class="username bold">
                {{userInfos.firstName}} {{userInfos.lastName}}
            </div>
            <br />
            <div class="user_bio">
                {{userInfos.bio}}
            </div>
        </div>
        <div class="options">
            <router-link :to="`/ProfileUser/${userInfos._id}`" class="link_user">
                <span class="handle_profile">Voir/Gérer mon profil</span>
            </router-link>
            <span class="logout" @click="logout">Se déconnecter</span>
        </div>
    </div> 
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ProfileMini',
    mounted: function () { 
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
        logout () {
            localStorage.removeItem('user');
            window.location.reload();
        }
    },
}
</script>

<style scoped>
.profile_miniature {
    background-color: rgba(255, 255, 255, 0.842);
    height: 30em;
    width: 23%;
    right: 1em;
    margin-top: 5em;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 999;
    box-shadow: inset 1px 1px 6px rgba(8, 8, 58, 0.856),
                inset -1px -1px 6px rgba(8, 8, 58, 0.856),
                -1px 1px rgb(206, 206, 206);
    transition: .3s;
}
.profile_miniature:hover {
    background-color: white;
    box-shadow: inherit;
}
.img_border {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 3px solid rgb(8, 8, 58);
}
.user_infos {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.profile_picture {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    object-fit: cover;
}
.user_bio {
    font-style: italic;
}
.options {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.options span {
    margin-bottom: 1em;
    text-decoration: underline;
    cursor: pointer;
}
.options span:hover {
    color: rgb(255, 57, 57);
}
.link_user {
    margin-bottom: 1em;
    color: black;
}
@media screen and (max-width: 1024px) {
  .profile_miniature {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  #login_page_form input {
    width: 15em;
  }
  .login_main h1 {
    text-align: center;
  }
}
@media screen and (max-width: 435px) {
  .login_main h1 {
    font-size: 20px;
  }
}
</style>