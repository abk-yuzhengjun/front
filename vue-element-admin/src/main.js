import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import './icons' // icon

import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters


import VueSocketIO from 'vue-socket.io'

import moment from 'moment'

import socketio from 'socket.io-client';
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.use(new VueSocketIO({

  debug: false,

  connection: 'http://localhost:5000',

  // cors_allowed_origins:'*',
  vuex: {       // 不需要用到vuex这个可以不加

    store,

    actionPrefix: 'SOCKET_',

    mutationPrefix: 'SOCKET_'

  }

}))
Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
})
