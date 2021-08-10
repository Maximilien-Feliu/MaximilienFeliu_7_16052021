<template>
    <div class="main_reactions">
        <div class="hide_reaction" :class="{'reactions' : reactions}">

            <input type="radio" class="" @click="sendReaction" name="react" v-model="react" value="❤️" /> 
            <label for="heart">❤️</label>

            <input type="radio" class="" @click="sendReaction" name="react" v-model="react" value="😂" />
            <label for="laugh">😂</label>

            <input type="radio" class="" @click="sendReaction" name="react" v-model="react" value="👏" />
            <label for="applaud">👏</label>

            <input type="radio" class=""  @click="sendReaction" name="react" v-model="react" value="😢" />
            <label for="cry">😢</label>

            <input type="radio" class="" @click="sendReaction" name="react" v-model="react" value="😡" />
            <label for="angry">😡</label>

        </div>
        
        <button @click="reactions = !reactions" class="btn_post_react" :class="{'light' : react != ''}" type="button">
            <i v-if="status != 'isLiked'" class="far fa-heart"></i>
            <span v-else>{{ react }}</span>
            Réagir
        </button> 
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Reactions',
    data () {
        return {
            reactions: '',
            react: ''
        }
    },
    computed: {
        ...mapState({
            status: 'status',
        })
    },
    methods: {
        sendReaction (e) {
            this.reactions = !this.reactions;
            this.react = e.target.value; 
            this.$emit('sendReaction', this.react); 
        }
    }
    
}
</script>

<style scoped>
.main_reactions {
    width: 34%;
}
.btn_post_react {
    cursor: pointer;
    border: none;
    width: 100%;
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
.hide_reaction {
    display: none;
}
.reactions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    background-color: aliceblue;
    border-radius: 25px;
    border: 1px solid grey;
    font-size: larger;
    width: 45%;
    height: 3em;
    top: -3.5em;
    left: -2.5em;
}
.reactions label{
    cursor: pointer;
    transition: .2s;
}
.reactions label:hover {
    font-size: 30px;
}
.light {
    color: rgba(22, 22, 228, 0.856);
}
</style>