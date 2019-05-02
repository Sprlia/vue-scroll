<template>
  <div class="_scroll_body" @wheel="wheel" @touchmove="touchmove" @touchend="touchend" ref="tttt">
    <slot></slot>
    <div class="_scroll_x" @click="scroll_x_click" :style="style_scroll_x">
      <div class="_scroll_x_bar" @mousedown="mousedown_x_bar" :style="style_scroll_x_bar"></div>
    </div>
    <div class="_scroll_y" @click="scroll_y_click" :style="style_scroll_y">
      <div class="_scroll_y_bar" @mousedown="mousedown_y_bar" :style="style_scroll_y_bar"></div>
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
      },
      scroll_height: 6,
      event: {
        touch: null
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
    },
    mousedown_x_bar(e) {
      var target = this.body.clientWidth;
      var scrollLeft = this.body.scrollLeft;
      var scrollWidth = this.body.scrollWidth;
      var origX = e.clientX;
      const _this = this;

      var doDrag = function(event) {
        event.preventDefault();
        var moveX = event.clientX - origX;
        var percent = moveX / target;
        _this.$refs.tttt.scrollLeft = scrollLeft + scrollWidth * percent;
        _this.init();
      };
      document.addEventListener("mousemove", doDrag);

      var stopDrag = function() {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
      };
      document.addEventListener("mouseup", stopDrag, false);
    },
    mousedown_y_bar(e) {
      var target = this.body.clientHeight;
      var scrollTop = this.body.scrollTop;
      var scrollHeight = this.body.scrollHeight;
      var origY = e.clientY;
      const _this = this;

      var doDrag = function(event) {
        event.preventDefault();
        var moveY = event.clientY - origY;
        var percent = moveY / target;
        _this.$refs.tttt.scrollTop = scrollTop + scrollHeight * percent;
        _this.init();
      };
      document.addEventListener("mousemove", doDrag);

      var stopDrag = function() {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
      };
      document.addEventListener("mouseup", stopDrag, false);
    },
    wheel(e) {
      this.$refs.tttt.scrollTop = this.$refs.tttt.scrollTop + e.deltaY;
      this.$refs.tttt.scrollLeft = this.$refs.tttt.scrollLeft + e.deltaX;

      this.init();
    },
    touchmove(e) {
      console.log(e);
      if (this.event.touch) {
        let toucher = e.changedTouches[0];
        this.$refs.tttt.scrollTop =
          this.$refs.tttt.scrollTop -
          (toucher.clientY - this.event.touch.changedTouches[0].clientY);
        this.$refs.tttt.scrollLeft =
          this.$refs.tttt.scrollLeft -
          (toucher.clientX - this.event.touch.changedTouches[0].clientX);
        this.event.touch = e;

        this.init();
      } else {
        this.event.touch = e;
      }
    },
    touchend(e) {
      console.log("touch end");
      this.event.touch = null;
    },
    scroll_x_click(e) {
      var posY = e.offsetX;
      var target = this.body.clientWidth;
      this.$refs.tttt.scrollLeft =
        (posY / target) * this.body.scrollWidth - 0.5 * this.body.clientWidth;
      this.init();
    },
    scroll_y_click(e) {
      var posY = e.offsetY;
      var target = this.body.clientHeight;
      this.$refs.tttt.scrollTop =
        (posY / target) * this.body.scrollHeight - 0.5 * this.body.clientHeight;
      this.init();
    }
  },
  computed: {
    style_scroll_x() {
      let top =
        this.body.scrollTop + this.body.clientHeight - this.scroll_height;
      let left = this.body.scrollLeft;
      return {
        left: left + "px",
        top: top + "px",
        height: "6px",
        width: this.body.clientWidth + "px",
        position: "absolute"
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
        background: "#9093994d",
        "border-radius": "4px",
        cursor: "pointer",
        left: left * 100 + "%",
        position: "absolute"
      };
    },
    style_scroll_y() {
      let top = this.body.scrollTop;
      let left =
        this.body.scrollLeft + this.body.clientWidth - this.scroll_height;
      return {
        top: top + "px",
        left: left + "px",
        width: "6px",
        height: this.body.clientHeight + "px",
        position: "absolute"
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
        background: "#9093994d",
        "border-radius": "4px",
        cursor: "pointer",
        top: top * 100 + "%",
        position: "absolute"
      };
    }
  },
  mounted() {
    const _this = this;
    _this.init();

    var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    var observer = new MutationObserver(function(mutations) {
      _this.init();
      //mutations.forEach(function(mutation) {
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
._scroll_body {
  overflow: hidden;
  position: relative;
}

._scroll_body:hover ._scroll_x_bar {
  display: block;
}
._scroll_x_bar {
  height: 100%;
  display: none;
}

._scroll_body:hover ._scroll_y_bar {
  display: block;
}
._scroll_y_bar {
  display: none;
  width: 100%;
}
</style>
