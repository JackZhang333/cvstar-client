<template>
  <div class="purchase-product">
    <full-dialog
      :hasFooter="hasFooter"
      title="进货入库"
      ref="fullDialog"
      :sigleButton="singleButton"
      :confirm="submitData"
      dialogWidth="840"
    >
      <div slot="content" class="content-wrapper">
        <div class="content-top">
          <topbar-input class="top-search" :inputProps="inputProps" :action="addProduct" />
        </div>
        <div class="content-divider"></div>
        <div class="content-list">
          <div class="product-list" v-show="products.length!=0">
            <div class="product-item" v-for="(item,index) in products" :key="index">
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
              <c-input
                type="number"
                prop="num"
                name="数量"
                :value.sync="item.count"
                class="little-input"
                inputWidth="120px"
              />
              <c-input
                type="number"
                prop="price"
                name="总价"
                :value.sync="item.totalPrice"
                class="little-input"
                inputWidth="120px"
              />
              <inline-button
                action="删除"
                :clickHandler="()=>removePro(item.barCode)"
                class="remove-pro"
              />
            </div>
          </div>
          <no-data :noDataProps="noDataProps" class="purchase-no-data" />
        </div>
        <div class="content-divider"></div>
      </div>
      <div slot="footer" class="footer-left">
        <input-select
          :menus="getCompanies"
          :selected.sync="model.companyName"
          name="供应商"
          class="left-content"
          menuPositionY="-260px"
        />
        <span class="left-content footer-summary">共 {{summary.count}} 件，{{summary.total|fixed}}元</span>
      </div>
    </full-dialog>
  </div>
</template>

<script>
import FullDialog from "../pages/FullDialog";
import TopbarInput from "../pagecomps/TopbarInput";
import InlineButton from "../components/InlineButton";
import search from "../assets/search-white.png";
import CInput from "../components/CInput";

import InputSelect from "../components/InputSelect";
import NoData from "../pagecomps/NoData";

import { mapGetters,mapActions } from "vuex";

// products.length = 0;
export default {
  components: {
    FullDialog,
    TopbarInput,
    InlineButton,
    CInput,
    InputSelect,
    NoData,
  },
  data() {
    return {
      noDataProps: {
        dataSource: this.products,
        msg: "请扫描或输入商品条码",
        action: "",
      },
      products: [],
      inputProps: {
        iconPic: search,
        placeholder: "商品名称或条码",
        btnWidth: "91px",
        btnName: "搜索",
      },
      hasFooter: true,
      singleButton: false,

      model: {
        companyName: "其他供应商",
      },
    };
  },
  created() {
    this.noDataProps.dataSource = this.products;
  },
  methods: {
    ...mapActions('purchaseOrders',['addPurchase']),
    open() {
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
    removePro(barCode) {
      // window.console.log("把这条分类信息删除掉");
      let index = this.products.findIndex((v) => v.barCode == barCode);
      this.products.splice(index, 1);
    },
    submitData() {
      //校验当前的产品列表是否为空
      //检测所有的商品数量和价格信息是否完整，如果不完整则提示用户补全。如果完整则提交进货单信息到store
      let isComplete = this.products.length != 0&&this.products.every(
        (v) => v.count != "" && v.totalPrice != ""
      );
      if (isComplete) {
        //如果完整则提交信息
        let orderCode = new Date().getTime();
        let orderTime = new Date().format("yyyy-MM-dd hh:mm");
        let products = this.products.map((v) => {
          let price = (v.totalPrice / v.count).toFixed(2);
          return { ...v, price };
        });
        let companyName = this.model.companyName;
        //  window.console.log({ orderCode, orderTime, companyName, products });
         this.addPurchase({ orderCode, orderTime, companyName, products })
         //清空商品列表
         this.products = []
         this.$feedback('进货成功')
         return true
      }else {
        this.$toast({msg:'请填写商品数量及总价',duration:2})
        return false
      }

     
    },
    addProduct(data) {
      //通过产品信息库，查找到对应的商品
      let product = this.searchProduct(data);
      if (product) {
        // window.console.log(product)
        //如果此时列表中已有此商品则提示用户，没有的话就添加上
        if (this.products.find((v) => v.barCode == product.barCode)) {
          this.$toast({ msg: "已录入该商品", duration: 1 });
        } else {
          //追加id,stock用于服务端进货减库存
          let { id,stock,pic, name, barCode, spec } = product;
          let count = "";
          let totalPrice = "";
          let newPro = { id,stock,pic, name, barCode, spec, count, totalPrice };
          this.products.push(newPro);
        }
      } else {
        this.$toast({ msg: "未找到相关商品", duration: 1 });
      }
    },
  },
  computed: {
    ...mapGetters('products',["searchProduct"]),
    ...mapGetters('companies',["getOtherCompany"]),
    //得到公司名称组成的数组
    getCompanies() {
      return this.getOtherCompany.map((v) => v.name);
    },
    //得到进货单的概览信息
    summary() {
      let count = this.products.reduce((pre, v) => {
        return pre + Number(v.count || 0);
      }, 0);
      let total = this.products.reduce((pre, v) => {
        return pre + Number(v.totalPrice || 0);
      }, 0);
      return { count, total };
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
  height: 70px;
  background: #fff;
}
.top-search {
  margin: 10px 0px 10px 230px;
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
  width: 100%;
  height: 114px;

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
.product-stock {
  float: left;
  width: 516px;
  height: 100%;
  font-size: 20px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.little-input {
  float: left;
  margin: 32px 30px 0 0;
}
.remove-pro {
  float: right;
  margin: 37px 20px 0 0;
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
.purchase-no-data {
  margin-top: 120px;
}
</style>