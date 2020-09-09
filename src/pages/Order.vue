<template>
  <div class="order">
    <page-base>
      <div slot="top">
        <month-select
          :selectedMonth.sync="selectedMonth"
          menuPosition="-154px"
          class="product-select"
        />
      </div>
      <div slot="middle">
        <order-lists 
        :showDetail = 'showDetail'
        :selectedMonth = 'selectedMonth'
        @calcSummary = 'calcSummary'
        />
      </div>
      <div slot="bottom">
        <div class="order-summary">
          <span>合计销售额 {{checkSummary.money|fixed}} 元，毛利 {{checkSummary.profile|fixed}} 元</span>
        </div>
      </div>
    </page-base>
  <order-detail ref="orderDetail"/>
  </div>
</template>

<script>

import PageBase from "./PageBase";
import MonthSelect from "../components/MonthSelect";
import OrderLists from "../pagecomps/OrderLists";
import OrderDetail from '../fulldialogs/OrderDetail'

export default {
  provide(){
    return {
      noDataHandler:this.startCheck,
      
    }
  },
  components: {
    PageBase,
    MonthSelect,
    OrderLists,
    OrderDetail, 
  },
  created(){
    let month = new Date().getMonth() +1 
    this.selectedMonth = month > 9 ? month : '0'+month
  },
  data() {
    return {
      checkSummary:{
        money:2938,
        profile:989.00
      },
      selectedMonth: "03",
    };
  },
  methods: {
    startCheck(){
      this.$router.push('/home/check')
    },
    showDetail(order){
      this.$refs.orderDetail.open(order)
    },
    calcSummary(summary){
      this.checkSummary = summary
    }
  },
};
</script>

<style lang="css" scoped>
.product-select {
  float: left;
  margin-top: 26px;
  margin-left: 20px;
}
.order-summary {
  float: right;
  margin: 50px 20px 0 0;
  font-size: 16px;
  color: #333;
}
</style>