<template>
  <div
    id="b_wrap"
    v-on:touchstart="mobile && stop()"
    v-on:touchend="mobile && move()"
    v-on:mouseover="mobile || stop()"
    v-on:mouseout="mobile || move()"
  >
    <transition-group
      tag="div"
      enter-active-class="c1 slideInRight"
      leave-active-class="c2 slideOutLeft"
      class="b_wrap_item"
    >
      <div
        class="b_outer_item"
        :style="{background:arr[index]}"
        v-show="index == showIndex"
        :key="item+index"
        v-for="(item,index) in names"
      >
        <div class="b_inner_item" :style="{background:pics[index]}">
          <div class="b_item">{{item}}</div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "b_wrap",
  props: {
    names: {
      type: Object,
      default: ["Michelangelo", "Davinci", "Raffaello"]
    },
    arr: {
      type: Array,
      default: ["#3e72c2", "#50b87b", "#c2523e"]
    },
    pics: {
      type: Array
    },
    mobile: { // 判断移动端
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      showIndex: 0,
      timer: ""
    };
  },
  mounted() {
    this.timer = setInterval(this.play, 2500);
  },
  methods: {
    play() {
      if (this.showIndex == this.names.length - 1) this.showIndex = 0;
      else {
        this.showIndex++;
      }
    },
    stop() {
      clearInterval(this.timer);
    },
    move() {
      this.timer = setInterval(this.play, 2500);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="css" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css);
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#b_wrap,
.b_wrap_item,
.b_outer_item {
  width: 100%;
  height: 100%;
}

.b_outer_item {
  position: absolute;
  /* 这个absolute很关键！ */
  display: flex;
  justify-content: center;
  align-items: center;
}

.b_inner_item {
  width: 18rem;
  height: 24rem;
  /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover !important;
  animation: scale 1s;
}

@keyframes scale {
  100% {
    transform: scale(1, 1);
  }
  0% {
    transform: scale(0, 0);
  }
}

.b_item {
  font-size: 2rem;
  font-weight: 1000;
  color: rgba(255, 255, 255, 0.575);
  filter: invert(20%);
  animation-delay: 0.5s;
  animation: slide 1s;
}

@keyframes slide {
  100% {
    transform: translateX(0);
  }
  0% {
    transform: translateX(200%);
  }
}

/* .image-enter-active {
    transform: translateX(0);
    transition: all 0.5s ease;
}

.image-leave-active {
    transform: translateX(-100%);
    transition: all 0.5s ease;
} */

.c1,
.c2 {
  animation-duration: 1000ms !important;
}
</style>