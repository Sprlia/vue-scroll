<template>
  <div class="_scroll_y" v-if="scroll_y_show" @click="scroll_y_click" :style="style_scroll_y">
    <div class="_scroll_y_bar" @click.stop @mousedown="mousedown_y_bar" :style="style_scroll_y_bar"></div>
  </div>
</template>

<script>
export default {
  props: {
    configs: {
      type: Object,
      default() {
        return {
          width: 6,
          color: "#9093994d",
          background: "",
          alwaysShow: false
        };
      }
    },
    event: {
      type: Object,
      default() {
        return {};
      }
    },
    body: Object
  },
  data() {
    return {};
  },
  methods: {
    scroll_y_click(e) {
      var posY = e.offsetY;
      var target = this.body.clientHeight;
      this.body.scrollTop =
        (posY / target) * this.body.scrollHeight - 0.5 * this.body.clientHeight;
      this.$emit("update:body", this.body);
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
        _this.body.scrollTop = scrollTop + scrollHeight * percent;
        _this.$emit("update:body", _this.body);
      };
      document.addEventListener("mousemove", doDrag);

      var stopDrag = function() {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
      };
      document.addEventListener("mouseup", stopDrag, false);
    }
  },
  computed: {
    scroll_y_show() {
      var need_show = false;
      var show = false;

      need_show =
        this.body.clientHeight < this.body.scrollHeight &&
        !this.configs.alwaysHide;
      show = this.configs.alwaysShow || this.event.hover || this.event.mobile;

      if (need_show) return show;
      else return false;
    },
    style_scroll_y() {
      let top = this.body.scrollTop;
      let left =
        this.body.scrollLeft + this.body.clientWidth - this.configs.width;
      return {
        top: top + "px",
        left: left + "px",
        width: "6px",
        height: this.body.clientHeight + "px",
        background: this.configs.background ? this.configs.background : "none",
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
        width: "100%",
        background: this.configs.color,
        "border-radius": "4px",
        cursor: "pointer",
        top: top * 100 + "%",
        position: "absolute"
      };
    }
  }
};
</script>

<style>
</style>
