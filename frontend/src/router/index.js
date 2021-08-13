import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CompleteProfile from '../views/CompleteProfile.vue'
import TimelinePage from '../views/TimelinePage.vue'
import NotFound from '../views/NotFound.vue'
import ProfileUser from '../views/ProfileUser.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Groupomania - Accueil'
    }
  }, 
  {
    path: '/completeProfile',
    name: 'CompleteProfile',
    component: CompleteProfile,
    meta: {
      title: 'Groupomania - Profile à compléter'
    }
  },
  {
    path: '/',
    name: 'TimelinePage',
    component: TimelinePage,
    meta: {
      title: 'Groupomania'
    }
  },
  {
    path: '/ProfileUser/:userId',
    name: 'ProfileUser',
    component: ProfileUser,
    meta: {
      title: 'Groupomania - Profil utilisateur'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Groupomania - Connexion'
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router
