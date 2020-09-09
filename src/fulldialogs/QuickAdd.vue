<template>
  <div class="quick-add">
    <full-dialog title="快捷加购" dialogWidth="660" :hasFooter="footer" ref="fullDialog">
      <div slot="content" class="quick-add-content">
        <div class="quick-add-sidebar">
          <div
            class="quick-add-menu-item"
            v-for="(menu,index) in menus"
            :key="index"
            :class="{isSelected:selected == menu}"
            @click="selectMenu(menu)"
          >
            <span :title="menu">{{menu}}</span>
          </div>
        </div>
        <div class="quick-add-list">
          <div
            class="add-list-item"
            v-for="(item,index) in filtedProducts"
            :key="index"
            @click="addProduct(item)"
            v-show="filtedProducts.length!=0"
          >
            <img :src="item.pic" alt="productImg" />
            <div class="list-item-infos">
              <div class="info-name">{{item.name}}</div>
              <div class="info-price">
                <span>¥</span>
                <span>{{item.price}}</span>
              </div>
            </div>
          </div>
          <no-data :noDataProps="noDataProps"  :dataSource = 'quickAddedProducts' class="quick-no-data"/>
        </div>
      </div>
    </full-dialog>
  </div>
</template>

<script>
import FullDialog from "../pages/FullDialog";
import NoData from "../pagecomps/NoData";
import { mapGetters } from 'vuex'
let products = []

// products.length = 0
export default {
  provide() {
    return {
      noDataHandler() {
          this.$router.push('/home/products')
      },
    };
  },
  components: {
    FullDialog,
    NoData,
  },
  data() {
    return {
      footer: false,
      //默认选中的菜单项
      selected: "全部",
      noDataProps: {
        dataSource: products,
        msg: "暂无可加购商品，你可以",
        action: "编辑商品为快捷加购商品",
      },
    };
  },
  computed:{
    ...mapGetters('products',['quickAddedProducts']),
    //把菜单项作为一个计算属性
    menus(){
      let menulist = ['全部']
      //检测每个产品的分类是否已经存在于菜单项中，如果不存在则添加到菜单项中
      this.quickAddedProducts.forEach((value)=>{
        let hasOne = menulist.findIndex(v=>v==value.categary)
        if(hasOne == -1){
          menulist.push(value.categary)
        }
      })
      return menulist
    },
    //把当前显示的产品列表也作为计算属性，根据选中的菜单项显示对应的产品
    filtedProducts(){
      let filtedLists
      if (this.selected == '全部'){
        filtedLists = this.quickAddedProducts
      }else {
        filtedLists =  this.quickAddedProducts.filter(value=>{
        return value.categary == this.selected
      })
      }
     
      return filtedLists
    }
  },
  methods: {
    open() {
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
    //点击选中当前的菜单项,把属于该菜单的产品筛选出来
    selectMenu(menu) {
      this.selected = menu;
    },
    //点击当前产品，加购到购物车
    addProduct(item) {
      // window.console.log('要添加的产品：'+JSON.stringify(item))
      this.$toast({msg:'商品添加成功',duration:2})
      this.$parent.addProduct(item)
      
    },
  },
};
</script>

<style lang="css" scoped>
.quick-add-content {
  height: 100%;
}
.quick-add-sidebar {
  float: left;
  width: 120px;
  height: 100%;
  background: #041624;
  color: #fff;
  line-height: 48px;
  font-size: 20px;
  text-align: center;
}
.quick-add-sidebar .isSelected {
  opacity: 1;
  background: #108cee;
}
.quick-add-list {
  float: right;
  width: calc(100% - 120px);
  background: #f5f5f5;
  height: calc(100vh - 60px);
  overflow: auto;
}
.quick-add-menu-item {
  height: 48px;
  width: 100%;
  opacity: 0.68;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
.quick-add-menu-item:hover {
  background: #47adfd;
  opacity: 1;
}
.quick-add-menu-item:active {
  background: #0a65ca;
  opacity: 1;
}
.add-list-item {
  float: left;
  margin: 10px 0 0 10px;
  position: relative;
  width: 160px;
  height: 200px;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
.add-list-item > img {
  width: 160px;
  height: 160px;
}
.list-item-infos {
  height: 40px;
  width: 100%;
  color: #333;
}
.info-name {
  float: left;
  font-size: 18px;
  width: 85px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 8px 10px;
}
.info-price {
  float: right;
  font-size: 16px;
  margin: 0 5px 8px 0;
}
.quick-no-data {
    margin-top: 150px;
}
</style>