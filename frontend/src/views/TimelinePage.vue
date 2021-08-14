<template>
    <div class="complete_timeline_page">
        <div class="header_search_bar">
            <Header />
            <SearchBar class="main_search_bar"/>
            <ProfileToggle :user="userInfos"></ProfileToggle>
        </div>
        <div class="main_container">
            <div class="main_timeline">
                <div class="search_bar_responsive">
                    <SearchBar class="main_search_bar_responsive"/>
                </div>
                <Post />
                <Timeline :postsArray="posts"></Timeline>
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
import ProfileToggle from '@/components/ProfileToggle.vue'

export default {
    name: 'TimelinePage',
    components: {
        Header,
        Footer,
        SearchBar,
        Post,
        Timeline,
        ProfileMiniature,
        ProfileToggle
    },
    mounted: function () { 
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/home');
            return;
        }
        this.$store.dispatch('getAllPosts');
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            status: 'status',
            user: 'user',
            posts: ['posts'],
            userInfos: 'userInfos'
        })
    },
}
</script>

<style scoped>
Header {
    position: fixed;
}
.header_search_bar {
    position: fixed;
    z-index: 998;
}
.main_search_bar {
    right: 14em;
    top: 15px;
    position: fixed;
    z-index: 999;
}
.search_bar_responsive {
    display: none;
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
    margin-top: 5em;
}
@media screen and (max-width: 1024px) {
    .main_timeline {
        width: 95%;
    }
}
@media screen and (max-width: 768px) {
    .main_timeline {
        width: 100%;
    }
    .main_search_bar {
        display: none;
    }
    .search_bar_responsive {
        display: block;
        margin-top: 1em;
    }
}
</style>
