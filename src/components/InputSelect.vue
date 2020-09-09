<template>
  <div class="input-select">
    <div class="input-name">
      <span>{{name}}:</span>
    </div>
    <div class="input-select-container" @click="spreadHandler" :style="{width:inputWidth}">
      <div
        class="input-select-label"
        :class="{selectedColor:selected}"
      >{{selected ? selected:'请选择'+name}}</div>
      <div :class="{icon:true,selectspreaded:spreaded}"></div>
    </div>
    <div class="input-select-menu" v-show="spreaded" :style="{right:menuPositionX,top:menuPositionY}">
      <div
        class="item"
        v-for="(item,index) in menus"
        :key="index"
        @click="selectHandler"
        :data-index="index"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      required: true,
    },
    selected: {
      required: true,
    },
    inputWidth: {
      default: "235px",
    },
    menuPositionX: {
      default: "-15px",
    },
    menuPositionY: {
      default: "60px",
    },
    name: {
      default: "分类",
    },
  },
  data() {
    return {
      spreaded: false,
    };
  },
  methods: {
    spreadHandler() {
      this.spreaded = !this.spreaded;
    },
    selectHandler(e) {
      let index = e.target.dataset.index;
      // console.log('点击的菜单序号是：'+index)
      let selected = this.menus[index];
      this.$emit("update:selected", selected);
      this.spreaded = false;
    },
  },
};
</script>

<style lang="css" scoped>
.input-select {

  display: inline-block;
  position: relative;
  margin-bottom: 25px;
}
.input-name {
  float: left;
  font-size: 18px;
  color: #333;
  line-height: 42px;
  margin-right: 5px;
}
.input-select-container {
  float: left;
  height: 42px;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  color: #999;
  line-height: 42px;
  user-select: none;
  cursor: pointer;
  background:#fff
}
.input-select-container:hover {
  border: 1px solid #47adfd;
}
.input-select-container:active {
  border: 1px solid #0a65ca;
}
.input-select-label {
  float: left;
  margin-left: 16px;
  font-size: 18px;
  width: calc(100% - 52px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.selectedColor {
  color: #333;
}
.icon {
  float: right;
  width: 16px;
  height: 16px;
  margin-top: 13px;
  margin-right: 13px;
  background: url("../assets/select-down.png") no-repeat;
  background-size: 16px;
}
.selectspreaded {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
.input-select-menu {
  position: absolute;


  width: 250px;
  height: 240px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.64);
  overflow: auto;
  z-index: 99;
}
.input-select-menu .item {
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.input-select-menu .item:hover {
  background: rgba(16, 140, 238, 0.21);
}
</style>