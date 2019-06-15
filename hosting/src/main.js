import Vue from 'vue'
import App from './App.vue'

import './plugins/vuetify'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false


new Vue({
    render: h => h(App),
}).$mount('#app')
  
