<template>
  <div class="logout">  
      <div class="wrapper" @click="showBtn">
        <p>{{$store.state.acount.storeName}}</p>
        <div class="down" :class="{rotate:show}"></div>
      </div>
      <div class="button" v-if="show" @click="logoutHandler">退出登录</div>
  </div>
</template>

<script>

export default {
  data() {
    
    return {
      
      show:false
    };
  },
  methods:{
      showBtn(){
          this.show = !this.show
      },
      logoutHandler(){
          //改变全局的登录状态
          this.$store.commit('acount/toLogout')
          //清除本地的用户数据和token
          localStorage.setItem('userInfos','')
          localStorage.setItem('token','')
          this.show = false
          //跳出首页，回到登录页
          this.$router.push('/')
        //   window.console.log(this.$store.state.isLogin)
      }
  }
};
</script>

<style lang="css" scoped>
.logout {
    display: inline-block;
    position: relative;
    width:200px;
}
.wrapper {
    display: flex;
    align-items: center;
    height: 80px;
    
    background: #108cee;
    font-size: 20px;
    color:#fff;
    cursor: pointer;
}
.wrapper:hover{
  color: rgba(255, 255,255, .78);
}
.down {  
    width: 16px;
    height: 8px;
    background-image: url('../assets/down.png');
    background-size: 16px;
    margin-left: 10px;
    transition: transform .5s ease-out;
}
.rotate {
    transform: rotate(180deg);
}
.button {
    position:absolute;
    top: 62px;
    left: 0;
    width: 166px;
    height: 48px;
    border-radius: 2px;
    background: rgba(0, 0, 0, .67);
    text-align: center;
    font-size: 18px;
    line-height: 48px;
    cursor: pointer;
    color: #fff;
}
.button:hover {
    background: rgba(6, 62, 126, 0.774);
}
.button:active{
    background: rgba(6, 62, 126, 1);

}
</style>