<template>
  <div class="register">
    <div class="register-container">
      <div class="cvs-logo"></div>
      <p class="cvs-words">简单好用的小店管理工具</p>
      <form @submit.prevent="submitHandler" class="register-form">
          <div class="item-wrapper">
            <span class="icon-store input-icon"></span>
          <input type="text" 
          v-model="model.storeName"
          name="store" class="item-input" placeholder="请输入店铺名称" autocomplete="off"/>
        </div>
        <div class="item-wrapper">
            <span class="icon-phone input-icon"></span>
          <input type="number" 
          v-model="model.userName"
          name="name" class="item-input" placeholder="请输入手机号" autocomplete="off"/>
        </div>
        <div class="item-wrapper">
            <span class="icon-pwd input-icon"></span>
          <input type="password" 
          v-model="model.password"
          name="password" class="item-input" placeholder="请输设置 6 - 16 位密码" autocomplete="off"/>
        </div>
        <div class="item-wrapper">
            <span class="icon-pwd input-icon"></span>
          <input type="password" 
          v-model="confirmPassword"
          name="confirmPassword" class="item-input" placeholder="请再次确认密码" autocomplete="off"/>
        </div>
        <input type="submit" value="注册" class="item-submit"/>
      </form>
      <router-link to="/login" class="to-login">登录已有账户</router-link>
    </div>
    <p class="copy-right">copyright  2020 杭州便利星信息科技有限公司</p>
  </div>
</template>

<script>
import acount from '../api/acount'

export default {
  data() {
    return {
      msg: "",
      model:{
        userName:'',
        password:'',
        storeName:''
      },
      confirmPassword:'',
    };
  },
  methods: {
    submitHandler() {
      //校验数据的完整性及两次输入的密码是否一致
      window.console.log('用户填写的数据：',this.model)
      let isComplete = true
      for (let k in this.model){
        if(this.model[k]==''){
          isComplete =false
        }
      }

      if(isComplete&&this.confirmPassword!=''){
        if(this.model.password == this.confirmPassword){
          acount.toRegister(this.model,({code,msg})=>{
            if(code==1){
              this.$feedback('注册成功')
              this.$router.push('/login')
              window.console.log(msg)
            }else{
              window.console.log(msg)
              for (let k in this.model){
                this.model[k] = ''
              }
            }
          })
        }else{
          this.$toast({msg:'两次输入的密码不一致',duration:2})
        }
      }else{
        this.$toast({msg:'请填写完整的数据',duration:2})
      }
    },
  },
};
</script>

<style lang="css" scoped>
.register {
    position: relative;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
}
.register-container {
  width: 360px;
  margin: 100px auto;
}
.cvs-logo {
  width: 100%;
  height: 150px;
  background: url("../assets/cvs-logo.png");
  background-size: 360px;
}
.cvs-words {
  width: 100%;
  height: 22px;
  font-size: 16px;
  color: #666;
  text-align: center;
}
.register-form {
  margin-top: 55px;
}
.item-input {
    width: 360px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #e5e5e5;
    background: #fff;
    outline: none;
    caret-color: #108cee;
    font-size: 16px;

    padding-left: 48px;
}
.item-input:hover {
    border: 1px solid #47adfd;
}
.item-input:focus {
    border:1px solid #0a65ca;
}
.item-wrapper {
    position: relative;
    margin-bottom: 10px;
}
.input-icon {
    position: absolute;
    left: 12px;
    top: 9px;
    width: 24px;
    height: 24px;
    background: url('../assets/login-icon.png');
    background-size: 24px;
}

.icon-phone {
    background-position-y: -24px;
}
.icon-pwd {
    background-position-y: -48px;
}
.item-submit {
    outline: none;
    border:none;
    width: 360px;
    height: 48px;
    border-radius: 4px;
    margin-top: 60px;
    background: #108cee;
    color:#fff;
    font-size: 18px;
}
.item-submit:hover {
    background: #47adfd;
}
.item-submit:active {
    background: #0a65ca;
}
.to-login {
    float: right;
    margin-top: 15px;
}
.copy-right {
    width: 100%;
    position: absolute;
    text-align: center;
    bottom: 55px;
    font-size: 16px;
    color:#666;
}
</style>