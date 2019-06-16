import '@fortawesome/fontawesome-free/css/all.css'
import './plugins/vuetify'
import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'
import router from './router'

Vue.use(Vuetify, {
  iconfont: 'fa'
 })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

const firebaseConfig = {
    apiKey: "AIzaSyCDWomasspADJBFkR1uhZeQIR9LY-DdBIQ",
    authDomain: "dev-atsumaru.firebaseapp.com",
    databaseURL: "https://dev-atsumaru.firebaseio.com",
    projectId: "dev-atsumaru",
    storageBucket: "dev-atsumaru.appspot.com",
    messagingSenderId: "208178739193",
    appId: "1:208178739193:web:a082de0ed47031dc"
  };