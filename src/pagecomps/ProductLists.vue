<template>
  <div class="product-lists">
    <div
      v-show="products.lenght != 0"
      class="product-list-wrapper"
      v-for="(product,index) in filtedProducts"
      :key="index"
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
      <div class="product-stock">
        <span class="stock-categary">{{product.categary}}</span>
        <span>进价：¥{{product.pPrice}}</span>
        <span>售价：¥{{product.price}}</span>
        <span>库存：{{product.stock}}</span>
      </div>
      <inline-button
        action="删除"
        class="product-button"
        :clickHandler="()=>removePro(product.id)"
      />
      <inline-button
        action="编辑"
        class="product-button"
        :clickHandler="()=>editPro(product.id)"
      />
    </div>
    <h4 v-show="filtedProducts.length == 0 && products.length != 0">暂无相关数据，请重新设置查询条件</h4>
    <no-data :noDataProps="noDataProps" :dataSource = 'products'/>
  </div>
</template>

<script>
import InlineButton from "../components/InlineButton";
import NoData from "./NoData";
import { mapState, mapActions } from 'vuex'
// products.length = 0

export default {
  props: ["noDataHandler", "editProHandler", "selectedMenu", "searchedValue"],
  components: {
    InlineButton,
    NoData,
  },
  data() {
    return {
      noDataProps: {
        dataSource: this.products,
        msg: "你的店铺暂无商品，点击",
        action: "新增商品",
      },
    };
  },
  created(){
    //可能直接传的时候因为顺序的原因，拿不到参数。需要在生成的时候手动指定
    this.noDataProps.dataSource = this.products
  },
  computed: {
    //展示用户搜索或查询后的结果列表
    filtedProducts() {
      let filtedLists 
      if(Array.isArray(this.products)){
        //根据商品信息页面当前选中的分类，展示相关的产品列表。
      filtedLists = this.products.filter((v) => {
        if (this.selectedMenu == "全部分类") {
          return true;
        } else {
          return v.categary == this.selectedMenu;
        }
      });
      }else{
        filtedLists = []
      }
      
      //根据搜索框中字符再一次过滤出商品
      if (this.searchedValue != "") {
        filtedLists = filtedLists.filter((v) => {
          return (
            v.name.includes(this.searchedValue) ||
            v.barCode.includes(this.searchedValue)
          );
        });
      }
      //重新选择菜单时，派发一个事件，告诉父级更新商品的总数量
      this.$emit("calcProducts", filtedLists.length);
      // window.console.log('筛选的数据发送了变化')
      return filtedLists;
    },
    ...mapState('products',['products']),
  },
  methods: {
    ...mapActions('products',['removeProduct']),
    removePro(id) {
      // window.console.log("删除一个商品:"+code);
      this.$dialog({
        cancelName: "取消",
        confirmName: "删除",
        contentMsg: "确定要从商品库中删除该商品？",
        confirmHandler: ()=>{
          // let index = this.products.findIndex(v=>v.barCode == code)
          // this.products.splice(index,1)
          this.removeProduct(id)
        },
      });
    },
    editPro(id) {
      window.console.log("编辑该商品信息");
      this.editProHandler(id);
    },
  },
};
</script>

<style lang="css" scoped>
.product-lists {
  width: 100%;
}
.product-lists > h4 {
  color: #999;
  font-size: 36px;
  text-align: center;
  margin: 200px 0;
}
.product-list-wrapper {
  width: 100%;
  min-width: 1130px;
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
.product-stock {
  float: left;
  width: 600px;
  height: 100%;
  font-size: 20px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stock-categary {
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.product-button {
  float: right;
  margin: 52px 20px 0 0;
}
</style>