import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
    products: [],
    jobs: [],
  },
  mutations: {
    SOCKET_ALL(state, message) {
      const _data = message.state
      state[_data] = message.value
    },
    ADD_PROD(state, payload) {
      console.log(payload)
      state.products.push(payload)
    },
  },
  actions: {},
  modules: {},
})
