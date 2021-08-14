<template>
    <div class="handle_post">
        
        <Toggle :user="user" :objectToHandle="postToHandle" :update="displayPost" :delete="checkDelete" @display="displayUpdatePost" @check="checkDeletePost"></Toggle>


        <div v-if="displayPost || checkDelete" class="post_modal_overlay" @click="displayModal"></div>

        <div v-if="displayPost" class="post_modal">
            <div class="infos_user_post">
                <img :src="postToHandle.User.attachment" :alt="'Photo de profil de ' + `${postToHandle.User.firstName}`" class="user_profile_picture" />
                <div class="infos_user_date">
                    <span class="infos_user_name">{{postToHandle.User.firstName}} {{postToHandle.User.lastName}}</span>
                    <br />
                    <span class="created_at">{{ moment(postToHandle.createdAt) }}</span>
                </div>
            </div>

            <div class="post_content">
                <textarea class="post_modal_textarea" v-model="postInput" name="post_text" autofocus></textarea>
                <Emojis class="emojis_post_modal" @append="updateInput"></Emojis>

                <img v-if="postToHandle.attachment || previewImage" class="img_post" :src="previewImage || postToHandle.attachment" :alt="'attachement relié à la publication de ' + `${postToHandle.User.firstName}`">
                <div class="img_option_modal">         
                    <label v-if="postToHandle.attachment" :for="'post_file_modal'+postIndex" class="bold btn_post_file_modal"><i class="fas fa-images"></i>Modifier la photo</label>
                    <label v-else :for="'post_file_modal'+postIndex" class="bold btn_post_file_modal_add"><i class="fas fa-images"></i>Ajouter une photo</label>
                    <button type="button" class="btn_preview_img_modal" :class="{'hide' : !previewImage}" @click="previewImage = !previewImage">Retirer</button>
                </div>

                <input type="file" class="hide" name="post_file_modal" :id="'post_file_modal'+postIndex" accept="image/*" @change="uploadImage">
                <button type="submit" @click="updatePost" class="btn_post_modal">
                    <span>Publier</span>
                </button>
            </div>
        </div>
        <div class="check_delete_container">
            <div v-if="checkDelete" class="check_delete">
                <h2 class="bold">Etes vous sûr de vouloir supprimer ce post ?</h2>
                <div class="btn_check_container">
                    <button type="button" class="btn_check" @click="deletePost">Oui</button>
                    <button type="button" class="btn_check" @click="checkDelete = !checkDelete">Non</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Emojis from '@/components/Emojis.vue'
import Toggle from '@/components/Toggle.vue'

export default {
    name: 'HandlePost',
    components: {
        Emojis,
        Toggle
    },
    data () {
        return {
            handlePostToggle: false,
            displayPost: false,
            postInput: this.postToHandle.text,
            previewImage: '',
            checkDelete: false
        }
    },
    props : {
        user: {
            type: Object
        },
        postToHandle: {
            type: Object
        },
        postIndex: {
            type: Number
        }
    },
    computed: {
        ...mapState({
            status: 'status'
        })
    }, 
    methods: {
        moment (date) {
            return moment(date).format('DD-MM-YYYY [à] hh:mm');
        },
        displayUpdatePost (display) {
            this.displayPost = display;
        },
        checkDeletePost (check) {
            this.checkDelete = check;
        },
        displayModal () {
            if (this.displayPost) {
                this.displayPost = !this.displayPost
            } else {
                this.checkDelete = !this.checkDelete
            }
        },
        updateInput (inputEmoji) {
            this.postInput += inputEmoji
        },
        uploadImage(e){
            this.files = e.target.files[0];
            this.previewImage = URL.createObjectURL(this.files);
        },
        updatePost () {
            const formData = new FormData();

            if(this.files != undefined) {
                formData.append('attachment', this.files);
            } 
            if(this.postInput != null) {
                formData.append('text', this.postInput.match(/^[\w-.,\s\n\(\)!'"\?éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,300}$/));
            }

            this.$store.dispatch('updatePost', {
                formData,
                id: this.postToHandle._id
            })
            .then((response) => {
                window.location.reload();
                console.log(response);
            })
            .catch(() => {
                console.log(formData)
                if (this.status == 'error_regex') {
                    alert('Attention ! Certains caractères spéciaux ne peuvent pas être utilisés ("$","=",...) !')
                
                } else {
                    this.$router.push('/:pathMatch(.*)');
                }
            })
        },
        deletePost () {
            this.$store.dispatch('deletePost', {
                id: this.postToHandle._id
            })
            window.location.reload();
        }
    }
}
</script>

<style>
.post_modal_overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    height: 100%;
    background-color: rgba(8, 8, 58, 0.856);
    z-index: 55;  
}
.post_modal {
    position: fixed;
    z-index: 60;
    bottom: 10%;
    transform: scale(1);
    width: 50%;
    height: 80%;
    border-radius: 15px;
    background-color: white;
    animation: display-modal .5s ease-in-out;
}
.emojis_post_modal {
    position: absolute;
    left: 73%;
    top: 25%;
}
.post_modal_textarea {
    width: 50%;
    margin-left: 25%;
    margin-bottom: 1em;
    height: 4em;
    margin-top: 1em;
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.459),
                inset -2px -2px rgba(0, 0, 0, 0.459);
    border: none;
    cursor: pointer;
    outline: none;
    border-radius: 10px;
    transition: .3s;
}
.img_option_modal {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.btn_post_file_modal, .btn_post_file_modal_add {
    position: relative;
    cursor: pointer;
    border: 1px solid grey; 
    width: 25%;
    margin-left: 2em;
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    transition: .3s;
}
.btn_post_file_modal:hover, .btn_post_file_modal_add:hover {
    width: 26%;
}
.btn_post_file_modal i, .btn_post_file_modal_add i {
    color: rgb(255, 57, 57);
}
.btn_post_file_modal_add {
    margin-left: 20%;
}
.btn_post_modal {
    cursor: pointer;
    margin-top: 1em;
    margin-left: 38%;
    width: 170px;
    height: 30px;
    border-radius: 5px;
    transform: .3s;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    margin-bottom: 1em;
    transition: .3s;
}
.btn_post_modal:hover {
    background-color: rgba(8, 8, 58, 0.534);
}
.btn_preview_img_modal {
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    border-radius: 5px;
    transition: .3s;
    margin-right: 2em;
    top: 9em;
}
.btn_preview_img_modal:hover {
    background-color: rgba(8, 8, 58, 0.534);
}
.check_delete_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.check_delete_container h2 {
    margin-top: 2em;
}
.check_delete {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 50%;
    border-radius: 15px;
    z-index: 65;
    width: 50%;
    height: 30%;
    background-color: white;
    transform: scale(1);
    animation: display-modal .5s ease-in-out;
}
.btn_check_container {
    width: 30%;
    display: flex;
    justify-content: space-between;
}
.btn_check {
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    width: 50px;
    height: 30px;
    margin-top: 3em;
    border-radius: 5px;
    transition: .3s;
}
.btn_check:hover {
    background-color: rgba(8, 8, 58, 0.534);
}
@keyframes display-modal {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
@media screen and (max-width: 1024px) {
    .post_modal {
        width: 95%;
    }
    .emojis_post_modal {
        display: none;
    }
    .check_delete_container h2 {
        font-size: 20px;
        text-align: center;
    }
}
@media screen and (max-width: 768px) {
    .post_modal {
        width: 100%;
    }
    .btn_post_modal {
        width: 130px;
    }
    .btn_post_file_modal i, .btn_post_file_modal_add i{
        display: none;
    }
    .btn_post_file_modal, .btn_post_file_modal_add {
        position: absolute;
        text-align: center;
    }
    .check_delete_container h2 {
        font-size: 16px;
        text-align: center;
    }
    .btn_check_container {
        width: 100%;
        justify-content: space-around;
    }
    .btn_check {
        font-size: 14px;
    }
}
</style>
