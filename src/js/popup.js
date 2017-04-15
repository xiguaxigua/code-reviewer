import App from './popup/App'
import Vue from 'vue'
import Router from 'vue-router'
import Register from './popup/register'
import Room from './popup/room'

import {
  Input,
  Button
} from 'element-ui'

[
  Input,
  Button
].forEach(comp => { Vue.component(comp.name, comp) })

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Register
    },
    {
      path: '/room',
      component: Room
    }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
