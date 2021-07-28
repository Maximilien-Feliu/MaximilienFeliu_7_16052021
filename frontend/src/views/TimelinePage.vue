<template>
    <div class="complete_timeline_page">
        <Header />

        <div class="main_container">
            <div class="main_timeline">

            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'TimelinePage',
    components: {
        Header,
        Footer,
    },
    data () {
        
    },
    mounted: function () { 
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/home');
            return;
        }
    },
    computed: {
        ...mapState({
            status: 'status',
            user: 'user',
            userInfos: 'userInfos'
        })
    },
}
</script>

<style scoped>
.complete_timeline_page {
    background: url('../assets/building_background.jpg') fixed no-repeat center;
    background-size: cover;
    height: 100vh;
}
.main_container {
    display: flex;
    justify-content: center;
}
.main_timeline {
    background-color: white;
    width: 50%;
    height: 50vh;
}
</style>
