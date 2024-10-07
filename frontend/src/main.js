import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import App from './App'
import router from './router/index'
import './styles/common.scss';
import '../static/js/jquery.min.js'
import './styles/top.scss';

new Vue({
  el: '#app',
  $,
  router,
  components: { App },
  template: '<App/>'
})
