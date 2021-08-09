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
            <aside>
                <ProfileMiniature class="main_miniature"/>
            </aside>
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
import ProfileMiniature from '@/components/ProfileMiniature.vue'

export default {
    name: 'TimelinePage',
    components: {
        Header,
        Footer,
        SearchBar,
        Post,
        Timeline,
        ProfileMiniature
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
Header {
    position: fixed;
    z-index: 998;
}
.complete_timeline_page {
    background: url('../assets/building_background.jpg') fixed no-repeat center;
    background-size: cover;
}
.header_search_bar {
    position: relative;
    position: fixed;
    z-index: 998;
}
.main_search_bar {
    right: 14em;
    top: 15px;
    position: fixed;
    z-index: 999;
}
.main_miniature {
    z-index: 2;
}
.main_container {
    display: flex;
    justify-content: center;
}
.main_timeline {
    position: relative;
    z-index: 500;
    width: 50%;
}
</style>
