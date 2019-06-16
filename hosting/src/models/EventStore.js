import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var EventStore = new Vuex.Store({
    state: {
      event: 'Loading.....',
      eventId: ''
    },
    mutations: {
      getEvent (state, response) {
        state.event = response.data
      },
      setEventId (state, Id) {
        state.eventId = Id
      }
    },
    getters: {
      event (state, getters, rootState, rootGetters) {
        return state.event
      },
      eventId (state, getters, rootState, rootGetters) {
        return state.eventId
      }
    },
    actions: {
        createEvent ({ commit }, params) {
            console.log('eventId')
            commit('setEventId', 'Tx2Si7wjA35E8S3rALGj')
            axios({
                method: 'POST',
                url: 'https://us-central1-atsumaru-pe.cloudfunctions.net/event',
                data: params })
            .then(response => {
                if (response.status === 200) {
                    commit('setEventId', response.data.id)
                }
            })
            .catch(function (error) {
              commit('setEventId', 'Tx2Si7wjA35E8S3rALGj')
              console.log(error)
            })
        },
        getEvent ({ commit }, eventId) {
        axios.get('https://us-central1-atsumaru-pe.cloudfunctions.net/event?eventId=' + eventId)
          .then(response => {
            if (response.status === 200) {
              commit('getEvent', response)
            }
          })
      }
    }
  })
  export default EventStore
