<template>
  <div class="manage-company">
    <full-dialog :hasFooter="hasFooter" title="管理供应商" ref="fullDialog" :sigleButton="singleButton">
      <div slot="content" class="content-wrapper">
        <div class="content-top">
            <topbar-input class="top-add"
            :inputProps='inputProps'
            :isSingle = 'isSingle'
            :action = 'addCompanyHandler'
            />
        </div>
        <div class="content-divider"></div>
        <div class="content-list">
          <div class="company-list">
            <div class="company-item" 
            v-for = '(item,index) in getOtherCompany' 
            :key = 'item.id'
            
            >
              <p class="name">{{item.name}}</p>
              <p class="number">{{item.phone}}</p>
              <inline-button 
              action='删除' 
              v-show="index != getOtherCompany.length-1"
              :clickHandler = '()=>removeCompany(item.id)'  
              class="remove-com"/>
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
import TopbarInput from '../pagecomps/TopbarInput'
import InlineButton from '../components/InlineButton'
import add from '../assets/add.png'

import { mapGetters, mapActions } from 'vuex'


export default {
  components: {
    FullDialog,
    TopbarInput,
    InlineButton
  },
  data() {
    return {
      hasFooter: true,
      singleButton: true,
      
      isSingle:{
        hasOther:true,
        otherName:'供应商名称'
      },
      companies:[],
      inputProps:{
        iconPic:add,
          placeholder:'供应商联系方式',
          btnWidth:'146px',
          btnName:'新增供应商'
      }
    };
  },
  methods: {
    ...mapActions('companies',['addCompany','removeCompany']),
    open() {
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
    addCompanyHandler(datas){
      let name = datas.value1
      let phone = datas.value2
      this.addCompany({name,phone})
    },
    
  },
  computed:{
    ...mapGetters('companies',['getOtherCompany'])
  }
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
  margin: 10px 0px 10px 0;
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
.company-list {
  width: 100%;
  background:#fff;
}
.company-item {
  width: 100%;
  height: 54px;
  line-height: 54px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
}
.company-item .name {
  width: 310px;
}
.company-item .number {
  width: 205px;
}
.remove-com {
  margin-top: 11px;
}
</style>