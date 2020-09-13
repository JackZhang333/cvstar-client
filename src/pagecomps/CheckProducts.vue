<template>
  <div class="check-products">
    <div
      class="product-list-wrapper"
      v-for="(product,index) in products"
      :key="index"
      v-show="products.length != 0"
    >
      <img :src="product.pic" class="product-img" />
      <div class="product-infos">
        <div class="product-name">
          <span>{{product.name}}</span>
        </div>
        <div class="product-spec">
          <span>{{product.spec}}</span>
        </div>
        <div class="product-barcode">
          <span>{{product.barCode}}</span>
        </div>
      </div>

      <div class="product-price">
        <span>¥</span>
        <span>{{product.price*product.count|fixed}}</span>
      </div>
      <step class="product-step" :num.sync="product.count" :dataIndex="index" />
    </div>

    <no-data :noDataProps="noDataProps" :dataSource='products' class="check-no-data" />
  </div>
</template>

<script>
import Step from "../components/Step";
import NoData from "./NoData";
import { mapActions,mapMutations,mapState } from 'vuex'

//测试列表为空记录
// data.length = 0

// let productNums = new Array(products.length).fill(1)
export default {
  props: ["total"],
  components: {
    Step,
    NoData,
  },
  data() {
    //从数据库获取产品列表数据后，需要为每一个产品追加数量字段，数量的默认值为 1
    
    return {
      products: [],
      noDataProps: {
        dataSource: [],
        msg: "请扫描商品条码，或",
        action: "快捷加购商品",
      },
      // productNums:productNums,
      
    };
  },
  created() {
    //监听加减器在数值为 1 的时候，再减则删除这条数据
    this.$on("deleteData", function (index) {
      //   window.console.log('加减器告诉我要删除这条数据：'+index)
      this.products.splice(index, 1);
    });
    this.calcSummary()
  },
  computed:{
    ...mapState('acount',['userId'])
  },
  methods: {
    ...mapActions('checkOrders',['addCheck']),
    ...mapMutations('acount',['calcCheckSummary']),
    //结账新建一条流水记录
    checkOut(){
      let orderCode = new Date().getTime()
      let orderTime = new Date().format("yyyy-MM-dd hh:mm")

      let products  = this.products.map(v=>{
      let totalPrice = v.price * v.count
      return {totalPrice,...v}
      })
      let userId = this.userId
      // window.console.log('新增流水的商品：'+products)
      this.addCheck({userId,orderCode,orderTime,products})
      //后期补充减商品库存的逻辑
    },
    calcSummary() {
      //计算当前产品列表的数量，和总金额并传给父级组件
      let totalPrice = 0;
      let totalNumber = 0;
      this.products.forEach((value) => {
        totalNumber += value.count;
        totalPrice += value.count * value.price;
      });
      let total = {
        num: totalNumber,
        price: totalPrice.toFixed(2),
      };
      this.calcCheckSummary(total)
      // console.log('当前需要支付的钱：',this.$store.state.price)
    },
    //提供一个方法给父级，用于清空产品列表
    clearProducts(){
      //把当前的产品列表清空
      this.products.splice(0,this.products.length)
       //重新计算产品数量和金额
      this.calcSummary()
    },
    //提供一个方法给父级，用于新增产品
    addProduct(product){
      //如果这个商品已经在购物车中，则直接增加数量；如果不在购物车中则添加
      let hasOne = this.products.findIndex(value=>value.barCode==product.barCode)
      window.console.log('要添加的商品序号'+hasOne)
      if(hasOne!=-1){
        this.products[hasOne].count++
      }else{
         //注意需要新增一个number属性，且重新计算数量和金额
      this.products.push({...product,count:1})
      }
     
      this.calcSummary()
    },
  },
  
};
</script>

<style lang="css" scoped>
.check-products {
  width: 100%;
}
.product-list-wrapper {
  width: 100%;
  height: 136px;
  border-bottom: 1px solid #e5e5e5;
}
.product-img {
  float: left;
  width: 100px;
  height: 100px;
  margin: 20px 20px 16px 14px;
}
.product-infos {
  float: left;
  width: 226px;
  margin-top: 20px;
}
.product-name {
  font-size: 20px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
.product-spec {
  font-size: 16px;
  color: #999;
  margin-bottom: 17px;
}
.product-barcode {
  font-size: 16px;
  color: #999;
}
.product-step {
  float: right;
  margin: 50px 50px 0 0;
}
.product-price {
  float: right;
  margin: 43px 20px 0 0;
  color: #ff770e;
  width: 120px;
}
.product-price > span:nth-child(1) {
  font-size: 14px;
  margin-right: 10px;
}
.product-price > span:nth-child(2) {
  font-size: 36px;
}
.check-no-data {
  margin-top: 20px;
}
.test-div {
  display: none;
}
</style>