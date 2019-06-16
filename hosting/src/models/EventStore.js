import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//  データストア
var EventStore = new Vuex.Store({
    state: {
      event: 'Loading.....',
      theme: 'aaaaa',
      address: 'Loading.....',
      tags: 'Loading.....',
    },
    mutations: {
      getEvent (state, response) {
        state.event = response.data
      },
      theme(state, data){
          state = data
      }
    },
    getters: {
      event (state, getters, rootState, rootGetters) {
        return state.event
      },
    //   theme (state, getters, rootState, rootGetters) {
    //     return state.theme;
    //   },
      theme (state) {
        return state.theme
      }
    },
    actions: {
        createEvent ({ commit }, theme, address, tags) {
            axios({
                method : 'POST',
                url    : 'https://us-central1-dev-atsumaru.cloudfunctions.net/event',
                data   : { theme : 'theme', address : 'address' ,tags:'tags'} })
            .then(response => {
                if (response.status === 200) {
                    commit('createEvent', response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getEvent ({ commit }, eventId) {
            axios.get('https://us-central1-atsumaru-803b0.cloudfunctions.net/event?eventId=' + eventId)
            .then(response => {
                if (response.status === 200) {
                    commit('getEvent', response)
                }
            })
        }
    }
  })
  export default EventStore
