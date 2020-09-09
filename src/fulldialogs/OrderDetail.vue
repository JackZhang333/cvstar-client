<template>
  <div class="order-detail">
    <full-dialog
      :hasFooter="hasFooter"
      title="流水详情"
      ref="fullDialog"
      :sigleButton="singleButton"
    >
      <div slot="content" class="content-wrapper">
        <div class="content-top">
          <div class="order-code">
            订单编号：{{order.orderCode}}
          </div>
          
          <div class="order-time">
            收银时间：{{order.orderTime}}
          </div>
        </div>
        <div class="content-divider"></div>
        <div class="content-list">
          <div class="product-list">
            <div class="product-item" v-for="(item,index) in order.products" :key="index">
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
              <p class="purchase-info-count">数量：{{item.count}}</p>
              <p class="purchase-info">价格：¥ {{item.totalPrice|fixed}}</p>
              <p class="purchase-info">毛利：¥ {{(item.price-item.pPrice)*item.count|fixed}}</p>
            </div>
          </div>
        </div>
        <div class="content-divider"></div>
      </div>
      <div slot="footer" class="footer-left">
        <span class="left-content footer-summary">商品数量：{{order.totalCount}}</span>
        <span class="left-content footer-summary">订单金额：¥{{order.totalMoney|fixed}}</span>
        <span class="left-content footer-summary">毛利：¥{{order.totalProfile|fixed}}</span>
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
      
      order:{},
      hasFooter: true,
      singleButton: true,
    };
  },
  methods: {
    open(order) {
      this.order = order
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
  },
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
  height: 60px;
  padding: 20px;
  background: #fff;
  font-size: 18px;
  color: #333;
}
.order-code,
.order-time {
  width: 340px;
  display: inline-block;
  height: 25px;
  line-height: 25px;
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
  margin: 10px 10px 0px 0px;
}
.product-infos {
  float: left;
  /* width: 206px; */
  margin-top: 10px;
}
.product-name {
  width:200px;
  font-size: 18px;
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
.purchase-info-count {
  width: 100px;
  font-size: 17px;
  color: #333;
}
.purchase-info {
  width: 150px;
  font-size: 17px;
  color: #333;
  margin-right: 10px;
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