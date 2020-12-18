import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    permission
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
