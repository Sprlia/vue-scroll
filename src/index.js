import vueScroll from './main.vue'
// 这里是重点
export default {
  install: function (Vue) {
    Vue.component('vueScroll', vueScroll)
  }
}