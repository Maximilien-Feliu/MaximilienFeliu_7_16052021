<template>
    <div class="comment_flex">
        <div class="comment_user_picture">
            <router-link :to="`/ProfileUser/${comment.User._id}`" class="link_user">
                <img :src="comment.User.attachment" :alt="'Photo de profil de ' + `${comment.User.firstName}`">
            </router-link>
        </div>
        <div class="comment_content">
            <div class="comment_reactions_length" v-if="comment.CommentReactions">{{ comment.CommentReactions.length }} 
                <span class="comment_reactions_length1">❤️</span><span class="comment_reactions_length2">😂</span><span class="comment_reactions_length3">👏</span><span class="comment_reactions_length4">😢</span><span class="comment_reactions_length5">😡</span>
            </div>

            <Toggle class="comment_toggle" :user="userComment" :objectToHandle="comment" :update="inputCommentList" :delete="checkDeleteUpdateComment" @display="displayInputCommentList" @check="checkDeleteComment"></Toggle>

            <div v-if="!inputCommentList" class="comment_bubble"> 
                <router-link :to="`/ProfileUser/${comment.User._id}`" class="link_user">
                    <span class="comment_username bold">{{comment.User.firstName}} {{comment.User.lastName}}</span>
                </router-link>
                <p class="comment_text">{{comment.text}}</p>
            </div>

<!-- update comment -->                
            <div v-else class="update_input">
                <textarea type="text" class="input_update_comment" :name="'input_update_comment'+[postIndexComment]+[i]" v-model="previewText" autofocus></textarea>
                <div class="post_update_comment">
                    <label :for="'update_comment_file'+[postIndexComment]+[i]"><i class="fas fa-images btn_comment_file"></i></label>
                    <input type="file" :name="'comment_file'+[postIndexComment]+[i]" class="hide" :id="'update_comment_file'+[postIndexComment]+[i]" accept="image/*" @change="uploadImageUpdate">
                    <button class="btn_comment" type="button" @click="updateComment(postObject._id, comment._id)">Commenter</button>
                </div>
            </div>
<!-- end update comment -->    

            <img v-if="comment.attachment || previewImage" :src="previewImage || comment.attachment" :alt="'attachement commentaire de ' + `${comment.User.firstName}`">
            <button v-if="previewImage" type="button" class="img_option_btn" @click="previewImage = !previewImage">Retirer</button>
            <br v-if="comment.attachment" />

            <Reactions :likeName="'comments'" :userId="userComment._id" :postId="postObject._id" :commentId="comment._id" :postIndex="postIndexComment" :objectIndex="i" :reactions="comment.CommentReactions" :handleReaction="handleCommentReaction"></Reactions>
            
            <div v-if="i == (postObject.Comments.length - 1)" class="hide_comments--option" @click="$emit('hide')">Cacher les commentaires</div>
        </div> 
<!-- delete comment -->
        <div class="delete_comment" v-if="checkDeleteUpdateComment">
            <p class="bold">En êtes-vous sûr ?</p>
            <button type="button" @click="deleteComment(postObject._id, comment._id)">Oui</button>
            <button type="button" @click="checkDeleteUpdateComment = !checkDeleteUpdateComment">Non</button>
        </div>
    </div>
</template>

<script>
import Toggle from '@/components/Toggle.vue'
import Reactions from '@/components/Reactions.vue'

export default {
    name: 'CommentList',
    components: {
        Toggle,
        Reactions
    },
    data() {
        return {
            inputCommentList: false,
            checkDeleteUpdateComment: false,
            previewImage: null,
            previewText: this.commentText
        }
    },
    props: {
        comment: {
            type: Object
        },
        postObject: {
            type: Object
        },
        userComment: {
            type: Object
        },
        postIndexComment: {
            type: Number
        },
        i: {
            type: Number
        },
        commentText: {
            type: String
        },
        handleCommentReaction : {
            type: Object
        }
    },
    methods: {
        uploadImageUpdate (e) {
            this.files = e.target.files[0];
            this.previewImage = URL.createObjectURL(this.files);
        },
        updateComment (postId, commentId) {  
            const formData = new FormData();

            if(this.files != undefined) {
                formData.append('attachment', this.files);
            }
            if(this.previewText != '' || this.previewText != null) {
                formData.append('text', this.previewText);
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
        displayInputCommentList (display) {
            this.inputCommentList = display;
        },
        checkDeleteComment (check) {
            this.checkDeleteUpdateComment = check;
        }
    }
}
</script>

<style>
.comment_flex {
    display: flex;
}
</style>