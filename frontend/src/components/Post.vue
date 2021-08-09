<template>
    <div class="post" @click="inputShorter">
        <form action="#">
            <div class="img_post_text">
                <img class="profile_picture" :src="userInfos.attachment" :alt="'Photo de profil de ' + `${userInfos.firstName}`">
                <div class="post_area">
                    <label for="post_text" id="whatsup">Quoi de neuf, {{userInfos.firstName}} ?</label>
                    <textarea name="post_text" id="post_text" v-model="postText" placeholder="Écrivez ce que vous ressentez actuellement..." @click="growUp"></textarea>
                    <label for="post_file" id="btn_post_file"><i class="fas fa-images"></i>Photo/Video</label>

                    <Emojis class="emojis_post" @append="updateInput"></Emojis>

                    <div class="img_option">
                        <img id="preview_img" :class="{'hide' : !previewImage}" :src="previewImage" :alt="'Aperçu de l\'image du post de ' + `${userInfos.firstName}`">
                        <button type="button" id="btn_preview_image" :class="{'hide' : !previewImage}" @click="cancelImage">Retirer</button>
                    </div>

                    <input type="file" name="post_file" id="post_file" accept="image/*" @change="uploadImage">
                    <button type="button" @click="post" id="btn_post">
                        <span >Publier</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Emojis from '@/components/Emojis.vue'

export default {
    name: 'Post',
    components: {
        Emojis,
    },
    data () {
        return {
            postText: '',
            previewImage: null,
            attachment: null,
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
        uploadImage(e){
            this.files = e.target.files[0];
            this.previewImage = URL.createObjectURL(this.files);
        },
        cancelImage () {
            this.previewImage = null;
            this.files = null;
        },
        post() {
            const formData = new FormData();

            if(this.files != undefined) {
                formData.append('attachment', this.files);
            }
            if(this.postText != '') {
                formData.append('text', this.postText);
            }

            this.$store.dispatch('createPost', formData)
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
        growUp(e) {
            e.target.style.height = '40em';
            e.target.style.backgroundColor = 'white';
            e.target.style.border = '1px solid grey'; 
            e.target.style.boxShadow = 'none';        
        },
        inputShorter(e) {
            const input = document.getElementById('post_text');
            const emojis = document.getElementsByClassName('emojis_btn')[0];
            const emojisIcon = document.getElementsByClassName('fa-smile-wink')[0];
            if(e.target != input && e.target != emojis && e.target != emojisIcon) {
                input.style.height = '4em';
            }
        },
        updateInput (inputEmoji) {
            this.postText += inputEmoji
        }
    }
}
</script>

<style scoped>
.post {
    background-color: white;
    border-radius: 15px;
    margin-top: 5em;
}
.post form {
    display: flex;
    flex-direction: column;
}
.img_post_text {
    display: flex;
    align-items: center;
    margin-top: 1em;
    margin-left: 4em;
}
.post_area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 8.5em;
    margin-top: 1em;
    position: relative;
}
.profile_picture {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
}
#whatsup {
    font-weight: bold;
}
textarea {
    width: 190%;
    height: 4em;
    margin-top: 1em;
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.459),
                inset -2px -2px rgba(0, 0, 0, 0.459);
    border: none;
    cursor: pointer;
    border-radius: 10px;
    transition: .3s;
}
::placeholder {
    padding-left: 1em;
    padding-top: .5em;
}
textarea:hover {
    background-color: rgba(128, 128, 128, 0);
    border: 1px solid grey;
}
#btn_post_file {
    position: relative;
    left: -5em;
    cursor: pointer;
    border: 1px solid grey; 
    margin-top: 5px;
    width: 130px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    transition: .3s;
}
#btn_post_file:hover {
    width: 135px;
}
i {
    color: rgb(255, 57, 57);
}
.emojis_post {
    position: absolute;
    bottom: 4.8em;
    right: -5.5em;
}
#btn_post {
    cursor: pointer;
    margin-top: 1em;
    width: 170px;
    height: 30px;
    border-radius: 5px;
    transform: .3s;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    margin-bottom: 1em;
    transition: .3s;
}
#btn_post:hover {
    background-color: rgba(8, 8, 58, 0.534);
}
.img_option {
    position: relative;
}
#preview_img {
    margin-top: .5em;
    width: 250px;
    height: 250px;
    object-fit: cover;
}
.button--disabled {
  pointer-events: none;
  background-color: rgba(194, 194, 194, 0.589);
  color: rgba(0, 0, 0, 0.589);
}
#post_file {
    display: none;
}
#btn_preview_image {
    cursor: pointer;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
    border-radius: 5px;
    transition: .3s;
    position: absolute;
    top: 9em;
    right: -6em;
}
#btn_preview_image:hover {
    background-color: rgba(8, 8, 58, 0.534);
}
</style>