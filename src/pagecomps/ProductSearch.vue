<template>
  <div class="product-search">
    <input type="text" 
    class="search-input" 
    placeholder="请输入商品名称或条码" 
    ref="search"
    @keydown.enter="searchHandler"
    />
    <div class="search-button" @click = 'searchHandler'>
      <div class="search-icon"></div>
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    searchHandler(){
      let value = this.$refs.search.value
      if(value==''){
        this.$toast({msg:'请输入商品条码或名称',duration:2})
        this.$emit('searchProduct',value)
      }else {
        this.$emit('searchProduct',value)
      }
    }
  }
};
</script>

<style lang="css" scoped>
.product-search {
  width: 450px;
  height: 50px;
}
.search-input {
  float: left;
  width: 340px;
  height: 50px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  font-size: 18px;
  text-indent: 1em;
  caret-color: #108cee;
}
.search-input:focus {
  border: 1px solid #108cee;
}
.search-button {
  float: left;
  margin-left: 10px;
  width: 94px;
  height: 50px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 50px;
  border: 1px solid #108cee;
  color: #108cee;
  background: #fff;
  overflow: hidden;
}
.search-button:hover {
  border: 1px solid #47adfd;
  color: #47adfd;
}
.search-button:active {
  border: 1px solid #0a65ca;
  color: #0a65ca;
}
.search-icon {
  float: left;
  width: 24px;
  height: 24px;
  background:url('../assets/search.png');
  background-size: 24px;
  margin: 12px 10px;
}
.search-button:hover 
.search-icon {
    background-position-y: -24px;
}
.search-button:active 
.search-icon {
    background-position-y: -48px;
}
</style>