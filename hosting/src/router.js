import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./components/CreateEvent.vue')
    },
    {
      path: '/view',
      name: 'view',
      component: () => import('./components/ViewEvent.vue')
    },
    {
      path: '/raise',
      name: 'raise',
      component: () => import('./components/RaiseHand.vue')
    }
  ]
})
