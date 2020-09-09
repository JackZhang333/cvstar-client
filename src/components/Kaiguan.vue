<template>
  <div class="swith" :class="status ? 'swith-open':'swith-close'" @click="switchStatus">
    <div class="circle" :style="{left:status ? '49px':'5px'}"></div>
    <div class="text" :style="{marginLeft:status ? '12px':'47px'}">{{status ? "开":"关"}}</div>
  </div>
</template>

<script>
export default {
  props: ["status"],
  data() {
    return {};
  },
  methods: {
    switchStatus() {
      this.$emit("update:status", !this.status);
    },
  },
};
</script>

<style lang="css" scoped>
.swith {
  position: relative;
  display: inline-block;
  height: 36px;
  width: 80px;
  border-radius: 18px;
  line-height: 36px;
  cursor: pointer;
  text-align: left;
}
.swith-open {
  background: #108cee;
}
.swith-open:hover {
  background:#47adfd;
}
.swith-open:active {
  background:#0a65ca;
}
.swith-close {
  background: #999;
}
.swith-close:hover {
  background:#aaa;
}
.swith-close:active {
  background:#666;
}
.circle {
  position: absolute;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  background: #fff;
  top: 5px;
  transition: left .2s ease-in-out;
}
.text {
  user-select: none;
  font-size: 18px;
  color: #fff;
}
</style>