// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import $ from 'jquery'
import { loadStyle } from './util/util'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import App from './App'
import router from './router/index'
// import axios from './router/axios';
// Vue.use(axios)

import './styles/common.scss';
//颜色选择器插件
import '../static/js/jquery.min.js'

import './styles/top.scss';

import '../static/js/avue.js'
import '../static/css/avue.css'
Vue.use(window.AVUE, {
  size: 'mini',
  tableSize: 'mini',
  calcHeight: 65,
});

Vue.config.productionTip = false

// 动态加载阿里云字体库
loadStyle(`//at.alicdn.com/t/font_$key.css`.replace('$key', '567566_pwc3oottzol'));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  $,
  router,
  components: { App },
  template: '<App/>'
})
