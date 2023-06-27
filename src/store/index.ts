import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  plugins: [createPersistedState()],

  state: {
    user: {}
  },

  getters: {
    getUser(state) {
      return state.user;
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },

  actions: {
    setUser (context, data) {
      context.commit('setUser', data)
    },
  }
})