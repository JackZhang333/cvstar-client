<template>
  <div class="add-product">
    <full-dialog
      title="新增商品"
      dialogWidth="720"
      :hasFooter="footer"
      ref="fullDialog"
      :confirm="submitInfos"
    >
      <div class="add-product-content" slot="content">
        <c-radios
          class="product-type"
          name="productCode"
          :values="productTypes"
          label="商品类型"
          :checked.sync="model.type"
        />
        <barcode-search
          class="product-code"
          @searchProduct = "getCloudProduct"
          type="text"
          :name='codeType'
          prop="productCode"
          :value.sync="model.barCode"
        >
        <a href="#" v-show="model.type == '无码商品'" @click="createSystemCode">系统生成</a>
        </barcode-search>
        <c-input
          class="product-name"
          type="text"
          name="商品名称"
          prop="productName"
          :value.sync="model.name"
        />
        <input-select
          class="product-categary"
          name="分类"
          :menus='otherMenus'
          :selected.sync="model.categary"
        />
        <c-input
          class="product-spec"
          type="text"
          name="规格"
          prop="productSpec"
          :value.sync="model.spec"
        />
        <c-input
          class="product-pPrice"
          type="number"
          name="进价"
          prop="productPPrice"
          :value.sync="model.pPrice"
        />
        <c-input
          class="product-sPrice"
          type="number"
          name="售价"
          prop="productSPrice"
          :value.sync="model.price"
        />
        <c-input
          class="product-stock"
          type="number"
          name="库存"
          prop="prodoctStock"
          :value.sync="model.stock"
        />
        <div class="product-quick-add">
          <span>快捷加购：</span>
          <kaiguan :status.sync="model.quickAdd" />
        </div>
        <div class="product-upload">
          <span>商品图片（选填）：</span>
          <upload :imageUrl.sync = 'model.pic'/>
        </div>
      </div>
    </full-dialog>
  </div>
</template>

<script>

import FullDialog from "../pages/FullDialog";
import CInput from "../components/CInput";
import BarcodeSearch from "../components/BarcodeSearch";
import Upload from "../components/Upload";
import Kaiguan from "../components/Kaiguan";
import CRadios from "../components/CRadios";
import InputSelect from "../components/InputSelect";
import { mapGetters, mapActions } from 'vuex';
import Products from '../api/products'

// import defaultPic from '../assets/product-default.png'

let defaultModel = {
        type: "有码商品",
        barCode: "",
        name: "",
        categary: "",
        spec: "",
        pPrice: "",
        price: "",
        stock: "",
        quickAdd: false,
        pic:''
      }

export default {
  components: {
    FullDialog,
    CInput,
    Upload,
    Kaiguan,
    CRadios,
    InputSelect,
    BarcodeSearch,
  },
  data() {
    return {
      footerActions: {
        lined: "取消",
        filled: "确定新增",
      },
      productTypes: ["有码商品", "无码商品"],
      footer: true,
      model:{...defaultModel},
    };
  },
  computed:{
    ...mapGetters('menus',['otherMenus']),
    //根据用户选择的商品类型，显示编码的类型
    codeType(){
      return this.model.type == '有码商品' ? '条码' : '编码'
    },
  },
  methods: {
    //从云端商品库搜索商品然后填写到默认数据中
    getCloudProduct(value){
      //请求获取商品信息的api
      //  window.console.log('将要请求云端的数据：',value)
      Products.getCloudProduct({barCode:value},(res)=>{
        // window.console.log('云端获取的数据',res)
        //把云端数据解构出来，赋值给表单
        const {msg,code} = res
        if(code == 1){
          this.$toast({msg,duration:1})
          const {pic,barCode,productName:name,sPrice:price,pPrice,categary,spec} = res.product
          // console.log(pic,barCode,name,price,pPrice,categary)
          this.model = {...this.model,pic,barCode,name,price,pPrice,categary,spec}
        }
        
      })

    },
    //系统自动生产编码
    createSystemCode(){
      let now = new Date().getTime()
      // window.console.log('得到的时间编码：'+now)
      this.model.barCode = now
    },
    open() {
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
    submitInfos() {
      
      let isComplete = true
      let names = {
        'stock':'库存',
        'name':'商品名称',
        'spec':'规格',
        'price':'售价',
        'pPrice':'进价',
        'barCode':'商品编码',
        'categary':'商品分类',
        'pic':'商品图片'
      }
    
      //校验对应的数据模型各属性值是否为空字符串，如果是就提醒用户填写并返回false不关闭全屏弹窗
      for (let k in this.model){
        if(this.model[k]===''){
          this.$toast({msg:`请填写${names[k]}`,duration:2})
          isComplete = false
          return false
        }
      }
      
      //如果填写的数据完整，则通过 mutation 提交产品信息
      if(isComplete){

        // window.console.log('上传的图片：'+this.model.pic)
        this.addProduct(this.model)
        this.$feedback('新增成功')
        this.model = {...defaultModel}
        
        return true
      }
    },
    // ...mapMutations('products',['addProduct'])
    ...mapActions('products',['addProduct'])
  },
};
</script>

<style lang="css" scoped>
.add-product-content {
  padding: 20px;
  line-height: 42px;
  font-size: 18px;
  color: #333;
}

.product-type {
}
.product-code {
  float: left;
}
.product-quick-add {
  margin-right: 155px;
  margin-bottom: 25px;
}
.product-name,
.product-spec,
.product-sPrice,
.product-kaiguan,
.product-quick-add {
  float: right;
}
.product-categary,
.product-pPrice,
.product-stock,
.product-upload {
  float: left;
}
.product-upload {
  display: flex;
  align-items: top;
}
</style>