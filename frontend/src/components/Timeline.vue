<template>
    <div class="timeline">
        <li class="post" v-for="post in posts" :key="post.id">
            <div class="infos_user_post">
                <img :src="post.User.attachment" :alt="'Photo de profil de ' + `${post.User.firstName}`" class="user_profile_picture" />
                <div class="infos_user_date">
                    <span class="infos_user_name">{{post.User.firstName}} {{post.User.lastName}}</span>
                    <br />
                    <span class="created_at">{{moment(post.createdAt)}}</span>
                </div>
            </div>
            <div class="post_content">
                <p class="post_text">{{post.text}}</p>
                <img class="img_post" :src="post.attachment" :alt="'attachement relié à la publication de ' + `${post.User.firstName}`">
            </div>
            <div class="buttons">
                <button class="button_post_react" type="button">
                    <i class="far fa-heart"></i>
                    J'aime
                </button> 
                <button class="button_post_react" type="button">
                    <i class="far fa-comments"></i>
                    Commenter
                </button>
                <button class="button_post_react" type="button">
                    <i class="far fa-share-square"></i>
                    Partager
                </button>
            </div>
        </li>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    name: 'Timeline',
    mounted: function () {
        this.$store.dispatch('getAllPosts');
    },
    computed: {
        ...mapState({
            status: 'status',
            user: 'user',
            posts: ['posts'],
            userInfos: 'userInfos'
        })
    },
    methods: {
        moment (date) {
            return moment(date).format('DD-MM-YYYY [à] hh:mm');
        }
    }
}
</script>

<style scoped>
.timeline {
    margin-top: 1em;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.post {
    background-color: white;
    list-style-type: none;
    width: 100%;
    border-radius: 15px;
    margin-bottom: 1em;
}
.infos_user_post {
    margin-top: 1em;
    margin-left: 1em;
    display: flex;
    align-items: center;
    font-weight: bold;
}
.user_profile_picture {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 1em;
}
.created_at {
    font-weight: lighter;
    font-size: smaller;
}
.post_content {
    margin-top: 1em;
}
.post_text {
    margin-left: 1em;
}
.img_post {
    width: 100%;
    height: 20em;
    object-fit: cover;
}
.buttons {
    width: 100%;
    display: flex;
}
.button_post_react {
    cursor: pointer;
    border: none;
    width: 34%;
    height: 4em;
    background-color: transparent;
    border-right: 1px solid grey;
    font-weight: bold;
    transition: .3s;
}
.button_post_react:hover {
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
}
</style>
