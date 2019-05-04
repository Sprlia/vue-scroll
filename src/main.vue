<template>
  <div class="_scroll_body" @wheel="wheel" @mouseenter="mouseenter" @mouseleave="mouseleave" @touchmove="touchmove" @touchend="touchend" ref="tttt">
    <slot></slot>
    <scroll-x :body.sync="body" :configs="configs" :event="event"></scroll-x>
    <scroll-y :body.sync="body" :configs="configs" :event="event"></scroll-y>
  </div>
</template>

<script>
import scrollX from "./scroll_x.vue";
import scrollY from "./scroll_y.vue";

export default {
  components: { scrollX, scrollY },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      default_config: {
        width: 6,
        color: "#000",
        //color: "#9093994d",
        alwaysShow: false,
        alwaysHide: false,
        event_up: 0,
        event_down: 100,
        background: ""
      },
      event: {
        hover: false,
        mobile: false
      },
      body: {
        clientHeight: 0,
        scrollHeight: 0,
        scrollTop: 0,

        clientWidth: 0,
        scrollWidth: 0,
        scrollLeft: 0
      },
      eventTmp: {
        touch: null
      }
    };
  },
  methods: {
    init() {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        this.event.mobile = true;
      } else {
        this.event.mobile = false;
      }
    },
    mouseenter() {
      this.event.hover = true;
    },
    mouseleave() {
      this.event.hover = false;
    },
    refresh() {
      this.body.clientHeight = this.$refs.tttt.clientHeight;
      this.body.scrollHeight = this.$refs.tttt.scrollHeight;
      this.body.scrollTop = this.$refs.tttt.scrollTop;

      this.body.clientWidth = this.$refs.tttt.clientWidth;
      this.body.scrollWidth = this.$refs.tttt.scrollWidth;
      this.body.scrollLeft = this.$refs.tttt.scrollLeft;
    },
    wheel(e) {
      this.body.scrollTop = this.body.scrollTop + e.deltaY;
      this.body.scrollLeft = this.body.scrollLeft + e.deltaX;
    },
    touchmove(e) {
      if (this.eventTmp.touch) {
        let toucher = e.changedTouches[0];
        this.body.scrollTop =
          this.body.scrollTop -
          (toucher.clientY - this.eventTmp.touch.changedTouches[0].clientY);
        this.body.scrollLeft =
          this.body.scrollLeft -
          (toucher.clientX - this.eventTmp.touch.changedTouches[0].clientX);
        this.eventTmp.touch = e;
      } else {
        this.eventTmp.touch = e;
      }
    },
    touchend(e) {
      console.log("touch end");
      this.eventTmp.touch = null;
    }
  },
  computed: {
    configs() {
      console.log(this.default_config, this.$SPSCROLLER, this.config);
      console.log(
        Object.assign({}, this.default_config, this.$SPSCROLLER, this.config)
      );
      return Object.assign(
        {},
        this.default_config,
        this.$SPSCROLLER,
        this.config
      );
    }
  },
  watch: {
    body: {
      handler(n, o) {
        this.$refs.tttt.scrollTop = n.scrollTop;
        this.$refs.tttt.scrollLeft = n.scrollLeft;

        if (
          // this.body.scrollHeight >=
          //   this.body.scrollTop + this.body.clientHeight &&
          this.body.scrollHeight -
            this.body.scrollTop -
            this.body.clientHeight <=
          this.configs.event_down
        ) {
          console.log("event_down");
          this.$emit("event_down", n);
        }

        if (
          //n.scrollTop >= 0 &&
          this.body.scrollTop <= this.configs.event_up
        ) {
          this.$emit("event_up", n);
        }
      },
      deep: true
    }
  },
  mounted() {
    const _this = this;
    _this.init();
    _this.refresh();

    var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    var observer = new MutationObserver(function(mutations) {
      console.log("MutationObserver refresh");
      _this.refresh();
      //mutations.forEach(function(mutation) {
      //});
    });

    observer.observe(this.$refs.tttt, {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
    });
  }
};
</script>

<style>
._scroll_body {
  overflow: hidden;
  position: relative;
}
</style>
