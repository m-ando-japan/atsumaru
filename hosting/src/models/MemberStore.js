import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var MemberStore = new Vuex.Store({
    mutations: {
      postMember (state, response) {
        state.event = response.data
      }
    },
    actions: {
      postMember ({ commit }, params) {
        axios.post('https://us-central1-atsumaru-803b0.cloudfunctions.net/member', params)
          .then(response => {
            if (response.status === 200) {
              commit('postMember', response)
            }
          })
      }
    }
  })
  export default MemberStore
