<template>
    <div class="main_miniature" @click="userToggle = !userToggle">
        <div class="miniature">
            <img :src="user.attachment" :alt="'Photo de profil de ' + `${user.firstName}`" class="profile_picture_miniature" />
        </div>
        <div v-if="userToggle" class="miniature_option">
            <router-link :to="`/ProfileUser/${user._id}`" class="user_router miniature_list_option">
                Mon profil
            </router-link>
            <div class="user_logout miniature_list_option" @click="logOut">Se déconnecter</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProfileToggle',
    data () {
        return {
            userToggle: false
        }
    },
    props: {
        user: {
            type: Object
        }
    },
    methods: {
        logOut () {
            localStorage.removeItem('user');
            window.location.reload();
        }
    }
}
</script>

<style>
.main_miniature {
    display: none;
}
.main_miniature {
    position: fixed;
    right: 30px;
    top: 10px;
    z-index: 999;
}
.miniature {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgb(0, 153, 255);
    transition: .3s;
}
.miniature:hover { 
    background-color: rgba(228, 228, 228, 0.473);
}
.profile_picture_miniature {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}
.miniature_option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    background-color: rgba(0, 153, 255, 0.651);
    right: 2em;
    height: 3em;
    width: 300px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 15px;
}
.miniature_list_option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    font-weight: bold;
    height: 100%;
    color: black;
}
.miniature_list_option:hover {
    background-color: rgba(236, 248, 255, 0.356);
}
.user_logout:hover {
    cursor: pointer;
    border-bottom-right-radius: 15px;
    color: rgb(255, 57, 57);
    transition: .3s;
}
.user_router {
    text-decoration: none;
}
.user_router:hover {
    border-top-left-radius: 15px;
}

@media screen and (max-width: 1024px) {
    .main_miniature {
        display: block;
    }   
}
</style>