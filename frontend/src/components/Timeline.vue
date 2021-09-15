<template>
    <div class="timeline">
        <div class="post" v-for="(post, i) in postsArray" :key="i">
            
            <HandlePost :user="userInfos" :postToHandle="postsArray[i]" :postIndex="i"></HandlePost>
            
            <div class="infos_user_post">
                <router-link :to="`/ProfileUser/${post.User._id}`">
                    <img :src="post.User.attachment" :alt="'Photo de profil de ' + `${post.User.firstName}`" class="user_profile_picture" />
                </router-link>
                <div class="infos_user_date">
                    <router-link :to="`/ProfileUser/${post.User._id}`" class="link_user">
                        <span class="infos_user_name">{{post.User.firstName}} {{post.User.lastName}}</span>
                    </router-link>
                    <br />
                    <span class="created_at">{{ moment(post.createdAt) }}</span>
                </div>
            </div>

            <div class="post_content">
                <p class="post_text">{{post.text}}</p>
                <img v-if="post.attachment" class="img_post" :src="post.attachment" :alt="'attachement relié à la publication de ' + `${post.User.firstName}`">
            </div>

        <!-- reactions for posts -->
            <div class="post_reactions_info">
                <div class="reaction_total">{{post.PostReactions.length}} Reactions</div>
                <div class="comments_total" @click="selectComment(i)">{{post.Comments.length}} Commentaires</div>
            </div>

            <div class="buttons">
                <Reactions :likeName="'post'" :userId="userInfos._id" :postId="postsArray[i]._id" :postIndex="i" :objectIndex="i" :reactions="postsArray[i].PostReactions" :handleReaction="handlePostReaction"></Reactions>
                
                <label :for="'input_comment'+[i]" class="btn_post_react label_comment" >
                    <i class="far fa-comments"></i>
                    Commenter
                </label>
                <button class="btn_post_react btn_share" type="button">
                    <i class="far fa-share-square"></i>
                    Partager
                </button>
            </div>

            <div class="comment_section">
                <Comment :postObject="post" :postIndexComment="i" :userComment="userInfos" :commentsToShow="activeComments" :preInputValue="ifComments(post)" @hide="activeComments = null"></Comment>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Reactions from '@/components/Reactions.vue'
import HandlePost from '@/components/HandlePost.vue'
import Toggle from '@/components/Toggle.vue'
import Comment from '@/components/Comment.vue'

export default {
    name: 'Timeline',
    components: {
        Reactions,
        HandlePost,
        Toggle,
        Comment
    },
    data () {
        return {
            activeComments: null,
            handlePostReaction: {
                add: 'createPostReaction',
                update: 'updatePostReaction',
                delete: 'deletePostReaction'
            },
        }
    },
    props: {
        postsArray: {
            type: Array
        }
    },
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
        moment (date) {
            return moment(date).format('DD-MM-YYYY [à] hh:mm');
        },
        selectComment (i) {     
            this.activeComments = i;
        },
        ifComments(post) {
            if (post.Comments === null) {
                return 
            } else {
                return post.Comments[0].text
            }
        }
    }
}
</script>

<style>
.timeline {
    margin-top: 1em;
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
    position: relative;
    box-shadow: inset 1px 1px 6px rgba(8, 8, 58, 0.856),
                inset -1px -1px 6px rgba(8, 8, 58, 0.856),
                -1px 1px rgb(206, 206, 206);
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
    width: 98%;
    height: 20em;
    margin-left: 1%;
    object-fit: cover;
}
.post_reactions_info {
    margin-top: .3em;
    margin-left: .4em;
    margin-bottom: .3em;
    width: 98%;
    display: flex;
    justify-content: space-between;
}
.reaction_total {
    text-decoration: underline;
}
.comments_total, .hide_comments--option {
    text-decoration: underline;
    cursor: pointer;
    transition: .3s;
}
.comments_total:hover, .hide_comments--option:hover {
    color: rgb(255, 57, 57);
}
.buttons {
    width: 100%;
    display: flex;
    position: relative;
}
.btn_post_react {
    cursor: pointer;
    border: none;
    width: 34%;
    height: 4em;
    background-color: transparent;
    border-right: 1px solid grey;
    font-weight: bold;
    transition: .3s;
}
.btn_post_react:hover {
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
}
.label_comment {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: smaller;
}
.label_comment i {
    margin-right: 5px;
}
.btn_share {
    border-right: none;
}
.comment_section {
    margin-top: 1em;
}
.link_user {
    color: black;
    text-decoration: none;
}
@media screen and (max-width: 1024px) {
    .emojis_comment {
        display: none;
    }
}
@media screen and (max-width: 768px) {
    .timeline {
        border-radius: 0px;
    }
    .post {
        border-radius: 0px;
    }
    .btn_post_react {
        font-size: smaller;
    }
}
</style>
