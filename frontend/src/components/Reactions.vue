<template>
    <div class="main_reactions">
        <div class="hide_reaction" :class="{'reactions' : toggleReactions}">

            <label :for="'heart'+likeName+postIndex+objectIndex">❤️</label>
            <input type="radio" @change="react" class="hide" :id="'heart'+likeName+postIndex+objectIndex" name="react" v-model="picked" value="❤️" />

            <label :for="'laugh'+likeName+postIndex+objectIndex">😂</label>
            <input type="radio" @change="react" class="hide" :id="'laugh'+likeName+postIndex+objectIndex" name="react" v-model="picked" value="😂" />

            
            <label :for="'applaud'+likeName+postIndex+objectIndex">👏</label>
            <input type="radio" @change="react" class="hide" :id="'applaud'+likeName+postIndex+objectIndex" name="react" v-model="picked" value="👏" />

            
            <label :for="'cry'+likeName+postIndex+objectIndex">😢</label>
            <input type="radio" @change="react" class="hide" :id="'cry'+likeName+postIndex+objectIndex" name="react" v-model="picked" value="😢" />

            
            <label :for="'angry'+likeName+postIndex+objectIndex">😡</label>
            <input type="radio" @change="react" class="hide" :id="'angry'+likeName+postIndex+objectIndex" name="react" v-model="picked" value="😡" />

        </div>
        
        <button v-if="!commentId" @click="toggleReactions = !toggleReactions" class="btn_post_react" :class="{'dark' : !isLiked || status == 'likeDeleted'}" type="button">
            <i v-if="!isLiked || status == 'likeDeleted'" class="far fa-heart"></i>
            <span v-else>{{ displayReaction }}</span>
            Réagir
        </button> 
        <button v-if="commentId" @click="toggleReactions = !toggleReactions" class="comment_like bold" :class="{'dark' : !isLiked || status == 'likeDeleted'}" type="button">
            <span v-if="isLiked">{{ displayReaction }}</span>
            J'aime
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Reactions',
    data () {
        return {
            picked: '',
            toggleReactions: '',
            displayReaction: '',
        }
    },
    props: {
        likeName: {
            type: String
        },
        userId: {
            type: Number
        },
        postId: {
            type: Number
        },
        commentId: {
            type: Number
        },
        postIndex: {
            type: Number
        },
        objectIndex: {
            type: Number
        },
        reactions: {
            type: Object
        },
        handleReaction: {
            type: Object    
        }
    },
    computed: {
        seeMe () {
            this.toggleReactions = !this.toggleReactions

            console.log(this.postId)
            console.log(this.commentId)
            console.log(this.objectIndex)
            console.log(this.reactions)
            console.log(this.handleReaction)
        },
        isLiked () {
            let userReaction = this.reactions.map((i) => i.UserId);

            if (userReaction.includes(this.userId)) {
                let indexOfUser = userReaction.indexOf(this.userId);
                let findReaction = this.reactions.map((i) => i.reaction);
                let reaction = findReaction[indexOfUser];
                this.displayReaction = reaction

                return true;

            } else {

                return false
            }
        },
        ...mapState({
            status: 'status',
        })
    },
    methods: {
        react (e) {
            this.picked = e.target.value;
            this.toggleReactions = !this.toggleReactions

            let reactions = this.reactions;
            let userId = this.userId;
            let addReaction = this.handleReaction.add;
            let updateReaction = this.handleReaction.update;
            let deleteReaction = this.handleReaction.delete;

            let userReaction = reactions.map((i) => i.UserId);
            let indexOfUser = userReaction.indexOf(userId);
            let findReaction = reactions.map((i) => i.reaction);
            let reaction = findReaction[indexOfUser];
            let findReactionId = reactions.map((i) => i._id);
            let reactionId = findReactionId[indexOfUser];

            let newReaction = {
                id: reactionId,
                postId: this.postId,
                commentId: this.commentId, 
                reaction: this.picked,
            };
            console.log(this.picked)
            
            if (userReaction.includes(userId)) {

                if(reaction == this.picked) {
                    this.$store.dispatch(deleteReaction, newReaction)
                    .then(() => {
                        window.location.reload();
                    })

                } else {
                    this.$store.dispatch(updateReaction, newReaction)
                    .then(() => {
                        console.log(this.$store.state.status)
                        window.location.reload();
                    })      
                }
            } else {
                this.$store.dispatch(addReaction, newReaction)
                .then(() => {
                    console.log(this.$store.state.status)
                    window.location.reload();
                })
            }
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
    color: rgba(22, 22, 228, 0.856);
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
.comment_like {
    text-decoration: underline;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: .3s;
    color: rgba(22, 22, 228, 0.856);
    display: flex;
}
.comment_like:hover {
    color: rgb(255, 57, 57);
}
.dark {
    color: black;
}
@media screen and (max-width: 1024px) {
    .reactions {
        left: 0;
    }
}
</style>