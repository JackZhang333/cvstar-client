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
        <c-input
          class="product-code"
          type="text"
          :name='codeType'
          prop="productCode"
          :value.sync="model.barCode"
        >
        <a href="#" v-show="model.type == '无码商品'" @click="createSystemCode">系统生成</a>
        </c-input>
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
import Upload from "../components/Upload";
import Kaiguan from "../components/Kaiguan";
import CRadios from "../components/CRadios";
import InputSelect from "../components/InputSelect";
import { mapGetters, mapActions } from 'vuex';

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
      // console.log("提交编辑后的产品信息");
      let isComplete = true
      //判断每个输入框是否为空，如果未空。则提示用户输入并返回false,告诉子组件fulldialog不要关闭
      // window.console.log('输入框组合：'+this.$refs.cinput.name)
      // this.$refs.input.forEach(v=>{
      //   if(v.value == ''){
      //     this.$toast({msg:`请填写${v.name}`,duration:2})
      //     isComplete = false
      //     return false
      //   }
      // })
      //新建一个名称和属性的健值对，方便提醒用户正确的填写
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
      //如果没有上传图片则，自动上传一只本地的默认图片
      // if(this.model.pic == ''){
      //   window.console.log('没有上传图片：'+defaultPic)
      //   this.model.pic = defaultPic
      // }
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

        window.console.log('上传的图片：'+this.model.pic)
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