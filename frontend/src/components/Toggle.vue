<template>
    <div>
        <button class="handle_toggle" @click="toggle = !toggle; parentChange();">
            <i class="fas fa-ellipsis-h"></i>
        </button>
        <ul class="hide" :class="{'show_toggle' : toggle}">
            <li @click="toggle = !toggle; emitDisplay()" class="li_update" v-if="user.isAdmin === 1 || user._id == objectToHandle.User._id">
                <i class="fas fa-pen"></i>
                Modifier
            </li>
            <li @click="toggle = !toggle; emitCheck()" class="li_delete" v-if="user.isAdmin === 1 || user._id == objectToHandle.User._id">
                <i class="fas fa-trash"></i>
                Supprimer
            </li>
            <li @click="toggle = !toggle" class="li_report">
                <i class="far fa-flag"></i>
                Signaler
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'toggle',
    data () {
        return {
            toggle: false,
            display: false,
            check: false
        }
    },
    props: {
        user: {
            type: Object
        },
        objectToHandle: {
            type: Object
        },
        update: {
            type: Boolean
        },
        delete: {
            type: Boolean
        }
    },
    methods: {
        parentChange () {
            this.display = this.update;
            this.check = this.delete;
        },
        emitDisplay () {
            this.display = !this.display;
            this.$emit('display', this.display);
        },
        emitCheck () {
            this.check = !this.check;
            this.$emit('check', this.check);
        }
    }
}
</script>

<style>
.show_toggle {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: -5em;
    top: 3em;
    width: 30%;
    border-radius: 15px;
    background-color: white;
    border: 1px solid grey;
    z-index: 1;
    margin: 0;
    padding: 0;
}
li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    list-style-type: none;
    height: 3em;
    position: relative;
    cursor: pointer;
    margin: 0;
    transition: .3s;
}
li:hover {
    margin-left: 0px;
    background-color: rgba(8, 8, 58, 0.856);
    color: white;
}
li i {
    margin-right: .5em;
}
.li_update {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
}
.li_update, .li_delete {
    border-bottom: 1px solid grey;
}
.li_report {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
}
.handle_toggle {
    position: absolute;
    cursor: pointer;
    border: none;
    background-color: transparent;
    right: 2em;
    top: 2em;
    color: rgb(46, 46, 46);
    width: 5%;
    text-align: center;
    border-radius: 10px;
    transition: .5s ease-in-out;
}
.handle_toggle:hover {
    border: 1px solid rgb(207, 207, 207);
    background-color: rgb(243, 243, 243);
}
@media screen and (max-width: 1024px) {
    .show_toggle {
        right: 0;
    }
}
</style>
