import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var EventStore = new Vuex.Store({
    state: {
      property: {
        event: 'Loading.....'
      }
    },
    mutations: {
      getEvent (state, response) {
        state.property.nickname = response.data.nickname
      },
    },
    actions: {
        getEvent ({ commit }) {
        axios.get('https://us-central1-atsumaru-803b0.cloudfunctions.net/event?eventId=dNaMbP81n1fGG1X6ijqt')
          .then(response => {
            if (response.status === 200) {
              commit('getEvent', response)
            }
          })
      },
    }
  })
  export default EventStore
