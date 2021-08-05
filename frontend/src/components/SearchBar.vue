<template>
    <div class="search">
        <button type="button" class="btn_search"><i class="fas fa-search"></i></button>
        <input type="text" v-model="target" @input="filteredUsers" name="search_bar" id="search_bar" placeholder="Rechercher dans Groupomania">
        <div v-if="target != ''" class="filter">
            <router-link to="/" v-for="user in users" :key="user"><li><img :src="user.attachment" class="profile_picture" :alt="'Photo de profil de ' + `${user.firstName}`"/> {{user.firstName}} {{user.lastName}}<div class="border_bottom"></div></li></router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SearchBar',
    data () {
        return {
            target: '',
        }
    },
    computed: {
        filteredUsers() {
            this.$store.dispatch('getAllUsers', {
                firstName: this.target
            })
        },
        ...mapState({
            status: 'status',
            users: ['users'],
        })
    },
}
</script>

<style scoped>
.btn_search {
    cursor: pointer;
    position: absolute;
    color: grey;
    right: -10em;
    top: 9px;
    border: none;
    background-color: transparent;
}
.btn_search i {
    font-size: 20px;
}
#search_bar {
   width: 180%; 
   height: 2.5em;
   border-radius: 15px;
}
::placeholder {
    padding-left: 10px;
}
.filter {
    border-radius: 15px;
    width: 173%;
    margin-left: 10px;
    background-color: rgba(8, 8, 58, 0.856);
}
.border_bottom {
    position: absolute;
    border-bottom: 1px solid grey;
    width: 93%;
    bottom: 0;
}
li {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    list-style-type: none;
    color: white;
    height: 3.5em;
    transition: .2s;
}
li img {
    position: absolute;
    left: 20px;
    object-fit: cover;
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
li:hover {
    background-color: rgba(255, 57, 57, 0.836);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
a {
    text-decoration: none;
}
</style>