<template>
  <div class="login">
    <div class="login-container">
      <div class="cvs-logo"></div>
      <p class="cvs-words">简单好用的小店管理工具</p>
      <form @submit.prevent="submitHandler" class="login-form">
        <div class="item-wrapper">
          <span class="icon-phone input-icon"></span>
          <input
            type="number"
            name="name"
            class="item-input"
            placeholder="请输入手机号"
            autocomplete="off"
          />
        </div>
        <div class="item-wrapper">
          <span class="icon-pwd input-icon"></span>
          <input
            type="password"
            name="password"
            class="item-input"
            placeholder="请输入密码"
            autocomplete="off"
          />
          
        </div>
        <div class="item-wrapper">
          <span class="icon-verify input-icon"></span>
          <input
            type="text"
            name="verifyImage"
            class="verify-input"
            placeholder="请输入图片验证码"
            autocomplete="off"
          />
          <img
            ref="verifyImage"
            :src="verifyImage"
            @click="verifyImageClick"
            class="verify-image"
          />
        </div>
        <input type="submit" value="登录" class="item-submit" />
      </form>
      <router-link to="/register" class="to-register">注册账户</router-link>
    </div>
    <p class="copy-right">copyright 2020 杭州便利星信息科技有限公司 浙ICP备19025640</p>
  </div>
</template>

<script>
import acount from "../api/acount";
import env from '../envirenment'
export default {
  data() {
    return {
      msg: "",
      verifyImage:env +'/api/login/verify_image'
    };
  },
  methods: {
    verifyImageClick(){
      //上传服务器时，需要手动修改请求的ip地址
      this.$refs.verifyImage.src = env + '/api/login/verify_image?time' + new Date()
    },
    submitHandler(e) {
      //保存当前实例对象，在后面的异步请求监听函数中可用
      let self = this;
      let { name, password,verifyImage } = e.target;
      //校验数据的完整性，和正确性
      if(name.value!=''&&password.value!=''&&verifyImage.name!=''){
        //校验name是否为手机
        const isPhone = /^1\d{10}$/.test(name.value)
        //校验密码的长度
        const okLength = /^\w{6,20}$/.test(password.value)
        const okVerify = /^\w{4}$/.test(verifyImage.value)

        if(isPhone&&okLength&&okVerify){
          //去登录
          toLogin()
        }else if(!isPhone) {
          this.$toast({msg:'请填写正确的手机号',duration:2})
          return
        }else if(!okLength){
          this.$toast({msg:'密码格式错误',duration:2})
          return
        }else if(!okVerify){
           this.$toast({msg:'验证码格式错误',duration:2})
           return
        }
        
      }else {
        this.$toast({msg:'请填写完整的数据',duration:2})
      }
      function toLogin(){ 
        acount.toLogin({ name: name.value, password: password.value,verifyImage:verifyImage.value }, (data) => {
        let { code, msg, token, userInfos } = data;
        if (code == 200) {
          //如果登录成功则跳转到home页
          console.log("登录成功:" + msg);
          //把数据状态isLogin变为true
          self.$store.commit("acount/toLogin", userInfos);
          let { id, storeName, userName } = userInfos;
          //把信息存一份到本地
          localStorage.setItem(
            "userInfos",
            JSON.stringify({ isLogin: true, id, storeName, userName })
          );
          //跳转到首页
          self.$router.push("/home");
          //设置本地储存token
          localStorage.setItem("token", token);
        } else if (code == -1) {
          //如果登录失败，则重置表单
          console.log("登录失败:" + msg);
          //把数据状态isLogin变为false
          self.$store.commit("acount/toLogout");
          //设置本地储存token
          localStorage.setItem("token", "");
          alert(msg);
          // e.target.reset();
        }
      });
        // window.console.log(name.value,password.value,verifyImage.value)
      }
      
     
    },
  },
};
</script>

<style lang="css" scoped>
.login {
  position: relative;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
}
.login-container {
  width: 360px;
  margin: 50px auto;
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
.login-form {
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
.verify-input {
  width: 230px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  background: #fff;
  outline: none;
  caret-color: #108cee;
  font-size: 16px;

  padding-left: 48px;
}
.verify-image {
  float:right;
  width: 120px;
  height: 40px;
  background: pink;
  margin-left: 10px;
}
.item-input:hover {
  border: 1px solid #47adfd;
}
.item-input:focus {
  border: 1px solid #0a65ca;
}
.item-wrapper {
  position: relative;
  width: 360px;
  margin-bottom: 10px;
}
.input-icon {
  position: absolute;
  left: 12px;
  top: 9px;
  width: 24px;
  height: 24px;
  background: url("../assets/login-icon.png");
  background-size: 24px;
}
.icon-phone {
  background-position-y: -24px;
}
.icon-pwd {
  background-position-y: -48px;
}
.icon-verify{
  background-position-y: -72px;
}
.item-submit {
  outline: none;

  border: none;
  width: 360px;
  height: 48px;
  border-radius: 4px;
  margin-top: 60px;
  background: #108cee;
  color: #fff;
  font-size: 18px;
}
.item-submit:hover {
  background: #47adfd;
}
.item-submit:active {
  background: #0a65ca;
}
.to-register {
  float: right;
  margin-top: 15px;
}
.copy-right {
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 55px;
  font-size: 16px;
  color: #666;
}
</style>