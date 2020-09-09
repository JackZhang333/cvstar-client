<template>
  <div class="purchase-detail">
    <full-dialog
      :hasFooter="hasFooter"
      title="进货单详情"
      ref="fullDialog"
      :sigleButton="singleButton"
      dialogWidth="840"
    >
      <div slot="content" class="content-wrapper">
        <div class="content-top">
          <div class="purchase-code">
            进货单编号：{{purchase.orderCode}}
          </div>
          <div class="purchase-company">
            供应商名称：{{purchase.companyName}}
          </div>
          <div class="purchase-time">
            进货时间：{{purchase.orderTime}}
          </div>
        </div>
        <div class="content-divider"></div>
        <div class="content-list">
          <div class="product-list">
            <div class="product-item" v-for="(item,index) in purchase.products" :key="index">
              <img :src="item.pic" class="product-img" />
              <div class="product-infos">
                <div class="product-name">
                  <span>{{item.name}}</span>
                </div>
                <div class="product-spec">
                  <span>{{item.spec}}</span>
                </div>
                <div class="product-barcode">
                  <span>{{item.barCode}}</span>
                </div>
              </div>
              <p class="purchase-info">数量：{{item.count}}</p>
              <p class="purchase-info">单价：¥ {{item.price}}</p>
              <p class="purchase-info">总进价：¥{{item.totalPrice}}</p>
            </div>
          </div>
        </div>
        <div class="content-divider"></div>
      </div>
      <div slot="footer" class="footer-left">
        <span class="left-content footer-summary">商品数量：{{summary.count}}</span>
        <span class="left-content footer-summary">进货单总金额：¥{{summary.total}}</span>
      </div>
    </full-dialog>
  </div>
</template>

<script>
import FullDialog from "../pages/FullDialog";

export default {
  components: {
    FullDialog,
  },
  data() {
    return {
      purchase: {
        products:[],
      },

      hasFooter: true,
      singleButton: true,
    };
  },
  methods: {
    open(purchase) {
      //根据父级传过来的对象，展示其数据
      this.purchase = purchase
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
  },
  computed:{
    summary(){
      let count = this.purchase.products.reduce((pre,v)=>{
        return pre + Number(v.count)
      },0)
      let total = this.purchase.totalMoney
      return {count,total}
    }
  }
};
</script>

<style lang="css" scoped>
.content-wrapper {
  height: calc(100vh - 140px);
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content-top {
  width: 100%;
  height: 100px;
  padding: 20px;
  background: #fff;
  font-size: 18px;
  color: #333;
}
.purchase-code,
.purchase-company,
.purchase-time {
 
  display: inline-block;
  height: 25px;
  line-height: 25px;
}
.purchase-company,
.purchase-time {
  width: 400px;
}
.purchase-code {
  width: 100%;
  margin-bottom: 10px;
}
.content-divider {
  width: 100%;
  height: 10px;
}
.content-list {
  width: 100%;
  flex: 1;
  background: #fff;
  overflow: auto;
}
.product-list {
  width: 100%;
  background: #fff;
}
.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 114px;
  padding: 0 20px;
  border-bottom: 1px solid #e5e5e5;
}
.product-img {
  float: left;
  width: 100px;
  height: 100px;
  margin: 10px 20px 0px 0px;
}
.product-infos {
  float: left;
  width: 226px;
  margin-top: 10px;
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
.purchase-info {
  width: 140px;
  font-size: 18px;
  color: #333;
}

.footer-left {
  float: left;
  margin: 20px 0 0 20px;
}
.left-content {
  float: left;
}
.footer-summary {
  margin: 10px 0 0 20px;
}

</style>