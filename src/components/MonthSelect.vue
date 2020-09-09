<template>
  <div class="month-select">
    <div class="month-select-container" @click="spreadHandler">
      <div class="month-select-label">{{year}}-{{selectedMonth}}</div>
      <div :class="{monthicon:true,monthspreaded:spreaded}"></div>
    </div>
    <div class="month-select-menu" v-show="spreaded" :style="{right:menuPosition}">
      <div
        class="item"
        v-for="(item,index) in monthes"
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
    selectedMonth: {
      default: "01",
    },
    menuPosition: {
      default: "0",
    },
  },
  data() {
    return {
      spreaded: false,
      monthes: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
    };
  },
  methods: {
    spreadHandler() {
      this.spreaded = !this.spreaded;
    },
    selectHandler(e) {
      let index = e.target.dataset.index;
      // console.log('点击的菜单序号是：'+index)
      let selectedMonth = this.monthes[index];
      this.$emit("update:selectedMonth", selectedMonth);
      this.spreaded = false;
    },
  },
  computed: {
    year() {
      let now = new Date().getFullYear();

      return now;
    },
  },
};
</script>

<style lang="css" scoped>
.month-select {
  display: inline-block;
  position: relative;
}
.month-select-container {
  float: right;
  width: 136px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #108cee;
  color: #108cee;
  line-height: 50px;
  user-select: none;
  cursor: pointer;
}
.month-select-container:hover {
  border: 1px solid #47adfd;
  color: #47adfd;
}
.month-select-container:active {
  border: 1px solid #0a65ca;
  color: #0a65ca;
}
.month-select-label {
  float: left;
  margin-left: 16px;
  font-size: 18px;
}
.monthicon {
  float: right;
  width: 16px;
  height: 16px;
  margin-top: 16px;
  margin-right: 16px;
  background: url("../assets/drawpdown.png") no-repeat;
  background-size: 16px;
}
.monthspreaded {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
.month-select-menu {
  position: absolute;
  top: 60px;
  width: 290px;
  padding: 0 20px;
  height: 240px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.64);
  overflow: auto;
  z-index: 99;
  display: flex;
  flex-wrap: wrap;
}
.month-select-menu .item {
  width: 110px;
  border-bottom: 1px solid #fff;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.month-select-menu .item:nth-child(2n) {
  margin-left: 10px;
}
.month-select-menu .item:hover {
  background: rgba(16, 140, 238, 0.21);
}
</style>