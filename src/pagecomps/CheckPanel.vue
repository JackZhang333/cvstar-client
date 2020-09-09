<template>
  <div class="check-panel">
    <div class="panel-coins">
      <coin cashNum="100" />
      <coin cashNum="50" />
      <coin cashNum="20" />
      <coin cashNum="10" />
    </div>
    <div class="panel-count">
      <div class="panel-check">
        <label for="check">收款：</label>
        <input
          type="number"
          name="check"
          :value="checkManey"
          autocomplete="off"
          :placeholder="price"
          @input="checkByHand"
        />
      </div>
      <div class="panel-check" style="marginTop:20px">
        <label for="back">找零：</label>
        <input
          type="number"
          name="back"
          disabled
          placeholder="0.00"
          autocomplete="off"
          :value="backManey|fixed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Coin from "./Coin";

export default {
  components: { Coin },

  computed: {
    ...mapState('acount',["price"]),
    backManey() {
      let backManey = this.checkManey - this.price;
      //判断需要的找零的金额是否大于0
      if (backManey < 0) {
        backManey = 0;
      }
      return backManey;
    },
  },
  methods: {
    addCoin(num) {
      //如果当前的收银金额为 0 ，则提示用户加购商品
      if (this.price == 0) {
        this.$toast({ msg: "请先加购商品", duration: 2 });
      } else {
        this.coins += num;
        this.checkManey = this.coins;
      }
    },
    checkByHand(e) {
      if (this.price == 0) {
        this.$toast({ msg: "请先加购商品", duration: 2 });
      } else {
        //把收银的金额设置为当前的输入值
        this.checkManey = e.target.value;
        //把已累计的硬币金额重置为0
        this.coins = 0;
      }
    },
    resetPanel(){
        //提供一个方法给父级调用，以恢复收银面板的初始状态
        this.coins = 0;
        this.checkManey = ''
    },
  },
  data() {
    return {
      coins: 0,
      checkManey: "",
    };
  },
};
</script>

<style lang="css" scoped>
.check-panel {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
}
.panel-coins {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;

  justify-content: space-around;
  margin-top: 45px;
  height: 308px;
  width: 100%;
}
.panel-count {
  height: 188px;
  width: 100%;

  margin-top: 20px;
}
.panel-check {
  height: 84px;
}
.panel-check > label {
  margin-left: 30px;
  font-size: 24px;
  color: #333;
}
.panel-check > input {
  border: 0;
  appearance: none;
  width: 232px;
  height: 84px;
  font-size: 60px;
  outline: none;
  background-color: #f5f5f5;
  border-bottom: 1px solid #666;
  caret-color: #108cee;
}
.panel-check > input:focus {
  border-bottom: 1px solid #108cee;
}
</style>