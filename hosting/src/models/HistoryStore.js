import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var HistoryStore = new Vuex.Store({
    mutations: {
      postMember (state, response) {
        console.log(response)
      }
    },
    actions: {
      postMember ({ commit }, params) {
        axios.post('https://us-central1-dev-atsumaru.cloudfunctions.net/history', params)
          .then(response => {
            if (response.status === 200) {
              commit('postHistory', response)
            }
          })
      }
    }
  })
  export default HistoryStore
