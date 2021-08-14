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

        <!-- Comment Section -->

            <div class="comment_section">
                <div class="write_comment">
                    <router-link :to="`/ProfileUser/${post.User._id}`" class="link_user">
                        <img :src="userInfos.attachment" :alt="'photo de profil de ' + `${userInfos.firstName}`">
                    </router-link>
                    <textarea type="text" :id="'input_comment'+[i]" v-model="commentText" class="input_comment" :data-id="post._id" name="input_comment" placeholder="Écrivez un commentraire..."></textarea>
                    <label :for="'comment_file'+[i]"><i class="fas fa-images btn_comment_file upload_file"></i></label>
                    <input type="file" name="comment_file" class="hide" :id="'comment_file'+[i]" accept="image/*" @change="uploadImage">
                    
                    <Emojis class="emojis_comment" @append="updateInputComment" :inputIndex="i"></Emojis>

                    <button class="btn_comment" type="button" @click="comment(post._id)">Commenter</button>
                </div>
                <div class="img_option">
                    <img :class="{'hide' : !previewImage}" :src="previewImage" :alt="'Aperçu de l\'image du commentaire de ' + `${userInfos.firstName}`">
                    <button v-if="previewImage" class="img_option_btn" type="button" @click="previewImage = !previewImage">Retirer</button>
                </div>

                <div class="last_comment" v-if="post.Comments.length > 0">
                    <div class="comment_user_picture">
                        <router-link :to="`/ProfileUser/${post.Comments[0].User._id}`" class="link_user">
                            <img :src="post.Comments[0].User.attachment" :alt="'Photo de profil de ' + `${post.Comments[0].User.firstName}`">
                        </router-link>
                    </div>
                    <div class="comment_content">
                        <div class="comment_reactions_length" v-if="post.Comments[0].CommentReactions">{{ post.Comments[0].CommentReactions.length }} 
                            <span class="comment_reactions_length1">❤️</span><span class="comment_reactions_length2">😂</span><span class="comment_reactions_length3">👏</span><span class="comment_reactions_length4">😢</span><span class="comment_reactions_length5">😡</span>
                        </div>

                        <div class="comment_bubble" v-if="!inputComment">
                            <router-link :to="`/ProfileUser/${post.Comments[0].User._id}`" class="link_user">
                                <span class="comment_username bold">{{post.Comments[0].User.firstName}} {{post.Comments[0].User.lastName}}</span>
                            </router-link>
                            <p class="comment_text">{{post.Comments[0].text}}</p>
                        </div>

        <!--update comment-->
                         <div v-else class="update_input">
                            <textarea type="text" class="input_update_comment" name="input_update_comment" :id="'input_update_comment'+[i]" v-model="previousCommentText" autofocus></textarea>
                            <div class="post_update_comment">
                                <label :for="'update_comment_file'+[i]"><i class="fas fa-images btn_comment_file"></i></label>
                                <input type="file" name="comment_file" class="hide" :id="'update_comment_file'+[i]" accept="image/*" @change="uploadImageUpdate">
                                <button class="btn_comment" type="button" @click="updateComment(post._id, post.Comments[0]._id)">Commenter</button>
                            </div>
                        </div>
        <!--fin update comment-->

                        <img v-if="post.Comments[0].attachment" :src="previewImageUpdate || post.Comments[0].attachment" :alt="'attachement commentaire de ' + `${post.Comments[0].User.firstName}`">
                        <button v-if="previewImageUpdate" type="button" class="img_option_btn" @click="previewImageUpdate = !previewImageUpdate">Retirer</button>
                        <br v-if="post.Comments[0].attachment" />

                        <Reactions :likeName="'lastcomment'" :userId="userInfos._id" :postId="postsArray[i]._id" :commentId="postsArray[i].Comments[0]._id" :postIndex="i" :objectIndex="0" :reactions="postsArray[i].Comments[0].CommentReactions" :handleReaction="handleCommentReaction"></Reactions>
                    </div> 

                    <Toggle class="comment_toggle" :user="userInfos" :objectToHandle="postsArray[i].Comments[0]" :update="inputComment" :delete="checkDeleteUpdateComment" @display="displayInputComment" @check="checkDeleteComment"></Toggle>
        
        <!-- delete comment -->
                    <div class="delete_comment" v-if="checkDeleteUpdateComment">
                        <p class="bold">En êtes-vous sûr ?</p>
                        <button type="button" @click="deleteComment(post._id, post.Comments[0]._id)">Oui</button>
                        <button type="button" @click="checkDeleteUpdateComment = !checkDeleteUpdateComment">Non</button>
                    </div>
                </div>
        <!-- fin delete comment -->

        <!-- comments list section -->
                <div class="hide" :class="{'show_comments' : i === activeComments && index > 0}" v-for="(comment, index) in post.Comments" :key="comment._id">  
                    <div class="comment_user_picture">
                        <router-link :to="`/ProfileUser/${comment.User._id}`" class="link_user">
                            <img :src="comment.User.attachment" :alt="'Photo de profil de ' + `${comment.User.firstName}`">
                        </router-link>
                    </div>
                    <div class="comment_content">
                        <div class="comment_reactions_length" v-if="post.Comments[index].CommentReactions">{{ post.Comments[index].CommentReactions.length }} 
                            <span class="comment_reactions_length1">❤️</span><span class="comment_reactions_length2">😂</span><span class="comment_reactions_length3">👏</span><span class="comment_reactions_length4">😢</span><span class="comment_reactions_length5">😡</span>
                        </div>

                        <Toggle class="comment_toggle" :user="userInfos" :objectToHandle="postsArray[i].Comments[index]" :update="inputComment" :delete="checkDeleteUpdateComment" @display="displayInputComment" @check="checkDeleteComment"></Toggle>

                        <div v-if="!inputComment[index]" class="comment_bubble">
                            <router-link :to="`/ProfileUser/${comment.User._id}`" class="link_user">
                                <span class="comment_username bold">{{comment.User.firstName}} {{comment.User.lastName}}</span>
                            </router-link>
                            <p class="comment_text">{{comment.text}}</p>
                        </div>

        <!-- update comments list -->                
                        <div v-else class="update_input">
                            <textarea type="text" class="input_update_comment" name="input_update_comment" :id="'input_update_comment'+[i]+[index]" v-model="previousCommentText" autofocus></textarea>
                            <div class="post_update_comment">
                                <label :for="'update_comment_file'+[i]+[index]"><i class="fas fa-images btn_comment_file"></i></label>
                                <input type="file" name="comment_file" class="hide" :id="'update_comment_file'+[i]+[index]" accept="image/*" @change="uploadImageUpdate">
                                <button class="btn_comment" type="button" @click="updateComment(post._id, post.Comments[index]._id)">Commenter</button>
                            </div>
                        </div>
        <!-- fin update comments list -->    

                        <img v-if="comment.attachment" :src="comment.attachment" :alt="'attachement commentaire de ' + `${comment.User.firstName}`">
                        <button v-if="previewImageUpdate" type="button" class="img_option_btn" @click="previewImageUpdate = !previewImageUpdate">Retirer</button>
                        <br v-if="comment.attachment" />

                        <Reactions :likeName="'comments'" :userId="userInfos._id" :postId="postsArray[i]._id" :commentId="postsArray[i].Comments[index]._id" :postIndex="i" :objectIndex="index" :reactions="postsArray[i].Comments[index].CommentReactions" :handleReaction="handleCommentReaction"></Reactions>
                        
                        <div v-if="index == (post.Comments.length - 1)" class="hide_comments--option" @click="hideComments">Cacher les commentaires</div>
                    </div> 
                </div>
        <!-- fin comments list -->
            </div>      
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Emojis from '@/components/Emojis.vue'
import Reactions from '@/components/Reactions.vue'
import HandlePost from '@/components/HandlePost.vue'
import Toggle from '@/components/Toggle.vue'

export default {
    name: 'Timeline',
    components: {
        Emojis,
        Reactions,
        HandlePost,
        Toggle,
    },
    data () {
        return {
            commentText: '',
            emoji: '',
            previewImage: null,
            previewImageUpdate: null,
            attachment: null,
            activeComments: null,
            previousCommentText: '',
            inputComment: false,
            checkDeleteUpdateComment: false,
            handlePostReaction: {
                add: 'createPostReaction',
                update: 'updatePostReaction',
                delete: 'deletePostReaction'
            },
            handleCommentReaction: {
                add: 'createCommentReaction',
                update: 'updateCommentReaction',
                delete: 'deleteCommentReaction'
            },
        }
    },
    props: {
        postsArray: {
            type:Array
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
        uploadImage (e) {
            this.files = e.target.files[0];
            this.previewImage = URL.createObjectURL(this.files);
        },
        uploadImageUpdate (e) {
            this.files = e.target.files[0];
            this.previewImageUpdate = URL.createObjectURL(this.files);
        },
        focusinput () {
            this.$ref.inputComment.focus();
        },
        comment (postId) {
            const formData = new FormData();

            if(this.files != undefined || this.files != null) {
                formData.append('attachment', this.files);
            }
            if(this.commentText != '') {
                formData.append('text', this.commentText);
            }
            this.$store.dispatch('createComment', {
                formData,
                postId: postId
            })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                if (this.status == 'error_regex') {
                    alert('Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !')
                
                } else {
                    this.$router.push('/:pathMatch(.*)');
                }
            })
        },
        updateComment (postId, commentId) {  
            const formData = new FormData();

            if(this.files != undefined || this.files != null) {
                formData.append('attachment', this.files);
            }
            if(this.previousCommentText != '') {
                formData.append('text', this.previousCommentText);
            }
            this.$store.dispatch('updateComment', {
                formData,
                postId: postId,
                id: commentId
            })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                if (this.status == 'error_regex') {
                    alert('Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !')
                
                } else {
                    this.$router.push('/:pathMatch(.*)');
                }
            })
        },
        deleteComment (postId, commentId) {     
                this.$store.dispatch('deleteComment', {
                    postId: postId,
                    id: commentId
                })
            window.location.reload();
        },
        selectComment (i) {     
            this.activeComments = i;
        },
        hideComments () {
            this.activeComments = null;
        }, 
        updateInputComment (inputEmoji) {
            this.commentText += inputEmoji;
            console.log(inputEmoji)
            console.log(this.commentText)
        },
        displayInputComment (display) {
            this.inputComment = display;
        },
        checkDeleteComment (check) {
            this.checkDeleteUpdateComment = check;
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
.write_comment {
    display: flex;
    align-items: center;
    margin-left: 2em;
    margin-bottom: 1em;
}
.input_comment {
    width: 60%;
    height: 2em;
    border-radius: 10px;
    background-color: aliceblue;
    border: 1px solid grey;
}
.upload_file {
    margin-right: 5px;
}
.update_input {
    display: flex;
}
.post_update_comment {
    margin-top: .7em;
}
.input_update_comment {
    border-radius: 10px;
    height: 3em;
    width: 15em;
}
.delete_comment {
    position: absolute;
    background-color: white;
    left: 20em;
    border: 1px solid grey;
    border-radius: 10px;
    width: 30%;
    height: 5em;
}
.delete_comment p {
    margin-left: 2.5em;
}
.delete_comment button {
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    width: 40%;
    height: 30%;
    margin-left: 1em;
    border-radius: 5px;
    transition: .3s;
}
.delete_comment button:hover {
    background-color: rgba(8, 8, 58, 0.534);
}
::placeholder {
    padding-left: 1em;
    padding-top: .5em;
}
.emojis_comment {
    margin-left: .5em;
}
.write_comment img, .comment_user_picture img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 1em;
}
.btn_comment {
    margin-left: .5em;
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    height: 2em;
    border-radius: 5px;
    transition: .3s;
}
.btn_comment:hover {
    background-color: rgba(8, 8, 58, 0.534); 
}
.btn_comment_file {
    color: rgb(255, 57, 57);
    margin-left: .5em;
    cursor: pointer;
}
.btn_comment_file i:hover {
    font-size: 1.5em;
}
.img_option {
    width: 90%;
    display: flex;
    justify-content: center;
    position: relative;
}
.img_option img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
.img_option_btn {
    cursor: pointer;
    height: 2em;
    margin-top: 2.5em;
    margin-left: 1em;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    border-radius: 5px;
    transition: .3s;
}
.img_option_btn:hover {
    background-color: rgba(8, 8, 58, 0.534); 
}
.last_comment, .show_comments {
    position: relative;
    display: flex;
    margin-left: 2.5em;
    margin-bottom: 2em;
}
.comment_user_picture {
    align-items: top;
}
.comment_content {
    font-size: smaller;
}
.comment_bubble::before {
    content: '';
    border: 2px solid grey;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    position: absolute;
    left: -1em;
    box-shadow: -1px 1px grey;
}
.comment_bubble {
    box-shadow: inset 1px 1px rgba(0, 0, 0, 0.459),
                inset -1px -1px rgba(0, 0, 0, 0.459),
                -1px 1px grey;
    border-radius: 10px;
    padding-bottom: .1em;
    padding-right: 1em; 
    padding-left: 1em;
    padding-top: .3em;
    margin-right: 1em;
    position: relative;
}
.comment_username {
    margin-bottom: 0px;
}
.comment_text {
    margin-top: 0px;
}
.comment_content img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
}
.hide_comments--option {
    margin-top: 2em;
    font-size: larger;
}
.comment_reactions_length {
    position: relative;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 15px;
    font-size: smaller;
    width: 80%;
}
.comment_reactions_length1 {
    position: absolute;
    left: 20px;
    z-index: 50;
}
.comment_reactions_length2 {
    position: absolute;
    left: 30px;
    z-index: 40;
}
.comment_reactions_length3 {
    position: absolute;
    left: 40px;
    z-index: 30;
}
.comment_reactions_length4 {
    position: absolute;
    left: 50px;
    z-index: 20;
}
.comment_reactions_length5 {
    position: absolute;
    left: 60px;
    z-index: 10;
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
