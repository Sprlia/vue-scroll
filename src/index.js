import vueScroll from './main.vue'

export default {
  install: function (Vue, config) {
    Vue.prototype.$SPSCROLLER = config ||{}
    Vue.component('vueScroll', vueScroll)
  }
}

