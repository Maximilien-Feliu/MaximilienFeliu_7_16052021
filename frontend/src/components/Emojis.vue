<template>
    <div class="main_emojis">
        <div class="emojis_option">
            <span class="emojis_btn" @click="emojis = !emojis" aria-label="add_emoji">+<i class="far fa-smile-wink"></i></span>
            <emoji-picker class="emojis" :class="{'hide' : !emojis}" @emoji-click='append'></emoji-picker>
        </div>
    </div>
</template>

<script>
import 'emoji-picker-element' 

export default {
    name: 'Emojis',
    data () {
        return {
            inputEmoji: '',
            emojis: false
        }
    },
    methods: {
        append (e) {
            this.inputEmoji = e.detail.unicode;
            this.$emit('append', this.inputEmoji);
        }
    }
}
</script>

<style scoped>
/******** une classe commençant par "emojis" est créée dans les autres composants pour la mise en page  *********/
.main_emojis {
    position: relative;
}
.emojis_btn {
    cursor: pointer;
    background-color: white;
    text-align: center;
    border-radius: 15px;
    border: 1px solid grey;
}
.emojis_btn i {
    color: grey;
}
.emojis_btn i:hover {
    font-size: 20px;
}
.emojis {
    position: absolute;
}
</style>