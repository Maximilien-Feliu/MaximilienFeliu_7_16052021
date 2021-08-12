<template>
    <div class="profile_miniature">
        <h1>Votre profil</h1>
        <div class="user_infos">
            <div class="img_border">
                <img class="profile_picture" :src="userInfos.attachment" :alt="'photo de profil de ' + `${userInfos.firstName}`">
            </div>
            <div class="username bold">
                {{userInfos.firstName}} {{userInfos.lastName}}
            </div>
            <br />
            <div class="user_bio">
                {{userInfos.bio}}
            </div>
        </div>
        <div class="options">
            <span class="handle_profile">Voir/Gérer mon profil</span>
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
    box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.459),
                inset -1px -1px 6px rgba(0, 0, 0, 0.459),
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

</style>