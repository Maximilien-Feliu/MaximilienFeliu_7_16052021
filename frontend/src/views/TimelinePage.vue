<template>
    <div class="complete_timeline_page">
        <div class="header_search_bar">
            <Header />
            <SearchBar class="main_search_bar"/>
        </div>
        <div class="main_container">
            <div class="main_timeline">
                <Post />
                <Timeline />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SearchBar from '@/components/SearchBar.vue'
import Post from '@/components/Post.vue'
import Timeline from '@/components/Timeline.vue'

export default {
    name: 'TimelinePage',
    components: {
        Header,
        Footer,
        SearchBar,
        Post,
        Timeline,
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
}
.header_search_bar {
    position: relative;
}
.main_search_bar {
    position: absolute;
    right: 14em;
    top: 15px;
}
.main_container {
    display: flex;
    justify-content: center;
}
.main_timeline {
    width: 50%;
}
</style>
