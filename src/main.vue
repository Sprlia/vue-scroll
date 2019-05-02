<template>
  <div class="_vue_scroll">
    <div @wheel="wheel" id="testss" class="_scroll_body" ref="tttt">
      <slot></slot>
    </div>
    <div class="_scroll_x" @click="scroll_x_click" :style="style_scroll_x">
      <div class="_scroll_x_bar" :style="style_scroll_x_bar"></div>
    </div>
    <div class="_scroll_y" @click="scroll_y_click" :style="style_scroll_y">
      <div class="_scroll_y_bar" :style="style_scroll_y_bar"></div>
    </div>
  </div>
</template>

<script>
var bValue = 0;
export default {
  props: {},
  data() {
    return {
      body: {
        clientHeight: 0,
        scrollHeight: 0,
        scrollTop: 0,

        clientWidth: 0,
        scrollWidth: 0,
        scrollLeft: 0
      }
    };
  },
  methods: {
    init() {
      this.body.clientHeight = this.$refs.tttt.clientHeight;
      this.body.scrollHeight = this.$refs.tttt.scrollHeight;
      this.body.scrollTop = this.$refs.tttt.scrollTop;

      this.body.clientWidth = this.$refs.tttt.clientWidth;
      this.body.scrollWidth = this.$refs.tttt.scrollWidth;
      this.body.scrollLeft = this.$refs.tttt.scrollLeft;

      console.log(this.body);
    },
    wheel(e) {
      console.log(e);
      this.$refs.tttt.scrollTop = this.$refs.tttt.scrollTop + e.deltaY;
      this.$refs.tttt.scrollLeft = this.$refs.tttt.scrollLeft + e.deltaX;

      this.init();
    },
    scroll_x_click(e) {
      console.log(e);
      var posY = e.offsetX;
      var target = this.body.clientWidth;
      this.$refs.tttt.scrollLeft =
        (posY / target) * this.body.scrollWidth - 0.5 * this.body.clientWidth;
      this.init();
    },
    scroll_y_click(e) {
      console.log(e);
      var posY = e.offsetY;
      var target = this.body.clientHeight;
      this.$refs.tttt.scrollTop =
        (posY / target) * this.body.scrollHeight - 0.5 * this.body.clientHeight;
      this.init();
    }
  },
  computed: {
    style_scroll_x() {
      return {
        height: "10px",
        right: "0px"
      };
    },
    style_scroll_x_bar() {
      let w = 0;
      let w1 = 1;
      if (this.body.scrollWidth) {
        w = this.body.clientWidth;
        w1 = this.body.scrollWidth;
      }

      let left = 0;
      if (w1) left = this.body.scrollLeft / w1;
      return {
        width: (w / w1) * 100 + "%",
        background: "#000",
        left: left * 100 + "%",
        position: "absolute"
      };
    },
    style_scroll_y() {
      return {
        width: "10px",
        bottom: "0px"
      };
    },
    style_scroll_y_bar() {
      let h = 0;
      let h1 = 1;
      if (this.body.scrollHeight) {
        h = this.body.clientHeight;
        h1 = this.body.scrollHeight;
      }

      let top = 0;
      if (h1) top = this.body.scrollTop / h1;
      return {
        height: (h / h1) * 100 + "%",
        background: "#000",
        top: top * 100 + "%",
        position: "absolute"
      };
    }
  },
  mounted() {
    const _this = this;
    _this.init();

    console.log(1);
    var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    var observer = new MutationObserver(function(mutations) {
      _this.init();
      //mutations.forEach(function(mutation) {
      //  console.log(mutation);
      //});
    });

    observer.observe(this.$refs.tttt, {
      //监听增加删除节点
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
    });
  }
};

/**
  overflow: auto;
  overflow: hidden;
 */
</script>

<style>
._vue_scroll {
  overflow: hidden;
  position: relative;
}
._scroll_body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

._scroll_x {
  position: absolute;
  bottom: 0;
  left: 0;
}
._vue_scroll:hover ._scroll_x_bar {
  display: block;
}
._scroll_x_bar {
  height: 100%;
  display: none;
}

._scroll_y {
  position: absolute;
  top: 0;
  right: 0;
}
._vue_scroll:hover ._scroll_y_bar {
  display: block;
}
._scroll_y_bar {
  display: none;
  width: 100%;
}
</style>
