<template>
  <div class="check-page">
    <quick-add ref="quickAdd"></quick-add>
    <div class="check-page-left">
      <div class="left-top">
        <div class="search-background">
          <product-search 
        @searchProduct = 'searchHandler'
        class="search-modle"/>
        </div>
        <div class="search-divider"></div>
        <check-products ref="checkProducts" />
      </div>
      <div class="left-bottom">
        <big-button :iconProps="icons[0]" class="check-bigbtn" />
        <big-button :iconProps="icons[1]" class="check-bigbtn" />
        <div class="check-summary">
          <span>共 {{num}} 件商品，应付款：</span>
          <span>¥</span>
          <span>{{price}}</span>
        </div>
      </div>
    </div>
    <div class="check-page-right">
      <div class="right-top">
        <check-panel ref="checkPanel" />
      </div>
      <div class="right-bottom" @click="checkHandler">
        <span>收银完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import QuickAdd from "../fulldialogs/QuickAdd";
import BigButton from "../pagecomps/BigButton";
import CheckPanel from "../pagecomps/CheckPanel";
import CheckProducts from "../pagecomps/CheckProducts";
import ProductSearch from "../pagecomps/ProductSearch";
import { mapState,mapGetters } from "vuex";
export default {
  provide() {
    return {
      noDataHandler: this.quickAdd,
    };
  },
  data() {
    return {
      icons: [
        {
          label: "快捷加购",
          num: 2,
          clickHandler: this.quickAdd,
        },
        {
          label: "全部清空",
          num: 1,
          clickHandler: this.cleanProducts,
        },
      ],
    };
  },
  computed: {
    ...mapState('acount',["num", "price"]),
  },
  components: {
    QuickAdd,
    BigButton,
    CheckPanel,
    CheckProducts,
    ProductSearch,
  },
  methods: {
    ...mapGetters('products',['searchProduct']),
    searchHandler(value){
      //在用户商品库中找到该商品并添加到商品列表中
      //searchProduct返回的是一个方法，需要调用才能得到结果,并把要搜索的值放入返回的函数
      const product = this.searchProduct()(value)
      // window.console.log(product)
      if(product){
        this.addProduct(product)
      }else{
        this.$toast({msg:`未找到${value}`,duration:2})
      }
      window.console.log('要搜索的值：'+value)
    },
    quickAdd() {
      this.$refs.quickAdd.open();
    },
    checkHandler() {
      let backManey = this.$refs.checkPanel.checkManey - this.price;
      //如果当前收银金额为 0 ，则提示用户加购商品
      if (this.price == 0) {
        this.$toast({ msg: "请先加购商品", duration: 2 });
      } else if (backManey >= 0 || Math.abs(backManey) == this.price) {
        //通知子组件结账，新建一条交易流水,注意先提交流水，再清空商品列表
        this.$refs.checkProducts.checkOut();
        //如果找零金额大于零，或者没输入过收款额，则收银成功
        this.$refs.checkProducts.clearProducts();
        
        this.$refs.checkPanel.resetPanel();
        this.$feedback("收银成功");
      } else {
        // window.console.log('需要找零的钱：'+backManey)
        this.$toast({ msg: "收款金额不够哦！", duration: 2 });
      }
    },
    //清除所有商品的二次确认对话框
    cleanProducts() {
      let clearDialogs = {
        cancelName: "取消",
        confirmName: "全部清空",
        contentMsg: "确定清空所有商品？",
        confirmHandler: ()=>{
        this.$refs.checkProducts.clearProducts()
        this.$refs.checkPanel.resetPanel();
        },
      };
      if(this.price!=0){
        this.$dialog(clearDialogs);
      }
      
    },
    //快捷加购时，往产品列表中添加数据
    addProduct(item){
      this.$refs.checkProducts.addProduct(item)
    }
  },
};
</script>

<style lang="css" scoped>
.check-page {
  display: flex;
}
.search-modle {
    float: left;
    margin: 25px 0 0 20px;
  }
.check-page-left {
  display: flex;
  flex-direction: column;
  min-width: 550px;
  height: 100%;
  flex: 1;
  background: #fff;
}
.check-page-right {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 360px;
  background: green;
}
.left-top,
.right-top {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.left-top {
  min-width: 680px;
}
.search-background {
  height: 100px;
  background: #fff;
}
.search-divider {
height: 10px;
  background: #f1f1f1;
}
.left-bottom,
.right-bottom {
  height: 120px;
  width: 100%;
  cursor: pointer;
}
.right-bottom {
  background: #108cee;
  color: #fff;
  line-height: 120px;
  text-align: center;
  font-size: 36px;
}
.right-bottom:hover {
  background: #47adfd;
}
.right-bottom:active {
  background: #0a65ca;
}
.left-bottom {
  background: #f5f5f5;
}
.check-bigbtn {
  float: left;
  margin: 15px 0 0 20px;
}
.check-summary {
  float: right;
  height: 50px;
  margin: 40px 20px 0 0;
}
.check-summary > span:nth-child(3) {
  color: #ff770e;
  font-size: 36px;
  line-height: 50px;
}
.check-summary > span:nth-child(2) {
  color: #ff770e;
  font-size: 14px;
  margin-right: 10px;
}
.check-summary > span:nth-child(1) {
  color: #333;
  font-size: 16px;
}
</style>