import Vue from 'vue'
// import App from './App.vue'
import RouterTest from './RouterTest.vue'
import './globalcomps'
import './api/http'
import router from './router'
import './assets/css/common.css'
import store from './stores'

Vue.config.productionTip = false
//定义一个filter,使显示的数值保留两位小数
Vue.filter('fixed', function (value) {
  let type = typeof (value)
  // if (type != 'string' && type != 'number') {
  //   window.console.log(type, toString(type), value)
  // }
  if (type == 'undefined') {
    return '0.00'
  } else {
    if (type == 'string') {
      value = Number(value)
    }
    return value.toFixed(2)
  }

})

new Vue({
  router,
  store,
  render: h => h(RouterTest),
}).$mount('#app')
