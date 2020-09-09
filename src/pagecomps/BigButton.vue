<template>
  <div class="big-btn">
    <div class="btn-image" @click="iconProps.clickHandler">
      <div class="btn-icon" :style="{backgroundPositionY:-iconProps.num*56+'px'}"></div>
    </div>
    <span>{{iconProps.label}}</span>
  </div>
</template>

<script>

export default {
  props: {
    iconProps: {
      default: () => {
        return {
          num: 0,
          label: "新增商品",
          clickHandler:()=>{}
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    btnClick() {
      alert("点击了大按钮了");
    },
  },
};
</script>

<style lang="css" scoped>
.big-btn {
  display: inline-block;
  width: 75px;
  height: 103px;
  text-align: center;
  line-height: 28px;
  font-size: 11px;
  color: #666;
}
.btn-image {
  position: relative;
  width: 100%;
  height: 75px;
  border-radius: 5px;
  background: #108cee;
}
.btn-image:hover {
  background: #47adfd;
}
.btn-image:active {
  background: #0a65ca;
}
.btn-icon {
  position: absolute;
  top: 9px;
  left: 9px;
  width: 56px;
  height: 56px;
  background: url("../assets/bigbtn.png");
  background-size: 56px;
}
</style>