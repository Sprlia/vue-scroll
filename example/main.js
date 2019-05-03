
import Vue from 'vue'
import main from './main.vue'

import vueScroll from "../src"
Vue.use(vueScroll, { width: 6, alwaysShow: true })

new Vue({
  el: '#app',
  render: h => h(main)
})
// create vue and mount




