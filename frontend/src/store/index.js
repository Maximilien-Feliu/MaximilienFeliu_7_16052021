import { createStore } from 'vuex'

const axios = require('axios');

let instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: ''
  };
} else {
    try {
      user = JSON.parse(user);
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } catch (e) {
      user = {
        userId: -1,
        token: ''
      }
    }
}

export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {},
    profileUser: {},
    users: [],
    posts: [],
    postsByUserId: [],
    postReactions: [],
  },
  mutations: {
    SET_STATUS (state, status) {
      state.status = status;
    },
    LOG_USER (state, user) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    USER_INFOS (state, userInfos) {
      state.userInfos = userInfos;
    },
    PROFILE_USER (state, profileUser) {
      state.profileUser = profileUser      
    },
    ALL_USERS (state, users) {
      state.users = users;
    },
    ALL_POSTS (state, posts) {
      state.posts = posts;
    },
    ALL_POSTS_BY_USER (state, postsByUserId) {
      state.postsByUserId = postsByUserId;
    },
    ALL_REACTIONS (state, postReactions) {
      state.postReactions = postReactions;
    }
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos) 
        .then((response) => {
          commit('SET_STATUS', 'userCreated');
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            commit('SET_STATUS', 'error_email');
            reject(error);

          } else if (error.response.status === 401) {
            commit('SET_STATUS', 'error_regex');
            reject(error);

          } else if (error.response.status === 429) {
            commit('SET_STATUS', 'error_too_many');
            reject(error);

          } else {
            commit('SET_STATUS', 'error_create');
            reject(error);
          } 
        });
      })
    },
    login: ({commit}, userInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos) 
        .then((response) => {
          commit('SET_STATUS', 'loggedIn');
          commit('LOG_USER', response.data);
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            commit('SET_STATUS', 'user_not_found');
            reject(error);

          } else if (error.response.status === 401) {
            commit('SET_STATUS', 'error_login_regex');
            reject(error);

          } else if (error.response.status === 429) {
            commit('SET_STATUS', 'error_blocked');
            reject(error);
            
          } else {
            commit('SET_STATUS', 'error_login');
            reject(error);
          }
        });
      })
    },
    getUserInfos: ({commit}) => {
      commit('SET_STATUS', 'loading');
      instance.get(`/auth/${user.userId}`)
      .then((response) => {
        commit('USER_INFOS', response.data);
        commit('SET_STATUS', 'catched');
        console.log(response.data)
      })
      .catch(() => {
        commit('SET_STATUS', 'error_user');
      })
    },
    getUserByItsId: ({commit}, userId) => {
      commit('SET_STATUS', 'loading');
      instance.get(`/auth/${userId.userId}`)
      .then((response) => {
        commit('PROFILE_USER', response.data);
      })
      .catch(() => {
        commit('SET_STATUS', 'error_user');
      })
    },
    updateProfile: ({commit}, updateInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put(`/auth/${user.userId}`, updateInfos) 
        .then((response) => {
          commit('SET_STATUS', 'user_updated');
          commit('USER_INFOS', response.data);
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            commit('SET_STATUS', 'not_allowed_to_update');
            reject(error);

          } else if (error.response.status === 401) {
            commit('SET_STATUS', 'error_update_regex');
            reject(error);

          } else {
            commit('SET_STATUS', 'error_update'); 
            reject(error);
          }
        });
      });  
    },
    getAllUsers: ({commit}, users) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => { 
        instance.post('/auth/', users)
        .then((response) => {
          commit('SET_STATUS', 'succeed');
          commit('ALL_USERS', response.data);
          resolve(response.data);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_users');
          reject(error);
        })
      })
    },
    createPost: ({commit}, postInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/post/', postInfos)
        .then((response) => {
          commit('SET_STATUS', 'postCreated');
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            commit('SET_STATUS', 'error_regex');
            reject(error);

          }  else {
            commit('SET_STATUS', 'error_create');
            reject(error);
          } 
        })
      })
    },
    updatePost: ({commit}, updateInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put(`/post/${updateInfos.id}`, updateInfos.formData) 
        .then((response) => {
          commit('SET_STATUS', 'post_updated');
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            commit('SET_STATUS', 'not_allowed_to_update');
            reject(error);

          } else if (error.response.status === 401) {
            commit('SET_STATUS', 'error_update_regex');
            reject(error);

          } else {
            commit('SET_STATUS', 'error_update'); 
            reject(error);
          }
        });
      });  
    },
    deletePost: ({commit}, postInfos) => {
      commit('SET_STATUS', 'loading');  
      instance.delete(`/post/${postInfos.id}`)
      .then(() => {
        commit('SET_STATUS', 'post_deleted');
        console.log(state.status);
      })
      .catch(() => {
          commit('SET_STATUS', 'error_delete');
      })
    },
    getAllPosts: ({commit}) => {
      commit('SET_STATUS', 'loading');
      instance.get('/post/')
      .then((response) => {
        commit('SET_STATUS', 'succeed');
        commit('ALL_POSTS', response.data);
        console.log(response.data)
      })
      .catch(() => {
        commit('SET_STATUS', 'error_posts');
      })
    },
    getAllPostsByUserId: ({commit}, postsInfos) => {
      commit('SET_STATUS', 'loading');
      instance.get(`/post/user/${postsInfos.id}`, postsInfos)
      .then((response) => {
        commit('SET_STATUS', 'succeed');
        commit('ALL_POSTS_BY_USER', response.data);
      })
      .catch(() => {
        commit('SET_STATUS', 'error_posts');
      })
    },
    createComment: ({commit}, commentInfos) => {
      commit('SET_STATUS', 'loading'); 
      return new Promise((resolve, reject) => {
        instance.post(`/post/${commentInfos.postId}/comment`, commentInfos.formData)
        .then((response) => {
          commit('SET_STATUS', 'comment_created');
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            commit('SET_STATUS', 'error_regex');
            reject(error);

          }  else {
            commit('SET_STATUS', 'error_create');
            reject(error);
          } 
        })
      })
    },
    updateComment: ({commit}, updateInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put(`/post/${updateInfos.postId}/comment/${updateInfos.id}`, commentInfos.formData) 
        .then((response) => {
          commit('SET_STATUS', 'comment_updated');
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            commit('SET_STATUS', 'not_allowed_to_update');
            reject(error);

          } else if (error.response.status === 401) {
            commit('SET_STATUS', 'error_update_regex');
            reject(error);

          } else {
            commit('SET_STATUS', 'error_update'); 
            reject(error);
          }
        });
      });  
    },
    deleteComment: ({commit}, commentInfos) => {
      commit('SET_STATUS', 'loading');  
      instance.delete(`/post/${commentInfos.postId}/comment/${commentInfos.id}`)
      .then(() => {
        commit('SET_STATUS', 'comment_deleted');
        console.log(state.status);
      })
      .catch(() => {
          commit('SET_STATUS', 'error_delete');
      })
    },
    createPostReaction: ({commit}, postReaction) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post(`/post/${postReaction.postId}/postReaction`, {
          reaction: postReaction.reaction
        })
        .then((response) => {
          commit('SET_STATUS', 'isLiked');
          resolve(response);
        })
        .catch((error) => {
            commit('SET_STATUS', 'error_create');
            reject(error);
        })
      })
    },
    updatePostReaction: ({commit}, postReaction) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put(`/post/${postReaction.postId}/postReaction/${postReaction.id}`, {
          reaction: postReaction.reaction
        })
        .then((response) => {
          commit('SET_STATUS', 'like_updated');
          resolve(response);
        })
        .catch((error) => {
            commit('SET_STATUS', 'error_update');
            reject(error);
        })
      })
    },
    deletePostReaction: ({commit}, postReaction) => {
      commit('SET_STATUS', 'loading');  
      instance.delete(`/post/${postReaction.postId}/postReaction/${postReaction.id}`)
      .then(() => {
        commit('SET_STATUS', 'like_deleted');
      })
      .catch(() => {
          commit('SET_STATUS', 'error_delete');
      })
    },
    createCommentReaction: ({commit}, commentReaction) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post(`/post/${commentReaction.postId}/comment/${commentReaction.commentId}/commentReaction`, {
          reaction: commentReaction.reaction
        })
        .then((response) => {
          commit('SET_STATUS', 'is_liked');
          resolve(response);
        })
        .catch((error) => {
            commit('SET_STATUS', 'error_create');
            reject(error);
        })
      })
    },
    updateCommentReaction: ({commit}, commentReaction) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put(`/post/${commentReaction.postId}/comment/${commentReaction.commentId}/commentReaction/${commentReaction.id}`, {
          reaction: commentReaction.reaction
        })
        .then((response) => {
          commit('SET_STATUS', 'likeUpdated');
          resolve(response);
        })
        .catch((error) => {
            commit('SET_STATUS', 'error_update');
            reject(error);
        })
      })
    },
    deleteCommentReaction: ({commit}, commentReaction) => {
      commit('SET_STATUS', 'loading');  
      instance.delete(`/post/${commentReaction.postId}/comment/${commentReaction.commentId}/commentReaction/${commentReaction.id}`)
      .then(() => {
        commit('SET_STATUS', 'likeDeleted');
      })
      .catch(() => {
          commit('SET_STATUS', 'error_delete');
      })
    }
  }
})
