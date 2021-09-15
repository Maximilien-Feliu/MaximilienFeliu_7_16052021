<template>
    <div class="comment_section">
        <div class="write_comment">
            <router-link :to="`/ProfileUser/${postObject.User._id}`" class="link_user">
                <img :src="userComment.attachment" :alt="'photo de profil de ' + `${userComment.firstName}`">
            </router-link>
            <textarea type="text" :id="'input_comment'+[postIndexComment]" v-model="commentText" class="input_comment" :data-id="postObject._id" name="input_comment" placeholder="Écrivez un commentraire..."></textarea>
            <label :for="'comment_file'+[postIndexComment]"><i class="fas fa-images btn_comment_file upload_file"></i></label>
            <input type="file" name="comment_file" class="hide" :id="'comment_file'+[postIndexComment]" accept="image/*" @change="uploadImage">
            
            <Emojis class="emojis_comment"></Emojis>

            <button class="btn_comment" type="button" @click="comment(postObject._id)">Commenter</button>
        </div>
        <div class="img_option">
            <img :class="{'hide' : !previewImage}" :src="previewImage" :alt="'Aperçu de l\'image du commentaire de ' + `${userComment.firstName}`">
            <button v-if="previewImage" class="img_option_btn" type="button" @click="previewImage = !previewImage">Retirer</button>
        </div>

        <div class="last_comment" v-if="postObject.Comments.length > 0">
            <div class="comment_user_picture">
                <router-link :to="`/ProfileUser/${postObject.Comments[0].User._id}`" class="link_user">
                    <img :src="postObject.Comments[0].User.attachment" :alt="'Photo de profil de ' + `${postObject.Comments[0].User.firstName}`">
                </router-link>
            </div>
            <div class="comment_content">
                <div class="comment_reactions_length" v-if="postObject.Comments[0].CommentReactions">{{ postObject.Comments[0].CommentReactions.length }} 
                    <span class="comment_reactions_length1">❤️</span><span class="comment_reactions_length2">😂</span><span class="comment_reactions_length3">👏</span><span class="comment_reactions_length4">😢</span><span class="comment_reactions_length5">😡</span>
                </div>

                <div class="comment_bubble" v-if="!inputComment">
                    <router-link :to="`/ProfileUser/${postObject.Comments[0].User._id}`" class="link_user">
                        <span class="comment_username bold">{{postObject.Comments[0].User.firstName}} {{postObject.Comments[0].User.lastName}}</span>
                    </router-link>
                    <p class="comment_text">{{postObject.Comments[0].text}}</p>
                </div>

<!--update comment-->
                    <div v-else class="update_input">
                    <textarea type="text" class="input_update_comment" name="input_update_comment" :id="'input_update_comment'+[postIndexComment]" v-model="newCommentText" autofocus></textarea>
                    <div class="post_update_comment">
                        <label :for="'update_comment_file'+[postIndexComment]"><i class="fas fa-images btn_comment_file"></i></label>
                        <input type="file" name="comment_file" class="hide" :id="'update_comment_file'+[postIndexComment]" accept="image/*" @change="uploadImageUpdate">
                        <button class="btn_comment" type="button" @click="updateComment(postObject._id, postObject.Comments[0]._id)">Commenter</button>
                    </div>
                </div>
<!--end update comment-->

                <img v-if="postObject.Comments[0].attachment || previewImageUpdate" :src="previewImageUpdate || postObject.Comments[0].attachment" :alt="'attachement commentaire de ' + `${postObject.Comments[0].User.firstName}`">
                <button v-if="previewImageUpdate" type="button" class="img_option_btn" @click="previewImageUpdate = !previewImageUpdate">Retirer</button>
                <br v-if="postObject.Comments[0].attachment" />

                <Reactions :likeName="'lastcomment'" :userId="userComment._id" :postId="postObject._id" :commentId="postObject.Comments[0]._id" :postIndex="postIndexComment" :objectIndex="0" :reactions="postObject.Comments[0].CommentReactions" :handleReaction="handleCommentReaction"></Reactions>
            </div> 

            <Toggle class="comment_toggle" :user="userComment" :objectToHandle="postObject.Comments[0]" :update="inputComment" :delete="checkDeleteUpdateComment" @display="displayInputComment" @check="checkDeleteComment"></Toggle>

<!-- delete comment -->
            <div class="delete_comment" v-if="checkDeleteUpdateComment">
                <p class="bold">En êtes-vous sûr ?</p>
                <button type="button" @click="deleteComment(postObject._id, postObject.Comments[0]._id)">Oui</button>
                <button type="button" @click="checkDeleteUpdateComment = !checkDeleteUpdateComment">Non</button>
            </div>
        </div>
<!-- end delete comment -->

<!-- comments list section -->
        <div class="hide" :class="{'show_comments' : postIndexComment === commentsToShow && i > 0}" v-for="(comment, i) in postObject.Comments" :key="comment.id">  
            <CommentList :comment="comment" :postObject="postObject" :userComment="userComment" :postIndexComment="postIndexComment" :i="i" :commentText="comment.text" :handleCommentReaction="handleCommentReaction" @hide="$emit('hide')"></CommentList>
<!-- end delete comment list -->
        </div>
<!-- end comments list -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Emojis from '@/components/Emojis.vue'
import Reactions from '@/components/Reactions.vue'
import Toggle from '@/components/Toggle.vue'
import CommentList from '@/components/CommentList.vue'

export default {
    name: 'Comment',
    components: {
        Emojis,
        Reactions,
        Toggle,
        CommentList
    },
    data() {
        return {
            previewImage: null,
            previewImageUpdate: null,
            commentText: '',
            newCommentText: this.preInputValue,
            inputComment: false,
            checkDeleteUpdateComment: false,
            handleCommentReaction: {
                add: 'createCommentReaction',
                update: 'updateCommentReaction',
                delete: 'deleteCommentReaction'
            }
        }
    },
    props: {
        postObject: {
            type: Object
        },
        postIndexComment: {
            type: Number
        },
        userComment: {
            type: Object
        },
        commentsToShow: {
            type: Number
        },
        preInputValue: {
            type: String
        }
    },
    computed: {
        ...mapState({
            status: 'status'
        })
    }, 
    methods: {
        uploadImage (e) {
            this.files = e.target.files[0];
            this.previewImage = URL.createObjectURL(this.files);
        },
        uploadImageUpdate (e) {
            this.files = e.target.files[0];
            this.previewImageUpdate = URL.createObjectURL(this.files);
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

            if(this.files != undefined) {
                formData.append('attachment', this.files);
            }
            if(this.newCommentText != null || this.newCommentText != '') {
                formData.append('text', this.newCommentText);
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
                if (this.status == 'error_update_regex') {
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
</style>