import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var MemberStore = new Vuex.Store({
  state: {
    member: ''
  },
  mutations: {
    postMember (state, response) {
      console.log(response)
      state.event = response.data
    }
  },
  getters: {
    member (state, getters, rootState, rootGetters) {
      return state.member
    }
  },
  actions: {
      postMember ({ commit }, params) {
        console.log(params)
        axios.post('https://us-central1-atsumaru-pe.cloudfunctions.net/member', params)
          .then(response => {
            if (response.status === 200) {
              console.log(response)
              commit('postMember', response)
            }
          })
      }
    }
  })
  export default MemberStore
