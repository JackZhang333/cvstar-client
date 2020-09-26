<template>
  <div class="cinput">
    <label for="prop">{{ name }}:</label>
    <input
      @keydown="scanCode"
      ref="search"
      @keydown.enter="searchHandler"
      :type="type"
      :name="prop"
      :placeholder="placeholder"
      :value="value"
      @change="inputHandler"
      :style="{ width: inputWidth }"
      autocomplete="off"
      maxlength="50"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    prop: {
      required: true,
    },
    type: {
      default: "text",
    },
    name: {
      default: "名称",
    },
    value: {
      required: true,
    },
    inputWidth: {
      default: "235px",
    },
  },
  data() {
    return {
      //   placeholder:'请输入'+this.name
      keycode:'',
      lastTime:null,
      nextTime:null,
      lastCode:null,
      nextCode:null
    };
  },
  computed: {
    placeholder() {
      return "请输入" + this.name;
    },
  },
  methods: {
    scanCode(e) {
      this.nextCode = e.keyCode;
      //获取当前时间
      this.nextTime = new Date().getTime();

      if (
        this.nextCode == 13 &&
        this.keycode != "" &&
        this.nextTime - this.lastTime <= 30
      ) {
        //回车字符
        // console.log(keycode);
        this.$refs.search.value = this.keycode;
        this.$emit("update:value", this.keycode);
        this.keycode = "";
        this.lastCode = null;
        this.lastTime = null;
      } else {
        //此处可以增加限制nextCode的种类例如数字
        if (this.lastCode == null && this.lastTime == null) {
          //初始字母
          this.keycode = String.fromCharCode(this.nextCode);
        } else if (
          this.lastCode != null &&
          this.lastTime != null &&
          this.nextTime - this.lastTime <= 30
        ) {
          this.keycode += String.fromCharCode(this.nextCode);
        } else {
          //手动输入
          this.keycode = "";
          this.lastCode = null;
          this.lastTime = null;
        }
        this.lastCode = this.nextCode;
        this.lastTime = this.nextTime;
      }
    },
    searchHandler() {
      let value = this.$refs.search.value;
      //  window.console.log('将要请求云端的数据：',value)
      if (value == "") {
        this.$toast({ msg: "请输入商品条码", duration: 2 });
      } else {
        this.$emit("searchProduct", value);
      }
    },
    inputHandler(e) {
      let value = e.target.value;
      this.$emit("update:value", value);
    },
  },
};
</script>

<style lang="css" scoped>
.cinput {
  display: inline-block;
  height: 42px;
  line-height: 42px;
  margin-bottom: 25px;
}
.cinput label {
  font-size: 18px;
  color: 18px;
  margin-right: 5px;
}
.cinput input {
  height: 42px;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  outline: none;
  font-size: 18px;
  text-indent: 1em;
  caret-color: #108cee;
}
.cinput input:focus {
  border: 1px solid #108cee;
}
.cinput input:hover {
  border: 1px solid #47adfd;
}
</style>