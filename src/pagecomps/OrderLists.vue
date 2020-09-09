<template>
  <div class="order-lists">
    <div class="order-list-wrapper" 
    v-for="(order,index) in filtedOrders" :key="index"
    v-show="getSimpleCheck.length != 0">
        <div class="order-pics">
            <img  :src="pic" class="pic-item" v-for="(pic,i) in order.pics" :key="i">
        </div>
        <div class="order-infos">
            <div class="info-num">
                <span>{{order.totalCount}}</span><span>件商品</span>
            </div>
            <div class="info-check">
                <span>收银：¥</span><span>{{order.totalMoney|fixed}}</span>
            </div>
            <div class="info-profile">
                <span>毛利：¥</span><span>{{order.totalProfile|fixed}}</span>
            </div>
            <div class="info-date">
                <span>{{order.orderTime}}</span>
            </div>
        </div>
      <inline-button action="详情" class="order-button" :clickHandler="()=>showDetail(order)" />
    </div>
    <h4 v-show="filtedOrders.length == 0 && getSimpleCheck.length != 0">暂无相关数据，请重新设置查询条件</h4>
    <no-data :noDataProps = 'noDataProps' :dataSource = 'getSimpleCheck'/>
  </div>
</template>

<script>

import InlineButton from "../components/InlineButton";
import NoData from './NoData'

import { mapGetters,mapActions } from 'vuex'

// orders.length = 0
export default {
  props:['showDetail','selectedMonth'],
  components: {
    InlineButton, NoData
  },
  created(){
    this.getChecks()
    this.noDataProps.dataSource = this.getSimpleCheck
  },
  data() {
    return {
    
      noDataProps:{
        dataSource:this.getSimpleCheck,
        msg:'暂无订单流水，点击',
        action:'开始收银'
      }
    };
  },
  methods: {
    ...mapActions('checkOrders',['getChecks'])
  },
  computed:{
    ...mapGetters('checkOrders',['getSimpleCheck']),
    filtedOrders(){
      let filtedList = this.getSimpleCheck.filter(v=>{
        let month = new Date(v.orderTime).getMonth() + 1
        if(month == this.selectedMonth){
          return true
        }
      })
      let money = filtedList.reduce((pre,v)=>{
        return pre + v.totalMoney
      },0)
      let profile = filtedList.reduce((pre,v)=>{
        return pre + v.totalProfile
      },0)
      this.$emit('calcSummary',{money,profile})
      return filtedList
    }
  }
};
</script>

<style lang="css" scoped>
.order-lists {
  width: 100%;
}
.order-lists > h4 {
  color: #999;
  font-size: 36px;
  text-align: center;
  margin: 200px 0;
}
.order-list-wrapper {
  width: 100%;
  min-width: 1060px;
  height: 136px;
  border-bottom: 1px solid #e5e5e5;
}
.order-pics {
    float: left;
    width: 300px;
    margin-top: 20px;
    margin-left: 14px;
}
.pic-item {
    width: 100px;
    height: 100px;
}
.order-infos {
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
.info-num {
    width: 110px;
}
.info-check {
  width: 160px;
}
.info-profile {
  width: 160px;
}
.info-date {
    width: 200px;
}
.order-button {
  float: right;
  margin: 52px 20px 0 0;
}
</style>