import Vue from 'vue'
import Router from 'vue-router'
import Create from './components/CreateEvent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'create',
      component: Create
    },
    {
      path: '/view',
      name: 'view',
      component: () => import('./components/ViewEvent.vue')
    }
  ]
})
