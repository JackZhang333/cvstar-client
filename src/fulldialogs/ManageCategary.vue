<template>
  <div class="manage-categary">
    <full-dialog :hasFooter="hasFooter" title="管理分类" ref="fullDialog" :sigleButton="singleButton">
      <div slot="content" class="content-wrapper">
        <div class="content-top">
          <topbar-input class="top-add" :action = 'addMenu'/>
        </div>
        <div class="content-divider"></div>
        <div class="content-list">
          <div class="categary-list">
            <div class="categary-item" v-for="(item,index) in getCategaryInfos" :key="index">
              <p class="name">{{item.menu}}</p>
              <p class="number">{{item.count}}种商品</p>
              <inline-button
              v-show="index != getCategaryInfos.length-1"
              action="删除" 
              :clickHandler="()=>removeCat(item)" 
              class="remove-cat" />
            </div>
          </div>
        </div>
        <div class="content-divider"></div>
      </div>
    </full-dialog>
  </div>
</template>

<script>
import FullDialog from "../pages/FullDialog";
import TopbarInput from "../pagecomps/TopbarInput";
import InlineButton from "../components/InlineButton";
import { mapGetters, mapMutations,mapActions } from "vuex";

export default {
  components: {
    FullDialog,
    TopbarInput,
    InlineButton,
  },
  data() {
    return {
      hasFooter: true,
      singleButton: true,
    };
  },
  created() {},
  methods: {
   
    ...mapMutations('products',['editMenuOfProducts']),
    ...mapActions('menus',['addMenu',"removeMenu"]),
    open() {
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
    removeCat(item) {
      // window.console.log('把这条分类信息删除掉:'+item.menu)
      //删除类目前判断该类目下商品的数量，数量为 0 时就直接删除。数量不为 0 则提示用户，删除后该类目下的商品将会归为“其他分类”
      if (item.count == 0) {
        this.removeMenu(item.menu);
        this.$toast({ msg: "删除类目成功", duration: 1 });
      } else {
        this.$dialog({
          cancelName: "取消",
          confirmName: "继续删除",
          contentMsg:
            "删除该类目后，类目相关的商品将会归于‘其他分类’。是否继续删除？",
          confirmHandler: () => {
            this.removeMenu(item.menu);
            this.editMenuOfProducts(item.menu)
          },
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getCategaryInfos"]),
    ...mapGetters('menus',["otherMenus"]),
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
.top-add {
  margin: 10px 0px 10px 156px;
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
.categary-list {
  width: 100%;
  background: #fff;
}
.categary-item {
  width: 100%;
  height: 54px;
  line-height: 54px;
  padding: 0 20px;
  
  border-bottom: 1px solid #e5e5e5;
}
.categary-item .name {
  float: left;
  width: 355px;
}
.categary-item .number {
  float: left;
  width: 205px;
}
.remove-cat {
  float: right;
  margin-top: 11px;
}
</style>