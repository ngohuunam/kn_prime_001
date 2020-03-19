import Vue from 'vue'
import Vuex from 'vuex'

import filmOrdersListModule from './modules/filmOrdersList'

Vue.use(Vuex)

import state from './state'
import * as mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const store = new Vuex.Store({
  modules: { filmOrdersList: filmOrdersListModule },
  state,
  mutations,
  getters,
  actions,
  // plugins: [createPersistedState()],
})

const hotReloadElements = ['./state', './mutations', './getters', './actions', './modules/filmOrdersList']

if (module.hot) {
  module.hot.accept(hotReloadElements, () => {
    const newMutations = require('./mutations').default
    const newGetters = require('./getters').default
    const newActions = require('./actions').default
    const newState = require('./state').default
    const newFilmOrdersListModule = require('./modules/filmOrdersList').default
    store.hotUpdate({
      state: newState,
      mutations: newMutations,
      getters: newGetters,
      actions: newActions,
      modules: {
        filmOrdersList: newFilmOrdersListModule,
      },
    })
  })
}

export default store
