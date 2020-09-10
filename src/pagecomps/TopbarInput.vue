<template>
  <div class="topbar-input">
    <input
      v-show="isSingle.hasOther"
      type="text"
      class="input-item"
      v-model="otherData"
      :placeholder="'请输入'+isSingle.otherName"
      maxlength="50"
    />

    <input
      type="text"
      class="input-item"
      :placeholder="'请输入'+inputProps.placeholder"
      v-model="data"
      @keypress.enter="actionHandler"
      maxlength="50"
    />

    <div class="search-button" :style="{width:inputProps.btnWidth}" @click="actionHandler">
      <img class="search-icon" :src="inputProps.iconPic" />
      <span>{{inputProps.btnName}}</span>
    </div>
  </div>
</template>

<script>
import add from "../assets/add.png";
export default {
  props: {
    isSingle: {
      default: () => {
        return {
          hasOther: false,
          otherName: "",
        };
      },
    },
    inputProps: {
      default: () => {
        return {
          iconPic: add,
          placeholder: "分类名称",
          btnWidth: "126px",
          btnName: "新增分类",
        };
      },
    },
    action: {
      default: () => {
        return (data) => window.console.log("点击了搜索按钮:" + data);
      },
    },
  },
  data() {
    return {
      // iconPic: add,
      data: "",
      otherData: "",
    };
  },
  methods: {
    actionHandler() {
      //如果有两个输入框，则传入一个对象，包含两个值；如果只有一个输入框，则直接传入该值
      if (this.isSingle.hasOther && this.otherData != "" && this.data != "") {
        this.action({
          value1: this.otherData,
          value2: this.data,
        });
        //把输入框绑定的数据源初始化
        this.data = "";
        this.otherData = "";
      } else if (!this.isSingle.hasOther && this.data != 0) {
        this.action(this.data);
        //把输入框绑定的数据源初始化
        this.data = "";
      } else {
        //填入的信息不完整，提示用户
        this.$toast({ msg: "请输入完整的信息", duration: 2 });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.topbar-input {
  display: inline-block;
  height: 50px;
}
.input-item {
  float: left;
  width: 240px;
  height: 50px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  font-size: 18px;
  text-indent: 1em;
  margin-left: 20px;
  caret-color: #108cee;
}
.input-item:focus {
  border: 1px solid #108cee;
}
.search-button {
  padding: 10px;
  text-align: right;
  float: left;
  margin-left: 10px;
  width: 126px;
  height: 50px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 30px;
  color: #fff;
  background: #108cee;
  overflow: hidden;
}
.search-button:hover {
  background: #47adfd;
}
.search-button:active {
  background: #0a65ca;
}
.search-icon {
  margin-top: 2px;
  float: left;
  width: 24px;
  height: 24px;
}
</style>