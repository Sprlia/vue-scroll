<template>
  <div class="_scroll_x" v-if="scroll_x_show" @click="scroll_x_click" :style="style_scroll_x">
    <div class="_scroll_x_bar" @click.stop @mousedown="mousedown_x_bar" :style="style_scroll_x_bar"></div>
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
    scroll_x_click(e) {
      var posY = e.offsetX;
      var target = this.body.clientWidth;
      this.body.scrollLeft =
        (posY / target) * this.body.scrollWidth - 0.5 * this.body.clientWidth;
      this.$emit("update:body", this.body);
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
        _this.body.scrollLeft = scrollLeft + scrollWidth * percent;
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
    scroll_x_show() {
      var need_show = false;
      var show = false;

      need_show =
        this.body.clientWidth < this.body.scrollWidth &&
        !this.configs.alwaysHide;
      show = this.configs.alwaysShow || this.event.hover || this.event.mobile;

      if (need_show) return show;
      else return false;
    },
    style_scroll_x() {
      let top =
        this.body.scrollTop + this.body.clientHeight - this.configs.width;
      let left = this.body.scrollLeft;
      return {
        left: left + "px",
        top: top + "px",
        height: this.configs.width + "px",
        width: this.body.clientWidth + "px",
        background: this.configs.background ? this.configs.background : "none",
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
        height: "100%",
        background: this.configs.color,
        "border-radius": "4px",
        cursor: "pointer",
        left: left * 100 + "%",
        position: "absolute"
      };
    }
  }
};
</script>

<style>
</style>
