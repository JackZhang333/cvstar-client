<template>
  <div class="purchase-lists">
    <div class="purchase-list-wrapper" 
    v-for="(purchase,index) in filtedPurchase" :key="index"
    v-show="filtedPurchase.length!=0">
        <div class="purchase-pics">
            <img  :src="pic" class="pic-item" v-for="(pic,i) in purchase.pics" :key="i">
        </div>
        <div class="purchase-infos">
            <div class="info-price">
                <span>¥</span><span>{{purchase.totalMoney}}</span>
            </div>
            <div class="info-company">
                <span>{{purchase.companyName}}</span>
            </div>
            <div class="info-date">
                <span>{{purchase.orderTime}}</span>
            </div>
        </div>
      <inline-button action="详情" class="purchase-button" :clickHandler="()=>showDetail(purchase)" />
    </div>
    <h4 v-show="filtedPurchase.length == 0 && purchaseOrders.length != 0">暂无相关数据，请重新设置查询条件</h4>
    <no-data :noDataProps = 'noDataProps' :dataSource = 'purchaseOrders'/>
  </div>
</template>

<script>

import InlineButton from "../components/InlineButton";
import NoData from './NoData'
import { mapGetters, mapState, mapActions } from 'vuex'


export default {
  props:['showDetail','selectedCompany','selectedMonth'],
  components: {
    InlineButton, NoData
  },
  data() {
    return {
      
      noDataProps:{
        dataSource:this.purchaseOrders,
        msg:'暂无进货单，点击',
        action:'进货入库'
      }
    };
  },
  created(){
    this.getPurchaseOrders()
    this.noDataProps.dataSource = this.purchaseOrders
  },
  methods: {
    ...mapActions('purchaseOrders',['getPurchaseOrders']),
  },
  computed:{
    ...mapGetters('purchaseOrders',['getSimplePurchase']),
    ...mapState('purchaseOrders',['purchaseOrders']),
    //根据用户设置的查询条件，过滤出进货单
    filtedPurchase(){
      //第一次过滤供应商
      let filtedList = this.getSimplePurchase.filter(v=>{
        if (this.selectedCompany == '全部供应商'){
          return true
        }else {
          return v.companyName == this.selectedCompany
        }
      })
      //第二次过滤出进货单月份
      filtedList = filtedList.filter(v=>{
        let month = new Date(v.orderTime).getMonth() + 1
        if(month == this.selectedMonth){
          return true
        }
        
      })
      //让父组件重新计算进货单合计信息
      let count = filtedList.length
      let total = filtedList.reduce((pre,v)=>{
        return pre + v.totalMoney
      },0)
      //派发一个事件给父级
      this.$emit('calcSummary',{count,total})
    return filtedList
    }
  }
};
</script>

<style lang="css" scoped>
.purchase-lists {
  width: 100%;
}
.purchase-lists > h4 {
  color: #999;
  font-size: 36px;
  text-align: center;
  margin: 200px 0;
}
.purchase-list-wrapper {
  width: 100%;
  min-width: 1060px;
  height: 136px;
  border-bottom: 1px solid #e5e5e5;
}
.purchase-pics {
    float: left;
    width: 300px;
    margin-top: 20px;
    margin-left: 14px;
}
.pic-item {
    width: 100px;
    height: 100px;
}
.purchase-infos {
    float: left;
    margin-left: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 136px;
    width: 626px;
    font-size: 20px;
    color: #333;
}
.info-price {
    width: 110px;
}
.info-company {
    width: 260px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info-date {
    width: 200px;
}
.purchase-button {
  float: right;
  margin: 52px 20px 0 0;
}
</style>