import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var EventStore = new Vuex.Store({
    state: {
      event: 'Loading.....'
    },
    mutations: {
      getEvent (state, response) {
        state.event = response.data
      }
    },
    getters: {
      event (state, getters, rootState, rootGetters) {
        return state.event
      }
    },
    actions: {
        getEvent ({ commit }, eventId) {
        axios.get('https://us-central1-dev-atsumaru.cloudfunctions.net/event?eventId=' + eventId)
          .then(response => {
            if (response.status === 200) {
              commit('getEvent', response)
            }
          })
      }
    }
  })
  export default EventStore
