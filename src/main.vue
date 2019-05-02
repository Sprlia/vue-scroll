<template>
  <div @wheel="test" id="testss" class="_scroll_body" ref="tttt">
    <slot></slot>
    <div class="_scroll_x" :style="style_scroll_x">
      <div class="_scroll_x_bar" :style="style_scroll_x_bar"></div>
    </div>
    <div class="_scroll_y" :style="style_scroll_y">
      <div class="_scroll_y_bar" :style="style_scroll_y_bar"></div>
    </div>
  </div>
</template>

<script>
import { setInterval } from "timers";
var bValue = 0;
export default {
  data() {
    return {};
  },
  methods: {
    test(e) {
      /*
      console.log(this.$slots.default[0].elm);
      var _this = this.$slots.default[0].elm
      var h = _this.clientHeight;
      var h1 = _this.scrollHeight;
      var w = _this.clientWidth;
      var w1 = _this.scrollWidth;
      console.log(h, h1, w, w1, _this.scrollTop)

              configurable: true,
        writable: true,
      */
      //console.log(
      //Object.getOwnPropertySymbols(document.getElementById("testss"))
      //);
      /*
          Object.defineProperty(this.$refs.tttt, "scrollTop", {
        enumerable: true,

        get: function() {
          return bValue;
        },
        set(newVal) {
          console.log(newVal);
          bValue = newVal;
          return bValue;
        }
      });*/
      //console.log(this.$refs.tttt.scrollTop)
      //this.$refs.tttt.scrollTop = this.$refs.tttt.scrollTop + 1000
      //console.log(this.$scopedSlots.default())
      //console.log(e);
    }
  },
  computed: {
    style_scroll_x() {
      return {
        height: "10px",
        right: "10px"
      };
    },
    style_scroll_x_bar() {
      let w = 0;
      let w1 = 1;
      if (this.$refs.tttt) {
        w = this.$refs.tttt.clientHeight;
        w1 = this.$refs.tttt.scrollHeight;
      }
      return {
        width: w / w1 + "%",
        background: "#000"
      };
    },
    style_scroll_y() {
      return {
        width: "10px",
        bottom: "10px"
      };
    },
    style_scroll_y_bar() {
      return {
        background: "#000",
        height: "100%"
      };
    }
  },
  mounted() {
    const _this = this;

    console.log(1);
    var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation);
      });
    });

    observer.observe(this.$refs.tttt, {
      //监听增加删除节点
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
    });

    //setInterval(() => {
    //  _this.$refs.tttt.appendChild(document.createElement("p"));
    //}, 1000 * 2);
  }
};

/**
  overflow: hidden;
 */
</script>

<style>
._scroll_body {
  overflow: auto;
  position: relative;
}

._scroll_x {
  position: absolute;
  bottom: 0;
  left: 0;
}
._scroll_x:hover ._scroll_x_bar {
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
._scroll_y:hover ._scroll_y_bar {
  display: block;
}
._scroll_y_bar {
  display: none;
  width: 100%;
}
</style>
