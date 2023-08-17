import { createStore } from "vuex";

export default createStore({
  state: {
    name: 'vuex',
    userInfo: {
      name: 'vuex-composition'
    }
  },
  getters: {
    helloName (state) {
      return `hello ${state.name}`
    },
    helloUser (state) {
      return `hello user ${state.userInfo.name}`
    }
  },
  mutations: {
    SET_NAME (state, payload) {
      state.name = payload
    },
    SET_USER (state, payload) {
      Object.assign(state.userInfo, payload)
    }
  },
  actions: {
    setName ({commit }, payload) {
      commit('SET_NAME', payload)
    },
    setUser ({ commit }, payload) {
      commit('SET_USER', payload)
    }
  }
})
