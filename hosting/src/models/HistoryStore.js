import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var HistoryStore = new Vuex.Store({
  state: {
    history: ''
  },
  mutations: {
    postHistory (state, response) {
      console.log(response)
      state.event = response.data
    }
  },
  getters: {
    history (state, getters, rootState, rootGetters) {
      return state.history
    }
  },
  actions: {
    postMember ({ commit }, params) {
      axios.post('https://us-central1-atsumaru-pe.cloudfunctions.net/history', params)
        .then(response => {
          if (response.status === 200) {
            commit('postHistory', response)
          }
        })
    }
  }
})
export default HistoryStore
