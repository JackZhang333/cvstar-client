<template>
  <div class="edit-product">
    <full-dialog
      title="编辑商品"
      dialogWidth="720"
      :hasFooter="footer"
      ref="fullDialog"
      :confirm="submitInfos"
    >
      <div class="edit-product-content" slot="content">
        <p class="product-type">商品类型：{{model.type}}</p>
        <p class="product-code">{{model.type == '有码商品' ? '条码：':'编码：'}}{{model.barCode}}</p>
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
          :menus = 'menus'
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
            <span>快捷加购：</span><kaiguan :status.sync="model.quickAdd"  />
        </div>
        <div class="product-upload" >
            <span>商品图片（选填）：</span><upload :imageUrl.sync = 'model.pic'/>
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
import InputSelect from '../components/InputSelect'
import { mapState, mapActions }from 'vuex'

export default {
  components: {
    FullDialog,
    CInput,
    Upload,
    Kaiguan,
    InputSelect,
  },
  data() {
    return {
      footer: true,
      model: { },
    };
  },
  methods: {
    open(id) {
      // console.log("要编辑的商品条码是：" + barcode);
      this.$refs.fullDialog.created = true;
      let product = this.products.filter(v=>v.id == id)[0]
      // window.console.log(product)
      //需要复制一个对象，否则没有提交就会同步改变数据
      this.model = { ...product}
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
      }
      //校验对应的数据模型各属性值是否为空字符串，如果是就提醒用户填写并返回false不关闭全屏弹窗
      for (let k in this.model){
        if(this.model[k]===''){
          this.$toast({msg:`请填写${names[k]}`,duration:2})
          isComplete = false
          return false
        }
      }
      //如果填写的数据完整，则通过 mutation 改变全局的产品信息
      if(isComplete){
        this.updateProduct(this.model)
        this.$feedback('修改成功')
        return true
      }
    },
    ...mapActions('products',['updateProduct']),
  },
  computed:{
    ...mapState('products',['products']),
    ...mapState('menus',['menus'])
  }
};
</script>

<style lang="css" scoped>
    .edit-product-content {
        padding:20px;
        line-height: 42px;
        font-size: 18px;
        color:#333;
    }

    .product-type {
        height: 42px;
    }
    .product-code {
        float: left;
        width:50%;
        height: 42px;
        margin-bottom:25px;
    }
    .product-quick-add {
        margin-right: 155px;
        margin-bottom: 25px;
    }
    .product-name,.product-spec,.product-sPrice,.product-kaiguan,.product-quick-add {
        float: right;
        
    }
    .product-categary, .product-pPrice, .product-stock,.product-upload  {
        float: left;
       
    }
    .product-upload {
        display: flex;
        align-items: top;
    }
</style>