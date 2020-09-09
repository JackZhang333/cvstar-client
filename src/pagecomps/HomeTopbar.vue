<template>
  <div class="topbar">
    <div class="topbar-logo"></div>
    <logout class="topbar-logout" />
    <div class="topbar-time">
      <span>{{time}}</span>
    </div>
  </div>
</template>

<script>
import Logout from "../components/Logout";

Date.prototype.format =function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return fmt;
}
function getTime(){
    let time = new Date().format('yyyy-MM-dd hh:mm:ss')
    return time
}

export default {
  components: { Logout },
  data() {
    return {
      time: '',
    };
  },
  created() {
    setInterval(()=>{
        this.time = getTime()
    },1000)
    // this.getTime()
  },
  methods: {
    //   getTime(){
    //     //   this.time = new Date().format('yyyy-MM-dd hh:mm')
    //     this.time = new Date().toLocaleTimeString()
    //   }
  },
};
</script>

<style lang="css" scoped>
.topbar {
  height: 80px;
  width: 100%;
  background: #108cee;
  color: #fff;
  font-size: 20px;
  /* text-align: center; */
  line-height: 80px;
}
.topbar-logo {
  float: left;
  width: 58px;
  height: 58px;
  margin-left: 31px;
  margin-top: 11px;
  background: url('../assets/logo.png');
  background-size: 58px;
}
.topbar-logout {
  float: left;
  margin-left: 31px;
}
.topbar-time {
  width: 210px;
  float: right;
  margin-right: 20px;
}
</style>