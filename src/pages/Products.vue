<template>
  <div class="products">
    <div style="height:100%">
      <page-base >
      <div slot="top">
        <product-search 
        @searchProduct = 'searchHandler'
        class="search-modle"/>
        <drawpdown-select class="categary-select" :menus='allMenus' :selected.sync='selected'/>
      </div>
      <div slot="middle">
        <product-lists 
        :noDataHandler = 'addPro' 
        :editProHandler = 'editPro' 
        :selectedMenu = 'selected'
        :searchedValue = 'searchedValue'
        @calcProducts = 'calcProductsCount'
        />
      </div>
      <div slot="bottom">
        <div class="product-summary">
          <span>
            共 {{productsCount}} 个商品 
          </span>        
        </div>
        <big-button class="product-button" :iconProps = "bigButtons[1]"/>
        <big-button class="product-button" :iconProps = "bigButtons[0]"/>
      </div>
    </page-base>
    </div>
    <edit-product ref="editProduct"/>
    <add-product ref="addProduct"/>
    <manage-categary ref='manageCategary'/>
  </div>
</template>

<script>
import PageBase from './PageBase'
import ProductSearch from '../pagecomps/ProductSearch'
import ProductLists from '../pagecomps/ProductLists'
import DrawpdownSelect from '../components/DrawpdownSelect'
import BigButton from '../pagecomps/BigButton'
import EditProduct from '../fulldialogs/EditProduct'
import AddProduct from '../fulldialogs/AddProduct'
import ManageCategary from '../fulldialogs/ManageCategary'

import {mapGetters,mapActions} from 'vuex'

  export default {
    provide(){
      return {
        noDataHandler:this.addPro
      }
    },
    components:{
      PageBase, 
      ProductSearch, 
      DrawpdownSelect, 
      ProductLists, 
      BigButton,
      EditProduct,
      AddProduct,
      ManageCategary
    },
    data(){
      return {
  
        selected:'全部分类',
        searchedValue:'',
        productsCount:'12',
        bigButtons:[{
          num:0,
          label:'新增商品',
          clickHandler:this.addPro
        },{
          num:3,
          label:'管理分类',
          clickHandler:this.manageCat
        }]
      }
    },
    created(){
      this.getAllProducts()
      this.getMenus()
    },
    methods:{
      ...mapActions('products',['getAllProducts']),
      ...mapActions('menus',['getMenus']),
      searchHandler(value){
        this.searchedValue = value
      },
      editPro(id){
        this.$refs.editProduct.open(id)
      },
      addPro(){
        this.$refs.addProduct.open()
      },
      manageCat(){
        this.$refs.manageCategary.open()
      },
      //计算每次查询后商品的总数量
      calcProductsCount(count){
        this.productsCount = count
      }
    },
    computed:{
      ...mapGetters('menus',['allMenus']),
      
    }

  }
</script>

<style lang="css" scoped>
  .search-modle {
    float: left;
    margin: 25px 0 0 20px;
  }
  .categary-select {
    float:right;
    margin:26px 20px 0 0;
  }
  .product-summary {
    float: left;
    margin:50px 0 0 20px;
    font-size: 16px;
    color:#333;
  }
  .product-button {
    float: right;
    margin: 15px 20px 0 0;
  }
</style>