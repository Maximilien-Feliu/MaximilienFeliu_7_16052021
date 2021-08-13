<template>
    <div>
        <button class="handle_post_toggle" @click="toggle = !toggle">
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
        delete: {
            type: Boolean
        }
    },
    methods: {
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
