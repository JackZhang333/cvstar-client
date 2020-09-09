<template>
  <div class="purchase">
    <page-base>
      <div slot="top">
        <drawpdown-select
          :menus="getAllCompany"
          :selected.sync="selectedCompany"
          drawpWidth="235px"
          menuPosition="-15px"
          class="product-select"
        />
        <month-select
          :selectedMonth.sync="selectedMonth"
          menuPosition="-154px"
          class="product-select"
        />
      </div>
      <div slot="middle">
        <purchase-lists 
        :showDetail = 'showDetail'
        :selectedCompany = 'selectedCompany'
        :selectedMonth = 'selectedMonth'
        @calcSummary = 'calcSummary'
        />
      </div>
      <div slot="bottom">
        <div class="purchase-summary">
          <span>共 {{purchaseSummary.count}} 条进货单，{{purchaseSummary.total|fixed}} 元</span>
        </div>
        <big-button class="purchase-button" :iconProps="bigButtons[1]" />
        <big-button class="purchase-button" :iconProps="bigButtons[0]" />
      </div>
    </page-base>
    <purchase-product ref="purchaseProduct"/>
    <manage-company ref="manageCompany"/>
    <purchase-detail ref="purchaseDetail"/>
  </div>
</template>

<script>

import PageBase from "./PageBase";
import DrawpdownSelect from "../components/DrawpdownSelect";
import MonthSelect from "../components/MonthSelect";
import PurchaseLists from "../pagecomps/PurchaseLists";
import BigButton from "../pagecomps/BigButton";
import PurchaseProduct from '../fulldialogs/PurchaseProduct'
import PurchaseDetail from '../fulldialogs/PurchaseDetail'
import ManageCompany from '../fulldialogs/ManageCompany'
import { mapGetters,mapActions } from 'vuex'

export default {
  
  provide(){
    return {
      noDataHandler:this.addPurchase
    }
  },
  components: {
    PageBase,
    DrawpdownSelect,
    MonthSelect,
    PurchaseLists,
    BigButton,
    PurchaseProduct,
    ManageCompany,
    PurchaseDetail,
  },
  created(){
    
    let month = new Date().getMonth() +1 
    this.selectedMonth = month > 9 ? month : '0'+month
    this.getCompanies()
  },
  data() {
    return {
      purchaseSummary:{
        count:5,
        total:245
      },
      selectedCompany: "全部供应商",
      selectedMonth: "05",
      bigButtons: [
        {
          num: 5,
          label: "进货入库",
          clickHandler: this.addPurchase,
        },
        {
          num: 4,
          label: "管理供应商",
          clickHandler: this.manageCompany,
        },
      ],
    };
  },
  methods: {
    ...mapActions('companies',['getCompanies']),
    addPurchase() {
      this.$refs.purchaseProduct.open()
    },
    manageCompany() {
      this.$refs.manageCompany.open()
    },
    showDetail(purchase){
      this.$refs.purchaseDetail.open(purchase)
    },
    calcSummary(summary){
      this.purchaseSummary = summary
    }
  },
  computed:{
    ...mapGetters('companies',['getAllCompany']),
  }
};
</script>

<style lang="css" scoped>
.product-select {
  float: left;
  margin-top: 26px;
  margin-left: 20px;
}
.purchase-summary {
  float: left;
  margin: 50px 0 0 20px;
  font-size: 16px;
  color: #333;
}
.purchase-button {
  float: right;
  margin: 15px 20px 0 0;
}
</style>