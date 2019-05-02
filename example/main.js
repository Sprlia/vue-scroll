
import Vue from 'vue'
import main from './main.vue'

import vueScroll from "../src"
Vue.use(vueScroll)

new Vue({
  el: '#app',
  render: h => h(main)
})
// create vue and mount




