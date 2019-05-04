1：使用方法：
  import vueScroll from "vue-scroller-sp"
  Vue.use(vueScroll, config)  //第二个参数为默认配置

2: 配置列表:
        width: 6,   滚动条宽度
        color: "#000",  滚动条颜色
        alwaysShow: false,  总是显示滚动条
        alwaysHide: false,  总是隐藏滚动条
        event_up: 0,         触发event_up事件时 滚动区域到顶部 的距离
        event_down: 100,    触发event_down事件时 滚动区域到底部 的距离
        //background: ""

3:事件列表:
  event_up  
    返回参数 {
        clientHeight: 0,
        scrollHeight: 0,
        scrollTop: 0,

        clientWidth: 0,
        scrollWidth: 0,
        scrollLeft: 0
      },
  event_down
     返回参数{
        clientHeight: 0,
        scrollHeight: 0,
        scrollTop: 0,

        clientWidth: 0,
        scrollWidth: 0,
        scrollLeft: 0
      },

4: props参数
  config  参见配置列表